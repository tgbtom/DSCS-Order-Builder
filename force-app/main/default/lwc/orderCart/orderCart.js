import { LightningElement, wire } from 'lwc';

import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import OrderProduct from  '@salesforce/messageChannel/OrderProduct__c';
import getProduct from '@salesforce/apex/ProductDataService.getProduct';

export default class OrderCart extends LightningElement {

    subscription;
    products;
    productsUpdated;
    subTotal = 0;

    @wire(MessageContext) messageContext;

    connectedCallback(){
        this.subscription = subscribe(this.messageContext, OrderProduct, (message) => {
            if(message.action === 'remove'){
                this.removeFromCart(message.recordId);
            } else{
                this.addToCart(message.recordId);
            }
        }, 
            {Scope: APPLICATION_SCOPE});
    }

    disconnectedCallback(){
        this.subscription = null;
    }

    addToCart(productId){
        //here we need to make an imperative call to apex to get the product being added, then add it to our products list
        getProduct({productId: productId}).then(
            (product) => {
                //Use productsUpdated as a temporary placeholder, to nullify and reset products so that the UI will re-generate with the updated list
                this.productsUpdated = this.products;
                this.products = null;

                if(this.productsUpdated === null || this.productsUpdated === undefined){
                    this.productsUpdated = [JSON.parse(product)];
                } else{
                    this.productsUpdated[this.productsUpdated.length] = JSON.parse(product);
                }
                this.products = this.productsUpdated;
                this.productsUpdated = null;

                this.subTotal = 0;
                this.products.forEach(element => {
                    this.subTotal += element.PricebookEntries.records[0].UnitPrice;
                });
            }
        );
    }

    removeFromCart(productId){
        //We need to search the products list for an item matching our ID and remove it from the array
        let foundSpot = 0;
        this.productsUpdated = this.products;
        //this.products = null;
        this.products.forEach((element, index) => {
            if(element.Id === productId){
                foundSpot = index;
            }
        });
        this.productsUpdated.splice(foundSpot, 1);

        this.products = this.productsUpdated;
        this.productsUpdated = null;

        this.subTotal = 0;
        this.products.forEach(element => {
            this.subTotal += element.PricebookEntries.records[0].UnitPrice;
        });
    }

}