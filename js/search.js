const header = document.querySelector('div.page-header');
const searchDiv = newElement('div','student-search');
searchDiv.innerHTML = `
        <input placeholder="Search for students...">
        <button>Search</button>
`;
header.appendChild(searchDiv);

function searchFunction(searchedString) {
    //clears page li elements from people ul list
    ul.innerHTML = '';
    //removes current pagination div
    const pagination = document.querySelector('div.pagination');
    ul.parentNode.removeChild(pagination);

    for(let x=0; x < initialPeople.length; x++) {
        let name = initialPeople[x].firstElementChild.firstElementChild.nextElementSibling.innerText;
        if( name.indexOf(searchedString) != -1 ) {
            ul.appendChild(initialPeople[x]);
        }
    }
    appendPageLinks();
    if(ul.innerHTML === '') {
        ul.innerHTML = `Nope, there's nobody registered with that name. Try again.`;
    }
};

//appending functionality to the search button, so it triggers the search function and sends the string searched by the user as an argument 
searchDiv.addEventListener('input', (event) => {
        const searchString = searchDiv.children[0].value;
        searchFunction(searchString);
});