import { LightningElement, api, wire } from 'lwc';

import { publish, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';

import OrderProduct from '@salesforce/messageChannel/OrderProduct__c';

const PRICE_NOT_LISTED = "Price not Listed";

export default class ProductCard extends LightningElement {

    @wire(MessageContext) messageContext;

    @api product;
    price;
    priceMessage = PRICE_NOT_LISTED;
    priceListed = false;

    renderedCallback(){
        if(this.product && this.product.PricebookEntries !== undefined){
            if(this.product.PricebookEntries.records[0].UnitPrice){
                this.price = this.product.PricebookEntries.records[0].UnitPrice;
                this.priceListed = true;
            }
        }
    }

    addToCart(event){
        const prodId = event.target.dataset.value;
        publish(this.messageContext, OrderProduct, { recordId: prodId }, {Scope: APPLICATION_SCOPE});
    }
    

}