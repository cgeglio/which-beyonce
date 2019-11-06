class Player {
  constructor(name) {
    this.name = name;
    this.matchCount = 0;
    this.turn = false;
    this.round = 1;
  }

  findMatch(player) {
    player.matchCount += 0.5;
  }


}
