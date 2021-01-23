const profilServices = require("../services/profilServices");
const responseFormatter = require("../../../responses/responses");

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

  getByIdUser: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const data = await profilServices.getProfilById(id_user);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "data tidak ditemukan", 500);
    }
  },
};

module.exports = profilController;
