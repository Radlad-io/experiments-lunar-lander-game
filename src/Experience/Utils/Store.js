import Experience from "@Experience/Experience.js";
import State from '@World/State.js'

export default class Store {
  constructor() {
    this.experience = new Experience();
    this.interface = this.experience.interface;
    this.state = new State()
    this.debug = this.experience.debug;
    
    this.highscrore = localStorage.getItem("highscore");
    this.setInitialHighScore();
  }

  setInitialHighScore() {
    if (this.highscrore === null) {
      this.storeHighScore(0);
    }else {
      this.state.highscore.set(this.highscrore)
    }
  }

  storeHighScore(score) {
    this.highscrore = score;
    this.state.highscrore.set(this.highscrore)
    localStorage.setItem("highscore", this.state.highscrore.get());
    if(this.debug.active){
      console.log('High Score Stored:', localStorage.getItem("highscore"))
    }
  }
}
