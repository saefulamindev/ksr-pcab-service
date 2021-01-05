const validasiServices = require("./../services/validasiServices");
const responseFormatter = require("../../../responses/responses");

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
  get: async (req, res, next) => {
    try {
      const data = await validasiServices.getTransaksi(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const data = await validasiServices.getTransaksiById(id_user);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = validasiController;
