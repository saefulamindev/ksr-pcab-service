const kehadiranServices = require("../services/kehadiranServices");
const responseFormatter = require("../../../responses/responses");

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
  UpdateByM: async (req, res, next) => {
    try {
      const { id_user, id_materi } = req.params;
      const { presensi } = req.body;

      const result = await kehadiranServices.updateHadirByMatUser(
        id_user,
        id_materi,
        presensi
      );

      if (result) {
        const { id_user, id_materi } = req.params;
        const data = await kehadiranServices.getHadirByMateri(
          id_user,
          id_materi
        );

        return res.status(200).send({
          message: "berhasil update data",
          ...data,
        });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const countKehadiran = await kehadiranServices.getCountByUser();
      // console.log(countKehadiran);
      if (countKehadiran) {
        return res.status(200).send(countKehadiran);
      }
    } catch (error) {
      return res.status(500).send(error.message);
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
  updateHadirByUser: async (req, res, next) => {
    console.log(req.params);
    try {
      const result = await kehadiranServices.updateHadirByUserMateri(req);
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
