const fetch   = require('node-fetch');
const API_KEY = '5wlmLZR6P0Li0FSteN-B9PGyH_ptOJI-HPkgI-29AoENr27A0s9PCU2DKSHrONaIIv5dDuJzzawbevCUU4KbMkzGpzuA9HwjM2_0W6rxzixOAuGPg4MgMuW-2JQ3XHYx';

// headers needed for the yelp API.
const options = {
  headers : {
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer ' + API_KEY,
  },
  mode : 'no-cors'
};

module.exports = {

  // get nearest bars, yelp API.
  getNearest(req, res) {
    const query = req.query;

    fetch(`https://api.yelp.com/v3/businesses/search?latitude=${query.lat}&longitude=${query.lng}&term=bars`, options)
      .then((data) => data.json())
      .then((data) => {

        var bars = [];
        data['businesses'].forEach((biz) => {
          bars.push({
            'name' : biz['name'],
            'image' : biz['image_url'],
            'rating' : biz['rating'],
            'lat' : biz['coordinates']['latitude'],
            'lng' : biz['coordinates']['longitude'],
            'phone' : biz['phone'],
          });
        });

        res.json(bars);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
}
