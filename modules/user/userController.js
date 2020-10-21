const UserService = require("../user/userServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const saltRounds = bcrypt.genSaltSync(10);
const myPlaintextPassword = "s0//P4$$w0rD";
const refCaptchaServices = require("../referensi/refCaptchaServices");

const UserController = {
  getUser: (req, res, next) => {
    res.json(req.user);
  },

  login: async (req, res, next) => {
    try {
      console.log("req.body: ", req.body);
      const captcha = await refCaptchaServices.get(req.body.kode);
      const resCaptcha = {
        message: "captcha salah",
      };
      if (!captcha || captcha.jawaban !== req.body.jawaban) {
        return res.status(401).send(resCaptcha);
      }
      const user = await UserService.getUserByEmail(req.body.email);
      const resEmailSalah = {
        message: "email salah",
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

      res.json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  daftar: async (req, res, next) => {
    try {
      // console.log("req.body: ", req.body);

      jwt.verify(req.body.token_daftar, process.env.SECRET_DAFTAR, function (
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).send("token tidak valid");
        }
      });

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
        message: "berhasil membuat akun",
        id: newUser.id,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      };
      return res.status(201).send(resBerhasil);
    } catch (error) {
      const resGagal = {
        message: "gagal membuat akun",
      };

      return res.status(500).send(resGagal);
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
