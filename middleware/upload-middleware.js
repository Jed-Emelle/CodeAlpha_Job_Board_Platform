const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function( req, file, cb ){
        cb(null, "uploads/")
    },
    filename: function( req, file, cb ){
        cb(null,

            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
});

const fileFilter = (req, file, cb) => {

    const allowedMimeTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null, true)
    } else{
        cb(new Error('Only PDF, DOC and DOCX files are allowed!'))
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 //10MB file size limit
    }
});