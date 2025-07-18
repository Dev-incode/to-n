import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const initialTasks = {
  Day1: [false, false, false, false],
  Day2: [false, false, false, false],
  Bonus: [false, false, false, false, false, false, false, false],
};

const initialCards = [];

export function AppProvider({ children }) {
  const [watermelon, setWatermelon] = useState(0);
  const [tasks, setTasks] = useState(initialTasks);
  const [caughtCount, setCaughtCount] = useState(0); // 誘捕次數
  const [cards, setCards] = useState(initialCards); // 已收集卡片id陣列
  const [bag, setBag] = useState([]); // 所有已抽到的卡片（可重複）

  // 完成任務
  const completeTask = (group, idx, reward = 1) => {
    if (!tasks[group][idx]) {
      const newTasks = { ...tasks };
      newTasks[group] = [...newTasks[group]];
      newTasks[group][idx] = true;
      setTasks(newTasks);
      setWatermelon(w => w + reward);
    }
  };

  // 誘捕豚豚（抽卡）
  const catchPig = (newCards) => {
    setCards(prev => {
      const merged = [...prev];
      newCards.forEach(card => {
        if (!merged.includes(card)) merged.push(card);
      });
      return merged;
    });
  };

  return (
    <AppContext.Provider value={{
      watermelon,
      setWatermelon,
      tasks,
      completeTask,
      caughtCount,
      setCaughtCount,
      cards,
      catchPig,
      bag,
      setBag,
    }}>
      {children}
    </AppContext.Provider>
  );
} 