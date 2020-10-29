const { NotExtended } = require("http-errors");
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
  updateBayar: async (req, res, next) => {
    try {
      const result = await validasiServices.updateDataBayar(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil update data",
          id: req.params.id,
          status_lunas: req.body.status_lunas,
          validasi_admin: req.body.validasi_admin,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
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
