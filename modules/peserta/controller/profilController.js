const profilServices = require("../services/profilServices");

const profilController = {
  //   get: async (req, res, next) => {
  //     try {
  //       const result = await biodataServices.getProfil(req);

  //       if (result) {
  //         return res.status(200).send(result);
  //       }
  //     } catch (error) {
  //       return res.status(500).send(error);
  //     }
  //   },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await profilServices.getProfil(id);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = profilController;
