const db = require("../../../config/database");
const validasiController = require("../controller/validasiController");

const validasiServices = {
  getDok: async (all) => {
    const data = await db("tb_peserta").select(
      "id_user",
      "nama_lengkap",
      "file_form_pendaftaran",
      "file_persetujuan",
      "file_komitmen",
      "validasi_dokumen"
    );
    return data;
  },
  updateDataDok: async (req) => {
    const id_user = req.params.id_user;
    const validasi_dokumen = req.body.validasi_dokumen;

    const hasil = await db("tb_peserta")
      .update({
        validasi_dokumen: validasi_dokumen,
      })
      .where("id", id_user);
    return hasil;
  },
  updateDataTransaksi: async (id, valid) => {
    const hasil = await db("log_transaksi")
      .update({
        valid: valid,
      })
      .where({
        id,
      });
    return hasil;
  },
  getDataTransaksi: async (id) => {
    const result = await db("log_transaksi")
      .select("id_user", "jenis_bayar", "valid")
      .where("id", id);
    return result;
  },
  cekPembayaranByJenisBayar: async (jenis_bayar, id_user) => {
    const result = await db("tb_pembayaran").select("*").where({
      jenis_bayar: jenis_bayar,
      "tb_pembayaran.id_user": id_user,
    });
    return result;
  },

  cekNominalPembayaranByJenisBayar: async (jenis_bayar, id_user) => {
    const result = await db("log_transaksi").sum({ nominal: "nominal" }).where({
      jenis_bayar: jenis_bayar,
      "log_transaksi.id_user": id_user,
    });
    return result;
  },
  tambahPembayaran: async (tambah) => {
    const data = db("tb_pembayaran").insert({
      id_user: tambah.id_user,
      nominal: tambah.nominal,
      jenis_bayar: tambah.jenis_bayar,
    });
    return data;
  },
  cekTagihanByJenisBayar: async (jenis_bayar) => {
    const result = await db.select("nominal").from("reff_tagihan").where({
      jenis_bayar: jenis_bayar,
    });
    return result;
  },
  getBayar: async (all) => {
    const data = await db
      .select(
        "log_transaksi.id",
        "log_transaksi.id_user",
        "tb_peserta.nama_lengkap",
        "log_transaksi.nominal",
        "log_transaksi.jenis_bayar",
        "log_transaksi.bukti_bayar",
        "log_transaksi.valid"
      )
      .from("log_transaksi")
      .leftJoin("tb_peserta", "log_transaksi.id_user", "tb_peserta.id_user");
    return data;
  },
};

module.exports = validasiServices;
