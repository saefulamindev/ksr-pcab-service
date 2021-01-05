const kelulusanServices = require("../services/kelulusanServices");
const responseFormatter = require("../../../responses/responses");

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
  update: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const { status_kelulusan } = req.body;
      const cek = await kelulusanServices.cek(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const result = await kelulusanServices.updateData(
        id_user,
        status_kelulusan
      );

      if (result) {
        return responseFormatter.success(
          res,
          (data = { id_user, status_kelulusan }),
          "berhasil update data",
          200
        );
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = kelulusanController;
