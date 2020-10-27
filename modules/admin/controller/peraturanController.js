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

      const resBerhasil = {
        message: "berhasil menambah peraturan",
        judul: newInput.judul,
        deskripsi: newInput.deskripsi,
      };

      return res.status(201).send(resBerhasil);
    } catch (error) {
      const resGagal = {
        message: "gagal menambah peraturan",
      };

      return res.status(500).send(resGagal);
    }
  },
  update: async (req, res, next) => {
    try {
      const result = await peraturanServices.updateData(req);

      const newUpdate = await peraturanServices.getPeraturanById(result);

      const resBerhasil = {
        message: "berhasil mengubah peraturan",
        id: newUpdate.id,
        judul: newUpdate.judul,
        deskripsi: newUpdate.deskripsi,
      };
      if (result) {
        return res.status(200).json(resBerhasil);
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
