import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './TaskPage.css';

const TASKS = {
  Day1: [
    { title: '早睡早起', subtitle: '一日之計在於豚', reward: 1 },
    { title: '準時出門', subtitle: '不要匆匆卯卯趕行程', reward: 1 },
    { title: '甜甜蜜蜜', subtitle: '你不理豚，豚不理你！', reward: 1 },
    { title: '美味時光', subtitle: '除了西呱，也需要好吃飼料', reward: 1 },
  ],
  Day2: [
    { title: '早睡早起', subtitle: '一日之計在於豚', reward: 1 },
    { title: '森林時光', subtitle: '欣賞自然美景', reward: 1 },
    { title: '10秒抱抱', subtitle: '兵荒馬亂中也要抱抱!', reward: 1 },
    { title: '好好喝阿', subtitle: '紅茶拿鐵好好喝阿!', reward: 1 },
  ],
  Bonus: [
    { title: '摸摸按鈕', subtitle: '摸摸！摸摸！10分鐘！', reward: 2 },
    { title: '幫豚保養', subtitle: '滋潤啦~~', reward: 2 },
    { title: '幫豚捏捏', subtitle: '肩頸僵硬！呃呃', reward: 2 },
    { title: '火熱氛圍', subtitle: '色色的...調情...(羞)', reward: 2 },
    { title: '乾淨豚窩', subtitle: '豚不需要自己打掃吧', reward: 2 },
    { title: '收拾行李', subtitle: '豚不需要自己收拾吧', reward: 2 },
    { title: '摸摸按鈕2', subtitle: '摸摸！摸摸！15分鐘！', reward: 2 },
    { title: '摸摸按鈕3', subtitle: '摸摸！摸摸！20分鐘！', reward: 2 },
    { title: '好啦讓你玩啦', subtitle: '有人開始凹了', reward: 20 },
    { title: '還在凹喔', subtitle: '真的是最後喔', reward: 20 },
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
          <div className="task-title">每日任務</div>
          <div className="task-description">完成每日任務，獲取西呱</div>
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
                  <img src="/images/watermelon.png" alt="西呱" />
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