const pembayaranServices = require("../services/pembayaranServices");
const responseFormatter = require("../../../responses/responses");

const pembayaranController = {
  get: async (req, res, next) => {
    try {
      const data = await pembayaranServices.getBayar(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getByJenisBayar: async (req, res, next) => {
    try {
      const { jenis_bayar } = req.params;
      const data = await pembayaranServices.getByJenisBayar(jenis_bayar);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getSaldo: async (req, res, next) => {
    try {
      const { jenis_bayar } = req.params;
      const cek = await pembayaranServices.cek(jenis_bayar);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const data = await pembayaranServices.getSaldoByJenisBayar(jenis_bayar);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getTagihan: async (req, res, next) => {
    try {
      const { jenis_bayar, id_user } = req.params;
      const cek = await pembayaranServices.cek(jenis_bayar);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const cekNominal = await pembayaranServices.cekNominalByJenisBayar(
        jenis_bayar,
        id_user
      );
      const cekTagihan = await pembayaranServices.cekTagihan(jenis_bayar);
      const Tagihan = cekTagihan.nominal - cekNominal.nominal;
      return responseFormatter.success(
        res,
        (data = { Tagihan }),
        "data ditemukan",
        200
      );
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  tambahTransaksi: async (req, res, next) => {
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

module.exports = pembayaranController;
