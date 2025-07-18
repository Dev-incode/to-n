import React from 'react';
import './TabBar.css';

const tabs = [
  { key: 'task', label: '隞餃?', icon: '/images/tab-task.png' },
  { key: 'arrest', label: '隤?', icon: '/images/tab-arrest.png' },
  { key: 'book', label: '??', icon: '/images/tab-book.png' },
];

function TabBar({ tab, setTab }) {
  return (
    <nav className="tab-bar">
      {tabs.map(t => (
        <button
          key={t.key}
          className={`tab-bar-btn${tab === t.key ? ' active' : ''}`}
          onClick={() => setTab(t.key)}
        >
          <img src={t.icon} alt={t.label} className="tab-bar-icon" />
          <div className="tab-bar-label">{t.label}</div>
        </button>
      ))}
    </nav>
  );
}

export default TabBar; 