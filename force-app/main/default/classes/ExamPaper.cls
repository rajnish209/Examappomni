public With sharing class ExamPaper {
  public static  map<Id ,String> m1 = new map<Id ,String>();
    public ExamPaper() {

    }
    @AuraEnabled
    public static void createRecord(String arg1, String arg2, String arg3, String arg4)
    {
        
        try {
            Employee__c user = new Employee__c(
                First_Name__c =  arg1,
               Last_Name__c = arg2,
                Email__c = arg3,
                Password__c = arg4
                );
                insert user;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static void createResult(String arg1, String arg2)
    {
        
        try {
            Employee_Result__c users = new Employee_Result__c(
                Id__c =  arg1,
                Result__c = arg2
               );
                insert users;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void storeselectedOption(String arg1, String arg2, String arg3 ,String arg4,String arg5)
    {
        
        try {
            Employee_Selected_Answer__c users = new Employee_Selected_Answer__c(
                Employee_Id__c =  arg1,
                Question__c = arg2,
                Option__c = arg3,
                Answer__c = arg4,
                QuestionPaperSequence__c = arg5
               );
                insert users;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }



    @AuraEnabled(cacheable=true)
    public  static List<Employee__c> getContactList() {
       return[SELECT Id , Email__c ,Password__c from Employee__c];
    }


    @AuraEnabled(cacheable=true)
    public  static List<Employee__c> getContactName() {
       return [SELECT Id , Name ,Full_Name__c from Employee__c];
    }
//forget password

@AuraEnabled
public static void updateRecord(String idagain , String upasswo){
    try {
        Employee__c Updated = new  Employee__c(
        Id = idagain,
        Password__c = upasswo
       );
            update Updated;
        } 
     catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}
// public static void selectedQuestion() {
//     List<Selected_Question__c> seqno = [SELECT Id, Question__r.Id ,Question__c, Question_Paper__r.QP_Number__c from Selected_Question__c ];
        
//     for(Selected_Question__c hh : seqno){
//            m1.put(hh.Question_Paper__r.QP_Number__c ,hh.Question__c) ;
//         }
//      System.debug('m1'+m1);
//    // return m1;
   
// }
    
  
@AuraEnabled(cacheable=true)
public static List<Question__c> getquestionList() {
    //ExamPaper.selectedQuestion();

    List<Selected_Question__c> seqno = [SELECT Question__c, Question_Paper__r.QP_Number__c from Selected_Question__c ];
    for(Selected_Question__c hh : seqno){
           m1.put(hh.Question__c ,hh.Question_Paper__r.QP_Number__c) ;
        }
        System.debug('m1'+ m1);
   return [SELECT Id , Question__c,Number__c ,Has_Comment__c,Type__c,Description__c,Name ,
   (SELECT Id , Option_name__c FROM Options__r),
   (SELECT Id , MultiOption__c FROM Option_Details__r ORDER BY Name),
   (SELECT Id ,Answer_name__c FROM Answers__r),(SELECT Id ,QuestionPaperCode__c from Selected_Questions__r) FROM Question__c where Id IN : m1.keySet()];
}



@AuraEnabled(cacheable=true)
public static List<Employee__c> getcheckanswerList() {
   return [SELECT Id,Name,(SELECT Id , Question__c,Option__c,Answer__c,Employee__c FROM Employee_Selected_Answers__r)FROM Employee__c  ];
}

@AuraEnabled(cacheable=true)
public static List<Employee_Selected_Answer__c> getallanswerrecordList() {
   return [SELECT Id , Question__c,Option__c,Answer__c,Employee__c,	Employee_Id__c,QuestionPaperSequence__c FROM Employee_Selected_Answer__c  ];
}

    
    public List<wrapperAccount> lstWrapper {get;set;}
    @AuraEnabled(cacheable=true)
    public static void optionController()
    {
        List<wrapperAccount> lstWrapper = new List<wrapperAccount>();
        for(Option__c objAccount : [Select Id, Option_name__c from Option__c])
        {
            lstWrapper.add(new wrapperAccount(objAccount));
        }
    }
    
    public class wrapperAccount
    {
        public Boolean isSelected {get;set;}
        //public Account objAccount {get;set;}
        
        public wrapperAccount(Option__c objAcc)
        {
           // objAccount = new Option__c();
            isSelected = false;
           // objAccount = objAcc;
        }
    
}
// @AuraEnabled(cacheable=true)
// //public static List<Question__c> getAccountList() {
//      public List<AccountWrapper> accWrapList {get; set;}
//      public List<Question__c> selectedAccountList {get;set;} 


//        // List<AccountWrapper> accWrapList = new List<AccountWrapper>();
//         List<Question__c> accList = new List<Question__c>();
//         accList = [SELECT Id , Question__c, (SELECT Id , Option_name__c FROM Options__r) FROM Question__c];
//        //  accList = [SELECT Id , Question__c,Number__c ,Has_Comment__c,Type__c,Description__c, Option_A__c,Option_B__c,Name ,(SELECT Id , Option_name__c FROM Options__r),(SELECT Id ,Answer_name__c FROM Answers__r) FROM Question__c LIMIT 1000];
//         for(Question__c a: accList) {
//             //Add each Account record to AccountWrapperList
//             accWrapList.add(new AccountWrapper(a));
//         }
    
//      @AuraEnabled(cacheable=true)
//      public void getAccountList() {
//         selectedAccountList = new List<Question__c>();
//         for(AccountWrapper obj : accWrapList) {
//             if(obj.isSelected == true) {
//                 selectedAccountList.add(obj.acc);
//             }
//         }
//     }

//     public class AccountWrapper {
//         public Question__c acc {get; set;}
//         public Boolean isSelected {get; set;}
         
//         public AccountWrapper(Question__c a) {
//             acc = a;
//             isSelected = true;
//         }
//     }
//  //  return [SELECT Id , Question__c,Number__c ,Has_Comment__c,Type__c,Description__c, Option_A__c,Option_B__c,Name ,(SELECT Id , Option_name__c FROM Options__r),(SELECT Id ,Answer_name__c FROM Answers__r) FROM Question__c LIMIT 1000];
// //}


}