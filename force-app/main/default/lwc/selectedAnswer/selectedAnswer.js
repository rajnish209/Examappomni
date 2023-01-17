import { LightningElement ,wire,track } from 'lwc';

import getallanswerrecordList from '@salesforce/apex/ExamPaper.getallanswerrecordList';

export default class SelectedAnswer extends LightningElement {
    employeeid;
    @track totaltask;
    @track visibleContacts;
    handleEmployee(e){
    this.employeeid = e.target.value;
    }
    setno;
    handleSet(e){
    this.setno =e.target.value;
    }


    @track columns = [{
        label: 'Question',
        fieldName: 'Question',
        type: 'text',
        sortable: true
    },
    {
        label: 'Selected Option',
        fieldName: 'option',
        type: 'text',
        sortable: true
    },
    {
        label: 'Answer',
        fieldName: 'answer',
        type: 'text',
        sortable: true
    } 
];

@track totaldata;
    @track wholedata =[];
    @wire(getallanswerrecordList)
    wiredContact({error, data}){
        if(data){
            this.totaldata = data;
          //  console.log('DATA'+this.data);
      
      // console.log('wholedata'+ this.wholedata);
          // this.totaltask = this.wholedata;
         
    }
        if(error){

            console.error(error);

        }
        
    }
@track val = false;
    handleSubmit(){
this.val = true;
//console.log('this.totaldata'+this.totaldata);
// for(var i=0;i< this.totaldata.length;i++){
//     if( this.employeeid == this.totaldata[i].Employee__c && this.setno == this.totaldata[i].QuestionPaperSequence__c){
//         this.wholedata.push(this.totaldata[i]);
//     }
//    }

this.totaldata.forEach(a =>{
    let p = a.Employee_Id__c;
    let s = a.QuestionPaperSequence__c;
    // console.log('this.employeeid'+this.employeeid);
    // console.log('this.setno'+ this.setno);
    // console.log('p'+p);
    // console.log('s'+s);
    if(this.employeeid  == p && this.setno == s){
    let de ={
        "Question":a.Question__c,
        "option":a.Option__c,
        "answer":a.Answer__c
    }
    this.wholedata.push(de);
}
})
  // console.log('this.wholedata'+this.wholedata);
   this.totaltask = this.wholedata;
    }
    updateContactHandler(event){
        this.visibleContacts=[...event.detail.records];
        console.log(Object.values(this.visibleContacts)+'tttRRRRRRdds');
        console.log('this.visibleContacts'+this.visibleContacts);
        this.visibleContacts.forEach(c => {
            let f = c.Question;
            console.log('C'+c);
            console.log('c.Question__c' + f);
            console.log('c.Option__c'+ c.option);
        })
        // for(var j =0;j< this.visibleContacts.length;j++){
        //     console.log('this.visiblecon'+this.visibleContacts[j].Question);
        // }
    }
    
}