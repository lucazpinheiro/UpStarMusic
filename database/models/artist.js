const mongoose = require('mongoose');
const AlbumSchema = require('./album');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums: [AlbumSchema]
});

artistSchema.virtual('albumsCount').get(function() {
  return this.albums.length
})

const Artist = mongoose.model('artist', artistSchema);

module.exports = Artist;