var express =   require("express");
var multer  =   require('multer');
var hocrParser = require('./hocr_parser')
const spawn = require('child_process').spawn;
var fs = require('fs');

var app         =   express();

app.use(express.static('uploads'));

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    console.log('file name: ' + file.originalname);
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/image',function(req,res){
    upload(req,res,function(err) {
        console.log("got an error! - " + err);
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        const tesseractExec = spawn('./upload-local-file.sh', ['./uploads/'+req.file.originalname]);
        hocrOutput = "";
        tesseractExec.stdout.on('data', (data) => {
          hocrOutput += data;
        });

        tesseractExec.stderr.on('data', (data) => {
          console.log("stderr: " + data);
        });

        tesseractExec.on('close', (code) => {
          console.log("child process exited with code " + code);
          parsedOutput = hocrParser.parse(hocrOutput);
          console.log(parsedOutput);
          res.end("Completed OCR parsing");
        });
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
