// server.js
// where your node app starts

// init project
var express = require('express'); //to require express.js
var multer = require('multer'); //to require multer for uploading photos
var bodyParser = require('body-parser');//to require body-parser to grab json form data
var morgan=require('morgan');   
//app.use(express.static('uploads'));
var storage = multer.diskStorage({
destination: function (req, file, cb) {
 cb(null, 'uploads/');
    },
  filename:function(req,file,cb){
    console.log(file)
  }
 
}); //giving upload a destination directory

var app = express();  //to use express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));  //to use style.css
app.set('view engine', 'ejs'); //to use ejs as template language
// app.use(bodyParser.urlencoded({ extended: false })); //to use body parser
app.use(express.static('uploads'));
app.get('/',(req,res)=>{
  res.render('index');
});

app.post('/', multer({storage: storage, dest: 'uploads/'}).single('upload'),(req,res)=>{
  if(!req.file){
    console.log("No file recieved");
    return res.send({
       success: false
      //size:req.file.size
    });
  } else {
    console.log("file received");
    return res.send({
      success: true
      
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
