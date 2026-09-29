import React, { useRef, useEffect, useState } from 'react';
import { useI18n } from '../../context/I18nContext';

export default function UsageChart() {
  const { lang, t } = useI18n();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [range, setRange] = useState('7d');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(null);

  const datasets = {
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    if (!container) return;

    const dpr = window.devicePixelRatio || 1;
    const width = container.clientWidth || 600;
    const height = 200;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const ds = datasets[range] || datasets['7d'];
    const labels = lang === 'ta' ? ds.labelsTa : ds.labelsEn;
    const data = ds.data;
    const maxVal = Math.max(...data) * 1.25;

    ctx.clearRect(0, 0, width, height);

    // Padding
    const padLeft = 40;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 35;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    // Grid lines (3 horizontal)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = padTop + (chartH / 3) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();
    }

    // Points
    const points = data.map((val, idx) => {
      const x = padLeft + (chartW / (data.length - 1)) * idx;
      const y = padTop + chartH - (val / maxVal) * chartH;
      return { x, y, val, label: labels[idx] };
    });

    // Draw Gradient Area under Curve
    if (points.length > 0) {
      const grad = ctx.createLinearGradient(0, padTop, 0, height - padBottom);
      grad.addColorStop(0, 'rgba(14, 165, 233, 0.35)');
      grad.addColorStop(0.7, 'rgba(14, 165, 233, 0.08)');
      grad.addColorStop(1, 'rgba(14, 165, 233, 0.0)');

      ctx.beginPath();
      ctx.moveTo(points[0].x, height - padBottom);
      ctx.lineTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.lineTo(points[points.length - 1].x, height - padBottom);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    }

    // Draw points & labels
    points.forEach((pt, idx) => {
      // X-axis label
      ctx.fillStyle = idx === ds.activeIdx ? '#38bdf8' : 'rgba(255, 255, 255, 0.45)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(pt.label, pt.x, height - 10);

      // Data point dot
      const isHovered = hoverIdx === idx;
      const isActive = idx === ds.activeIdx;

      if (isActive || isHovered) {
        // Outer glow
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isHovered ? 8 : 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.fill();

        // Inner circle
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isHovered ? 5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Tooltip on hover
        if (isHovered) {
          const tipText = `${pt.val.toLocaleString()} ${t('chart_tooltip_users', 'பயனர்கள்')}`;
          ctx.font = 'bold 11px sans-serif';
          const tw = ctx.measureText(tipText).width + 16;
          const th = 24;
          const tx = Math.max(10, Math.min(width - tw - 10, pt.x - tw / 2));
          const ty = pt.y - 34;

          ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(tx, ty, tw, th, 4) : ctx.rect(tx, ty, tw, th);
          ctx.fill();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(tipText, tx + tw / 2, ty + 16);
        }
      } else {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.fill();
      }
    });

  }, [range, lang, hoverIdx]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const width = rect.width;
    const padLeft = 40;
    const padRight = 30;
    const chartW = width - padLeft - padRight;
    const ds = datasets[range] || datasets['7d'];
    const dataLen = ds.data.length;

    let nearest = null;
    let minDist = Infinity;

    for (let i = 0; i < dataLen; i++) {
      const ptX = padLeft + (chartW / (dataLen - 1)) * i;
      const dist = Math.abs(clientX - ptX);
      if (dist < minDist && dist < 35) {
        minDist = dist;
        nearest = i;
      }
    }
    setHoverIdx(nearest);
  };

  const getRangeLabel = () => {
    if (range === '7d') return t('chart_filter_7d', '7 நாட்கள்');
    if (range === '30d') return t('chart_filter_30d', '30 நாட்கள்');
    return t('chart_filter_90d', '3 மாதங்கள்');
  };

  return (
    <section className="chart-card">
      <div className="chart-header">
        <div className="chart-title-group">
          <svg className="chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <span className="chart-main-title">{t('chart_title', 'தளம் பயன்பாடு')}</span>
          <span className="chart-subtitle-suffix">
            ({getRangeLabel()})
          </span>
        </div>

        {/* Filter Dropdown */}
        <div className="dropdown-container">
          <button
            className="chart-filter-btn"
            id="chartFilterBtn"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <span className="filter-label">{getRangeLabel()}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? '' : 'hidden'}`} id="chartFilterMenu">
            <a
              href="#"
              className="dropdown-item chart-filter-opt"
              onClick={(e) => {
                e.preventDefault();
                setRange('7d');
                setDropdownOpen(false);
              }}
            >
              {t('chart_filter_7d', '7 நாட்கள்')}
            </a>
            <a
              href="#"
              className="dropdown-item chart-filter-opt"
              onClick={(e) => {
                e.preventDefault();
                setRange('30d');
                setDropdownOpen(false);
              }}
            >
              {t('chart_filter_30d', '30 நாட்கள்')}
            </a>
            <a
              href="#"
              className="dropdown-item chart-filter-opt"
              onClick={(e) => {
                e.preventDefault();
                setRange('90d');
                setDropdownOpen(false);
              }}
            >
              {t('chart_filter_90d', '3 மாதங்கள்')}
            </a>
          </div>
        </div>
      </div>

      {/* Canvas Line Chart */}
      <div className="chart-canvas-container" ref={containerRef}>
        <canvas
          id="platformUsageCanvas"
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIdx(null)}
          style={{ width: '100%', height: '200px', display: 'block' }}
        ></canvas>
      </div>
    </section>
  );
}
