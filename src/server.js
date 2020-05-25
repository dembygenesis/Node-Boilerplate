// Environment settings.
require('dotenv').config();

const express     = require('express');
const bodyParser  = require('express');
const cors        = require('cors');
const path        = require('path');
const routesV1    = require('./routes');
const PORT        = process.env.PORT;
const app         = express();

/**
 * Cors & BodyParser
 */
app.use(cors());
app.use(bodyParser.json());

/**
 * Routes (if not found, defaults to public)
 */
app.use('/api/v1', routesV1);

app.use('*', function(req, res) {
    res.sendFile( path.join(__dirname, '../public/index.html') );
});

/**
 * Public files config
 */
global.appRoot = require('app-root-path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log('Now listening to port:' + PORT);
}); 
