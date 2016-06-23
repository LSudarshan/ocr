var express =   require("express");
var multer  =   require('multer');
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
        tesseractExec.stdout.on('data', (data) => {
          fs.appendFile("./out.html", data, function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("Tesseract output was written to file");
          }); 
        });

        tesseractExec.stderr.on('data', (data) => {
          console.log("stderr: " + data);
        });

        tesseractExec.on('close', (code) => {
          console.log("child process exited with code " + code);
          res.end("File is uploaded");
        });
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
