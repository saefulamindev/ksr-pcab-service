const db = require("../../../config/database");

const nilaiServices = {
  // ===============================Nilai Fisik =========================
  getFisikNilai: async (all) => {
    const hasil = await db("tb_users")
      .select(
        "tb_peserta.id_user",
        "tb_peserta.nama_lengkap",
        "tb_peserta.nilai_fisik"
      )
      .join("tb_peserta", "tb_users.id", "=", "tb_peserta.id_user")
      .where({
        role: "user",
        tahap: "4",
      });

    return hasil;
  },
  updateFisikNilai: async (req) => {
    const id_user = req.params.id_user;
    const nilai_fisik = req.body.nilai_fisik;

    const hasil = await db("tb_peserta")
      .update({
        nilai_fisik: nilai_fisik,
      })
      .where("id", id_user);
    return hasil;
  },
  //================================= Nilai Afektif ============================
  getAfektifNilai: async (all) => {
    const data = await db
      .select(
        "tb_peserta.id_user",
        "tb_peserta.nama_lengkap",
        "tb_afektif.tg_jawab",
        "tb_afektif.disiplin",
        "tb_afektif.kerjasama"
      )
      .from("tb_peserta")
      .rightJoin("tb_afektif", "tb_peserta.id_user", "tb_afektif.id_user");
    return data;
  },
  getAfekitfNilaiById: (id) => {
    const data = db("tb_afektif").where("id", id).first();
    return data;
  },
  getAfekitfNilaiByIdUser: (id_user) => {
    const data = db("tb_afektif").where("id_user", id_user).first();
    return data;
  },
  createAfektifNilai: (input) => {
    const data = db("tb_afektif").insert({
      id_user: input.id_user,
      tg_jawab: input.tg_jawab,
      disiplin: input.disiplin,
      kerjasama: input.kerjasama,
    });

    return data;
  },
  updateAfektifNilai: async (req) => {
    const id_user = req.params.id_user;
    const tg_jawab = req.body.tg_jawab;
    const disiplin = req.body.disiplin;
    const kerjasama = req.body.kerjasama;

    const hasil = await db("tb_afektif")
      .update({
        tg_jawab: tg_jawab,
        disiplin: disiplin,
        kerjasama: kerjasama,
      })
      .where("id_user", id_user);
    return hasil;
  },
  deleteAfektifNilai: async (req) => {
    const id_user = req.params.id_user;
    const hasil = await db("tb_afektif").delete().where("id_user", id_user);
    return hasil;
  },
  getEssayByJenis: async (jenis_test, id_user) => {
    const result = await db("tb_jawaban_essay")
      .select("id", "jenis_test", "id_user", "jawaban_essay", "skor")
      .where("jenis_test", jenis_test)
      .where("id_user", id_user);
    return result;
  },
  // ==========================Nilai Essay================================
  getEssayByTes: (jenis_tes, id_user) => {
    const data = db("tb_jawaban_essay")
      .select(
        "tb_peserta.nama_lengkap",
        // "tb_jawaban_essay.id_user",
        "tb_jawaban_essay.id",
        "tb_jawaban_essay.jenis_tes",
        "tb_jawaban_essay.id_soal_essay",
        "tb_jawaban_essay.jawaban_essay",
        "tb_jawaban_essay.skor"
      )
      .rightJoin("tb_peserta", "tb_jawaban_essay.id_user", "tb_peserta.id_user")
      .where({
        jenis_tes,
        "tb_peserta.id_user": id_user,
      });
    return data;
  },
  getEssayById: (id) => {
    const data = db("tb_jawaban_essay")
      .select("id", "jenis_tes", "id_soal_essay", "jawaban_essay", "skor")
      .where({
        id,
      });
    return data;
  },
  updateEssaySkorById: async (id, skor) => {
    const hasil = await db("tb_jawaban_essay")
      .update({
        skor: skor,
      })
      .where({
        id,
      });
    return hasil;
  },
  // ==============================Nilai =============================
  getuser: (id_user) => {
    const data = db
      .select("id_user", "nama_lengkap")
      .from("tb_peserta")
      .where("id_user", id_user);
    return data;
  },
  getNilai: (req) => {
    const data = db.select("*").from("tb_penilaian");
    return data;
  },
  getNilaiById: (id_user) => {
    const data = db("tb_penilaian")
      .select("id", "id_user", "jenis_tes", "nilai")
      .where("id_user", id_user);
    return data;
  },
  getNilaiByTes: (jenis_tes) => {
    const data = db("tb_penilaian")
      .select(
        "tb_penilaian.id",
        "tb_penilaian.id_user",
        "tb_peserta.nama_lengkap",
        "tb_penilaian.jenis_tes",
        "tb_penilaian.nilai"
      )
      .rightJoin("tb_peserta", "tb_penilaian.id_user", "tb_peserta.id_user")
      .where("jenis_tes", jenis_tes);
    return data;
  },
  inputNilai: (id_user, input) => {
    const data = db("tb_penilaian").insert({
      id_user: id_user,
      jenis_tes: input.jenis_tes,
      nilai: input.nilai,
    });

    return data;
  },
  cekNilai: async (id_user, jenis_tes) => {
    const data = await db("tb_penilaian").select("*").where({
      id_user,
      jenis_tes,
    });
    return data;
  },
  getNilaiByUser: async (id_user) => {
    const data = await db("tb_penilaian").select("*").where({
      id_user,
    });
    return data;
  },
  getNilaiAkhirById: async (id_user) => {
    const data = await db("tb_penilaian")
      .sum({ nilai_total: "nilai" })
      .where({
        id_user,
      })
      .first();
    return data;
  },
  updateNA: async (id_user, nilai_akhir, status) => {
    const hasil = await db("tb_peserta")
      .update({
        nilai_akhir: nilai_akhir,
        status_kelulusan: status,
      })
      .where({
        id_user,
      });
    return hasil;
  },
  getPembagi: async (id_user) => {
    const data = await db("tb_penilaian")
      .count({ pembagi: "id" })
      .where({
        id_user,
      })
      .first();
    return data;
  },
};

module.exports = nilaiServices;
