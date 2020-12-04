import {elements} from "./base";
import {limitBookAuthors, limitBookTitle} from './searchView';


export const clearBook = () => {
    elements.book.innerHTML = ''; 
}

export const limitDescription = (description) => 
{ 
    if (typeof description!== 'undefined' && description) {
        return description; 
    } else {
        let description = ''
        return description
    }
}

export const limitPrice = (listPrice) => 
{ 
    if (typeof listPrice!== 'undefined' && listPrice) {
        return ('$' + listPrice.amount + ' USD'); 
    } else {
        let listPrice = "Free"
        return listPrice; 
    }
}

const limitBuyLink = (buyLink = '_') => 
{ 
    return buyLink; 
}

export const renderBookDescription = (item, isLiked) => { 

        let  markup = `
        <figure class="book__fig">
            <button class="book__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
            <img src="${(item.volumeInfo.imageLinks.thumbnail)}" alt="${limitBookTitle(item.volumeInfo.title)}"class="book__img">
            <div class="book__main">
                <div class="book__title">
                    <span>${limitBookTitle(item.volumeInfo.title)}</span>
                </div> 
                <div class="book__authors">
                    <span>${limitBookAuthors(item.volumeInfo.authors)}</span>
                </div>
            </div>      
        </figure>

        <div class="book__details">
            <div class="book__info">
                <span class="book__price">
                ${limitPrice(item.saleInfo.listPrice)}
                </span>
                <button class="btn-small recipe__btn recipe__btn-add">
                    <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <a target="_blank" href=${limitBuyLink(item.saleInfo.buyLink)}>Get the ebook</a>
                </button>

            </div>
        </div>
        <div class="book__description">
            <span class="book__desc">${limitDescription(item.volumeInfo.description)}</span>
        </div>
    `;
        elements.book.insertAdjacentHTML('beforeend', markup);      
};


