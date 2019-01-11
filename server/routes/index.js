const barsController = require('../controllers').bars;

module.exports = (app) => {

  /* Base route. */
  app.get('/', (req, res) => {
    res.status(200).json({
      message : 'Welcome to the Close My Tab API.'
    });
  });

  /* Bar Routes. */
  app.get('/bars/getNearest', barsController.getNearest);

}
