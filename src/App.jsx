import "./App.css";
import palmImg from "./assets/palm.png";
import logoImg from "./assets/logo.svg";
import lugageImg from "./assets/lugage.png";
import lugageSvg from "./assets/lugage.svg";
import XImg from "./assets/X.svg";
import { useState } from "react";

function App() {
  const [itemsList, setItemsList] = useState([]);

  return (
    <div id="pageArea">
      <Logo />
      <Form itemsList={itemsList} setItemsList={setItemsList} />
      <PakigList itemsList={itemsList} setItemsList={setItemsList} />
      <State itemsList={itemsList} />
    </div>
  );
}

function Logo() {
  return (
    <div id="logoArea">
      <div className="imgArea">
        <img src={palmImg} alt="" />
      </div>
      <div
        className="imgArea"
        style={{
          width: "400px",
          height: "180px",
        }}
      >
        <img src={logoImg} alt="" />
      </div>
      <div className="imgArea">
        <img src={lugageImg} alt="" />
      </div>
    </div>
  );
}

function Form({ itemsList, setItemsList }) {
  const [itemNum, setItemNum] = useState();
  const [itemData, setItemData] = useState();

  const itemDataHandler = (value) => {
    setItemData(value);
  };

  const itemNumHandler = (value) => {
    setItemNum(value);
  };

  const addHandler = () => {
    const newList = [...itemsList];

    newList.push({
      id: Date.now(),
      number: itemNum,
      data: itemData,
      isPacked: false,
    });

    setItemsList(newList);
  };

  return (
    <div id="formcontent">
      <p>What do you need for your 😍 trip?</p>
      <select onChange={(e) => itemNumHandler(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <input
        type="text"
        placeholder="Item..."
        onChange={(e) => itemDataHandler(e.target.value)}
      />
      <button onClick={addHandler}>ADD</button>
    </div>
  );
}

function PakigList({ itemsList, setItemsList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = itemsList;
  }

  if (sortBy === "description") {
    sortedItems = [...itemsList].sort((a, b) => a.data.localeCompare(b.data));
  }

  if (sortBy === "packed") {
    sortedItems = [...itemsList].sort(
      (a, b) => Number(a.isPacked) - Number(b.isPacked),
    );
  }

  return (
    <div id="listArea">
      <div id="itemList">
        {sortedItems?.map((itemLi) => (
          <Item
            key={itemLi.id}
            itemLi={itemLi}
            itemsList={itemsList}
            setItemsList={setItemsList}
          />
        ))}
      </div>

      <div id="btns">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="description">SORT BY DESCRIPTION</option>
          <option value="packed">SORT BY PACKED STATUS</option>
        </select>
        <button onClick={() => setItemsList([])}>CLEAR LIST</button>
      </div>
    </div>
  );
}

function State({ itemsList }) {
  return (
    <div id="stateContent">
      <div id="stateImg">
        <img src={lugageSvg} alt="" />
      </div>
      <p>
        You have {itemsList.length} items on your list, and you already packed{" "}
        {itemsList.filter((i) => i.isPacked).length} (
        {Math.round(
          (itemsList.filter((i) => i.isPacked).length / itemsList.length) * 100,
        ) || 0}
        %)
      </p>
    </div>
  );
}

function Item({ itemLi, itemsList, setItemsList }) {
  function listUpdateHandler(bool) {
    const newArr = itemsList.map((singleItem) => {
      return singleItem.id === itemLi.id
        ? {
            ...singleItem,
            isPacked: bool,
          }
        : singleItem;
    });
    setItemsList(newArr);
  }

  return (
    <div id="items">
      <input
        type="checkbox"
        checked={itemLi.isPacked}
        onChange={(e) => listUpdateHandler(e.target.checked)}
      />
      <p
        style={{
          textDecoration: itemLi.isPacked ? "line-through" : "none",
        }}
      >
        {itemLi.number} - {itemLi.data}
      </p>
      <div
        id="xImg"
        onClick={() =>
          setItemsList(itemsList.filter((item) => item.id !== itemLi.id))
        }
      >
        <img src={XImg} alt="" />
      </div>
    </div>
  );
}

export default App;
