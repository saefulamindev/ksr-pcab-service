const kehadiranServices = require("../services/kehadiranServices");

const kehadiranController = {
  getAll: async (req, res, next) => {
    try {
      const result = await kehadiranServices.getAllData(req);

      if (result) {
        return res.status(200).send(result);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = kehadiranController;
