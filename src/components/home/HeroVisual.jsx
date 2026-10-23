
import React from 'react';
import { BarChart3, ShieldCheck, TrendingUp } from 'lucide-react';

const panels = [
  {
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    alt: 'Business intelligence dashboards and market research analytics',
    label: 'Market Intelligence',
    number: '01',
    className: 'hero3d-panel hero3d-panel-main',
    Icon: BarChart3,
  },
  {
    image:
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80',
    alt: 'Research analytics and data visualization',
    label: 'Data Insights',
    number: '02',
    className: 'hero3d-panel hero3d-panel-left',
    Icon: TrendingUp,
  },
  {
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    alt: 'Corporate architecture representing business strategy',
    label: 'Business Strategy',
    number: '03',
    className: 'hero3d-panel hero3d-panel-right',
    Icon: ShieldCheck,
  },
];

export default function Hero3DVisual() {
  return (
    <div className="hero3d-scene">
      <div className="hero3d-orbit hero3d-orbit-one" />
      <div className="hero3d-orbit hero3d-orbit-two" />

      <div className="hero3d-platform">
        {panels.map(({ image, alt, label, number, className, Icon }) => (
          <figure key={number} className={className}>
            <img src={image} alt={alt} loading="eager" />

            <div className="hero3d-image-shade" />

            <figcaption className="hero3d-caption">
              <span className="hero3d-number">{number}</span>
              <span className="hero3d-label">
                <Icon size={15} />
                {label}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="hero3d-data-card hero3d-data-top">
        <span className="hero3d-data-icon">
          <BarChart3 size={19} />
        </span>
        <div>
          <p>Research Analytics</p>
          <strong>Insights that matter</strong>
        </div>
      </div>

      <div className="hero3d-data-card hero3d-data-bottom">
        <span className="hero3d-status-dot" />
        <div>
          <p>Intelligence Report</p>
          <strong>Data → Decisions</strong>
        </div>
        <ShieldCheck size={20} />
      </div>
    </div>
  );
}
