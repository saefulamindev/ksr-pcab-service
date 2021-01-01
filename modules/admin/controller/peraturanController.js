const peraturanServices = require("../services/peraturanServices");

const peraturanController = {
  get: async (req, res, next) => {
    try {
      const data = await peraturanServices.get(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  create: async (req, res, next) => {
    // console.log("cobaa");
    try {
      const input = await peraturanServices.inputPeraturan(req.body);

      const newInput = await peraturanServices.getPeraturanById(input[0]);

      return res.status(201).send({
        message: "berhasil menambah peraturan",
        id: newInput.id,
        judul: newInput.judul,
        deskripsi: newInput.deskripsi,
      });
    } catch (error) {
      return res.status(500).send({
        message: "gagal menambah peraturan",
      });
    }
  },
  update: async (req, res, next) => {
    try {
      const result = await peraturanServices.updateData(req);

      const newUpdate = await peraturanServices.getPeraturanById(result);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah peraturan",
          id: newUpdate.id,
          judul: newUpdate.judul,
          deskripsi: newUpdate.deskripsi,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const result = await peraturanServices.deleteData(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil menghapus data",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
module.exports = peraturanController;
