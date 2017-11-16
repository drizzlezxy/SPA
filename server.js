// server.js
var express = require('express')
var path = require('path')
var compression = require('compression')
var fs = require('fs')

var app = express()
app.use(compression())

// app.get('*', function (req, res, next) {
//   // fs.writeFile('message.json', JSON.stringify(Object.keys(req)), (err) => {
//   //   if (err) throw err;
//   //   console.log('It\'s saved!');
//   // });
//   console.log(req.headers.host);
//   // console.log(req);
//   next();
// })

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'build')))
console.log('__dirname', __dirname)

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  console.log('join, __dirname', path.join(__dirname, 'build', 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})