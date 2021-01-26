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
  getByIdUser: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const data = await pembayaranServices.getBayarByIdUser(id_user);
      const cekUser = await pembayaranServices.cekPembayaran(id_user);
      if (!cekUser) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  getByJenisBayar: async (req, res, next) => {
    try {
      const { jenis_bayar } = req.params;
      const cek = await pembayaranServices.cekByJenis(jenis_bayar);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const data = await pembayaranServices.getByJenisBayar(jenis_bayar);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getTagihan: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const { jenis_bayar } = req.body;
      const cek = await pembayaranServices.cek(id_user);
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
};

module.exports = pembayaranController;
