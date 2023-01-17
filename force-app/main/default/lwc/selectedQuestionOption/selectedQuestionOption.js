import { LightningElement,track,wire } from 'lwc';
import getcheckanswerList from '@salesforce/apex/ExamPaper.getcheckanswerList';

export default class SelectedQuestionOption extends LightningElement {
  
  @track totaldetails;
  @track temp;
  @wire(getcheckanswerList) 
   wiredContact({error, data}){
    if(data){
         this.totaldetails=data;
         
       //console.log(Object.keys(data)+'tttdds');
       
}
    if(error){
        console.error(error);
    }
    
}  
    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
       this.isModalOpen = true;
       console.log('sajfdsa'+this.totaldetails);
        //var dd;

    //     var sss;
    //     this.totaldetails.forEach( o =>{
            
    //        let dd = o.Name;
    //         console.log('fdgDdjjgGh'+ dd);
    //         o.Employee_Selected_Answers__r.forEach( oo =>{
                
    //             sss = oo.Employee_Id__c;
    //             console.log('dsafakJHGDa'+ sss);
    //         })
    //     })
    //     if(dd === sss){
    //   //  this.isModalOpen = true;
    //     }
        
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }
}