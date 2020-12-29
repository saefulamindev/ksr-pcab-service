const soalServices = require("./../services/soalServices");

const soalController = {
  getPG: async (req, res, next) => {
    try {
      const data = await soalServices.getPGsoal(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  createPG: async (req, res, next) => {
    console.log("cobaa");
    try {
      const input = await soalServices.createPGsoal(req.body);

      const newInput = await soalServices.getPGsoalById(input[0]);

      return res.status(201).send({
        message: "berhasil menambah soal pg",
        id: newInput.id,
        text_soal: newInput.text_soal,
        opsi_1: newInput.opsi_1,
        opsi_2: newInput.opsi_2,
        opsi_3: newInput.opsi_3,
        opsi_4: newInput.opsi_4,
        kunci: newInput.kunci,
        skor: newInput.skor,
      });
    } catch (error) {
      return res.status(500).send({
        message: "gagal menambah soal PG",
      });
    }
  },
  updatePG: async (req, res, next) => {
    try {
      const result = await soalServices.updatePGsoal(req);

      const newUpdate = await soalServices.getPGsoalById(result);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah soal pg",
          id: newUpdate.id,
          text_soal: newUpdate.text_soal,
          opsi_1: newUpdate.opsi_1,
          opsi_2: newUpdate.opsi_2,
          opsi_3: newUpdate.opsi_3,
          opsi_4: newUpdate.opsi_4,
          kunci: newUpdate.kunci,
          skor: newUpdate.skor,
        });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  deletePG: async (req, res, next) => {
    try {
      const result = await soalServices.deletePGsoal(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil menghapus data",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //   Soal Essay
  getEssay: async (req, res, next) => {
    try {
      const data = await soalServices.getEssaySoal(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  createEssay: async (req, res, next) => {
    try {
      const input = await soalServices.createEssaySoal(req.body);

      const newInput = await soalServices.getEssaySoalById(input[0]);

      return res.status(201).send({
        message: "berhasil menambah soal essay",
        id: newInput.id,
        text_soal: newInput.text_soal,
        skor: newInput.skor,
      });
    } catch (error) {
      return res.status(500).send({
        message: "gagal menambah soal essay",
      });
    }
  },
  updateEssay: async (req, res, next) => {
    try {
      const result = await soalServices.updateEssaySoal(req);

      const newUpdate = await soalServices.getEssaySoalById(result);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah soal essay",
          id: newUpdate.id,
          text_soal: newUpdate.text_soal,
          skor: newUpdate.skor,
        });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  deleteEssay: async (req, res, next) => {
    try {
      const result = await soalServices.deleteEssaySoal(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil menghapus data",
        });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
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
