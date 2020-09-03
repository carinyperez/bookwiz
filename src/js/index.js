import Search from './models/Search';

/** Global state of the app
 * - Search object 
 * - Current book object
 * - Shopping list object 
 * - Liked books 
*/


const state = {}; 

const controlSearch = async () => {
    // 1) get query from view 
    const query = 'Goosebumps' // TODO 

    if (query) {
        // 2) New search object and add it to state 
        state.search = new Search(query);

        // 3) Prepare UI for results 

        // 4) Search for books 
        await state.search.getResults(); 

        // 5) render results on UI 
        console.log(state.search.result);
    }
}

// the default is to reload 
document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});







