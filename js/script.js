/* --- global variables --- */
const ul = document.querySelector('ul.student-list');
//copies all the initial people li's into an array
let initialPeople = fetchCurrentPeople();


/* --- functions --- */
//function used to create new element of given tagname and class
function newElement(elementTag, elementClass) {
   let element = document.createElement(elementTag);
   element.className = elementClass;
   return element;
}

//function that fetches all the people that are currently listed in the ul
function fetchCurrentPeople () {
   const currentPeople = [];
   for (let x=0; x < ul.children.length; x++) {
      currentPeople[x] = ul.children[x];
   }
   return currentPeople;
}

//function showPage adds to first ul people that belong only to that page as sepparate li's 
//to speed things up, instead of hiding all the other elements, it just displays the one's that are needed
function showPage (pageNumber, currentPeople) {
   ul.innerHTML = '';
   for(let x = (pageNumber-1)*10; x < pageNumber*10 && x < currentPeople.length; x++) {
      ul.appendChild(currentPeople[x]);
   }   
}; 

//appendPageLinks function that build the navigation div below the people names
function appendPageLinks () {
   const numberOfPages = Math.ceil(ul.children.length / 10);
   let currentPeople = fetchCurrentPeople();
   let navigationDiv = newElement('div', 'pagination');
   let navigation = '<ul>';
   for (let x=0; x<numberOfPages; x++)
   {
      //if x is not the first page, active class will note be applied 
      if(x) {
         navigation += `<li><a href="#">${x+1}</a></li>`;
      }
      //otherwise it means x is 0 so the first page, so active class needs to be applied
      else {
         navigation += `<li><a class="active" href="#">${x+1}</a></li>`;
         //if it's the first page then showPage function will be called to display the first page
         showPage(1, currentPeople);
      }
   }
   navigation += '</ul>';
   navigationDiv.innerHTML = navigation;
   ul.parentNode.appendChild(navigationDiv);
   addFunctionalityToPageLinks(navigationDiv, currentPeople);
};


// addFunctionalityToPageLinks function adds an event listener on the page number navigation 
// it triggers the showPage function for the clicked page number and also changes css classes
function addFunctionalityToPageLinks (navigationDiv, currentPeople) {
   navigationDiv.addEventListener('click', (event) => {
      //checks if the user clicked on a page number link from the page navigation 
      if(event.target.tagName === 'A') {
         const clickedPage = event.target;
         const clickedPageNumber = parseInt(event.target.innerText);
         const clickedPageNumberIndex = clickedPageNumber - 1;
         const allPageNumbers = clickedPage.parentNode.parentNode.children;
         
         //triggers the show page function and sends page number to it
         showPage(clickedPageNumber, currentPeople);
         
         //goes through all page numbers and applies active class only to the page number that was clicked
         for(let x = 0; x < allPageNumbers.length; x++) {
            if( x !== clickedPageNumberIndex ) {
               allPageNumbers[x].firstElementChild.classList.remove('active');
            }
            else if( x === clickedPageNumberIndex ) {
               allPageNumbers[x].firstElementChild.className = 'active';
            }
         }
      }
   });
}

//function appendPage is called after DOM load because script is included before body close in index html file
appendPageLinks();




