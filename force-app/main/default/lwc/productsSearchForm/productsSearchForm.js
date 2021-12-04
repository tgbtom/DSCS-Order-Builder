import { LightningElement } from 'lwc';

export default class ProductsSearchForm extends LightningElement {

    searchTerm;

    handleSearchTermChange(event){
        //Here we dispatch a custom event with the search term, so the parent can retrieve the data
        this.searchTerm = event.target.value;
        const searchEvent = new CustomEvent('search', {detail: { searchTerm: this.searchTerm }});
        this.dispatchEvent(searchEvent);
    }
}