const refCaptchaServices = require("./refCaptchaServices");
const responseFormatter = require("../../responses/responses");
const refCaptchaController = {
  getCaptcha: (req, res, next) => {
    try {
      const data = refCaptchaServices.random();
      return responseFormatter.success(
        res,
        data,
        "berhasil mendapatkan captcha"
      );
    } catch (error) {
      return responseFormatter.error(
        res,
        null,
        "gagal mendapatkan captcha",
        500
      );
    }
  },
};

module.exports = refCaptchaController;
