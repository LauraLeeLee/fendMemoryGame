
/*
 * Create a list that holds all of your cards
 */
 const deck = document.querySelector('.deck'); //ul- holder of cards
 let card= document.getElementsByClassName('card');
 // creates array of cards using spread.
 let cards = [...card];

 let star1 = document.querySelector('.one');
 let star2 = document.querySelector('.two');
 let star3 = document.querySelector('.three');
 let counter =document.getElementsByClassName('moves');
 let modal = document.getElementById('modal');
 let score = 0;
 let matchedSets = 0;

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
    counter[0].innerHTML = 0;
    star3.style.visibility = 'visible';
    star2.style.visibility = 'visible';
    star1.style.visibility = 'visible';
    matchedSets = 0;
  }
}

let restart = document.getElementsByClassName('restart');
let restarts = [...restart];
  for(let i = 0; i < restart.length; i++) {
  restarts[i].addEventListener('click', function(event){
    removeMatch();
    startGame();
    modal.style.visibility = 'hidden';
  });
}

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
  if((event.target.className === 'card') && (cardsOpen.length<2)){
    event.target.classList.toggle('open');
    event.target.classList.toggle('show');
    moveCounter();
  }
}

function removeMatch() {
  cards.forEach(function(item){
    item.classList.remove('match');
  });
}

// let cardImage = document.getElementsByTagName('i');
let cardsOpen= [];
function openedCards() {
  cardsOpen.push(event.target);
  // console.dir(event.target);
  // if (cardsOpen.length == 1) {
  //   if(cardsOpen[0].firstElementChild.className === cardsOpen[0].firstElementChild.className) {
  //     noMatch();
  //   }
  // }
  if (cardsOpen.length == 2) {
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
    console.log(cardsOpen);
    cardsOpen = [];
    matchedSets++;
    winGame();
  console.log('matchedSets: ' + matchedSets);
  // cardsOpen.forEach(function(item){
  //   item.removeEventListener('click', function(event));
  // });
}

function noMatch() {
  cardsOpen[0].classList.add('no-match', 'no-match-shake');
  cardsOpen[1].classList.add('no-match', 'no-match-shake');
  noMatchFlip();
}

function noMatchFlip() {
    setTimeout(function(){
      cardsOpen[0].classList.remove('no-match', 'no-match-shake');
      cardsOpen[1].classList.remove('no-match', 'no-match-shake');
      cardsOpen[0].classList.remove('show', 'open');
      cardsOpen[1].classList.remove('show', 'open');
      cardsOpen = [];
    }, 1000);
}

//function to increment move counter, called in eventListener for card click
function moveCounter() {
    score++;
    counter[0].innerHTML = score;
    starRating();
}

//star rating determined by how many clicks used to win game
function starRating() {
  if((score > 9) && (score <= 16)) {
    star3.style.visibility = 'hidden';
  }
  if((score >16) && (score <=28)) {
  star3.style.visibility = 'hidden';
  star2.style.visibility = 'hidden';
  }
  if(score >28) {
    star3.style.visibility = 'hidden';
    star2.style.visibility = 'hidden';
    star1.style.visibility = 'hidden';
  }
}

/*function to check if game has been won- all cards matched */
function winGame() {
  if(matchedSets === 8){
    let modalHeader = document.getElementById('modal-header');
    let winScore = document.createElement('h3');
    winScore.classList.add('win-score')
    winScore.innerHTML = 'You finished in ' + score + ' moves!';
    let starRate = document.createElement('h3');
    starRate.classList.add('star-rate')
    starRate.innerHTML = 'Your star rating was ';
    console.log(modal);
    modalHeader.appendChild(winScore);
    modalHeader.appendChild(starRate);

    modal.style.visibility = 'visible';
    console.log('you win!');
    console.log(cards);
  }
}

// function disable() {
//   if(cardsOpen.length > 0) {
//     cardsOpen[0]
//   }
// }



/*code for timer */
let seconds = 00;
let minutes = 00;
let hours = 0;
let timer = document.getElementById('timer');
// timer.innerHTML = '0:00:00';

function timerIncrements() {

    seconds++;
    if(seconds>=60){
    seconds = 0;
    minutes++;
      if(minutes >= 60){
        minutes = 0;
        hours++;
      }
   }

  // if (seconds <=9){
  //   seconds = '0' + seconds;
  // } else {
  //   seconds = seconds;
  // }
  // if (minutes > 9) {
  //   minutes = minutes;
  // }
  //  else if((minutes >=1 && minutes <= 9)) {
  //   minutes = '0' + minutes;
  // } else {
  //   minutes = '00';
  // }
seconds = (seconds > 9 ? seconds : '0' + seconds);
minutes = (minutes > 0 ? (minutes > 9 ? minutes : '0' + minutes) : '00');

timer.innerHTML = hours +':' + minutes + ':' + seconds;
console.log(hours +':' + minutes + ':' + seconds);
  startTimer();
 }
    // h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00")
    // + ":" +
    // (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
    // + ":" +
    // (seconds > 9 ? seconds : "0" + seconds);

function startTimer() {
  setTimeout(timerIncrements, 1000);
}

// startTimer();
