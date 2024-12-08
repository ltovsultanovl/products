import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonCard.module.css";

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <Skeleton height={150} width="100%" />

      <div className={styles.texts}>
        <Skeleton height={30} width="80%" />
        <Skeleton height={20} width="60%" />
        <Skeleton height={20} width="40%" />
      </div>
    </div>
  );
};

export default SkeletonCard;
