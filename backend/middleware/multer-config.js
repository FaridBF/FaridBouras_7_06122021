const multer = require('multer');

const MIME_TYPES = {
  // dictionnnaire de mime_types indiquant donc les traductions(objet)
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

// f° afin d'indiquer que l'enrgt se fera sur le disque
const storage = multer.diskStorage({
  // f° destination (3 arguments: la requête, le fichier et un callback)
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // f° permettant d'expliquer le nom du fichier à utiliser
  filename: (req, file, callback) => {
    // remplace les espaces par des underscore et supprime l'extension d'origine
    const name = file.originalname.split(' ').join('_').split('.', 1);
    // l'élément de notre dict° correspondant au mimetype envoyé par le frontend
    const extension = MIME_TYPES[file.mimetype];
    // Date.now:c'est un timestamp afin de le rendre le plus unique possible
    callback(null, name + Date.now() + '.' + extension);
  }
});

// exporter le middleware configuré avec destination d'enregistrement
// méthode single pour dire que nous gérerons uniquement les téléchargements de fichiers image
module.exports = multer({ storage: storage }).single('image');
