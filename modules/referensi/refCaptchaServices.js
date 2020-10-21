const { response } = require("express");
const db = require("../../config/database");
const captcha_db = [
  {
    soal: "1+2 = ",
    jawaban: "3",
  },
  {
    soal: "2+4 = ",
    jawaban: "6",
  },
  {
    soal: "3+5 = ",
    jawaban: "8",
  },
  {
    soal: "6+3 = ",
    jawaban: "9",
  },
];

const refCaptchaService = {
  get: (index) => {
    return captcha_db[index];
  },
  random: () => {
    const kode = Math.floor(Math.random() * captcha_db.length);
    return {
      ...captcha_db[kode],
      kode: kode,
    };
  },
};

module.exports = refCaptchaService;
