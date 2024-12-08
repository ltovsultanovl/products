import React, { useState, useEffect } from "react";
import { RootState } from "../../app/store";
import {
  fetchProductsThunk,
  toggleLike,
  deleteProduct,
  addToFavorites,
  removeFromFavorites,
} from "../../features/productsSlice";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import SortFilter from "../../components/SortFilter";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../../components/SkeletonCard";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import styles from "./ProductsPage.module.css";
import { FilterType, SortOption } from "../../types/types";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { products, favorites, loading } = useAppSelector(
    (state: RootState) => state.products
  );

  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<SortOption>("rating");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const itemsPerPage: number = 5;

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsThunk());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (filter === "favorites") {
      setCurrentPage(1);
    }
  }, [filter]);

  const categories: string[] = Array.from(
    new Set(products.map((product) => product.category))
  );

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      filter === "favorites" ? favorites.includes(product.id) : true
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "rating":
          return b.rating.rate - a.rating.rate;
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  const totalPages: number = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category);
    setCurrentPage(1); // Сбросить страницу при изменении категории
  };

  return (
    <div className={styles.productsPage}>
      <Header
        onSearch={(query) => setSearchQuery(query)}
        setFilter={(value) => setFilter(value as FilterType)}
        filter={filter}
      />

      <SortFilter
        onSortChange={(option) => setSortOption(option as SortOption)}
        onCategoryChange={handleCategoryChange} 
        categories={categories}
      />

      <div className={styles.productsList}>
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onToggleLike={() => dispatch(toggleLike(product.id))}
                onDelete={() => dispatch(deleteProduct(product.id))}
                isFavorite={favorites.includes(product.id)}
                onClick={() => navigate(`/products/${product.id}`)}
                onAddToFavorites={() => dispatch(addToFavorites(product.id))}
                onRemoveFromFavorites={() =>
                  dispatch(removeFromFavorites(product.id))
                }
              />
            ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Назад
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;

