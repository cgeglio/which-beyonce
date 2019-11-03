var playBtnMain = document.querySelector(".play-btn");
var playBtnWelcome = document.querySelector(".welcome-btn");
var welcomeMsg = document.querySelector(".welcome-msg")
var winnerMsg = document.querySelector(".winner-msg")
var playerOne = document.querySelector(".input-one");
var playerTwo = document.querySelector(".input-two");
var sidebars = document.querySelector(".sidebar");
var cardContainer = document.querySelector(".card-container");
var deck = new Deck;
var main = document.querySelector("main");
var gamePage = document.querySelector(".game-page");
var nameOne = document.querySelectorAll(".name-one");
var nameTwo = document.querySelectorAll(".name-two");
var cardNumber = 1;
var cardId = 10;
// var cards = document.querySelectorAll(".card");


playBtnMain.addEventListener("click", showDirections);
playerOne.addEventListener("keyup", checkInputs);
playBtnWelcome.addEventListener("click", showGame);
cardContainer.addEventListener("click", pickCards);

function pickCards() {
  // console.log(deck.cards);
  // for (var i = 0; i < deck.cards.length; i++) {
  //   console.log(event.target.parentNode.id);
  //   if (event.target.parentNode.id === deck.cards[i].cardId) {
  if (deck.selectedCards.length < 2) {
      flipCard(event);
      selectCard(event);
  }
}

// }
//
// }


function flipCard(event) {
  // if (deck.selectedCards.length < 2) {
    clickedCard = event.target.closest(".card");
    console.log(clickedCard);
    clickedCard.classList.toggle("flip");

  // } else {
  //   return;
  };

  function selectCard(event) {
    clickedCard = event.target.closest(".card");
    clickedNumber = event.target.closest(".flipper");
    console.log(clickedNumber.id);
    console.log(clickedCard.id);
    clickedCard.classList.add("disable-click");
    clickedCard = new Card (`${clickedNumber.id}`,`${clickedCard.id}`);
    deck.selectedCards.push(clickedCard);
    checkForMatch(event);
  }
// };

function checkForMatch(event) {

  if (deck.selectedCards.length === 2) {
    // for (var i = 0; i < deck.selectedCards.length; i++) {
    //  document.getElementById(deck.selectedCards[i].cardId).remove("disable-click");
     // console.log(this.selectedCards[i]);
     deck.checkSelectedCards();
     removeCard();
  }
}
// }



function removeCard() {
    for (var i = 0; i < deck.matchedCards.length; i++) {
    document.getElementById(deck.matchedCards[i].cardId).style.display = "none";
    if (deck.matches === 5) {
      gamePage.style.display = "none";
      winnerMsg.style.display = "grid";
    }
  }
}


function showGame() {
  main.style.display = "none";
  gamePage.style.display = "flex";
  for (var i=0; i < 5; i++) {
      addCards();
      cardNumber++;
      cardId++;
    }
  cardNumber = 1;
  cardId = 15;
  for (var i=0; i < 5; i++) {
      addCards();
      cardNumber++;
      cardId++;
  }
}

function checkInputs() {
  if (playerOne.value) {
    playBtnMain.id = "active";
  }
};

function showDirections() {
  if (playBtnMain.id === "active") {
    document.querySelector(".player-names").style.display = "none";
    welcomeMsg.style.display = "block";
    for (var i = 0; i < nameOne.length; i++) {
    nameOne[i].innerText = `${playerOne.value.toUpperCase()}`;
    }
  if (playerTwo.value) {
    for (var i = 0; i < nameTwo.length; i++) {
    nameTwo[i].innerText = ` AND ${playerTwo.value.toUpperCase()}`;
  }
}
  } else {
      document.querySelector(".error").style.display = "block";
    }
};


function addCards() {
  var card = new Card(cardNumber, cardId);
  deck.cards.push(card);
  cardContainer.innerHTML += `
  <div class="card" id="${card.cardId}">
    <div class="flipper flipper-${cardNumber}" id="${cardNumber}">
      <div class="front">
        <h6>J<br/>V<br/>N</h6>
      </div>
      <img class="back" src="images/JVN-${cardNumber}.jpg">
    </div>
  </div>`;
}
