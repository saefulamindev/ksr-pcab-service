const UserService = require("../user/userServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json, query } = require("express");
const saltRounds = bcrypt.genSaltSync(10);
const myPlaintextPassword = "s0//P4$$w0rD";
const refCaptchaServices = require("../referensi/refCaptchaServices");
const nodemailer = require("nodemailer");

const UserController = {
  getUser: (req, res, next) => {
    res.json(req.user);
  },

  login: async (req, res, next) => {
    try {
      // console.log("req.body: ", req.body);
      const captcha = await refCaptchaServices.get(req.body.kode);
      const resCaptcha = {
        message: "captcha salah",
      };
      if (!captcha || captcha.jawaban !== req.body.jawaban) {
        return res.status(401).send(resCaptcha);
      }
      const user = await UserService.getUserByEmail(req.body.email);
      const resEmailSalah = {
        message: "email tidak terdaftar",
      };

      if (!user) {
        res.status(404).send(resEmailSalah);
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      const resPasswdSalah = {
        message: "password salah",
      };

      if (!match) {
        res.status(404).send(resPasswdSalah);
      }
      if (!user.isVerified) {
        res.status(404).send({
          message: "email belum di verifikasi. silakan cek email anda",
        });
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
        token: tokenJWT,
      };
      return res.json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  daftar: async (req, res, next) => {
    try {
      jwt.verify(
        req.body.token_daftar,
        process.env.SECRET_DAFTAR,
        function (err, decoded) {
          if (err) {
            return res.status(400).send("token tidak valid");
          }
        }
      );

      req.body.password = bcrypt.hashSync(req.body.password, saltRounds);

      const cekUser = await UserService.getUserByEmail(req.body.email);
      const resEmailAda = {
        message: "email sudah ada",
      };
      if (cekUser) {
        return res.status(200).send(resEmailAda);
      }
      const input = await UserService.createUser(req.body);

      const newUser = await UserService.getUserById(input[0]);
      const resBerhasil = {
        message:
          "berhasil membuat akun dan mengirimkan email verikasi. harap verikasi email segera.",
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
        from: "no-reply.pcab@ksrpmiunitunj.org", // Sender address
        to: newUser.email, // List of recipients
        subject: "Verifikasi Akun Email PCAB 2020", // Subject line
        html:
          "Hello " +
          req.body.email +
          "\n\n, " +
          "Please verify your account by clicking the link: \nhttp://" +
          `<a href="${url}">` +
          url +
          "</a>" +
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
        ...resBerhasil,
        mailOptions,
      });
    } catch (error) {
      console.log(erroe.message);
      const resGagal = {
        message: "gagal membuat akun",
      };

      console.log(error.message);
      return res.status(500).send(resGagal);
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
            return res.status(400).send("token email tidak valid");
          }
          id = decoded.data;
        }
      );
      const newUser = await UserService.getUserById(id);
      if (!newUser) {
        return res.status(400).send({
          message: "email tidak ada.",
        });
      }
      if (newUser.isVerified) {
        return res.status(409).send({
          message: "email sudah di verifikasi. silakan login.",
        });
      }
      const updateUserVerified = await UserService.updateVerified(id);
      const resBerhasil = {
        message: "berhasil di verifikasi",
      };
      return res.status(200).send(resBerhasil);
    } catch (error) {
      return res.status(500).send(error.message);
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
    return res.status(200).send({
      tokenJWT_daftar,
    });
  },
};

module.exports = UserController;
