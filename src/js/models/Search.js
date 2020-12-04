import axios from 'axios';
import {key} from '../config';

export default class Search {
    
    constructor (query,terms) {
        this.query = query; 
        this.terms = terms; 
    }
    async getResults() {

        try {            
            const res = await axios(`https://www.googleapis.com/books/v1/volumes?q=${this.query}+${this.terms}&filter=ebooks&key=${key}&maxResults=30`);
            this.result = res.data.items;
        } catch (error) {
            alert(error);
        } 
    } 
}

