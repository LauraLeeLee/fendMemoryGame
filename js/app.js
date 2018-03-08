
/*
 * Create a list that holds all of your cards
 */
 const deck = document.querySelector('.deck'); //ul- holder of cards

 // let card= document.getElementsByClassName('card');

 // creates array of cards using spread.
 let cardType = ['fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-paper-plane-o'];
 let cards =[],
    fullDeck = [],
    cardEl,
    backImageEl,
    frontImageEl,
    star1 = document.querySelector('.one'),
    star2 = document.querySelector('.two'),
    star3 = document.querySelector('.three'),
    starTally,
    counter =document.getElementsByClassName('moves'),
    modal = document.getElementById('modal'),
    timer = document.getElementById('stop-watch'),
    score = 0,
    matchedSets = 0,
   //variable to check if game has started
    gameStarted = false,
    timeCount,
    currentTime,
    cardsShuffled = [],
    endGame = document.getElementsByClassName('end-game');

//function to start game shuffling cards randomly
function startGame() {
    makeCards(cardType);
    renderCardsToGame();
    gameStarted = false;
    score = 0;
    counter[0].innerHTML = 0;
    timer.innerHTML = '0:00:00';
    clearInterval(timeCount);
    star3.style.visibility = 'visible';
    star2.style.visibility = 'visible';
    star1.style.visibility = 'visible';
    matchedSets = 0;
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
    console.log("shuffled");
    return array;
  }

  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

  function makeCards(array) {
    // cards =[];
    fullDeck = [];
    for(let i = 0; i < array.length; i++) {
      fullDeck.push(array[i]);
    }
    //doubles the creation of each card image
    fullDeck = [...fullDeck, ...fullDeck];
  }

  function renderCardsToGame() {
    deck.innerHTML ='';
    cardsShuffled = shuffle(fullDeck); //an array
    console.log(cardsShuffled);
    //appends shuffled cards to the game board(deck)
    for(let i = 0; i < cardsShuffled.length; i++){
      cardEl = document.createElement('li');
      cardEl.classList.add('card');
      cardEl.id = "card-" + i;
      frontImageEl = document.createElement('i');
      frontImageEl.classList.add('front-card');
      backImageEl = document.createElement('i');
      backImageEl.classList.add('fa', cardsShuffled[i], 'back-card', 'toggle-view');
      cardEl.appendChild(frontImageEl);
      cardEl.appendChild(backImageEl);
      deck.appendChild(cardEl);

      //adds event listener to all cards
      cardEl.addEventListener('click', clickResponse);

    }
   }

//function to manage what happens for the click event to cards
function clickResponse() {
  // debugger;
  const card = this;
  // check for game start on first click
  // if (!gameStarted) {
  //   gameStarted = true;
  //   stopWatch();
  // }
  showCard(card);
  console.log(card);
//   setTimeout(function() {
//
// }, 300);
}

function showCard(card) {
  console.dir(card);
  if((card.className === 'card') && (cardsOpen.length<2)){
    card.classList.add('flip');
    // card.firstChild.classList.add('toggle-view');
    // card.lastChild.classList.remove('toggle-view');
    moveCounter();
    openedCards(card);
  }
}

function removeMatch() {
  cardsOpen.forEach(function(item){
    item.classList.remove('match', 'match-grow');
    item.addEventListener('click', clickResponse);
    console.log(item);
  });
}

// let cardImage = document.getElementsByTagName('i');
let cardsOpen= [];
function openedCards(card) {
  cardsOpen.push(card);
  card.removeEventListener('click', clickResponse);
  if (cardsOpen.length == 2) {
    console.log(cardsOpen[0], cardsOpen[1]);
    console.log(cardsOpen[0].lastChild.className , cardsOpen[1].lastChild.className )
    if(cardsOpen[0].id === cardsOpen[1].id){
      noMatch();
    }
    if(cardsOpen[0].lastChild.className === cardsOpen[1].lastChild.className) {
        theyMatch();
      } else {
        noMatch();
      }
  }
  // console.log(cardsOpen);
}

function theyMatch() {
    cardsOpen[0].classList.add('match', 'match-grow');
    cardsOpen[1].classList.add('match', 'match-grow');
    cardsOpen[0].lastChild.classList.add('match', 'match-grow');
    cardsOpen[1].lastChild.classList.add('match', 'match-grow');

    cardsOpen[0].firstChild.classList.add('match', 'match-grow');
    cardsOpen[1].firstChild.classList.add('match', 'match-grow');
    console.dir(cardsOpen);
    cardsOpen = [];
    matchedSets++;
    winGame();
}

function noMatch() {
  cardsOpen[0].lastChild.classList.add('no-match', 'no-match-shake');
  cardsOpen[1].lastChild.classList.add('no-match', 'no-match-shake');
  console.log(cardsOpen[0].lastChild, cardsOpen[1].lastChild);
  noMatchFlip();
}

function noMatchFlip() {
    setTimeout(function(){
      cardsOpen[0].lastChild.classList.remove('no-match', 'no-match-shake');
      cardsOpen[1].lastChild.classList.remove('no-match', 'no-match-shake');

      // cardsOpen[0].firstChild.classList.remove('toggle-view');
      // cardsOpen[0].lastChild.classList.add('toggle-view');
      // cardsOpen[1].firstChild.classList.remove('toggle-view');
      // cardsOpen[1].lastChild.classList.add('toggle-view');

      cardsOpen[0].classList.remove('flip');
      cardsOpen[1].classList.remove('flip');
      cardsOpen[0].addEventListener('click', clickResponse);
      cardsOpen[1].addEventListener('click', clickResponse);
      cardsOpen = [];
    }, 750);
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
    starTally = 2;
  }
  if((score >16) && (score <=28)) {
  star3.style.visibility = 'hidden';
  star2.style.visibility = 'hidden';
  tarTally = 1;
  }
  if(score >28) {
    star3.style.visibility = 'hidden';
    star2.style.visibility = 'hidden';
    star1.style.visibility = 'hidden';
    starTally = 0;
  }
}

// function renderStars(starTally){
//   let stars = document.querySelector('.fa-star');
//
// }

/*function to check if game has been won- all cards matched */
function winGame() {
  setTimeout(function(){
    if(matchedSets === 8){
      let modalHeader = document.getElementById('modal-header');
      let winScore = document.createElement('h3');
      let finalTime = document.createElement('h3');

      winScore.classList.add('win-score');
      finalTime.classList.add('final-time');
      winScore.innerHTML = 'You finished in ' + score + ' moves!';
      finalTime.innerHTML = 'You matched all cards in ' + currentTime;

      let starRate = document.createElement('h3');
      starRate.classList.add('star-rate')
      starRate.innerHTML = 'Your star rating was ' + starTally;
      modalHeader.appendChild(winScore);
      modalHeader.appendChild(starRate);
      modalHeader.appendChild(finalTime);
      clearInterval(timeCount);
      modal.style.visibility = 'visible';
      console.log('you win!');
    }
  }, 1000);
}

endGame[0].addEventListener('click', function(){
  modal.innerHTML = '<h2>Thanks for playing!</h2>';
});

/*code for timer */
function stopWatch() {
  //extract time right now
  let startTime = new Date().getTime();

  //increment per second the stopwatch counter on page
  timeCount = setInterval(function() {
    let now = new Date().getTime();

    //find elapsed time between startTime and now
    let elapsedTime = now - startTime;

    //find minutes and seconds
    let secs = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let mins = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    //add preface of 0 if secs < 10 and if mins < 10
    if(secs < 10) {
      secs = '0' + secs;
    }
    if(mins < 10) {
      mins = '0' + mins;
    }
    currentTime = hours + ':' + mins + ':' + secs;

    // update counter on page
    timer.innerHTML = currentTime;
  }, 500);
};




// let seconds = 00;
// let minutes = 00;
// let hours = 0;
//
//
// function timerIncrements() {
//     seconds++;
//     if(seconds>=60){
//     seconds = 0;
//     minutes++;
//       if(minutes >= 60){
//         minutes = 0;
//         hours++;
//       }
//    }
// seconds = (seconds > 9 ? seconds : '0' + seconds);
// minutes = (minutes > 0 ? (minutes > 9 ? minutes : '0' + minutes) : '00');
//
// timer.innerHTML = hours +':' + minutes + ':' + seconds;
// console.log(hours +':' + minutes + ':' + seconds);
//   startTimer();
//  }
//
// function startTimer() {
//   setTimeout(timerIncrements, 1000);
// }

// startTimer();
