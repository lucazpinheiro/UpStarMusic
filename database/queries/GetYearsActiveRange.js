const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  return Artist.find({})
    .sort({ yearsActive: 1 })
    .then(sortedArtists => {
      return {
        min: sortedArtists[0].yearsActive,
        max: sortedArtists[sortedArtists.length - 1].yearsActive
      };
    });
};
