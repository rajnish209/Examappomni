import { LightningElement, wire  ,api ,track} from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import getquestionList from '@salesforce/apex/ExamPaper.getquestionList';
import getContactName from '@salesforce/apex/ExamPaper.getContactName';
import createResult from '@salesforce/apex/ExamPaper.createResult';
import optionController from '@salesforce/apex/ExamPaper.optionController';
import storeselectedOption from '@salesforce/apex/ExamPaper.storeselectedOption';
//import getParentQuestiondetailsList from '@salesforce/apex/ExamPaper.getParentQuestiondetailsList';

export default class Pagination extends NavigationMixin (LightningElement){
@track totalContacts
@track visibleContacts
@api label
@track check
@api employeeid;
@api setno;
@track assignvalue;
@track single ;
@track multiple;
@track wholedata =[];
@api trackeachvalue ;

//@wire(getSelectedAccounts) getdata;
@wire(optionController) optionCont;
@wire(getContactName) employee;
@wire(getquestionList) 
wiredContact({error, data}){
    if(data){

for(var i =0;i< data.length;i++){
    let d="";
    data[i].Selected_Questions__r.forEach(a=>{
       d = a.QuestionPaperCode__c;
       console.log('dddd'+d);
   
    console.log('data selected value'+data[i].Selected_Questions__r);
  
        if( d == this.setno){
            this.wholedata.push(data[i]);
        }
    })
}
         this.totalContacts = this.wholedata;
   
       //this.totalContacts = data;
        console.log('data'+data);
       //console.log('this.storealldata'+this.storealldata);
       //console.log(Object.keys(data)+'tttdds');
}
    if(error){
        console.error(error);
    }
    
}
@track checkbox;
@track storeselectedvalue =[];
@track storesinglevalue =[];
@track storeanswer =[];
@track selectedValue;
@track ans;
@track options = [];
@ track questions;
@track store =[];
@track storeforpagination =[];
@track storealldata =[];
@api countstore;
@track count = 0;
@track count1 = 0;
@track quee;
@track types;
@track answers;
@track storefinalans;
@track answeroption;
@track number;
@track checkoption;
@track set;
@track con;
updateContactHandler(event){
    this.visibleContacts=[...event.detail.records]
   // console.log(Object.values(this.visibleContacts)+'tttRRRRRRdds');
    this.single = false;
    this.multiple = false;
    this.set = false;
    this.trackeachvalue = false;
    this.visibleContacts.forEach(o => {
       
        if (o.Type__c === 'Single select'){
           // console.log(o.Type__c);
            this.single = true;
           
        }else{
            //console.log(o.Type__c);
            this.multiple = true; 
        }
        var ccc = o.Question__c;
        var Number =o.Number__c;
        var type = o.Type__c;
        console.log('ccc'+ccc +type);
        // var sds = o.Set__c;
        // var dsd = o.Topic__c;
       // let c =0;
      //  console.log('sds'+sds+'   ' + dsd);
//         if(sds == this.setno && dsd == this.topic){
//         this.set = true;
//             c++;
//         }
// this.con = c;
       //console.log(o.Options__r.length);
       let optionsValues = [];
   
        o.Options__r.forEach(oo => {
          let dd =  oo.Option_name__c;
          optionsValues.push({
            label: dd,
           value: dd
        })
        })

    this.options = optionsValues;
    this.quee = ccc;
        this.number = Number;
    this.types = type;

   o.Answers__r.forEach(pp => {
     this.ans = pp.Answer_name__c;
    let cccc =  pp.Answer_name__c;
    //cccc.push(this.ans);
   //  console.log('wsxde'+this.ans);
   this.storefinalans = cccc;

   let temp1 = false;
   for(var i =0;i< this.storeanswer.length;i++){
       if(this.quee == this.storeanswer[i].que){
       temp1 = true;
       }
    }

    if(temp1 == false){
     var detail = {
        "que" : this.quee,
        "exactans" : ""
     }
     this.storeanswer.push(detail);
    }
   
  
    for(var j = 0;j < this.storeanswer.length;j++){
       // console.log('Answer' + this.storeanswer[j].exactans);
       if(this.storeanswer[j].que == this.quee){
        this.storeanswer[j].exactans=this.ans; 
         
       }
      // console.log('ANSWER'+this.storeanswer[j].que+this.storeanswer[j].exactans);
    }
    
});


for(var g = 0;g < this.storesinglevalue.length;g++){
if(this.quee == this.storesinglevalue[g].que){
    this.answeroption = this.storesinglevalue[g].answ;
}
}
 });
     
}

handleChange(event) {

    this.selectedValue = event.detail.value; 
   this.trackeachvalue = true;
    let temp = false;
    for(var i =0;i< this.storesinglevalue.length;i++){
      
    if(this.quee == this.storesinglevalue[i].que){
       
    temp = true;
    }
//console.log("answer"+answer);
    }
  if(temp == false){
   
  let detail ={
    "que":this.quee,
    "answ":this.selectedValue,
    "num": this.storefinalans
  }
   this.storesinglevalue.push(detail);
   
  } 

 for(var j = 0;j < this.storesinglevalue.length;j++){
  if(this.storesinglevalue[j].que == this.quee){
   // console.log('check its working');
   // console.log('Check'+this.storesinglevalue[j].answ);
    this.storesinglevalue[j].answ = this.selectedValue;
    //this.storefinalans = this.storesinglevalue[j].answ; 
   // console.log('tttddd'+ this.storesinglevalue[j].answ);
  }
 
  }
}
handleChangeAgain(event) {

    this.selectedValue = event.detail.value; 
   
    let temp = false;
    for(var i =0;i< this.storesinglevalue.length;i++){
      
    if(this.quee == this.storesinglevalue[i].que){
       
    temp = true;
    }
//console.log("answer"+answer);
    }
  if(temp == false){
   
  let detail ={
    "que":this.quee,
    "answ":this.selectedValue,
    "num": this.storefinalans
  }
   this.storesinglevalue.push(detail);
   
  } 

 for(var j = 0;j < this.storesinglevalue.length;j++){
  if(this.storesinglevalue[j].que == this.quee){
   // console.log('check its working');
   // console.log('Check'+this.storesinglevalue[j].answ);
    this.storesinglevalue[j].answ = this.selectedValue;
    //this.storefinalans = this.storesinglevalue[j].answ; 
   // console.log('tttddd'+ this.storesinglevalue[j].answ);
  }
 
  }
}
    
    

handleClickresultone(){
   
    //for single type Question
 let co = 0;
for(var m =0;m < this.storeanswer.length;m++){ 
    for(var n =0;n < this.storesinglevalue.length;n++){
        if(this.storesinglevalue[n].que == this.storeanswer[m].que){
            if(this.storesinglevalue[n].answ == this.storeanswer[m].exactans){
                co = co+1;
                this.store.push(this.storesinglevalue[n].que);
            }
        }
    //}
}

    }
    this.count = co;
}

handleClickresult(){
   
    this.handleClickresultone();
    //this.handleClickresultagain();
   
   
for(var m =0;m< this.store.length;m++){
    console.log('dddsadsa'+this.store[m]);
}
//let ansx = this.count+this.count1;
this.countstore = this.store.length;

alert('Score'+this.store.length);

if(this.employeeid != null){
        createResult({
            arg1: this.employeeid, 
            arg2: this.store.length,
           })
        .then(result =>{
            console.log("success");
            this.notifier = "Your request is submitted successfully!";
        }).catch(error=>{
           // console.log(error.body.message);
            this.errormsg = error.body.message;
           // alert('Please Provide Valid Credentials or You have already Register With Email id');
        })
}

if(this.employeeid != null){
  //  if(this.setno != null){
        console.log('this.setno'+this.setno);
    for(var k = 0;k < this.storesinglevalue.length;k++){
        console.log(this.storesinglevalue[k]);
     //   for(var l =0;l < this.storeanswer.length;l++){
            
           //if(this.storesinglevalue[k].que == this.storeanswer[l].que){
    storeselectedOption({
        arg1: this.employeeid, 
        arg2: this.storesinglevalue[k].que,
        arg3: this.storesinglevalue[k].answ,
        arg4: this.storesinglevalue[k].num,
        arg5: this.setno,
       })
    .then(result =>{
       // console.log("success");
        this.notifier = "Your request is submitted successfully!";
    }).catch(error=>{
       // console.log(error.body.message);
        this.errormsg = error.body.message;
       // alert('Please Provide Valid Credentials or You have already Register With Email id');
    })
//}
      //  }
}
   // }
}
//console.log(this.employeeid);
window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/thankspage");
}

@api intervalTime = 60000;
// connectedCallback(){
//     console.log(this.setno + 'setnumber');
//     console.log(this.topic + 'topic');
// }
connectedCallback() {
    setTimeout(() => {
       
        alert('Your time is completed Please submit Your Exam');
       
        this.handleClickresult();
         window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/thankspage");

 }, this.intervalTime);
}
//console.log('storeselected value  '+this.storeselectedvalue.length);
 //To store value
//}
}

