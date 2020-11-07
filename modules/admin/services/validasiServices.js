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
    const validasi = req.body.validasi;

    const hasil = await db("tb_pembayaran_log")
      .update({
        validasi: validasi,
      })
      .where("id", id);
    return hasil;
  },
  getBayar: async (all) => {
    const data = await db
      .select(
        "tb_pembayaran_log.id_user",
        "tb_peserta.nama_lengkap",
        "tb_pembayaran_log.nominal",
        "tb_pembayaran_log.jenis_bayar",
        "tb_pembayaran_log.bukti_bayar",
        "tb_pembayaran_log.validasi"
      )
      .from("tb_pembayaran_log")
      .leftJoin(
        "tb_peserta",
        "tb_pembayaran_log.id_user",
        "tb_peserta.id_user"
      );
    return data;
  },
};

module.exports = validasiServices;
