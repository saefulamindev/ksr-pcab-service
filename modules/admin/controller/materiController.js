const materiServices = require("../services/materiServices");
const responseFormatter = require("../../../responses/responses");

const materiController = {
  get: async (req, res, next) => {
    try {
      const data = await materiServices.getMateri(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const input = await materiServices.inputMateri(req.body);

      const newInput = await materiServices.getMateriById(input[0]);

      if (input) {
        return res.status(201).json({
          message: "berhasil menambah materi diklat",
          id: newInput.id,
          judul_materi: newInput.judul_materi,
          deskripsi: newInput.deskripsi,
          diklat: newInput.diklat,
          tanggal: newInput.tanggal,
          link_file: newInput.link_file,
        });
      }
    } catch (error) {
      const resGagal = {
        message: "gagal menambah materi diklat",
      };

      return res.status(500).send(resGagal);
    }
  },
  update: async (req, res, next) => {
    try {
      const result = await materiServices.updateMateri(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah materi diklat",
          id: req.params.id,
          judul_materi: req.body.judul_materi,
          deskripsi: req.body.deskripsi,
          diklat: req.body.diklat,
          tanggal: req.body.tanggal,
          link_file: req.body.link_file,
        });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await materiServices.deleteMateri(id);

      if (result) {
        return res.status(200).json({
          message: "berhasil menghapus materi diklat",
          id,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = materiController;
