const soalServices = require("./../services/soalServices");
const responseFormatter = require("../../../responses/responses");

const soalController = {
  getPG: async (req, res, next) => {
    try {
      const data = await soalServices.getPGsoal(req);
      const cek = await soalServices.cekAllPG(req);
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
  getPGById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await soalServices.getPGsoalById(id);
      const cek = await soalServices.cekAllPG(id);
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

  //   Soal Essay
  getEssay: async (req, res, next) => {
    try {
      const data = await soalServices.getEssaySoal(req);
      const cek = await soalServices.cekAllEssay(req);
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
  getEssayById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await soalServices.getEssaySoalById(id);
      const cek = await soalServices.cekAllEssay(id);
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

  // Kirim jawaban PG
  kirimJawaban: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const { jenis_tes, id_soal_pg, jawaban_pg } = req.body;
      const cekKunci = await soalServices.getKunci(id_soal_pg);
      console.log(cekKunci.kunci);
      const cocok = jawaban_pg == parseInt(cekKunci.kunci);
      console.log(cocok);
      const skor = cocok ? 8 : 0;
      const input = await soalServices.kirimJawabanPG(
        id_user,
        jenis_tes,
        id_soal_pg,
        jawaban_pg,
        skor
      );
      const newInput = await soalServices.getJawabanPGById(input[0]);
      return responseFormatter.success(
        res,
        (data = {
          id: newInput.id,
          id_user: newInput.id_user,
          jenis_tes: newInput.jenis_tes,
          id_soal_pg: newInput.id_soal_pg,
        }),
        "berhasil mengirim jawaban pg",
        201
      );
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  // kirim jawaban essay
  kirimEssay: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const { jenis_tes, id_soal_essay, jawaban_essay } = req.body;
      const input = await soalServices.kirimJawabanEssay(
        id_user,
        jenis_tes,
        id_soal_essay,
        jawaban_essay
      );
      const newInput = await soalServices.getJawabanEssayById(input[0]);
      return responseFormatter.success(
        res,
        (data = {
          id: newInput.id,
          id_user: newInput.id_user,
          jenis_tes: newInput.jenis_tes,
          id_soal_essay: newInput.id_soal_essay,
          jawaban_essay: newInput.jawaban_essay,
        }),
        "berhasil mengirim jawaban essay",
        201
      );
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};

module.exports = soalController;
