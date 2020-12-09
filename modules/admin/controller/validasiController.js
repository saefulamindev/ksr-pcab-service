const validasiServices = require("./../services/validasiServices");

const validasiController = {
  getDok: async (req, res, next) => {
    try {
      const data = await validasiServices.getDok(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateDok: async (req, res, next) => {
    try {
      const result = await validasiServices.updateDataDok(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil update data",
          id_user: req.params.id_user,
          validasi_dokumen: req.body.validasi_dokumen,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateTransaksi: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { valid } = req.body;
      const result = await validasiServices.updateDataTransaksi(id, valid);
      const data = await validasiServices.getDataTransaksi(id);
      if (result) {
        return res.status(200).json({
          message: "berhasil update data",
          data,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  valid: async (req, res, next) => {
    try {
      const { id } = req.params;
      const transaksi = await validasiServices.getLogTransaksi(id);
      return console.log(transaksi);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  get: async (req, res, next) => {
    try {
      const data = await validasiServices.getBayar(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = validasiController;
