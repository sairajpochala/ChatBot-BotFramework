var builder = require('botbuilder');
var restify = require('restify');
var botbuilder_azure = require("botbuilder-azure");
var deasync = require('deasync');
var axios = require('axios');

module.exports = [
    
    
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
         
       // ServicesPMEntity = builder.EntityRecognizer.findEntity(args.entities, 'ServicesPM');
                        
         //session.send("You've opened another dialog from the current dialog.");

        // if(DevOpsToolsEntity !== null) OpenParams.DevOpsTools = DevOpsToolsEntity.entity;
        // //next();
        // if(ApplicationServicesEntity !== null) OpenParams.ApplicationServices = ApplicationServicesEntity.entity;
        // if(AnalyticsServicesEntity !== null) OpenParams.AnalyticsServices = AnalyticsServicesEntity.entity;
        // if(DeveloperWorkstationEntity !== null) OpenParams.DeveloperWorkstation = DeveloperWorkstationEntity.entity;
       // // if(ServicesPMEntity !== null) ServicesParams.ServicesPM = ServicesPMEntity.entity;
       	 
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
     
];