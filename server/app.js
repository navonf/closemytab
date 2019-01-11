/*         Packages.      */
const express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    expressSanitizer = require('express-sanitizer');

/*         Port.          */
const PORT             = process.env.PORT || 3000;

/*         Setup.         */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(expressSanitizer());

/*         Routes.        */
require('./routes')(app);

/*         Run app.       */
app.listen(PORT, () => {
  console.log('🍻 Close My Tab API started🍻');
  console.log(`Running on port ${PORT}`);
  console.log(`Running on Node.js ${process.version}`);
});
