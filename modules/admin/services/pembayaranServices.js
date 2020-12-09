const { response } = require("express");
const db = require("../../../config/database");
const pembayaranController = require("../controller/pembayaranController");

const pembayaranServices = {
  getTransaksiBayarById: (id) => {
    const data = db("log_transaksi").where("id", id).first();
    return data;
  },

  tambahTransaksiBayar: (input) => {
    const data = db("log_transaksi").insert({
      id_user: input.id_user,
      nominal: input.nominal,
      jenis_bayar: input.jenis_bayar,
      bukti_bayar: input.bukti_bayar,
    });

    return data;
  },
  getLogBayar: async (all) => {
    const data = await db
      .select(
        "log_transaksi.id",
        "log_transaksi.id_user",
        "tb_peserta.nama_lengkap",
        "log_transaksi.nominal",
        "log_transaksi.jenis_bayar",
        "log_transaksi.bukti_bayar",
        "log_transaksi.validasi"
      )
      .from("log_transaksi")
      .leftJoin("tb_peserta", "log_transaksi.id_user", "tb_peserta.id_user");
    return data;
  },
  getBayar: async (all) => {
    const data = await db
      .select(
        "tb_pembayaran.id_user",
        "tb_peserta.nama_lengkap",
        "tb_pembayaran.nominal",
        "tb_pembayaran.jenis_bayar",
        "tb_pembayaran.status"
      )
      .from("tb_pembayaran")
      .leftJoin("tb_peserta", "tb_pembayaran.id_user", "tb_peserta.id_user");
    return data;
  },
  cekNominalByJenisBayar: async (jenis_bayar, id_user) => {
    const result = await db("log_transaksi")
      .sum({ nominal: "nominal" })
      .where({
        jenis_bayar: jenis_bayar,
        "log_transaksi.id_user": id_user,
      })
      .first();
    return result;
  },
  cekTagihan: async (jenis_bayar, id_user) => {
    const result = await db
      .select("nominal")
      .from("reff_tagihan")
      .where({
        jenis_bayar: jenis_bayar,
      })
      .first();
    return result;
  },
  getByJenisBayar: async (jenis_bayar) => {
    const result = await db
      .select(
        "tb_pembayaran.id_user",
        "tb_peserta.nama_lengkap",
        "tb_pembayaran.nominal",
        "tb_pembayaran.jenis_bayar",
        "tb_pembayaran.status_lunas"
      )
      .from("tb_pembayaran")
      .leftJoin("tb_peserta", "tb_pembayaran.id_user", "tb_peserta.id_user")
      .where({
        jenis_bayar: jenis_bayar,
      });
    return result;
  },
  getSaldoByJenisBayar: async (data) => {
    const result = await db("log_transaksi").sum({ saldo: "nominal" }).where({
      jenis_bayar: data,
      valid: true,
    });
    return result;
  },
  updateLogBayar: async (req) => {
    const id_user = req.params.id_user;
    const validasi = req.body.validasi;

    const hasil = await db("log_transaksi")
      .update({
        validasi: validasi,
      })
      .where("id_user", id_user);
    return hasil;
  },
  updatePembayaran: async (req) => {
    const id_user = req.params.id_user;
    const status_lunas = req.body.status_lunas;

    const hasil = await db("tb_pembayaran")
      .update({
        status_lunas: status_lunas,
      })
      .where("id_user", id_user);
    return hasil;
  },
};

module.exports = pembayaranServices;
