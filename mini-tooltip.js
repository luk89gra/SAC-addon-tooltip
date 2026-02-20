// mini-tooltip.js
// SAC Widget Add-On: Tooltip mini chart

const ensureChartJs = (() => {
  let p;
  return () => {
    if (window.Chart) return Promise.resolve();
    if (p) return p;
    p = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
      s.onload = () => resolve();
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return p;
  };
})();

class MiniTooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      :host { display:block; font: 12px/1.3 sans-serif; color:#1d2a3a; }
      .wrap { max-width: 320px; min-width: 220px; background:#fff; border:1px solid #d5dadd; border-radius:6px; padding:8px; box-shadow:0 2px 8px rgba(0,0,0,.15); }
      .title { font-weight:600; margin-bottom:6px; }
      canvas { width:100%; height:120px; }
    `;
    this.shadowRoot.appendChild(style);

    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    this.titleEl = document.createElement('div');
    this.titleEl.className = 'title';
    this.canvas = document.createElement('canvas');
    wrap.appendChild(this.titleEl);
    wrap.appendChild(this.canvas);
    this.shadowRoot.appendChild(wrap);

    this._chart = null;
    this._props = {};   // add-on settings
    this._context = {}; // tooltip context
  }

  onCustomWidgetAfterUpdate(props) {
    this._props = props || this._props;
  }

  async onAddOnBeforeTooltipRender({ dataBinding, addOnSettings, tooltipContext }) {
    this._props = addOnSettings || this._props;
    this._context = tooltipContext || {};

    const dim = this._props.dimension;
    const mea = this._props.measure;
    const maxPoints = Number(this._props.maxPoints || 10);
    const chartType = (this._props.chartType || 'bar').toLowerCase();
    const accent = this._props.accentColor || '#3f8efc';

    if (!dim || !mea) {
      this.titleEl.textContent = 'Configure dimension & measure in Add-On settings';
      this._destroyChart();
      return;
    }

    const plain = await dataBinding.getPlainData({ withData: true });
    const rows = (plain && plain.data) ? plain.data : [];

    const labels = [];
    const values = [];
    for (let i = 0; i < rows.length && labels.length < maxPoints; i++) {
      const r = rows[i];
      const l = r[dim] != null ? String(r[dim]) : '';
      const v = Number(r[mea]);
      if (l !== '' && !Number.isNaN(v)) {
        labels.push(l);
        values.push(v);
      }
    }

    this.titleEl.textContent = `${mea} by ${dim}`;

    await ensureChartJs();
    this._renderChart({ chartType, labels, values, color: accent });
  }

  onAddOnTooltipHide() {
    // Optional: destroy or keep chart instance
  }

  _renderChart({ chartType, labels, values, color }) {
    this._destroyChart();
    const ctx = this.canvas.getContext('2d');
    const cfg = {
      type: chartType === 'line' ? 'line' : 'bar',
      data: {
        labels,
        datasets: [{
          label: '',
          data: values,
          borderColor: color,
          backgroundColor: chartType === 'line' ? 'rgba(0,0,0,0)' : color,
          tension: 0.3,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        animation: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false },
          y: { display: false, beginAtZero: true }
        }
      }
    };
    this._chart = new window.Chart(ctx, cfg);
  }

  _destroyChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }
}

customElements.define('mini-tooltip', MiniTooltip);
