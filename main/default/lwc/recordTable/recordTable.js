import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import fetchAccount from '@salesforce/apex/RecordTableController.fetchAccount';
import getContacts from '@salesforce/apex/RecordTableController.getContacts';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Office Country', fieldName: 'Asgn_Office_Country__c', type: 'text' },
    {
        label: 'Edit',
        type: 'button',
        initialWidth: 135,
        typeAttributes: {
            label: 'Edit',
            name: 'edit',
            title: 'Click to edit',
            variant: 'base',
        },
    },
];
export default class RecordTable extends NavigationMixin(LightningElement) {

    allContact = [];
    accountId;
    columns = COLUMNS;

    @wire(getContacts, { accountId: '$accountId' }) 
    accounts({ error, data }) {
        if (data) {
            this.allContact = data
        }
        if (error) {
            console.error('Error occured : ' + error.body.message);
        }
    };

    fetchContacts(event) {
        this.accountId = event.target.value;
        //this.getContacts();
    }

    /*getContacts() {
        getContacts({ accountId: this.accountId  })// Imparative call
        .then(result => {
            this.allContact = result;
        })
        .catch(error => {
            console.error('Error occured : ' + error.body.message);
        });
    }*/

    get isCntactsAvailable() {
        return this.allContact.length > 0;
    }

    handleRowAction(event) {
        //const actionName = event.detail.action.name;
        const recId = event.detail.row.Id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recId,
                objectApiName: 'Contact',
                actionName: 'edit'
            }
        });

    }


    handleSave(event) {
        console.log('Calling after save');
    }
}