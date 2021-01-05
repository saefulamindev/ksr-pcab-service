const validasiServices = require("./../services/validasiServices");
const responseFormatter = require("../../../responses/responses");

const validasiController = {
  getDok: async (req, res, next) => {
    try {
      const data = await validasiServices.getDok(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  updateDok: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const { validasi_dokumen } = req.body;
      const cek = await validasiServices.cekId(id_user);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const result = await validasiServices.updateDataDok(
        id_user,
        validasi_dokumen
      );

      if (result) {
        return responseFormatter.success(
          res,
          (data = { validasi_dokumen }),
          "berhasil update validasi dokumen",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  get: async (req, res, next) => {
    try {
      const data = await validasiServices.getTransaksi(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const cek = await validasiServices.cektransaksi(id_user);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const data = await validasiServices.getTransaksiById(id_user);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  updateTransaksi: async (req, res, next) => {
    const { id } = req.params;
    const { valid } = req.body;
    const ceklog = await validasiServices.ceklog(id);
    if (!ceklog) {
      return responseFormatter.badRequest(
        res,
        null,
        "data tidak ditemukan",
        404
      );
    }
    const data = await validasiServices.getDataTransaksi(id);
    const id_user = data.id_user;
    const jenis_bayar = data.jenis_bayar;
    if (parseInt(valid) === 1) {
      const update_valid = await validasiServices.update_valid(id, valid);
      const cek = await validasiServices.cek(id_user, jenis_bayar);
      // console.log({ data });

      if (!cek) {
        const cek_tagihan = await validasiServices.cek_tagihan(jenis_bayar);
        const status =
          data.nominal >= cek_tagihan.nominal ? "lunas" : "belum_lunas";

        const input = await validasiServices.tambahNewBayar(
          id_user,
          jenis_bayar,
          data.nominal,
          status
        );
        const newBayar = await validasiServices.getBayarById(input[0]);

        const result = {
          valid,
          id_user: newBayar.id_user,
          jenis_bayar: newBayar.jenis_bayar,
        };
        return responseFormatter.success(
          res,
          result,
          "berhasil menambahkan data pembayaran baru",
          200
        );
      } else {
        const cek_tagihan = await validasiServices.cek_tagihan(jenis_bayar);
        const nominal_now = cek.nominal + data.nominal;

        console.log(data.nominal);
        console.log(nominal_now);
        // res.send("lanjut ubah status");

        const status =
          nominal_now >= cek_tagihan.nominal ? "lunas" : "belum_lunas";
        const update = await validasiServices.updateDataBayar(
          id_user,
          jenis_bayar,
          nominal_now,
          status
        );
        return responseFormatter.success(
          res,
          null,
          "berhasil update pembayaran",
          200
        );
      }
    } else {
      const update_valid = await validasiServices.update_valid(id, valid);
      const cek = await validasiServices.cek(id_user, jenis_bayar);

      return responseFormatter.success(res, null, "transaksi tidak valid");
    }
  },
};

module.exports = validasiController;
