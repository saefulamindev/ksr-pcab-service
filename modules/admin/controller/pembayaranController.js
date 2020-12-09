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
  tambahPembayaran: async (req, res, next) => {
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

      const input = await pembayaranServices.uploadLogBayar(req.body);
      const newInput = await pembayaranServices.getLogBayarById(input[0]);

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

  create: async (req, res, next) => {
    try {
      const input = await pembayaranServices.createBayar(req.body);

      const newInput = await pembayaranServices.getBayarById(input[0]);

      const resBerhasil = {
        message: "berhasil menambah pembayaran",
        id_user: newInput.id_user,
        nominal: newInput.nominal,
        jenis_bayar: newInput.jenis_bayar,
        status_lunas: newInput.status_lunas,
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
  updateBayar: async (req, res, next) => {
    try {
      const result = await pembayaranServices.updatePembayaran(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah data",
          id_user: req.params.id_user,
          status_lunas: req.body.status_lunas,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = pembayaranController;
