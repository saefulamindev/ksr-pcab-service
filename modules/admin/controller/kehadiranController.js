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
      const data = resultWithCount;
      if (data) {
        return responseFormatter.success(res, data, "data ditemukan");
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error");
    }
  },
  getDetail: async (req, res, next) => {
    try {
      const { id_materi } = req.params;
      const cek = await kehadiranServices.cek(id_materi);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const data = await kehadiranServices.getDetailMateri(id_materi);
      return responseFormatter.success(res, data, "data ditemukan");
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error");
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

        return responseFormatter.success(res, data, "berhasil update data");
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error");
    }
  },
  getUser: async (req, res, next) => {
    try {
      const data = await kehadiranServices.getCountByUser();
      if (data) {
        return responseFormatter.success(res, data, "data ditemukan");
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error");
    }
  },

  getDetailUser: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const cek = await kehadiranServices.cek(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }

      const data = await kehadiranServices.getDetailUserById(id_user);

      return responseFormatter.success(res, data, "data ditemukan");
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error");
    }
  },
  updateHadirByUser: async (req, res, next) => {
    try {
      const { id_user, id_materi } = req.params;
      const { presensi } = req.body;
      const result = await kehadiranServices.updateHadirByUserMateri(
        id_user,
        id_materi,
        presensi
      );
      if (result) {
        const data = await kehadiranServices.getHadirByUser(req);
        return responseFormatter.success(res, data, "berhasil update data");
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error");
    }
  },
};

module.exports = kehadiranController;
