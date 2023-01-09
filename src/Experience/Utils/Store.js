import Experience from "@Experience/Experience.js";

export default class Store {
  constructor() {
    this.experience = new Experience();
    this.interface = this.experience.interface;
    this.debug = this.experience.debug;

    this.setInitialHighScore();
  }

  setInitialHighScore() {
    if (localStorage.getItem("highscore") === null) {
      this.storeHighScore(0);
    }
  }

  getFromLocalStorage(item) {
    return localStorage.getItem(item);
  }

  storeHighScore(score) {
    localStorage.setItem("highscore", score);
    if (this.debug.active) {
      console.log("High Score Stored:", localStorage.getItem("highscore"));
    }
  }
}
