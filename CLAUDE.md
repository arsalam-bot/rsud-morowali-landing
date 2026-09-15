## Mulai dari sini setiap sesi baru

Proyek ini sudah jadi git repo sejak 15 September 2026 (`origin/main` di GitHub), tapi **commit message tidak mencatat detail keputusan &amp; alasan selengkap `DOKUMENTASI.md`** &mdash; jadi tetap **baca 2 file ini duluan sebelum kerja apapun**, bukan cuma `git log`:

1. **`DOKUMENTASI.md`** &mdash; status project, section per section yang sudah selesai/masih draf, semua keputusan & alasannya, daftar data yang masih placeholder. Ini yang paling penting dibaca duluan.
2. **`DESIGN.md`** &mdash; arah desain (identitas, palet, tipografi, dial, motif Batik Tobungku, standar ukuran tombol).

Kalau user minta lanjut kerja tanpa konteks baru, jangan tanya ulang hal yang jawabannya sudah ada di dua file itu (mis. warna, font, section apa saja yang sudah ada) &mdash; cek dulu isinya.

**Catatan git:** environment kerja agent di sini tidak punya credential GitHub tersimpan (bukan `gh` CLI, bukan SSH key, bukan `.git-credentials`) &mdash; commit boleh dibuat agent, tapi `git push` akan gagal dan perlu dijalankan user sendiri di terminalnya.

<!-- antislop:start -->
## antislop

Proyek ini pakai filter **antislop** (plugin Claude Code, bukan file lokal) untuk kerja UI:
- Sebelum kerja UI, baca `DESIGN.md` (arahan desain: identitas, palet, tipografi, dial, motif lokal Batik Tobungku) di root proyek ini.
- Jalankan filter via skill plugin: `/antislop:antislop` (core) dan `/antislop:antislop-ui` (UI/visual). Skill lain (copywriting, human/aksesibilitas, mobile layout, code comment) tersedia sesuai kebutuhan lewat `/antislop:antislop-<nama>`.
- Mode yang dipilih pemilik proyek: **DURING** (terapkan aturan saat mengerjakan, bukan audit setelah selesai).
- Sebelum mulai kerja UI baru, konfirmasi ke user mode ini masih berlaku atau ganti ke AFTER (audit).
<!-- antislop:end -->
