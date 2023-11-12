import ReactiveElement from "./reactive-element.js";
import h from "./h.js";

export class SwitchElement extends ReactiveElement {
  static properties = {
    query: "",
  };

  constructor() {
    super();
  }

  render() {
    return h.div(h.slot({ name: this.query }, "This is fallback"));
  }
}
customElements.define("ce-switch", SwitchElement);
