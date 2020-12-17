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

  updateEssayNilai: async (req) => {
    const { jenis_test, id_user } = req.params;
    const nilai_essay = req.body.nilai_essay;

    const hasil = await db("tb_nilai_total")
      .update({
        nilai_essay: nilai_essay,
      })
      .where({
        jenis_test,
        id_user,
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
      .select("id", "id_user", "jenis_tes", "nilai")
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
