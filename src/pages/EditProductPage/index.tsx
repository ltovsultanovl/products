import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { updateProduct } from "../../features/productsSlice";
import { RootState } from "../../app/store";
import {
  FormErrors,
  FormData,

  Product,
} from "../../types/types";
import styles from "./EditProductPage.module.css";

const EditProductPage: React.FC = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product: Product | undefined = useAppSelector((state: RootState) =>
    state.products.products.find((p) => p.id === parseInt(id ?? ""))
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: false,
    description: false,
    imageUrl: false,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: formData.name.trim() === "",
      description: formData.description.trim() === "",
      imageUrl: formData.imageUrl.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (validateForm()) {
      const updatedProduct: Product = {
        ...product!,
        ...formData,
      };

      dispatch(updateProduct(updatedProduct));
      navigate("/products");
    }
  };

  if (!id) {
    console.error("ID не найден");
    return <p>Некорректный идентификатор продукта</p>;
  }

  if (!product) {
    console.error("Продукт не найден");
    return (
      <div className={styles.error}>
        <p>Продукт не найден</p>
        <button onClick={() => navigate("/products")}>
          Вернуться к списку
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Редактировать продукт</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Название:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${styles.input} ${errors.name ? styles.error : ""}`}
          />
          {errors.name && (
            <p className={styles.errorText}>Название обязательно</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Описание:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`${styles.textarea} ${
              errors.description ? styles.error : ""
            }`}
          />
          {errors.description && (
            <p className={styles.errorText}>Описание обязательно</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl" className={styles.label}>
            Ссылка на изображение:
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`${styles.input} ${errors.imageUrl ? styles.error : ""}`}
          />
          {errors.imageUrl && (
            <p className={styles.errorText}>
              Ссылка на изображение обязательна
            </p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Сохранить
          </button>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className={styles.cancelButton}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
