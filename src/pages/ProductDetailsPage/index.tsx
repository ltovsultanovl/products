import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";
import { RootState } from "../../app/store";
import styles from "./ProductDetailsPage.module.css";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useAppSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  const handleGoHome = () => {
    navigate("/products");
  };

  if (!product) {
    return (
      <div className={styles.error}>
        <p>Продукт не найден.</p>
        <button onClick={handleGoHome}>Вернуться к списку</button>
      </div>
    );
  }

  return (
    <div className={styles.product_details_page}>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>Цена: ${product.price}</p>
      <button onClick={handleGoHome}>Назад</button>
    </div>
  );
};

export default ProductDetailsPage;
