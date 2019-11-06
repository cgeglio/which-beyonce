class Card {
  constructor(matchInfo, cardId) {
    this.matchInfo = matchInfo;
    this.cardId = cardId;
    this.matched = false;
  }

  match(cardArray) {
    for (var i = 0; i < cardArray.length; i++) {
      cardArray[i].matched = true;
    }
  }
};
