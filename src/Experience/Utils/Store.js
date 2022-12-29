export default class Store {
  constructor() {
    this.highScrore = localStorage.getItem("highscore");
    this.setInitialHighScore();
  }

  setInitialHighScore() {
    if (this.highScrore === null) {
      this.storeHighScore(0);
    }
  }

  storeHighScore(score) {
    this.highScrore = score;
    localStorage.setItem("highScore", this.highScrore);
  }
}
