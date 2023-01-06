import Experience from "@Experience/Experience.js";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";


export default class Interface {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.state = this.experience.state;
    this.debug = this.experience.debug;
    this.params = {
      dev: import.meta.env.DEV,
      ease: CustomEase.create("custom", "M0,0 C0.4,0.1 0.6,0.898 1,1 "),
    };

    this.hud = document.querySelector(".hud");
    this.bottomBar = document.querySelector(".bottom-bar");
    this.instructions = document.querySelector(".instruction-modal");
    this.startBtn = document.querySelector(".start-btn");
    this.lowFuelIndicatorBG = document.querySelector(".low-fuel-indicator-bg");
    this.lowFuelIndicator = document.querySelector(".low-fuel-indicator");

    this.banner = {
      el: document.querySelector(".banner"),
      remove: () => {
        this.banner.el.style.display = "none";
      },
    };

    this.loader = {
      el: document.querySelector(".loader"),
      text: document.querySelector(".loader, p"),
      status: document.querySelector(".loader-status"),
      remove: () => {
        gsap
          .to(this.loader.el, {
            duration: 1.25,
            ease: "none",
            opacity: 0,
          })
          .then(() => {
            this.loader.el.style.display = "none";
            this.cards.show()
          });
      },
      update: (percent) => {
        this.loader.status.style.width = `${percent - 1.5}%`;
      },
    };

    this.intro ={
      el: document.querySelector(".intro"),
      wrapper: document.querySelector(".wrapper"),
      remove: () => {
        gsap
        .to(this.intro.wrapper, {
          duration: .75,
          ease: "none",
          opacity: 0,
        })
        .then(() => {
          gsap
          .to(this.intro.el, {
            duration: .25,
            ease: "none",
            opacity: 0,
          })
        })
        .then(() => {
          this.cards.el.remove()
        });
      },
    }

    this.cards = {
      el: document.querySelector(".cards"),
      show: () => {
        this.cards.el.style.display = "flex";
        gsap
        .to(this.cards.el, {
          delay: .25,
          duration: 1.25,
          ease: "none",
          opacity: 1,
        })
      },
      remove: () => {
        this.cards.el.style.display = "none";
      },
    };

    this._init();
  }

  _init() {
    // Removes banner in dev
    if (this.params.dev) {
      this.banner.remove();
    }

    if (this.debug.active) {
      document.querySelector(".intro").style.display = "none";
    } else {
      // Listeners
      this.experience.resources.manager.onProgress = (
        url,
        itemsLoaded,
        itemsTotal
      ) => {
        this.loader.update((itemsLoaded / itemsTotal) * 100);
      };

      this.resources.on("loaded", () => {
        this.state.loaded.set(true);
        this.loader.remove();
      });
    }
  }
}
