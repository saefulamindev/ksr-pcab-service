const nilaiServices = require("../services/nilaiServices");
const responseFormatter = require("../../../responses/responses");

const nilaiController = {
  // Nilai Fisik
  getFisik: async (req, res, next) => {
    try {
      const data = await nilaiServices.getFisik(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "data tidak ditemukan", 500);
    }
  },
  getFisikById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await nilaiServices.getFisikById(id);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "data tidak ditemukan", 500);
    }
  },

  // Nilai Afektif
  getAfektif: async (req, res, next) => {
    try {
      const data = await nilaiServices.getAfektifNilai(req);
      const cek = await nilaiServices.cekAllAfektif(req);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getAfektifByIdUser: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const data = await nilaiServices.getAfektifNilaiByIdUser(id_user);
      const cek = await nilaiServices.cekAllAfektif(id_user);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  // Nilai Essay
  getEssay: async (req, res, next) => {
    try {
      const { jenis_tes, id_user } = req.params;
      const cek = await nilaiServices.cekEssay(jenis_tes, id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const data = await nilaiServices.getEssayByTes(jenis_tes, id_user);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getEssayById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const cek = await nilaiServices.cek(id);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const data = await nilaiServices.getEssayById(id);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  // Nilai Akhir
  getNilai: async (req, res, next) => {
    try {
      const data = await nilaiServices.getNilai(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getNilaiById: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const cek = await nilaiServices.cekNilaiUser(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const data = await nilaiServices.getNilaiByUser(id_user);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getNilaiAkhirById: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const cekUser = await nilaiServices.cekUser(id_user);
      if (!cekUser) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const cek = await nilaiServices.cekNilaiUser(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const data = await nilaiServices.getNilaiAkhirById(id_user);
      // const pembagi = await nilaiServices.getPembagi(id_user);
      // const nilai_akhir = parseInt(nilai_total.nilai_total) / pembagi.pembagi;
      // const nilai_akhir = parseInt(nilai_total.nilai_total) / 8;
      // const status = nilai_akhir > 75 ? "lulus" : "tidak_lulus";

      // const updateNA = await nilaiServices.updateNA(
      //   id_user,
      //   nilai_akhir,
      //   status
      // );
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      console.log(error.message);
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};
module.exports = nilaiController;
