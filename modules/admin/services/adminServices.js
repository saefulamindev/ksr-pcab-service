const db = require("../../../config/database");

const adminServices = {
  countUserByTahap: async (tahap) => {
    const hasil = await db("tb_users")
      .count({ id: "id" })
      .where("tahap", tahap);
    return hasil;
  },
};

module.exports = adminServices;
