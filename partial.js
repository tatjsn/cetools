async function fetchWithFormData(formData) {
  const result = await fetch(window.location.href, {
    method: "POST",
    body: formData,
  });
  const text = await result.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  // Is this acceptable?
  return doc.body.firstChild.innerHTML;
}

class PartialElement extends HTMLElement {
  connectedCallback() {
    this.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const subjectId = this.getAttribute("for");
      // Key name should be configurable to match server-side framework
      formData.append("partial", subjectId);
      const response = await fetchWithFormData(formData);
      const subject = document.getElementById(subjectId);
      subject.innerHTML = response;
    });
  }
}

customElements.define("ce-partial", PartialElement);
