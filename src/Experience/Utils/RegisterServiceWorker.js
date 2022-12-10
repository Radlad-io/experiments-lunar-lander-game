export default class ServiceWorker {
  constructor() {
    this.active = window.location.hash === "#vr";

    if (this.active) {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
          navigator.serviceWorker
            .register("./sw.js", { scope: "/" })
            .then(
              function (registration) {
                // Registration was successful
                console.log("Registered!");
              },
              function (err) {
                // registration failed :(
                console.log("ServiceWorker registration failed: ", err);
              }
            )
            .catch(function (err) {
              console.log(err);
            });
        });
      } else {
        console.log("Service Worker is not supported.");
      }
    } else {
      console.log("Service Worker not instantiated.");
    }
  }
}
