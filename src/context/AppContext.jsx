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
  const [caughtCount, setCaughtCount] = useState(0); // 隤?甈⊥
  const [cards, setCards] = useState(initialCards); // 撌脫??d???
  const [bag, setBag] = useState([]); // ??歇?賢????舫?銴?

  // 摰?隞餃?
  const completeTask = (group, idx, reward = 1) => {
    if (!tasks[group][idx]) {
      const newTasks = { ...tasks };
      newTasks[group] = [...newTasks[group]];
      newTasks[group][idx] = true;
      setTasks(newTasks);
      setWatermelon(w => w + reward);
    }
  };

  // 隤?鞊?嚗?∴?
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