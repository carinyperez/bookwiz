import Search from './models/Search';
import * as searchView from './views/searchView';
import * as bookView from './views/bookView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader} from './views/base';
import Likes from './models/Likes';


/** Global state of the app
 * - Search object 
 * - Current book object
 * - Shopping list object 
 * - Liked books 
*/


const state = {}; 
 

/**
* SEARCH CONTROLLER 
*/

const controlSearch = async () => {
    const params = searchView.getParams(); 
    const query = searchView.getInput();

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
            renderLoader(elements.searchResList); 

            // 4) Search for books and extend book  
            await state.search.getResults(); 
            // 5) render results on UI 
            // console.log(state.search.result);
            clearLoader(); 
            searchView.renderResults(state.search.result);

        }
}

// the default is to reload 
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {

    const btn = e.target.closest('.btn-inline'); 
    if (btn) {
        // print out page and calls renderResults
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults(); 
        searchView.renderResults(state.search.result, goToPage); 
    }
}); 

const controlBook = () => { 
    const id = window.location.hash.replace('#', ''); 

    if (id) {
            // Prepare UI for changes
            bookView.clearBook();
            renderLoader(elements.book);

            // Highlight selected search item
            if (state.search) searchView.highlightSelected(id); 
            // Create a new book object 
            const books = state.search.result;
            const index = books.map(e => e.id).indexOf(id);
            // render book 
            clearLoader(); 
            bookView.renderBookDescription(
                books[index], 
                state.likes.isLiked(id) 
                ); 
    }

}

window.addEventListener('hashchange', controlBook);


/**
 * LIKE CONTROLLER 
*/


const controlLike = () => {

    if (!state.likes) state.likes = new Likes();
    const id = window.location.hash.replace('#', '');
    // find index of current id
    const books = state.search.result;
    const index = books.map(e => e.id).indexOf(id);
    const title = books[index].volumeInfo.title; 
    const author = books[index].volumeInfo.authors;
    const img = books[index].volumeInfo.imageLinks.thumbnail;

    // User has not yet liked current recipe
    if (!state.likes.isLiked(id)) {
        // Add like to the state 

        const newLike = state.likes.addLike(
            id,
            title,   
            author, 
            img
        ); 
     
        // Toggle the like button 
        likesView.toggleLikeBtn(true);
        // Add like to the UI list
        likesView.renderLike(newLike);
    
        // console.log(state.likes); 
    // User has liked current recipe
    } else {
        // remove like from the state 
        state.likes.deleteLike(id); 
        // Toggle the like button 
        likesView.toggleLikeBtn(false);
        // Remove like to the UI list
        likesView.deleteLike(id);  
        console.log(state.likes);

    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}


// Restore liked recipes on page load = 
window.addEventListener('load', () => {

    state.likes = new Likes(); 

    // Restore likes

    state.likes.readStorage(); 

    // Toggle like menu button 
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // render the existing likes 
    state.likes.likes.forEach(like => likesView.renderLike(like)); 
});

elements.book.addEventListener('click', e => { 
    if (e.target.matches('.book__love, .book__love *')) { 
        controlLike(); 
    }
});

