var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var deasync = require('deasync');
var axios = require('axios');

var ServicesParams = [];
var Decision = 'No';

var StartDay,EndDay,StartYear,EndYear,StartMonth,EndMonth;


//PM ROLE CHAT
var servicesChoosen = '\n';
            console.log('FinishedFlagEntity', FinishedFlagEntity);
var ServicesDWEntity,FinishedFlagEntity,FinishEntity,WrongServiceEntity, ServicesCREntity, ServicesSCMEntity, ServicesCIEntity, ServicesPMEntity,ServicesEntity;

module.exports = [
    
    function(session, args, next){
        session.userData['next'] = false;
        session.privateConversationData.doneFlag = false;
        console.log("b",session.userData);
        //builder.Prompts.text(session,"Please provide the name of the Project");
        builder.Prompts.choice(session, "Please select the Project for which you want to raise the request",['Nokia','Ericsson','Cisco'],{ listStyle: builder.ListStyle.button });
    },
    
    function(session,result, next){
        console.log('result came back / user given:', result);
        session.userData['ProjectName'] = result.response; 
      //  builder.Prompts.text(session,"Do you want to provision this on Virtual Machine or a Container platform")  ;
        //builder.Prompts.text(session,"Select the Users from whome you want to provision the request")  ;
        builder.Prompts.choice(session, "Select the Users from whome you want to provision the request",['All','Developer','Tester','Data scientist'],{ listStyle: builder.ListStyle.button });
    },
    function(session,result, next){
        session.userData['Users'] = result.response; // check this one
        builder.Prompts.time(session,"Please provide the Start date for the request");

    },
    
    function(session,result, next){  
        if(result.hasOwnProperty('response')){
            session.userData['Start Date'] = builder.EntityRecognizer.resolveTime([result.response]);
            StartDay  = `${session.userData['Start Date'].getDate()}`;
            StartMonth=`${session.userData['Start Date'].getMonth()}`;
            StartYear = `${session.userData['Start Date'].getFullYear()}`;
            
            // session. send(`${session.userData['Start Date'].getDate()}`);   
            // session. send(`${session.userData['Start Date'].getMonth()}`);             
            // session. send(`${session.userData['Start Date'].getFullYear()}`);
        
            builder.Prompts.time(session, "Please provide the end date for the request");
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
        // session. send(`${session.userData['End Date'].getDate()}`);   
        // session. send(`${session.userData['End Date'].getMonth()}`);             
        // session. send(`${session.userData['End Date'].getFullYear()}`);   
        
        //session.send(`EndYear: ${EndYear}\nStartYear: ${StartYear}\nValid: ${EndYear > StartYear}\nEndMonth: ${EndMonth}\nStartMonth: ${StartMonth}\nValid: ${EndMonth > StartMonth}\nEndDay: ${EndDay}\nStartDay: ${StartDay}\nValid: ${EndDay > StartDay}`);
        // EndYear > StartYear ? ( EndMonth > StartMonth ? (EndDay > StartDay ? next({ resumed: builder.ResumeReason.back }) : next() ) : next() ) : 
      
     
     var date_invalid = false;
        if (EndYear < StartYear) date_invalid = true ,session.send("date invalid 1");
        else if ((EndYear == StartYear) && (( StartMonth - EndMonth )> 0))  date_invalid = true, session.send("date invalid 2");
        else if ((EndMonth == StartMonth) &&( EndMonth > StartMonth)&& ((StartDay - EndDay) > 0 ))date_invalid = true , session.send("date invalid 3");
   
        // if (EndYear < StartYear) date_invalid = true ;
        //     else if (EndYear == StartYear) { 
        //         if (EndMonth < StartMonth)  date_invalid = true;
        //         else if (EndMonth == StartMonth) {
        //             if ((StartDay - EndDay) > 0 ) date_invalid = true ;
        //              }
      // }
      
      // date_invalid = EndYear < StartYear ? true : 
        //                 ( EndYear == StartYear ? ( EndMonth < StartMonth ? true : 
        //                     (EndMonth == StartMonth ? (EndDay < StartDay): false )) : false );
        
        if (date_invalid) next({ resumed: builder.ResumeReason.back });
        else next();
        //else builder.Prompts.text(session,'Please select the services you would like to add.');

    },
    //////////////////////////////
     function(session, result, next){
        console.log('Finished? ', session.privateConversationData.doneFlag ? "Yes" : "No");
        console.log('result came back / user given:', result);
        if (!session.privateConversationData.doneFlag) {
            builder.Prompts.text(session, 'Please select the services you would like to add.');
            // if(session.privateConversationData.doneFlag) session.send("Finished in service collection and done.");
            // else session.send("Finished. but not done");
        }
        else{
            next();
        }
     },
     async function(session, result, next){
        if(result.response){
            console.log("001");
            var luisResponse = await axios.get('https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/cb2cc8ea-4199-49c6-9da9-f4d837812c48?subscription-key=6e252c545d8e4341859f19ff76d1faf4&verbose=true&timezoneOffset=0&q=' + result.response);
            console.log("002");
            
            var args = luisResponse.data;
            //session.send(args.entities);
            console.log("003A"); console.log("1");

            console.log("004");console.log(args.entities);console.log("2"+ typeof args);
             console.log(args.entities.length);
                if (args.entities.length> 0){ 
            
                session.userData['Services'] = args.entities;
                console.log("005");
                FinishEntity = builder.EntityRecognizer.findEntity(args.entities, 'Finish');
                 WrongServiceEntity = builder.EntityRecognizer.findEntity(args.entities, 'WrongService');

                console.log("006");
                console.log(WrongServiceEntity);
                
            //     //
            //     if(WrongServiceEntity){
            //         console.log("007"); 
          // builder.Prompts.confirm(session, 'Were you planning to select Gerrit instead ?');
            //         console.log("008"); 
                 //
                 
        //            session.beginDialog('onselectaction2');
                 
        // async function(session, result, next){
        //        if(result.response){
        //         console.log("01A");
        //         var luisResponse2 = await axios.get('https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/cb2cc8ea-4199-49c6-9da9-f4d837812c48?subscription-key=6e252c545d8e4341859f19ff76d1faf4&verbose=true&timezoneOffset=0&q=' + result.response);
        //         console.log("02A");
            
        //         var args2 = luisResponse2.data;
        //         //session.send(args.entities);
        //         console.log("003A");         
        //         console.log(args2);
        //         if (args2 == "yes"){
        //             session.send ("SAIRAJ");
        //         }else{
        //              next();
        //          }    
        //         }} 
                 // 
                // }else{
                //       next({ resumed: builder.ResumeReason.back });
                //        console.log("009");
                //  }
                     

                 if(FinishEntity){
                    session.privateConversationData.doneFlag = true;
                    next({ resumed: builder.ResumeReason.back });
                 }else{

                    console.log("010");
                    next({ resumed: builder.ResumeReason.back });}
                }else{
                   console.log("011");
                   session.send("The mentioned service is not applicable");
                   next({ resumed: builder.ResumeReason.back});}   
            }else{

                console.log("hi");
                next();
                }
        
        },            
    // }},
    ///////////   
    // function(session,result,next){ 
    //     // servicesChoosen += result.response + '\n';
    //      // session.userData['Services'] = result.response;
    //     // builder.Prompts.confirm(session, 'Would you like to proceed with the following services:' + servicesChoosen);
    //     builder.Prompts.confirm(session, 'Would you like to proceed with the following services:' + servicesChoosen);
    //  },
     
    //  function(session,result,next){
    //     if(result.response){
    //         session.userData['next'] = true;
    //         builder.Prompts.confirm(session, 'Would you like to proceed with creating the request?');
    //     }else{
    //         session.endDialog('Okay1');   
    //     }
    //  },
    function(session,result,next){
        session.userData['next'] = true;
        builder.Prompts.confirm(session, 'Would you like to proceed with creating the request?');
     },
        
    function(session,result,next){
        if(result.response){
            session.userData['create'] = true;
            session.send('A new request has been created!');
        }else{
            //session.endDialog('Okay2');
            session.beginDialog('NewRequest');   
        }   
        
     }
 ];
	
    
//     // Code goes here

// var output={Services:"mxnet,b,c,d"}

// var individualservices =output.Services.split(",")


// console.log(individualservices);

// for(z=0;z<individualservices.length;z++)
// {
  
//    if (["Tensor flow", "Paddle Paddle", "mxnet"].includes(individualservices[z])===true){  
//                 alert("1st Part");
//                 if (ServicesParams.includes("AMDFirepro" , "AMDVega" ,"Nvidia" , "Geforce")){
//                     console.log("2nd Part");
//                // session.endDialog("bue");

//                 }else{
//                    // session.send("Please select the Mandatory services");
//                     //session.privateConversationData.doneFlag = false;
//                    // next({ resumed: builder.ResumeReason.back }); 
//                    }
//             }else{
//                 //session.endDialog("ced");
//                 alert("hi");
//                // next();
//                 }
  
// }
  
  
  // Code goes here

// var output={Services:"mxnet,Tensor flow,c,d"}

// var individualservices =output.Services.split(",")


// console.log(individualservices);

// for(z=0;z<individualservices.length;z++)
// {
  
//    if (["Tensor flow", "Paddle Paddle", "mxnet"].includes(individualservices[z])===true)  
             
                
//           {  
//             found=false
//                    alert(individualservices[z]);
//                 for(k=0;k<individualservices.length;k++)
// {
  
//    if ((["AMDFirepro" , "AMDVega" ,"Nvidia" , "Geforce","c"]).includes(individualservices[k])===true)
//    {  
//                alert(individualservices[k]);
//              z=individualservices.length;
//              found=true;
           
// }


// }
// if(found==false)
// {
//   alert("ask user")
//        z=individualservices.length;
// }
// }
            
  
// }
  