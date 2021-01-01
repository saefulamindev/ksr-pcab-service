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
};

module.exports = pembayaranServices;
