var playBtnMain = document.querySelector(".play-btn");
var playBtnWelcome = document.querySelector(".welcome-btn");
var welcomeMsg = document.querySelector(".welcome-msg")
var playerOne = document.querySelector(".input-one");
var playerTwo = document.querySelector(".input-two");
var sidebars = document.querySelector(".sidebar");
var cardContainer = document.querySelector(".card-container");
var main = document.querySelector("main");
var gamePage = document.querySelector(".game-page");
var nameOne = document.querySelectorAll(".name-one");
var nameTwo = document.querySelectorAll(".name-two");
var cardNumber = 1;
var flippedCards = [];

playBtnMain.addEventListener("click", showDirections);
playerOne.addEventListener("keyup", checkInputs);
playBtnWelcome.addEventListener("click", showGame);
cardContainer.addEventListener("click", flipCard);

function flipCard(event) {
  clickedCard = event.target.closest(".card");
  if (flippedCards.length < 2) {
    clickedCard.classList.toggle("flip");
    flippedCards.push(clickedCard);
    console.log(flippedCards);
  } else {
    return;
  }
  for (var i = 0; i < flippedCards.length; i++) {
    if (flippedCards[i].classList.contains("flip")) {
      return } else {
      flippedCards.splice([i], 1);
      console.log(flippedCards);
  }
}
}

function showGame() {
  main.style.display = "none";
  gamePage.style.display = "flex";
  for (var i=0; i < 5; i++) {
      addCards();
      cardNumber++;
    }
  cardNumber = 1;
  for (var i=0; i < 5; i++) {
      addCards();
      cardNumber++;
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
  var uniqueId = Date.now();
  var card = new Card(uniqueId);
  cardContainer.innerHTML += `
  <div class="card card-${card.matchInfo}">
    <div class="flipper card-${cardNumber}" id="${card.matchInfo}" >
      <div class="front">
        <h6>J<br/>V<br/>N</h6>
      </div>
      <img class="back" src="images/JVN-${cardNumber}.jpg">
    </div>
  </div> `;
}
