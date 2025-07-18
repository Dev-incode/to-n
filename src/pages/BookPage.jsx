import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './BookPage.css';

const CARD_POOL = [
  { id: 1, name: '銝?祈?', level: 'N', img: '/images/card-01.png' },
  { id: 2, name: '??', level: 'N', img: '/images/card-02.png' },
  { id: 3, name: '?孵誥鞊?, level: 'N', img: '/images/card-03.png' },
  { id: 4, name: '??偌鞊?, level: 'R', img: '/images/card-04.png' },
  { id: 5, name: '?凋?鞊?, level: 'R', img: '/images/card-05.png' },
  { id: 6, name: '??鞊?, level: 'SR', img: '/images/card-06.png' },
  { id: 7, name: '?怠鞊?, level: 'SR', img: '/images/card-07.png' },
  { id: 8, name: '蝺亥?', level: 'SR', img: '/images/card-08.png' },
  { id: 9, name: '鞎?鞊?, level: 'UR', img: '/images/card-09.png' },
  { id: 10, name: '鞊▲', level: 'UR', img: '/images/card-10.png' },
];

const LEVEL_COUNTS = {
  N: 3,
  R: 2,
  SR: 3,
  UR: 2,
};

function BookPage() {
  const { cards } = useContext(AppContext);
  
  // 閮???蝝歇?園??賊?
  const collectedByLevel = {
    N: cards.filter(id => CARD_POOL.find(c => c.id === id)?.level === 'N').length,
    R: cards.filter(id => CARD_POOL.find(c => c.id === id)?.level === 'R').length,
    SR: cards.filter(id => CARD_POOL.find(c => c.id === id)?.level === 'SR').length,
    UR: cards.filter(id => CARD_POOL.find(c => c.id === id)?.level === 'UR').length,
  };

  return (
    <div className="book-page">
      <div className="book-list">
        <div className="book-header">
          <div className="book-title">??</div>
          <div className="book-progress">
            <div className="book-progress-item">
              <div className="book-progress-level level-N">N</div>
              <span>{collectedByLevel.N}/{LEVEL_COUNTS.N}</span>
            </div>
            <div className="book-progress-item">
              <div className="book-progress-level level-R">R</div>
              <span>{collectedByLevel.R}/{LEVEL_COUNTS.R}</span>
            </div>
            <div className="book-progress-item">
              <div className="book-progress-level level-SR">SR</div>
              <span>{collectedByLevel.SR}/{LEVEL_COUNTS.SR}</span>
            </div>
            <div className="book-progress-item">
              <div className="book-progress-level level-UR">UR</div>
              <span>{collectedByLevel.UR}/{LEVEL_COUNTS.UR}</span>
            </div>
          </div>
        </div>
        <div className="book-cards-grid">
          {CARD_POOL.map(card => {
            const collected = cards.includes(card.id);
            return (
              <div className={`book-card level-${card.level}`} key={card.id}>
                {collected ? (
                  <>
                    <img src={card.img} alt={card.name} className="book-card-img" />
                    <div className="book-card-name">{card.name}</div>
                    <div className="book-card-level">{card.level}</div>
                  </>
                ) : (
                  <>
                    <img src="/images/unknow.png" alt="?芣?? className="book-card-img" />
                    <div className="book-card-level">{card.level}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="book-footer-tip">?遛敺?撅曹?鞊???鈭?蝘旨?抬?</div>
    </div>
  );
}

export default BookPage; 