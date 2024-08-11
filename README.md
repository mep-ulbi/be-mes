# MES-Production

## Gambaran Umum

MES-Production adalah Sistem Eksekusi Manufaktur (MES) yang dirancang untuk mengelola dan melacak proses produksi dalam lingkungan manufaktur. Sistem ini mencakup peran seperti Production Engineering, Production Operation, PPIC, dan Manager, dengan tanggung jawab masing-masing. Aplikasi ini menangani tugas-tugas seperti input data, manajemen proses, pelacakan waktu, unggah file, dan pembuatan laporan.

## Daftar Isi

- [Struktur Proyek](#struktur-proyek)
- [Instalasi](#instalasi)
- [Variabel Lingkungan](#variabel-lingkungan)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Gambaran Alur Kerja](#gambaran-alur-kerja)
- [Rute API](#rute-api)
- [Middleware](#middleware)
- [Utilitas](#utilitas)
- [Lisensi](#lisensi)

## Struktur Proyek

```plaintext
MES-Production/
├── config/
│   └── db.js                      # Konfigurasi database
├── controllers/
│   ├── authController.js          # Logika autentikasi dan otorisasi
│   ├── productionController.js    # Mengelola operasi terkait produksi
│   ├── machineController.js       # Mengelola data terkait mesin
│   ├── ppicController.js          # Mengelola operasi PPIC
│   └── managerController.js       # Mengelola operasi untuk manajer
├── models/
│   ├── userModel.js               # Skema dan model pengguna
│   ├── productionModel.js         # Skema dan model produksi
│   ├── machineModel.js            # Skema dan model mesin
│   └── resultModel.js             # Skema dan model hasil
├── routes/
│   ├── authRoutes.js              # Rute untuk autentikasi
│   ├── productionRoutes.js        # Rute untuk manajemen produksi
│   ├── machineRoutes.js           # Rute untuk manajemen mesin
│   ├── ppicRoutes.js              # Rute untuk operasi PPIC
│   └── managerRoutes.js           # Rute untuk operasi manajer
├── middlewares/
│   ├── authMiddleware.js          # Middleware untuk autentikasi
│   └── errorMiddleware.js         # Middleware untuk penanganan error
├── utils/
│   ├── fileUpload.js              # Utilitas untuk unggah file
│   ├── timeHelper.js              # Utilitas untuk pelacakan waktu
│   └── reportGenerator.js         # Utilitas untuk pembuatan laporan
├── public/
│   └── uploads/                   # Direktori untuk file yang diunggah
├── views/
│   └── index.html                 # Entry point untuk frontend (jika ada)
├── .env                           # Variabel lingkungan
├── .gitignore                     # File git ignore
├── package.json                   # Konfigurasi proyek Node.js
├── server.js                      # File server utama
└── README.md                      # File README ini
