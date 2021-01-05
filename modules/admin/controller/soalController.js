const soalServices = require("./../services/soalServices");
const responseFormatter = require("../../../responses/responses");

const soalController = {
  getPG: async (req, res, next) => {
    try {
      const data = await soalServices.getPGsoal(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  createPG: async (req, res, next) => {
    try {
      const {
        text_soal,
        opsi_1,
        opsi_2,
        opsi_3,
        opsi_4,
        kunci,
        skor,
      } = req.body;
      const input = await soalServices.createPGsoal(
        text_soal,
        opsi_1,
        opsi_2,
        opsi_3,
        opsi_4,
        kunci,
        skor
      );

      const newInput = await soalServices.getPGsoalById(input[0]);

      const data = {
        id: newInput.id,
        text_soal: newInput.text_soal,
        opsi_1: newInput.opsi_1,
        opsi_2: newInput.opsi_2,
        opsi_3: newInput.opsi_3,
        opsi_4: newInput.opsi_4,
        // kunci: newInput.kunci,
        // skor: newInput.skor,
      };
      return responseFormatter.success(
        res,
        data,
        "berhasil menambah soal pilihan ganda",
        200
      );
    } catch (error) {
      return responseFormatter.error(
        res,
        null,
        "gagal menambah soal pilihan ganda",
        500
      );
    }
  },
  updatePG: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        text_soal,
        opsi_1,
        opsi_2,
        opsi_3,
        opsi_4,
        kunci,
        skor,
      } = req.body;
      const cek = await soalServices.cekpg(id);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }

      const result = await soalServices.updatePGsoal(
        id,
        text_soal,
        opsi_1,
        opsi_2,
        opsi_3,
        opsi_4,
        kunci,
        skor
      );

      const data = {
        id: req.params.id,
        text_soal: text_soal,
        opsi_1: opsi_1,
        opsi_2: opsi_2,
        opsi_3: opsi_3,
        opsi_4: opsi_4,
        kunci: kunci,
        skor: skor,
      };
      if (result) {
      }
      return responseFormatter.success(
        res,
        data,
        "berhasil mengubah data",
        200
      );
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  deletePG: async (req, res, next) => {
    try {
      const { id } = req.params;
      const cek = await soalServices.cekpg(id);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const result = await soalServices.deletePGsoal(id);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { id }),
          "berhasil menghapus data",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  //   Soal Essay
  getEssay: async (req, res, next) => {
    try {
      const data = await soalServices.getEssaySoal(req);
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  createEssay: async (req, res, next) => {
    try {
      const { text_soal, skor } = req.body;
      const input = await soalServices.createEssaySoal(text_soal, skor);
      const newInput = await soalServices.getEssaySoalById(input[0]);

      const data = {
        id: newInput.id,
        text_soal: newInput.text_soal,
        skor: newInput.skor,
      };
      return responseFormatter.success(
        res,
        data,
        "berhasil menambahkan soal essay",
        200
      );
    } catch (error) {
      return responseFormatter.error(
        res,
        null,
        "gagal menambahkan soal essay",
        500
      );
    }
  },
  updateEssay: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { text_soal, skor } = req.body;
      const cek = await soalServices.cekessay(id);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const result = await soalServices.updateEssaySoal(id, text_soal, skor);
      if (result) {
        return responseFormatter.success(
          res,
          (data = { text_soal, skor }),
          "berhasil mengubah data",
          200
        );
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  deleteEssay: async (req, res, next) => {
    try {
      const { id } = req.params;
      const cek = await soalServices.cekessay(id);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      const result = await soalServices.deleteEssaySoal(id);
      return responseFormatter.success(
        res,
        (data = { id }),
        "berhasil menghapus data",
        200
      );
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  //==============================================================
  kirimJawaban: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const { jenis_tes, id_soal_pg, jawaban_pg } = req.body;
      const cekKunci = await soalServices.getKunci(id_soal_pg);
      console.log(cekKunci.kunci);
      const cocok = jawaban_pg == parseInt(cekKunci.kunci);
      console.log(cocok);
      const skor = cocok ? 8 : 0;
      // return res.send(cekKunci);
      const input = await soalServices.kirimJawabanPG(
        id_user,
        jenis_tes,
        id_soal_pg,
        jawaban_pg,
        skor
      );
      const newInput = await soalServices.getJawabanPGById(input[0]);

      return res.status(201).send({
        message: "berhasil mengirim jawaban pg",
        id: newInput.id,
        id_user: newInput.id_user,
        jenis_tes: newInput.jenis_tes,
        id_soal_pg: newInput.id_soal_pg,
      });
    } catch (error) {
      return res.status(500).send(error.message);
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

      return res.status(201).send({
        message: "berhasil mengirim jawaban essay",
        id: newInput.id,
        id_user: newInput.id_user,
        jenis_tes: newInput.jenis_tes,
        id_soal_essay: newInput.id_soal_essay,
        jawaban_essay: newInput.jawaban_essay,
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};

module.exports = soalController;
