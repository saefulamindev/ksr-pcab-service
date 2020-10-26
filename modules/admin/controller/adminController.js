const adminServices = require("../services/adminServices");

const adminController = {
  countUser: async (req, res, next) => {
    try {
      const jumlah = await adminServices.countUserByTahap(req.params.tahap);
      console.log(req.params, jumlah);

      if (jumlah) {
        return res.status(200).send(jumlah);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
module.exports = adminController;
