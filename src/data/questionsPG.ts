import { PGQuestionBankItem } from '../types/exam';

export const PG_QUESTION_BANK: PGQuestionBankItem[] = [
  // =========================================================================
  // 30 SOAL ASLI PILIHAN GANDA (PG-01 s.d. PG-30)
  // =========================================================================
  {
    questionId: 'PG-01',
    isOriginal: true,
    topic: 'Matriks 2D & Navigasi Grid',
    prompt:
      'Dalam pengembangan aplikasi interaktif berbasis grid dua dimensi menggunakan JavaScript, pengembang membutuhkan pemetaan setiap sel koordinat baris dan kolom secara terstruktur agar mudah diakses berdasarkan indeks sumbu vertikal maupun horizontal. Struktur data bawaan JavaScript yang paling tepat digunakan untuk merepresentasikan peta koordinat baris dan kolom tersebut adalah...',
    options: [
      { originalKey: 'A', text: 'Object literal tunggal' },
      { originalKey: 'B', text: 'Array dua dimensi (array bersarang)' },
      { originalKey: 'C', text: 'Set bilangan bulat' },
      { originalKey: 'D', text: 'String karakter panjang' },
      { originalKey: 'E', text: 'Linked list melingkar' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-02',
    isOriginal: true,
    topic: 'Matriks 2D & Validasi Penghalang',
    prompt:
      'Diberikan variabel matriks grid[r][c] yang menyimpan kode tipe elemen 0 sebagai ruang kosong dan 1 sebagai penghalang statis. Apabila di dalam fungsi perpindahan move(nextR, nextC) dituliskan baris validasi if (grid[nextR][nextC] === 1) return;, maka efek langsung dari eksekusi baris kode tersebut ketika indeks tujuan bernilai 1 adalah...',
    options: [
      { originalKey: 'A', text: 'Mengubah nilai elemen matriks pada indeks tujuan menjadi 0' },
      { originalKey: 'B', text: 'Menghentikan seluruh eksekusi skrip program secara paksa' },
      {
        originalKey: 'C',
        text: 'Membatalkan pembaruan koordinat posisi objek karena fungsi langsung keluar lebih awal',
      },
      { originalKey: 'D', text: 'Menambahkan satu baris baru pada bagian akhir array grid' },
      { originalKey: 'E', text: 'Membalik urutan indeks baris dan kolom pada seluruh matriks' },
    ],
    originalKey: 'C',
  },
  {
    questionId: 'PG-03',
    isOriginal: true,
    topic: 'Matriks 2D & Pergeseran Elemen',
    prompt:
      'Untuk memvalidasi pergeseran elemen bertipe 2 sebanyak satu langkah ke arah kanan pada struktur data array 2D map[row][col] agar elemen tersebut tidak menimpa penghalang maupun keluar dari jalur kosong, syarat kondisi if yang paling tepat dituliskan pada program adalah...',
    options: [
      { originalKey: 'A', text: 'map[row][col + 1] === 2 && map[row][col + 2] === 1' },
      { originalKey: 'B', text: 'map[row][col + 1] === 2 && map[row][col + 2] === 0' },
      { originalKey: 'C', text: 'map[row][col + 1] === 0 && map[row][col + 2] === 2' },
      { originalKey: 'D', text: 'map[row][col + 1] === 2 || map[row][col + 2] === 3' },
      { originalKey: 'E', text: 'map[row][col + 1] !== 1 && map[row][col + 2] === 4' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-04',
    isOriginal: true,
    topic: 'Matriks 2D & Mutasi Item',
    prompt:
      'Ketika sebuah entitas berpindah ke koordinat indeks tujuan (nextRow, nextCol) yang menyimpan nilai item koleksi 3 dan item tersebut berhasil diambil oleh entitas, operasi mutasi array JavaScript yang tepat untuk menghapus item dari sel matriks tersebut agar tidak terambil ulang adalah...',
    options: [
      { originalKey: 'A', text: 'map[nextRow][nextCol] = 1;' },
      { originalKey: 'B', text: 'map.pop();' },
      { originalKey: 'C', text: 'map[nextRow][nextCol] = 0;' },
      { originalKey: 'D', text: 'delete map[nextRow];' },
      { originalKey: 'E', text: 'map[nextRow].shift();' },
    ],
    originalKey: 'C',
  },
  {
    questionId: 'PG-05',
    isOriginal: true,
    topic: 'DOM Event Listener Keyboard',
    prompt:
      'Dalam pemrograman antarmuka web interaktif berbasis DOM, event listener utama yang didaftarkan pada objek document atau window untuk menangkap sinyal penekanan tombol arah keyboard secara langsung saat pengguna melakukan navigasi pada grid adalah...',
    options: [
      { originalKey: 'A', text: 'mousemove' },
      { originalKey: 'B', text: 'keydown' },
      { originalKey: 'C', text: 'dblclick' },
      { originalKey: 'D', text: 'scroll' },
      { originalKey: 'E', text: 'resize' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-06',
    isOriginal: true,
    topic: 'Konvensi Indeks Array 2D',
    prompt:
      'Pada konvensi pengaksesan array dua dimensi di JavaScript, indeks pertama (array[i]) selalu merepresentasikan baris (row / sumbu Y) sedangkan indeks kedua (array[i][j]) merepresentasikan kolom (col / sumbu X). Alasan teknis di balik struktur pengindeksan tersebut adalah...',
    options: [
      { originalKey: 'A', text: 'Karena JavaScript tidak mendukung angka indeks ganjil pada sumbu X' },
      {
        originalKey: 'B',
        text: 'Karena setiap elemen pada array luar menyimpan satu larik baris horizontal yang tersusun berurutan dari atas ke bawah',
      },
      { originalKey: 'C', text: 'Karena mesin eksekusi V8 hanya membaca alokasi memori dari kanan ke kiri' },
      { originalKey: 'D', text: 'Karena fungsi Math.random() mewajibkan format baris lebih dulu' },
      {
        originalKey: 'E',
        text: 'Karena spesifikasi ECMAScript melarang pengaksesan indeks kolom pada dimensi pertama',
      },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-07',
    isOriginal: true,
    topic: 'Perhitungan Koordinat Grid 2D',
    prompt:
      'Diketahui posisi indeks entitas saat ini berada pada koordinat (r, c) di dalam sebuah matriks grid 2D. Apabila program menerima sinyal input tombol arah ke atas (ArrowUp) untuk menggeser entitas satu sel menuju baris di atasnya, ekspresi perhitungan indeks tujuan (targetR, targetC) yang benar adalah...',
    options: [
      { originalKey: 'A', text: 'targetR = r + 1; targetC = c;' },
      { originalKey: 'B', text: 'targetR = r; targetC = c - 1;' },
      { originalKey: 'C', text: 'targetR = r - 1; targetC = c;' },
      { originalKey: 'D', text: 'targetR = r; targetC = c + 1;' },
      { originalKey: 'E', text: 'targetR = r - 1; targetC = c - 1;' },
    ],
    originalKey: 'C',
  },
  {
    questionId: 'PG-08',
    isOriginal: true,
    topic: 'Penanganan Tabrakan Entitas Berbahaya',
    prompt:
      'Pada struktur percabangan if (map[targetR][targetC] === 4) yang memeriksa keberadaan entitas berbahaya dengan kode nilai 4 di koordinat tujuan, blok instruksi yang paling umum dijalankan oleh program untuk menangani kondisi tabrakan tersebut adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'Melakukan dekrementasi variabel status seperti lives-- dan memanggil fungsi reset posisi atau terminasi sesi',
      },
      { originalKey: 'B', text: 'Menghapus seluruh elemen matriks yang bernilai 2 menggunakan metode Array.fill()' },
      { originalKey: 'C', text: 'Mengalikan variabel score dengan konstanta matematika Math.PI' },
      { originalKey: 'D', text: 'Mengubah tipe data struktur matriks dari Array menjadi String' },
      { originalKey: 'E', text: 'Menonaktifkan seluruh event listener DOM pada dokumen secara permanen' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-09',
    isOriginal: true,
    topic: 'Pemrograman Berbasis Waktu & Dunia Nyata',
    prompt:
      'Konsep arsitektur pemrograman berbasis waktu (temporal logic) dan manajemen status entitas secara dinamis sebagaimana diterapkan pada Modul 6 memiliki pola logika yang banyak diimplementasikan pada pengembangan perangkat lunak dunia nyata seperti...',
    options: [
      {
        originalKey: 'A',
        text: 'Algoritma kompresi aliran video beresolusi tinggi tanpa kehilangan data (lossless)',
      },
      {
        originalKey: 'B',
        text: 'Sistem antrean layanan pelanggan secara real-time dan dasbor transaksi kasir modern',
      },
      { originalKey: 'C', text: 'Protokol enkripsi kriptografi kunci publik asimetris RSA' },
      { originalKey: 'D', text: 'Mesin rendering grafis ray-tracing tiga dimensi secara luring' },
      { originalKey: 'E', text: 'Sistem kompresi arsip biner berbasis pohon Huffman' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-10',
    isOriginal: true,
    topic: 'Penjadwalan Timer Berkala',
    prompt:
      'Untuk mengurangi nilai variabel penghitung mundur (countdown timer) secara berkala setiap 1000 milidetik secara otomatis selama sesi berlangsung, fungsi bawaan Web API pada JavaScript yang paling tepat digunakan adalah...',
    options: [
      { originalKey: 'A', text: 'setTimeout()' },
      { originalKey: 'B', text: 'requestAnimationFrame()' },
      { originalKey: 'C', text: 'setInterval()' },
      { originalKey: 'D', text: 'clearTimeout()' },
      { originalKey: 'E', text: 'Date.now()' },
    ],
    originalKey: 'C',
  },
  {
    questionId: 'PG-11',
    isOriginal: true,
    topic: 'Perbedaan setInterval vs setTimeout',
    prompt:
      'Dalam pengelolaan penjadwalan asinkron (asynchronous scheduling) di JavaScript, terdapat perbedaan mendasar antara perilaku eksekusi fungsi setInterval(fn, ms) dan setTimeout(fn, ms) yaitu...',
    options: [
      {
        originalKey: 'A',
        text: 'setInterval() menjadwalkan eksekusi fungsi fn berulang kali setiap jeda ms, sedangkan setTimeout() mengeksekusi fungsi fn satu kali setelah jeda ms',
      },
      {
        originalKey: 'B',
        text: 'setInterval() bersifat sinkron dan memblokir thread utama, sedangkan setTimeout() berjalan pada worker thread terpisah',
      },
      {
        originalKey: 'C',
        text: 'setInterval() hanya dapat menerima fungsi anonim (arrow function), sedangkan setTimeout() hanya menerima deklarasi fungsi bernama',
      },
      {
        originalKey: 'D',
        text: 'setInterval() otomatis berhenti saat tab peramban tidak aktif, sedangkan setTimeout() berjalan terus tanpa henti',
      },
      {
        originalKey: 'E',
        text: 'Keduanya mengembalikan objek Promise yang wajib ditunggu menggunakan kata kunci await',
      },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-12',
    isOriginal: true,
    topic: 'Finite State Machine (FSM)',
    prompt:
      'Pada perancangan pola Finite State Machine (FSM) untuk mengatur alur siklus pemrosesan pesanan secara berjenjang dari awal hingga selesai, urutan transisi nilai properti state yang logis dan valid adalah...',
    options: [
      { originalKey: 'A', text: "'COOKING' -> 'WAITING_ORDER' -> 'EATING' -> 'READY_TO_SERVE'" },
      { originalKey: 'B', text: "'WAITING_ORDER' -> 'COOKING' -> 'READY_TO_SERVE' -> 'EATING'" },
      { originalKey: 'C', text: "'READY_TO_SERVE' -> 'WAITING_ORDER' -> 'COOKING' -> 'ANGRY'" },
      { originalKey: 'D', text: "'EATING' -> 'READY_TO_SERVE' -> 'COOKING' -> 'WAITING_ORDER'" },
      { originalKey: 'E', text: "'WAITING_ORDER' -> 'EATING' -> 'COOKING' -> 'READY_TO_SERVE'" },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-13',
    isOriginal: true,
    topic: 'Sintaks Parameter Milidetik Timer',
    prompt:
      'Apabila sebuah proses pemrosesan data di latar belakang memerlukan waktu tunda tepat selama 3 detik sebelum fungsi callback finishBaking dijalankan satu kali, penulisan sintaks pemanggilan timer JavaScript yang sesuai dengan standar parameter milidetik adalah...',
    options: [
      { originalKey: 'A', text: 'setTimeout(finishBaking, 3);' },
      { originalKey: 'B', text: 'setInterval(finishBaking, 3000);' },
      { originalKey: 'C', text: 'setTimeout(finishBaking, 3000);' },
      { originalKey: 'D', text: 'clearInterval(3000);' },
      { originalKey: 'E', text: 'setTimeout(3000, finishBaking);' },
    ],
    originalKey: 'C',
  },
  {
    questionId: 'PG-14',
    isOriginal: true,
    topic: 'Penanganan Timeout & Status FSM',
    prompt:
      'Ketika blok pengecekan kondisi timer if (customer.patience <= 0) bernilai benar sebelum proses pelayanan diselesaikan, urutan instruksi yang tepat untuk memperbarui status objek dan menghentikan siklus intervalnya adalah...',
    options: [
      { originalKey: 'A', text: 'Menggandakan nilai customer.patience menjadi 200' },
      {
        originalKey: 'B',
        text: "Mengubah customer.state = 'ANGRY', memanggil clearInterval(timerId), dan mengurangi nilai skor",
      },
      { originalKey: 'C', text: 'Memanggil fungsi setInterval() baru tanpa menghentikan ID interval yang lama' },
      { originalKey: 'D', text: 'Mengubah tipe data variabel timerId dari angka menjadi nilai boolean' },
      { originalKey: 'E', text: 'Menghapus seluruh elemen <canvas> dari struktur pohon DOM' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-15',
    isOriginal: true,
    topic: 'Manajemen Memori & clearInterval',
    prompt:
      'Setiap pemanggilan setInterval() akan mengembalikan nilai ID numerik unik yang wajib disimpan ke dalam sebuah variabel. Alasan utama pengembang harus memanggil clearInterval(id) ketika objek selesai diproses atau sesi berakhir adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'Agar garbage collector peramban dapat membebaskan alokasi memori dan mencegah fungsi callback terus dieksekusi di latar belakang',
      },
      {
        originalKey: 'B',
        text: 'Karena mesin JavaScript membatasi maksimal hanya 1 variabel integer aktif dalam satu file skrip',
      },
      { originalKey: 'C', text: 'Untuk menghapus seluruh pasangan kunci-nilai yang tersimpan di dalam localStorage' },
      { originalKey: 'D', text: 'Agar properti animasi transisi CSS pada halaman web dapat berjalan dengan lancar' },
      {
        originalKey: 'E',
        text: 'Karena fungsi setInterval() akan melempar pengecualian SyntaxError apabila tidak dihentikan secara eksplisit',
      },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-16',
    isOriginal: true,
    topic: 'Event-Driven & Percabangan State',
    prompt:
      'Dalam arsitektur pemrograman berbasis event-driven untuk komponen antarmuka interaktif, pendekatan kode yang tepat agar satu elemen DOM yang sama dapat memberikan respons berbeda sesuai kondisi siklus saat diklik adalah...',
    options: [
      {
        originalKey: 'A',
        text: "Mendaftarkan element.addEventListener('click', handler) lalu menggunakan percabangan if/else atau switch terhadap properti state objek",
      },
      {
        originalKey: 'B',
        text: 'Menggunakan perulangan tak terbatas while(true) untuk memantau koordinat kursor mouse setiap mikrodetik',
      },
      { originalKey: 'C', text: 'Membuat elemen <input> tersembunyi di setiap titik koordinat piksel pada layar' },
      { originalKey: 'D', text: 'Memanggil metode location.reload() setiap kali event click terpicu pada elemen tersebut' },
      {
        originalKey: 'E',
        text: 'Menonaktifkan mekanisme event bubbling menggunakan stopPropagation() di seluruh dokumen',
      },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-17',
    isOriginal: true,
    topic: 'Validasi Penguncian Arah 180 Derajat',
    prompt:
      'Pada logika pengendalian arah pergerakan objek berantai di dalam grid 2D (Modul 7), program perlu mengunci arah agar objek tidak dapat berbalik arah 180 derajat secara langsung dan menabrak segmen tubuhnya sendiri. Operator perbandingan JavaScript yang digunakan untuk validasi penguncian arah tersebut adalah...',
    options: [
      { originalKey: 'A', text: 'Operator penugasan tunggal (=)' },
      { originalKey: 'B', text: 'Operator ketidaksamaan ketat (!==)' },
      { originalKey: 'C', text: 'Operator sisa hasil bagi atau modulus (%)' },
      { originalKey: 'D', text: 'Operator bitwise AND (&)' },
      { originalKey: 'E', text: 'Operator penambahan satu nilai (++)' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-18',
    isOriginal: true,
    topic: 'Ekspresi Kondisional Pengubah Arah',
    prompt:
      "Diketahui variabel status arah saat ini menyimpan nilai string direction === 'RIGHT'. Ketika program menerima sinyal input untuk mengubah arah ke kiri ('LEFT'), ekspresi kondisional yang benar agar perubahan arah hanya terjadi jika tidak berlawanan langsung adalah...",
    options: [
      { originalKey: 'A', text: "if (direction === 'RIGHT') direction = 'LEFT';" },
      { originalKey: 'B', text: "if (direction !== 'RIGHT') direction = 'LEFT';" },
      { originalKey: 'C', text: "if (direction !== 'LEFT') direction = 'LEFT';" },
      { originalKey: 'D', text: "if (direction === 'UP' && direction === 'DOWN') direction = 'LEFT';" },
      { originalKey: 'E', text: "if (direction === 'LEFT') direction = 'RIGHT';" },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-19',
    isOriginal: true,
    topic: 'Struktur Data Segmen Koordinat',
    prompt:
      'Untuk merepresentasikan struktur tubuh entitas yang terdiri atas rangkaian segmen koordinat (x, y) secara berurutan mulai dari kepala di indeks awal hingga ekor di indeks akhir, struktur data JavaScript yang paling efisien adalah...',
    options: [
      { originalKey: 'A', text: 'Array of Objects, seperti [{x: 10, y: 10}, {x: 9, y: 10}]' },
      { originalKey: 'B', text: 'Variabel boolean tunggal isActive = true' },
      { originalKey: 'C', text: 'String teks panjang yang dipisahkan oleh karakter titik koma' },
      { originalKey: 'D', text: 'Satu variabel angka desimal (floating-point) tunggal' },
      { originalKey: 'E', text: 'Objek WeakMap tanpa pasangan kunci yang terdefinisi' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-20',
    isOriginal: true,
    topic: 'Algoritma Pergeseran Antrean Segmen',
    prompt:
      'Dalam algoritma pergeseran antrean koordinat pada array segments[] setiap kali entitas berpindah satu langkah maju tanpa mengalami penambahan panjang segmen, kombinasi dua metode manipulasi array yang dijalankan adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'segments.unshift(newHead) untuk menyisipkan koordinat baru di indeks 0 dan segments.pop() untuk menghapus elemen terakhir',
      },
      { originalKey: 'B', text: 'segments.splice(0, segments.length) untuk mengosongkan seluruh isi elemen array' },
      { originalKey: 'C', text: 'segments.push(newHead) untuk menambah elemen di akhir tanpa menghapus elemen mana pun' },
      { originalKey: 'D', text: 'segments.shift() untuk menghapus elemen indeks 0 dan segments.pop() untuk menghapus elemen terakhir' },
      { originalKey: 'E', text: 'segments.reverse() untuk membalik urutan seluruh elemen pada setiap siklus iterasi' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-21',
    isOriginal: true,
    topic: 'Pertumbuhan Panjang Segmen',
    prompt:
      'Ketika koordinat kepala baru newHead terdeteksi berada pada posisi yang identik dengan koordinat objek target (newHead.x === target.x && newHead.y === target.y), penyesuaian algoritma pergerakan yang menyebabkan panjang array segments[] bertambah satu elemen adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'Melewati pemanggilan segments.pop() pada siklus iterasi tersebut setelah segments.unshift(newHead) dijalankan',
      },
      { originalKey: 'B', text: 'Mengalikan nilai properti panjang array segments.length dengan konstanta angka 2' },
      { originalKey: 'C', text: 'Memanggil metode segments.fill(newHead) pada seluruh indeks elemen di dalam array' },
      { originalKey: 'D', text: 'Mengurutkan ulang seluruh isi koordinat array menggunakan metode segments.sort()' },
      { originalKey: 'E', text: 'Menghapus elemen pertama pada indeks ke-0 menggunakan metode segments.shift()' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-22',
    isOriginal: true,
    topic: 'Deteksi Terminasi Batas & Tabrakan',
    prompt:
      "Pada siklus pengecekan batas dan tabrakan di Modul 7, terdapat dua kondisi evaluasi logika yang menyebabkan variabel status aplikasi diubah menjadi 'TERMINATED' (sesi berakhir), yaitu ketika...",
    options: [
      { originalKey: 'A', text: 'Ekspresi newHead.x === target.x bernilai benar atau hasil operasi score % 10 === 0' },
      {
        originalKey: 'B',
        text: 'Koordinat newHead berada di luar rentang indeks grid (< 0 atau >= gridSize) atau cocok dengan salah satu koordinat elemen di dalam segments[]',
      },
      {
        originalKey: 'C',
        text: 'Pengguna menekan tombol keyboard yang sama sebanyak dua kali dalam rentang waktu satu detik',
      },
      {
        originalKey: 'D',
        text: 'Nilai koordinat sumbu horizontal target.x bernilai sama persis dengan sumbu vertikal target.y',
      },
      { originalKey: 'E', text: 'Panjang elemen di dalam array segments.length mencapai bilangan kelipatan genap' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-23',
    isOriginal: true,
    topic: 'Validasi Spawn Target Acak',
    prompt:
      'Sebelum menetapkan koordinat acak baru untuk objek target di dalam fungsi spawnTarget(), program wajib menjalankan perulangan validasi (while atau some()) terhadap seluruh elemen array segments[]. Tujuan utama dari validasi tersebut adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'Untuk memastikan koordinat acak yang dihasilkan tidak bertabrakan dengan indeks sel yang sedang ditempati oleh elemen segments[]',
      },
      {
        originalKey: 'B',
        text: 'Karena fungsi bawaan Math.random() tidak dapat menghasilkan bilangan bulat tanpa adanya array pembanding',
      },
      { originalKey: 'C', text: 'Agar koordinat objek target yang baru selalu ditempatkan pada posisi indeks sudut [0][0]' },
      { originalKey: 'D', text: 'Untuk mengonversi satuan nilai koordinat dari piksel menjadi satuan persentase relatif layar' },
      { originalKey: 'E', text: 'Agar mesin peramban tidak memblokir eksekusi fungsi pembulatan Math.floor()' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-24',
    isOriginal: true,
    topic: 'Clean Code & D-Pad Virtual',
    prompt:
      'Pada antarmuka aplikasi berbasis layar sentuh yang menyediakan tombol kendali arah virtual (D-Pad), penerapan prinsip clean code (kode bersih dan modular) untuk menghubungkan tombol virtual dengan kontrol keyboard dilakukan dengan cara...',
    options: [
      {
        originalKey: 'A',
        text: "Memanggil fungsi pengubah arah yang sama (misalnya setDirection('UP')) dari event click/touchstart tombol maupun dari event keydown",
      },
      { originalKey: 'B', text: 'Menduplikasi seluruh blok kode main loop ke dalam masing-masing fungsi event listener tombol virtual' },
      { originalKey: 'C', text: 'Memanggil metode localStorage.clear() setiap kali salah satu tombol kontrol virtual ditekan' },
      { originalKey: 'D', text: 'Menggunakan fungsi eval() untuk mengeksekusi string perintah arah secara dinamis di memori' },
      { originalKey: 'E', text: 'Mengubah dimensi resolusi lebar dan tinggi elemen <canvas> setiap kali tombol disentuh' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-25',
    isOriginal: true,
    topic: 'Animasi Canvas & requestAnimationFrame',
    prompt:
      'Dalam pengembangan simulasi fisika dan animasi waktu nyata pada elemen HTML5 <canvas> (Modul 8), fungsi requestAnimationFrame(callback) jauh lebih direkomendasikan dibandingkan setInterval(callback, 16) karena...',
    options: [
      {
        originalKey: 'A',
        text: 'Karena requestAnimationFrame() menyinkronkan eksekusi rendering dengan refresh rate layar perangkat dan otomatis menjeda eksekusi saat tab tidak aktif',
      },
      {
        originalKey: 'B',
        text: 'requestAnimationFrame() tidak membutuhkan pemanggilan ulang secara rekursif untuk merender frame berikutnya',
      },
      {
        originalKey: 'C',
        text: "Fungsi setInterval() tidak memiliki izin akses untuk membaca konteks rendering 2D (canvas.getContext('2d'))",
      },
      {
        originalKey: 'D',
        text: 'requestAnimationFrame() secara otomatis menghitung persamaan vektor pantulan tumbukan fisika',
      },
      {
        originalKey: 'E',
        text: 'requestAnimationFrame() menonaktifkan proses garbage collection selama siklus animasi berjalan',
      },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-26',
    isOriginal: true,
    topic: 'Kinematika Pantulan Tepi Canvas',
    prompt:
      'Pada simulasi kinematika gerak 2D dengan komponen vektor kecepatan horizontal vx dan vertikal vy, operasi pembaruan variabel yang tepat ketika lingkaran dengan jari-jari r menyentuh batas tepi kiri (x - r <= 0) atau batas tepi kanan (x + r >= canvas.width) adalah...',
    options: [
      { originalKey: 'A', text: 'vy = -vy;' },
      { originalKey: 'B', text: 'vx = -vx;' },
      { originalKey: 'C', text: 'vx = 0; vy = 0;' },
      { originalKey: 'D', text: 'y += 100;' },
      { originalKey: 'E', text: 'r *= 2;' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-27',
    isOriginal: true,
    topic: 'Vektor Pantulan Bidang Paddle',
    prompt:
      'Saat objek lingkaran bergerak turun ke bawah dan terdeteksi beririsan dengan permukaan atas bidang pantul horizontal (paddle), ekspresi matematis JavaScript yang menjamin arah vektor kecepatan vertikal vy selalu berbalik mengarah ke atas (bernilai negatif) adalah...',
    options: [
      { originalKey: 'A', text: 'vy = Math.abs(vy)' },
      { originalKey: 'B', text: 'vy = -Math.abs(vy)' },
      { originalKey: 'C', text: 'vx = -Math.abs(vx)' },
      { originalKey: 'D', text: 'vy = 0' },
      { originalKey: 'E', text: 'vx = vy' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-28',
    isOriginal: true,
    topic: 'Touch Events API (touchmove)',
    prompt:
      'Pada implementasi antarmuka berbasis layar sentuh menggunakan Touch Events API di Modul 8, nama event DOM yang dipicu secara berkesinambungan selama pengguna menggeser ujung jarinya di permukaan layar adalah...',
    options: [
      { originalKey: 'A', text: 'touchstart' },
      { originalKey: 'B', text: 'touchmove' },
      { originalKey: 'C', text: 'touchend' },
      { originalKey: 'D', text: 'touchcancel' },
      { originalKey: 'E', text: 'wheel' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-29',
    isOriginal: true,
    topic: 'Membaca Koordinat TouchEvent',
    prompt:
      'Ketika fungsi event handler menerima objek TouchEvent bernama e untuk melacak pergeseran horizontal dari titik sentuh jari pertama pengguna pada layar, properti objek event yang harus diakses adalah...',
    options: [
      { originalKey: 'A', text: 'e.keyCode' },
      { originalKey: 'B', text: 'e.touches[0].clientX' },
      { originalKey: 'C', text: 'e.target.innerHTML' },
      { originalKey: 'D', text: 'e.deltaY' },
      { originalKey: 'E', text: 'e.button' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-30',
    isOriginal: true,
    topic: 'Pencegahan Default Touch Scrolling',
    prompt:
      'Di dalam blok fungsi listener untuk event touchmove pada aplikasi web interaktif mobile, pengembang sering menyertakan pemanggilan metode e.preventDefault(). Fungsi teknis dari pemanggilan metode tersebut adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'Mencegah perilaku bawaan browser seperti menggulir halaman (scrolling) atau pull-to-refresh saat jari digeser di atas canvas',
      },
      {
        originalKey: 'B',
        text: 'Mematikan pembacaan sensor layar sentuh perangkat secara otomatis setelah satu kali geseran',
      },
      { originalKey: 'C', text: 'Menghapus seluruh data cache sementara dan cookie sesi yang tersimpan di dalam peramban' },
      { originalKey: 'D', text: 'Mengunci orientasi tampilan layar perangkat menjadi mode lanskap secara permanen' },
      {
        originalKey: 'E',
        text: 'Menghentikan jadwal pemanggilan siklus frame berikutnya pada requestAnimationFrame()',
      },
    ],
    originalKey: 'A',
  },

  // =========================================================================
  // 30 SOAL VARIASI PILIHAN GANDA BARU (PG-31 s.d. PG-60)
  // =========================================================================
  {
    questionId: 'PG-31',
    isOriginal: false,
    topic: 'Perhitungan Koordinat Grid 2D',
    prompt:
      'Sebuah entitas berada pada koordinat (r, c) dalam matriks grid[r][c]. Jika pengguna menekan tombol panah kanan (ArrowRight) untuk bergerak satu sel ke kolom berikutnya, perhitungan indeks tujuan (nextR, nextC) yang benar adalah...',
    options: [
      { originalKey: 'A', text: 'nextR = r - 1; nextC = c;' },
      { originalKey: 'B', text: 'nextR = r; nextC = c + 1;' },
      { originalKey: 'C', text: 'nextR = r + 1; nextC = c;' },
      { originalKey: 'D', text: 'nextR = r; nextC = c - 1;' },
      { originalKey: 'E', text: 'nextR = r + 1; nextC = c + 1;' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-32',
    isOriginal: false,
    topic: 'Validasi Batas Matriks 2D',
    prompt:
      'Sebelum membaca nilai elemen map[nextR][nextC] pada sebuah grid berukuran ROWS × COLS, pengembang wajib melakukan pengecekan batas (bounds checking) untuk menghindari galat TypeError: Cannot read properties of undefined. Kondisi pengecekan batas yang valid adalah...',
    options: [
      { originalKey: 'A', text: 'nextR < 0 || nextR >= ROWS || nextC < 0 || nextC >= COLS' },
      { originalKey: 'B', text: 'nextR > 0 && nextR <= ROWS && nextC > 0 && nextC <= COLS' },
      { originalKey: 'C', text: 'nextR === 0 && nextC === 0' },
      { originalKey: 'D', text: 'nextR <= ROWS || nextC <= COLS' },
      { originalKey: 'E', text: 'nextR !== nextC && ROWS === COLS' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-33',
    isOriginal: false,
    topic: 'Iterasi Matriks 2D Bersarang',
    prompt:
      'Untuk merender seluruh sel pada matriks grid berukuran 10 baris × 12 kolom ke layar, pola perulangan bersarang (nested loop) yang paling tepat digunakan pada JavaScript adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'Loop luar mengiterasi indeks baris r dari 0 hingga grid.length - 1, dan loop dalam mengiterasi kolom c dari 0 hingga grid[r].length - 1',
      },
      {
        originalKey: 'B',
        text: 'Satu loop tunggal while(grid.length > 0) yang menghapus baris dengan pop() setiap kali digambar',
      },
      {
        originalKey: 'C',
        text: 'Loop luar dan loop dalam sama-sama menggunakan indeks c dari 0 hingga 100',
      },
      {
        originalKey: 'D',
        text: 'Mengonversi seluruh matriks menjadi objek Date agar bisa diiterasi per detik',
      },
      {
        originalKey: 'E',
        text: 'Memanggil grid.reverse() sebanyak 12 kali sebelum menampilkan elemen pertama',
      },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-34',
    isOriginal: false,
    topic: 'Rotasi Matriks 2D 90 Derajat',
    prompt:
      'Diberikan matriks blok berukuran 3×3: matrix = [[0, 1, 0], [1, 1, 1], [0, 0, 0]]. Jika diterapkan rumus rotasi 90 derajat searah jarum jam result[r][c] = matrix[N - 1 - c][r] dengan N = 3, maka nilai elemen pada result[0][2] berasal dari...',
    options: [
      { originalKey: 'A', text: 'matrix[0][0]' },
      { originalKey: 'B', text: 'matrix[2][0]' },
      { originalKey: 'C', text: 'matrix[0][2]' },
      { originalKey: 'D', text: 'matrix[2][2]' },
      { originalKey: 'E', text: 'matrix[1][1]' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-35',
    isOriginal: false,
    topic: 'Deteksi Baris Penuh Matriks',
    prompt:
      'Pada papan permainan berbasis matriks 20 baris × 10 kolom di mana nilai 0 berarti sel kosong, ekspresi JavaScript paling ringkas dan deklaratif untuk memeriksa apakah sebuah baris row sudah terisi penuh adalah...',
    options: [
      { originalKey: 'A', text: 'row.some(cell => cell === 0)' },
      { originalKey: 'B', text: 'row.every(cell => cell !== 0)' },
      { originalKey: 'C', text: 'row.filter(cell => cell === 0)' },
      { originalKey: 'D', text: 'row.includes(0)' },
      { originalKey: 'E', text: 'row.indexOf(1) === -1' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-36',
    isOriginal: false,
    topic: 'Penghapusan & Penambahan Baris Papan',
    prompt:
      'Setelah sebuah baris penuh pada indeks r dihapus menggunakan board.splice(r, 1), instruksi lanjutan yang wajib dijalankan agar jumlah total baris papan tetap 20 adalah...',
    options: [
      { originalKey: 'A', text: 'board.push(new Array(10).fill(1));' },
      { originalKey: 'B', text: 'board.unshift(new Array(10).fill(0));' },
      { originalKey: 'C', text: 'board.pop();' },
      { originalKey: 'D', text: 'board.shift();' },
      { originalKey: 'E', text: 'board.fill(0);' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-37',
    isOriginal: false,
    topic: 'Deteksi Selesai / Penundaan Sekali Jalan',
    prompt:
      'Seorang pengembang ingin menampilkan notifikasi "Sesi Selesai" tepat 2,5 detik setelah tombol ditekan, hanya satu kali, tanpa pengulangan. Fungsi dan argumen waktu yang tepat adalah...',
    options: [
      { originalKey: 'A', text: 'setInterval(showNotice, 2500)' },
      { originalKey: 'B', text: 'setTimeout(showNotice, 2500)' },
      { originalKey: 'C', text: 'setTimeout(showNotice, 2.5)' },
      { originalKey: 'D', text: 'clearTimeout(showNotice, 2500)' },
      { originalKey: 'E', text: 'requestAnimationFrame(showNotice, 2500)' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-38',
    isOriginal: false,
    topic: 'Sinkronisasi Timer Berbasis Timestamp',
    prompt:
      'Mengapa pada aplikasi ujian daring (CBT) modern perhitungan sisa waktu countdown lebih akurat menggunakan selisih Date.now() terhadap endTimestamp dibandingkan hanya mengandalkan pengurangan timer-- di dalam setInterval(1000)?',
    options: [
      {
        originalKey: 'A',
        text: 'Karena browser sering memperlambat (throttling) timer setInterval saat tab tidak aktif, sedangkan selisih timestamp tetap akurat mengikuti jam sistem',
      },
      { originalKey: 'B', text: 'Karena Date.now() secara otomatis menambah kecepatan CPU perangkat' },
      { originalKey: 'C', text: 'Karena setInterval tidak dapat mengurangi angka desimal maupun bulat' },
      { originalKey: 'D', text: 'Karena Date.now() menyimpan data secara permanen di server Google' },
      { originalKey: 'E', text: 'Karena timer-- hanya berfungsi di browser Mozilla Firefox' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-39',
    isOriginal: false,
    topic: 'Finite State Machine Transisi Kondisi',
    prompt:
      'Dalam pola Finite State Machine (FSM) untuk proses pemesanan, apabila seorang pelanggan berada pada state "COOKING" dan bahan masakan habis sehingga pesanan dibatalkan, maka arsitektur FSM yang baik mengharuskan...',
    options: [
      {
        originalKey: 'A',
        text: 'Membuat transisi eksplisit ke state "CANCELLED" atau "FAILED" serta menghentikan timer aktif dengan clearInterval/clearTimeout',
      },
      { originalKey: 'B', text: 'Membiarkan state tetap "COOKING" selamanya hingga halaman ditutup' },
      { originalKey: 'C', text: 'Mengisi nilai state dengan angka acak dari Math.random()' },
      { originalKey: 'D', text: 'Menghapus seluruh objek pelanggan menggunakan operator delete pada window' },
      { originalKey: 'E', text: 'Memaksa transisi langsung ke "EATING" meskipun makanan tidak ada' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-40',
    isOriginal: false,
    topic: 'Event Keydown & Pencegahan Scroll',
    prompt:
      'Ketika pengguna menekan tombol ArrowDown atau Space pada aplikasi grid berbasis browser, layar browser terkadang ikut menggulir ke bawah. Metode pada objek event keydown untuk mencegah guliran bawaan tersebut adalah...',
    options: [
      { originalKey: 'A', text: 'e.stopImmediatePropagation()' },
      { originalKey: 'B', text: 'e.preventDefault()' },
      { originalKey: 'C', text: 'e.cancelBubble = false' },
      { originalKey: 'D', text: 'window.close()' },
      { originalKey: 'E', text: 'document.write()' },
    ],
    originalKey: 'B',
  },
  {
    questionId: 'PG-41',
    isOriginal: false,
    topic: 'Validasi Arah Berlawanan Vertikal',
    prompt:
      "Pada pergerakan entitas berantai dengan arah saat ini direction === 'UP', kondisi yang tepat agar entitas tidak langsung berbalik 180 derajat ke bawah ketika tombol ArrowDown ditekan adalah...",
    options: [
      { originalKey: 'A', text: "if (direction !== 'UP') direction = 'DOWN';" },
      { originalKey: 'B', text: "if (direction === 'UP') direction = 'DOWN';" },
      { originalKey: 'C', text: "if (direction !== 'DOWN') direction = 'UP';" },
      { originalKey: 'D', text: "if (direction === 'LEFT' || direction === 'UP') direction = 'DOWN';" },
      { originalKey: 'E', text: "if (direction === 'DOWN') direction = 'UP';" },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-42',
    isOriginal: false,
    topic: 'Pengecekan Tabrakan Tubuh Sendiri',
    prompt:
      'Untuk memeriksa apakah koordinat kepala baru newHead bertabrakan dengan salah satu segmen di dalam array segments[], metode array JavaScript yang paling ekspresif mengembalikan nilai boolean true/false adalah...',
    options: [
      { originalKey: 'A', text: 'segments.some(seg => seg.x === newHead.x && seg.y === newHead.y)' },
      { originalKey: 'B', text: 'segments.map(seg => seg.x + seg.y)' },
      { originalKey: 'C', text: 'segments.join(",")' },
      { originalKey: 'D', text: 'segments.reduce((a, b) => a + b, 0)' },
      { originalKey: 'E', text: 'segments.slice(0, 1)' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-43',
    isOriginal: false,
    topic: 'Kontrol Keyboard Halus (Key-State Map)',
    prompt:
      'Mengapa penggunaan objek peta status tombol seperti keys[e.code] = true pada keydown dan keys[e.code] = false pada keyup menghasilkan gerakan pesawat/karakter lebih halus dibanding menggerakkan posisi langsung di dalam event keydown?',
    options: [
      {
        originalKey: 'A',
        text: 'Karena menghindari jeda awal (auto-repeat delay) dari sistem operasi dan memungkinkan beberapa tombol ditekan bersamaan di dalam loop update()',
      },
      { originalKey: 'B', text: 'Karena event keyup tidak membutuhkan keyboard fisik' },
      { originalKey: 'C', text: 'Karena objek keys otomatis mengaktifkan akselerasi WebGL 3D' },
      { originalKey: 'D', text: 'Karena event keydown hanya bekerja satu kali setelah halaman dimuat' },
      { originalKey: 'E', text: 'Karena JavaScript melarang perubahan variabel numerik di dalam event listener' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-44',
    isOriginal: false,
    topic: 'Deteksi Tabrakan AABB',
    prompt:
      'Diberikan dua objek persegi panjang A dan B dengan properti (x, y, width, height). Kondisi logika Axis-Aligned Bounding Box (AABB) yang bernilai benar saat kedua objek saling bertumpang tindih adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'A.x < B.x + B.width && A.x + A.width > B.x && A.y < B.y + B.height && A.y + A.height > B.y',
      },
      {
        originalKey: 'B',
        text: 'A.x === B.x && A.y === B.y && A.width === B.width',
      },
      {
        originalKey: 'C',
        text: 'A.x > B.x + B.width || A.y > B.y + B.height',
      },
      {
        originalKey: 'D',
        text: 'A.width + B.width < A.x + B.x',
      },
      {
        originalKey: 'E',
        text: 'A.x + A.y === B.x + B.y',
      },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-45',
    isOriginal: false,
    topic: 'Penghapusan Aman Array Dinamis',
    prompt:
      'Saat melakukan iterasi pada array enemies[] untuk menghapus musuh yang terkena peluru menggunakan enemies.splice(i, 1), mengapa pengembang sangat disarankan menggunakan perulangan mundur (for (let i = enemies.length - 1; i >= 0; i--))?',
    options: [
      {
        originalKey: 'A',
        text: 'Karena penghapusan elemen menggeser indeks elemen di belakangnya ke kiri; iterasi mundur mencegah elemen berikutnya terlewat dari pengecekan',
      },
      { originalKey: 'B', text: 'Karena method splice() tidak dapat menerima angka indeks lebih dari 0 pada iterasi maju' },
      { originalKey: 'C', text: 'Karena iterasi mundur otomatis menambah skor dua kali lipat' },
      { originalKey: 'D', text: 'Karena array JavaScript tidak memiliki properti length pada iterasi maju' },
      { originalKey: 'E', text: 'Karena perulangan i++ selalu menyebabkan infinite loop pada array objek' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-46',
    isOriginal: false,
    topic: 'HTML5 Canvas Context & ClearRect',
    prompt:
      'Pada animasi berbasis HTML5 <canvas>, instruksi ctx.clearRect(0, 0, canvas.width, canvas.height) harus dipanggil pada awal setiap fungsi render() agar...',
    options: [
      {
        originalKey: 'A',
        text: 'Seluruh piksel gambar dari frame sebelumnya dibersihkan sehingga objek bergerak tidak meninggalkan jejak (smearing)',
      },
      { originalKey: 'B', text: 'Ukuran resolusi canvas otomatis menyesuaikan lebar jendela browser' },
      { originalKey: 'C', text: 'Seluruh variabel koordinat objek dikembalikan ke nilai nol' },
      { originalKey: 'D', text: 'Konteks rendering diubah dari 2D menjadi WebGL secara otomatis' },
      { originalKey: 'E', text: 'Event listener keyboard terpasang ulang di setiap frame' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-47',
    isOriginal: false,
    topic: 'Kinematika Pantulan Batas Atas Canvas',
    prompt:
      'Apabila sebuah bola berjari-jari r bergerak ke atas dan menyentuh batas atas elemen canvas (y - r <= 0), pembaruan kecepatan yang tepat agar bola memantul ke bawah adalah...',
    options: [
      { originalKey: 'A', text: 'vy = Math.abs(vy);' },
      { originalKey: 'B', text: 'vy = -Math.abs(vy);' },
      { originalKey: 'C', text: 'vx = -vx;' },
      { originalKey: 'D', text: 'vy = 0;' },
      { originalKey: 'E', text: 'x = 0;' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-48',
    isOriginal: false,
    topic: 'Konversi Koordinat Touch terhadap Canvas',
    prompt:
      'Ketika elemen <canvas> tidak menempel tepat di pojok kiri atas layar (memiliki margin atau posisi offset), cara menghitung koordinat X sentuhan relatif terhadap sisi kiri canvas menggunakan getBoundingClientRect() adalah...',
    options: [
      { originalKey: 'A', text: 'const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;' },
      { originalKey: 'B', text: 'const touchX = e.touches[0].clientX + canvas.width;' },
      { originalKey: 'C', text: 'const touchX = e.touches[0].clientY * canvas.height;' },
      { originalKey: 'D', text: 'const touchX = canvas.getBoundingClientRect().right / 2;' },
      { originalKey: 'E', text: 'const touchX = e.keyCode - canvas.offsetTop;' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-49',
    isOriginal: false,
    topic: 'Arsitektur Aplikasi Web vs Native',
    prompt:
      'Salah satu keunggulan utama aplikasi berbasis web (Web Application) dibandingkan aplikasi desktop/native tradisional dari aspek pemeliharaan (maintenance) dan distribusi pembaruan perangkat lunak adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'Pembaruan cukup dilakukan satu kali pada sisi server dan seluruh pengguna langsung mengakses versi terbaru melalui browser tanpa instalasi ulang',
      },
      { originalKey: 'B', text: 'Aplikasi web tidak pernah membutuhkan jaringan atau server sama sekali' },
      { originalKey: 'C', text: 'Aplikasi web hanya dapat berjalan pada satu sistem operasi tertentu saja' },
      { originalKey: 'D', text: 'Setiap pengguna harus mengompilasi ulang kode sumber C++ di komputer masing-masing' },
      { originalKey: 'E', text: 'Aplikasi web memiliki akses langsung tanpa izin ke BIOS perangkat keras pengguna' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-50',
    isOriginal: false,
    topic: 'Client-Side vs Server-Side',
    prompt:
      'Dalam arsitektur teknologi web modern, tugas yang paling tepat dijalankan di sisi Server-Side dibandingkan di sisi Client-Side (browser) adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'Validasi kredensial rahasia, pengelolaan basis data terpusat, dan otorisasi akses data',
      },
      { originalKey: 'B', text: 'Menggambar animasi frame-by-frame pada elemen HTML5 <canvas>' },
      { originalKey: 'C', text: 'Menangkap event pergerakan kursor mouse dan sentuhan jari pengguna' },
      { originalKey: 'D', text: 'Menerapkan aturan transisi hover CSS pada tombol antarmuka' },
      { originalKey: 'E', text: 'Menghitung layout piksel elemen DOM di layar monitor klien' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-51',
    isOriginal: false,
    topic: 'Siklus HTTP/HTTPS Request-Response',
    prompt:
      'Sebelum browser mengirimkan permintaan HTTP GET ke alamat IP sebuah situs web seperti https://smkmudita.sch.id, langkah awal yang dilakukan sistem jaringan klien untuk menerjemahkan nama domain menjadi alamat IP adalah...',
    options: [
      { originalKey: 'A', text: 'Melakukan resolusi nama domain melalui DNS (Domain Name System) lookup' },
      { originalKey: 'B', text: 'Menjalankan rendering CSSOM tree terlebih dahulu' },
      { originalKey: 'C', text: 'Mengompilasi skrip JavaScript menjadi berkas PDF' },
      { originalKey: 'D', text: 'Menghapus seluruh cookie pada web server Apache' },
      { originalKey: 'E', text: 'Mengirimkan kode status HTTP 404 ke penyedia layanan internet' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-52',
    isOriginal: false,
    topic: 'Kode Status Respons HTTP',
    prompt:
      'Ketika web server menerima permintaan halaman atau berkas yang berhasil ditemukan dan dikirimkan kembali ke browser klien tanpa galat, kode status respons HTTP standar yang dikembalikan adalah...',
    options: [
      { originalKey: 'A', text: '200 OK' },
      { originalKey: 'B', text: '301 Moved Permanently' },
      { originalKey: 'C', text: '403 Forbidden' },
      { originalKey: 'D', text: '404 Not Found' },
      { originalKey: 'E', text: '500 Internal Server Error' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-53',
    isOriginal: false,
    topic: 'Rendering Engine Browser (DOM & CSSOM)',
    prompt:
      'Di dalam rendering engine web browser seperti Blink atau Gecko, struktur pohon yang dibentuk dari hasil penguraian (parsing) tag-tag dokumen HTML sebelum digabungkan dengan CSSOM menjadi Render Tree adalah...',
    options: [
      { originalKey: 'A', text: 'DOM (Document Object Model)' },
      { originalKey: 'B', text: 'SQL (Structured Query Language)' },
      { originalKey: 'C', text: 'DNS (Domain Name System)' },
      { originalKey: 'D', text: 'SMTP (Simple Mail Transfer Protocol)' },
      { originalKey: 'E', text: 'BIOS (Basic Input Output System)' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-54',
    isOriginal: false,
    topic: 'Peran CSSOM dan Tahap Layout/Paint',
    prompt:
      'Setelah Render Tree terbentuk dari penggabungan DOM dan CSSOM, tahap selanjutnya pada rendering pipeline browser yang menghitung koordinat geometri serta ukuran pasti setiap elemen di viewport disebut...',
    options: [
      { originalKey: 'A', text: 'Layout (Reflow)' },
      { originalKey: 'B', text: 'DNS Resolution' },
      { originalKey: 'C', text: 'TLS Handshake' },
      { originalKey: 'D', text: 'SQL Indexing' },
      { originalKey: 'E', text: 'Minification' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-55',
    isOriginal: false,
    topic: 'Web Server Berkas Statis vs Dinamis',
    prompt:
      'Perbedaan cara web server (seperti Nginx atau Apache) menangani permintaan berkas statis (HTML, CSS, gambar) dibandingkan permintaan dinamis (halaman hasil kueri database) adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'Berkas statis dikirim langsung dari sistem berkas server ke klien, sedangkan permintaan dinamis diteruskan ke runtime/aplikasi backend untuk diproses sebelum menghasilkan respons',
      },
      {
        originalKey: 'B',
        text: 'Berkas statis harus selalu dikompilasi menjadi biner .exe terlebih dahulu sebelum dikirim ke klien',
      },
      {
        originalKey: 'C',
        text: 'Permintaan dinamis diproses seluruhnya tanpa melibatkan server aplikasi atau basis data',
      },
      {
        originalKey: 'D',
        text: 'Web server menolak mengirim berkas CSS dan gambar kepada klien yang memakai HTTPS',
      },
      {
        originalKey: 'E',
        text: 'Berkas dinamis hanya boleh berformat gambar PNG dan JPEG',
      },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-56',
    isOriginal: false,
    topic: 'Keamanan Transmisi Data (HTTPS)',
    prompt:
      'Penambahan lapisan protokol TLS/SSL pada HTTPS dibandingkan HTTP biasa bertujuan utama untuk...',
    options: [
      {
        originalKey: 'A',
        text: 'Mengenkripsi pertukaran data antara browser dan server serta memverifikasi keaslian identitas server',
      },
      { originalKey: 'B', text: 'Memperbesar ukuran gambar PNG agar tampak lebih tajam di layar monitor' },
      { originalKey: 'C', text: 'Menghilangkan kebutuhan akan alamat IP dan DNS di jaringan internet' },
      { originalKey: 'D', text: 'Mengizinkan skrip client-side mengakses hard disk pengguna secara bebas' },
      { originalKey: 'E', text: 'Menggantikan bahasa pemrograman JavaScript dengan bahasa rakitan' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-57',
    isOriginal: false,
    topic: 'Web Storage (localStorage) & Autosave',
    prompt:
      'Untuk menyimpan progres jawaban sementara secara lokal di browser peserta ujian agar tidak hilang ketika halaman di-refresh, metode Web Storage API yang tepat digunakan untuk menyimpan data string JSON adalah...',
    options: [
      { originalKey: 'A', text: "localStorage.setItem('exam_state', JSON.stringify(data));" },
      { originalKey: 'B', text: "localStorage.removeItem('exam_state');" },
      { originalKey: 'C', text: "console.log('exam_state', data);" },
      { originalKey: 'D', text: 'window.history.back();' },
      { originalKey: 'E', text: 'document.getElementById(JSON.stringify(data));' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-58',
    isOriginal: false,
    topic: 'Pengacakan Deterministik (Seeded PRNG)',
    prompt:
      'Dalam sistem Computer-Based Test (CBT), penggunaan Seeded Pseudo-Random Number Generator (PRNG) berbasis identitas siswa memberikan keuntungan penting berupa...',
    options: [
      {
        originalKey: 'A',
        text: 'Setiap siswa mendapat urutan soal dan opsi yang berbeda, namun susunan soal siswa yang sama tetap konsisten apabila halaman dimuat ulang (refresh)',
      },
      { originalKey: 'B', text: 'Semua siswa selalu mendapatkan urutan soal dan kunci jawaban yang persis sama' },
      { originalKey: 'C', text: 'Server tidak perlu memiliki bank soal lebih dari satu butir pertanyaan' },
      { originalKey: 'D', text: 'Waktu ujian otomatis bertambah menjadi tak terbatas ketika browser dimuat ulang' },
      { originalKey: 'E', text: 'Jawaban siswa otomatis terisi tanpa perlu dipilih oleh pengguna' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-59',
    isOriginal: false,
    topic: 'Integritas Data & Hashing SHA-256',
    prompt:
      'Dalam pengiriman data hasil ujian ke server, penyertaan nilai digest SHA-256 pada payload berfungsi untuk...',
    options: [
      {
        originalKey: 'A',
        text: 'Memverifikasi integritas data agar dapat dideteksi apabila isi paket telah berubah atau dimodifikasi secara tidak sah',
      },
      { originalKey: 'B', text: 'Mempercepat koneksi Wi-Fi lokal pada ruang laboratorium komputer' },
      { originalKey: 'C', text: 'Mengubah ukuran font teks soal menjadi dua kali lebih besar' },
      { originalKey: 'D', text: 'Menghapus riwayat penjelajahan browser pengguna secara otomatis' },
      { originalKey: 'E', text: 'Menggantikan fungsi tombol simpan di antarmuka pengguna' },
    ],
    originalKey: 'A',
  },
  {
    questionId: 'PG-60',
    isOriginal: false,
    topic: 'Pipeline Main Loop Aplikasi Interaktif 2D',
    prompt:
      'Urutan tahapan eksekusi yang tepat di dalam satu siklus frame main loop pada aplikasi simulasi atau permainan 2D berbasis HTML5 Canvas adalah...',
    options: [
      {
        originalKey: 'A',
        text: 'Membaca input pengguna -> Memperbarui posisi/status objek & cek tabrakan -> Membersihkan canvas & menggambar ulang frame -> Menjadwalkan frame berikutnya',
      },
      {
        originalKey: 'B',
        text: 'Menggambar ulang frame -> Membersihkan canvas -> Membaca input -> Menghapus seluruh array objek',
      },
      {
        originalKey: 'C',
        text: 'Memanggil clearRect() setelah menggambar objek -> Menghentikan requestAnimationFrame() -> Memuat ulang halaman',
      },
      {
        originalKey: 'D',
        text: 'Menghapus event listener -> Mengatur kecepatan menjadi nol -> Menggambar objek statis saja',
      },
      {
        originalKey: 'E',
        text: 'Mengirim data ke server -> Menunggu 10 detik -> Menghitung posisi tabrakan tanpa input',
      },
    ],
    originalKey: 'A',
  },
];
