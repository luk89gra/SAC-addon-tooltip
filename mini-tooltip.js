// mini-tooltip.js (smoke test)
class MiniTooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    const div = document.createElement('div');
    div.textContent = 'Add-On loaded ✓ (smoke test)';
    div.style.cssText = 'background:#fff;padding:6px;border:1px solid #ccc;border-radius:4px;';
    this.shadowRoot.appendChild(div);
  }
  onAddOnBeforeTooltipRender() {}
}
customElements.define('mini-tooltip', MiniTooltip);
