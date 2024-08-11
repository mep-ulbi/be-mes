const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        const newFilename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, 
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('productionFile'); 
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Files Only!');
    }
}

module.exports = upload;
