const kehadiranServices = require("../services/kehadiranServices");

const kehadiranController = {
  getUser: async (req, res, next) => {
    try {
      const result = await kehadiranServices.getUserById(req.params.id_user);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = kehadiranController;
