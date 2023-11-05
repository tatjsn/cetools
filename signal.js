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
    createEffect(() => {
      for (const observer of observers) {
        const selector = observer.getAttribute("selector");
        document.querySelector(selector).value = getter();
      }
    });
  }
}

customElements.define("ce-signal", SignalElement);
