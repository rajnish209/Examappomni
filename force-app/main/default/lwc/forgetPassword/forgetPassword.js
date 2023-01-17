import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import updateRecord from '@salesforce/apex/ExamPaper.updateRecord';
import getContactList from '@salesforce/apex/ExamPaper.getContactList';

export default class ForgetPassword extends NavigationMixin (LightningElement){
@wire(getContactList) Employee__c;


     email;
     upassword;
     Id;

        handleEmail(e){
        this.email = e.target.value;
        }
        handlePassword(e){
         this.upassword = e.target.value;
        }

        // handleClick(){
        //     this[NavigationMixin.Navigate]({
        //         type: "standard__component",
        //         attributes: {
        //           componentName: "c__examLoginds"
        //         }
        //       });
        //    }

    handleUpdate(){

        if(this.email != null && this.upassword != null){
        for(let i = 0; i < this.Employee__c.data.length;i++){
            if(this.email == this.Employee__c.data[i].Email__c){
                this.Id = this.Employee__c.data[i].Id
                updateRecord({
               idagain : this.Id,
                upasswo: this.upassword
              }).then(result =>{

                console.log("success");
                alert('Password Updated Successfully!...');
                   this[NavigationMixin.Navigate]({
                    type:"standard__component",
                    attributes:{
                        componentName:"c__newlogin"
                    }
                });
                 }).catch(error=>{
                console.log(error.body.message);

               alert(error.body.message)

            })
    }
}
    }
    }
}