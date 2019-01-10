module.exports = (app) => {

  /* Base route. */
  app.get('/', (req, res) => {
    res.status(200).json({
      message : 'Welcome to the Close My Tab API.'
    });
  });

}
