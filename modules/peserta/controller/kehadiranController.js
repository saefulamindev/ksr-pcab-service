const kehadiranServices = require("../services/kehadiranServices");
const responseFormatter = require("../../../responses/responses");

const kehadiranController = {
  getDetailUser: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const cek = await kehadiranServices.cek(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }

      const data = await kehadiranServices.getDetailUserById(id_user);

      return responseFormatter.success(res, data, "data ditemukan");
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error");
    }
  },
};

module.exports = kehadiranController;
