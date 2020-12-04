import { elements } from "./base"

export const getInput = () => elements.searchInput.value; 
export const getParams = () => elements.searchParams.value;


export const clearInput = () =>  {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const highlightSelected = id => {

    const resultsArr = Array.from(document.querySelectorAll('.results__link')); 
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');

    });  
    document.querySelector(`a[href*="${id}"]`).classList.add(`results__link--active`);
}; 

 
export const limitBookTitle = (title = '_', limit = 40) => {

    const newTitle = [];

    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length; 
        }, 0);
        return `${newTitle.join(' ')})...`;
    }
    return title;

}

export const limitBookAuthors = (authors = '_', limit = 3) => 
{ 
    if(authors.length > limit) {
        return `${authors.slice(0,3)}...`; 
    } else {
        return authors;
    }
}

const renderBooks = item => {
  
        const markup = `
        <li>
            <a class="results__link" href="#${item.id}">
                <figure class="results__fig">
                         <img src="${(item.volumeInfo.imageLinks.thumbnail)}" alt="No image found">
                </figure>
                <div class="results__data">
                        <h4 class="results__name">${limitBookTitle(item.volumeInfo.title)}</h4>
                    <p class="results__author">${limitBookAuthors(item.volumeInfo.authors)}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);      
 
};

const createButton = (page, type) => `

    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>

`; 

const renderButtons = (page, numResults, resPerPage) => {

    const pages = Math.ceil(numResults / resPerPage); // 3 pages

    let button; 

    if(page === 1 && pages > 1) {
        // Only button to go to the next page 
         button = createButton(page, 'next');
        //  console.log(button);
    } else if (page < pages) {

        button  = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;

    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
        // Only button to go to prev page 

    };

    // insert into DOM 
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

}; 


export const renderResults = (items, page = 1, resPerPage = 10)=> {
    

    const start = (page - 1) * resPerPage; 
    const end = page * resPerPage;

    items.slice(start,end).forEach(renderBooks);
    // items.forEach(renderBookDescription); 
    // render pagination buttons 
    renderButtons(page, items.length, resPerPage);
    
};

