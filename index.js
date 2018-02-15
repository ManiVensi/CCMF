var AWS = require('aws-sdk');
//init SMS API
var sms = new AWS.SMS({
    apiVersion: '2016-10-24',
    accessKeyId: 'AKIAIBI7T6NTOZRLM4SA',
    secretAccessKey:'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',
    region:'us-west-2'
});

var express = require('express');
const fileUpload = require('express-fileupload');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(fileUpload());


// INIT Express Server
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

// CALLING SMS API on "/"
app.get('/', function (req, res) {
    sms.getReplicationJobs({ }, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else{
            res.send(data.replicationJobList);
        }
    });
});

var migrationhub = new AWS.MigrationHub({
    apiVersion: '2017-05-31',
    accessKeyId: 'AKIAIBI7T6NTOZRLM4SA',
    secretAccessKey:'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',
    region:'us-west-2'
});

app.get('/migration', function(req, res){
    migrationhub.listMigrationTasks({}, function(err, data){
        if (err) console.log(err, err.stack); // an error occurred
        else{
            res.send(data.MigrationTaskSummaryList);
        }
    });
});

app.post('/upload', function(req, res) {
    console.log(req.files);
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
   
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
   
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('uploads/'+sampleFile.name, function(err) {
      if (err)
        return res.status(500).send(err);
   
      res.send('File uploaded!');
    });
});

