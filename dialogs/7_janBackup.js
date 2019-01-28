/* global greetServices */
/* global CorrectService */
/* global Flag */
var CorrectService = [];
var DecisionT=false;
var FlagAlarm = false;
var FlagpendingRequest = false;
var FlagprovisionYes = false;
var FlagprovisionNo = false;
var Flagcapacity = false;
var FlagF = false;
var FlagG = false;
var DecisionT=false;
var greetServices;
var StartDay,EndDay,StartYear,EndYear,StartMonth,EndMonth,CurrentDay,CurrentMonth,CurrentYear;
// /*-----------------------------------------------------------------------------
// A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
// -----------------------------------------------------------------------------*/
var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var deasync = require('deasync');
var axios = require('axios');
var ssml = require('./ssml');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());
/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */
 var tableName = 'botdata';
 var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
 var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);
 var Decision2 = "No";
 

 var bot = new builder.UniversalBot(connector);

 bot.set('storage', tableStorage);


// LUIS Key
//  var recognizer = new builder.LuisRecognizer("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/3b7afe94-5c95-484f-a209-abb73b0b24d6?subscription-key=1425a5c948d5456d91955e95b56683e0&verbose=true&timezoneOffset=0");
// Key generated through AZURE for LUIS
// var recognizer = new builder.LuisRecognizer("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/3b7afe94-5c95-484f-a209-abb73b0b24d6?subscription-key=6e252c545d8e4341859f19ff76d1faf4ss&verbose=true&timezoneOffset=0");
var recognizer = new builder.LuisRecognizer("https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/cb2cc8ea-4199-49c6-9da9-f4d837812c48?subscription-key=6e252c545d8e4341859f19ff76d1faf4&verbose=true&timezoneOffset=0");
// https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/3b7afe94-5c95-484f-a209-abb73b0b24d6?subscription-key=6e252c545d8e4341859f19ff76d1faf4&spellCheck=true&bing-spell-check-subscription-key={YOUR_BING_KEY_HERE}&verbose=true&timezoneOffset=0&
bot.recognizer(recognizer);


var greetings = [" Hello Jack, welcome back to CREDO. Would you like to see the services available? ",
                 'Hi .I\'m CREDO - the  EEAAS bot at your service.'];
                 
var thanks = ["Thanks, How can I help you further?"];

var ok_responses = ["Great! How can I help you further?"];

var no_match_responses = ['😒 I blame my team mates for not teaching me that!',
'I wish I understood that! 😞', 'I\'m sorry. But, I am still learning! 😓',
'I need help in understanding that.. 😕',
'Maybe I didn\'t understand you properly. Could you please reword your question or type your complete query? 😶',
'That looks alien 👽 to me.', 'Sorry. I can\'t understand Greek and Latin yet.. 🐐'];

var thank_you_responses = ['Sure. Happy to help ! 😊😌', 'My Pleasure 😊'];
var goodBye_responses = ['Do come again. Our interaction will only make me better!'];

var wassup_responses = ['All good 🙂',
'Oh nothing much! I’m just putting the final touches on my plan to conquer the world. 🗡️',
'The direction denoted by Z in 3-D coordinate system', 'Not gravity. I checked!',
'My I.Q.- Way up. Way higher than one can imagine.. 😉',
'Everything except my salary.. 😢'];

var hw_u_responses = ['Couldn’t be better! 😌', 'Excited to talk to you! 🙂'];

var jokes = ['I’m afraid you won’t get my sense of humour.', 'What do you call someone who is super late? Slate.']
var regExOk = new builder.RegExpRecognizer('OK', /.*ok|okay|k.*/i);
var regExgoodBye = new builder.RegExpRecognizer('Bye', /.*bye|good bye|thats it|no need|nothing.*/i);
var regExHwRU = new builder.RegExpRecognizer('How are you', /.*how are you.*/i); 
var regExThx = new builder.RegExpRecognizer('Thank You', /.*thank( you|s)|no thanks|great.*/i); 
var regExWhoRU = new builder.RegExpRecognizer('Who are you', /.*who are you|what ?i?'?s your name.*/i); 
var regExWhoAmI = new builder.RegExpRecognizer('Who am I', /.*who am i.*/i); 
var regWSup = new builder.RegExpRecognizer('Whatsup', /.*wh?at?'?s ?s?up.*/i);
var regILU = new builder.RegExpRecognizer('I Love You', /.*i love you.*/i);
var regULM = new builder.RegExpRecognizer('Love me', /.*you love me.*/i);
var regExJoke = new builder.RegExpRecognizer('Joke', /.*a joke.*/i);
var regExNo = new builder.RegExpRecognizer('No', /.*no|no need|na.*/i);
var regExYes = new builder.RegExpRecognizer('Yes', /.*yes|yup|yes that would help me|yes it would be helpful|yes that would be great|YES|ya.*/i);
    
var intents = new builder.IntentDialog({ recognizers:[recognizer,regExNo,regExYes,regExJoke,regExHwRU,regExWhoRU,regExWhoAmI,regWSup,regILU,regULM,regExOk, regExgoodBye]})     
              
.matches('How are you',(session,args)=>{
    console.log(args);
    session.endDialog(hw_u_responses[Math.floor(Math.random() * hw_u_responses.length)]);
})       
.matches('Who are you',(session,args)=>{
    console.log(args);
    session.endDialog('I am Jass - A bot for EESS');
})
.matches('Who am I',(session,args)=>{
    console.log(args);
    session.endDialog('You are who you are because of what goes into your mind');
})
.matches('Whatsup',(session,args)=>{
    console.log(args);
    session.endDialog(wassup_responses[Math.floor(Math.random() * wassup_responses.length)]);
})
.matches('I Love You',(session,args)=>{
    console.log(args);
    session.endDialog('Me too!');
})
.matches('Love me',(session,args)=>{
    console.log(args);
    session.endDialog('Stop! This is going too fast for me.');
})
 .matches('Thank You',(session, args) => {
     console.log(args);
     session.endDialog(thank_you_responses[Math.floor(Math.random() * thank_you_responses.length)]);
 })
 .matches('OK', (session, args) =>{
     console.log(args);
     session.endDialog(ok_responses[Math.floor(Math.random() * ok_responses.length)]);
 })
 .matches('Bye', (session, args) => {
     console.log(args);
     session.endDialog(goodBye_responses[Math.floor(Math.random() * goodBye_responses.length)]);
 })
 .matches('Yes',(session,args)=>{
    console.log(args);
    console.log("ser = false");
    session.userData['servicespage'] = false;
    session.userData['openOrdersPage'] = false;
    
    //session.userData['provisionCheck'] = false;
    
    //session.userData['Alarms'] = false;
      //session.userData['pendingRequest'] = false;
      session.userData['sendPendingRequest'] = false;
    if (FlagG == true){
         session.userData['servicespage'] = true;
         session.send("Opening Service page.. ");
         console.log("ser = true");
         FlagG = false;
         session.endDialog();
    }    
    else if (FlagAlarm == true){
        // session.userData['Alarms'] = true;
      //   "The node has a hardware failure"
         console.log("want to see alarms");
         session.userData['sendPendingRequest'] = true;
      session.send("The node has a hardware failure"); 
        // console.log("want to see alarms 2");
         //session.userData['sendPendingRequest'] = false;
         FlagAlarm = false;
         //session.endDialog("The node has a hardware failure"); 
       session.endDialog();
    }
    else if (FlagpendingRequest == true){
         
        // session.send("The node has a hardware failure");
         //console.log("Opens the Order details page");
         //session.userData['sendPendingRequest'] = false;
         
         
         FlagpendingRequest = false;
         //session.send("Opening Request List..");
      //   session.delay(2000);
         
         session.userData['openOrdersPage'] = true;
       //  session.userData['provisionCheck'] = true;
       //  session.userData['case1B'] = true;
         console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
       session.endDialog("Here's the request");
         
          
    }
    // if (FlagC == true){
         
    //      //session.send("The node has a hardware failure");
    //      console.log("want to see alarms");
    //      session.userData['OrdersPage'] = true;
          
    // }

    
         session.endDialog("My Pleasure");
        
    
    
    //session.endDialog('You are who you are because of what goes into your mind');
})

.matches('No',(session,args)=>{
    console.log(args);
//session.userData['pendingRequest'] = false;
session.userData['case1B'] = false;
session.userData['sendPendingRequest'] = false;
//session.userData['provisionCheck'] = false;
    if (FlagG == true){
         session.userData['servicespage'] = false;
         console.log("ser = true");
         FlagG =false;
         //session.send("Great!, How can I help you further");
         session.endDialog("Great!, How can I help you further"); 
          
    }
    else if (FlagAlarm == true){
       //  session.userData['Alarms'] = false;
         //session.send("No issues");
         console.log("dont want to see alarms");
         session.userData['sendPendingRequest'] = true;
         console.log("dont want to see alarms 2");
         session.userData['sendPendingRequest'] = false;
         FlagAlarm = false;
         session.endDialog("No issues"); 
    }
    else if (FlagpendingRequest == true){
         
        // session.send("The node has a hardware failure");
         console.log("Opens the Order 88details page");
         session.userData['openOrdersPage'] = false;
         // done with case
       
         FlagpendingRequest = false;
         session.endDialog("Great!, How can I help you further"); 
          
    }
    // if (FlagC == true){
         
    //      //session.send("The node has a hardware failure");
    //      console.log("want to see alarms");
    //      //session.userData['OrdersPage'] = true;
          
    // }
    
    
         session.endDialog("Great! How can I help you further?");
    
    //session.endDialog('You are who you are because of what goes into your mind');
})
    
    .matches('Orders','Order1')
    .matches('Greeting', 'Greeting')
    .matches('NewRequest', 'NewRequest')
    .matches('TestEnvironment', 'TestEnvironment')
    .matches('Help','Help')
    .matches('ProjectName','ProjectName')
    .matches('Platform','Platform')
    .matches('ServicesDW','ServicesDW')   
    .matches('ServicesCR','ServicesCR')
    .matches('Open','Open')
    .matches('FinishRequest','FinishRequest')  
    .matches('ServicesSCM','ServicesSCM')
    .matches('Question2','Question2')
    .matches('stackCluster','stackCluster')
    .matches('Question','Question');  
      
bot.dialog('/', intents).onDefault(
    function(session){
        session.endDialog("I could not understand that! Could you please rephrase it?");
    }
);

bot.dialog('Greeting',[
	function(session){
        var greeting = greetings[Math.floor(Math.random()*greetings.length)];
       var msg = new builder.Message(session)
                            .text(greeting)
                            .textFormat("plain")
                            .textLocale("en-us")
                            .speak(ssml.speak(greeting))
                            .inputHint(builder.InputHint.acceptingInput);
       session.send(msg).endDialog();
       // session.say('Please hold while I calculate a response.', 
        //     'Please hold while I calculate a response.', 
        //     { inputHint: builder.InputHint.ignoringInput }
        // );
        // session.endDialog();
	}
]).triggerAction({
	matches: 'Greeting'
});


// bot.dialog('Question',[
//  function(session, args, next){
//         session.userData['servicespage'] = false;
//         console.log("first waterfall of Question");
//         builder.Prompts.choice(session, "Would you need to add any other services?",['Yes','No'],{ listStyle: builder.ListStyle.button });
//         // builder.Prompts.confirm(session, " Would you like to see the services available? ");
//         next();     
//  },
 
//  function(session, result, next){
//      session.replaceDialog('Question', { reprompt: true });
//      console.log("second waterfall of Question");
//  },
 
//  function(session,result){
//      deasync.loopwhile(function(){console.log('waiting..'); return result.response.length <= 0;});  
//      //if(result.hasOwnProperty('response')) {
//      console.log("last waterfall of Question", result.response);    
//          if(result.response) {
//              console.log("5");
//             session.userData['servicespage'] = true; // send UI team.
//             console.log("servicespage true");
     
//         }else{
//             console.log("6");
//             session.endDialog('No problem');   
   
//   }
//  }
     
// ]).triggerAction({
// 	matches: 'Question'
// });
bot.dialog('Question',[
    
 function(session,args){
     //session.userData['provision'] = false; 
     console.log("FlagprovisionYe3",FlagprovisionYes); 
     if(FlagprovisionYes == true){
            
          builder.Prompts.confirm(session,"We do have the capacity to provision this request. Would you want to provision it?");
     
     }else{
        
        // session.userData['dashboard'] = true;
         session.endDialog("No, We do not have the capacity to provision this request.");
         
     }},
          
    function (session,results,next){
        if(results.response){
        session.userData['provision'] = true; 
        
        session.endDialog('Sure, this will be done.');
        } else {
            console.log("is rejected");
            session.userData['provision'] = false;
            builder.Prompts.text(session, "Please provede the comments for rejecting the request");
            next();
            //session.endDialog('The request has been rejected');
        }        

        
     },
        
    function (session,results,next){
        session.userData['RejectedReason'] = results.response; 
        session.userData['RejectedSubmit']=true;
       // session.userData['dashboard'] = true;

        session.endDialog('The request has been rejected');
            
        // session.endDialog('The request has been provisioned');
    }

   
  
     
]).triggerAction({
	matches: 'Question'
});

//session.beginDialogue("Question2");
// bot.dialog('Question2',[
//  function(session){  
//      FlagG = true;
//       // builder.Prompts.confirm(session, " Would you like to see the services available? ");     
//       //session.send(greetServices);
//       var msg = new builder.Message(session)
//     .speak(greetServices)
//     .inputHint(builder.InputHint.acceptingInput);
// session.send(msg).endDialog();
//  },
 
//  function(session,result, next){ 
//      console.log(result.response);        
//          if(result.response) {
//             session.userData['servicespage'] = true; 
//        }else{
//             session.endDialog('No problem');   
//   } 
//   }
     
// ]).triggerAction({
// 	matches: 'Question2'
// });
// // bot.dialog('Greeting',[
//  function(session, args, next){
//      session.userData['servicespage'] = false;
//      if (Flag == false){
//         console.log("1");
//         console.log("Flag",Flag);
//         //builder.Prompts.text(session, "Hello Jack, welcome back to CREDO.");// Would you like to see the services available? ");
//         session.send("Hello Jack, welcome back to CREDO.");
//         next();
//     }else{
//         console.log("Flag",Flag);
//         console.log("2");
//         session.delay(5000);
//        builder.Prompts.confirm(session, " Would you like to see the service available? ");  
//        //Flag = false;
     
//      }},
//  function(session,result, next){    
//         if(result.hasOwnProperty('response')) {
//             if(result.response) {
//             console.log("3");
//             console.log("Flag",Flag);
//             session.userData['servicespage'] = true; // send UI team.
//             console.log("servicespage true");
//             }else{
//             session.endDialog('No problem'); 
//             }   
//         }else{
//             console.log("4");
//            builder.Prompts.confirm(session, " Would you like to see the services available? ");     
//  }},
 
//  function(session,result){  
//      if(result.hasOwnProperty('response')) {    
//          if(result.response) {
//              console.log("5");
//             session.userData['servicespage'] = true; // send UI team.
//             console.log("servicespage true");
     
//         }else{
//             console.log("6");
//             session.endDialog('No problem');   
//   } 
//   }
//  }
     
// ]).triggerAction({
// 	matches: 'Greeting'
// });

//Admin Page Dialogues CHAT

var provision = false;

var FinishedFlagEntity,ProjectEntity,UsersEntity,FinishEntity,WrongServiceEntity,ServicesEntity;
var DatesEntity = null;
var ServicesParams = [];
var Decision = 'No';
var WrongService1;
var i ,j,k,l,user,services1,project;         
var ServicesArray = [];
var UsersArray = [];
var ProjectArray = [];

// I want to create a new request with gerrit, gitlab and linux services
//PM ROLE CHAT
// Create a new request for allen for Project 1 from 8 august to 10 september with Gitlab and gerrit as services
 bot.dialog('NewRequest',[  
    function(session, args, next){
        session.userData['next'] = false;
         session.userData['create'] = false;
        session.userData['servicespage'] = true;
        session.userData['dashboard'] = false;
        
        session.userData['1'] = false;
        session.userData['budget1'] = false;
        session.privateConversationData.doneFlag = false;
        Decision = 'No';
        Decision2 = 'No';
        ServicesArray = [];
        CorrectService = [];
        UsersArray = [];
        ProjectArray = [];
        ProjectEntity = builder.EntityRecognizer.findEntity(args.entities, 'Project');
        UsersEntity = builder.EntityRecognizer.findEntity(args.entities, 'Users');
        DatesEntity = builder.EntityRecognizer.findEntity(args.entities, 'builtin.datetimeV2.daterange');
        ServicesEntity = builder.EntityRecognizer.findEntity(args.entities, 'Services');
        WrongServiceEntity = builder.EntityRecognizer.findEntity(args.entities, 'WrongService');

       // console.log("sai -->>",args.entities[0].resolution.values);

       // console.log("DatesEntity -->>",DatesEntity.entity);
       // console.log("UsersEntity -->>",UsersEntity.entity); 
         
        //  var startdate = new Date(args.entities[0].resolution.values[0].start); 
        //  var enddate = new Date(args.entities[0].resolution.values[0].end); 
      
      //console.log("today date2", date.toLocaleDateString());
      // console.log("today date2", startdate.getDate());
      
        //  console.log("today date", date );
        //  console.log("today2 date", startdate.getFullYear());
        //   console.log("today3 date", startdate.getMonth());
        //   console.log(startdate > date);
        //   console.log(enddate >= date);
        //var date = new Date();
        console.log('args: ', args);
        
        session.userData['ServicesTemp'] = args.entities;

         for (i in args.entities)
         {
             if (args.entities[i].type == 'Users'){
                user = args.entities[i].entity;
                console.log("DAATAA",user);
                
                UsersArray.push(user) ; 
                console.log("Users",UsersArray);
             }
         }
         session.userData['Users'] = UsersArray;
         
         for (j in args.entities)
         {
             if (args.entities[j].type == 'Services'){
                 services1 = args.entities[j].entity;            
                 console.log("Services",services1);
                 ServicesArray.push(services1) ;
                 
                console.log("Services2",ServicesArray);        
         }
         }
         session.userData['Services'] = ServicesArray;
       
        for (k in args.entities)
         {
             if (args.entities[k].type == 'Project'){
                 project = args.entities[k].entity;            
                 console.log("Project",project);
                 ProjectArray.push(project) ;
                 
                console.log("Project",ProjectArray);        
         }
         }
         session.userData['Project'] = ProjectArray;
         
         
          for (l in args.entities)
         {
             if (args.entities[l].type == 'builtin.datetimeV2.daterange'){
 
                session.userData['startdate']  = args.entities[l].resolution.values[l].start; 
                session.userData['enddate']   = args.entities[l].resolution.values[l].end; 
                           
                console.log("startdate",session.userData['startdate'] );
                console.log("enddate",session.userData['enddate'] );
     
         }
         }
         
       //  if(ProjectEntity !== null) session.userData['Project'] = ProjectEntity.entity;
         //if(DatesEntity !== null) session.userData['Dates']= DatesEntity.entity; 
         //console.log('ProjectEntity', ProjectEntity);
         
         // console.log('DatesEntity', DatesEntity);
         // console.log('args2: ', args.entities[i].type for i <= args.entities.length, 'mmmmmmmmmmmmmmmmmmmmmmmm');
        //  console.log('args: ', args, 'ServicesEntity', ServicesEntity);
        //  console.log('args: ', args, 'WrongServiceEntity', WrongServiceEntity);
 
        
        //if(UsersEntity !== null) session.userData['Users'] = UsersEntity.entity;
        
        //if(ServicesEntity !== null) session.userData['Services'] = ServicesEntity.entity;
        console.log("ffffffffffffffffsssssssffffffffff");
        
       //if(!(ServicesParams.Project && ServicesParams.Users && ServicesParams.Dates && ServicesParams.Services))
       if((ProjectEntity != null) && (UsersEntity != null) && (DatesEntity != null) && (ServicesEntity != null))
        {
        builder.Prompts.choice(session, "Would you need to add any additional services?",['Yes','No'],{ listStyle: builder.ListStyle.button });
        }
        next();
       },
        
       function(session,result, next){
       console.log("1");	   
       if(result.hasOwnProperty('response'))
            Decision = result.response;
            next();
	   },
       
       function(session,result, next){		 
        if(ProjectEntity == null)
            builder.Prompts.choice(session, "Can you please help me in assigning a project for the request from the below list",['Packet core', 'Network core platform', 'Mobile transport','Radio network'],{ listStyle: builder.ListStyle.button });
            next();
	     },	
      
       function(session,result, next){
        
        if(result.hasOwnProperty('response')) 
        {
         console.log("resultP",result.response.entity);   
         project =  result.response.entity;            
         console.log("Project2",project);
         ProjectArray.push(project) ;      
         session.userData['Project'] = ProjectArray;  
        //  session.userData['ProjectName'] = result.response;
          console.log("Pro",session.userData['Project']);
        }			 
		if(UsersEntity == null)
            builder.Prompts.choice(session, "Hey! Can you please mention the User for whome you would like to create the request for",['Sam', 'Alice','Jill'],{ listStyle: builder.ListStyle.button });
	       next();
	     },	
         
         
       function(session,result, next){
        
        if(result.hasOwnProperty('response'))
         {
         console.log("resultU",result.response.entity);       
        user = result.response.entity;
        console.log("USER 2",user);
        UsersArray.push(user) ; 
        session.userData['Users'] = UsersArray; 
        console.log("Users",session.userData['Users']);
        }	
           // session.userData['Users'] = result.response.entity;
            
        if(result.hasOwnProperty('reason')) {
            console.log("came 2 here");
            
            builder.Prompts.text(session, "Please select a valid start and an end date");
            	    
        }
        else if (DatesEntity == null)  {
            console.log("came 3 here");
            builder.Prompts.text(session, "Great! One last input, please specify the start and an end dates"); //.choice
        console.log("came 4 here");
       next();    
       
       
         }  console.log("came 5 here");next(); 
    },		 
    async function(session, result, next){
         
       // if(result.hasOwnProperty('reason')) { next({ resumed: builder.ResumeReason.back });
         console.log("came here");
        if(result.response){
            var date_invalid = false;
            console.log("001");
            var luisResponse = await axios.get('https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/cb2cc8ea-4199-49c6-9da9-f4d837812c48?subscription-key=6e252c545d8e4341859f19ff76d1faf4&verbose=true&timezoneOffset=0&q=' + result.response);   
            console.log("002");
            
            var args = luisResponse.data;
           
                if (args.entities.length> 0){ 
                    DatesEntity = null;
                    session.userData['Dates'] = args.entities;
                    console.log("DATES -->>",args.entities);
                    
                    DatesEntity = builder.EntityRecognizer.findEntity(args.entities, 'builtin.datetimeV2.daterange'); 
                    console.log("DATES 2 -->>",DatesEntity);
                    if (DatesEntity == null)   {   next({ resumed: builder.ResumeReason.back, reason: 'wrong' });          } 
                    console.log("DATES 3 -->>",DatesEntity);
                    for (l in args.entities)
                     {
                        if (args.entities[l].type == 'builtin.datetimeV2.daterange'){
 
                        session.userData['startdate']  = args.entities[l].resolution.values[l].start; 
                        session.userData['enddate']   = args.entities[l].resolution.values[l].end; 
                           
                        console.log("startdate",session.userData['startdate'] );
                        console.log("enddate",session.userData['enddate'] );
                     }
                     
         
                     
                     }                   
                   
        
        
       // console.log("start -->>",args.entities[0].resolution.values[0].start);
        //console.log("end -->>",args.entities[0].resolution.values[0].end);
        
         var currentdate = new Date();
         //var currentdate = date.toLocaleDateString();
         
         console.log("today date2",currentdate);
         var startdate = new Date(args.entities[0].resolution.values[0].start); 
         var enddate = new Date(args.entities[0].resolution.values[0].end); 
        // var startdate = startdate1.toLocaleDateString();
         //var enddate = enddate1.toLocaleDateString();
        console.log("start",startdate);
        console.log("end",enddate);
        console.log("current",currentdate);
        
        StartDay  = startdate.getDate();
        StartMonth= startdate.getMonth();
        StartYear = startdate.getFullYear();  
        
        EndDay  = enddate.getDate();
        EndMonth= enddate.getMonth();
        EndYear = enddate.getFullYear();
        
        CurrentDay  = currentdate.getDate();
        CurrentMonth= currentdate.getMonth();
        CurrentYear = currentdate.getFullYear();
        
        // console.log(startdate == currentdate);
        // console.log(startdate > currentdate);
        // console.log(enddate >= currentdate);
        
         date_invalid = false;
        
        
       // console.log("today date2", date.toLocaleDateString());
        

        // if (enddate > startdate) date_invalid = true ,session.send("date invalid 1");
        // else if ((startdate < currentdate) )  date_invalid = true, session.send("date invalid 2");
        
        if (EndYear < StartYear) date_invalid = true ,session.send("date invalid 1");
        else if ((EndYear == StartYear) && (( StartMonth - EndMonth )> 0))  date_invalid = true, session.send("date invalid 2");
        else if ((EndYear == StartYear) &&( EndMonth > StartMonth)&& ((StartDay - EndDay) > 0 ))date_invalid = true , session.send("date invalid 3");
        
        else if (CurrentYear > StartYear) date_invalid = true ,session.send("date invalid 4");
        else if ((CurrentYear == StartYear) && (( CurrentMonth - StartMonth   )> 0))  date_invalid = true, session.send("date invalid 5");
        else if ((CurrentYear == StartYear) &&( CurrentMonth == StartMonth)&& ((CurrentDay- StartDay) > 0) )date_invalid = true , session.send("date invalid 6");
                
       console.log("date invalid",date_invalid );
  
       if  (date_invalid == true) {     next({ resumed: builder.ResumeReason.back, reason: 'wrong' });
        }else{

                console.log("hi");
                next();
                }

                }
                console.log("brrrrrrrrrrrrr");
                next({ resumed: builder.ResumeReason.back, reason: 'wrong' });
                
               
                }
                console.log("3");next();
                }, 
   //// CHECK THIS PART ->>> GETTING OUTPUT FROM DATE FLAG ANGULAR
         
       // function(session,result, next){
           
        // write the code for statrt date here !!!!\
        //  async function(session, result, next){
        // if(result.response){
        //     console.log("01");
        //     var luisResponse = await axios.get('https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/cb2cc8ea-4199-49c6-9da9-f4d837812c48?subscription-key=6e252c545d8e4341859f19ff76d1faf4&verbose=true&timezoneOffset=0&q=' + result.response);
        //     console.log("02");
        //     var args = luisResponse.data;
        //     DatesEntity = builder.EntityRecognizer.findEntity(args.entities, 'builtin.datetimeV2.daterange');
            
           
        //     console.log("03"); 
        //     console.log(args.entities);
            
        //     console.log("04");
            
        //     console.log("2"+ typeof args);
        //     console.log(args.entities.length);
        //         if (args.entities.length> 0){ 
        //             session.userData['Dates'] = args.entities;
        //                 if(DateFlagStartCurrent==true)
        //                 if(DateFlagEndStart==true)
                            
        //         }else{
        //              next({ resumed: builder.ResumeReason.back });   
        //         }    
        
        
        
       // },
      //Done Flag is needed when the user selects NO when asked Do u want to select more services
      
      function(session,result, next){
         console.log("gdsfsdfdsfsdfdsf"); 
        if(result.hasOwnProperty('response')) ServicesParams.Dates = result.response.entity;
        
        console.log("decision",Decision); 
        if(Decision.entity == 'Yes'){
            session.userData['servicespage'] = true;
        	builder.Prompts.text(session, 'Please select the additional services you would like to add.'); 
        }//else if(ServicesEntity == null)
            	 
       // console.log('Finished? ', session.privateConversationData.doneFlag ? "Yes" : "No");
       //console.log('result came back / user given:', result);
        else if  ((ServicesEntity == null) && (!session.privateConversationData.doneFlag)) {
            session.userData['servicespage'] = true;
            builder.Prompts.text(session, 'Please select the services you would like to add.');
        }else{
            next();
        }
     },
     async function(session, result, next){

         if(result.hasOwnProperty('reason')) {
             console.log("Wrong option given");
             console.log("RESULT.RESPONSE",result);
         next({ resumed: builder.ResumeReason.back });
        }
         
        else{ console.log("first time");// comment this part and check
         
        if(result.response){
            console.log("001");
            var luisResponse = await axios.get('https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/cb2cc8ea-4199-49c6-9da9-f4d837812c48?subscription-key=6e252c545d8e4341859f19ff76d1faf4&verbose=true&timezoneOffset=0&q=' + result.response);
            console.log("002");
            var args = luisResponse.data;
            console.log("003A"); console.log("1");
            console.log("004");console.log(args.entities);console.log("2"+ typeof args);
            console.log(args.entities.length);
            DatesEntity = builder.EntityRecognizer.findEntity(args.entities, 'builtin.datetimeV2.daterange');
                if (args.entities.length> 0){ 
                   // ServicesEntity = builder.EntityRecognizer.findEntity(args.entities, 'Services');
                   // session.userData['Dates']= DatesEntity.entity;
                   // // console.log("saira",JSON.stringify(args.entities.resolution.values[0]));
                   // console.log("saira",JSON.stringify(args.entities.resolution.values[0]));
                  // console.log("sairaj2 -->>",args.entities[1].resolution.values);
                for (j in args.entities)
                                    {
                if (args.entities[j].type == 'Services'){
                    services1 = args.entities[j].entity;            
                    console.log("Services",services1);
                    ServicesArray.push(services1) ;
                 
                    console.log("Services2",ServicesArray);        
                  }
                 }
                    session.userData['Services'] = ServicesArray;
                   
                    console.log("005");
                FinishEntity = builder.EntityRecognizer.findEntity(args.entities, 'Finish');
                WrongServiceEntity = builder.EntityRecognizer.findEntity(args.entities, 'WrongService');

                    console.log("006");
                    console.log(WrongServiceEntity);
                    
                       if(WrongServiceEntity != null){    
                            WrongService1 = args.entity; 
                            console.log("007"); 
                            
                            //write switch condetion here
                                if (WrongService1 == "carrot"){
                                    CorrectService = ["Gerrit"];
                                    builder.Prompts.confirm(session, 'Were you planning to select Gerrit instead ?');
                                    console.log("008"); 
            
                                }}
                            console.log("010");
                      if(FinishEntity){
                            session.privateConversationData.doneFlag = true;
                            next({ resumed: builder.ResumeReason.back });
                      }
                      console.log("010");
                      //  next({ resumed: builder.ResumeReason.back });}}
                      builder.Prompts.choice(session, "Would you need to add any other services?",['Yes','No'],{ listStyle: builder.ListStyle.button });
                     
               }else{
                   console.log("011");
                   session.send("The mentioned service is not applicable");
                   next({ resumed: builder.ResumeReason.back});}   
        }else{

                console.log("hi");
                next();
                }
        
        }  },            
        
        
      function(session, result, next){
          console.log("checking",result.response);
          if(result.hasOwnProperty('response')){
               if(result.response.entity == 'Yes'){
                    Decision2 = result.response.entity;
                    console.log("decision2",Decision2);
                    
                    next({ resumed: builder.ResumeReason.back, reason: 'Add More' });
               };
               if(result.response.entity == 'No'){
                   console.log("88");
                    next(); 
               };
               if((result.response) && (CorrectService == ["Gerrit"])){
                    console.log("01A");
                    session.userData['Services'] = "Gerrit"; // should add CorrectService
                            
                    
                    
                    next({ resumed: builder.ResumeReason.back, reason: 'wrong' });           
                            
                }
          }else{
                    console.log("02A");
                // next({ resumed: builder.ResumeReason.back });
                next();
                 }    
                },
    
                 
                // }else{
                //       next({ resumed: builder.ResumeReason.back });
                //        console.log("009");
                //  }    

    function(session,result,next){
        session.userData['next'] = true;
        builder.Prompts.confirm(session, 'Here is the summary page, are we ready to place this order?');
        
     },
        
    function(session,result,next){
       
        if(result.response){
            
            session.userData['create'] = true;
          //session.delay('2000');
            session.userData['budget1'] = true;
            session.endDialog('A new request has been created!');
            
            /*  send event to back end asking for the following response
            
            Bot: By the way, the project budget has reached 95% of the allocated budget.
            Bot: You would need to reach out to Alex for additional budget.
            User: Sure, Thanks!

            */
                        
        }else{
            session.userData['create'] = false;
            session.userData['dashboard'] = true; 
            session.endDialog("Redirecting to the dashboard ...");  
        }   
        
     }
 ]).beginDialogAction("Open", "Open", {
    matches: "Open"});


// .beginDialogAction("FinishRequest", "FinishRequest", {
//     matches: "FinishRequest"    
// });



 bot.dialog('Open',[     
     
    function (session, args, next) {
        //  session.userData['OpenDevOps'] = false;
        //  session.userData['ApplicationServices'] = false;
        //  session.userData['AnalyticsServices'] = false;
        //  session.userData['DeveloperWorkstation'] = false;
        //  session.userData['MLFramework'] = false;
         
         
         var DevOpsToolsEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'DevOpsTools');
         var ApplicationServicesEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'ApplicationServices');
         var AnalyticsServicesEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'AnalyticsServices');
         var DeveloperWorkstationEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'DeveloperWorkstation');
         var MLFrameworkEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'MLFramework');
         

       	 
		 if(DevOpsToolsEntity !== null )
            session.userData['OpenDevOps'] = true; //session.send("a");
         else if(ApplicationServicesEntity !== null)
            session.userData['ApplicationServices'] = true;//,session.send("b");
         else if(AnalyticsServicesEntity !== null)
            session.userData['AnalyticsServices'] = true;//,session.send("c");
         else if(DeveloperWorkstationEntity !== null)
            session.userData['DeveloperWorkstation'] = true;//,session.send("d");
         else if(MLFrameworkEntity !== null)
            session.userData['MLFramework'] = true;//,session.send("e");            
         console.log(session.userData['MLFramework']);   
           // builder.Prompts.text(session, "Which order are you looking to provision?:"); 
            session.endDialog();
    },
     
]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
bot.dialog('Order1',[

     
    function(session, args,next){
        console.log("Flagprovision111111111"); 
       // FlagprovisionYes = null;
        
      
      // session.userData['openOrdersPage'] = true;
        console.log("FlagprovisionYes2",FlagprovisionYes); 
      //  session.send("let me check");
        console.log("Flagprovision2222"); 
      //  session.delay(1000);
         session.delay('5000');
        session.beginDialog('Question');
    //   deasync.loopWhile(function(){console.log('waiting..'); return FlagprovisionYes == null;});  
    //  console.log("FlagprovisionYes3",FlagprovisionYes); 
    //  if(FlagprovisionYes == true){
            
    //       builder.Prompts.confirm(session,"We do have the capacity to provision this request. Would you want to provision it?");
     
    //  }else{
        
    //     // session.userData['dashboard'] = true;
    //      session.endDialog("No, We do not have the capacity to provision this request.");
         
    //  }},
          
    // function (session,results,next){
    //     if(results.response){
    //     session.userData['provision'] = true; 
    //     session.endDialog('Sure, this will be done.');
    //     } else {
    //         console.log("is rejected");
    //         session.userData['provision'] = false;
    //         builder.Prompts.text(session, "Please provede the comments for rejecting the request");
    //         next();
    //         //session.endDialog('The request has been rejected');
    //     }        

        
    //  },
        
    // function (session,results,next){
    //     session.userData['RejectedReason'] = results.response; 
    //     session.userData['RejectedSubmit']=true;
    //    // session.userData['dashboard'] = true;

    //     session.endDialog('The request has been rejected');
            
    //     // session.endDialog('The request has been provisioned');
    // }
    }]);
  
  
    bot.dialog('stackCluster',[ 
    function(session, args, next){
        session.send("Absolutely!");
        session.userData['stackCluster'] = true; 
         session.endDialog();
         }]);





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


bot.use({
    receive: function (session, next) {
        console.log(session);
        session.send(); // it doesn't work without this..
        session.sendTyping();
        next();
   },
    
send: function (event, next) {    
        // https://stackoverflow.com/a/48197096
    bot.loadSession(event.address, function (error,session){
        if(session !== null && event.type === 'message'){
        // console.log('session.userData', session.userData, 'event inside:', event);
        console.log("--===####%%% event in middleware", event);
        var reply = createEvent("provision", session.userData, event.address);
      //  event['speak'] = ssml.speak(event.text); 
        session.send(reply);
    }
        session.userData = {};// changes done by
        session.save();// changes done by
    });
        
        next();
    }
});

var username = "srichakradhar", old_username = "srichakradhar", username_updated = false;
//Bot listening for inbound backchannel events - in this case it only listens for events named "buttonClicked"
bot.on("event", function (event) {
  
    console.log("Bot connected to EEAASS UI");
    var msg = new builder.Message().address(event.address);
    msg.textLocale("en-us");
    if (event.name === "buttonClicked") {
        msg.text("I see that you just pushed that button");
        bot.send(msg);
    }else if (event.name === "greetServicesEvent") {
        console.log("greetServicesEvent");
        greetServices = event.value['greetServices'];
     //   FlagG = true;
        msg.text(greetServices);
         bot.send(msg);
        console.log("Greeting");
      //bot.beginDialog(event.address, 'Greeting');
    }
    else if (event.name === "alarmEvent") {
      console.log("alarmEvent");
      alarm = event.value['alarm'];
        
       FlagAlarm = true;
        
        msg.text(alarm);
       //  Node <<five>> is down. Would you like to see the latest alarms on this node?
        bot.send(msg);
        console.log(alarm);
        console.log("alarm");
      // bot.beginDialog(event.address, 'Question');
    }
    else if (event.name === "pendingRequestEvent") {
      console.log("pendingRequest2222222222222222222");
      pendingRequestList = event.value['pendingRequest'];
        
       FlagpendingRequest = true;
    console.log("pendingRequest");    
        msg.text(pendingRequestList);  
        bot.send(msg);
    console.log("pendingRequest222");
    
    //There is a new pending request from project Packet Core. Can I bring up the details for you?
      // bot.beginDialog(event.address, 'Question');
    }
    
     else if (event.name === "provisionYesEvent") {
      console.log("provisionYesEvent");
      provisionYes = event.value['provisionYes'];
        
       FlagprovisionYes = true;
      console.log("FlagprovisionYes1",FlagprovisionYes);  
        msg.text(provisionYes);  
         bot.send(msg);
        console.log(provisionYes);
      // bot.beginDialog(event.address, 'Question');
    }
     else if (event.name === "provisionNoEvent") {
      console.log("provisionNo");
      provisionNo = event.value['provisionNo'];
        
       FlagprovisionNo = true;
        
       
        console.log(provisionNo);
      // bot.beginDialog(event.address, 'Question');
    }
        else if (event.name === "capacityEvent") {
      console.log("capacity");
      capacity = event.value['capacity'];
        
       Flagcapacity = true;
        
        msg.text(capacity);  
        bot.send(msg);
        console.log(capacity);
      // bot.beginDialog(event.address, 'Question');
    }
    
     else if (event.name === "budgetEvent") {
      console.log("budget");
      budget2 = event.value['budget'];
        
      // FlagF = true;
        
        msg.text(budget2);  
        bot.send(msg);
       // console.log(budget2);
      // bot.beginDialog(event.address, 'Question');
    }
     
    
    else if (event.name === "userLogin") {
        console.log("userLogin event received at the bot");
        userWelcomed = false;
        username = event.value['username'];
        if(old_username != username){
            username_updated = true;
    }
        helloCount = event.value['helloCount'];
        var reply = createEvent("botStarted", {botInitiated: false, 'helloCount': helloCount}, event.address);
        if(helloCount == 0){
            bot.send(reply);
            helloCount++;
    }
        // msg.text("Hi " + username.charAt(0).toUpperCase() + username.substring(1) + "!"  + "\n I am Pal, the PLM Bot.");
        msg.text("Hi!");
        old_username = username;
        bot.send(msg);
       
       // bot.beginDialog(event.address, 'Help');
     }//else if (event.name === "capacityEvent") {
     //     console.log("capacityyyyyyyyyyyyyyyy")
    //     capacity = event.value['capacity'];
   //     msg.text("capacityyyyyyyyyyyyyyy", capacity);
  //     bot.send(msg);
 // }
});

//Creates a backchannel event
const createEvent = (eventName, value, address) => {
    var msg = new builder.Message().address(address);
    msg.data.type = "event";
    msg.data.name = eventName;
    msg.data.value = value;
    return msg;
};