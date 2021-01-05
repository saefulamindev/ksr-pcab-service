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
      bukti_bayar: req.file.path,
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
        "tb_pembayaran.status"
      )
      .from("tb_pembayaran")
      .leftJoin("tb_peserta", "tb_pembayaran.id_user", "tb_peserta.id_user")
      .where({
        jenis_bayar,
      });
    return result;
  },
  getSaldoByJenisBayar: async (jenis_bayar) => {
    const result = await db("log_transaksi").sum({ saldo: "nominal" }).where({
      jenis_bayar,
      valid: true,
    });
    return result;
  },
  cek: async (jenis_bayar) => {
    const result = await db("log_transaksi")
      .select("*")
      .where({ jenis_bayar })
      .first();
    return result;
  },
  //   cekdataTagihan: async (jenis_bayar, id_user) => {
  //     const result = await db("log_transaksi")
  //       .select("*")
  //       .where({ jenis_bayar, id_user })
  //       .first();
  //     return result;
  //   },
};

module.exports = pembayaranServices;
