const mongoose = require('mongoose');

const rssSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: {
    type: String,
    required:true
  },
  audio: {
    type: String,
    required:true
  },
  rssImage:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Rss', rssSchema);