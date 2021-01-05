const peraturanServices = require("../services/peraturanServices");
const responseFormatter = require("../../../responses/responses");

const peraturanController = {
  get: async (req, res, next) => {
    try {
      const data = await peraturanServices.get(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  create: async (req, res, next) => {
    // console.log("cobaa");
    try {
      const { judul, deskripsi } = req.body;
      const input = await peraturanServices.inputPeraturan(judul, deskripsi);

      const newInput = await peraturanServices.getPeraturanById(input[0]);
      const data = { id: newInput.id, judul, deskripsi };
      return responseFormatter.success(
        res,
        data,
        "berhasil menambahkan peraturan",
        200
      );
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { judul, deskripsi } = req.body;
      const cek = await peraturanServices.cek(id);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const result = await peraturanServices.updateData(id, judul, deskripsi);
      const newUpdate = await peraturanServices.getPeraturanById(id);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { id, judul, deskripsi }),
          "berhasil mengubah peraturan",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const cek = await peraturanServices.cek(id);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const result = await peraturanServices.deleteData(id);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { id }),
          "berhasil menghapus peraturan",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};
module.exports = peraturanController;
