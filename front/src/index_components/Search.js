import React from "react";

export default function () {
  const categories = React.useRef();
  const dropdown = React.useRef();
  const items = [
    "Dresses",
    "Tops",
    "Sweaters/Knits",
    "Jackets/Coats",
    "Denim",
    "Leggings/Pants",
    "Skirts/Shorts",
    "Accessories",
    "Tees/Tank tops",
    "Shirts/Polos",
    "Sweaters",
    "Sweatshirts/Hoodies",
    "Blazers",
    "Jackets/vests",
  ];
  const [activeItems, setActiveItems] = React.useState(items);
  function changeData(data) {
    if (data) {
      const check = new RegExp(data, "i");
      const newItems = items.filter((item) => {
        const result = item.search(check);
        if (result !== -1) return true;
        else return false;
      });
      return setActiveItems(newItems);
    } else setActiveItems(items);
  }
  return (
    <div className="search">
      <button
        className="search__browse"
        onClick={() => {
          categories.current.classList.toggle("active");
        }}
        name="search"
      >
        Browse <i className="fas fa-caret-down"></i>
      </button>
      <div className="dropdown" ref={categories}>
        <div className="dropdown-container">
          <div>
            <div>Women</div>
            <a href="#">Dresses</a>
            <a href="#">Tops</a>
            <a href="#">Sweaters/Knits</a>
            <a href="#">Jackets/Coats</a>
            <a href="#">Denim</a>
            <a href="#">Leggings/Pants</a>
            <a href="#">Skirts/Shorts</a>
            <a href="#">Accessories</a>
            <div>Man</div>
            <a href="#">Tees/Tank tops</a>
            <a href="#">Shirts/Polos</a>
            <a href="#">Sweaters</a>
            <a href="#">Sweatshirts/Hoodies</a>
            <a href="#">Blazers</a>
            <a href="#">Jackets/vests</a>
          </div>
        </div>
      </div>
      <input
        autocomplete="off"
        type="text"
        name="search"
        onChange={(event) => {
          changeData(event.target.value);
        }}
        onFocus={() => {
          dropdown.current.classList.add("active");
        }}
        onBlur={() => {
          dropdown.current.classList.remove("active");
        }}
        placeholder="Search for Item..."
      />
      <div className="input-dropdown" ref={dropdown}>
        {activeItems.map((item, index) => (
          <a key={index} href="#">
            {item}
          </a>
        ))}
      </div>
      <button>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}
