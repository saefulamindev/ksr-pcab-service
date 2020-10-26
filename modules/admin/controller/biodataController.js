const biodataServices = require("../services/biodataServices");

const biodataController = {
  get: async (req, res, next) => {
    try {
      const result = await biodataServices.get(req);

      if (result) {
        return res.status(200).send(result);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  detailById: async (req, res, next) => {
    try {
      const result = await biodataServices.detailById(req.params.data);
      console.log(req.params);
      // console.log("cobaaa");
      if (result) {
        // console.log("cobaaa");

        return res.status(200).send(result);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = biodataController;
