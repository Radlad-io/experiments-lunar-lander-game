import { Pane } from "tweakpane";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";
import * as TweakpaneProfilerBladePlugin from "@0b5vr/tweakpane-plugin-profiler";
import * as CamerakitPlugin from "@tweakpane/plugin-camerakit";

export default class Debug {
  constructor() {
    this.environment = import.meta.env.MODE;
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.pane = new Pane();
      this.pane.registerPlugin(EssentialsPlugin);
      this.pane.registerPlugin(TweakpaneProfilerBladePlugin);
      this.pane.registerPlugin(CamerakitPlugin);

      this.tabs = this.pane.addTab({
        pages: [{ title: "Framerate" }, { title: "Info" }],
      });

      this.profiler = this.tabs.pages[1].addBlade({
        view: "profiler",
        label: "profiler",
      });
    }
  }
}
