const db = require("../../../config/database");

const adminServices = {
  countUserByTahap: async (req) => {
    const hasil = await db("tb_users").count({ jumlah: "id" }).where({
      tahap: "0",
      role: "user",
    });
    return hasil;
  },
};

module.exports = adminServices;
