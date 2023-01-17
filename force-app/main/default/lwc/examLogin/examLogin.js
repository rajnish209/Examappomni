import { LightningElement ,wire ,api} from 'lwc';
import { NavigationMixin } from "lightning/navigation";
//import getRecordDataController from '@salesforce/apex/ExamPaper.getRecordDataController';
import getContactList from '@salesforce/apex/ExamPaper.getContactList';
import OmniCloudLogo from '@salesforce/resourceUrl/OmniCloudLogo';
import SalesforceLoginPageLogo from '@salesforce/resourceUrl/SalesforceLoginPageLogo';


export default class ExamLogin extends NavigationMixin (LightningElement) {
    logo = OmniCloudLogo
    Loginlogo = SalesforceLoginPageLogo
    handleClick(){
      
        window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/RegistrationPage");
        }
       @wire(getContactList) Employee;


   
       email;
       Password;
       handleEmail(e){
       this.email = e.target.value;
       }
       handlePassword(e){
        this.Password = e.target.value;
       }
        handleRegister(){
        let flag = false;
            if(this.email != null && this.Password != null){
                console.log("Email inside");
                console.log(this.Employee.data);
                //console.log(email());
                for(let i = 0; i < this.Employee.data.length;i++){
                    if(this.email == this.Employee.data[i].Email__c && this.Password == this.Employee.data[i].Password__c){
                        console.log('Success');
                        flag = true;
                        alert("Logged in Successfully!...");
                        window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/ExamhomePage");
                      
                    }
                }
                if(flag == false){
                    alert('Please Provide the valid Credentials')
                    console.log('Error');
                }
            }
            else{
                alert('Please fill both the fields')
            }
        }
           }