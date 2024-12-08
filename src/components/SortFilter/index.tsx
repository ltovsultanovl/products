import React, { useState } from "react";
import { SortOption } from "../../types/types";
import { SortFilterProps } from "../../types/types";
import styles from "./SortFilter.module.css";

const SortFilter: React.FC<SortFilterProps> = ({
  onSortChange,
  onCategoryChange,
  categories,
}) => {
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>("rating");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSortChange = (sortOption: SortOption): void => {
    setSelectedSort(sortOption);
    onSortChange(sortOption);
    setSortOpen(false);
  };

  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category);
    onCategoryChange(category);
    setCategoryOpen(false);
  };

  return (
    <div className={styles.sortFilter}>
      <div className={styles.sortSection}>
        <label>Сортировка:</label>
        <div className={styles.dropdown} onClick={() => setSortOpen(!sortOpen)}>
          <span>
            {selectedSort === "rating"
              ? "По рейтингу"
              : selectedSort === "priceAsc"
              ? "Цена: по возрастанию"
              : selectedSort === "priceDesc"
              ? "Цена: по убыванию"
              : "Категория"}
          </span>
        </div>
        {sortOpen && (
          <div className={styles.dropdownMenu}>
            <ul>
              <li onClick={() => handleSortChange("rating")}>По рейтингу</li>
              <li onClick={() => handleSortChange("priceAsc")}>Цена(ASC)</li>
              <li onClick={() => handleSortChange("priceDesc")}>Цена(DESC)</li>
            </ul>
          </div>
        )}
      </div>

      <div className={styles.sortSection}>
        <label>Категории:</label>
        <div
          className={styles.dropdown}
          onClick={() => setCategoryOpen(!categoryOpen)}
        >
          <span>{selectedCategory || "Выберите категорию"}</span>
        </div>
        {categoryOpen && (
          <div className={styles.dropdownMenu}>
            <ul>
              <li onClick={() => handleCategoryChange("")}>Все категории</li>
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortFilter;
