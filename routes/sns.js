const express = require('express');
const AWS = require('aws-sdk');
const { config } = require('process');
const app = express();


app.use(express.json());

const creds = new AWS.SharedIniFileCredentials({profile:'default'});
const sns = new AWS.SNS({creds,region:'us-east-1'});
app.get('/status',(req, res) => res.send({status: 'ok',sns}))


app.post('/subscribe',(req,res) => {
    let params = {
        
        Protocol: "SMS", 
        TopicArn: 'arn:aws:sns:us-east-1:901307864240:patient-appointmet-reminder-topic',
        Endpoint: req.body.mobilenumber
      };
      sns.subscribe(params,(err,data) =>
    {
        if (err) console.error(err)
            res.send(data)
    })
});
app.post('/publish',(req,res) => {
    let params = {
        
        
        Message: req.body.Message,
        TopicArn: 'arn:aws:sns:us-east-1:901307864240:patient-appointmet-reminder-topic',
    };
    sns.publish(params,(err,data) =>
        {
            if (err) console.error(err)
                res.send(data)
        })

    })

const port = 3000;
app.listen(port,()=> {
    console.log('SNS app listening on port');
})
module.exports = router;