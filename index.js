const express = require('express');
const db = require('./db/db')
const cors = require('cors'); 
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express();
const port = 5000;
const bugsRoutes = require('./api/routes/bug');
const projectsRoutes = require('./api/routes/project');
const usersRoutes = require('./api/routes/user');
const authRoutes = require('./api/routes/auth')
app.use(morgan('dev'));

// use to convert the url encoded data to json format so data is available to req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// app.use(cors());
// allow cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); // Specify the allowed methods
    return res.status(200).json({});
  }
  next();
});

app.use('/bugs', bugsRoutes);
app.use('/users', usersRoutes);
app.use('/projects', projectsRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
