const { random } = require("./refCaptchaServices");
const refCaptchaServices = require("./refCaptchaServices");
const refCaptchaController = {
  getCaptcha: (req, res, next) => {
    try {
      const randomCaptcha = refCaptchaServices.random();

      return res.status(200).send(randomCaptcha);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = refCaptchaController;
