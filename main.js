var playBtn = document.querySelector(".play-btn");
var welcomeMsg = document.querySelector(".welcome-msg")
var playerOne = document.querySelector(".input-one");
var playerTwo = document.querySelector(".input-two");
var nameOne = document.querySelector(".name-one");
var nameTwo = document.querySelector(".name-two");

playBtn.addEventListener("click", showDirections);


function showDirections() {
  document.querySelector(".player-names").style.display = "none";
  welcomeMsg.style.display = "block";
  nameOne.innerText = `${playerOne.value.toUpperCase()}`;
  nameTwo.innerText = `${playerTwo.value.toUpperCase()}`;
}
