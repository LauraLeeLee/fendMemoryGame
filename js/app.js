
/*
 * Create a list that holds all of your cards
 */
 const deck = document.querySelector('.deck'); //ul- holder of cards
 let card= document.getElementsByClassName('card');
 // creates array of cards using spread.
 let cards = [...card];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
    console.log("shuffled");
  }

//function to start game shuffling cards randomly
function startGame() {
  let cardsShuffled = shuffle(cards); //an array
  for(let i = 0; i < cardsShuffled.length; i++){
    deck.appendChild(cardsShuffled[i]);
  }
}

let restart = document.querySelector('.restart');
restart.addEventListener('click', startGame);

//starts game on window load/reload
window.onload = startGame();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//adds event listener to all cards
deck.addEventListener('click', function(event){
  showCard();
  openedCards();
});

function showCard() {
  if(event.target.className === 'card'){
    event.target.classList.toggle('open');
    event.target.classList.toggle('show');
  }
}

// let cardImage = document.getElementsByTagName('i');
let cardsOpen= [];
function openedCards() {
  cardsOpen.push(event.target);

  console.dir(event.target);

  children = cardsOpen[0].childNodes;
  // console.log(children);
  for(let i = 0; i<children.length;i++){
    console.log("image classname: " + children[i].className);
  }

  console.log("image classname: " + cardsOpen[0].childNodes);
  if (cardsOpen.length == 2) {
    // counterIncrement();
    if(cardsOpen[0].firstElementChild.className === cardsOpen[1].firstElementChild.className) {
      theyMatch();
    } else {
      noMatch();
    }
  }
}

function theyMatch() {
    cardsOpen[0].classList.add('match');
    cardsOpen[1].classList.add('match');
    cardsOpen[0].classList.remove('show', 'open');
    cardsOpen[1].classList.remove('show', 'open');
    cardsOpen = [];
  console.log('they match');
}

function noMatch() {
  cardsOpen[0].classList.add('no-match');
  cardsOpen[1].classList.add('no-match');
  // cardsOpen[0].classList.remove('show', 'open');
  // cardsOpen[1].classList.remove('show', 'open');
}
