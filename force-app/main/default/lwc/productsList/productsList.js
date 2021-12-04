import { LightningElement, wire, api } from 'lwc';
import getAllProducts from '@salesforce/apex/ProductDataService.getAllProducts';

export default class ProductsList extends LightningElement {

    @api products;

}