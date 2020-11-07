const db = require("../../../config/database");
const pembayaranController = require("../controller/pembayaranController");

const pembayaranServices = {
  getLogBayarById: (id) => {
    const data = db("tb_pembayaran_log").where("id", id).first();
    return data;
  },
  uploadLogBayar: (input) => {
    const data = db("tb_pembayaran_log").insert({
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

module.exports = pembayaranServices;
