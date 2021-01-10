const { response } = require("express");
const db = require("../../../config/database");
const uploadController = require("../controller/uploadController");

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
  getBayarByIdUser: async (id_user) => {
    const data = await db
      .select(
        "tb_pembayaran.id_user",
        "tb_peserta.nama_lengkap",
        "tb_pembayaran.nominal",
        "tb_pembayaran.jenis_bayar",
        "tb_pembayaran.status"
      )
      .from("tb_pembayaran")
      .leftJoin("tb_peserta", "tb_pembayaran.id_user", "tb_peserta.id_user")
      .where({ "tb_pembayaran.id_user": id_user });
    return data;
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
  cek: async (id_user) => {
    const result = await db("tb_peserta")
      .select("*")
      .where({ id_user })
      .first();
    return result;
  },
  cekByJenis: async (jenis_bayar) => {
    const result = await db("tb_pembayaran")
      .select("*")
      .where({ jenis_bayar })
      .first();
    return result;
  },
};

module.exports = pembayaranServices;
