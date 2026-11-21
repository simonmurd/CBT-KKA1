import { PGKQuestionBankItem } from '../types/exam';

export const PGK_QUESTION_BANK: PGKQuestionBankItem[] = [
  // =========================================================================
  // 15 SOAL ASLI PILIHAN GANDA KOMPLEKS (PGK-01 s.d. PGK-15)
  // =========================================================================
  {
    questionId: 'PGK-01',
    isOriginal: true,
    topic: 'Navigasi Matriks 2D',
    prompt:
      'Perhatikan potongan logika navigasi grid dua dimensi pada array map[r][c] di bawah ini:\n• Nilai 0 merepresentasikan sel kosong yang dapat dilalui.\n• Nilai 1 merepresentasikan dinding atau penghalang statis.\n• Nilai 3 merepresentasikan item yang dapat diambil oleh pemain.\n• Saat menekan ArrowUp, indeks baris tujuan dihitung dengan nextR = r - 1 dan nextC = c.\n\nBerdasarkan pernyataan di atas, manakah 5 pernyataan yang TEPAT mengenai pengelolaan matriks 2D?',
    options: [
      {
        originalKey: 'A',
        text: 'Ketika pemain melangkah ke sel bernilai 3, nilai sel tersebut sebaiknya diubah menjadi 0 agar item tidak dapat diambil berulang kali.',
      },
      {
        originalKey: 'B',
        text: 'Saat menekan ArrowUp dari posisi (r, c), pergerakan ke baris di atasnya dapat dihitung dengan nextR = r - 1 dan nextC = c.',
      },
      {
        originalKey: 'C',
        text: 'Validasi if (map[nextR][nextC] === 1) return; akan membatalkan perpindahan sebelum koordinat pemain diperbarui.',
      },
      {
        originalKey: 'D',
        text: 'Indeks pertama map[r] merepresentasikan baris (sumbu Y), sedangkan indeks kedua map[r][c] merepresentasikan kolom (sumbu X).',
      },
      {
        originalKey: 'E',
        text: 'Event listener keydown dapat digunakan untuk menangkap sinyal penekanan tombol arah navigasi pada grid.',
      },
      {
        originalKey: 'F',
        text: 'Indeks pertama map[r] selalu merepresentasikan kolom (sumbu X), sedangkan indeks kedua map[r][c] merepresentasikan baris (sumbu Y).',
      },
      {
        originalKey: 'G',
        text: 'Validasi if (map[nextR][nextC] === 1) return; akan mengubah nilai sel 1 menjadi 0 sebelum keluar dari fungsi.',
      },
      {
        originalKey: 'H',
        text: 'Event listener scroll adalah event utama untuk menangkap penekanan tombol arah ArrowUp secara langsung.',
      },
      {
        originalKey: 'I',
        text: 'Menghapus seluruh baris pada matriks saat mengambil item dapat dilakukan dengan map.pop().',
      },
      {
        originalKey: 'J',
        text: 'Fungsi return; di dalam move() akan menghentikan seluruh file skrip JavaScript di halaman web.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-02',
    isOriginal: true,
    topic: 'Pergeseran Elemen Matriks 2D',
    prompt:
      'Sebuah objek atau elemen bertipe 2 berada di posisi (row, col) pada matriks map[row][col]. Elemen tersebut hanya boleh digeser satu langkah ke kanan apabila sel di kanannya berisi elemen 2 dan sel berikutnya kosong (0). Manakah 5 pernyataan yang BENAR?',
    options: [
      {
        originalKey: 'A',
        text: 'Syarat kondisi yang tepat adalah map[row][col + 1] === 2 && map[row][col + 2] === 0.',
      },
      {
        originalKey: 'B',
        text: 'Pergeseran ke kanan pada grid mempertahankan nilai indeks row dan menambah nilai indeks col.',
      },
      {
        originalKey: 'C',
        text: 'Memeriksa kondisi sebelum mengubah nilai array membantu mencegah elemen menimpa sel yang tidak kosong.',
      },
      {
        originalKey: 'D',
        text: 'Operator logika && mewajibkan kedua syarat bernilai true agar pergeseran diizinkan.',
      },
      {
        originalKey: 'E',
        text: 'Jika sel di kanan (col + 1) bernilai 1 (penghalang), sel tersebut tidak dapat dilalui secara langsung.',
      },
      {
        originalKey: 'F',
        text: 'Syarat kondisi yang tepat adalah map[row][col + 1] === 0 && map[row][col + 2] === 2.',
      },
      {
        originalKey: 'G',
        text: 'Operator logika || pada map[row][col + 1] === 2 || map[row][col + 2] === 3 menjamin sel di depannya selalu kosong.',
      },
      {
        originalKey: 'H',
        text: 'Pergeseran ke kanan mengubah nilai indeks baris (row) menjadi row + 1 dan mempertahankan col.',
      },
      {
        originalKey: 'I',
        text: 'Pemanggilan delete map[row] akan menggeser semua item di baris tersebut ke arah kanan.',
      },
      {
        originalKey: 'J',
        text: 'Operasi map[row].shift() digunakan untuk menggeser satu sel ke kanan tanpa mengubah panjang baris.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-03',
    isOriginal: true,
    topic: 'Timer & Finite State Machine',
    prompt:
      'Dalam perancangan sistem manajemen waktu dan alur status entitas, pengembang menggunakan timer serta pola Finite State Machine (FSM). Manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'setTimeout(fn, 3000) menjadwalkan eksekusi fn satu kali setelah jeda sekitar 3 detik.',
      },
      {
        originalKey: 'B',
        text: 'setInterval(fn, 1000) mengeksekusi fn secara berulang setiap sekitar 1000 milidetik hingga dihentikan.',
      },
      {
        originalKey: 'C',
        text: 'Menyimpan ID numerik dari setInterval() memudahkan penghentian siklus menggunakan clearInterval(id).',
      },
      {
        originalKey: 'D',
        text: "Urutan transisi 'WAITING_ORDER' -> 'COOKING' -> 'READY_TO_SERVE' -> 'EATING' sesuai dengan alur siklus layanan.",
      },
      {
        originalKey: 'E',
        text: 'Menggunakan if/else atau switch pada state di dalam event click membantu menyesuaikan respons antarmuka dengan kondisi saat ini.',
      },
      {
        originalKey: 'F',
        text: 'setInterval(fn, 1000) mengeksekusi fn sekali saja setelah 1000 milidetik lalu berhenti selamanya.',
      },
      {
        originalKey: 'G',
        text: "Urutan status pesanan yang logis pada FSM adalah 'EATING' -> 'READY_TO_SERVE' -> 'COOKING' -> 'WAITING_ORDER'.",
      },
      {
        originalKey: 'H',
        text: 'setTimeout(3000, finishBaking) adalah urutan argumen standar yang benar pada Web API JavaScript.',
      },
      {
        originalKey: 'I',
        text: 'setInterval() bersifat sinkron dan selalu mengembalikan objek Promise yang wajib menggunakan await.',
      },
      {
        originalKey: 'J',
        text: 'Mengabaikan clearInterval(timerId) saat objek selesai diproses tidak pernah berdampak pada memori aplikasi.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-04',
    isOriginal: true,
    topic: 'Pengelolaan Timer & Status Objek',
    prompt:
      'Perhatikan kebutuhan pengelolaan timer dan status objek pada aplikasi interaktif berbasis waktu. Manakah 5 pernyataan yang BENAR?',
    options: [
      {
        originalKey: 'A',
        text: 'Memanggil clearInterval(timerId) saat sesi berakhir atau objek selesai diproses mencegah callback berjalan terus di latar belakang.',
      },
      {
        originalKey: 'B',
        text: "Saat customer.patience <= 0, mengubah state menjadi 'ANGRY' dan menghentikan interval merupakan langkah penanganan yang tepat.",
      },
      {
        originalKey: 'C',
        text: 'Finite State Machine (FSM) membantu mengatur perpindahan status objek secara terstruktur sesuai kondisi yang terjadi.',
      },
      {
        originalKey: 'D',
        text: 'Satu elemen DOM dapat memberikan respons berbeda saat diklik dengan mengevaluasi nilai properti state objek.',
      },
      {
        originalKey: 'E',
        text: 'Parameter waktu pada setTimeout() dan setInterval() dinyatakan dalam satuan milidetik.',
      },
      {
        originalKey: 'F',
        text: 'clearTimeout() digunakan untuk menghentikan interval yang dibuat oleh setInterval().',
      },
      {
        originalKey: 'G',
        text: 'Saat customer.patience <= 0, pengembang sebaiknya menggandakan patience menjadi 200 agar sesi tidak pernah berakhir.',
      },
      {
        originalKey: 'H',
        text: 'JavaScript membatasi maksimal hanya satu variabel integer aktif di seluruh skrip.',
      },
      {
        originalKey: 'I',
        text: 'setInterval() hanya menerima arrow function dan menolak deklarasi fungsi bernama.',
      },
      {
        originalKey: 'J',
        text: 'Menghapus elemen <canvas> dari DOM adalah cara standar untuk menghentikan satu setInterval tertentu.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-05',
    isOriginal: true,
    topic: 'Pergerakan Objek Berantai & Arah',
    prompt:
      'Pergerakan objek berantai di grid 2D diatur menggunakan array koordinat dan validasi arah. Manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'Struktur [{x: 10, y: 10}, {x: 9, y: 10}] merepresentasikan rangkaian segmen posisi secara berurutan.',
      },
      {
        originalKey: 'B',
        text: "Jika arah saat ini 'RIGHT', kondisi if (direction !== 'RIGHT') direction = 'LEFT'; mencegah pembalikan arah 180 derajat langsung.",
      },
      {
        originalKey: 'C',
        text: 'Saat bergerak maju tanpa tumbuh panjang, segments.unshift(newHead) diikuti segments.pop() memperbarui posisi segmen.',
      },
      {
        originalKey: 'D',
        text: 'Saat kepala menyentuh target (newHead.x === target.x && newHead.y === target.y), melewati segments.pop() setelah unshift() menambah panjang tubuh.',
      },
      {
        originalKey: 'E',
        text: 'Validasi dengan some() atau while() sebelum menempatkan target baru membantu mencegah target muncul di atas tubuh yang sudah ada.',
      },
      {
        originalKey: 'F',
        text: "Menggunakan operator = pada if (direction = 'LEFT') akan membandingkan arah tanpa mengubah nilai variabel.",
      },
      {
        originalKey: 'G',
        text: 'segments.reverse() adalah pasangan wajib dari segments.shift() untuk menggeser kepala ke depan.',
      },
      {
        originalKey: 'H',
        text: 'Fungsi Math.random() tidak dapat digunakan sama sekali tanpa array segmen tubuh.',
      },
      {
        originalKey: 'I',
        text: "Jika arah saat ini 'RIGHT', kondisi if (direction === 'RIGHT') direction = 'LEFT'; aman untuk mencegah tabrakan langsung.",
      },
      {
        originalKey: 'J',
        text: 'Tombol virtual layar sentuh harus menduplikasi seluruh main loop agar dapat berfungsi.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-06',
    isOriginal: true,
    topic: 'Siklus Hidup Entitas Berantai & D-Pad',
    prompt:
      'Terkait siklus hidup dan logika pergerakan entitas berantai pada grid 2D, manakah 5 pernyataan yang BENAR?',
    options: [
      {
        originalKey: 'A',
        text: "Keluar dari batas grid (< 0 atau >= gridSize) atau menabrak tubuh sendiri dapat mengubah status menjadi 'TERMINATED'.",
      },
      {
        originalKey: 'B',
        text: 'Menghubungkan tombol D-Pad layar sentuh dan keyboard ke fungsi pengubah arah yang sama mendukung prinsip clean code.',
      },
      {
        originalKey: 'C',
        text: 'Operator !== digunakan untuk membandingkan ketidaksamaan secara ketat dalam validasi arah.',
      },
      {
        originalKey: 'D',
        text: 'Menempatkan target tanpa mengecek posisi segmen berisiko membuat target muncul tepat di atas koordinat segmen yang aktif.',
      },
      {
        originalKey: 'E',
        text: "Memanggil fungsi bersama seperti setDirection('UP') dari kontrol sentuh maupun keyboard menghindari duplikasi logika arah.",
      },
      {
        originalKey: 'F',
        text: 'segments.splice(0, segments.length) digunakan untuk menggeser tubuh satu langkah maju sambil mempertahankan panjangnya.',
      },
      {
        originalKey: 'G',
        text: 'Memanggil segments.fill(newHead) akan menambah panjang array sebanyak satu elemen di bagian ekor.',
      },
      {
        originalKey: 'H',
        text: 'Mengalikan segments.length dengan 2 adalah cara standar menambah panjang segmen saat memakan target.',
      },
      {
        originalKey: 'I',
        text: 'Saat target berhasil diambil, memanggil segments.pop() tetap membuat panjang segmen bertambah satu.',
      },
      {
        originalKey: 'J',
        text: 'Menabrak batas luar grid tidak pernah memengaruhi status sesi permainan.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-07',
    isOriginal: true,
    topic: 'Simulasi Pantulan & Touch API',
    prompt:
      'Dalam pengembangan simulasi pantulan dan kontrol sentuh pada <canvas>, manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'requestAnimationFrame(callback) menyinkronkan rendering dengan refresh rate layar dan menjeda saat tab tidak aktif.',
      },
      {
        originalKey: 'B',
        text: 'Jika lingkaran menyentuh batas kiri (x - r <= 0) atau kanan (x + r >= canvas.width), membalik vx dengan vx = -vx; mengubah arah horizontal.',
      },
      {
        originalKey: 'C',
        text: 'Saat lingkaran turun mengenai permukaan atas paddle, vy = -Math.abs(vy) memastikan komponen kecepatan vertikal mengarah ke atas.',
      },
      {
        originalKey: 'D',
        text: 'Event touchmove dipicu secara berkesinambungan saat jari pengguna bergeser di permukaan layar sentuh.',
      },
      {
        originalKey: 'E',
        text: 'Memanggil e.preventDefault() pada touchmove membantu mencegah scrolling atau pull-to-refresh bawaan browser saat menggeser jari.',
      },
      {
        originalKey: 'F',
        text: 'requestAnimationFrame() secara otomatis menghitung gaya gravitasi dan pantulan tanpa rumus fisika apa pun.',
      },
      {
        originalKey: 'G',
        text: 'setInterval(callback, 16) selalu lebih disarankan daripada requestAnimationFrame() karena tidak pernah berjalan saat tab tidak aktif.',
      },
      {
        originalKey: 'H',
        text: 'touchstart adalah satu-satunya event yang dipicu terus-menerus sepanjang jari digeser di layar.',
      },
      {
        originalKey: 'I',
        text: 'requestAnimationFrame() tidak perlu dipanggil ulang di dalam callback untuk melanjutkan animasi frame berikutnya.',
      },
      {
        originalKey: 'J',
        text: 'e.button adalah properti standar TouchEvent untuk membaca koordinat X jari pertama.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-08',
    isOriginal: true,
    topic: 'Kontrol Sentuh & clearRect Canvas',
    prompt:
      'Perhatikan skenario kontrol sentuh dan deteksi batas pada animasi <canvas>. Manakah 5 pernyataan yang BENAR?',
    options: [
      {
        originalKey: 'A',
        text: 'Pada TouchEvent, e.touches[0].clientX digunakan untuk membaca posisi horizontal titik sentuh pertama.',
      },
      {
        originalKey: 'B',
        text: 'ctx.clearRect(0, 0, canvas.width, canvas.height) di awal frame membersihkan frame sebelumnya agar tidak meninggalkan jejak visual (smearing).',
      },
      {
        originalKey: 'C',
        text: 'Kondisi ball.y - ball.radius > canvas.height dapat dipakai untuk mendeteksi bola jatuh melewati batas bawah canvas.',
      },
      {
        originalKey: 'D',
        text: 'vy = -Math.abs(vy) menghasilkan nilai yang tidak pernah positif (<= 0).',
      },
      {
        originalKey: 'E',
        text: 'Jika ctx.clearRect(...) tidak dipanggil sebelum menggambar frame baru, jejak gambar sebelumnya dapat menumpuk pada canvas.',
      },
      {
        originalKey: 'F',
        text: 'Membalik arah gerak ke atas setelah menyentuh batas atas layar menggunakan vx = -vx sebagai rumus utama.',
      },
      {
        originalKey: 'G',
        text: 'e.preventDefault() pada touchmove berfungsi menonaktifkan sensor layar sentuh setelah satu sentuhan.',
      },
      {
        originalKey: 'H',
        text: 'Mengubah r *= 2 adalah respons standar saat bola menyentuh tepi kiri atau kanan canvas.',
      },
      {
        originalKey: 'I',
        text: 'e.keyCode adalah properti utama TouchEvent untuk melacak pergeseran jari di layar.',
      },
      {
        originalKey: 'J',
        text: 'Menghapus ctx.clearRect() sepenuhnya membuat animasi bebas jejak tanpa perlu mengatur ulang canvas.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-09',
    isOriginal: true,
    topic: 'Papan Permainan & Rotasi Matriks',
    prompt:
      'Papan permainan dan rotasi blok direpresentasikan sebagai matriks dua dimensi. Manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'Ukuran papan standar yang umum digunakan adalah 20 baris × 10 kolom.',
      },
      {
        originalKey: 'B',
        text: 'Rumus rotasi 90 derajat searah jarum jam pada matriks persegi berukuran N×N adalah result[r][c] = matrix[N - 1 - c][r].',
      },
      {
        originalKey: 'C',
        text: 'Metode row.every(cell => cell !== 0) memeriksa apakah seluruh sel pada baris row berisi nilai bukan nol.',
      },
      {
        originalKey: 'D',
        text: 'Setelah menghapus baris penuh dengan board.splice(r, 1), menambahkan board.unshift(new Array(10).fill(0)) menjaga jumlah baris tetap 20.',
      },
      {
        originalKey: 'E',
        text: 'isValidMove(matrix, offsetX, offsetY) memeriksa agar sel aktif tidak keluar batas papan dan tidak menumpuk pada sel terisi (!== 0).',
      },
      {
        originalKey: 'F',
        text: 'row.some(cell => cell === 0) bernilai true apabila seluruh sel pada baris tersebut sudah terisi penuh (!== 0).',
      },
      {
        originalKey: 'G',
        text: 'Metode board.splice(r, 1) secara otomatis menambahkan baris kosong baru di bagian paling atas papan.',
      },
      {
        originalKey: 'H',
        text: 'isValidMove() sebaiknya dilewati saat merotasi blok agar blok dapat menembus dinding papan.',
      },
      {
        originalKey: 'I',
        text: 'merge(board, piece) dipanggil tepat saat tombol pause ditekan oleh pengguna.',
      },
      {
        originalKey: 'J',
        text: 'matrix.flat() wajib digunakan sebelum melakukan rotasi 90 derajat searah jarum jam.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-10',
    isOriginal: true,
    topic: 'Rotasi Matriks 3×3 & Merge Papan',
    prompt:
      'Diberikan matriks persegi berukuran 3×3 dengan isi [[0, 1, 0], [1, 1, 1], [0, 0, 0]] serta aturan papan 20 baris × 10 kolom. Manakah 5 pernyataan yang BENAR?',
    options: [
      {
        originalKey: 'A',
        text: 'merge(board, piece) menyalin sel aktif blok ke papan utama ketika gerak turun (offsetY + 1) tidak valid (false).',
      },
      {
        originalKey: 'B',
        text: 'Jika isValidMove() langsung mengembalikan false saat blok baru muncul di atas, hal tersebut menandakan papan sudah penuh hingga bagian atas.',
      },
      {
        originalKey: 'C',
        text: 'Dengan rumus result[r][c] = matrix[N - 1 - c][r] dan N=3, indeks result[0][1] mengambil nilai dari matrix[1][0].',
      },
      {
        originalKey: 'D',
        text: 'row.every(cell => cell !== 0) akan mengembalikan false jika terdapat minimal satu sel bernilai 0 pada baris tersebut.',
      },
      {
        originalKey: 'E',
        text: 'Menghapus baris penuh dengan board.splice(r, 1) tanpa menambah baris baru akan mengurangi jumlah baris papan menjadi 19.',
      },
      {
        originalKey: 'F',
        text: 'Dengan rumus result[r][c] = matrix[N - 1 - c][r] dan N=3, indeks result[0][1] mengambil nilai dari matrix[2][0].',
      },
      {
        originalKey: 'G',
        text: 'Ukuran papan standar adalah 10 baris × 20 kolom dengan unshift menambahkan baris di bagian bawah.',
      },
      {
        originalKey: 'H',
        text: 'Setiap baris yang terhapus otomatis menambah skor sebesar 1000 poin tanpa pengecekan baris.',
      },
      {
        originalKey: 'I',
        text: 'Menghapus satu baris penuh menggunakan board.splice(r, 1) sudah otomatis menjaga jumlah baris tetap 20 tanpa unshift().',
      },
      {
        originalKey: 'J',
        text: 'Pengecekan tabrakan tidak diperlukan ketika blok digeser ke samping atau ke bawah.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-11',
    isOriginal: true,
    topic: 'Array Dinamis, Key-State & AABB',
    prompt:
      'Dalam pengelolaan banyak objek dinamis seperti bullets[] dan enemies[], manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'Array dinamis digunakan karena banyak instans objek muncul dan hilang secara dinamis selama permainan berjalan.',
      },
      {
        originalKey: 'B',
        text: 'Kombinasi event keydown dan keyup dengan objek keys = {} membantu menghasilkan pergerakan yang halus tanpa terhambat auto-repeat delay OS.',
      },
      {
        originalKey: 'C',
        text: 'Pada keydown, keys[e.code] = true, dan pada keyup, keys[e.code] = false, lalu update() membaca status tersebut di setiap frame.',
      },
      {
        originalKey: 'D',
        text: 'Deteksi tabrakan AABB antara persegi panjang A dan B (x, y, width, height) menggunakan kondisi A.x < B.x + B.width && A.x + A.width > B.x && A.y < B.y + B.height && A.y + A.height > B.y.',
      },
      {
        originalKey: 'E',
        text: 'Menghapus objek yang keluar layar atau bertabrakan menggunakan splice(index, 1) membantu mencegah kebocoran memori (memory leak).',
      },
      {
        originalKey: 'F',
        text: 'JavaScript melarang penyimpanan properti x dan y di dalam objek tunggal.',
      },
      {
        originalKey: 'G',
        text: 'ctx.fillRect() hanya menerima parameter bertipe Array.',
      },
      {
        originalKey: 'H',
        text: 'Membiarkan peluru di luar layar tetap berada di bullets[] adalah praktik terbaik agar tidak perlu menghitung batas layar.',
      },
      {
        originalKey: 'I',
        text: 'Mengubah bullet.x menjadi NaN tanpa menghapusnya dari array adalah cara yang direkomendasikan untuk garbage collection manual.',
      },
      {
        originalKey: 'J',
        text: 'keypress dan click adalah pasangan event standar untuk memetakan keys[e.code] = true/false secara berkelanjutan.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-12',
    isOriginal: true,
    topic: 'Pergerakan & Penghapusan Array Dinamis',
    prompt:
      'Perhatikan mekanisme pergerakan, tabrakan, dan penghapusan elemen pada array bullets[] dan enemies[]. Manakah 5 pernyataan yang BENAR?',
    options: [
      {
        originalKey: 'A',
        text: 'Jika peluru yang keluar kanan layar (bullet.x > canvas.width) tidak dihapus dari bullets[], array dapat terus membengkak dan menurunkan performa.',
      },
      {
        originalKey: 'B',
        text: 'Loop mundur for (let i = enemies.length - 1; i >= 0; i--) aman saat menghapus elemen dengan splice(i, 1) karena tidak melewatkan elemen berikutnya.',
      },
      {
        originalKey: 'C',
        text: 'Peluru yang meluncur dari kiri ke kanan umumnya memperbarui posisi horizontalnya dengan bullet.x += bullet.speed;.',
      },
      {
        originalKey: 'D',
        text: 'Jika musuh bergerak dari kanan ke kiri layar, ekspresi enemy.x -= enemy.speed; menggeser posisi x ke arah kiri.',
      },
      {
        originalKey: 'E',
        text: 'Loop mundur i-- mencegah terlewatnya elemen bergeser ketika elemen pada indeks i dihapus menggunakan splice(i, 1).',
      },
      {
        originalKey: 'F',
        text: 'Loop maju i++ saat memanggil splice(i, 1) selalu aman dan tidak pernah melewatkan elemen setelah elemen yang dihapus.',
      },
      {
        originalKey: 'G',
        text: 'Deteksi tabrakan AABB menyatakan dua kotak tidak beririsan jika A.x === B.x && A.y === B.y.',
      },
      {
        originalKey: 'H',
        text: 'Mengatur width = 0 dan height = 0 sambil tetap menyimpan objek di array menghilangkan seluruh beban iterasi pada update().',
      },
      {
        originalKey: 'I',
        text: 'Loop mundur pada array dinamis hanya dapat berjalan jika panjang array bersifat tetap.',
      },
      {
        originalKey: 'J',
        text: 'Menggerakkan peluru ke kanan menggunakan bullet.x -= bullet.speed;.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-13',
    isOriginal: true,
    topic: 'Arsitektur Aplikasi Interaktif 2D',
    prompt:
      'Dalam arsitektur aplikasi interaktif 2D berbasis HTML5 Canvas, manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'Urutan pipeline umum dalam main loop adalah membaca input, memperbarui status/koordinat, mendeteksi tabrakan, lalu membersihkan dan merender ulang canvas.',
      },
      {
        originalKey: 'B',
        text: 'Struktur data matriks 2D paling sesuai untuk peta grid baris-kolom, sedangkan array of objects sesuai untuk daftar entitas dinamis.',
      },
      {
        originalKey: 'C',
        text: 'Memisahkan logika pembaruan status (update) dan penggambaran (render) membantu menjaga kode tetap terstruktur.',
      },
      {
        originalKey: 'D',
        text: 'requestAnimationFrame() lebih cocok untuk animasi visual layar dibandingkan setInterval() dengan jeda tetap.',
      },
      {
        originalKey: 'E',
        text: 'Validasi batas dan tabrakan membantu mencegah akses indeks di luar batas atau perilaku tak terduga saat objek bergerak.',
      },
      {
        originalKey: 'F',
        text: 'Memanggil clearRect() setelah menggambar objek baru pada frame yang sama akan menampilkan objek tersebut secara lebih jelas.',
      },
      {
        originalKey: 'G',
        text: 'cancelAnimationFrame() wajib dipanggil di setiap awal frame agar main loop dapat berjalan terus-menerus.',
      },
      {
        originalKey: 'H',
        text: 'Mengosongkan seluruh array entitas di setiap awal frame adalah bagian standar dari pipeline main loop.',
      },
      {
        originalKey: 'I',
        text: 'Semua struktur data di JavaScript memiliki performa dan perilaku yang identik untuk setiap kasus penggunaan.',
      },
      {
        originalKey: 'J',
        text: 'Main loop tidak memerlukan pembaruan koordinat sama sekali jika objek bergerak berdasarkan input pengguna.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-14',
    isOriginal: true,
    topic: 'Validasi Kondisi & Manipulasi Data',
    prompt:
      'Bandingkan teknik validasi kondisi dan manipulasi data pada dua pendekatan berikut:\n• Matriks 2D: memeriksa sel sebelum melangkah, merotasi, atau menggabungkan ke papan.\n• Array koordinat/entitas: menambah, menggeser, atau menghapus elemen secara aman.\n\nManakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'Mengecek kondisi tujuan sebelum mengubah posisi membantu mencegah objek menabrak penghalang atau keluar area valid.',
      },
      {
        originalKey: 'B',
        text: 'Menggunakan unshift() dan pop() pada array segmen memungkinkan pergeseran antrean koordinat saat bergerak maju.',
      },
      {
        originalKey: 'C',
        text: 'Menghapus baris penuh pada matriks 2D menggunakan splice() perlu diimbangi penambahan baris baru agar ukuran grid tetap konsisten.',
      },
      {
        originalKey: 'D',
        text: 'Menghapus item dari array saat iterasi menggunakan splice() perlu memperhatikan arah iterasi agar tidak melewatkan elemen.',
      },
      {
        originalKey: 'E',
        text: 'Operator === membandingkan nilai dan tipe data secara ketat dalam pengecekan kode sel matriks.',
      },
      {
        originalKey: 'F',
        text: 'Memanggil localStorage.clear() adalah langkah yang tepat setiap kali objek berpindah sel pada grid.',
      },
      {
        originalKey: 'G',
        text: 'Mengubah seluruh isi matriks menjadi string kosong adalah cara standar menghapus satu item yang diambil pemain.',
      },
      {
        originalKey: 'H',
        text: 'Memanggil setInterval() baru tanpa menghentikan interval lama pada setiap tick adalah praktik aman untuk timer.',
      },
      {
        originalKey: 'I',
        text: 'Mengabaikan batas indeks array tidak pernah menimbulkan kesalahan atau perilaku yang tidak diinginkan.',
      },
      {
        originalKey: 'J',
        text: 'every() mengembalikan true jika minimal satu elemen saja memenuhi kondisi.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-15',
    isOriginal: true,
    topic: 'Debugging Aplikasi Interaktif 2D',
    prompt:
      'Seorang siswa sedang mengembangkan aplikasi interaktif 2D dengan JavaScript dan mengalami masalah: objek bergerak terlalu cepat/tidak mulus saat tombol ditahan, jejak gambar lama masih terlihat di canvas, dan jumlah objek di memori terus bertambah. Manakah 5 pernyataan yang TEPAT untuk mengatasi masalah tersebut?',
    options: [
      {
        originalKey: 'A',
        text: 'Menggunakan pola key-state map (keys[e.code]) dengan keydown dan keyup serta menggerakkan objek di dalam update loop membantu pergerakan lebih mulus.',
      },
      {
        originalKey: 'B',
        text: 'Memanggil ctx.clearRect(0, 0, canvas.width, canvas.height) sebelum menggambar ulang frame membantu menghilangkan jejak visual frame sebelumnya.',
      },
      {
        originalKey: 'C',
        text: 'Menghapus objek yang keluar dari batas layar atau bertabrakan dari array menggunakan splice() membantu mencegah penumpukan objek tak terpakai.',
      },
      {
        originalKey: 'D',
        text: 'Menghentikan timer yang sudah tidak diperlukan dengan clearInterval() membantu mencegah eksekusi callback berulang yang tidak lagi dibutuhkan.',
      },
      {
        originalKey: 'E',
        text: 'Menggunakan requestAnimationFrame() membantu menyelaraskan pembaruan visual dengan siklus refresh layar.',
      },
      {
        originalKey: 'F',
        text: 'Menambahkan while(true) di dalam event listener adalah cara terbaik untuk mempercepat gerakan objek.',
      },
      {
        originalKey: 'G',
        text: 'Membiarkan objek di luar batas canvas tetap ada di array akan mempercepat proses rendering.',
      },
      {
        originalKey: 'H',
        text: 'Menghapus ctx.clearRect() sepenuhnya akan membuat animasi berjalan lebih ringan dan bebas jejak.',
      },
      {
        originalKey: 'I',
        text: 'Mengganti semua array dengan satu variabel angka tunggal dapat menyimpan banyak entitas aktif sekaligus.',
      },
      {
        originalKey: 'J',
        text: 'Mengabaikan keyup selalu membuat gerakan objek lebih halus daripada melacak status tekan dan lepas tombol.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },

  // =========================================================================
  // 15 SOAL VARIASI PILIHAN GANDA KOMPLEKS BARU (PGK-16 s.d. PGK-30)
  // =========================================================================
  {
    questionId: 'PGK-16',
    isOriginal: false,
    topic: 'Arah Pergerakan & Bounds Checking Grid',
    prompt:
      'Diketahui entitas berada di sel (r, c) pada matriks grid berukuran ROWS × COLS. Manakah 5 pernyataan yang TEPAT terkait pemetaan tombol arah dan validasi batas matriks?',
    options: [
      { originalKey: 'A', text: 'Menekan ArrowDown mengubah indeks tujuan menjadi nextR = r + 1 dan nextC = c.' },
      { originalKey: 'B', text: 'Menekan ArrowLeft mengubah indeks tujuan menjadi nextR = r dan nextC = c - 1.' },
      { originalKey: 'C', text: 'Menekan ArrowRight mengubah indeks tujuan menjadi nextR = r dan nextC = c + 1.' },
      {
        originalKey: 'D',
        text: 'Pengecekan nextR < 0 || nextR >= ROWS || nextC < 0 || nextC >= COLS wajib dilakukan sebelum mengakses grid[nextR][nextC].',
      },
      {
        originalKey: 'E',
        text: 'Pemanggilan e.preventDefault() pada tombol panah mencegah halaman browser ikut bergulir saat navigasi grid.',
      },
      { originalKey: 'F', text: 'Menekan ArrowDown mengubah indeks tujuan menjadi nextR = r - 1 dan nextC = c.' },
      { originalKey: 'G', text: 'Indeks kolom valid pada matriks berukuran COLS adalah dari 1 sampai COLS.' },
      { originalKey: 'H', text: 'Mengakses grid[-1][0] di JavaScript selalu mengembalikan nilai 0 secara otomatis.' },
      { originalKey: 'I', text: 'Menekan ArrowLeft menambah nilai c sebesar +1 karena koordinat X tumbuh ke kiri.' },
      { originalKey: 'J', text: 'Event resize digunakan untuk mendeteksi tombol ArrowUp dan ArrowDown.' },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-17',
    isOriginal: false,
    topic: 'Arsitektur Web vs Aplikasi Desktop',
    prompt:
      'Dalam membandingkan Aplikasi Berbasis Web (Web Application) dengan Aplikasi Desktop/Native, manakah 5 pernyataan yang BENAR?',
    options: [
      {
        originalKey: 'A',
        text: 'Aplikasi web dapat diakses lintas sistem operasi (Windows, macOS, Linux, Android) selama perangkat memiliki browser modern.',
      },
      {
        originalKey: 'B',
        text: 'Pemeliharaan dan pembaruan aplikasi web terpusat di sisi server sehingga klien langsung menerima versi terbaru.',
      },
      {
        originalKey: 'C',
        text: 'Aplikasi desktop/native umumnya perlu dikompilasi dan diinstal khusus sesuai arsitektur sistem operasi target.',
      },
      {
        originalKey: 'D',
        text: 'Aplikasi native memiliki akses lebih dalam dan langsung ke perangkat keras lokal dibandingkan aplikasi web yang berjalan dalam sandbox browser.',
      },
      {
        originalKey: 'E',
        text: 'Dari segi distribusi, pengguna aplikasi web tidak perlu mengunduh file installer setiap kali terjadi perbaikan bug minor.',
      },
      {
        originalKey: 'F',
        text: 'Aplikasi web selalu dapat berjalan tanpa browser dan langsung mengeksekusi kode mesin BIOS.',
      },
      {
        originalKey: 'G',
        text: 'Setiap pembaruan aplikasi web mewajibkan teknisi mendatangi komputer pengguna satu per satu untuk instalasi manual.',
      },
      {
        originalKey: 'H',
        text: 'Aplikasi desktop native hanya dapat dijalankan apabila terhubung ke internet berkecepatan tinggi setiap detik.',
      },
      {
        originalKey: 'I',
        text: 'HTML, CSS, dan JavaScript tidak pernah dapat dijalankan pada web browser di perangkat seluler.',
      },
      {
        originalKey: 'J',
        text: 'Aplikasi web tidak mendukung interaksi pengguna seperti klik tombol, formulir, maupun grafik 2D.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-18',
    isOriginal: false,
    topic: 'Client-Side & Server-Side Web',
    prompt:
      'Terkait pembagian peran antara Client-Side (Sisi Klien) dan Server-Side (Sisi Server) dalam arsitektur aplikasi web, manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'Client-side berjalan di dalam web browser perangkat pengguna menggunakan HTML, CSS, dan JavaScript.',
      },
      {
        originalKey: 'B',
        text: 'Server-side berjalan di mesin server jarak jauh untuk memproses logika bisnis, autentikasi, dan interaksi basis data.',
      },
      {
        originalKey: 'C',
        text: 'Validasi masukan di sisi klien meningkatkan pengalaman pengguna (respons cepat), namun validasi keamanan akhir tetap wajib dilakukan di sisi server.',
      },
      {
        originalKey: 'D',
        text: 'Kredensial rahasia seperti API key privat dan kata sandi database tidak boleh disimpan di kode client-side karena dapat diinspeksi oleh pengguna.',
      },
      {
        originalKey: 'E',
        text: 'Komunikasi antara client-side dan server-side umumnya dilakukan menggunakan protokol HTTP/HTTPS dengan format pertukaran data seperti JSON.',
      },
      {
        originalKey: 'F',
        text: 'Kode JavaScript client-side tersembunyi sepenuhnya dan mustahil dilihat melalui Developer Tools browser.',
      },
      {
        originalKey: 'G',
        text: 'Server-side bertugas langsung menggambar setiap piksel tombol CSS di kartu grafis monitor pengguna.',
      },
      {
        originalKey: 'H',
        text: 'Basis data utama aplikasi multi-pengguna sebaiknya diletakkan seluruhnya di variabel sementara client-side.',
      },
      {
        originalKey: 'I',
        text: 'Browser pengguna mengeksekusi kode PHP atau Python server secara langsung tanpa melalui web server.',
      },
      {
        originalKey: 'J',
        text: 'Client-side dan server-side tidak dapat berkomunikasi jika menggunakan format teks JSON.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-19',
    isOriginal: false,
    topic: 'Siklus Request & Response HTTP/HTTPS',
    prompt:
      'Ketika seorang pengguna mengetikkan URL website HTTPS di browser hingga halaman tampil sempurna, manakah 5 pernyataan yang BENAR mengenai siklus Request-Response tersebut?',
    options: [
      {
        originalKey: 'A',
        text: 'Browser melakukan DNS lookup untuk menerjemahkan nama domain menjadi alamat IP server tujuan.',
      },
      {
        originalKey: 'B',
        text: 'Klien dan server membangun koneksi jaringan (TCP) diikuti proses TLS/SSL handshake pada protokol HTTPS untuk enkripsi saluran.',
      },
      {
        originalKey: 'C',
        text: 'Browser mengirimkan HTTP Request yang memuat metode (seperti GET atau POST), path URL, dan header.',
      },
      {
        originalKey: 'D',
        text: 'Server mengembalikan HTTP Response berisi status code (misalnya 200 OK), response headers, dan body dokumen (HTML/JSON).',
      },
      {
        originalKey: 'E',
        text: 'Saat browser mengurai HTML dan menemukan tag eksternal (<link> CSS, <script> JS, <img>), browser mengirim request tambahan untuk mengambil aset tersebut.',
      },
      {
        originalKey: 'F',
        text: 'Kode status HTTP 404 menandakan halaman berhasil ditemukan dan siap dirender sempurna.',
      },
      {
        originalKey: 'G',
        text: 'DNS berfungsi mengenkripsi seluruh kata sandi pengguna sebelum disimpan di HTML.',
      },
      {
        originalKey: 'H',
        text: 'Protokol HTTPS mengirimkan seluruh isi formulir login dalam bentuk teks biasa tanpa enkripsi.',
      },
      {
        originalKey: 'I',
        text: 'Metode HTTP GET selalu digunakan untuk mengirim data biner video berkapasitas gigabita tanpa header.',
      },
      {
        originalKey: 'J',
        text: 'Server hanya mengirimkan file CSS saja tanpa dokumen HTML pada permintaan halaman utama.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-20',
    isOriginal: false,
    topic: 'Rendering Engine Browser',
    prompt:
      'Mengenai cara kerja web browser dan modul rendering engine (seperti Blink atau Gecko) dalam menampilkan halaman web interaktif, manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'Rendering engine mengurai (parsing) berkas HTML untuk membangun struktur pohon DOM (Document Object Model).',
      },
      {
        originalKey: 'B',
        text: 'Aturan gaya dari berkas CSS diurai menjadi CSSOM (CSS Object Model) yang menentukan tampilan visual tiap elemen.',
      },
      {
        originalKey: 'C',
        text: 'DOM dan CSSOM digabungkan menjadi Render Tree yang hanya memuat elemen-elemen yang akan ditampilkan secara visual.',
      },
      {
        originalKey: 'D',
        text: 'Tahap Layout (Reflow) menghitung posisi koordinat serta dimensi ukuran kotak setiap elemen di layar, lalu tahap Paint menggambar pikselnya.',
      },
      {
        originalKey: 'E',
        text: 'JavaScript Engine (seperti V8 atau SpiderMonkey) mengeksekusi skrip untuk memanipulasi DOM dan merespons interaksi pengguna secara dinamis.',
      },
      {
        originalKey: 'F',
        text: 'Elemen dengan properti CSS display: none tetap digambar dan menempati ruang fisik pada Render Tree.',
      },
      {
        originalKey: 'G',
        text: 'Blink dan Gecko adalah nama sistem operasi server Linux yang digunakan untuk menyimpan database SQL.',
      },
      {
        originalKey: 'H',
        text: 'CSSOM bertugas mengirim email notifikasi ketika pengguna menekan tombol submit.',
      },
      {
        originalKey: 'I',
        text: 'Tahap Paint terjadi lebih dahulu sebelum dokumen HTML diterima dan diurai menjadi DOM.',
      },
      {
        originalKey: 'J',
        text: 'JavaScript di browser tidak memiliki akses sama sekali untuk mengubah teks atau atribut elemen DOM.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-21',
    isOriginal: false,
    topic: 'Fungsi Web Server Statis & Dinamis',
    prompt:
      'Dalam infrastruktur aplikasi web, web server seperti Apache, Nginx, atau LiteSpeed berperan penting melayani permintaan klien. Manakah 5 pernyataan yang BENAR?',
    options: [
      {
        originalKey: 'A',
        text: 'Web server mendengarkan koneksi masuk pada port jaringan (umumnya port 80 untuk HTTP dan 443 untuk HTTPS).',
      },
      {
        originalKey: 'B',
        text: 'Untuk berkas statis (HTML, CSS, JS, gambar), web server dapat langsung membaca berkas dari penyimpanan disk dan mengirimkannya ke klien.',
      },
      {
        originalKey: 'C',
        text: 'Untuk permintaan dinamis, web server meneruskan request ke runtime aplikasi (Node.js, PHP-FPM, Python) melalui reverse proxy atau gateway.',
      },
      {
        originalKey: 'D',
        text: 'Web server dapat berfungsi sebagai reverse proxy dan load balancer untuk mendistribusikan beban lalu lintas ke beberapa server backend.',
      },
      {
        originalKey: 'E',
        text: 'Web server mengatur caching header, kompresi (Gzip/Brotli), dan terminasi sertifikat TLS/SSL.',
      },
      {
        originalKey: 'F',
        text: 'Nginx dan Apache hanya mampu melayani gambar JPEG dan menolak mengirimkan file HTML atau JSON.',
      },
      {
        originalKey: 'G',
        text: 'Berkas dinamis tidak pernah melibatkan pemrosesan logika kode di server maupun kueri database.',
      },
      {
        originalKey: 'H',
        text: 'Port bawaan standar untuk protokol HTTPS terenkripsi adalah port 21.',
      },
      {
        originalKey: 'I',
        text: 'Web server bekerja di dalam monitor pengguna secara luring tanpa protokol HTTP.',
      },
      {
        originalKey: 'J',
        text: 'Kompresi Gzip pada respons web bertujuan memperbesar ukuran file agar lebih lambat diunduh.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-22',
    isOriginal: false,
    topic: 'Kriptografi AES-256-GCM & Integritas CBT',
    prompt:
      'Pada aplikasi Computer-Based Test (CBT) yang mengutamakan keamanan hasil ujian siswa sebelum dikirim atau dicadangkan, manakah 5 pernyataan yang TEPAT mengenai mekanisme enkripsi dan integritas data?',
    options: [
      {
        originalKey: 'A',
        text: 'AES-256-GCM merupakan algoritma enkripsi simetris terautentikasi (authenticated encryption) yang menjaga kerahasiaan sekaligus keaslian ciphertext.',
      },
      {
        originalKey: 'B',
        text: 'Setiap operasi enkripsi AES-GCM memerlukan Initialization Vector (IV) acak yang unik agar teks yang sama tidak menghasilkan ciphertext identik.',
      },
      {
        originalKey: 'C',
        text: 'Web Crypto API (window.crypto.subtle) menyediakan fungsi kriptografi asli di browser secara aman dan cepat.',
      },
      {
        originalKey: 'D',
        text: 'Fungsi hash SHA-256 bersifat satu arah dan berguna untuk menghasilkan sidik jari digital guna memeriksa keutuhan (integritas) data.',
      },
      {
        originalKey: 'E',
        text: 'Menurunkan kunci enkripsi dari kode akses menggunakan PBKDF2 beserta salt memperkuat ketahanan terhadap serangan tebakan kata sandi.',
      },
      {
        originalKey: 'F',
        text: 'Hash SHA-256 dapat didekripsi kembali secara langsung menjadi teks JSON asli tanpa kunci.',
      },
      {
        originalKey: 'G',
        text: 'Menyimpan skor akhir dan kunci jawaban dalam bentuk teks terbuka di localStorage membuat siswa tidak bisa melihat nilainya.',
      },
      {
        originalKey: 'H',
        text: 'Menggunakan IV konstan yang selalu sama untuk seluruh enkripsi AES-GCM merupakan praktik keamanan terbaik.',
      },
      {
        originalKey: 'I',
        text: 'Base64 encoding adalah algoritma enkripsi kriptografi kuat setara AES-256 yang mustahil dibaca tanpa kunci.',
      },
      {
        originalKey: 'J',
        text: 'AES-256-GCM tidak dapat mendeteksi apabila satu byte pada ciphertext diubah secara tidak sah.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-23',
    isOriginal: false,
    topic: 'Pengacakan Deterministik (FNV-1a & Mulberry32)',
    prompt:
      'Sebuah sistem CBT menerapkan fungsi hash FNV-1a dan PRNG Mulberry32 berbasis identitas peserta untuk menyusun paket soal. Manakah 5 pernyataan yang BENAR?',
    options: [
      {
        originalKey: 'A',
        text: 'FNV-1a mengonversi string identitas unik siswa menjadi bilangan bulat 32-bit yang dijadikan nilai awal (seed) PRNG.',
      },
      {
        originalKey: 'B',
        text: 'Mulberry32 menghasilkan deretan angka acak semu yang selalu identik apabila dimulai dengan seed yang sama.',
      },
      {
        originalKey: 'C',
        text: 'Algoritma Fisher-Yates Shuffle yang dipasangkan dengan PRNG ter-seed mengacak urutan soal dan opsi jawaban secara merata tanpa bias.',
      },
      {
        originalKey: 'D',
        text: 'Menyimpan originalKey pada setiap opsi yang diacak memastikan sistem tetap menilai jawaban secara akurat meskipun posisi huruf tampilan A–E berubah.',
      },
      {
        originalKey: 'E',
        text: 'Jika siswa menekan tombol refresh (F5) di tengah ujian, urutan soal dan opsinya tetap konsisten karena seed identitasnya tidak berubah.',
      },
      {
        originalKey: 'F',
        text: 'Math.random() bawaan JavaScript menerima parameter seed string sehingga otomatis menghasilkan urutan sama setelah halaman di-refresh.',
      },
      {
        originalKey: 'G',
        text: 'Mengacak posisi opsi tanpa menyimpan originalKey tidak akan memengaruhi akurasi pencocokan kunci jawaban.',
      },
      {
        originalKey: 'H',
        text: 'FNV-1a adalah algoritma kompresi gambar lossless pengganti format PNG.',
      },
      {
        originalKey: 'I',
        text: 'Dengan seeded PRNG, dua siswa yang memiliki identitas berbeda dijamin selalu menerima urutan soal yang 100% identik.',
      },
      {
        originalKey: 'J',
        text: 'Fisher-Yates Shuffle harus menghapus setengah isi array agar pengacakan berhasil.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-24',
    isOriginal: false,
    topic: 'Autosave, Visibility API & Sinkronisasi',
    prompt:
      'Dalam merancang ketahanan sesi ujian daring dan pencegahan kecurangan di browser, manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'Event visibilitychange dengan properti document.hidden dapat mendeteksi saat peserta berpindah tab atau meminimalkan jendela browser.',
      },
      {
        originalKey: 'B',
        text: 'Mekanisme debounce pada listener blur dan visibilitychange mencegah satu kali perpindahan jendela tercatat sebagai dua pelanggaran sekaligus.',
      },
      {
        originalKey: 'C',
        text: 'Menyimpan timestamp berakhirnya ujian (endTimestamp) ke localStorage menjaga hitung mundur tetap akurat meskipun browser tertutup sesaat.',
      },
      {
        originalKey: 'D',
        text: 'Menyediakan tombol "Kirim Ulang Data" serta unduhan berkas cadangan JSON/CSV melindungi data peserta saat koneksi internet ke server terputus.',
      },
      {
        originalKey: 'E',
        text: 'Pengiriman POST menggunakan fetch dengan fallback mode "no-cors" membantu menangani endpoint Google Apps Script lintas origin.',
      },
      {
        originalKey: 'F',
        text: 'Event visibilitychange hanya terpanggil ketika pengguna menekan tombol huruf A di keyboard.',
      },
      {
        originalKey: 'G',
        text: 'Menyimpan data di variabel lokal JavaScript tanpa localStorage tetap bertahan otomatis setelah tab ditutup dan dibuka ulang.',
      },
      {
        originalKey: 'H',
        text: 'Menghitung mundur waktu hanya dengan menambah variabel setiap 1 detik di memori kebal terhadap browser throttling.',
      },
      {
        originalKey: 'I',
        text: 'Debounce bertujuan menggandakan jumlah panggilan fungsi sebanyak mungkin dalam 1 milidetik.',
      },
      {
        originalKey: 'J',
        text: 'Ketika koneksi gagal saat submit, semua jawaban siswa harus langsung dihapus tanpa opsi kirim ulang.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-25',
    isOriginal: false,
    topic: 'Rotasi Matriks & Transformasi Koordinat',
    prompt:
      'Diketahui matriks persegi 4×4 berukuran N = 4 yang merepresentasikan sebuah blok permainan. Manakah 5 pernyataan yang BENAR mengenai manipulasi matriks 2D tersebut?',
    options: [
      {
        originalKey: 'A',
        text: 'Rotasi 90 derajat searah jarum jam memetakan elemen matrix[N - 1 - c][r] ke posisi result[r][c].',
      },
      {
        originalKey: 'B',
        text: 'Sebelum menerapkan hasil rotasi ke papan utama, fungsi isValidMove() wajib memverifikasi tidak ada sel aktif yang keluar dinding atau menabrak blok statis.',
      },
      {
        originalKey: 'C',
        text: 'Untuk indeks r = 0 dan c = 3 pada N = 4, rumus rotasi searah jarum jam mengambil nilai dari matrix[0][0].',
      },
      {
        originalKey: 'D',
        text: 'Penghapusan baris penuh dari bawah ke atas pada papan 20×10 mencegah pergeseran indeks baris yang belum diperiksa.',
      },
      {
        originalKey: 'E',
        text: 'Mengisi baris baru dengan new Array(10).fill(0) menghasilkan 10 kolom bernilai 0 yang independen.',
      },
      {
        originalKey: 'F',
        text: 'Untuk indeks r = 0 dan c = 3 pada N = 4, rumus result[r][c] = matrix[N - 1 - c][r] mengambil nilai dari matrix[3][3].',
      },
      {
        originalKey: 'G',
        text: 'Memanggil board.push(new Array(10).fill(0)) meletakkan baris kosong baru di bagian paling atas (indeks 0) papan.',
      },
      {
        originalKey: 'H',
        text: 'Fungsi merge(board, piece) dijalankan sebelum blok mulai jatuh dari bagian atas layar.',
      },
      {
        originalKey: 'I',
        text: 'Matriks 4×4 memiliki total 8 sel apabila diakses menggunakan dua loop bersarang.',
      },
      {
        originalKey: 'J',
        text: 'Rotasi 90 derajat mengubah tipe data elemen array angka menjadi tipe Boolean secara otomatis.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-26',
    isOriginal: false,
    topic: 'Kontrol Touch, Canvas & Responsivitas',
    prompt:
      'Dalam membangun simulasi interaktif HTML5 <canvas> yang mendukung perangkat desktop dan mobile layar sentuh, manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'Event touchstart, touchmove, dan touchend digunakan untuk melacak awal sentuhan, pergeseran jari, dan saat jari diangkat.',
      },
      {
        originalKey: 'B',
        text: 'Mengurangi e.touches[0].clientX dengan canvas.getBoundingClientRect().left menghasilkan posisi X akurat di dalam area canvas.',
      },
      {
        originalKey: 'C',
        text: 'Membatasi koordinat X paddle agar tetap berada di rentang [0, canvas.width - paddle.width] mencegah paddle keluar dari layar.',
      },
      {
        originalKey: 'D',
        text: 'Memanggil e.preventDefault() pada listener touchmove (dengan opsi passive: false) mencegah halaman ikut menggulir saat bermain.',
      },
      {
        originalKey: 'E',
        text: 'Menyatukan logika perubahan arah/posisi dari keyboard dan kontrol sentuh ke dalam satu fungsi handler mengurangi duplikasi kode.',
      },
      {
        originalKey: 'F',
        text: 'Properti e.touches[0] selalu berisi informasi tombol keyboard yang sedang ditekan pengguna.',
      },
      {
        originalKey: 'G',
        text: 'Event touchcancel berarti pengguna berhasil menyelesaikan seluruh level permainan.',
      },
      {
        originalKey: 'H',
        text: 'Untuk membatasi paddle agar tidak keluar tepi kanan, batas maksimum X adalah canvas.width + paddle.width.',
      },
      {
        originalKey: 'I',
        text: 'Perangkat layar sentuh secara otomatis mengeksekusi event keydown setiap kali jari digeser.',
      },
      {
        originalKey: 'J',
        text: 'ctx.getContext("2d") hanya dapat digunakan di perangkat desktop dan gagal pada browser mobile.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-27',
    isOriginal: false,
    topic: 'Optimasi Kinerja & Delta Time',
    prompt:
      'Dalam pengembangan simulasi real-time dan game 2D berbasis JavaScript, manakah 5 pernyataan yang BENAR mengenai kestabilan kecepatan animasi dan manajemen memori?',
    options: [
      {
        originalKey: 'A',
        text: 'Menghitung selisih waktu antar-frame (deltaTime) membuat kecepatan gerak objek konsisten pada monitor 60Hz maupun 120Hz.',
      },
      {
        originalKey: 'B',
        text: 'requestAnimationFrame() meneruskan argumen timestamp berpresisi tinggi ke fungsi callback di setiap frame.',
      },
      {
        originalKey: 'C',
        text: 'Menghapus entitas (peluru/partikel) yang tidak lagi aktif menggunakan splice() dalam loop mundur menjaga penggunaan RAM tetap terkendali.',
      },
      {
        originalKey: 'D',
        text: 'Membersihkan interval dengan clearInterval() saat komponen dilepas atau sesi berakhir mencegah memory leak.',
      },
      {
        originalKey: 'E',
        text: 'Mengambil referensi canvas dan context 2D cukup dilakukan sekali di awal inisialisasi, bukan berulang kali di dalam loop render.',
      },
      {
        originalKey: 'F',
        text: 'Membuat elemen <canvas> baru di DOM setiap frame adalah cara paling efisien untuk merender animasi 60 FPS.',
      },
      {
        originalKey: 'G',
        text: 'Monitor dengan refresh rate 144Hz tanpa deltaTime akan membuat objek tanpa batas kecepatan berjalan lebih lambat dibanding 60Hz.',
      },
      {
        originalKey: 'H',
        text: 'Mendaftarkan addEventListener baru di dalam loop requestAnimationFrame mempercepat eksekusi aplikasi.',
      },
      {
        originalKey: 'I',
        text: 'Garbage collector JavaScript akan langsung menghapus peluru yang berada di luar layar meskipun referensinya masih tersimpan di array bullets[].',
      },
      {
        originalKey: 'J',
        text: 'Fungsi setTimeout(loop, 0) menyinkronkan rendering secara tepat dengan V-Sync perangkat keras layar.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-28',
    isOriginal: false,
    topic: 'Penerapan Logika FSM & Kecerdasan Buatan Dasar',
    prompt:
      'Pola Finite State Machine (FSM) sering digunakan sebagai dasar pengambilan keputusan agen cerdas (AI) pada aplikasi interaktif. Manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'FSM mendefinisikan sejumlah keadaan (state) yang terbatas, di mana entitas hanya berada pada satu state aktif pada satu waktu.',
      },
      {
        originalKey: 'B',
        text: 'Perpindahan dari satu state ke state lain disebut transisi dan dipicu oleh kondisi atau event tertentu.',
      },
      {
        originalKey: 'C',
        text: 'Pada agen NPC sederhana, FSM dapat mengatur transisi antara state PATROL, CHASE, ATTACK, dan RETREAT berdasarkan jarak ke pemain.',
      },
      {
        originalKey: 'D',
        text: 'Penggunaan switch(entity.state) membuat perilaku di setiap kondisi terisolasi rapi dan mudah di-debug.',
      },
      {
        originalKey: 'E',
        text: 'Setiap transisi state yang melibatkan timer sebaiknya membersihkan timer state sebelumnya sebelum memulai timer baru.',
      },
      {
        originalKey: 'F',
        text: 'Dalam konsep FSM, sebuah entitas wajib berada dalam sepuluh state yang saling bertentangan secara bersamaan.',
      },
      {
        originalKey: 'G',
        text: 'FSM tidak dapat diimplementasikan menggunakan bahasa JavaScript karena JavaScript tidak memiliki tipe string.',
      },
      {
        originalKey: 'H',
        text: 'Transisi FSM terjadi secara acak tanpa mempertimbangkan input, waktu, maupun kondisi lingkungan.',
      },
      {
        originalKey: 'I',
        text: 'Menggunakan ribuan variabel boolean terpisah tanpa pengelompokan state jauh lebih bebas bug daripada FSM.',
      },
      {
        originalKey: 'J',
        text: 'State di dalam FSM tidak boleh pernah berubah sejak aplikasi pertama kali dibuka.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-29',
    isOriginal: false,
    topic: 'Deteksi Tumbukan & Kinematika 2D',
    prompt:
      'Dalam simulasi fisika 2D sederhana pada <canvas>, pengembang menerapkan tumbukan bola dan kotak persegi panjang. Manakah 5 pernyataan yang BENAR?',
    options: [
      {
        originalKey: 'A',
        text: 'Pantulan elastis sempurna pada dinding vertikal membalik tanda komponen kecepatan horizontal (vx = -vx).',
      },
      {
        originalKey: 'B',
        text: 'Pantulan pada dinding horizontal membalik tanda komponen kecepatan vertikal (vy = -vy).',
      },
      {
        originalKey: 'C',
        text: 'Penggunaan -Math.abs(vy) saat mengenai bagian atas paddle mencegah bola terjebak bergetar di dalam permukaan paddle.',
      },
      {
        originalKey: 'D',
        text: 'Deteksi tabrakan dua persegi panjang AABB menguji tumpang tindih pada sumbu X sekaligus sumbu Y.',
      },
      {
        originalKey: 'E',
        text: 'Untuk mendeteksi jarak antara dua titik pusat lingkaran (x1, y1) dan (x2, y2), teorema Pythagoras Math.hypot(x2 - x1, y2 - y1) dapat dibandingkan dengan r1 + r2.',
      },
      {
        originalKey: 'F',
        text: 'Jika dua lingkaran memiliki jarak pusat lebih besar dari jumlah kedua jari-jarinya (distance > r1 + r2), maka keduanya pasti bertabrakan.',
      },
      {
        originalKey: 'G',
        text: 'Membalik vx = -vx saat menyentuh lantai bawah canvas akan membuat bola memantul naik ke atas.',
      },
      {
        originalKey: 'H',
        text: 'Kondisi AABB hanya perlu memeriksa A.x < B.x tanpa melibatkan lebar maupun tinggi objek.',
      },
      {
        originalKey: 'I',
        text: 'Menyetel vx = 0 dan vy = 0 saat mengenai tepi layar membuat bola memantul dengan kecepatan dua kali lipat.',
      },
      {
        originalKey: 'J',
        text: 'Nilai jari-jari r sebuah bola di canvas sebaiknya bernilai negatif agar mudah digambar.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    questionId: 'PGK-30',
    isOriginal: false,
    topic: 'Integrasi Formulir Web, JSON & Fetch API',
    prompt:
      'Ketika aplikasi web client-side perlu mengirimkan data hasil input pengguna ke endpoint backend menggunakan Fetch API, manakah 5 pernyataan yang TEPAT?',
    options: [
      {
        originalKey: 'A',
        text: 'Data objek JavaScript diserialisasi menjadi string menggunakan JSON.stringify(payload) sebelum dikirim sebagai body permintaan POST.',
      },
      {
        originalKey: 'B',
        text: 'Fungsi fetch() bersifat asinkron dan mengembalikan objek Promise yang dapat ditangani menggunakan async/await atau .then()/.catch().',
      },
      {
        originalKey: 'C',
        text: 'Blok try { ... } catch (err) { ... } berguna untuk menangkap kegagalan jaringan dan memberikan opsi kirim ulang kepada pengguna.',
      },
      {
        originalKey: 'D',
        text: 'Penggunaan header Content-Type: text/plain;charset=utf-8 sering dimanfaatkan pada endpoint Google Apps Script untuk menghindari kendala CORS preflight OPTIONS.',
      },
      {
        originalKey: 'E',
        text: 'Validasi masukan seperti memastikan token terisi dan identitas terkonfirmasi sebelum memanggil fetch() mengurangi pengiriman data yang tidak valid.',
      },
      {
        originalKey: 'F',
        text: 'JSON.parse(payload) digunakan untuk mengubah objek JavaScript menjadi string teks agar dapat dikirim lewat body POST.',
      },
      {
        originalKey: 'G',
        text: 'Permintaan HTTP GET adalah satu-satunya metode yang diizinkan untuk mengirim payload JSON berkapasitas besar dalam request body.',
      },
      {
        originalKey: 'H',
        text: 'Fungsi fetch() akan menghentikan seluruh eksekusi browser secara sinkron sampai server menjawab.',
      },
      {
        originalKey: 'I',
        text: 'Menyediakan tombol fallback cadangan unduh JSON/CSV tidak berguna sama sekali apabila server sedang tidak dapat dijangkau.',
      },
      {
        originalKey: 'J',
        text: 'Aplikasi web modern dilarang memanggil API eksternal menggunakan protokol HTTPS.',
      },
    ],
    originalKeys: ['A', 'B', 'C', 'D', 'E'],
  },
];
