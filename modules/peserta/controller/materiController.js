const materiServices = require("../services/materiServices");
const responseFormatter = require("../../../responses/responses");

const materiController = {
  get: async (req, res, next) => {
    try {
      const data = await materiServices.getMateri(req);
      const cek = await materiServices.cekAll(req);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await materiServices.getMateriById(id);
      const cek = await materiServices.cekAll(id);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};

module.exports = materiController;
