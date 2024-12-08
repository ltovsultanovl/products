import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../features/productsSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import styles from "./CreateProduct.module.css";

const CreateProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [ratingRate, setRatingRate] = useState<number>(0);
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!name.trim()) errors.name = "Название обязательно";
    if (!description.trim()) errors.description = "Описание обязательно";
    if (!imageUrl.trim()) errors.imageUrl = "Ссылка на изображение обязательна";
    if (price <= 0) errors.price = "Цена должна быть больше 0";
    if (ratingRate < 0 || ratingRate > 5)
      errors.ratingRate = "Рейтинг должен быть от 0 до 5";
    if (ratingCount < 0)
      errors.ratingCount = "Количество отзывов должно быть положительным";
    if (!category.trim()) errors.category = "Категория обязательна";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newProduct = {
      id: Date.now(),
      name,
      description,
      imageUrl,
      isLiked,
      price,
      rating: {
        rate: ratingRate,
        count: ratingCount,
      },
      category,
    };

    dispatch(addProduct(newProduct));

    setName("");
    setDescription("");
    setImageUrl("");
    setIsLiked(false);
    setPrice(0);
    setRatingRate(0);
    setRatingCount(0);
    setCategory("");
    setFormErrors({});

    navigate("/products");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Добавить продукт</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Название:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Описание:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
          {formErrors.description && (
            <p className={styles.error}>{formErrors.description}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl" className={styles.label}>
            Ссылка на изображение:
          </label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={styles.input}
          />
          {formErrors.imageUrl && (
            <p className={styles.error}>{formErrors.imageUrl}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>
            Цена:
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={styles.input}
          />
          {formErrors.price && (
            <p className={styles.error}>{formErrors.price}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ratingRate" className={styles.label}>
            Рейтинг (0-5):
          </label>
          <input
            id="ratingRate"
            type="number"
            step="0.1"
            value={ratingRate}
            onChange={(e) => setRatingRate(Number(e.target.value))}
            className={styles.input}
          />
          {formErrors.ratingRate && (
            <p className={styles.error}>{formErrors.ratingRate}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ratingCount" className={styles.label}>
            Количество отзывов:
          </label>
          <input
            id="ratingCount"
            type="number"
            value={ratingCount}
            onChange={(e) => setRatingCount(Number(e.target.value))}
            className={styles.input}
          />
          {formErrors.ratingCount && (
            <p className={styles.error}>{formErrors.ratingCount}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Категория:
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.input}
          />
          {formErrors.category && (
            <p className={styles.error}>{formErrors.category}</p>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Добавить продукт
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
