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
};
module.exports = peraturanController;
