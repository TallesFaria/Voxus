const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const ElasticClient = require('./config/ElasticClient');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

ElasticClient.indices.create(
  {
    index: 'tasks'
  },
  function(err, resp, status) {
    if (err) {
      console.log(err);
    } else {
      console.log('create', resp);
    }
  }
);

require('./routes/authRoutes')(app);
require('./routes/tasksRoutes')(app);
app.get('/', (req, res) => {
  let adminContent = `
    <div>
      You don't appear to be logged in.  You can log in by visiting
      <a href="/auth/google">the Authentication Route</a>
    </div>
  `;
  if (req.user) {
    adminContent = `
      <div>
        You appear to be logged in, so you can visit <a href="/tasks">the Tasks route</a>
        or you can <a href="/logout">Logout</a>.
      </div>
    `;
  }
  res.send(`
    <div>
      <h4>Hi!  Welcome to the Voxus Tasks Manager API</h4>
      <div>
        You can see the tasks <a href="/tasks"> in the Tasks route</a>
      </div>
      ${adminContent}
    </div>
  `);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT);
