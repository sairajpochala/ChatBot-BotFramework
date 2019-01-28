/* global DecisionT */
/* global CorrectService */
/* global Flag */
var CorrectService;
Flag = false;
DecisionT=false;

// /*-----------------------------------------------------------------------------
// A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
// -----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var deasync = require('deasync');
var axios = require('axios');
var IMSEntity;

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
                 'Hi .I\'m Champ - the  EEAAS bot at your service.'];
                 
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
var regExOk = new builder.RegExpRecognizer('OK', /.*ok|okay|k|no.*/i);
var regExgoodBye = new builder.RegExpRecognizer('Bye', /.*bye|good bye|thats it|no need|nothing.*/i);
var regExHwRU = new builder.RegExpRecognizer('How are you', /.*how are you.*/i); 
var regExThx = new builder.RegExpRecognizer('Thank You', /.*thank( you|s)|no thanks|great.*/i); 
var regExWhoRU = new builder.RegExpRecognizer('Who are you', /.*who are you|what ?i?'?s your name.*/i); 
var regExWhoAmI = new builder.RegExpRecognizer('Who am I', /.*who am i.*/i); 
var regWSup = new builder.RegExpRecognizer('Whatsup', /.*wh?at?'?s ?s?up.*/i);
var regILU = new builder.RegExpRecognizer('I Love You', /.*i love you.*/i);
var regULM = new builder.RegExpRecognizer('Love me', /.*you love me.*/i);
var regExJoke = new builder.RegExpRecognizer('Joke', /.*a joke.*/i);
    
var intents = new builder.IntentDialog({ recognizers:[recognizer,regExJoke,regExHwRU,regExWhoRU,regExWhoAmI,regWSup,regILU,regULM,regExOk, regExgoodBye]})     
              
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
    
    .matches('Orders','Orders')
    .matches('Greeting', 'Greeting')
    .matches('NewRequest', 'NewRequest')
    .matches('TestEnvironment', 'TestEnvironment')
    .matches('Help','Help')
    .matches('ProjectName','ProjectName')
    .matches('StartDate','StartDate')
    .matches('EndDate','EndDate')
    .matches('Platform','Platform')
    .matches('ServicesDW','ServicesDW')   
    .matches('ServicesCR','ServicesCR')
    .matches('Open','Open')
    .matches('FinishRequest','FinishRequest')  
    .matches('ServicesSCM','ServicesSCM');
    
    
    
    
      
bot.dialog('/', intents).onDefault(
    function(session){
        session.endDialog("I could not understand that! Could you please rephrase it?");
    }
);

//Greeting Dialog
// bot.dialog('Greeting',[
// 	function(session){
// 	   session.endDialog(greetings[Math.floor(Math.random()*greetings.length)]);
// 	}
// ]).triggerAction({
// 	matches: 'Greeting'
// });


bot.dialog('Greeting',[
 function(session, args, next){
     session.userData['servicespage'] = false;
     if (Flag == false){
        builder.Prompts.text(session, "Hello Jack, welcome back to CREDO.");// Would you like to see the services available? ");
        next();
    }else{
       builder.Prompts.confirm(session, " Would you like to see the services available? ");  
       Flag = false;
     
     }},
 function(session,result, next){    
      builder.Prompts.confirm(session, " Would you like to see the services available? ");     
 },
 
 function(session,result, next){ 
     console.log(result.response);        
         if(result.response) {
            session.userData['servicespage'] = true; // send UI team.
     
        }else{
            session.endDialog('No problem');   
  } 
  }
     
]).triggerAction({
	matches: 'Greeting'
});

//Admin Page Dialogues CHAT

var provision = false;
var DatesEntity;        
// I want to create a new request with gerrit, gitlab and linux services
//PM ROLE CHAT
// Create a new request for allen for Project 1 from 8 august to 10 september with Gitlab and gerrit as services
 bot.dialog('NewRequest',[
    function(session, args, next){
        
        var date_invalid = false;
        IMSEntity   = builder.EntityRecognizer.findEntity(args.entities, 'IMS'); 
        DatesEntity = builder.EntityRecognizer.findEntity(args.entities, 'builtin.datetimeV2.daterange');
        
        console.log("start -->>",args.entities[0].resolution.values[0].start);
        console.log("end -->>",args.entities[0].resolution.values[0].end);
        
        var startdate = args.entities[0].resolution.values[0].start;
        var enddate = args.entities[0].resolution.values[0].end;
        
        var currentdate = new Date();
        
        console.log(startdate > currentdate);
        console.log(enddate >= currentdate);
        
        if (enddate > startdate) date_invalid = true ,session.send("date invalid 1");
        else if ((startdate < currentdate) )  date_invalid = true, session.send("date invalid 2");

        
        if( (DatesEntity != null) && (date_invalid = false))
        {
        builder.Prompts.choice(session, "Should I go ahead and reserve the IMS Test Topologyt?",['Yes','No'],{ listStyle: builder.ListStyle.button });
        }
        
        next();
       },
        
    function(session,result, next){
       console.log("1");	   
       if(result.hasOwnProperty('response'))
            DecisionT = result.response.entity;
            next();
	   },
       
    
    function(session,result, next){
       if(result.hasOwnProperty('reason')) {
            builder.Prompts.text(session, "Please select a valid start and end date");	    
       } else if (DatesEntity!==null){
            builder.Prompts.text(session, "Please select the start and end dates"); //.choice
         }
    },
    /////
    
    async function(session, result, next){
         
         if(result.hasOwnProperty('reason')) {
         next({ resumed: builder.ResumeReason.back });
         
        if(result.response){
            var date_invalid = false;
            console.log("001");
            var luisResponse = await axios.get('https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/cb2cc8ea-4199-49c6-9da9-f4d837812c48?subscription-key=6e252c545d8e4341859f19ff76d1faf4&verbose=true&timezoneOffset=0&q=' + result.response);
            console.log("002");
            
            var args = luisResponse.data;
           
             console.log("1");

                console.log("2"+ typeof args);

                if (args.entities.length> 0){ 
            
                    session.userData['Dates'] = args.entities;

                   console.log("sairaj2 -->>",args.entities[1].resolution.values);

                   console.log("DATA2 -->>",args.entities);
                   
        DatesEntity = builder.EntityRecognizer.findEntity(args.entities, 'builtin.datetimeV2.daterange');
        
        console.log("start -->>",args.entities[0].resolution.values[0].start);
        console.log("end -->>",args.entities[0].resolution.values[0].end);
        
        var startdate = args.entities[0].resolution.values[0].start;
        var enddate = args.entities[0].resolution.values[0].end;
        
        var currentdate = new Date();
        
        console.log(startdate > currentdate);
        console.log(enddate >= currentdate);
        
        if (enddate > startdate) date_invalid = true ,session.send("date invalid 1");
        else if ((startdate < currentdate) )  date_invalid = true, session.send("date invalid 2");
        
        
        if  (date_invalid = true) {     next({ resumed: builder.ResumeReason.back, reason: 'wrong' });
        }else{

                console.log("hi");
                next();
                }
        
                }}}},   
    
    ////////////
    //////////////////////    
    
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
       // builder.Prompts.choice(session, "Please specify the Build Version of the Environment",['Version 1','Version 1.2','Version 1.3'],{ listStyle: builder.ListStyle.button });
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
]);



// .beginDialogAction("FinishRequest", "FinishRequest", {
//     matches: "FinishRequest"    
// });

bot.dialog('Open', require('./dialogs/onselectactiondialog'));
//


bot.use({
    receive: function (session, next) {
    session.send(); // it doesn't work without this..
    session.sendTyping();
    next();
   },
    
send: function (event, next) {    
        // https://stackoverflow.com/a/48197096
    bot.loadSession(event.address, function (error,session){
        if(session !== null && event.type === 'message'){
        // console.log('session.userData', session.userData, 'event inside:', event);
        // console.log(session.userData);
        var reply = createEvent("provision", session.userData, event.address);
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
  
    console.log("sai");
    var msg = new builder.Message().address(event.address);
    msg.textLocale("en-us");
    if (event.name === "buttonClicked") {
        msg.text("I see that you just pushed that button");
        bot.send(msg);
    }else if (event.name === "AEvent") {
        console.log("capacity1");
        capacity = event.value['A'];
        
        Flag = true;
        
        msg.text(capacity);
        bot.send(msg); // Bot: Hi Jill! The test execution for the EPC suite is completed. 48 test cases have passed and 2 test cases have failed.
        bot.beginDialog(event.address, 'Greeting',Flag);
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
        }});
        // bot.beginDialog(event.address, 'Help');
     //else if (event.name === "capacityEvent") {
    //     console.log("capacityyyyyyyyyyyyyyyy")
    //     capacity = event.value['capacity'];
    //     msg.text("capacityyyyyyyyyyyyyyy", capacity);
    //     bot.send(msg);
    // }

//Creates a backchannel event
const createEvent = (eventName, value, address) => {
    var msg = new builder.Message().address(address);
    msg.data.type = "event";
    msg.data.name = eventName;
    msg.data.value = value;
    return msg;
};
