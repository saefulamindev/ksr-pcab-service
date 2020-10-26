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

      const resBerhasil = {
        message: "berhasil menambah pengumuman",
        judul: newInput.judul,
        deskripsi: newInput.deskripsi,
      };

      return res.status(201).send(resBerhasil);
    } catch (error) {
      const resGagal = {
        message: "gagal menambah pengumuman",
      };

      return res.status(500).send(resGagal);
    }
  },
};
module.exports = pengumumanController;
