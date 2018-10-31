var aws      = require('aws-sdk');
var queueUrl = "https://sqs.us-east-2.amazonaws.com/653688110860/Philance.fifo";
var receipt  = "";
var randtoken=require('rand-token')
    
// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath('/home/vagrant/.aws/credentials.json');
aws.config.update({region: 'us-east-2'});
// Instantiate SQS.
var sqs = new aws.SQS();

// Creating a queue.
exports.create=(req, res)=> {
    var params = {
        QueueName: "Philance",
    };
    
    sqs.createQueue(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}

// Listing our queues.
exports.list=(req, res)=>{
    sqs.listQueues(function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}

// Sending a message.
// NOTE: Here we need to populate the queue url you want to send to.
// That variable is indicated at the top of app.js.
exports.send=(params)=> {
    // var params = {
    //     MessageBody: Math.random(9).toString(),
    //     MessageGroupId:"acceptCandidatee",
    //     QueueUrl: queueUrl,
    //     DelaySeconds: 0,
    //     // AttributeNames:[
    //     //     "ContentBasedDeduplication"
    //     // ]
    // };

    sqs.sendMessage(params, function(err, data) {
        if(err) {
            // res.send(err);
        }
        else {
            // res.send(data);
        } 
    });
}

// Receive a message.
// NOTE: This is a great long polling example. You would want to perform
// this action on some sort of job server so that you can process these
// records. In this example I'm just showing you how to make the call.
// It will then put the message "in flight" and I won't be able to 
// reach that message again until that visibility timeout is done.
exports.recieve=(params)=> {
    var params = {
        QueueUrl: queueUrl,
        VisibilityTimeout: 10, // 10 secs wait time for anyone else to process.
        // AttributeNames:[
        //     "ContentBasedDeduplication"
        // ]
    };
    
    sqs.receiveMessage(params, function(err, data) {
        if(err) {
            console.log('err');
            // res.send(err);
        } 
        else {
            console.log('data');
            // res.send(data);
        } 
    });
}

// Deleting a message.
exports.delete=(req, res)=> {
    // var params = {
    //     QueueUrl: queueUrl,
    //     ReceiptHandle: 'AQEBwN76X2vzC1mZDsUWNkDCi0tpnz6EBXXYbTJtHEl3fLq80ds859/zP2axF7v40IXWkPaJWXBbHYWb1E0Fp+HOuI4CIf658a3TjUTALNaGHOb6Ib8NBJ2qjjijkbTvuC/2VdlZVAjHFcHy04LARsGbSP/heoKRjIGlHMA0slJKWPJS/DqbC+KpwN/ZDcDwncTX57kGymBoBhI3C7WBjnehSahH37mNRjib6FVWMb6qL3AtQ+mK3gpaHWX5tyAZGIl1OncVQUhQvQlWkqcw6iETtw=='
    // };
    
    sqs.deleteMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}

exports.set=(req, res)=> {
    var params = {
        QueueUrl: queueUrl,
        Attributes:{
            'ContentBasedDeduplication':'true'
        }
        
    };
    
    sqs.setQueueAttributes(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}

// Purging the entire queue.
exports.purge=(req, res)=> {
    var params = {
        QueueUrl: queueUrl
    };
    
    sqs.purgeQueue(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}
