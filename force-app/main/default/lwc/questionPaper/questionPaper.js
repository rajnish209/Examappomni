import { LightningElement,wire,api,track } from 'lwc';
import OmniCloudLogo from '@salesforce/resourceUrl/OmniCloudLogo';
import getContactName from '@salesforce/apex/ExamPaper.getContactName';
import createResult from '@salesforce/apex/ExamPaper.createResult';
export default class QuestionPaper extends LightningElement {
    logo = OmniCloudLogo
    @track Fullname =[];
    @api intervalTime = 10000;
    @track showStartBtn = true;
    @api timeVal = '0:0:0';
    timeIntervalInstance;
    totalMilliseconds = 0;


    @track isComponentOpen = false;
    @wire(getContactName) employee;
    @track forhideboxes =false;
    employeeid;
    handleEmployee(e){
    this.employeeid = e.target.value;
    }
     setno;
    // values = 'None';

    // get optionss() {
    //     return [
    //         { label: 'None', value: 'None' },
    //         { label: 'set-1', value: 'set-1' },
    //         { label: 'set-2', value: 'set-2' },
    //         { label: 'set-3', value: 'set-3' },
    //     ];
    // }
     handleSet(e){
     this.setno = e.target.value;
    // this.values = e.target.value;
    }
    // topic;
    // value ='None';
    // get options() {
    //     return [
    //         { label: 'None', value: 'None' },
    //         { label: 'ADMIN', value: 'ADMIN' },
    //         { label: 'DEV', value: 'DEV' },
    //         { label: 'CPQ', value: 'CPQ' },
    //     ];
    // }
    // handleTopic(e){
    // this.topic = e.target.value;
    // this.value = e.target.value;
    // }

    get childData() {
        return this.employeeid;
      }
      get childDataaaaa() {
        return this.setno;
      }
      get childDataww() {
        return this.countstore;
    }
    handleSubmit(){
        
        if(this.employeeid != null){

            console.log(this.employee.data);
            for(let i = 0; i < this.employee.data.length;i++){
                console.log('xxx');
               


                if(this.employeeid == this.employee.data[i].Name){
                    console.log('xyz');
                //    this.Fullname[0].Id = this.employee.data[i].Name;
                //     this.Fullname[0].Name = this.employee.data[i].Full_Name__c;
                this.isComponentOpen = true;
                this.forhideboxes= true;
                let details = {
                    "Id": this.employee.data[i].Id,
                    "Name": this.employee.data[i].Full_Name__c
                }
                this.Fullname.push(details);
                    console.log(this.Fullname);
                    
                    
                }
            }
        }
        this.template.querySelectorAll('lightning-input').forEach(item=>{

            item.disabled=true;

        })
        this.template.querySelectorAll('lightning-button').forEach(item=>{

            item.disabled=true;    

        })

        //Timer
        this.showStartBtn = false;
        var parentThis = this;


       
        this.timeIntervalInstance = setInterval(function() {

           
            var hours = Math.floor((parentThis.totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((parentThis.totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((parentThis.totalMilliseconds % (1000 * 60)) / 1000);
           
            
            
            parentThis.timeVal = hours + ":" + minutes + ":" + seconds;   
            
            parentThis.totalMilliseconds += 100;
        }, 100);
        

            // setTimeout(() => {
            
            //    /* if(this.employeeid != null){

            //         console.log('fffdsdas'+this.employee.data);
            //       //  for(let i = 0; i < this.employee.data.length;i++){
            //             //console.log('hhhbbbvvv');
                       
            //     console.log('this.employeeid'+this.employeeid);
            //     console.log('this.employeeid'+this.countstore);
            //             createResult({
            //                 arg1: this.employeeid, 
            //                 arg2: this.countstore,
                           
            //             })
            //             .then(result =>{
            //                 console.log("success");
            //                 this.notifier = "Your request is submitted successfully!";
                         
                          
                
            //             }).catch(error=>{
            //                 console.log(error.body.message);
            //                 this.errormsg = error.body.message;
            //                // alert('Please Provide Valid Credentials or You have already Register With Email id');
            //             })
            //         }
            //         */
            //        alert('Your time is completed Please submit Your Exam');
            //         window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/thankspage"); 
            // }, this.intervalTime);
        
        
      
    }
   
   
   
}