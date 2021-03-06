export const elements = {

    searchForm: document.querySelector('.searchbar'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'), 
    searchResList: document.querySelector('.results__list'),
    searchParams: document.querySelector('.options'),
    searchResPages: document.querySelector('.results__pages'),
    book: document.querySelector('.book'),
    shopping: document.querySelector('.shopping'),
    likesMenu: document.querySelector('.likes__field'), 
    likesList: document.querySelector('.likes__list')
};

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class= "${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}
