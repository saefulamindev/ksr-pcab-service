const adminServices = require("../services/adminServices");

const adminController = {
  countUser: async (req, res, next) => {
    try {
      const { tahap } = req.params;
      const jumlah = await adminServices.countUserByTahap(tahap);

      if (jumlah) {
        return res.status(200).send(jumlah);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateTahap: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { tahap } = req.body;
      const result = await adminServices.updateTahap(id, tahap);

      if (result) {
        return res.status(200).send({
          message: "berhasil update data",
          id,
          tahap,
        });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};
module.exports = adminController;
