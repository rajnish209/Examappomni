import { api, LightningElement } from 'lwc';

export default class ChildPagination extends LightningElement {
    currentPage=1
    totalRecords
    recordSize = 1
    totalPage=0
    @api trackeachvalue;
//store
//     allData = [];
// allSelectedRows = new Set();
// selectedRows = [];
// connectedCallback() {
//     // Initialize 1k rows
//     this.allData = [...new Array(1000).keys()].map((v,i) => ({id:i+1, name:v}))
    
//   }
//   get selectedIds() {
//     return [...this.allSelectedRows].join(',')
//   }
//   selectRow(event) {
//     // Id values for current page
//    // const pageIds = this.pageData.map(row => row.id)
//     // Id values that are now selected on current page
//     const selectedIds = new Set(event.detail.selectedRows.map(row => row.id))
//     // Deselect all page id values from global Set
//     pageIds.forEach(pageId => this.allSelectedRows.delete(pageId))
//     // And add in this page's selected values
//     selectedIds.forEach(pageId => this.allSelectedRows.add(pageId))
//     this.updatePage()
//   }
  //store value
    get records(){
        return this.visibleRecords;
    }
    @api 
    set records(data){
        if(data){
            this.totalRecords=data;
           // this.visibleRecords=data.slice(0, this.recordSize);
            this.totalPage=Math.ceil(data.length/this.recordSize);
            this.updateRecords();
        }
    }

    get disablePrevious(){
        return this.currentPage<=1

    }

    get disableNext(){
        return this.currentPage>=this.totalPage
    }


    previousHandler(){
       
        if(this.currentPage>1){
            this.currentPage = this.currentPage - 1;
            this.updateRecords()
        }
      
    }
   
    nextHandler(){
        //console.log(this.this.userConditionsLWC2);
        if(this.trackeachvalue == true){
        if(this.currentPage < this.totalPage && this.currentPage !== this.totalPage){
            this.currentPage= this.currentPage+1
            this.updateRecords();
            console.log
            
           console.log('trackeachvalue'+this.trackeachvalue); 
        }
    }else{
        alert('Please Select The Answer');
    }
       
    }


    updateRecords(){
        const start = (this.currentPage-1)*this.recordSize
        const end= this.recordSize*this.currentPage
        this.visibleRecords= this.totalRecords.slice(start, end);
        this.dispatchEvent(new CustomEvent('update',{
            detail:{
                records:this.visibleRecords
            }
        }))
    }

    
}
 

