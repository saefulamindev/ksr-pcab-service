const nilaiServices = require("./../services/nilaiServices");

const nilaiController = {
  // ===============================Nilai Fisik =========================
  getFisik: async (req, res, next) => {
    try {
      const data = await nilaiServices.getFisikNilai(req);
      // console.log(data);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateFisik: async (req, res, next) => {
    try {
      const result = await nilaiServices.updateFisikNilai(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah data",
          id_user: req.params.id_user,
          nilai_fisik: req.body.nilai_fisik,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //================================= Nilai Afektif ============================
  getAfektif: async (req, res, next) => {
    try {
      const data = await nilaiServices.getAfektifNilai(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  createAfektif: async (req, res, next) => {
    try {
      const cekAfektifNilai = await nilaiServices.getAfekitfNilaiByIdUser(
        req.body.id_user
      );

      if (cekAfektifNilai) {
        return res.json({
          message: "nilai afektif sudah ada",
        });
      }
      const input = await nilaiServices.createAfektifNilai(req.body);

      const newAfektif = await nilaiServices.getAfekitfNilaiById(input[0]);

      const resBerhasil = {
        message: "berhasil menambah nilai afektif",
        id: newAfektif.id,
        id_user: newAfektif.id_user,
        tg_jawab: newAfektif.tg_jawab,
        disiplin: newAfektif.disiplin,
        kerjasama: newAfektif.kerjasama,
      };

      return res.status(201).send(resBerhasil);
    } catch (error) {
      const resGagal = {
        message: "gagal menambah nilai afektif",
      };

      return res.status(500).send(resGagal);
    }
  },
  updateAfektif: async (req, res, next) => {
    try {
      const result = await nilaiServices.updateAfektifNilai(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah data",
          tg_jawab: req.body.tg_jawab,
          disiplin: req.body.disiplin,
          kerjasama: req.body.kerjasama,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  deleteAfektif: async (req, res, next) => {
    try {
      const result = await nilaiServices.deleteAfektifNilai(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil menghapus data",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // ==========================Nilai Essay================================
  getEssay: async (req, res, next) => {
    console.log(req.params);
    try {
      const id_essay = await nilaiServices.getEssayByJenis(
        req.params.jenis_test,
        req.params.id_user
      );

      return res.status(200).send(id_essay);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateEssay: async (req, res, next) => {
    try {
      const result = await nilaiServices.updateEssayNilai(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah data",
          nilai_essay: req.body.nilai_essay,
        });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  // =================== Nilai =======================
  getNilai: async (req, res, next) => {
    try {
      const result = await nilaiServices.getNilai(req);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getNilaiById: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const result = await nilaiServices.getNilaiById(id_user);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getNilaiByTes: async (req, res, next) => {
    try {
      const { jenis_tes } = req.params;
      const result = await nilaiServices.getNilaiByTes(jenis_tes);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getNilaiAkhirById: async (req, res, next) => {
    try {
      const { id_user } = req.params;
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
      return res.status(200).json({
        nilai_akhir,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
    }
  },
  inputNilai: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const cek_nilai = await nilaiServices.cekNilai(
        id_user,
        req.body.jenis_tes
      );
      if (cek_nilai) {
        return res.send({
          message: "nilai sudah ada",
        });
      }
      const input = await nilaiServices.inputNilai(id_user, req.body);
      const newNilai = await nilaiServices.getNilaiById(input[0]);

      return res.status(201).send({
        message: "berhasil menambah nilai",
        id: newNilai.id,
        id_user: newNilai.id_user,
        jenis_tes: newNilai.jenis_tes,
        nilai: newNilai.nilai,
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};

module.exports = nilaiController;
