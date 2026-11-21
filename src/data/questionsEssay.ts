import { EssayQuestionBankItem } from '../types/exam';

export const ESSAY_QUESTION_BANK: EssayQuestionBankItem[] = [
  // =========================================================================
  // 5 SOAL ASLI URAIAN (ESSAY-01 s.d. ESSAY-05)
  // =========================================================================
  {
    questionId: 'ESSAY-01',
    isOriginal: true,
    topic: 'Aplikasi Web vs Desktop/Native',
    prompt:
      'Jelaskan perbedaan mendasar antara aplikasi berbasis web (Web Application) dengan aplikasi desktop/native, serta sebutkan kelebihan utama aplikasi web dari segi aksesibilitas dan pemeliharaan (maintenance)!',
    maxScore: 20,
    kunciJawabanRingkas:
      'Aplikasi web berjalan melalui browser menggunakan teknologi web (HTML/CSS/JS) dan diakses lewat jaringan/URL tanpa instalasi OS spesifik, sedangkan aplikasi desktop/native dikompilasi dan diinstal langsung pada sistem operasi tertentu. Kelebihan aksesibilitas: lintas platform (Windows, macOS, Linux, mobile) dari mana saja melalui browser. Kelebihan maintenance: pembaruan cukup dilakukan terpusat di server sehingga semua pengguna langsung mendapat versi terbaru tanpa instalasi ulang.',
    rubrik: [
      {
        kriteria: 'Perbedaan Arsitektur & Eksekusi',
        bobot: 8,
        deskripsi:
          'Menjelaskan aplikasi web dijalankan di browser berbasis URL/server vs aplikasi native yang diinstal langsung pada OS tertentu.',
      },
      {
        kriteria: 'Kelebihan Aksesibilitas',
        bobot: 6,
        deskripsi:
          'Menyebutkan kompatibilitas lintas perangkat/sistem operasi dan kemudahan akses tanpa proses instalasi.',
      },
      {
        kriteria: 'Kelebihan Pemeliharaan (Maintenance)',
        bobot: 6,
        deskripsi:
          'Menjelaskan pembaruan dan perbaikan bug dilakukan terpusat di server sehingga langsung dirasakan seluruh pengguna.',
      },
    ],
  },
  {
    questionId: 'ESSAY-02',
    isOriginal: true,
    topic: 'Client-Side vs Server-Side',
    prompt:
      'Dalam arsitektur teknologi web, jelaskan peran serta perbedaan cara kerja antara Client-Side (Sisi Klien) dan Server-Side (Sisi Server) dalam merespon permintaan pengguna!',
    maxScore: 20,
    kunciJawabanRingkas:
      'Client-Side (frontend) berjalan di perangkat/browser pengguna (HTML, CSS, JavaScript) untuk merender tampilan UI, menangani interaksi cepat, dan validasi awal. Server-Side (backend) berjalan di mesin server (Node.js, PHP, Python, dll.) untuk memproses logika bisnis, autentikasi, otorisasi keamanan, serta membaca/menulis basis data sebelum mengirim respons kembali ke klien.',
    rubrik: [
      {
        kriteria: 'Peran & Teknologi Client-Side',
        bobot: 7,
        deskripsi:
          'Menjelaskan eksekusi di browser pengguna, rendering antarmuka, dan interaktivitas lokal (HTML, CSS, JS).',
      },
      {
        kriteria: 'Peran & Teknologi Server-Side',
        bobot: 7,
        deskripsi:
          'Menjelaskan eksekusi di server jarak jauh, pengelolaan database, autentikasi, serta keamanan data.',
      },
      {
        kriteria: 'Alur Respons Permintaan',
        bobot: 6,
        deskripsi:
          'Menggambarkan interaksi permintaan dari klien ke server lalu pengembalian data/halaman ke klien.',
      },
    ],
  },
  {
    questionId: 'ESSAY-03',
    isOriginal: true,
    topic: 'Siklus Request & Response HTTP/HTTPS',
    prompt:
      'Uraikan bagaimana mekanisme/siklus Request dan Response HTTP/HTTPS bekerja ketika seorang pengguna mengetikkan URL alamat website di web browser hingga halaman web tampil sempurna!',
    maxScore: 20,
    kunciJawabanRingkas:
      '1) Pengguna mengetik URL; browser melakukan DNS lookup untuk memperoleh IP server. 2) Koneksi TCP dibuka, dan untuk HTTPS dilakukan TLS/SSL handshake guna mengenkripsi jalur komunikasi. 3) Browser mengirim HTTP Request (metode GET/POST, path, header). 4) Server memproses permintaan dan mengirim HTTP Response (status code 200 OK, header, body HTML). 5) Browser mengurai HTML, meminta aset tambahan (CSS, JS, gambar), lalu merender halaman utuh ke layar.',
    rubrik: [
      {
        kriteria: 'Resolusi DNS & Koneksi/TLS',
        bobot: 6,
        deskripsi:
          'Menyebutkan penerjemahan domain ke alamat IP via DNS dan pembuatan koneksi TCP/TLS (pada HTTPS).',
      },
      {
        kriteria: 'Pengiriman Request & Pemrosesan Server',
        bobot: 7,
        deskripsi:
          'Menjelaskan struktur HTTP Request (metode, header) dan pemrosesan di web server hingga menghasilkan HTTP Response (status code & body).',
      },
      {
        kriteria: 'Pengambilan Aset & Rendering Akhir',
        bobot: 7,
        deskripsi:
          'Menjelaskan browser membaca HTML, mengambil CSS/JS/gambar tambahan, dan menampilkannya di layar.',
      },
    ],
  },
  {
    questionId: 'ESSAY-04',
    isOriginal: true,
    topic: 'Web Browser & Rendering Engine',
    prompt:
      'Jelaskan fungsi web browser sebagai perangkat lunak web dan bagaimana modul rendering engine (seperti Blink atau Gecko) menerjemahkan kode HTML, CSS, dan JavaScript menjadi tampilan visual yang interaktif!',
    maxScore: 20,
    kunciJawabanRingkas:
      'Web browser adalah perangkat lunak klien untuk mengambil, menafsirkan, dan menampilkan sumber daya web dari internet/server. Rendering engine (Blink/Gecko) mengurai HTML menjadi DOM tree dan CSS menjadi CSSOM tree, menggabungkannya menjadi Render Tree, melakukan tahap Layout (menghitung posisi/ukuran tiap elemen) dan Paint (menggambar piksel ke layar). Sementara JavaScript Engine (V8/SpiderMonkey) mengeksekusi kode JS untuk memanipulasi DOM/CSSOM dan menangani event sehingga halaman menjadi interaktif.',
    rubrik: [
      {
        kriteria: 'Fungsi Umum Web Browser',
        bobot: 5,
        deskripsi:
          'Menjelaskan browser sebagai antarmuka pengguna untuk meminta, menerima, dan menampilkan dokumen web.',
      },
      {
        kriteria: 'Pipeline DOM, CSSOM, Render Tree, Layout, Paint',
        bobot: 10,
        deskripsi:
          'Menjelaskan tahapan parsing HTML -> DOM, CSS -> CSSOM, penggabungan Render Tree, perhitungan Layout, dan Painting.',
      },
      {
        kriteria: 'Peran JavaScript Engine untuk Interaktivitas',
        bobot: 5,
        deskripsi:
          'Menjelaskan eksekusi JS dalam merespons event dan memperbarui DOM secara dinamis.',
      },
    ],
  },
  {
    questionId: 'ESSAY-05',
    isOriginal: true,
    topic: 'Fungsi Web Server Statis & Dinamis',
    prompt:
      'Apa fungsi utama dari Web Server (seperti Apache, Nginx, atau LiteSpeed) dan bagaimana web server menangani request berkas statis maupun dinamis dari client?',
    maxScore: 20,
    kunciJawabanRingkas:
      'Fungsi utama Web Server adalah menerima koneksi HTTP/HTTPS dari client, mengelola perutean permintaan, keamanan TLS/akses, dan mengirimkan respons kembali. Untuk berkas statis (HTML tetap, CSS, JS, gambar), web server mengambil berkas langsung dari sistem file disk dan mengirimkannya ke client. Untuk permintaan dinamis, web server meneruskan request ke aplikasi backend/runtime (PHP-FPM, Node.js, Python) yang mengolah logika dan kueri database untuk menyusun respons HTML/JSON baru sebelum dikirim balik ke client.',
    rubrik: [
      {
        kriteria: 'Fungsi Utama Web Server',
        bobot: 6,
        deskripsi:
          'Menjelaskan peran sebagai penerima request HTTP/HTTPS, pengelola port, keamanan, dan pengirim respons.',
      },
      {
        kriteria: 'Penanganan Berkas Statis',
        bobot: 7,
        deskripsi:
          'Menjelaskan pembacaan berkas langsung dari penyimpanan server tanpa pemrosesan backend/database.',
      },
      {
        kriteria: 'Penanganan Permintaan Dinamis',
        bobot: 7,
        deskripsi:
          'Menjelaskan penerusan request ke runtime/application server dan database untuk menghasilkan respons dinamis.',
      },
    ],
  },

  // =========================================================================
  // 5 SOAL VARIASI URAIAN BARU (ESSAY-06 s.d. ESSAY-10)
  // =========================================================================
  {
    questionId: 'ESSAY-06',
    isOriginal: false,
    topic: 'Struktur Data Matriks 2D & Validasi Pergerakan',
    prompt:
      'Jelaskan bagaimana struktur data array dua dimensi (matriks) digunakan untuk memodelkan peta grid pada aplikasi interaktif, serta uraikan langkah validasi yang harus dilakukan sebelum memindahkan entitas ke sel tujuan!',
    maxScore: 20,
    kunciJawabanRingkas:
      'Array dua dimensi memetakan koordinat baris (indeks pertama, sumbu Y) dan kolom (indeks kedua, sumbu X) menggunakan kode angka (misalnya 0 = jalan kosong, 1 = dinding, 3 = item). Sebelum memindahkan entitas ke (nextR, nextC), program harus: 1) mengecek batas indeks agar tidak < 0 atau >= jumlah baris/kolom; 2) memeriksa apakah sel tujuan bukan dinding (!== 1); 3) menangani efek khusus seperti mengambil item (mengubah nilai sel menjadi 0) atau tabrakan bahaya sebelum memperbarui koordinat posisi.',
    rubrik: [
      {
        kriteria: 'Representasi Baris-Kolom & Kode Sel',
        bobot: 7,
        deskripsi:
          'Menjelaskan penggunaan array bersarang map[row][col] dengan kode numerik untuk tiap jenis objek.',
      },
      {
        kriteria: 'Validasi Batas (Bounds Checking)',
        bobot: 6,
        deskripsi:
          'Menjelaskan pengecekan agar indeks tujuan tidak keluar dari dimensi array.',
      },
      {
        kriteria: 'Validasi Penghalang & Mutasi State',
        bobot: 7,
        deskripsi:
          'Menjelaskan pembatalan langkah pada dinding dan pembaruan nilai sel saat item diambil.',
      },
    ],
  },
  {
    questionId: 'ESSAY-07',
    isOriginal: false,
    topic: 'Penjadwalan Asinkron & Finite State Machine',
    prompt:
      'Bandingkan cara kerja setTimeout() dan setInterval() di JavaScript, serta jelaskan bagaimana pola Finite State Machine (FSM) membantu mengatur siklus hidup suatu objek interaktif berbasis waktu!',
    maxScore: 20,
    kunciJawabanRingkas:
      'setTimeout(fn, ms) mengeksekusi fungsi satu kali setelah jeda waktu tertentu, sedangkan setInterval(fn, ms) mengeksekusinya berulang kali setiap interval waktu hingga dihentikan dengan clearInterval(id). Pola FSM membagi siklus hidup objek menjadi beberapa status diskret (misal WAITING -> COOKING -> READY -> ANGRY) sehingga setiap event klik maupun hitungan mundur timer hanya memicu aksi yang valid untuk status saat itu dan mencegah kebocoran memori dengan menghentikan interval saat status selesai.',
    rubrik: [
      {
        kriteria: 'Perbedaan setTimeout vs setInterval',
        bobot: 7,
        deskripsi:
          'Menjelaskan eksekusi tunggal vs berulang serta pentingnya clearInterval() untuk manajemen memori.',
      },
      {
        kriteria: 'Konsep & Transisi FSM',
        bobot: 7,
        deskripsi:
          'Menjelaskan pendefinisian state terbatas beserta aturan transisi yang terstruktur.',
      },
      {
        kriteria: 'Integrasi Event & Timer dengan State',
        bobot: 6,
        deskripsi:
          'Memberikan contoh bagaimana percabangan if/switch pada state menentukan respons interaksi.',
      },
    ],
  },
  {
    questionId: 'ESSAY-08',
    isOriginal: false,
    topic: 'Pipeline Render HTML5 Canvas & Kontrol Halus',
    prompt:
      'Jelaskan mengapa requestAnimationFrame() lebih unggul daripada setInterval() untuk animasi HTML5 <canvas>, serta jelaskan fungsi ctx.clearRect() dan pola key-state map (keys[e.code]) dalam menjaga kelancaran animasi!',
    maxScore: 20,
    kunciJawabanRingkas:
      'requestAnimationFrame() menyelaraskan pembaruan frame dengan refresh rate layar perangkat dan otomatis menjeda saat tab tidak aktif sehingga hemat daya dan bebas tearing. ctx.clearRect() membersihkan seluruh piksel frame lama sebelum frame baru digambar agar objek tidak meninggalkan jejak (smearing). Pola key-state map (keydown -> true, keyup -> false) memungkinkan loop update() membaca tombol yang ditahan secara kontinu setiap frame tanpa terhambat jeda auto-repeat sistem operasi.',
    rubrik: [
      {
        kriteria: 'Keunggulan requestAnimationFrame',
        bobot: 7,
        deskripsi:
          'Menjelaskan sinkronisasi refresh rate layar dan jeda otomatis pada tab non-aktif.',
      },
      {
        kriteria: 'Fungsi ctx.clearRect()',
        bobot: 6,
        deskripsi:
          'Menjelaskan penghapusan frame sebelumnya untuk mencegah penumpukan jejak visual.',
      },
      {
        kriteria: 'Pola Key-State Map',
        bobot: 7,
        deskripsi:
          'Menjelaskan kombinasi keydown/keyup yang dibaca dalam update loop untuk gerakan halus dan simultan.',
      },
    ],
  },
  {
    questionId: 'ESSAY-09',
    isOriginal: false,
    topic: 'Deteksi Tabrakan AABB & Manajemen Array Dinamis',
    prompt:
      'Uraikan cara kerja algoritma deteksi tabrakan Axis-Aligned Bounding Box (AABB) antara dua objek persegi panjang dan jelaskan mengapa perulangan mundur (i--) sangat dianjurkan ketika menghapus objek bertabrakan dari array menggunakan splice()!',
    maxScore: 20,
    kunciJawabanRingkas:
      'AABB menguji apakah dua kotak (x, y, width, height) saling beririsan pada kedua sumbu: A.x < B.x + B.width && A.x + A.width > B.x && A.y < B.y + B.height && A.y + A.height > B.y. Saat objek bertabrakan atau keluar layar dihapus dengan array.splice(i, 1), panjang array berkurang dan elemen setelah indeks i bergeser maju satu indeks. Perulangan mundur (dari length - 1 ke 0) memastikan elemen yang bergeser ke kanan tidak terlewati seperti yang terjadi pada perulangan maju (i++).',
    rubrik: [
      {
        kriteria: 'Logika & Rumus AABB',
        bobot: 8,
        deskripsi:
          'Menuliskan atau menjelaskan empat syarat tumpang tindih pada sumbu horizontal dan vertikal.',
      },
      {
        kriteria: 'Dampak splice() pada Indeks Array',
        bobot: 6,
        deskripsi:
          'Menjelaskan pergeseran indeks elemen di belakang elemen yang dihapus.',
      },
      {
        kriteria: 'Alasan Iterasi Mundur (i--)',
        bobot: 6,
        deskripsi:
          'Menjelaskan bahwa loop mundur mencegah terlewatnya pengecekan elemen serta menghindari kesalahan batas indeks.',
      },
    ],
  },
  {
    questionId: 'ESSAY-10',
    isOriginal: false,
    topic: 'Keamanan & Integritas Data pada Aplikasi Web',
    prompt:
      'Dalam sistem ujian daring (CBT), jelaskan fungsi kombinasi enkripsi AES-256-GCM dan hash integritas SHA-256 terhadap data hasil ujian sebelum dikirim ke server atau diunduh sebagai cadangan!',
    maxScore: 20,
    kunciJawabanRingkas:
      'Enkripsi AES-256-GCM menjaga kerahasiaan (confidentiality) paket nilai dan rincian jawaban agar tidak dapat dibaca oleh pihak yang tidak memiliki kunci (misalnya siswa yang membuka file cadangan JSON/CSV), sekaligus memiliki tag autentikasi GCM. Hash SHA-256 menghasilkan sidik jari unik satu arah atas isi data untuk memastikan integritas (integrity): apabila satu karakter saja dalam data dimodifikasi di tengah jalan atau pada file cadangan, nilai hash tidak akan cocok saat diverifikasi oleh portal guru.',
    rubrik: [
      {
        kriteria: 'Peran Kerahasiaan AES-256-GCM',
        bobot: 8,
        deskripsi:
          'Menjelaskan penyamaran data sensitif agar hanya dapat didekripsi menggunakan kunci/akses resmi guru.',
      },
      {
        kriteria: 'Peran Integritas SHA-256',
        bobot: 7,
        deskripsi:
          'Menjelaskan sifat hash satu arah untuk mendeteksi perubahan atau manipulasi data.',
      },
      {
        kriteria: 'Konteks Keamanan CBT',
        bobot: 5,
        deskripsi:
          'Mengaitkan dengan proteksi file cadangan offline dan transmisi ke server.',
      },
    ],
  },
];
