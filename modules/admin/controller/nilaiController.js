const nilaiServices = require("./../services/nilaiServices");
const responseFormatter = require("../../../responses/responses");

const nilaiController = {
  // ===============================Nilai Fisik =========================
  getFisik: async (req, res, next) => {
    try {
      const data = await nilaiServices.getFisikNilai(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  updateFisik: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const { nilai_fisik } = req.body;
      const cek = await nilaiServices.cekFisik(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const result = await nilaiServices.updateFisikNilai(id_user, nilai_fisik);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { nilai_fisik }),
          "berhasil mengubah data",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  //================================= Nilai Afektif ============================
  getAfektif: async (req, res, next) => {
    try {
      const data = await nilaiServices.getAfektifNilai(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  createAfektif: async (req, res, next) => {
    try {
      const { id_user, tg_jawab, disiplin, kerjasama } = req.body;
      const cekAfektifNilai = await nilaiServices.getAfekitfNilaiByIdUser(
        id_user
      );

      if (cekAfektifNilai) {
        return responseFormatter.badRequest(
          res,
          null,
          "nilai afektif sudah ada"
        );
      }
      const input = await nilaiServices.createAfektifNilai(
        id_user,
        tg_jawab,
        disiplin,
        kerjasama
      );

      const newAfektif = await nilaiServices.getAfekitfNilaiById(input[0]);

      const data = {
        id: newAfektif.id,
        id_user: newAfektif.id_user,
        tg_jawab: newAfektif.tg_jawab,
        disiplin: newAfektif.disiplin,
        kerjasama: newAfektif.kerjasama,
      };
      return responseFormatter.success(
        res,
        data,
        "berhasil menambah nilai afektif",
        200
      );
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  updateAfektif: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const { tg_jawab, disiplin, kerjasama } = req.body;
      const cek = await nilaiServices.getAfekitfNilaiByIdUser(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const result = await nilaiServices.updateAfektifNilai(
        id_user,
        tg_jawab,
        disiplin,
        kerjasama
      );
      if (result) {
        return responseFormatter.success(
          res,
          (data = { id_user, tg_jawab, disiplin, kerjasama }),
          "berhasil mengubah data",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  deleteAfektif: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const cek = await nilaiServices.getAfekitfNilaiByIdUser(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const result = await nilaiServices.deleteAfektifNilai(id_user);
      if (result) {
        return responseFormatter.success(
          res,
          (data = { id_user }),
          "berhasil menghapus data",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  // ==========================Nilai Essay================================
  getEssay: async (req, res, next) => {
    try {
      const { jenis_tes, id_user } = req.params;
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
  updateEssay: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { skor } = req.body;
      const cek = await nilaiServices.cek(id);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const result = await nilaiServices.updateEssaySkorById(id, skor);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { id, skor }),
          "data ditemukan",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  // ===================Nilai Total =======================
  getNilaiTotal: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const { jenis_tes } = req.body;
      const cek = await nilaiServices.cekNilaiTotal(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const nilai_pg = await nilaiServices.jmlNilaiPG(id_user, jenis_tes);
      const nilai_essay = await nilaiServices.jmlNilaiEssay(id_user, jenis_tes);
      console.log(nilai_pg);
      console.log(nilai_essay);
      const nilai_total = parseInt(nilai_pg.pg) + parseInt(nilai_essay.essay);
      console.log(nilai_total);
      return responseFormatter.success(
        res,
        (data = { nilai_total }),
        "data ditemukan",
        200
      );
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  // =================== Nilai Akhir =======================
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
  getNilaiByTes: async (req, res, next) => {
    try {
      const { jenis_tes } = req.params;
      const cek = await nilaiServices.cekNilaiByTes(jenis_tes);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const data = await nilaiServices.getNilaiByTes(jenis_tes);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getNilaiAkhirById: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const cek = await nilaiServices.cekNilaiUser(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const nilai_total = await nilaiServices.getNilaiAkhirById(id_user);
      // const pembagi = await nilaiServices.getPembagi(id_user);
      // const nilai_akhir = parseInt(nilai_total.nilai_total) / pembagi.pembagi;
      const nilai_akhir = parseInt(nilai_total.nilai_total) / 8;
      const status = nilai_akhir > 75 ? "lulus" : "tidak_lulus";

      const updateNA = await nilaiServices.updateNA(
        id_user,
        nilai_akhir,
        status
      );
      return responseFormatter.success(
        res,
        (data = { id_user, nilai_akhir }),
        "data ditemukan",
        200
      );
    } catch (error) {
      console.log(error.message);
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  inputNilai: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const { jenis_tes, nilai } = req.body;
      const cek_nilai = await nilaiServices.cekNilai(id_user, jenis_tes);
      if (cek_nilai) {
        return responseFormatter.badRequest(res, null, "nilai sudah ada");
      }
      const input = await nilaiServices.inputNilai(id_user, jenis_tes, nilai);
      const newNilai = await nilaiServices.getNilaiById(input[0]);

      const data = {
        id: newNilai.id,
        id_user: newNilai.id_user,
        jenis_tes: newNilai.jenis_tes,
        nilai: newNilai.nilai,
      };
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};

module.exports = nilaiController;
