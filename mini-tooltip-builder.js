
// mini-tooltip-builder.js
class MiniTooltipBuilder extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    const s=document.createElement('style');
    s.textContent=`:host{display:block;font:12px/1.4 sans-serif;padding:8px;}label{display:block;margin-top:8px;font-weight:600;}input,select{width:100%;box-sizing:border-box;padding:6px;margin-top:4px;}`;
    this.shadowRoot.appendChild(s);
    this.shadowRoot.innerHTML += `
      <label>Chart type</label>
      <select id="chartType"><option value="bar">bar</option><option value="line">line</option></select>
      <label>Dimension (technical name)</label>
      <input id="dimension" type="text" placeholder="e.g. Country"/>
      <label>Measure (technical name)</label>
      <input id="measure" type="text" placeholder="e.g. Revenue"/>
      <label>Max points</label>
      <input id="maxPoints" type="number" min="3" max="50" value="10"/>
      <label>Accent color</label>
      <input id="accentColor" type="text" value="#3f8efc"/>
    `;
    this._fields=['chartType','dimension','measure','maxPoints','accentColor'];
  }
  onCustomWidgetAfterUpdate(settings){ (settings&&this._fields).forEach(id=>{const el=this.shadowRoot.getElementById(id); if(el&&settings[id]!==undefined&&settings[id]!==null){ el.value=settings[id]; }}); }
  getAddOnSettings(){ const out={}; this._fields.forEach(id=>{const el=this.shadowRoot.getElementById(id); if(!el) return; out[id]=(id==='maxPoints')?Number(el.value||10):el.value;}); return out; }
}
customElements.define('mini-tooltip-builder', MiniTooltipBuilder);
