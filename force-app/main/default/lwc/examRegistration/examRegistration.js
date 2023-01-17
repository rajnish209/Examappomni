import { LightningElement } from 'lwc';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createRecord from '@salesforce/apex/ExamPaper.createRecord';
import { NavigationMixin } from "lightning/navigation";
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import OmniCloudLogo from '@salesforce/resourceUrl/OmniCloudLogo';
import RegistrationPageLogo from '@salesforce/resourceUrl/RegistrationPageLogo';

export default class ExamRegistration extends  NavigationMixin (LightningElement) {
    FirstName;
    LastName;
    email;
    Password;
    logo = OmniCloudLogo
    Loginlogo = RegistrationPageLogo
handleName(event){
    this.FirstName = event.target.value;
}
handleLastName(event){
    this.LastName = event.target.value; 
}
handleEmail(event){
    this.email = event.target.value;
}
handlePassword(event){
    this.Password = event.target.value;
    
}

handleClick(){

console.log('yfgfyfty');


    if(
    (this.FirstName != null && this.LastName != null && this.email != null && this.Password != null)
    ){
        console.log('sdfsf');
    


        //this.FirstName = true;
       createRecord({
            arg1: this.FirstName, 
            arg2:this.LastName,
            arg3:this.email,
            arg4:this.Password,
        })
        .then(result =>{
            console.log("success");
            this.notifier = "Your request is submitted successfully!";
           this.showForm = false;
           this.showSuccess = true;
           window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/Examapp");
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                  componentName: "c__newlogin"
                }
              });

        }).catch(error=>{
            console.log(error.body.message);
            this.errormsg = error.body.message;
            alert('Please Provide Valid Credentials or You have already Register With Email id');
        })
    }else{
        this.errormsg = "fill every field/choose at least one System/Application";
        alert('Please fill all the fields')
    }
}

}