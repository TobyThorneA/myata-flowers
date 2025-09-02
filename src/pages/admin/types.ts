// src/admin/types.ts
export interface IFlower {
  type: string;
  sort: string;
  color: string;
  quantity: number;
}

export interface IPromotion {
  active: boolean;
  type: 'discount' | 'free_delivery' | 'delivery_discount';
  description?: string;
}

export interface IBouquet {
  category: string;
  _id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  images: string[];
  size: string;
  textSize: 'маленький' | 'средний' | 'большой';
  promotion?: IPromotion;
  flowers: IFlower[];
  available: boolean;
  hidden: boolean;
  tags: string[];
  categories: string[];
}

// Тип для формы (до трансформации)
export interface BouquetFormInput {
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  images: string; // вводится как строка с ссылками
  size: string;
  textSize: 'маленький' | 'средний' | 'большой';
  promotion?: {
    active: boolean;
    type: 'discount' | 'free_delivery' | 'delivery_discount';
    description?: string;
  };
  flowers: {
    type: string;
    sort: string;
    color: string;
    quantity: number;
  }[];
  available: boolean;
  hidden: boolean;
  tags?: string[];
  categories?: string[];
}
