const db = require("../../../config/database");

const adminServices = {
  countUserByTahap: async (tahap) => {
    const hasil = await db("tb_users")
      .count({ jumlah: "id" })
      .where("tahap", tahap)
      .first();
    return hasil;
  },
  cekTahap: async (tahap) => {
    const hasil = await db("tb_users").select("tahap").where({ tahap: tahap });
    return hasil;
  },
  updateTahap: async (id, tahap) => {
    const hasil = await db("tb_users")
      .update({
        tahap: tahap,
      })
      .where({
        id,
      });
    return hasil;
  },
};

module.exports = adminServices;
