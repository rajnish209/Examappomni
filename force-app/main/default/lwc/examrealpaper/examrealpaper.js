import { LightningElement } from 'lwc';
import OmniCloudLogo from '@salesforce/resourceUrl/OmniCloudLogo';

export default class Examrealpaper extends LightningElement {
    
    logo = OmniCloudLogo
    handleClick(){
        window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/Questionpage");
    }
    
}