const pengumumanServices = require("../services/pengumumanServices");

const pengumumanController = {
  get: async (req, res, next) => {
    try {
      const data = await pengumumanServices.get(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const input = await pengumumanServices.inputPengumuman(req.body);

      const newInput = await pengumumanServices.getPengumumanById(input[0]);

      return res.status(201).send({
        message: "berhasil menambah pengumuman",
        id: newInput.id,
        judul: newInput.judul,
        deskripsi: newInput.deskripsi,
      });
    } catch (error) {
      return res.status(500).send({
        message: "gagal menambah pengumuman",
      });
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { judul, deskripsi } = req.body;
      const cek = await pengumumanServices.cek(id);
      if (!cek) {
        res.status(404).send({
          message: "data tidak ditemukan",
        });
      }
      const result = await pengumumanServices.updateData(id, judul, deskripsi);

      const newUpdate = await pengumumanServices.getPengumumanById(id);
      if (result) {
        return res.status(200).send({
          message: "berhasil mengubah pengumuman",
          id: newUpdate.id,
          judul: newUpdate.judul,
          deskripsi: newUpdate.deskripsi,
        });
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
        res.status(404).send({
          message: "data tidak ditemukan",
        });
      }
      const result = await pengumumanServices.deleteData(id);

      if (result) {
        return res.status(200).json({
          message: "berhasil menghapus data",
          id,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
module.exports = pengumumanController;
