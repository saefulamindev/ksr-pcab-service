const pembayaranServices = require("../services/pembayaranServices");

const uploadController = {
  uploadBuktiBayar: async (req, res, next) => {
    try {
      if (!req.file) {
        res.send({
          message: "harus upload file bukti bayar",
        });
      }
      const { jenis_bayar, id_user } = req.body;
      const bukti_bayar = req.file.path;
      const cekNominal = await pembayaranServices.cekNominalByJenisBayar(
        jenis_bayar,
        id_user
      );
      const Tagihan = await pembayaranServices.cekTagihan(jenis_bayar);
      console.log(cekNominal.nominal, Tagihan.nominal);
      if (cekNominal.nominal >= Tagihan.nominal) {
        return res.send({
          message: "Tagihan Lunas",
        });
      }
      const input = await pembayaranServices.tambahTransaksiBayar(
        jenis_bayar,
        id_user,
        bukti_bayar
      );
      const newInput = await pembayaranServices.getTransaksiBayarById(input[0]);

      return res.status(201).send({
        message: "berhasil mengupload pembayaran",
        id: newInput.id,
        id_user: req.body.id_user,
        nominal: newInput.nominal,
        jenis_bayar: newInput.jenis_bayar,
        bukti_bayar: newInput.bukti_bayar,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).send({
        message: "gagal menambah pembayaran",
      });
    }
  },
};

module.exports = uploadController;
