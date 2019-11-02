var playBtnMain = document.querySelector(".play-btn");
var playBtnWelcome = document.querySelector(".welcome-btn");
var welcomeMsg = document.querySelector(".welcome-msg")
var playerOne = document.querySelector(".input-one");
var playerTwo = document.querySelector(".input-two");
var sidebars = document.querySelector(".sidebar");
var cardContainer = document.querySelector(".card");
var main = document.querySelector("main");
var gamePage = document.querySelector(".game-page");
var nameOne = document.querySelector(".name-one");
var nameTwo = document.querySelector(".name-two");

playBtnMain.addEventListener("click", showDirections);
playerOne.addEventListener("keyup", checkInputs);
playBtnWelcome.addEventListener("click", showGame);


function showGame() {
  main.style.display = "none";
  gamePage.style.display = "flex";
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
    nameOne.innerText = `${playerOne.value.toUpperCase()}`;
  if (playerTwo.value) {
    nameTwo.innerText = ` AND ${playerTwo.value.toUpperCase()}`;
  }
} else {
    document.querySelector(".error").style.display = "block";
  }
};
