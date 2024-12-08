import React, { useCallback } from "react";
import debounce from "lodash.debounce";
import { SearchBarProps } from "../../types/types";
import styles from "./SearchBar.module.css";

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
  debounceDelay = 300,
}) => {
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, debounceDelay),
    [onSearch, debounceDelay]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className={styles.search_bar}>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
