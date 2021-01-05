const biodataServices = require("../services/biodataServices");
const responseFormatter = require("../../../responses/responses");

const biodataController = {
  get: async (req, res, next) => {
    try {
      const result = await biodataServices.get(req);

      if (result) {
        return responseFormatter.success(
          res,
          (data = result),
          "data berhasil ditemukan",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  getById: async (req, res, next) => {
    console.log(req.params);
    try {
      const { id_user } = req.params;
      const result = await biodataServices.detail(id_user);
      if (result) {
        return responseFormatter.success(
          res,
          (data = result),
          "data berhasil ditemukan",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};

module.exports = biodataController;
