var playBtn = document.querySelector(".play-btn");

playBtn.addEventListener("click", showDirections);


function showDirections() {
  document.querySelector(".player-names").style.display = "none";
  document.querySelector(".welcome-msg").style.display = "block";
}
