var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var deasync = require('deasync');
var axios = require('axios');

module.exports = [

    function(session){
       // session.userData = {};
       session.userData['OrdersPage'] = true;
       builder.Prompts.text(session, "Which order are you looking for? \n Specify the S_No:");   
    },
       
    function(session,result){
        session.userData['OrderId'] = result.response; 
        session.userData['MapOrderId'] = true;
        builder.Prompts.confirm(session,"Do you want to provision the request?")  ;
    },       
    
    function (session,results,next){
        if(results.response){
        session.userData['provision'] = true; 
        session.endDialog('The request has been provisioned');
        } else {
            console.log("is rejected");
            session.userData['provision'] = false;
            builder.Prompts.text(session, "Please provede the comments for rejecting the request");
            next();
          //  session.endDialog('The request has been rejected');
        }
     },
        
    function (session,results,next){
        session.userData['RejectedReason'] = results.response; 
        session.userData['RejectedSubmit']=true;
        session.endDialog('The request has been rejected');
            
        // session.endDialog('The request has been provisioned');
    }
];