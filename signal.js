import { createSignal, createEffect } from "https://cdn.skypack.dev/solid-js";

class SignalElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const [getter, setter] = createSignal(this.getAttribute("init"));

    const listeners = this.querySelectorAll("ce-listener");
    for (const listener of listeners) {
      const event = listener.getAttribute("event");
      const name = listener.getAttribute("name");
      document.addEventListener(event, (event) => {
        if (event.target.name === name) {
          setter(event.target.value);
        }
      });
    }

    const observers = this.querySelectorAll("ce-observer");
    createEffect((prev) => {
      const updatedValue = getter();
      for (const observer of observers) {
        const selector = observer.getAttribute("selector");
        const subject = document.querySelector(selector);
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
