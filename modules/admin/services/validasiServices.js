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
  updateDataBayar: async (req) => {
    const id = req.params.id;
    const status_lunas = req.body.status_lunas;
    const validasi_admin = req.body.validasi_admin;

    const hasil = await db("tb_pembayaran")
      .update({
        status_lunas: status_lunas,
        validasi_admin: validasi_admin,
      })
      .where("id", id);
    return hasil;
  },
  getBayar: async (all) => {
    const data = await db
      .select(
        "tb_pembayaran.id_user",
        "tb_peserta.nama_lengkap",
        "tb_pembayaran.nominal",
        "tb_pembayaran.jenis_bayar",
        "tb_pembayaran.bukti_bayar",
        "tb_pembayaran.status_lunas",
        "tb_pembayaran.validasi_admin"
      )
      .from("tb_pembayaran")
      .leftJoin("tb_peserta", "tb_pembayaran.id_user", "tb_peserta.id_user");
    return data;
  },
};

module.exports = validasiServices;
