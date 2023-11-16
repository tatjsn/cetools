import {
  signal,
  effect,
} from "https://unpkg.com/@preact/signals-core@1.5.0/dist/signals-core.module.js";

class SignalElement extends HTMLElement {
  #dispose;

  connectedCallback() {
    const sig = signal(this.getAttribute("init"));

    const listeners = this.querySelectorAll("ce-listener");
    for (const listener of listeners) {
      const event = listener.getAttribute("event");
      const name = listener.getAttribute("name");
      const forAttr = listener.getAttribute("for");
      const hasTarget = listener.hasAttribute("target");
      const property = listener.getAttribute("property");
      document.getElementById(forAttr).addEventListener(event, (event) => {
        const subject = hasTarget ? event.target : event;
        sig.value = subject[property];

        if (!this.#dispose) {
          const observers = this.querySelectorAll("ce-observer");
          this.#dispose = this.#registerEffect(sig);
        }
      });
    }
  }

  #registerEffect(sig) {
    const observers = this.querySelectorAll("ce-observer");
    return effect(() => {
      const updatedValue = sig.value;
      for (const observer of observers) {
        const forAttr = observer.getAttribute("for");
        const subject = document.getElementById(forAttr);
        if (observer.hasAttribute("property")) {
          const property = observer.getAttribute("property");
          subject[property] = updatedValue;
        } else if (observer.hasAttribute("action")) {
          const action = observer.getAttribute("action");
          const isVoid = observer.hasAttribute("void");
          if (isVoid) {
            subject[action]();
          } else {
            subject[action](updatedValue);
          }
        }
      }
    });
  }
}

customElements.define("ce-signal", SignalElement);
