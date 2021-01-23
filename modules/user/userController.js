const UserService = require("../user/userServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json, query } = require("express");
const saltRounds = bcrypt.genSaltSync(10);
const myPlaintextPassword = "s0//P4$$w0rD";
const refCaptchaServices = require("../referensi/refCaptchaServices");
const nodemailer = require("nodemailer");
const responseFormatter = require("../../responses/responses");

const UserController = {
  getUser: (req, res, next) => {
    console.log(req.user);
    res.json(req.user);
  },

  login: async (req, res, next) => {
    try {
      const captcha = await refCaptchaServices.get(req.body.kode);
      if (!captcha || captcha.jawaban !== req.body.jawaban) {
        return responseFormatter.badRequest(res, null, "captcha salah");
      }
      const user = await UserService.getUserByEmail(req.body.email);

      if (!user) {
        return responseFormatter.badRequest(res, null, "email tidak terdaftar");
      }

      const match = await bcrypt.compare(req.body.password, user.password);

      if (!match) {
        return responseFormatter.badRequest(res, null, "password salah");
      }
      if (!user.isVerified) {
        return responseFormatter.badRequest(
          res,
          null,
          "email belum di verifikasi. silakan cek email anda"
        );
      }

      const tokenJWT = jwt.sign(
        {
          data: { id: user.id },
        },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      const data = {
        id: user.id,
        email: user.email,
        role: user.role,
        tahap: user.tahap,
        verify: user.isVerified,
        token: tokenJWT,
      };
      return responseFormatter.success(res, data, "berhasil login");
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  daftar: async (req, res, next) => {
    try {
      jwt.verify(
        req.body.token_daftar,
        process.env.SECRET_DAFTAR,
        function (err, decoded) {
          if (err) {
            return responseFormatter.badRequest(res, null, "token tidak valid");
          }
        }
      );
      req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
      const cekEmail = await UserService.getUserByEmail(req.body.email);
      if (cekEmail) {
        return responseFormatter.badRequest(res, null, "email sudah terdaftar");
      }
      const input = await UserService.createUser(req.body);

      const newUser = await UserService.getUserById(input[0]);
      const resBerhasil = {
        id: newUser.id,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      };
      // Nodemailer
      const token_email = jwt.sign(
        {
          data: newUser.id,
        },
        process.env.SECRET_VERIFIKASI
      );
      var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      // const token = tokenJWT_email;
      const url = req.headers.host + "/users/verify?token_email=" + token_email;

      const mailOptions = {
        from: "unj.ksrpmi@gmail.com", // Sender address
        to: newUser.email, // List of recipients
        subject: "Verifikasi Akun Email PCAB 2020", // Subject line
        html:
          "Hello " +
          req.body.email +
          "\n\n, " +
          "Please verify your account by clicking the link: \nhttp://" +
          `<a href="${url}">` +
          url +
          `</a>` +
          "\n\nThank You!\n", // Plain text body
      };
      transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
      return res.status(201).send({
        message:
          "berhasil membuat akun dan mengirimkan email verikasi. harap verikasi email segera.",
        ...resBerhasil,
        mailOptions,
      });
    } catch (error) {
      return responseFormatter.error(res, null, "gagal membuat akun");
    }
  },
  verify: async (req, res, next) => {
    try {
      let id;
      jwt.verify(
        req.query.token_email,
        process.env.SECRET_VERIFIKASI,
        function (err, decoded) {
          if (err) {
            return responseFormatter.badRequest(
              res,
              null,
              "token email tidak valid"
            );
          }
          id = decoded.data;
        }
      );
      const newUser = await UserService.getUserById(id);
      if (!newUser) {
        return responseFormatter.badRequest(res, null, "email tidak ada");
      }
      if (newUser.isVerified) {
        return responseFormatter.badRequest(
          res,
          null,
          "email sudah di verifikasi. silakan login"
        );
      }
      const updateUserVerified = await UserService.updateVerified(id);

      return responseFormatter.success(
        res,
        null,
        "email berhasil di verifikasi"
      );
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error");
    }
  },
  token_daftar: async (req, res, next) => {
    const tokenJWT_daftar = jwt.sign(
      {
        data: "ini token daftar",
      },
      process.env.SECRET_DAFTAR,
      { expiresIn: "5m" }
    );
    return responseFormatter.success(
      res,
      (data = { tokenJWT_daftar }),
      "berhasil mendapat token daftar"
    );
  },
  ubahPw: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UserService.cekPwLamaById(id);
      const match = await bcrypt.compare(req.body.password_lama, user.password);
      console.log(match);

      if (req.body.password_baru == req.body.confirm_password) {
        if (match) {
          const password_baru = await bcrypt.hashSync(
            req.body.password_baru,
            saltRounds
          );
          const updatePw = await UserService.updatePw(id, password_baru);
          return responseFormatter.success(
            res,
            null,
            "berhasil mengubah password"
          );
        } else {
          return responseFormatter.badRequest(res, null, "password anda salah");
        }
      } else {
        return responseFormatter.badRequest(
          res,
          null,
          "confirm password tidak sama dengan password baru"
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};

module.exports = UserController;
