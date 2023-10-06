public with sharing class RecordTableController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accountId){
        return [SELECT Id, FirstName, LastName, Phone, Email, Asgn_Office_Country__c 
                FROM Contact where AccountId = :accountId ];
    }
    @AuraEnabled
public static Contact updateContact(Contact contact) {
    update contact;
    return contact;
}

}
