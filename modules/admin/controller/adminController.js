const adminServices = require("../services/adminServices");
const responseFormatter = require("../../../responses/responses");

const adminController = {
  countUser: async (req, res, next) => {
    try {
      const { tahap } = req.params;
      if (tahap < 0 || tahap > 4) {
        return responseFormatter.badRequest(
          res,
          tahap,
          "data tidak ditemukan",
          404
        );
      }
      const data = await adminServices.countUserByTahap(tahap);

      if (data) {
        return responseFormatter.success(res, data, "data ditemukan", 200);
      }
    } catch (error) {
      return responseFormatter.error(
        res,
        (data = null),
        "internal server error",
        500
      );
    }
  },
  updateTahap: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { tahap } = req.body;
      const result = await adminServices.updateTahap(id, tahap);
      if (result) {
        return responseFormatter.success(
          res,
          (data = { id, tahap }),
          "berhasil mengubah data",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(
        res,
        (data = null),
        "internal server error",
        500
      );
    }
  },
};
module.exports = adminController;
