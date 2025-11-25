import React from "react";

export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type ProductsType = ProductType[];

export type CategoryType = {
  name: string;
  icon: React.ReactNode;
  slug: string;
};

export type CardProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type CardProductTypes = CardProductType[];

export type TimerType = {
  startTimer: () => void;
  getDuration: () => number;
  resetStartTimer: () => void;
  startTime: React.RefObject<number | null>;
}