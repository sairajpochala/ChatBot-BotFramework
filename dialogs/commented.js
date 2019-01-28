            var args = luisResponse.data;
            //session.send(args.entities);
            session.send("003A"); console.log("1");
            //ServicesEntity = builder.EntityRecognizer.findEntity(args.entities, 'Services');
            //session.userData['Services'] = ServicesEntity;
            session.send("004");console.log(args.entities); 
            session.userData['Services'] = args.entities;
            session.send("005");
            FinishEntity = builder.EntityRecognizer.findEntity(args.entities, 'Finish');
          //  console.log('args: ', args.entities, 'ServicesEntity', ServicesEntity);
            session.send("006");
           //// console.log('args: ', args.entities, 'FinishEntity', FinishEntity);
            //// FinishedFlagEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Finish');
            //// console.log('FinishedFlagEntity', FinishedFlagEntity);
            if(FinishEntity){
                session.privateConversationData.doneFlag = true;
                next({ resumed: builder.ResumeReason.back });
                }else{
            //  console.log("conv data",session.privateConversationData);   
            // console.log("ITS PRINTING");
            //ServicesParams.Services = ServicesEntity.entity;
            session.send("007");
            next({ resumed: builder.ResumeReason.back });}




        }else{
           //next({ resumed: builder.ResumeReason.back }); 
            // console.log("new_request.js privateConversationData in else: ", session.privateConversationData);
            // console.log(ServicesParams);
            // console.log(typeof(ServicesParams));
            // console.log((ServicesParams.Services));
            // if (ServicesParams.Services.includes( "Tensor flow", "Paddle Paddle", "mxnet")){  
            //     console.log("1st Part");
            //     if (ServicesParams.includes("AMDFirepro" , "AMDVega" ,"Nvidia" , "Geforce")){
            //         console.log("2nd Part");
            //     session.endDialog("bue");

            //     }else{
            //         session.send("Please select the Mandatory services");
            //         session.privateConversationData.doneFlag = false;
            //         next({ resumed: builder.ResumeReason.back }); }
            // }else{
                //session.endDialog("ced");
                console.log("hi");
                next();
                }
        
        },     
        
        
        
        
        
        
        
        
        
        
        
        
        
















































// bot.dialog('/intent', intent.dialog)
//     .cancelAction('cancelIntent', 'Cancelled.', {
//         matches: cancelKeywords,
//         confirmPrompt: 'Are you sure you want to cancel?',
//         onSelectAction: function (session, args, next) { doSomething; }
//     });
 
//i want to create a new request for ubuntu,collaborator and gitlab

// var ServicesParams = {};
// var availableServicesDW = ['windows', 'linux', 'ubuntu'];
// var availableServicesCR = ['A', 'B', 'C'];
// var availableServicesSCM = ['D', 'E', 'F'];
// var ServicesDWEntity, ServicesCREntity, ServicesSCMEntity;
// bot.dialog('NewRequest', [
         
//       function (session, args, next) {
        
//         console.log('args', args);
//         ServicesDWEntity = builder.EntityRecognizer.findEntity(args.entities, 'ServicesDW');
//         ServicesCREntity = builder.EntityRecognizer.findEntity(args.entities, 'ServicesCR');
//         ServicesSCMEntity = builder.EntityRecognizer.findEntity(args.entities, 'ServicesSCM');
        
//         if(ServicesDWEntity !== null) ServicesParams.ServicesDW = ServicesDWEntity.entity;
//         next();
        
//         // if(ServicesDWEntity == null)
//         //     builder.Prompts.text(session, 'Which service do you want to provision for Developer Workstation');
//         // else{
//         //     ServicesParams.ServicesDW = ServicesDWEntity.entity;
//         //     next();
//         // }
        
//     },
    
//     function(session,result, next){
        
//         if(result.hasOwnProperty('response')) ServicesParams.ServicesDW = result.response;
//         if(ServicesCREntity !== null) ServicesParams.ServicesCR = ServicesCREntity.entity;
//         next();
        
//         // if(ServicesCREntity == null){
//         //     builder.Prompts.text(session, 'Which service do you want to provision for Code Review');
//         // }else{
//         //     ServicesParams.ServicesCR = ServicesCREntity.entity;
//         //     next();
//         // }
  
//     },
    
//     function(session,result, next){
        
//         if(result.hasOwnProperty('response')) ServicesParams.ServicesCR = result.response; 
//         if(ServicesSCMEntity !== null) ServicesParams.ServicesSCM = ServicesSCMEntity.entity;
//         next();
        
//         // if(ServicesSCMEntity == null){
//         //     builder.Prompts.text(session, 'Which service do you want to provision for Source Code Management');
//         // }else{
//         //     ServicesParams.ServicesSCM = ServicesSCMEntity.entity;
//         //     next();
//         // }
  
//     },
    
//     function(session,result){
        
//         if(result.hasOwnProperty('response')) ServicesParams.ServicesSCM = result.response;
        
//         console.log('ServicesParams.ServicesSCM === undefined: ', ServicesParams.ServicesSCM === undefined);
//         console.log('ServicesParams.ServicesDW === undefined: ', ServicesParams.ServicesDW === undefined);
//         console.log('ServicesParams.ServicesCR === undefined: ', ServicesParams.ServicesCR === undefined);
        
//         session.endDialog(JSON.stringify(ServicesParams));
        
//         session.endDialog("Your request for these resources has been successfully recorded:" +
//             ServicesParams.ServicesDW === undefined ? "" : "\nDeveloper Workstation : " + ServicesParams.ServicesDW + 
//             ServicesParams.ServicesCR === undefined ? "" : "\nCode Review : " + ServicesParams.ServicesCR + 
//             ServicesParams.ServicesSCM === undefined ? "" : "\nSource Code Management : " + ServicesParams.ServicesSCM);
  
//     }]);



// Admin Screen notification for critical events (Disk space used beyond particular point)




//





// if(Decision == 'No') {
	
    
   // /////////////////////////////////////////////////////////// // //
    // function(session,result, next){
        
    //     if(result.hasOwnProperty('response')) ServicesParams.ServicesDW = result.response;
    //     if(ServicesCREntity !== null) ServicesParams.ServicesCR = ServicesCREntity.entity;
    //     next();
        
    //     // if(ServicesCREntity == null){
    //     //     builder.Prompts.text(session, 'Which service do you want to provision for Code Review');
    //     // }else{
    //     //     ServicesParams.ServicesCR = ServicesCREntity.entity;
    //     //     next();
    //     // }
  
    // },
    
    // function(session,result, next){
        
    //     if(result.hasOwnProperty('response')) ServicesParams.ServicesCR = result.response; 
    //     if(ServicesSCMEntity !== null) ServicesParams.ServicesSCM = ServicesSCMEntity.entity;
    //     next();
        
    //     // if(ServicesSCMEntity == null){
    //     //     builder.Prompts.text(session, 'Which service do you want to provision for Source Code Management');
    //     // }else{
    //     //     ServicesParams.ServicesSCM = ServicesSCMEntity.entity;
    //     //     next();
    //     // }
  
    // },
    
    
    
    var availableServicesDW = ['windows', 'linux', 'ubuntu'];
var availableServicesCR = ['colaborator', 'gerrit']; 
var availableServicesSCM = ['gitlab', 'subversion'];
var availableServicesCI = ['jenkins', 'travis ci','bamboo'];
var availableServicesPM = ['redmine', 'open project'];
    
    
    
    //////////////////////////////////////////////////////////////////////
    
    
    
    
    
   // }]);
 
     
     
     
// //     //  function(session,result){
// //     //     servicesChoosen += result.response + '\n';
// //     //     session.userData['Services'] = result.response;
// //     //     builder.Prompts.text(session, result.response + ' selected.');//ask
// //     //  },
     
// //     //  function(session,result){
// //     //     servicesChoosen += result.response + '\n';
// //     //      if(availableServicesCR.includes(result.response)){
// //     //      session.userData['Services'] = result.response;
        
// //     //     builder.Prompts.text(session, result.response + ' selected.');
// //     //     }else{
// //     //     output = 'Sorry. This service is not available in our system. Please provide the service correctly.';
        
    
// //     //     session.send(output);
// //     //     session.dialogData.output = output;            
// //     //         session.endDialog('Okay');   
// //     //     }
// //     //     // session.userData['Services'] = result.response;
// //     //     // builder.Prompts.text(session, result.response + ' selected.');
// //     //  },
// //     //  function(session,result){
// //     //     servicesChoosen += result.response + '\n';
             
// //     //    // session.userData['Services'] = result.response;
// //     //     //  builder.Prompts.text(session, result.response + ' selected.');
// //     //     builder.Prompts.choice(session, "Which service?", ['jenkins', 'travis ci','bamboo']);
// //     //  },
     
// //     //  function(session,result){
// //     //     servicesChoosen += result.response + '\n';
// //     //     session.userData['Services'] = result.response;
// //     //     builder.Prompts.text(session, result.response + ' selected.');
// //     //  },
     
     
// ]).triggerAction({
//     matches: /^open/i,
//     onSelectAction: (session, args, next) => {
//         // Add the help dialog to the top of the dialog stack 
//         // (override the default behavior of replacing the stack)
//         session.beginDialog(args.action, args);
//     }
// });
//];



    // .triggerAction({
    // matches: "Open",
    // onSelectAction: (session, args, next) => {
    //     // Add the help dialog to the top of the dialog stack 
    //     // (override the default behavior of replacing the stack)
    //   session.beginDialog(args.action, args, next);
        // next(args); // won't need this - just playing
    // }
    // });
// ]);  

// .triggerAction({
//     matches: /^open$/i,
//     onSelectAction: (session, args, next) => {
//         // Add the help dialog to the top of the dialog stack 
//         // (override the default behavior of replacing the stack)
//         session.beginDialog(args.action, args);
//     }
// });


https://eess.scm.azurewebsites.net/dev/wwwroot/dialogs/new_request.js





var builder = require('botbuilder');

var ServicesParams = {};
var Decision = 'No';
var StartDay,EndDay,StartYear,EndYear,StartMonth,EndMonth;

//PM ROLE CHAT
var servicesChoosen = '\n';
var ServicesDWEntity, ServicesCREntity, ServicesSCMEntity, ServicesCIEntity, ServicesPMEntity;

module.exports = [
    
    function(session, args, next){
        session.userData['next'] = false;
        session.userData['create'] = false;
        builder.Prompts.text(session,"Please provide the name of the Project");
    },
    
    function(session,result, next){
        console.log('result came back / user given:', result);
        session.userData['Project Name'] = result.response; // check this one!
        builder.Prompts.text(session,"Do you want to provision this on Virtual Machine or a Container platform")  ;
    },
    function(session,result, next){
        session.userData['Platform'] = result.response;
        builder.Prompts.text(session,"Plese select the Delivery Location")  ;
        
    },
    function(session,result, next){
        session.userData['Delivery'] = result.response;
        builder.Prompts.text(session,"Select the Users from whome you want to provision the request")  ;
    },
    function(session,result, next){
        session.userData['Users'] = result.response; // check this one
        try{
            builder.Prompts.time(session,"If you could please provide the Start date for the request");
        }catch (e){
            console.log('error while capturing time:', e.message);
            builder.Prompts.time(session,"If you could please provide the Start date for the request");
        }
    },
    
    function(session,result, next){  
        if(result.hasOwnProperty('response')){
            session.userData['Start Date'] = builder.EntityRecognizer.resolveTime([result.response]);
            StartDay  = `${session.userData['Start Date'].getDate()}`;
            StartMonth=`${session.userData['Start Date'].getMonth()}`;
            StartYear = `${session.userData['Start Date'].getFullYear()}`;
            
            session. send(`${session.userData['Start Date'].getDate()}`);   
            session. send(`${session.userData['Start Date'].getMonth()}`);             
            session. send(`${session.userData['Start Date'].getFullYear()}`);
        
            builder.Prompts.time(session, "If you could please provide the end date for the request");
       }else {
            builder.Prompts.time(session, "Please provide an End date greater than the Start Date");
      }
  
    },
    
    function(session,result,next){
        //servicesChoosen = '\n';
        session.userData['End Date'] = builder.EntityRecognizer.resolveTime([result.response]);
        
        EndDay  = `${session.userData['End Date'].getDate()}`;
        EndMonth=`${session.userData['End Date'].getMonth()}`;
        EndYear = `${session.userData['End Date'].getFullYear()}`;
        session. send(`${session.userData['End Date'].getDate()}`);   
        session. send(`${session.userData['End Date'].getMonth()}`);             
        session. send(`${session.userData['End Date'].getFullYear()}`);   
        
        //session.send(`EndYear: ${EndYear}\nStartYear: ${StartYear}\nValid: ${EndYear > StartYear}\nEndMonth: ${EndMonth}\nStartMonth: ${StartMonth}\nValid: ${EndMonth > StartMonth}\nEndDay: ${EndDay}\nStartDay: ${StartDay}\nValid: ${EndDay > StartDay}`);
        // EndYear > StartYear ? ( EndMonth > StartMonth ? (EndDay > StartDay ? next({ resumed: builder.ResumeReason.back }) : next() ) : next() ) : 
      
        var date_invalid = false;
      
        if (EndYear < StartYear) date_invalid = true ;
            else if (EndYear == StartYear) { 
                if (EndMonth < StartMonth)  date_invalid = true;
                else if (EndMonth == StartMonth) {
                    if ((StartDay - EndDay) > 0 ) date_invalid = true ;
                     }
      }
      
      // date_invalid = EndYear < StartYear ? true : 
        //                 ( EndYear == StartYear ? ( EndMonth < StartMonth ? true : 
        //                     (EndMonth == StartMonth ? (EndDay < StartDay): false )) : false );
      
        if (date_invalid) next({ resumed: builder.ResumeReason.back });
        else builder.Prompts.text(session,'Please select the services you would like to add.');

    },
     
    async function (session, result, next) {
        
        var luisResponse = await axios.get('https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/cb2cc8ea-4199-49c6-9da9-f4d837812c48?subscription-key=6e252c545d8e4341859f19ff76d1faf4&verbose=true&timezoneOffset=0&q=' + result.response);
        var args = luisResponse.data;
        
        ServicesDWEntity = builder.EntityRecognizer.findEntity(args.entities, 'ServicesDW');
        ServicesCREntity = builder.EntityRecognizer.findEntity(args.entities, 'ServicesCR');
        ServicesSCMEntity = builder.EntityRecognizer.findEntity(args.entities, 'ServicesSCM');
        ServicesCIEntity = builder.EntityRecognizer.findEntity(args.entities, 'ServicesCI');
        ServicesPMEntity = builder.EntityRecognizer.findEntity(args.entities, 'ServicesPM');
                        
        console.log('args: ', args, 'ServicesDWEntity', ServicesDWEntity);

        if(ServicesDWEntity !== null) ServicesParams.ServicesDW = ServicesDWEntity.entity;
        if(ServicesCREntity !== null) ServicesParams.ServicesCR = ServicesCREntity.entity;
        if(ServicesSCMEntity !== null) ServicesParams.ServicesSCM = ServicesSCMEntity.entity;
        if(ServicesCIEntity !== null) ServicesParams.ServicesCI = ServicesCIEntity.entity;
        if(ServicesPMEntity !== null) ServicesParams.ServicesPM = ServicesPMEntity.entity;
        
       if(!(ServicesParams.ServicesDW && ServicesParams.ServicesCR && ServicesParams.ServicesSCM && ServicesParams.ServicesCI && ServicesParams.ServicesPM))
        {
        builder.Prompts.choice(session, "Do you want to add more services?",['Yes','No'],{ listStyle: builder.ListStyle.button });
        }
        next();
    },
    function(session,result, next){
        //console.log("result.response.entity");
	   session.send("ksjada");
       if(result.hasOwnProperty('response'))
            Decision = result.response.entity;
            next();
	   },
		 
	function(session,result, next){		 
        if(ServicesDWEntity == null && Decision == 'Yes')
            builder.Prompts.choice(session, "Which service do you want to provision for Developer Workstation",['windows', 'linux', 'ubuntu','None'],{ listStyle: builder.ListStyle.button });
            next();
	     },	
         	   
    function(session,result, next){
        
        if(result.hasOwnProperty('response')) ServicesParams.ServicesDW = result.response.entity;			 
		if(ServicesCREntity == null && Decision == 'Yes')	 
            builder.Prompts.choice(session, "Which service do you want to provision for Code Review",['collaborator', 'gerrit'],{ listStyle: builder.ListStyle.button });
		    next();
	     },	
         
    function(session,result, next){
        
        if(result.hasOwnProperty('response')) ServicesParams.ServicesCR = result.response.entity;			 
		if(ServicesSCMEntity == null && Decision == 'Yes')	 
            builder.Prompts.choice(session, "Which service do you want to provision for Source Code Management",['gitlab', 'subversion'],{ listStyle: builder.ListStyle.button });
		    next();		
         },
         
    function(session,result, next){
        
        if(result.hasOwnProperty('response')) ServicesParams.ServicesSCM = result.response.entity;			 
		if(ServicesCIEntity == null && Decision == 'Yes')	 
            builder.Prompts.choice(session, "Which service do you want to provision for Continuous Integration",['jenkins', 'bamboo'],{ listStyle: builder.ListStyle.button });
		    next();		
         },
         
    function(session,result, next){
        
        if(result.hasOwnProperty('response')) ServicesParams.ServicesCI = result.response.entity;			 
		if(ServicesPMEntity == null && Decision == 'Yes')	 
            builder.Prompts.choice(session, "Which service do you want to provision for Project Management",['redmine', 'open project'],{ listStyle: builder.ListStyle.button });
		    next();		
         }, 
                 	
    function(session,result,next){
        
        if(result.hasOwnProperty('response')) ServicesParams.ServicesPM = result.response.entity;
            next();
    }, 
       
	function(session,result,next){
        
        //if(result.hasOwnProperty('response')) ServicesParams.ServicesSCM = result.response.entity;
        
        console.log('ServicesParams.ServicesSCM === undefined: ', ServicesParams.ServicesSCM === undefined);
        console.log('ServicesParams.ServicesDW === undefined: ', ServicesParams.ServicesDW === undefined);
        console.log('ServicesParams.ServicesCR === undefined: ', ServicesParams.ServicesCR === undefined);
        
       //session.endDialog(JSON.stringify(ServicesParams));
         
        session.send(("Your request for these resources has been successfully recorded :\n ") +
        (ServicesParams.ServicesDW === undefined ? " " : "\nDeveloper Workstation : " + ServicesParams.ServicesDW )+ 
        (ServicesParams.ServicesSCM === undefined ? " " : "\nSource Code Management : " + ServicesParams.ServicesSCM) +
        (ServicesParams.ServicesCR === undefined ? " " : "\nCode Review : " + ServicesParams.ServicesCR));
        next();     
    },
    
    function(session,result,next){ 
        // servicesChoosen += result.response + '\n';
         // session.userData['Services'] = result.response;
        builder.Prompts.confirm(session, 'Would you like to proceed with the following services:' + servicesChoosen);
     },
     
     function(session,result,next){
        if(result.response){
            session.userData['next'] = true;
            builder.Prompts.confirm(session, 'Would you like to proceed with creating the request?');
        }else{
            session.endDialog('Okay1');   
        }
     },
        
     function(session,result,next){
        if(result.response){
            session.userData['create'] = true;
            session.send('A new request has been created!');
        }else{
            session.endDialog('Okay2');   
        }   
        
     }
 ];
	
    
    
    
    
    
    
    
    
    
        function(session, args, next){
        session.userData['next'] = false;
        session.privateConversationData.doneFlag = false;
        console.log("b",session.userData);
        //builder.Prompts.text(session,"Please provide the name of the Project");
        builder.Prompts.choice(session, "Plese select the Project for which you want to raise the request",['Nokia','Ericsson','Cisco'],{ listStyle: builder.ListStyle.button });
    },
    
    function(session,result, next){
        console.log('result came back / user given:', result);
        session.userData['ProjectName'] = result.response; 
      //  builder.Prompts.text(session,"Do you want to provision this on Virtual Machine or a Container platform")  ;
        builder.Prompts.choice(session, "Please select the Platform on which you want to provision",['Container','Virtual Machine'],{ listStyle: builder.ListStyle.button });
    },
    function(session,result, next){
        session.userData['Platform'] = result.response;
       // builder.Prompts.text(session,"Plese select the Delivery Location")  ;
        
        builder.Prompts.choice(session, "Plese select the Delivery Location",['System optimization','India'],{ listStyle: builder.ListStyle.button });  
        
    },
    function(session,result, next){
        session.userData['Delivery'] = result.response;
        //builder.Prompts.text(session,"Select the Users from whome you want to provision the request")  ;
        builder.Prompts.choice(session, "Select the Users from whome you want to provision the request",['All','Developer','Tester','Data scientist'],{ listStyle: builder.ListStyle.button });
    },
    function(session,result, next){
        session.userData['Users'] = result.response; // check this one
        builder.Prompts.time(session,"If you could please provide the Start date for the request");

    },
    
    
    
    ////////////// Latest New Req
    
    // /*-----------------------------------------------------------------------------
// A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
// -----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var deasync = require('deasync');
var axios = require('axios');


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


var greetings = [" Hello Jack, welcome back to CREDO. We have recently added new Machine Learning tools Tensorflow and Jupiter. How can I help you today? ",
                 'Hi .I\'m Champ - the  EEAAS bot at your service.'];
                 
var thanks = ["Thanks, How can I help you further?"];

var ok_responses = ["How can I help you further?"];

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
bot.dialog('Greeting',[
	function(session){
	   session.endDialog(greetings[Math.floor(Math.random()*greetings.length)]);
	}
]).triggerAction({
	matches: 'Greeting'
});

//Admin Page Dialogues CHAT

var provision = false;

bot.dialog('Orders',require('./dialogs/orders'));

// bot.dialog('TestEnvironment',[
//     function(session, args, next){
//          session.userData['pathEntity'] = builder.EntityRecognizer.findEntity(args.intent.entities, 'path');
// IMSEntity = builder.EntityRecognizer.findEntity(args.entities, 'IMS');
// ServicesDWEntity = builder.EntityRecognizer.findEntity(args.entities, 'ServicesDW');

var IMSEntity;
bot.dialog('TestEnvironment',require('./dialogs/test_environment'));

// I want to create a new request with gerrit, gitlab and linux services
//PM ROLE CHAT

bot.dialog('NewRequest', require('./dialogs/new_request'))
.beginDialogAction("Open", "Open", {
    matches: "Open"});

// .beginDialogAction("FinishRequest", "FinishRequest", {
//     matches: "FinishRequest"    
// });

bot.dialog('Open', require('./dialogs/onselectactiondialog'));
//

// bot.dialog('onselectaction2', require('./dialogs/onselectaction2'));

// bot.dialog(['FinishRequest',
// 	function(session, args, next){
//        // session.privateConversationData.doneFlag = true;
//        // console.log("app.js privateConversationData:", session.privateConversationData);
//       session.endDialog("Came out of the finish request dialog2");
//        // session.endConversation("finish request dialog end conversation");
//        // next({args: {response: "hi"}});
// 	}
// ]);

// .triggerAction({
//     matches: "FinishRequest",
//     onSelectAction: (session, args, next) => {
//         // Add the help dialog to the dialog stack 
//         session.send("katy");
//         session.privateConversationData.doneFlag = true;
//         // (override the default behavior of replacing the stack)
//         session.beginDialog(args.action, args,next);
//     } });


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
    // console.log("event", event);
    var msg = new builder.Message().address(event.address);
    msg.textLocale("en-us");
    if (event.name === "buttonClicked") {
        msg.text("I see that you just pushed that button");
        bot.send(msg);
    }else if (event.name === "capacityEvent") {
        console.log("capacityyyyyyyyyyyyyyyy")
        capacity = event.value['capacity'];
        msg.text("capacityyyyyyyyyyyyyyy", capacity);
        bot.send(msg);
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





/.///////////////////////


bot.dialog(['PM',
 	function(session, args, next){
        builder.Prompts.text(session, "Hello Jack, welcome back to CREDO. We have recently added new Machine Learning tools Tensorflow and Jupiter. Would you like to see the services available? ");
     }
        
         Can you place a request for Gitlab and Jenkins for <<Sam>> and <<Alice>> from the 20th November to 30th December for 5G project;
         
    function(session, result, next){  
        
         builder.Prompt.confirm(session," Sure, would you need to add any other services.");
         
    function(session, result, next){       
         
          builder.Prompt.text(session," Which services would you like to add?");
          
          
          builder.Prompt.confirm(session,"  Sure, would you need to add any other services.");
          
    function(session, result, next){   
        session.userData['next'] = true;    
          builder.Prompt.confirm(session," Here is the summary page, are we ready to place this order.");
          
    function(session, result, next){       

        if(result.response){
            session.userData['create'] = true;
            session.send('Great! Your request is placed.');
            next();
        }else{

            next();  
        }   
        
     }
          
    function(session, result, next){      
         
          session.send(" By the way, the project budget has reached 95% of the allocated budget.");
          session.delay(2000);
          
          session.send("You would need to reach out to Alex for additional budget.");
          
          
          

        }   
        
     }
 ];
	

//////////////////////////////////////////

// 


bot.dialog(['A',
    function(session, args, next){
        
         builder.Prompts.text(session, "Bot: Hi Jill! The test execution for the EPC suite is completed. 48 test cases have passed and 2 test cases have failed.");
         


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
    }else if (event.name === "capacityEvent") {
        console.log("capacity1");
        capacity = event.value['capacity'];
        msg.text(capacity);
        bot.send(msg);
        bot.beginDialog(event.address, 'NewRequest');
        Flag 1
        
   // }else if (event.name === "capacityEvent") {
        console.log("capacity1");
        capacity = event.value['capacity'];
        msg.text(capacity);
        bot.send(msg);
        bot.beginDialog(event.address, 'NewRequest');
        
    }else if (event.name === "userLogin") {
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



///////////////////////////////////////////////



bot.dialog(['T',
    function(session, args, next){
        
         builder.Prompts.text(session, "Bot: Hi Jill! The test execution for the EPC suite is completed. 48 test cases have passed and 2 test cases have failed.");
         



          



































          
          
  


          
      
          
           
          
          
          
         
         
         
         
        

