const pembayaranServices = require("../services/pembayaranServices");

const pembayaranController = {
  get: async (req, res, next) => {
    try {
      const data = await pembayaranServices.getBayar(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getByJenisBayar: async (req, res, next) => {
    try {
      const data = await pembayaranServices.getByJenisBayar(
        req.params.jenis_bayar
      );
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getSaldo: async (req, res, next) => {
    try {
      const data = await pembayaranServices.getSaldoByJenisBayar(
        req.params.jenis_bayar
      );
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getTagihan: async (req, res, next) => {
    try {
      const { jenis_bayar, id_user } = req.params;

      const cekNominal = await pembayaranServices.cekNominalByJenisBayar(
        jenis_bayar,
        id_user
      );
      const cekTagihan = await pembayaranServices.cekTagihan(jenis_bayar);
      const Tagihan = cekTagihan.nominal - cekNominal.nominal;

      return res.status(200).send({ Tagihan });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  tambahTransaksi: async (req, res, next) => {
    try {
      const { jenis_bayar, id_user } = req.body;
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
      const input = await pembayaranServices.tambahTransaksiBayar(req.body);
      const newInput = await pembayaranServices.getTransaksiBayarById(input[0]);

      const resBerhasil = {
        message: "berhasil mengupload pembayaran",
        id: newInput.id,
        id_user: req.body.id_user,
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
