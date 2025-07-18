import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './TaskPage.css';

const TASKS = {
  Day1: [
    { title: '?拍?抵絲', subtitle: '銝?乩?閮?潸?', reward: 1 },
    { title: '皞??粹?', subtitle: '銝????臬頞?蝔?, reward: 1 },
    { title: '????', subtitle: '雿???嚗?銝?雿?', reward: 1 },
    { title: '蝢??', subtitle: '?支?镼踹嚗??閬末?ˉ??, reward: 1 },
  ],
  Day2: [
    { title: '?拍?抵絲', subtitle: '銝?乩?閮?潸?', reward: 1 },
    { title: '璉格???', subtitle: '甈???芰蝢', reward: 1 },
    { title: '10蝘??, subtitle: '?菔?擐砌?銝凋?閬??', reward: 1 },
    { title: '憟賢末?', subtitle: '蝝?輸憟賢末?!', reward: 1 },
  ],
  Bonus: [
    { title: '?豢??', subtitle: '?豢嚗?賂?10??嚗?, reward: 2 },
    { title: '撟怨?靽?', subtitle: '皛膜?年~', reward: 2 },
    { title: '撟怨???', subtitle: '?拚?萇′嚗???, reward: 2 },
    { title: '?怎瘞?', subtitle: '?脰??..隤踵?...(蝢?', reward: 2 },
    { title: '銋暹楊鞊版', subtitle: '鞊??閬撌望??', reward: 2 },
    { title: '?嗆銵?', subtitle: '鞊??閬撌望?曉', reward: 2 },
    { title: '?豢??2', subtitle: '?豢嚗?賂?15??嚗?, reward: 2 },
    { title: '?豢??3', subtitle: '?豢嚗?賂?20??嚗?, reward: 2 },
    { title: '憟賢霈??拙', subtitle: '?犖???嫣?', reward: 20 },
    { title: '??孵?', subtitle: '???舀?敺?', reward: 20 },
  ],
};

const TABS = [
  { key: 'Day1', label: 'Day1' },
  { key: 'Day2', label: 'Day2' },
  { key: 'Bonus', label: 'Bonus' },
];

function TaskPage() {
  const [tab, setTab] = useState('Day1');
  const { tasks, completeTask } = useContext(AppContext);

  return (
    <div className="task-page">
      <div className="task-container">
        <div className="task-header">
          <div className="task-title">瘥隞餃?</div>
          <div className="task-description">摰?瘥隞餃?嚗?正??/div>
        </div>
        <div className="task-list">
          {TASKS[tab].map((task, idx) => {
            const done = tasks[tab][idx];
            return (
              <button
                key={idx}
                className={`task-card${done ? ' done' : ''}`}
                onClick={() => completeTask(tab, idx, task.reward)}
                disabled={done}
              >
                <div className="task-card-main">
                  <div className="task-card-title">{task.title}</div>
                  <div className="task-card-subtitle">{task.subtitle}</div>
                </div>
                <div className="task-card-reward">
                  <img src="/images/watermelon.png" alt="镼踹" />
                  <span>+{task.reward}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="task-tabs-bottom">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`task-tab-bottom${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskPage; 