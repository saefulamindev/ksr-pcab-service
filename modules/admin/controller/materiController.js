const materiServices = require("../services/materiServices");
const responseFormatter = require("../../../responses/responses");

const materiController = {
  get: async (req, res, next) => {
    try {
      const data = await materiServices.getMateri(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  create: async (req, res, next) => {
    try {
      const { judul_materi, deskripsi, diklat, tanggal, link_file } = req.body;
      const input = await materiServices.inputMateri(
        judul_materi,
        deskripsi,
        diklat,
        tanggal,
        link_file
      );

      const newInput = await materiServices.getMateriById(input[0]);
      const data = {
        id: newInput.id,
        judul_materi: newInput.judul_materi,
        deskripsi: newInput.deskripsi,
        diklat: newInput.diklat,
        tanggal: newInput.tanggal,
        link_file: newInput.link_file,
      };

      if (input) {
        return responseFormatter.success(
          res,
          data,
          "berhasil menambahkan materi diklat"
        );
      }
    } catch (error) {
      return responseFormatter.error(
        res,
        null,
        "gagal menambah materi diklat",
        500
      );
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { judul_materi, deskripsi, diklat, tanggal, link_file } = req.body;
      const cek = await materiServices.cek(id);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const result = await materiServices.updateMateri(
        id,
        judul_materi,
        deskripsi,
        diklat,
        tanggal,
        link_file
      );
      const data = { id, judul_materi, deskripsi, diklat, tanggal, link_file };
      if (result) {
        return responseFormatter.success(res, data, "berhasil mengubah data");
      }
    } catch (error) {
      return responseFormatter.error(
        res,
        null,
        "gagal mengubah materi diklat",
        500
      );
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const cek = await materiServices.cek(id);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const result = await materiServices.deleteMateri(id);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { id }),
          "berhasil menghapus data"
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error");
    }
  },
};

module.exports = materiController;
