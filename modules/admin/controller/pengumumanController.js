const pengumumanServices = require("../services/pengumumanServices");
const responseFormatter = require("../../../responses/responses");

const pengumumanController = {
  get: async (req, res, next) => {
    try {
      const data = await pengumumanServices.get(req);
      const cek = await pengumumanServices.cekAll(req);
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
  create: async (req, res, next) => {
    try {
      const { judul, deskripsi } = req.body;
      const input = await pengumumanServices.inputPengumuman(judul, deskripsi);
      const newInput = await pengumumanServices.getPengumumanById(input[0]);
      data = {
        id: newInput.id,
        judul: newInput.judul,
        deskripsi: newInput.deskripsi,
      };

      return responseFormatter.success(
        res,
        data,
        "berhasil menambahkan pengumuman",
        200
      );
    } catch (error) {
      return responseFormatter.error(
        res,
        null,
        "gagal menambah pengumuman",
        500
      );
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { judul, deskripsi } = req.body;
      const cek = await pengumumanServices.cekAll(id);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const result = await pengumumanServices.updateData(id, judul, deskripsi);

      const newUpdate = await pengumumanServices.getPengumumanById(id);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { id, judul, deskripsi }),
          "berhasil mengubah pengumuman",
          200
        );
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const cek = await pengumumanServices.cek(id);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const result = await pengumumanServices.deleteData(id);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { id }),
          "berhasil menghapus pengumuman",
          200
        );
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
module.exports = pengumumanController;
