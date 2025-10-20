"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/product";

const MOCK_PRODUCTS: Product[] = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  category: ["Herramientas", "Repuestos", "Insumos"][i % 3],
  price: (Math.random() * 50000 + 1000).toFixed(0),
  stock: Math.floor(Math.random() * 50),
}));

async function fetchProducts(page: number, pageSize: number): Promise<{
  data: Product[];
  total: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      resolve({ data: MOCK_PRODUCTS.slice(start, end), total: MOCK_PRODUCTS.length });
    }, 400);
  });
}

export function useProducts(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["products", page, pageSize],
    queryFn: () => fetchProducts(page, pageSize),
    keepPreviousData: true,
  });
}
