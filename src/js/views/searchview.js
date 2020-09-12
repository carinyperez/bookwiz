import { elements } from "./base"

export const getInput = () => elements.searchInput.value; 
export const getParams = () => elements.searchParams.value; 

export const clearInput = () =>  {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}

const renderBooks = item => {

    const markup = `
        <li>
            <a class="results__link" href="#${item.id}">
                <figure class="results__fig">
                         <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="${item.volumeInfo.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${item.volumeInfo.title}</h4>
                    <p class="results__author">${item.volumeInfo.authors}
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = items => {
    items.forEach(renderBooks);
};
