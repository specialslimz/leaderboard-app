import { useState } from "react";
import data from "./data.js";

export default function App() {
  const [items, setItems] = useState(data);
  const uniqueButtons = [...new Set(data.map((item) => item.path))];

  function handleClick(id) {
    const filterItems = data.filter((item) => item.path === id);
    setItems(filterItems);
  }

  return (
    <div className="App">
      <Logo />
      <Button
        uniqueButtons={uniqueButtons}
        handleClick={handleClick}
        handleAll={setItems}
      />
      <Board items={items} />
    </div>
  );
}

function Logo() {
  return <h1 className="logo"> LEADERBOARD</h1>;
}

function Board({ items }) {
  const [sortBy, setSortBy] = useState("all");
  let sortedItems;
  if (sortBy === "all") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (sortBy === "highscore")
    sortedItems = items
      .slice()
      .sort(
        (a, b) => b.firstScore + b.secondScore - (a.firstScore + a.secondScore)
      );
  return (
    <>
      <div>
        <ul className="board-list">
          {sortedItems.map((score) => (
            <List scores={score} key={score.id} />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="all">All</option>
          <option value="description">Sort by name</option>
          <option value="highscore">Sort by highscore</option>
        </select>
      </div>
    </>
  );
}

function List({ scores }) {
  const total = scores.firstScore + scores.secondScore;

  return (
    <div className="list">
      <figure>
        <img src={scores.image} alt={scores.name} />
      </figure>
      <article className="list-details">
        <header>
          <h1> {scores.name}</h1>
        </header>
        <h3> Path: {scores.path}</h3>
        <p> Task-1: {scores.firstScore}</p>
        <p> Task-2: {scores.secondScore}</p>
        <h3> TOTAL: {total}</h3>
      </article>
    </div>
  );
}

const Button = ({ uniqueButtons, handleClick, handleAll }) => {
  const [isActive, setIsActive] = useState(null);
  return (
    <div className="buttons">
      {uniqueButtons.map((buttonTitle, index) => (
        <button
          className={` ${isActive === buttonTitle ? "active" : ""}`}
          key={index}
          onClick={() => {
            handleClick(buttonTitle);
            setIsActive(buttonTitle);
          }}
        >
          {buttonTitle}
        </button>
      ))}
      <button
        key="all"
        onClick={() => {
          handleAll(data);
          setIsActive("all");
        }}
        className={isActive === "all" || isActive === null ? "active" : ""}
      >
        All
      </button>
    </div>
  );
};
