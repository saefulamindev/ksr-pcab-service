const nilaiServices = require("../services/nilaiServices");

const nilaiController = {
  get: async (req, res, next) => {
    try {
      const data = await nilaiServices.getFisik(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await nilaiServices.getFisikById(id);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
module.exports = nilaiController;
