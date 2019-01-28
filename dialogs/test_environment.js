var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var deasync = require('deasync');
var axios = require('axios');
var StartDay,EndDay,StartYear,EndYear,StartMonth,EndMonth;
var IMSEntity;
module.exports = [

    function(session, args, next){
        IMSEntity   = builder.EntityRecognizer.findEntity(args.entities, 'IMS'); 
        if (IMSEntity!==null){
            session.userData['SelectedEnvironment'] = IMSEntity;
            next();
         }else{
            
            builder.Prompts.text(session, "Please select the Environment you want to reserve");
         }
    },
    
    function(session,result){   
        session.userData['SelectedEnvironment'] = result.response; 
        builder.Prompts.confirm(session, "Should I go ahead and reserve the IMS Test Topologyt?");
    },
               
    function (session,result){
        if(result.response){
            session.userData['Accept'] = true;    
            builder.Prompts.text(session, "Please specify the name of the Environment");
        }
        else {
            session.userData['Accept'] = false;
            console.log("is rejected");
            session.endDialog('The request has been rejected. Let me know when you need it.');
        }
    },
           
    function(session,result){
        session.userData['EnvironmentName'] = result.response;  
        // builder.Prompts.text(session, "Please specify the Build Version of the Environment");
        builder.Prompts.choice(session, "Please specify the Build Version of the Environment",['Version 1','Version 1.2','Version 1.3'],{ listStyle: builder.ListStyle.button });
    },
    
    function(session,result){   
        session.userData['BuildVersion'] = result.response;
        // builder.Prompts.text(session, "Please select the Template you would want to add for the Environment");
        builder.Prompts.choice(session, "Please select the Template you would want to add for the Environment",['Mini','Medium','Large'],{ listStyle: builder.ListStyle.button });
    },
        
    function(session,result){
        session.userData['Template'] = result.response;  
        builder.Prompts.time(session,"If you could please provide the Start date for the request");
    },
    
    function(session,result, next){
        if(result.hasOwnProperty('response')){
            session.userData['Environment Start Date'] = builder.EntityRecognizer.resolveTime([result.response]);
            StartDay  = `${session.userData['Environment Start Date'].getDate()}`;
            StartMonth=`${session.userData['Environment Start Date'].getMonth()}`;
            StartYear = `${session.userData['Environment Start Date'].getFullYear()}`;
            
            // session. send(`${session.userData['Environment Start Date'].getDate()}`);   
            // session. send(`${session.userData['Environment Start Date'].getMonth()}`);             
            // session. send(`${session.userData['Environment Start Date'].getFullYear()}`);
        
            builder.Prompts.time(session, "If you could please provide the end date for the request");
        }else{
            builder.Prompts.time(session, "Please provide an End date greater than the Start Date");
       }
    },
    
    function(session,result,next){
        session.userData['Environment End Date'] = builder.EntityRecognizer.resolveTime([result.response]);
        EndDay  = `${session.userData['Environment End Date'].getDate()}`;
        EndMonth=`${session.userData['Environment End Date'].getMonth()}`;
        EndYear = `${session.userData['Environment End Date'].getFullYear()}`;
        // session. send(`${session.userData['Environment End Date'].getDate()}`);   
        // session. send(`${session.userData['Environment End Date'].getMonth()}`);             
        // session. send(`${session.userData['Environment End Date'].getFullYear()}`);   
     var date_invalid = false;
        if (EndYear < StartYear) date_invalid = true ,session.send("date invalid 1");
        else if ((EndYear == StartYear) && (( StartMonth - EndMonth )> 0))  date_invalid = true, session.send("date invalid 2");
        else if ((EndMonth == StartMonth) &&( EndMonth > StartMonth)&& ((StartDay - EndDay) > 0 ))date_invalid = true , session.send("date invalid 3");
  
        if (date_invalid) next({ resumed: builder.ResumeReason.back });
        else builder.Prompts.choice(session, "Do you want to submit the Environment request",['Yes', 'No'],{ listStyle: builder.ListStyle.button });
    },
        
    function (session,results){
        if(results.response.entity){ 
            session.userData['Submit'] = true; 
            session.endDialog('The Environment request has been submitted');
        } else {
            console.log("is rejected");
            session.userData['Submit'] = false;
            session.endDialog('The Environment request has been rejected'); 
        }
    }
];