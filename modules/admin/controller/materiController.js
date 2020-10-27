const materiServices = require("../services/materiServices");

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

      const newUpdate = await materiServices.getMateriById(result);
      console.log(req.params.id);

      const resBerhasil = {
        message: "berhasil mengubah materi diklat",
        id: newUpdate.id,
        judul_materi: newUpdate.judul_materi,
        deskripsi: newUpdate.deskripsi,
        diklat: newUpdate.diklat,
        tanggal: newUpdate.tanggal,
        link_file: newUpdate.link_file,
      };
      if (result) {
        // console.log(req.params.id);
        return res.status(200).json(resBerhasil);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const result = await materiServices.deleteMateri(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil menghapus materi diklat",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = materiController;
