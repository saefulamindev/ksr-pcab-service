const pembayaranServices = require("../services/pembayaranServices");

const pembayaranController = {
  get: async (req, res, next) => {
    try {
      const data = await pembayaranServices.getLogBayar(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  upload: async (req, res, next) => {
    // console.log("cobaa");
    try {
      const input = await pembayaranServices.uploadLogBayar(req.body);

      const newInput = await pembayaranServices.getLogBayarById(input[0]);

      const resBerhasil = {
        message: "berhasil mengupload pembayaran",
        nominal: newInput.nominal,
        jenis_bayar: newInput.jenis_bayar,
        bukti_bayar: newInput.bukti_bayar,
      };

      return res.status(201).send(resBerhasil);
    } catch (error) {
      console.log(error);
      const resGagal = {
        message: "gagal menambah pembayaran",
      };

      return res.status(500).send(resGagal);
    }
  },
};

module.exports = pembayaranController;
