import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import "./ArrestPage.css";

const CARD_POOL = [
  { id: 1, name: "一般豚", level: "N", img: "/images/card-01.png" },
  { id: 2, name: "叛逆豚", level: "N", img: "/images/card-02.png" },
  { id: 3, name: "頹廢豚", level: "N", img: "/images/card-03.png" },
  { id: 4, name: "口水豚", level: "R", img: "/images/card-04.png" },
  { id: 5, name: "厭世豚", level: "R", img: "/images/card-05.png" },
  { id: 6, name: "鄙視豚", level: "SR", img: "/images/card-06.png" },
  { id: 7, name: "八卦豚", level: "SR", img: "/images/card-07.png" },
  { id: 8, name: "緊急豚", level: "SR", img: "/images/card-08.png" },
  { id: 9, name: "貓貓豚", level: "UR", img: "/images/card-09.png" },
  { id: 10, name: "豚桶", level: "UR", img: "/images/card-10.png" },
];

const LEVEL_ORDER = { N: 1, R: 2, SR: 3, UR: 4 };

const LEVEL_RATE = [
  { level: "N", rate: 0.6 },
  { level: "R", rate: 0.3 },
  { level: "SR", rate: 0.08 },
  { level: "UR", rate: 0.02 },
];

function randomCard() {
  const r = Math.random();
  let acc = 0;
  let level = "N";
  for (const l of LEVEL_RATE) {
    acc += l.rate;
    if (r < acc) {
      level = l.level;
      break;
    }
  }
  const pool = CARD_POOL.filter((c) => c.level === level);
  return pool[Math.floor(Math.random() * pool.length)];
}

function drawCards() {
  const result = [];
  for (let i = 0; i < 4; i++) {
    result.push(randomCard());
  }
  return result;
}

function ExchangeModal({ bag, onClose, onExchange }) {
  // 統計各等級卡片數量
  const cardCount = { N: 0, R: 0, SR: 0, UR: 0 };
  bag.forEach(card => { cardCount[card.level] = (cardCount[card.level] || 0) + 1; });
  // 計算可兌換上限
  const maxN = Math.floor(cardCount.N / 2) * 2;
  const maxR = cardCount.R;
  const maxSR = cardCount.SR;
  const maxUR = cardCount.UR;
  // 狀態
  const [nCount, setNCount] = useState(0);
  const [rCount, setRCount] = useState(0);
  const [srCount, setSRCount] = useState(0);
  const [urCount, setURCount] = useState(0);
  // 計算可換西瓜數
  const nWatermelon = Math.floor(nCount / 2);
  const rWatermelon = rCount * 1;
  const srWatermelon = srCount * 3;
  const urWatermelon = urCount * 5;
  const watermelon = nWatermelon + rWatermelon + srWatermelon + urWatermelon;
  // 控制加減
  const add = (max, set) => () => set(x => Math.min(x + 1, max >= 0 ? max : 0));
  const sub = set => () => set(x => Math.max(x - 1, 0));
  // 兌換
  const handleExchange = () => {
    onExchange({ N: nCount, R: rCount, SR: srCount, UR: urCount });
    onClose();
  };
return (
  <div className="arrest-modal-bg">
    <div className="arrest-modal exchange-modal">
      <div className="exchange-title">交換區</div>
      <div className="exchange-list">
        <div className="exchange-row">
          <span className="exchange-level level-N">N</span>
          <button onClick={sub(setNCount)} disabled={nCount === 0}>-</button>
          <span className="exchange-count">{nCount}/{cardCount.N}</span>
          <button onClick={add(maxN, setNCount)} disabled={nCount >= maxN}>+</button>
          <span className="exchange-equal">=</span>
          <span className="exchange-wm"><img src="/images/watermelon.png" alt="西瓜" />+{nWatermelon}</span>
        </div>
        {/* 其他 R、SR、UR 類似，這裡省略 */}
      </div>
      <div className="exchange-total">
        總計 <img src="/images/watermelon.png" alt="西瓜" /> +{watermelon}
      </div>
      <div className="exchange-btn-row">
        <button className="exchange-cancel-btn" onClick={onClose}>取消</button>
        <button className="exchange-confirm-btn" onClick={handleExchange} disabled={watermelon === 0}>確定</button>
      </div>
    </div>
  </div>
);
}

function ArrestPage() {
  const { watermelon, setWatermelon, caughtCount, setCaughtCount, catchPig, bag, setBag } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [drawn, setDrawn] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [showExchange, setShowExchange] = useState(false);

  const handleDraw = () => {
    if (watermelon < 1) return;
    setWatermelon(w => w - 1);
    setCaughtCount(c => c + 1);
    const result = drawCards();
    setDrawn(result);
    catchPig(result.map(c => c.id));
    setBag(prev => [...prev, ...result]);
    setShowModal(true);
  };

  // 兌換邏輯
  const handleExchange = ({ N, R, SR, UR }) => {
    // 靘?蝘駁?∠?
    let leftN = N, leftR = R, leftSR = SR, leftUR = UR;
    setBag(prev => {
      const newBag = [];
      for (const card of prev) {
        if (card.level === 'N' && leftN > 0) { leftN--; continue; }
        if (card.level === 'R' && leftR > 0) { leftR--; continue; }
        if (card.level === 'SR' && leftSR > 0) { leftSR--; continue; }
        if (card.level === 'UR' && leftUR > 0) { leftUR--; continue; }
        newBag.push(card);
      }
      return newBag;
    });
    // ?正??
    setWatermelon(w => w + Math.floor(N / 2) + R + SR * 3 + UR * 5);
  };

  // 依序自動淡入卡片
  useEffect(() => {
    if (showModal && drawn.length > 0) {
      setVisibleCards(Array(drawn.length).fill(false));
      drawn.forEach((_, idx) => {
        setTimeout(() => {
          setVisibleCards(v => {
            const next = [...v];
            next[idx] = true;
            return next;
          });
        }, 300 * (idx + 1));
      });
    } else if (!showModal) {
      setVisibleCards([]);
    }
  }, [showModal, drawn]);

  // 依等級排序已抽到的卡片（可重複）
  const bagCards = bag.sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.id - b.id);

  return (
    <div className="arrest-page">
      <div className="arrest-collected-list">
        <div className="arrest-bag-header">
          <div className="arrest-bag-title">背包</div>
          <div className="arrest-bag-count">已捕獲小豚：{bag.length}隻</div>
        </div>
        <div className="arrest-collected-cards-scroll">
          {bagCards.map((card, idx) => (
            <div className={`arrest-collected-card level-${card.level}`} key={idx}>
              <img src={card.img} alt={card.name} />
              <div className="arrest-collected-card-name">{card.name}</div>
              <div className="arrest-collected-card-level">{card.level}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="arrest-btn" onClick={handleDraw} disabled={watermelon < 1}>
        <span>誘捕</span>
        <img src="/images/water.png" alt="誘捕" className="arrest-btn-icon" />
      </button>
      <button className="exchange-btn" onClick={() => setShowExchange(true)}>兌換</button>
      {showExchange && (
        <ExchangeModal bag={bag} onClose={() => setShowExchange(false)} onExchange={handleExchange} />
      )}
      {showModal && (
        <div className="arrest-modal-bg">
          <div className="arrest-modal">
            <div className="arrest-modal-title">抽到的卡片</div>
            <div className="arrest-modal-cards">
              {drawn.map((card, idx) => (
                <div className={`arrest-modal-card level-${card.level}${visibleCards[idx] ? ' visible' : ''}`} key={idx}>
                  <img src={card.img} alt={card.name} />
                  <div className="arrest-modal-card-name">{card.name}</div>
                  <div className="arrest-modal-card-level">{card.level}</div>
                </div>
              ))}
            </div>
            <button className="arrest-modal-close" onClick={() => setShowModal(false)}>關閉</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArrestPage;