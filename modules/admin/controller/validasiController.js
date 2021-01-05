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
      const data = await validasiServices.getTransaksiById(id_user);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  updateTransaksi: async (req, res, next) => {
    const { id } = req.params;
    const { valid } = req.body;
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
        // return responseFormatter.success(
        //   (res, (data = { id_user, jenis_bayar })),
        //   "berhasil menambahkan data pembayaran baru",
        //   200
        // );
        return res.status(200).send({
          message: "berhasil menambah data pembayaran baru",
          id_user,
          jenis_bayar,
          // nominal,
        });
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
        // return responseFormatter.success(
        //   (res, (data = update)),
        //   "berhasil menambahkan data pembayaran baru",
        //   200
        // );
        return res.status(200).send({
          message: "berhasil menambah data pembayaran baru",
          id_user,
          jenis_bayar,
          // nominal,
          status,
        });
      }
    } else {
      const update_valid = await validasiServices.update_valid(id, valid);
      const cek = await validasiServices.cek(id_user, jenis_bayar);

      return res.send({
        message: "transaksi tidak valid",
      });
    }
  },
};

module.exports = validasiController;
