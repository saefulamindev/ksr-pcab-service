const kelulusanServices = require("../services/kelulusanServices");
const responseFormatter = require("../../../responses/responses");
const { getByIdUser } = require("../services/kelulusanServices");

const kelulusanController = {
  get: async (req, res, next) => {
    try {
      const data = await kelulusanServices.get(req);

      if (data) {
        return responseFormatter.success(res, data, "data ditemukan", 200);
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  getByIdUser: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const data = await kelulusanServices.getByIdUser(id_user);
      const cekKelulusan = await kelulusanServices.cek(id_user);
      if (!cekKelulusan) {
        return responseFormatter.error(res, null, "data tidak ditemukan");
      }
      if (data) {
        return responseFormatter.success(res, data, "data ditemukan", 200);
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};

module.exports = kelulusanController;
