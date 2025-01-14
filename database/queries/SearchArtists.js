const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = {};
  if (criteria.name) {
    query.$text = {
      $search: criteria.name
    };
  }
  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    }
  }
  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    }
  }
  console.log('sortProperty 1', sortProperty);
  if (sortProperty === 'albums') {
    sortProperty = 'albumsCount';
  }

  console.log('sortProperty 2', sortProperty);
  return Artist
    .find(query)
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit)
    .then(artists => {
      console.log('(artists', artists)
      return {
        all: artists,
        count: artists.length,
        offset,
        limit
      };
    });
};
