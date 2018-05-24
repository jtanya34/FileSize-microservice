// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const multer = require('multer');
const upload = multer({
  dest: 'public/uploads/' // this saves your file into a directory called "uploads"
}); 

var app=express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var fs = require("fs"); //Load the filesystem module
//var stats = fs.statSync("myfile.txt")
//var fileSizeInBytes = stats["size"]

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  response.render('index');
});

app.post('/', multer({ dest: './public/uploads/'}).single('upl'), function(req,res){
    console.log(req.body); //form fields
    console.log(req.file); //form files
    res.status(204).end();
});
// app.post('/', upload.single('file-to-upload'), (req, res) => {
//  res.render(req.file.size);
// });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
