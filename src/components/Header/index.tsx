import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import SearchBar from "../SearchBar";
import { HeaderProps } from "../../types/types";
import styles from "./Header.module.css";

const Header: React.FC<HeaderProps> = ({ onSearch, setFilter, filter }) => {
  const navigate = useNavigate();

  const handleToggleFavorites = () => {
    setFilter(filter === "favorites" ? "all" : "favorites");
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <button onClick={() => setFilter("all")}>Все продукты</button>
        <button onClick={() => navigate("/create-product")}>
          Добавить продукт
        </button>
      </div>

      <div className={styles.centerSearch}>
        <SearchBar
          onSearch={onSearch}
          placeholder="Введите название продукта"
          debounceDelay={500}
        />
      </div>

      <div className={styles.rightSide}>
        <button onClick={handleToggleFavorites}>
          <FaStar size={30} color={filter === "favorites" ? "gold" : "#ccc"} />
        </button>
      </div>
    </header>
  );
};

export default Header;
