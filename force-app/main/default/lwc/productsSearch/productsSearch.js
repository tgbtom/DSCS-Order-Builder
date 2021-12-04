import { LightningElement, wire } from 'lwc';
import getAllProducts from '@salesforce/apex/ProductDataService.getAllProducts';


export default class ProductsSearch extends LightningElement {

    searchTerm = '';
    products;

    @wire(getAllProducts, { term: '$searchTerm'}) 
    wiredProducts({ error, data }) {
        console.log('searching... ' + this.searchTerm);
        if(data){
            this.products = JSON.parse(data);
        } else if (error){
            console.log('error: ' + error.message);
        }
    };

    handleSearchTermChanged(event){
        this.searchTerm = event.detail.searchTerm;
    }

}