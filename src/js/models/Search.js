import axios from 'axios';

export default class Search {
    
    constructor(query) {
        this.query = query; 
    }

    async getResults() {

        const key = 'AIzaSyAR8vAiMaX9ZPO1za5BJ_7mKP59iufApNU';
        
        try {
            const res = await axios(`https://www.googleapis.com/books/v1/volumes?q=${this.query}+intitle&key=${key}&maxResults=40`);
            this.result = res.data.items;
        } catch (error) {
            alert(error);
        } 
    }   

}

