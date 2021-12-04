import { LightningElement, api } from 'lwc';

const PRICE_NOT_LISTED = "Price not Listed";

export default class ProductCard extends LightningElement {

    @api product;
    price;
    priceMessage = PRICE_NOT_LISTED;
    priceListed = false;

    renderedCallback(){
        if(this.product && this.product.PricebookEntries != undefined){
            this.price = this.product.PricebookEntries.records[0].UnitPrice;
            this.priceListed = true;
        }
    }
    

}