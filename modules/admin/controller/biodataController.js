const biodataServices = require("../services/biodataServices");
const responseFormatter = require("../../../responses/responses");

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

  getById: async (req, res, next) => {
    console.log(req.params);
    try {
      const { id_user } = req.params;
      const result = await biodataServices.detail(id_user);
      if (result) {
        return res.status(200).send(result);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = biodataController;
