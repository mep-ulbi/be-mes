MES-Production/
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── productionController.js
│ ├── machineController.js
│ ├── ppicController.js
│ └── managerController.js
├── models/
│ ├── userModel.js
│ ├── productionModel.js
│ ├── machineModel.js
│ └── resultModel.js
├── routes/
│ ├── authRoutes.js
│ ├── productionRoutes.js
│ ├── machineRoutes.js
│ ├── ppicRoutes.js
│ └── managerRoutes.js
├── middlewares/
│ ├── authMiddleware.js
│ └── errorMiddleware.js
├── utils/
│ ├── fileUpload.js
│ ├── timeHelper.js
│ └── reportGenerator.js
├── public/
│ └── uploads/
├── views/
│ └── index.html
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md

alur
graph TD
A[Login/Register] --> B[Production Engineering]
B --> |Input Data Produksi dan Mesin| C[Database]
C --> D[Production Operation]
D --> |Pilih Proses Produksi dan Mesin| E
E --> |Mulai Proses dengan Start| F[Timer]
F --> |Stop Timer dan Catat Durasi| G
G --> |Hasil Durasi Dicatat| H[Database]
H --> I[PPIC]
I --> |Catat Hasil dan Upload File| J[Database]
J --> K[Manager]
K --> |Lihat Report dan Grafik| L[Dashboard]
K --> |Kelola Data User| M[Database]
