const db = require("../../../config/database");

const pesertaServices = {
  isiForm: async (
    id_user,
    tahun_daftar,
    noreg,
    nama_lengkap,
    tanggal_lahir,
    tempat_lahir,
    jenis_kelamin,
    alamat_ktp,
    alamat_sekarang,
    golongan_darah,
    agama,
    fakultas,
    prodi,
    angkatan,
    nomor_hp,
    riwayat_penyakit,
    nama_orangtua,
    alamat_orangtua,
    nohp_orangtua,
    nohp_orangdekat,
    file_form_pendaftaran,
    file_persetujuan,
    file_komitmen,
    file_foto
  ) => {
    const data = await db("tb_peserta")
      .insert({
        id_user: id_user,
        tahun_daftar: tahun_daftar,
        noreg: noreg,
        nama_lengkap: nama_lengkap,
        tanggal_lahir: tanggal_lahir,
        tempat_lahir: tempat_lahir,
        jenis_kelamin: jenis_kelamin,
        alamat_ktp: alamat_ktp,
        alamat_sekarang: alamat_sekarang,
        golongan_darah: golongan_darah,
        agama: agama,
        fakultas: fakultas,
        prodi: prodi,
        angkatan: angkatan,
        nomor_hp: nomor_hp,
        riwayat_penyakit: riwayat_penyakit,
        nama_orangtua: nama_orangtua,
        alamat_orangtua: alamat_orangtua,
        nohp_orangtua: nohp_orangtua,
        nohp_orangdekat: nohp_orangdekat,
        file_form_pendaftaran: file_form_pendaftaran,
        file_persetujuan: file_persetujuan,
        file_komitmen: file_komitmen,
        file_foto: file_foto,
      })
      .where({
        "tb_peserta.id_user": id_user,
      });
    return data;
  },
  getPesertaById: (id) => {
    const hasil = db("tb_peserta")
      .select("*")
      .where({
        id,
      })
      .first();
    return hasil;
  },
};

module.exports = pesertaServices;
