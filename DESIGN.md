# DESIGN.md — Arah Desain RSUD Morowali

Sumber arahan untuk filter `antislop` (lihat `AGENTS.md`). Isi file ini berasal dari jawaban langsung pemilik proyek, dirapikan oleh agent — bukan tebakan/isian agent.

---

## 1. Identitas & Personality

RSUD Morowali ingin terasa **tidak terlalu formal-pemerintah**. Arahnya: **modern-terpercaya, bahkan hangat/ramah** — kredibel sebagai rumah sakit daerah, tapi tidak kaku/dingin seperti situs instansi pemerintah pada umumnya.

**Kata kunci:** modern, hangat, ramah, hidup, tetap terpercaya (bukan norak/kasual berlebihan).

## 2. Palet Warna

**Dipertahankan dari yang sudah ada** (lihat `assets/styles.css` dan `DOKUMENTASI.md` bag. 4.1) — sudah diturunkan langsung dari warna asli logo RSMW (biru & hijau), bukan tebakan, dan sudah dicek kontras WCAG AA. Logo terbaru (dengan medali akreditasi bintang 5) dikonfirmasi **tidak diubah lagi**, dan warna emas medali **sengaja tidak diambil** ke palet situs — palet tetap murni dari elemen logo RSMW (cincin biru, palang hijau).

| Token | Hex | Peran |
|---|---|---|
| `--color-primary` | `#0B4FA8` | Identitas/navigasi |
| `--color-secondary` | `#0C7A2E` | Layanan kesehatan/BPJS |
| `--color-accent` | `#B9552B` | Khusus darurat/urgent (IGD) — dipakai jarang, supaya tetap terasa penting |
| `--color-bg` | `#FAF7F1` | Krem hangat, penyeimbang biru/hijau yang dingin |

**Alasan (R-31):** biru & hijau = identitas logo asli (bukan pilihan generik), terracotta dijaga langka supaya darurat tetap menonjol, krem hangat menjawab arahan poin 1 (tidak mau terlalu dingin/formal). Maks 3 warna inti + netral, sesuai R-29.

## 3. Tipografi

**Diganti** dari Fraunces + Plus Jakarta Sans (kurang memuaskan menurut pemilik proyek) menjadi:

| Peran | Font | Alasan |
|---|---|---|
| **Judul (display)** | **Sora** | Sans geometris, sudut sedikit membulat — terasa modern & hangat tanpa jatuh ke serif institusional-berat (masalah di Fraunces) atau ke default AI yang dingin (Inter dkk). Cocok untuk arahan "hidup-modern" walau tetap tegas untuk konteks medis. |
| **Isi (body)** | **Plus Jakarta Sans** | Dipertahankan — sudah terbukti mudah dibaca lintas usia (pasien lansia s/d muda), humanis, bukan pilihan default AI yang generik. |

Sumber: Google Fonts (`fonts.googleapis.com`), sudah dipakai sebelumnya jadi tinggal ganti nama font display di `--font-display`.

## 4. Mood & Dial

- **ENERGY: 2** (Balanced, condong ke Bold) — lebih hidup dari situs pemerintah biasa (GOV.UK-style), tapi belum se-ekspresif portfolio agency. Sejalan dial existing di hero (gradient primary + glow hijau di carousel).
- **RHYTHM: 2** — section bervariasi (card, list, carousel, banner BPJS berbeda bentuk), tidak seragam kaku, tapi tetap tenang/tidak kacau.
- **MOTION: 2** — scroll-reveal & transisi halus (sudah ada di `main.js`: reveal-on-scroll, carousel auto-geser berhenti saat hover/`prefers-reduced-motion`), bukan animasi berlebihan/looping.

**Alasan:** arahan poin (a) & (d) eksplisit minta "hidup-modern walau rumah sakit pemerintah" — dial 1/1/1 (draf tanpa arahan) tidak lagi berlaku sejak file ini ada.

## 5. Identity Motif — Batik Tobungku

**Ditambahkan** atas permintaan pemilik proyek, sebagai identitas visual yang benar-benar milik Morowali (bukan generik/bisa dipakai RS mana saja).

**Riset (R-22, ditulis sumbernya, bukan karangan):**
- Batik Tobungku adalah batik khas Kabupaten Morowali, sudah mendapat perlindungan HAKI (2022) dari Kemenkumham Sulawesi Tengah, berasal dari wilayah Bungku (Morowali).
- **Motif geometris utamanya:** bulat (lingkaran), belah ketupat, dan tumpal — diadaptasi dari ragam hias pada *Soronga* (wadah pemakaman tradisional berbentuk persegi panjang dari kayu) yang ditemukan di Gua Topogaro, Bungku Barat.
- Motif tambahan bersifat flora/fauna dari alam sekitar (mis. bunga, padi, ular) — ini **tidak dipakai** untuk aksen situs (terlalu ramai untuk web modern-minimal), hanya bentuk geometris dasarnya yang diadaptasi.
- Warna aslinya diambil dari perisai tradisional *kanta* (kontras kuat) — **tidak diadopsi mentah-mentah**, supaya palet situs tetap 3 warna inti (R-29). Motif dipakai sebagai **garis/bentuk**, diwarnai dari palet situs yang sudah ada (biru/hijau), bukan warna asli batik.
- Sumber: [Kemenkumham Sulteng](https://sulteng.kemenkumham.go.id/berita-kanwil/berita-utama/4514-spesial-hut-morowali-ke-22-batik-tobungku-resmi-terlindungi/), [batikkhasdaerah.com](https://batikkhasdaerah.com/batik-tobungku/)

**Bagaimana dipakai di situs (dosis kecil, bukan dekorasi berlebihan — sejalan R-01/R-07 dosis cap):**
- Bentuk **tumpal** (segitiga berjajar) sebagai garis pembatas tipis di footer atau antar-section, digambar sebagai SVG garis sederhana (bukan tekstur kain penuh), warna `--color-primary` atau `--color-secondary` dengan opacity rendah.
- Bentuk **belah ketupat/lingkaran/tumpal** kecil sebagai aksen kiri-kanan section tertentu yang bertint warna, opacity rendah + pudar (mask) ke tengah, bukan dipakai sebagai background penuh.
- **Tidak** dipakai sebagai pattern latar berulang penuh halaman (akan jadi noise, melanggar semangat R-07 "background grid tanpa tujuan").
- Opsional ke depan: filosofi tiga fase batik ini (*Lahiri* – kelahiran, *Teili* – tumbuh kuat, *Mate* – kembali ke Pencipta) bisa disinggung singkat di halaman Profil sebagai narasi budaya lokal, **hanya jika pemilik proyek konfirmasi** ingin dipakai (bukan otomatis ditambahkan, sesuai R-23).

**Instance nyata yang sudah diterapkan** (dicatat di sini supaya jadi acuan pola, bukan cuma arahan abstrak &mdash; detail teknis di `DOKUMENTASI.md`):
- Divider **tumpal** tipis di footer, semua halaman (`.divider-tumpal`).
- Aksen kiri-kanan **bulat/belah ketupat/tumpal** (`.flow-motif`) di section Alur Pelayanan Beranda (`index.html`) &mdash; instance pertama.
- Aksen kiri-kanan yang sama (`.flow-motif`, SVG dipakai ulang persis, bukan digambar ulang) di section Edukasi Kesehatan (`informasi.html`) &mdash; instance kedua, 14 September 2026. Dipakai lagi di section yang isinya kartu bergambar (mirip konteks Alur Pelayanan), sengaja **tidak** dipakai di section Pengumuman Lainnya (bertetangga, tapi latarnya polos/tanpa tint) supaya dosisnya tetap terjaga, tidak muncul di setiap section.

**Alasan (R-31):** motif ini nyata milik Morowali (bukan tebakan/generik), dipakai sebagai bentuk garis tipis mengikuti palet situs yang sudah ada &mdash; jadi identitas khas tanpa menambah warna baru atau jadi dekorasi berlebihan.

## 6. Referensi Visual (mood, bukan template untuk ditiru — R-30)

Dicek langsung isi/nada 4 situs RS berikut, dipakai sebagai kalibrasi rasa, bukan untuk disalin:

| Situs | Yang diambil sebagai referensi rasa |
|---|---|
| rsupwahidin.com | Layout modular card, nada "melayani dengan hati" — sudah dipakai acuan lebar container & proporsi kartu shortcut (lihat DOKUMENTASI.md 4.3, 6.6) |
| rscm.co.id | Copy hangat-aspiratif ("Ruang Harapan dan Kesembuhan") tanpa kehilangan kredibilitas medis |
| rs.unhas.ac.id | Keseimbangan otoritas klinis + bahasa personal ("Perawatan Medis Modern untuk Keluarga Anda") |
| rsudmnatsir.sumbarprov.go.id | Motif budaya lokal (batik) sebagai aksen identitas — inspirasi langsung untuk Bagian 5 di atas, tapi motifnya diganti Batik Tobungku (khas Morowali sendiri, bukan meniru batik daerah lain) |

**Alasan:** semua referensi bertema RS Indonesia dengan nada modern-hangat-terpercaya yang sama dengan arahan poin 1 & 4, tapi motif lokal diambil dari budaya Morowali sendiri supaya bukan kloning (R-30).

---

## 7. Ukuran Tombol CTA Penutup (`.btn-sm`)

Standar (permintaan user, berlaku untuk tombol yang sudah ada maupun yang akan dibuat): **tombol CTA tunggal yang berdiri sendiri sebagai penutup section/halaman** (pola "lihat detail/selengkapnya" setelah konten utama, bukan navigasi utama atau submit form) pakai class tambahan **`.btn-sm`** (padding &amp; font lebih kecil, tinggi tetap 44px demi tap target R-03). Contoh acuan: "Lihat Alur Detail Pelayanan" (`index.html`).

**Yang IKUT dipakaikan `.btn-sm`** (CTA penutup berdiri sendiri):
- "Lihat Alur Detail Pelayanan" (`index.html`, section Alur Pelayanan) &mdash; acuan awal
- "Buat Ulasan Anda" (`index.html`, section Ulasan Pengunjung)
- "Info Pendaftaran Online" &amp; "Lihat Semua Layanan" (`alur-pelayanan.html`, penutup halaman detail)
- "Alur Pelayanan" &amp; "Lihat Semua Layanan" (`pendaftaran-pasien.html`, penutup halaman &mdash; menggantikan kartu "Segera Hadir" &amp; pratinjau formulir yang sudah dihapus, lihat `DOKUMENTASI.md` bag. 6b-detail)

**Yang SENGAJA TIDAK dipakaikan** (beda peran, bukan pola "CTA penutup"):
- Tombol nav utama "Pendaftaran" (header) &mdash; navigasi persisten, bukan link penutup
- Tombol submit form ("Cari", "Kirim Ulasan") &mdash; aksi utama sebuah form, tetap ukuran penuh supaya jelas jadi fokus utama
- "Info Pendaftaran" di banner BPJS (`.btn-ghost-light`) &mdash; CTA banner promosional, bukan link "selengkapnya"

**Kalau bikin tombol/link CTA baru ke depannya:** cek dulu perannya masuk kategori mana di atas sebelum menentukan ukurannya, supaya konsisten.

---

*Terakhir diperbarui: 14 September 2026 (bag. 5: instance nyata motif Batik Tobungku di section Edukasi Kesehatan ditambahkan, contoh usang "Kenapa Memilih Kami" yang sudah dihapus dari situs dibuang dari daftar). File ini adalah data arahan desain (dibaca antislop sebagai filter di atasnya), bukan instruksi ke agent — lihat batasan di `antislop.md` Part "What This Is".*
