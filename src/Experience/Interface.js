import Experience from "@Experience/Experience.js";
import gsap from "gsap";

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
            this.title.show();
          });
      },
      update: (percent) => {
        this.loader.status.style.width = `${percent - 1.5}%`;
      },
    };

    this.title = {
      el: document.querySelector(".title"),
      show: () => {
        this.title.el.style.display = "block";
        gsap
          .to(this.title.el, {
            delay: 0.25,
            duration: 1.25,
            ease: "none",
            opacity: 1,
          })
          .then(() => {
            this.cards.show();
          });
      },
    };

    this.dedication = {
      el: document.querySelector(".title p"),
      hide: () => {
        gsap
          .to(this.dedication.el, {
            duration: 1.25,
            ease: "none",
            opacity: 0,
          })
          .then(() => {
            this.dedication.remove();
          });
      },
      remove: () => {
        this.dedication.el.style.display = "none";
      },
    };

    this.cards = {
      position: 1,
      count: document.querySelectorAll(".card").length,
      el: document.querySelector(".cards"),
      one: document.querySelector(".card:nth-child(1)"),
      two: document.querySelector(".card:nth-child(2)"),
      three: document.querySelector(".card:nth-child(3)"),
      show: () => {
        gsap
          .to(this.cards.el, {
            duration: 0.85,
            ease: this.params.ease,
            height: "50%",
            opacity: 1,
          })
          .then(() => {
            this.cards.one.children[0].play();
            this.instructionControls.show();
          });
      },
      hide: () => {
        gsap
          .to(this.cards.el, {
            duration: 1.25,
            ease: "none",
            opacity: 0,
          })
          .then(() => {
            this.cards.remove();
          });
      },
      changeCard: (direction) => {
        if (direction === "foward") {
        }
        if (direction === "backward") {
        }
      },
      remove: () => {
        this.cards.el.style.display = "none";
      },
    };

    this.instructionControls = {
      el: document.querySelector(".instruction-ctrls"),
      backward: document.querySelector(".backward-btn"),
      forward: document.querySelector(".forward-btn"),
      show: () => {
        this.instructionControls.el.style.display = "flex";
        gsap
          .to(this.instructionControls.el, {
            duration: 1.25,
            ease: "none",
            opacity: 1,
          })
          .then(() => {
            this.instructionControls.el.style.opacity = 1;
          });
      },
      hide: () => {
        gsap
          .to(this.instructionControls.el, {
            duration: 1.25,
            ease: "none",
            opacity: 0,
          })
          .then(() => {
            this.instructionControls.remove();
          });
      },
      remove: () => {
        this.instructionControls.el.style.display = "none";
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
      console.log("firing");
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

      this.instructionControls.forward.addEventListener("click", () => {
        console.log("firing");
      });
      this.instructionControls.backward.addEventListener("click", () => {
        console.log("firing");
      });
    }
  }
}
