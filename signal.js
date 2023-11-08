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
      const forAttr = listener.getAttribute("for");
      const hasTarget = listener.hasAttribute("target");
      const property = listener.getAttribute("property");
      document.getElementById(forAttr).addEventListener(event, (event) => {
        const subject = hasTarget ? event.target : event;
        setter(subject[property]);
      });
    }

    const observers = this.querySelectorAll("ce-observer");
    createEffect(() => {
      const updatedValue = getter();
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
