import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/** Global state of the app
 * - Search object 
 * - Current book object
 * - Shopping list object 
 * - Liked books 
*/


const state = {}; 

const controlSearch = async () => {

    //set search parameters 
    const params = searchView.getParams(); 
    // 1) get query from view 
    const query = searchView.getInput();
    console.log(query); 

        if(query) {

            if (params == 1) {
                state.search = new Search(query,'subject');
            } 

            if (params == 2) {
                state.search = new Search(query,'inauthor');
            } 
            if (params == 3) {
                state.search = new Search(query,'intitle');
            } 
            if (params == 4) {
                state.search = new Search(query,'isbn');
            } 
            
            
            // 3) Prepare UI for results 
            searchView.clearInput();
            searchView.clearResults(); 

            // 4) Search for books 
            await state.search.getResults(); 

            // 5) render results on UI 
            // console.log(state.search.result);
            searchView.renderResults(state.search.result);

    }
}


// the default is to reload 
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});







