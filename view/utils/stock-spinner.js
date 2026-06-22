/**
 * <stock-spinner> — a self-contained, drop-in loading indicator.
 *
 * Usage (after loading this file with a <script> tag):
 *   <stock-spinner></stock-spinner>
 *
 * Optional attributes:
 *   color    — hex/css color for the line, fill, and ticker text (default "#2bd67b")
 *   ticker   — text shown bottom-right, e.g. "NDX +1.2%" (default "NDX +1.2%")
 *   width    — px width of the card (default 220)
 *   height   — px height of the card (default 130)
 *
 * Example:
 *   <stock-spinner color="#ef4f5f" ticker="SPX -0.8%" width="180" height="110"></stock-spinner>
 *
 * Because it's a real custom element with Shadow DOM, its internal CSS/IDs
 * never collide with the rest of the page, no matter how many you place.
 */
class StockSpinner extends HTMLElement {
  static get observedAttributes() {
    return ["color", "ticker", "width", "height"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    // Re-render on attribute change so it stays reactive, similar to props updating in React.
    if (this.shadowRoot.innerHTML) this.render();
  }

  render() {
    const color = this.getAttribute("color") || "#2bd67b";
    const ticker = this.getAttribute("ticker") || "T&Z500 +1.8%";
    const width = this.getAttribute("width") || "220";
    const height = this.getAttribute("height") || "130";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          --line: ${color};
          --fill-top: ${color}40;
          --fill-bottom: ${color}00;
          --bg: #0a0e0f;
          --panel: #10171a;
          --grid: #1b2528;
          --muted: #5e7170;
          font-family: 'Courier New', Consolas, monospace;
        }

        .chart-spinner {
          position: relative;
          width: ${width}px;
          height: ${height}px;
          background: var(--panel);
          border: 1px solid var(--grid);
          border-radius: 6px;
          padding: 14px 16px 26px;
          box-sizing: border-box;
        }

        svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        .grid-line {
          stroke: var(--grid);
          stroke-width: 1;
        }

        .stop-top { stop-color: var(--fill-top); }
        .stop-bottom { stop-color: var(--fill-bottom); }

        .price-path {
          fill: none;
          stroke: var(--line);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: draw 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        .price-fill {
          opacity: 0;
          animation: fillIn 2.4s ease infinite;
        }

        .lead-dot {
          opacity: 0;
          animation: lead 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          offset-path: path("M4,72 L30,58 L56,80 L82,40 L108,55 L134,20 L160,46 L186,12 L208,30");
        }

        .lead-dot circle {
          fill: var(--line);
        }

        @keyframes draw {
          0%   { stroke-dashoffset: 300; }
          65%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes fillIn {
          0%, 60%  { opacity: 0; }
          75%      { opacity: 1; }
          92%      { opacity: 1; }
          100%     { opacity: 0; }
        }

        @keyframes lead {
          0%   { opacity: 0; offset-distance: 0%; }
          2%   { opacity: 1; }
          65%  { opacity: 1; offset-distance: 100%; }
          72%  { opacity: 0; }
          100% { opacity: 0; offset-distance: 100%; }
        }

        .label {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 8px;
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .label .ticker { color: var(--line); }

        .pulse-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--line);
          margin-right: 5px;
          animation: blink 1.2s steps(1) infinite;
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
      </style>

      <div class="chart-spinner" role="status" aria-label="Loading market data">
        <svg viewBox="0 0 212 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop class="stop-top" offset="0%" />
              <stop class="stop-bottom" offset="100%" />
            </linearGradient>
          </defs>

          <line class="grid-line" x1="0" y1="20" x2="212" y2="20" />
          <line class="grid-line" x1="0" y1="45" x2="212" y2="45" />
          <line class="grid-line" x1="0" y1="70" x2="212" y2="70" />

          <path class="price-fill" fill="url(#fillGrad)"
            d="M4,72 L30,58 L56,80 L82,40 L108,55 L134,20 L160,46 L186,12 L208,30 L208,90 L4,90 Z" />

          <path class="price-path"
            d="M4,72 L30,58 L56,80 L82,40 L108,55 L134,20 L160,46 L186,12 L208,30" />

          <g class="lead-dot">
            <circle r="3" />
          </g>
        </svg>

        <div class="label">
          <span><span class="pulse-dot"></span>LIVE</span>
          <span class="ticker">${ticker}</span>
        </div>
      </div>
    `;
  }
}

customElements.define("stock-spinner", StockSpinner);
