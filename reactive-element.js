export default class ReactiveElement extends HTMLElement {
  #shadow;

  static get observedAttributes() {
    return Object.keys(this.properties);
  }

  constructor() {
    super();
    const ctor = this.constructor;
    const ctorPropsObj = ctor.properties;
    const ctorProps = Object.keys(ctorPropsObj);
    for (const prop of ctorProps) {
      if (!this.hasAttribute(prop)) {
        this.setAttribute(prop, ctorPropsObj[prop]);
      }
      Object.defineProperty(this, prop, {
        get() {
          return this.getAttribute(prop);
        },
        set(value) {
          this.setAttribute(prop, value);
        },
      });
    }
    this.#shadow = this.attachShadow({ mode: "closed" });
    this.#shadow.appendChild(this.render());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#shadow.replaceChild(this.render(), this.#shadow.firstChild);
  }
}
