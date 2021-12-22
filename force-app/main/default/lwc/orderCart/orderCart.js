import { LightningElement, wire } from 'lwc';

import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import OrderProduct from  '@salesforce/messageChannel/OrderProduct__c';
import getProduct from '@salesforce/apex/ProductDataService.getProduct';

export default class OrderCart extends LightningElement {

    subscription;
    products;

    @wire(MessageContext) messageContext;

    connectedCallback(){
        this.subscription = subscribe(this.messageContext, OrderProduct, (message) => {this.addToCart(message.recordId)}, {Scope: APPLICATION_SCOPE});
    }

    disconnectedCallback(){
        this.subscription = null;
    }

    addToCart(productId){
        //here we need to make an imperative call to apex to get the product being added, then add it to our products list
        getProduct({productId: productId}).then(
            (product) => {
                if(this.products === null || this.products === undefined){
                    this.products = [JSON.parse(JSON.stringify(product))];
                } else{
                    this.products = this.products.push(JSON.parse(JSON.stringify(product)));
                }
                console.log("Products: " + this.products);
                console.log("Products: " + JSON.stringify(this.products));
            }
        );
    }

}