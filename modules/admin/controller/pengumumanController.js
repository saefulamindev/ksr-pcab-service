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

  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = {
        judul: req.body.judul,
        deskripsi: req.body.deskripsi,
      };

      console.log(id, data);
      const result = await pengumumanController.update(id);

      // const newUpdate = await pengumumanServices.getPengumumanById(data);

      // const resBerhasil = {
      //   message: "berhasil mengubah pengumuman",
      //   judul: newUpdate.judul,
      //   deskripsi: newUpdate.deskripsi,
      // };
      if (result) {
        return res.status(200).send(data);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
module.exports = pengumumanController;
