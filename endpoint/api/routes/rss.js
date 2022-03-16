// const routes = require('./routes/routes');

// const router = app => {
//     app.get('/', (request, response) => {
//         response.send({
//             message: 'Node.js and Express REST API'
//         });
//     });
// }

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const rss = require('../models/rss');
const mongoose = require('mongoose');
const uploadFileSizeLimit = 1024*1024*5; //5MB limit for image uplaoding associated with rss

const RssController = require('../controllers/rss');


//build out a storage strategy using multer to handle uploaded files/images
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads');
  },
  fileid:function(req,file,cb){
    cb(null, Date.now() + '_' + file.originalid);
  }
});

//filter out filtypes on image upload - make sure we're only getting png and jpeg
const fileFilter = (req,file,cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null,true);
  } else {
    cb(new Error('Incorrect filetype - jpg and png are only types accepted'),false);
  }
};

//set up an upload object thru multer to hanlde uploading files
const upload = multer({
  storage:storage,
  limits:{
    fileSize:uploadFileSizeLimit
  },
  fileFilter: fileFilter
});

//grab a list of all the rss
router.get('/', RssController.rss_get_all);

//add a new rss
router.post('/', checkAuth, upload.single('rssImage'), RssController.rss_create_rss);

//grab info off a rss based on an id
router.get('/:rssId', RssController.rss_get_rss);

//handle updating a rss
router.patch('/:rssId', checkAuth, RssController.rss_update_rss);

//handle deleting a rss
router.delete('/:rssId', checkAuth, RssController.rss_delete_rss);


module.exports = router;