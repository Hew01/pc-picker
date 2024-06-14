import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiFetch from 'utils/apiConfig';

export interface Product {
  _id: string;
  productName: string;
  brand: string;
  descriptions: string;
  detailed_info: string;
  category: string;
  instockStatus: boolean;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  buttonPressHandler: any;
}

export const useStore = create(
  persist(
    (set, get) => ({
      productList: [] as Product[],
      cartList: [] as Product[],
      favoritesList: [] as Product[],
      orderHistoryList: [] as Product[],
      totalCartPrice: 0,

      // Fetch products from API
      fetchProducts: async (apiEndpoint: string) => {
        try {
          const response = await apiFetch(apiEndpoint, '');
          console.log('fetchProducts response:', response);
          const products: Product[] = response;
          set({ productList: products });
        } catch (error) {
          console.error('Failed to fetch products:', error);
        }
      },
      

      // Add to cart
      addToCart: (product: Product) =>
        set(
          produce((state) => {
            const existingProduct = state.cartList.find((p: { _id: string; }) => p._id === product._id);
            if (existingProduct) {
              existingProduct.quantity++;
            } else {
              state.cartList.push({ ...product, quantity: 1 });
            }
            state.totalCartPrice += product.price;
          }),
        ),

      // Add to favorites
      addToFavoriteList: (product: Product) =>
        set(
          produce((state) => {
            const existingProduct = state.favoritesList.find((p: { _id: string; }) => p._id === product._id);
            if (!existingProduct) {
              state.favoritesList.push(product);
            }
          }),
        ),

      // Remove from favorites
      deleteFromFavoriteList: (product: Product) =>
        set(
          produce((state) => {
            const index = state.favoritesList.findIndex((p: { _id: string; }) => p._id === product._id);
            if (index !== -1) {
              state.favoritesList.splice(index, 1);
            }
          }),
        ),

      // Increment cart item quantity
      incrementCartItemQuantity: (id: string) =>
        set(
          produce((state) => {
            const product = state.cartList.find((p: { _id: string; }) => p._id === id);
            if (product) {
              product.quantity++;
            }
          }),
        ),

      // Decrement cart item quantity
      decrementCartItemQuantity: (id: string) =>
        set(
          produce((state) => {
            const product = state.cartList.find((p: { _id: string; }) => p._id === id);
            if (product && product.quantity > 1) {
              product.quantity--;
            }
          }),
        ),

      // Add to order history
      addToOrderHistoryListFromCart: () =>
        set(
          produce((state) => {
            state.orderHistoryList.push(...state.cartList);
            state.cartList = [];
          }),
        ),
    }),
    {
      name: 'product-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
