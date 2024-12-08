export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isLiked: boolean;
  rating: ProductRating;
  category: string;
}

export interface ProductCardProps {
  product: Product; 
  onClick: () => void;
  onToggleLike: () => void;
  onDelete: () => void;
  isFavorite: boolean;
  onAddToFavorites: () => void;
  onRemoveFromFavorites: () => void;
}

export interface ProductsState {
  products: Product[];
  favorites: number[];
  loading: boolean,
  error: null | string,
}

export interface HeaderProps {
  onSearch: (query: string) => void;
  setFilter: React.Dispatch<React.SetStateAction<"all" | "favorites">>;
  filter: "all" | "favorites";
}

export interface FormData {
  name: string;
  description: string;
  imageUrl: string;
}

export interface SortFilterProps {
  onSortChange: (sortOption: SortOption) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export interface FormErrors {
  name: boolean;
  description: boolean;
  imageUrl: boolean;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceDelay?: number;
}

export type FilterType = "all" | "favorites";
export type SortOption = "rating" | "priceAsc" | "priceDesc" | "category";


