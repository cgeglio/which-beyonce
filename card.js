class Card {
  constructor(matchInfo, cardId) {
  this.matchInfo = matchInfo;
  this.cardId = cardId;
  this.matched = false;

}

match(card) {
  card.matched = true;
  removeCard(card);
  }


}
