const kehadiranServices = require("../services/kehadiranServices");

const kehadiranController = {
  getAll: async (req, res, next) => {
    try {
      const result = await kehadiranServices.getAllData(req);
      console.log(result);
      const mapKehadiran = result.map(async (materi) => {
        const countKehadiran = await kehadiranServices.getCountById(materi.id);

        return {
          ...materi,
          jumlah: countKehadiran.jumlah,
        };
      });

      const resultWithCount = await Promise.all(mapKehadiran);
      console.log(resultWithCount);

      if (resultWithCount) {
        return res.status(200).send(resultWithCount);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};

module.exports = kehadiranController;
