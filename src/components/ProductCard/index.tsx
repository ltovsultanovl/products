import React from "react";
import { ProductCardProps } from "../../types/types";
import {
  FaHeart,
  FaRegHeart,
  FaTrashAlt,
  FaStar,
  FaRegStar,
  FaEdit,
} from "react-icons/fa";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  onToggleLike,
  onDelete,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.product_card} onClick={onClick}>
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className={styles.price}>Цена: ${product.price}</p>

      <div className={styles.button_container}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
        >
          {product.isLiked ? (
            <FaHeart size={18} color="red" />
          ) : (
            <FaRegHeart size={18} color="gray" />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FaTrashAlt size={18} color="gray" />
        </button>
        {isFavorite ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFromFavorites();
            }}
          >
            <FaStar size={18} color="gold" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToFavorites();
            }}
          >
            <FaRegStar size={18} color="gray" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit-product/${product.id}`);
          }}
        >
          <FaEdit size={16} color="blue" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
