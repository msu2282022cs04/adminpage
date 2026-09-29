/**
 * THAMILI Admin Dashboard - Platform Usage Interactive Canvas Chart
 */

class UsageChart {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.currentRange = '7d';

    this.datasets = {
      '7d': {
        labelsTa: ["13 செப்", "14 செப்", "15 செப்", "16 செப்", "17 செப்", "18 செப்", "19 செப்"],
        labelsEn: ["13 Sep", "14 Sep", "15 Sep", "16 Sep", "17 Sep", "18 Sep", "19 Sep"],
        data: [350, 680, 780, 850, 1120, 1280, 1842],
        activeIdx: 6
      },
      '30d': {
        labelsTa: ["1 செப்", "6 செப்", "11 செப்", "16 செப்", "21 செப்", "26 செப்", "30 செப்"],
        labelsEn: ["1 Sep", "6 Sep", "11 Sep", "16 Sep", "21 Sep", "26 Sep", "30 Sep"],
        data: [420, 750, 990, 1240, 1480, 1690, 2450],
        activeIdx: 6
      },
      '90d': {
        labelsTa: ["ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்"],
        labelsEn: ["July", "August", "September"],
        data: [1200, 2800, 4950],
        activeIdx: 2
      }
    };

    this.hoverIdx = null;
    this.init();
  }

  init() {
    this.setupDPI();
    this.render();

    window.addEventListener('resize', () => {
      this.setupDPI();
      this.render();
    });

    window.addEventListener('thamili_lang_changed', () => {
      this.render();
    });

    // Hover interactivity
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => {
      this.hoverIdx = null;
      this.render();
    });

    // Dropdown filter
    const filterBtn = document.getElementById('chartFilterBtn');
    const filterMenu = document.getElementById('chartFilterMenu');
    if (filterBtn && filterMenu) {
      filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = filterMenu.classList.contains('hidden');
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
        if (isHidden) filterMenu.classList.remove('hidden');
      });

      filterMenu.querySelectorAll('.chart-filter-opt').forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.preventDefault();
          const range = opt.getAttribute('data-range');
          this.setRange(range);
          filterMenu.classList.add('hidden');
          
          const label = filterBtn.querySelector('.filter-label');
          if (label) {
            const key = range === '7d' ? 'chart_filter_7d' : (range === '30d' ? 'chart_filter_30d' : 'chart_filter_90d');
            label.setAttribute('data-i18n', key);
            label.textContent = window.i18n ? window.i18n.get(key) : opt.textContent;
          }
        });
      });
    }
  }

  setRange(range) {
    if (this.datasets[range]) {
      this.currentRange = range;
      this.render();
    }
  }

  setupDPI() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 600;
    this.height = 200;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
  }

  render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    if (!w || !h) return;

    ctx.clearRect(0, 0, w, h);

    const ds = this.datasets[this.currentRange];
    const isTamil = (window.i18n && window.i18n.currentLang === 'ta') || !window.i18n;
    const labels = isTamil ? ds.labelsTa : ds.labelsEn;
    const data = ds.data;

    const padLeft = 45;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 35;

    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    // Y-Axis scale
    const maxVal = 2000;
    const yTicks = [
      { val: 2000, label: '2K' },
      { val: 1500, label: '1.5K' },
      { val: 1000, label: '1K' },
      { val: 500, label: '500' },
      { val: 0, label: '0' }
    ];

    // Grid lines & Y-Axis labels
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#94a3b8';

    yTicks.forEach(tick => {
      const y = padTop + plotH - (tick.val / maxVal) * plotH;
      
      // Horizontal grid line
      ctx.beginPath();
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(padLeft, y);
      ctx.lineTo(w - padRight, y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label text
      ctx.fillText(tick.label, padLeft - 10, y);
    });

    // Calculate points
    this.points = [];
    const stepX = plotW / (data.length - 1);

    data.forEach((val, i) => {
      const x = padLeft + i * stepX;
      const normalizedVal = Math.min(val, maxVal);
      const y = padTop + plotH - (normalizedVal / maxVal) * plotH;
      this.points.push({ x, y, val, label: labels[i] });
    });

    if (this.points.length < 2) return;

    // Draw Gradient Area under Curve
    const areaGrad = ctx.createLinearGradient(0, padTop, 0, padTop + plotH);
    areaGrad.addColorStop(0, 'rgba(59, 130, 246, 0.22)');
    areaGrad.addColorStop(0.6, 'rgba(59, 130, 246, 0.08)');
    areaGrad.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    ctx.beginPath();
    ctx.moveTo(this.points[0].x, padTop + plotH);
    ctx.lineTo(this.points[0].x, this.points[0].y);

    for (let i = 0; i < this.points.length - 1; i++) {
      const curr = this.points[i];
      const next = this.points[i + 1];
      const cx = (curr.x + next.x) / 2;
      ctx.bezierCurveTo(cx, curr.y, cx, next.y, next.x, next.y);
    }

    ctx.lineTo(this.points[this.points.length - 1].x, padTop + plotH);
    ctx.closePath();
    ctx.fillStyle = areaGrad;
    ctx.fill();

    // Draw Smooth Line
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 0; i < this.points.length - 1; i++) {
      const curr = this.points[i];
      const next = this.points[i + 1];
      const cx = (curr.x + next.x) / 2;
      ctx.bezierCurveTo(cx, curr.y, cx, next.y, next.x, next.y);
    }
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw X-Axis labels and Data Dots
    ctx.font = isTamil ? '11px Mukta Malar, sans-serif' : '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    this.points.forEach((pt, idx) => {
      // X-Axis Date text
      ctx.fillStyle = '#64748b';
      ctx.fillText(pt.label, pt.x, padTop + plotH + 8);

      // Data point dot
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#2563eb';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    });

    // Active Highlight Pill (matches reference image at 19 செப் - 1,842 பயனர்கள்)
    const highlightIdx = this.hoverIdx !== null ? this.hoverIdx : ds.activeIdx;
    if (this.points[highlightIdx]) {
      const pt = this.points[highlightIdx];
      
      // Halo around point
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.3)';
      ctx.fill();

      // Tooltip pill bubble
      const userText = isTamil ? 'பயனர்கள்' : 'Users';
      const tooltipText = `● ${pt.val.toLocaleString()} ${userText}`;
      ctx.font = 'bold 11px Mukta Malar, Inter, sans-serif';
      const textMetrics = ctx.measureText(tooltipText);
      const pillW = textMetrics.width + 18;
      const pillH = 24;
      const pillX = Math.min(Math.max(pt.x - pillW / 2, padLeft), w - padRight - pillW);
      const pillY = pt.y - 32;

      // Pill Background
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 12);
      ctx.fillStyle = '#0284c7';
      ctx.shadowColor = 'rgba(2, 132, 199, 0.4)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.fill();
      ctx.shadowColor = 'transparent';

      // Pill Text
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tooltipText, pillX + pillW / 2, pillY + pillH / 2);
    }
  }

  handleMouseMove(e) {
    if (!this.points || !this.points.length) return;
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    let closestIdx = 0;
    let minDist = Infinity;

    this.points.forEach((pt, i) => {
      const dist = Math.abs(pt.x - mouseX);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = i;
      }
    });

    if (minDist < 35 && this.hoverIdx !== closestIdx) {
      this.hoverIdx = closestIdx;
      this.render();
    }
  }
}

window.UsageChart = UsageChart;
