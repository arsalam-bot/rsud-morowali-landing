(function(){
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');

  function closeMenu(){
    mobileNav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function openMenu(){
    mobileNav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function(){
      var isOpen = mobileNav.classList.contains('is-open');
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    mobileNav.addEventListener('click', function(e){
      if (e.target.tagName === 'A') { closeMenu(); toggle.focus(); }
    });

    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', function(e){
      if (!mobileNav.contains(e.target) && e.target !== toggle && !toggle.contains(e.target) && mobileNav.classList.contains('is-open')) {
        closeMenu();
      }
    });

    var mq = window.matchMedia('(min-width: 900px)');
    mq.addEventListener('change', function(e){ if (e.matches) closeMenu(); });
  }

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  }

  /* Nomor registrasi + rekam medis lookup (buat-ulasan.html only): sama seperti form
     pendaftaran, belum terhubung ke sistem asli — jadi submit-nya jujur menampilkan status,
     bukan berpura-pura berhasil atau menampilkan data kunjungan/nama karangan. Form ulasan
     (Langkah 2) tetap dimunculkan sebagai pratinjau alur, tapi field nama dibiarkan kosong
     (bukan diisi nama karangan) karena memang belum ada hasil pencarian sungguhan. */
  var lookupForm = document.getElementById('lookupForm');
  var lookupFeedback = document.getElementById('lookupFeedback');
  var reviewSection = document.getElementById('reviewSection');
  if (lookupForm && lookupFeedback) {
    lookupForm.addEventListener('submit', function(e){
      e.preventDefault();
      lookupFeedback.classList.add('is-visible');
      lookupFeedback.setAttribute('tabindex', '-1');
      lookupFeedback.focus();
      if (reviewSection) { reviewSection.hidden = false; }
    });
  }

  var reviewForm = document.getElementById('reviewForm');
  var reviewFeedback = document.getElementById('reviewFeedback');
  if (reviewForm && reviewFeedback) {
    reviewForm.addEventListener('submit', function(e){
      e.preventDefault();
      reviewFeedback.classList.add('is-visible');
      reviewFeedback.setAttribute('tabindex', '-1');
      reviewFeedback.focus();
    });
  }

  /* Form Pengaduan (kanal-pengaduan.html only): pola sama persis dengan lookupForm/reviewForm
     di atas — situs ini statis tanpa backend, jadi submit-nya jujur menampilkan status belum
     aktif (R-17/R-38), bukan berpura-pura pengaduan benar-benar terkirim ke RSUD Morowali. */
  var complaintForm = document.getElementById('complaintForm');
  var complaintFeedback = document.getElementById('complaintFeedback');
  if (complaintForm && complaintFeedback) {
    complaintForm.addEventListener('submit', function(e){
      e.preventDefault();
      complaintFeedback.classList.add('is-visible');
      complaintFeedback.setAttribute('tabindex', '-1');
      complaintFeedback.focus();
    });
  }

  /* Hero carousel (index.html only): autoplay only, no manual controls.
     Pauses on hover/focus (e.g. while using the search form inside it) and
     never animates when the visitor's browser asks for reduced motion. */
  var carouselEl = document.getElementById('heroCarousel');
  if (carouselEl) {
    var slides = carouselEl.querySelectorAll('.hero-slide');
    var current = 0;
    var timerId = null;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function showSlide(index){
      slides[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }
    function startAutoplay(){
      if (reduceMotion || slides.length < 2) return;
      timerId = setInterval(function(){ showSlide(current + 1); }, 6000);
    }
    function stopAutoplay(){
      if (timerId) { clearInterval(timerId); timerId = null; }
    }

    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', startAutoplay);
    carouselEl.addEventListener('focusin', stopAutoplay);
    carouselEl.addEventListener('focusout', startAutoplay);

    startAutoplay();
  }

  /* Hero search: "cari dokter atau layanan" (index.html only).
     No doctor database exists yet, so this searches the real, known service list
     and is honest (with links to browse instead) when nothing matches. */
  var HERO_SERVICES = [
    { name: 'IGD - Unit Gawat Darurat 24 Jam', href: 'layanan.html#layanan-igd' },
    { name: 'Poliklinik Umum/Konsultasi', href: 'layanan.html#layanan-poli-umum' },
    { name: 'Poliklinik Anak', href: 'layanan.html#layanan-poli-anak' },
    { name: 'Poliklinik Saraf', href: 'layanan.html#layanan-poli-saraf' },
    { name: 'Poliklinik Kulit dan Kelamin', href: 'layanan.html#layanan-poli-kulit-kelamin' },
    { name: 'Poliklinik Orthopedi', href: 'layanan.html#layanan-poli-orthopedi' },
    { name: 'Poliklinik Bedah', href: 'layanan.html#layanan-poli-bedah' },
    { name: 'Poliklinik THT', href: 'layanan.html#layanan-poli-tht' },
    { name: 'Poliklinik Obgyn', href: 'layanan.html#layanan-poli-obgyn' },
    { name: 'Poliklinik Penyakit Dalam', href: 'layanan.html#layanan-poli-penyakit-dalam' },
    { name: 'Poliklinik Mata', href: 'layanan.html#layanan-poli-mata' },
    { name: 'Poliklinik Jiwa', href: 'layanan.html#layanan-poli-jiwa' },
    { name: 'Poliklinik Penyakit Mulut', href: 'layanan.html#layanan-poli-penyakit-mulut' },
    { name: 'Poliklinik Periodonsia', href: 'layanan.html#layanan-poli-periodonsia' },
    { name: 'Poliklinik Endodonsia', href: 'layanan.html#layanan-poli-endodonsia' },
    { name: 'Poliklinik Orthodonti', href: 'layanan.html#layanan-poli-orthodonti' },
    { name: 'Poliklinik Bedah Mulut', href: 'layanan.html#layanan-poli-bedah-mulut' },
    { name: 'Poliklinik Jantung dan Pembuluh Darah', href: 'layanan.html#layanan-poli-jantung' },
    { name: 'Poliklinik Paru', href: 'layanan.html#layanan-poli-paru' },
    { name: 'Poliklinik Rehabilitasi Medik', href: 'layanan.html#layanan-poli-rehab-medik' },
    { name: 'Poliklinik Gizi', href: 'layanan.html#layanan-poli-gizi' },
    { name: 'Perawatan VVIP Sakura', href: 'layanan.html#layanan-rawat-vvip-sakura' },
    { name: 'Perawatan VIP Catelya', href: 'layanan.html#layanan-rawat-vip-catelya' },
    { name: 'Perawatan Tulip', href: 'layanan.html#layanan-rawat-tulip' },
    { name: 'Perawatan Anggrek', href: 'layanan.html#layanan-rawat-anggrek' },
    { name: 'Perawatan Asoka', href: 'layanan.html#layanan-rawat-asoka' },
    { name: 'Perawatan Lavender', href: 'layanan.html#layanan-rawat-lavender' },
    { name: 'Perawatan Mawar', href: 'layanan.html#layanan-rawat-mawar' },
    { name: 'Perawatan Edelweis', href: 'layanan.html#layanan-rawat-edelweis' },
    { name: 'Perawatan Matahari', href: 'layanan.html#layanan-rawat-matahari' },
    { name: 'Perawatan Dahlia', href: 'layanan.html#layanan-rawat-dahlia' },
    { name: 'Perawatan Melati', href: 'layanan.html#layanan-rawat-melati' },
    { name: 'Perawatan Teratai', href: 'layanan.html#layanan-rawat-teratai' },
    { name: 'Perawatan ICU', href: 'layanan.html#layanan-rawat-icu' },
    { name: 'Perawatan HCU', href: 'layanan.html#layanan-rawat-hcu' },
    { name: 'Perawatan ICVCU', href: 'layanan.html#layanan-rawat-icvcu' },
    { name: 'Perawatan Bougenvile', href: 'layanan.html#layanan-rawat-bougenvile' },
    { name: 'Laboratorium', href: 'layanan.html#layanan-laboratorium' },
    { name: 'Radiologi', href: 'layanan.html#layanan-radiologi' },
    { name: 'Farmasi', href: 'layanan.html#layanan-farmasi' },
    { name: 'Kamar Operasi', href: 'layanan.html#layanan-kamar-operasi' },
    { name: 'Fisioterapi', href: 'layanan.html#layanan-fisioterapi' },
    { name: 'Instalasi Gizi', href: 'layanan.html#layanan-instalasi-gizi' },
    { name: 'CSSD', href: 'layanan.html#layanan-cssd' },
    { name: 'Laundry', href: 'layanan.html#layanan-laundry' },
    { name: 'UTD RS dan Bank Darah', href: 'layanan.html#layanan-utd-bank-darah' },
    { name: 'IPSRS', href: 'layanan.html#layanan-ipsrs' },
    { name: 'Rekam Medis', href: 'layanan.html#layanan-rekam-medis' },
    { name: 'Unit IT', href: 'layanan.html#layanan-unit-it' }
  ];

  var heroSearchForm = document.getElementById('heroSearchForm');
  var heroSearchInput = document.getElementById('heroSearchInput');
  var heroSearchResults = document.getElementById('heroSearchResults');

  function runHeroSearch(){
    var raw = heroSearchInput.value.trim();
    var q = raw.toLowerCase();
    heroSearchResults.innerHTML = '';

    if (!q) {
      heroSearchResults.classList.remove('is-visible');
      return;
    }

    var matches = HERO_SERVICES.filter(function(s){
      return s.name.toLowerCase().indexOf(q) !== -1;
    });

    if (matches.length) {
      matches.forEach(function(m){
        var a = document.createElement('a');
        a.href = m.href;
        a.textContent = m.name;
        heroSearchResults.appendChild(a);
      });
    } else {
      var wrap = document.createElement('div');
      wrap.className = 'no-result';
      var msg = document.createElement('div');
      msg.textContent = '"' + raw + '" tidak ditemukan di daftar layanan. Nama dokter belum bisa dicari karena datanya belum tersedia.';
      var links = document.createElement('div');
      links.style.marginTop = '6px';
      var a1 = document.createElement('a'); a1.href = 'layanan.html'; a1.textContent = 'Lihat semua layanan';
      var a2 = document.createElement('a'); a2.href = 'jadwal-dokter.html'; a2.textContent = 'Jadwal dokter';
      links.appendChild(a1); links.appendChild(a2);
      wrap.appendChild(msg); wrap.appendChild(links);
      heroSearchResults.appendChild(wrap);
    }
    heroSearchResults.classList.add('is-visible');
  }

  if (heroSearchForm && heroSearchInput && heroSearchResults) {
    heroSearchForm.addEventListener('submit', function(e){ e.preventDefault(); runHeroSearch(); });
    heroSearchInput.addEventListener('input', runHeroSearch);
  }

  /* Cari Jadwal per Hari (jadwal-dokter.html) + Profil Dokter (profil-dokter.html): dipakai
     bareng oleh 2 halaman, jadi DOCTOR_SCHEDULE & DAY_DEFS dideklarasikan di scope terluar
     (bukan di dalam blok if masing-masing) supaya kedua blok bisa mengaksesnya. Tabel jadwal
     versi lama sudah dihapus dari HTML (permintaan langsung) — datanya dipindah ke sini sebagai
     DOCTOR_SCHEDULE, satu-satunya sumber data untuk kedua fitur ini. 2 dokter yang jadwalnya
     masih belum tersedia (Bedah, THT) tetap disertakan (muncul tiap hari kerja Senin–Sabtu,
     sama seperti poliklinik lain) tapi field `jam`-nya ditulis teks "Belum tersedia" apa
     adanya, bukan jam karangan — jujur, bukan disembunyikan dari hasil. Field `id` dipakai
     sebagai slug URL ke halaman profil (`profil-dokter.html?id=...`). */
  var DAY_DEFS = [
    { key: 'senin', short: 'Sen', label: 'Senin' },
    { key: 'selasa', short: 'Sel', label: 'Selasa' },
    { key: 'rabu', short: 'Rab', label: 'Rabu' },
    { key: 'kamis', short: 'Kam', label: 'Kamis' },
    { key: 'jumat', short: 'Jum', label: 'Jumat' },
    { key: 'sabtu', short: 'Sab', label: 'Sabtu' },
    { key: 'minggu', short: 'Min', label: 'Minggu' }
  ];
  var DOCTOR_SCHEDULE = [
    { id: 'hestinah', poli: 'Poliklinik Umum/Konsultasi', dokter: 'dr. Hestinah', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'hasniah-syah', poli: 'Poliklinik Umum/Konsultasi', dokter: 'dr. Hasniah Syah', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'grace-mantong', poli: 'Poliklinik Anak', dokter: 'dr. Grace Mantong, Sp.A', jam: '08.00–14.00 WITA', days: ['senin','selasa'] },
    { id: 'nancy-pongsibidang', poli: 'Poliklinik Anak', dokter: 'dr. Nancy Pongsibidang', jam: '08.00–14.00 WITA', days: ['rabu','kamis'] },
    { id: 'ichsan-said', poli: 'Poliklinik Anak', dokter: 'dr. Ichsan Said, Sp.A', jam: '08.00–14.00 WITA', days: ['jumat','sabtu'] },
    { id: 'rahmi-muin', poli: 'Poliklinik Saraf', dokter: 'dr. Rahmi Muin, Sp.N, M.Kes, FINA, AIFO-K', jam: '11.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'bayu-panji-nurcahyo', poli: 'Poliklinik Saraf', dokter: 'dr. Bayu Panji Nurcahyo', jam: '08.00–10.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'maarifah-nadjar', poli: 'Poliklinik Kulit dan Kelamin', dokter: 'dr. Maarifah Nadjar, Sp.KK, M.Kes', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis'] },
    { id: 'kikin-rizkynnisa', poli: 'Poliklinik Kulit dan Kelamin', dokter: 'dr. Kikin Rizkynnisa, Sp.D.V.E', jam: '08.00–14.00 WITA', days: ['jumat','sabtu'] },
    { id: 'risal', poli: 'Poliklinik Orthopedi', dokter: 'dr. Risal, Sp.OT', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'ashy-amelia-arista', poli: 'Poliklinik Bedah', dokter: 'dr. Ashy Amelia Arista A, Sp.B', jam: '08.00–10.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'ismayadi-hayat', poli: 'Poliklinik Bedah', dokter: 'dr. Ismayadi Hayat, Sp.B', jam: '10.00–12.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'agus-as-partang', poli: 'Poliklinik Bedah', dokter: 'dr. Agus AS Partang', jam: '12.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'matsrial-putra-rombetasik', poli: 'Poliklinik Bedah', dokter: 'dr. Matsrial Putra Rombetasik, Sp.B', jam: 'Belum tersedia', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'aksimita-yani', poli: 'Poliklinik THT', dokter: 'dr. Aksimita Yani, Sp.T.H.T.K.L', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'catherine-shinta-tandigala', poli: 'Poliklinik THT', dokter: 'dr. Catherine Shinta Tandigala, Sp.T.H.T.K.L', jam: 'Belum tersedia', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'farha-inesari', poli: 'Poliklinik Obgyn', dokter: 'dr. Farha Inesari, Sp.OG', jam: '08.00–14.00 WITA', days: ['senin','selasa'] },
    { id: 'adhe-ikhmaynar-puteri', poli: 'Poliklinik Obgyn', dokter: 'dr. Adhe Ikhmaynar Puteri, Sp.OG', jam: '08.00–14.00 WITA', days: ['rabu','sabtu'] },
    { id: 'hendra-santoso', poli: 'Poliklinik Obgyn', dokter: 'dr. Hendra Santoso, Sp.OG', jam: '08.00–14.00 WITA', days: ['kamis','jumat','sabtu'] },
    { id: 'st-aisyah-ibrahim', poli: 'Poliklinik Penyakit Dalam', dokter: 'dr. St. Aisyah Ibrahim, Sp.PD', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'tiwi-charisma', poli: 'Poliklinik Penyakit Dalam', dokter: 'dr. Tiwi Charisma, Sp.PD', jam: '08.00–14.00 WITA', days: ['senin','rabu','jumat'] },
    { id: 'arnis-fanasari-umar', poli: 'Poliklinik Penyakit Dalam', dokter: 'dr. Arnis Fanasari Umar, Sp.PD', jam: '08.00–14.00 WITA', days: ['selasa','kamis','sabtu'] },
    { id: 'herryanto-thomassawa', poli: 'Poliklinik Mata', dokter: 'dr. Herryanto Thomassawa, Sp.M', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'mikael-sri-pabilang', poli: 'Poliklinik Jiwa', dokter: 'dr. Mikael Sri Pabilang, Sp.KJ', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'selviana-tampoma', poli: 'Poliklinik Penyakit Mulut', dokter: 'drg. Selviana Tampoma, Sp.PM', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'dian-eka-satya', poli: 'Poliklinik Periodonsia', dokter: 'drg. Dian Eka Satya, Sp.Perio', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'muthmainnah-majaya', poli: 'Poliklinik Endodonsia', dokter: 'drg. Muthmainnah Majaya, Sp.KG', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'azrul-hidayat', poli: 'Poliklinik Orthodonti', dokter: 'drg. Azrul Hidayat, Sp.Ort', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'iin-sandaya-amalia', poli: 'Poliklinik Bedah Mulut', dokter: 'drg. Iin Sandaya Amalia, Sp.B.M.MF', jam: '08.00–14.00 WITA', days: ['senin','rabu','kamis','jumat','sabtu'] },
    { id: 'dwi-widya-puji-astuti', poli: 'Poliklinik Jantung dan Pembuluh Darah', dokter: 'dr. Dwi Widya Puji Astuti, Sp.JP', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'wirya-sastra-amran', poli: 'Poliklinik Paru', dokter: 'dr. Wirya Sastra Amran, Sp.P', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'nurjannah-nasir', poli: 'Poliklinik Rehabilitasi Medik', dokter: 'dr. Nurjannah Nasir', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] },
    { id: 'lieken-artarini-mehingko', poli: 'Poliklinik Gizi', dokter: 'dr. Lieken Artarini Mehingko, Sp.GK', jam: '08.00–14.00 WITA', days: ['senin','selasa','rabu','kamis','jumat','sabtu'] }
  ];
  /* Format array key hari (mis. ['senin','rabu','jumat']) jadi teks rapi, dipakai profil-dokter.html.
     Rentang berurutan digabung pakai en dash ("Senin–Sabtu"), yang terpisah dipisah koma
     ("Selasa, Kamis, Sabtu") — meniru persis pola teks "Hari Praktik" yang sudah ada. */
  function formatDays(dayKeys){
    var indices = dayKeys.map(function(k){
      return DAY_DEFS.findIndex(function(d){ return d.key === k; });
    }).sort(function(a, b){ return a - b; });
    var groups = [];
    var start = indices[0], prev = indices[0];
    for (var i = 1; i <= indices.length; i++){
      if (i < indices.length && indices[i] === prev + 1) { prev = indices[i]; continue; }
      groups.push(start === prev ? DAY_DEFS[start].label : DAY_DEFS[start].label + '–' + DAY_DEFS[prev].label);
      if (i < indices.length) { start = indices[i]; prev = indices[i]; }
    }
    return groups.join(', ');
  }

  /* Daftar Dokter (daftar-dokter.html only): 33 kartu dibuat dari DOCTOR_SCHEDULE yang sama
     (bukan disalin manual ke HTML), diurutkan alfabet berdasarkan nama asli setelah gelar
     "dr."/"drg." dibuang dulu dari kunci sortir (tanpa ini, "dr." akan selalu tersortir sebelum
     "drg." karena titik lebih kecil dari huruf "g" secara ASCII, bukan urutan nama sungguhan).
     Kartu foto (.doctor-card-photo) disiapkan berbentuk kotak foto persegi, tapi isinya ikon
     generik — BUKAN foto wajah orang lain, karena ke-33 nama dokter di sini sungguhan (nama
     asli, bekerja di RSUD Morowali). Begitu foto asli ada, cukup ganti isi .doctor-card-photo
     dari <span> ikon ini jadi <img> per dokter, strukturnya sudah siap. Kartu dibagi per
     halaman lewat atribut data-page, lalu diproses pagination generik di bawah — harus
     dijalankan SEBELUM blok pagination itu supaya kartunya sudah ada di DOM saat discan. */
  var doctorDirectoryGrid = document.querySelector('[data-doctor-directory]');
  if (doctorDirectoryGrid) {
    var DOCTORS_PER_PAGE = 8;
    var sortedDoctors = DOCTOR_SCHEDULE.slice().sort(function(a, b){
      return a.dokter.replace(/^drg?\.\s*/i, '').localeCompare(b.dokter.replace(/^drg?\.\s*/i, ''), 'id');
    });
    sortedDoctors.forEach(function(doctor, index){
      var card = document.createElement('a');
      card.className = 'doctor-card';
      card.href = 'profil-dokter.html?id=' + encodeURIComponent(doctor.id);
      card.setAttribute('data-page', String(Math.floor(index / DOCTORS_PER_PAGE) + 1));

      var photo = document.createElement('div');
      photo.className = 'doctor-card-photo';
      var avatar = document.createElement('span');
      avatar.className = 'doctor-card-avatar';
      avatar.setAttribute('aria-hidden', 'true');
      avatar.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>';
      photo.appendChild(avatar);

      var body = document.createElement('div');
      body.className = 'doctor-card-body';
      var nameEl = document.createElement('span');
      nameEl.className = 'doctor-card-name';
      nameEl.textContent = doctor.dokter;
      var poliEl = document.createElement('span');
      poliEl.className = 'doctor-card-poli';
      poliEl.textContent = doctor.poli;
      body.appendChild(nameEl);
      body.appendChild(poliEl);

      card.appendChild(photo);
      card.appendChild(body);
      doctorDirectoryGrid.appendChild(card);
    });
  }

  /* Pagination generik (dipakai buat-ulasan.html, edukasi.html, pengumuman.html, daftar-dokter.html
     — cari semua blok [data-pagination] di halaman, bukan 1 ID tetap, supaya 1 fungsi ini dipakai
     ulang di halaman manapun tanpa duplikasi kode). Kontennya bisa placeholder (buat-ulasan.html,
     belum ada ulasan asli), contoh format (edukasi/pengumuman), atau data asli (daftar-dokter.html)
     — mekanisme paging-nya sendiri sungguhan berfungsi: membagi kartu yang sudah ada di halaman
     ke beberapa grup lewat atribut data-page, lalu menampilkan satu grup sesuai halaman aktif. */
  document.querySelectorAll('[data-pagination]').forEach(function(root){
    var pagedGrid = root.querySelector('[data-paged-grid]');
    var paginationNav = root.querySelector('[data-pagination-nav]');
    if (!pagedGrid || !paginationNav) return;
    var cards = Array.prototype.slice.call(pagedGrid.querySelectorAll('[data-page]'));
    var totalPages = 0;
    cards.forEach(function(card){
      totalPages = Math.max(totalPages, parseInt(card.getAttribute('data-page'), 10) || 1);
    });
    var numsWrap = paginationNav.querySelector('[data-pagination-nums]');
    var prevBtn = paginationNav.querySelector('[data-page-nav="prev"]');
    var nextBtn = paginationNav.querySelector('[data-page-nav="next"]');
    var currentPage = 1;

    for (var p = 1; p <= totalPages; p++) {
      var numBtn = document.createElement('button');
      numBtn.type = 'button';
      numBtn.className = 'pagination-num';
      numBtn.textContent = String(p);
      numBtn.setAttribute('data-page', String(p));
      numsWrap.appendChild(numBtn);
    }

    function showPage(page){
      currentPage = page;
      cards.forEach(function(card){
        var onThisPage = parseInt(card.getAttribute('data-page'), 10) === page;
        card.hidden = !onThisPage;
      });
      numsWrap.querySelectorAll('.pagination-num').forEach(function(btn){
        var isActive = parseInt(btn.getAttribute('data-page'), 10) === page;
        btn.classList.toggle('is-active', isActive);
        if (isActive) { btn.setAttribute('aria-current', 'page'); } else { btn.removeAttribute('aria-current'); }
      });
      if (prevBtn) prevBtn.disabled = page <= 1;
      if (nextBtn) nextBtn.disabled = page >= totalPages;
    }

    numsWrap.addEventListener('click', function(e){
      var btn = e.target.closest('.pagination-num');
      if (!btn) return;
      showPage(parseInt(btn.getAttribute('data-page'), 10));
    });
    if (prevBtn) prevBtn.addEventListener('click', function(){ if (currentPage > 1) showPage(currentPage - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ if (currentPage < totalPages) showPage(currentPage + 1); });

    showPage(1);
  });

  var dayStrip = document.querySelector('[data-day-strip]');
  var dayResults = document.querySelector('[data-day-results]');
  if (dayStrip && dayResults) {
    var today = new Date();
    var jsDay = today.getDay(); // 0 (Minggu) - 6 (Sabtu)
    var todayIndex = jsDay === 0 ? 6 : jsDay - 1; // geser ke index Senin=0 ... Minggu=6

    /* Strip 7 hari mulai dari HARI INI, bukan dipatok ke Senin minggu berjalan — supaya
       tanggal yang sudah lewat tidak ikut muncul (mis. hari ini tgl 1 → strip tampilkan
       1,2,3,4,5,6,7, bukan mundur ke Senin kalau hari ini sudah tengah minggu). */
    for (var i = 0; i < 7; i++) {
      var def = DAY_DEFS[(todayIndex + i) % 7];
      var dayDate = new Date(today);
      dayDate.setDate(today.getDate() + i);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'day-btn';
      btn.setAttribute('data-day', def.key);
      btn.setAttribute('data-day-label', def.label);
      btn.setAttribute('aria-pressed', 'false');
      if (i === 0) { btn.classList.add('is-today'); }

      var nameEl = document.createElement('span');
      nameEl.className = 'day-btn-name';
      nameEl.textContent = def.short;
      var dateEl = document.createElement('span');
      dateEl.className = 'day-btn-date';
      dateEl.textContent = String(dayDate.getDate());

      btn.appendChild(nameEl);
      btn.appendChild(dateEl);
      dayStrip.appendChild(btn);
    }

    function renderDay(dayKey, dayLabel){
      dayResults.innerHTML = '';

      var heading = document.createElement('h3');
      heading.className = 'day-results-heading';
      heading.textContent = 'Jadwal Hari ' + dayLabel;
      dayResults.appendChild(heading);

      var matches = DOCTOR_SCHEDULE.filter(function(entry){
        return entry.days && entry.days.indexOf(dayKey) !== -1;
      });

      if (!matches.length) {
        var empty = document.createElement('div');
        empty.className = 'day-empty';
        empty.textContent = dayKey === 'minggu'
          ? 'Tidak ada jadwal praktik dokter pada hari Minggu. Poliklinik rawat jalan RSUD Morowali beroperasi Senin–Sabtu.'
          : 'Belum ada data jadwal dokter untuk hari ini.';
        dayResults.appendChild(empty);
        return;
      }

      /* Kelompokkan per poliklinik — kalau 1 poliklinik punya lebih dari 1 dokter di hari yang
         sama, semuanya masuk 1 kartu, nama dokter bersusun di dalamnya (sama jadwal ataupun
         beda jam), bukan kartu terpisah per dokter. */
      var order = [];
      var grouped = {};
      matches.forEach(function(entry){
        if (!grouped[entry.poli]) { grouped[entry.poli] = []; order.push(entry.poli); }
        grouped[entry.poli].push(entry);
      });

      order.forEach(function(poli){
        var item = document.createElement('div');
        item.className = 'day-result-item';

        var poliEl = document.createElement('div');
        poliEl.className = 'day-result-poli';
        poliEl.textContent = poli;
        item.appendChild(poliEl);

        var list = document.createElement('div');
        list.className = 'day-result-doctor-list';

        grouped[poli].forEach(function(entry){
          var line = document.createElement('div');
          line.className = 'day-result-doctor-row';

          var info = document.createElement('div');
          info.className = 'day-result-doctor-info';
          var nameEl = document.createElement('span');
          nameEl.className = 'day-result-doctor';
          nameEl.textContent = entry.dokter;
          info.appendChild(nameEl);
          var profileLink = document.createElement('a');
          profileLink.className = 'day-result-profile-link';
          profileLink.href = 'profil-dokter.html?id=' + encodeURIComponent(entry.id);
          profileLink.innerHTML = 'Lihat Profil <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
          info.appendChild(profileLink);

          var timeEl = document.createElement('span');
          timeEl.className = 'day-result-time';
          if (entry.jam === 'Belum tersedia') { timeEl.classList.add('placeholder'); }
          timeEl.textContent = entry.jam;

          line.appendChild(info);
          line.appendChild(timeEl);
          list.appendChild(line);
        });

        item.appendChild(list);
        dayResults.appendChild(item);
      });
    }

    function selectDay(btn){
      dayStrip.querySelectorAll('.day-btn').forEach(function(b){
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      renderDay(btn.getAttribute('data-day'), btn.getAttribute('data-day-label'));
    }

    dayStrip.addEventListener('click', function(e){
      var btn = e.target.closest('.day-btn');
      if (btn) { selectDay(btn); }
    });

    selectDay(dayStrip.querySelectorAll('.day-btn')[0]);
  }

  /* Profil Dokter (profil-dokter.html only): halaman permanen, bukan contoh/pratinjau lagi —
     nama & poliklinik dokter di sini SELALU data asli (dibaca dari DOCTOR_SCHEDULE via `?id=`
     di URL), tidak pernah nama karangan. Foto & riwayat pendidikan asli belum ada dari user,
     jadi keduanya ditampilkan jujur sebagai placeholder (ikon generik + teks "[...]"), BUKAN
     foto orang lain atau teks karangan — beda dari draf awal fitur ini yang sempat dibuat
     sebagai halaman contoh terpisah (nama fiktif + foto Unsplash + Lorem Ipsum), sudah dihapus
     total dan digantikan halaman ini atas permintaan langsung. */
  var doctorProfileRoot = document.querySelector('[data-doctor-profile]');
  if (doctorProfileRoot) {
    var params = new URLSearchParams(window.location.search);
    var doctor = DOCTOR_SCHEDULE.find(function(d){ return d.id === params.get('id'); });
    var foundEl = doctorProfileRoot.querySelector('[data-profile-found]');
    var notFoundEl = doctorProfileRoot.querySelector('[data-profile-not-found]');

    if (doctor) {
      foundEl.hidden = false;
      foundEl.querySelector('[data-profile-name]').textContent = doctor.dokter;
      foundEl.querySelector('[data-profile-poli]').textContent = doctor.poli;
      var jamEl = foundEl.querySelector('[data-profile-jam]');
      if (doctor.jam === 'Belum tersedia') {
        jamEl.textContent = 'Jadwal praktik belum tersedia';
        jamEl.classList.add('placeholder');
      } else {
        jamEl.textContent = 'Praktik ' + formatDays(doctor.days) + ', ' + doctor.jam;
      }
    } else {
      notFoundEl.hidden = false;
    }
  }
})();
