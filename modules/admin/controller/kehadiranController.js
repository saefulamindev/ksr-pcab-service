const kehadiranServices = require("../services/kehadiranServices");

const kehadiranController = {
  getAll: async (req, res, next) => {
    try {
      const result = await kehadiranServices.getAllData(req);
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
      return res.status(500).send(error);
    }
  },
  getDetail: async (req, res, next) => {
    try {
      const result = await kehadiranServices.getDetailMateri(
        req.params.id_materi
      );

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  Update: async (req, res, next) => {
    try {
      const result = await kehadiranServices.updateHadir(req);
      if (result) {
        const data = await kehadiranServices.getHadirByMateri(req);

        return res.status(200).send({
          message: "berhasil update data",
          ...data,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const result = await kehadiranServices.getUserAll(req);

      const mapKehadiran = result.map(async (hadir) => {
        const countKehadiran = await kehadiranServices.getCountByUser(
          hadir.id_user
        );

        return {
          ...hadir,
          jumlah: countKehadiran.jumlah,
        };
      });

      const resultWithCount = await Promise.all(mapKehadiran);
      console.log(resultWithCount);

      if (resultWithCount) {
        return res.status(200).send(resultWithCount);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  getDetailUser: async (req, res, next) => {
    try {
      const result = await kehadiranServices.getDetailUserById(
        req.params.id_user
      );

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateHadir: async (req, res, next) => {
    try {
      const result = await kehadiranServices.updateHadirByMateri(req);
      if (result) {
        const data = await kehadiranServices.getHadirByUser(req);

        return res.status(200).send({
          message: "berhasil update data",
          ...data,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = kehadiranController;
