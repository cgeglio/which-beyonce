// page setup

var card = new Card(null, null);
var cardContainer = document.querySelector(".card-container");
var gamePage = document.querySelector(".game-page");
var main = document.querySelector("main");
var menu = document.querySelector(".menu-icon");
var menuOpen = false;
// var sidebars = document.querySelector(".sidebar");
var welcomeMsg = document.querySelector(".welcome-msg");
var winnerMsg = document.querySelector(".winner-msg");

// player info
var nameOne = document.querySelectorAll(".name-one");
var nameTwoWelcome = document.getElementById("name-two");
var nameTwo = document.querySelectorAll(".name-two");
var playerNames = document.querySelector(".player-names");
var playerOne = document.querySelector(".input-one");
var playerTwo = document.querySelector(".input-two");

// two player
var pastGames = document.querySelectorAll(".past-games");
var player = new Player(null);
var playerInfo = [];
var rematchBtn = document.querySelector(".rematch");
var turnIndicator = document.querySelector(".turn-player");

// card setup
var card = new Card (null, null);
var cardId = 10;
var cardNumber = 1;
var deck = new Deck;

// storage
var names = [];
var nameSet = [];
var times = [];
var timeSet = [];

// scoring
var matchCount = document.querySelectorAll(".matches-count");
var score = 1
var startTime = 0;
var timeIndex = 0;

// buttons
var newGameBtn = document.querySelector(".new-game");
var playBtnMain = document.querySelector(".play-btn");
var playBtnWelcome = document.querySelector(".welcome-btn");


cardContainer.addEventListener("click", flipCard);
menu.addEventListener("click", toggleMenu);
newGameBtn.addEventListener("click", startNewGame);
playBtnMain.addEventListener("click", showDirections);
playBtnWelcome.addEventListener("click", showGame);
playerOne.addEventListener("keyup", checkInputs);
rematchBtn.addEventListener("click", restartGame);
window.addEventListener("load", pullScores);

function restartGame() {
  pullScores();
  showGame();
  winnerMsg.style.display = "none";
  winnerMsg.classList.remove("fade-in");
  document.querySelector(".left-count").innerText = "0";
  document.querySelector(".right-count").innerText = "0";
  playerInfo[0].round++;
  playerInfo[1].round++;
  for (var i = 0; i <pastGames.length; i++) {
    pastGames[i].style.display = "block";
  }
}

function indicateTurn() {
  for (var i = 0; i < playerInfo.length; i++) {
    playerInfo[i].turn = !playerInfo[i].turn;
  }
    if (playerInfo[0].turn) {
      turnIndicator.innerText = `${playerOne.value}, IT'S YOUR TURN HONEY!`;
    } else {
      turnIndicator.innerText = `${playerTwo.value}, IT'S YOUR TURN HONEY!`;
    }
};


function checkInputs() {
  if (playerOne.value) {
    playBtnMain.id = "active";
  }
};


function showDirections() {
  if (playBtnMain.id === "active") {
    var firstPlayer = new Player(playerOne.value);
    playerInfo.push(firstPlayer);
    // firstPlayer.turn = true;
    playerNames.style.display = "none";
    welcomeMsg.style.display = "block";
    for (var i = 0; i < nameOne.length; i++) {
    nameOne[i].innerText = `${playerOne.value}`;
    }

  if (playerTwo.value) {
    var secondPlayer = new Player(playerTwo.value);
    playerInfo.push(secondPlayer);
    nameTwoWelcome.innerText =  ` AND ${playerTwo.value}`;
    for (var i = 0; i < nameTwo.length; i++) {
    nameTwo[i].innerText = `${playerTwo.value}`;
 }
    }
  } else {
    document.querySelector(".error").style.display = "block";
  }
};


    

function showGame() {
  main.style.display = "none";
  gamePage.style.display = "flex";
  createCardIds();
  cardNumber = 1;
  cardId = 15;
  createCardIds();
  startTime = new Date();
  if (playerTwo.value) {
    document.querySelector(".right").style.display = "block";
    playerInfo[0].turn = true;
    turnIndicator.parentNode.style.display = "flex";
    turnIndicator.innerText = `${playerOne.value}, IT'S YOUR TURN HONEY!`;
  }
};


function createCardIds() {
  for (var i=0; i < 5; i++) {
    addCards();
    cardNumber++;
    cardId++;
  }
};


function addCards() {
  var card = new Card(cardNumber, cardId);
  deck.cards.push(card);
  if (deck.cards.length === 10) {
    deck.shuffle();
    for (var i = 0; i < deck.cards.length; i++) {
      displayCards(deck.cards[i]);
    }
  }
};


function displayCards(card) {
  cardContainer.innerHTML += `
    <div class="card" id="${card.cardId}">
      <div class="flipper flipper-${card.matchInfo}" id="${card.matchInfo}">
        <div class="front">
          <h6>J<br/>V<br/>N</h6>
        </div>
        <img class="back" src="images/JVN-${card.matchInfo}.jpg">
      </div>
    </div>`;
};



function flipCard(event) {
  clickedCard = event.target.closest(".card");
  if (deck.selectedCards.length < 2) {
    checkIfFlipped(clickedCard);
  } else if (deck.selectedCards.length === 2) {
    deselect(clickedCard);
  }
};


function checkIfFlipped(card) {
  if (card.classList.contains("flip")) {
    deck.selectedCards.splice(0, 1);
  } else {
    selectCard(card);
  }
  card.classList.toggle("flip");
};


function deselect(card) {
  var cardIndex = -1;
  card.classList.toggle("flip");
  for (var i = 0; i < deck.selectedCards.length; i++) {
    if (deck.selectedCards[i].cardId == card.id) {
      cardIndex = i;
    }
  }
  if (cardIndex != -1) {
    deck.selectedCards.splice(cardIndex);
  }
};


function selectCard(card) {
  var cardId = parseInt(card.id);
  if (deck.selectedCards.length === 0) {
    for (var i = 0; i < deck.cards.length; i++) {
      if (cardId === deck.cards[i].cardId) {
        deck.selectedCards.push(deck.cards[i]);
      }
    }
  } else if (deck.selectedCards.length === 1) {
    selectSecondCard(card);
  }
};


function selectSecondCard(card) {
  var cardId = parseInt(card.id);
  if (cardId !== deck.selectedCards[0].cardId) {
    for (var i = 0; i < deck.cards.length; i++) {
      if (cardId === deck.cards[i].cardId) {
        deck.selectedCards.push(deck.cards[i]);
        cardContainer.removeEventListener("click", flipCard);
        deck.checkSelectedCards();
      }
    }
  }
  checkForMatch();
};


function checkForMatch() {
  if (deck.selectedCards.length === 0) {
     card.match(deck.matchedCards);
     removeCard();
  if (playerInfo.length === 1) {
     for (var i = 0; i < matchCount.length; i++) {
       matchCount[i].innerText = `${deck.matches}`;
      }
    } else {
    for (var i = 0; i < playerInfo.length; i++) {
       if (playerInfo[0].turn) {
         player.findMatch(playerInfo[0]);
         document.querySelector(".left-count").innerText = `${playerInfo[0].matchCount}`;
       } else {
         player.findMatch(playerInfo[1]);
         document.querySelector(".right-count").innerText = `${playerInfo[1].matchCount}`;
       }
     }

    }
   } else {
    setTimeout(function() { flipBack(); }, 1000);

  }
  if (deck.matches < 5) {
    setTimeout(function() { indicateTurn(); }, 1000);
  }
};


function removeCard() {
  if (deck.matchedCards.length > 0) {
    for (var i = 0; i < deck.matchedCards.length; i++) {
      var deleted = document.getElementById(deck.matchedCards[i].cardId);
      fadeOut(deleted);
      cardContainer.addEventListener("click", flipCard);
    }
    deck.matchedCards = [];
    setTimeout(function() { showWinner(); }, 5000);
  }
};


function flipBack() {
  for (var i = 0; i < deck.selectedCards.length; i++) {
    var clickCard = document.getElementById(deck.selectedCards[i].cardId);
    clickCard.classList.remove("flip");
  }
  cardContainer.addEventListener("click", flipCard);
  deck.selectedCards = [];
};


function fadeOut(card) {
  card.style.transition = "2s";
  card.style.opacity = 0;
};

  
function resetGame() {
  deck.matches = 0;
  deck.cards = [];
  deck.matchedCards = [];
  cardNumber = 1;
  cardId = 10;
}
  
function showWinner() {
  if (deck.matches === 5) {
    names.push(playerOne.value);
    names.push(playerTwo.value);
    setNameStorage();
    // updateBoard();
    findTime();
    resetGame();
    if (playerInfo[0].matchCount > playerInfo[1].matchCount ) {
      document.querySelector(".winner").innerText = `${playerInfo[0].name}`;
    } else {
      document.querySelector(".winner").innerText = `${playerInfo[1].name}`;
    }
    cardContainer.innerHTML = "";
    winnerMsg.style.display = "grid";
    winnerMsg.classList.add("fade-in");
//     deck.matches = 0;
//     deck.cards = [];
    playerInfo[0].matchCount = 0;
    playerInfo[1].matchCount = 0;
//     cardNumber = 1;
//     cardId = 10;
//     deck.matchedCards = [];
    gamePage.style.display = "none";
    turnIndicator.parentNode.style.display = "none";
  }
}


function findTime() {
  var endTime = new Date();
  var timeDiff = endTime - startTime;
  timeDiff /= 1000;
  var time = Math.round(timeDiff);
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  var userTime = `0${minutes}:${seconds}`;
  times.push(time);
  setTimeStorage();
  document.querySelector(".round-time").innerHTML = ` ${minutes} minutes and ${seconds}`;
  if (playerInfo[0].matchCount > playerInfo[1].matchCount ) {
    console.log(playerInfo[0].name);
    console.log(playerInfo);
    document.querySelector(".round-info-left").innerHTML += `<br/>ROUND ${playerInfo[0].round}<br/>${userTime}<br/>`;
  } else {
    document.querySelector(".round-info-right").innerHTML += `<br/>ROUND ${playerInfo[1].round}<br/>${userTime}<br/>`;
  }
}


function startNewGame () {
  main.style.display = "flex";
  playerNames.style.display = "grid";
  welcomeMsg.style.display = "none";
  winnerMsg.style.display = "none";
  winnerMsg.classList.remove("fade-in");
  playerNames.reset();
  nameOne.innerText = "";
  nameTwo.innerText = "";
  playBtnMain.removeAttribute("active");
  pullScores();
};


function setNameStorage() {
  var nameString = JSON.stringify(names);
  localStorage.setItem("names", nameString);
}


function setTimeStorage() {
  var timeString = JSON.stringify(times);
  localStorage.setItem("times", timeString);
}



function pullScores() {
  names = [];
  times = [];
//   score = 1;
  document.querySelector(".winner-list").innerHTML = "";
  var nameSet = JSON.parse(localStorage.getItem("names"));
  for (var i = 0; i < nameSet.length; i++) {
    names.push(nameSet[i]);
  }
  var timeSet = JSON.parse(localStorage.getItem("times"));
  for (var i = 0; i < timeSet.length; i++) {
    times.push(timeSet[i]);
}
  updateBoard();
};



function updateBoard() {
  var newTimes = [...times];
  var newNames = [...names];
  var score = 1;
  if (newTimes.length > 4) {
    for (var i = 0; i < 5; i++) {
      calculateBestScore(newTimes, newNames);
      score++;
      newTimes.splice(timeIndex, 1);
      newNames.splice(timeIndex, 1);
    }
  }
};


function calculateBestScore(timeArray, nameArray) {
  var lowestTime = Math.min.apply(Math, timeArray);
  timeIndex = timeArray.indexOf(lowestTime);
  var bestPlayer = nameArray[timeIndex];
  var minutes = Math.floor(lowestTime / 60);
  var seconds = lowestTime - minutes * 60;
  displayBestScore(bestPlayer, minutes, seconds);
};


function displayBestScore(winner, min, sec) {
  var userTime = `0${min}:${sec}`;
  var highScore = `${score}.  ${winner},  ${userTime}`;
  document.querySelector(".winner-list").innerHTML += `${highScore} <br />`;
}


function toggleMenu() {
  var menuDropdown = document.querySelector(".drop-menu");
  menuOpen = !menuOpen;
  if (menuOpen) {
    menuDropdown.style.display= "flex";
  } else {
    menuDropdown.style.display= "none";
  }
};
