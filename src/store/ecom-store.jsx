import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  // Logout function
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },

  // Add to Cart
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [
      ...carts,
      {
        ...product,
        count: 1,
        image: product.image || "https://via.placeholder.com/150", // Fallback image
      },
    ];
    const uniqe = _.unionWith(updateCart, _.isEqual); // Remove duplicate items
    set({ carts: uniqe });
    console.log("Updated carts:", uniqe); // Debugging carts
  },

  // Update quantity
  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  // Remove product from cart
  actionRemoveProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },

  // Get total price
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  // Login
  actionLogin: async (form) => {
    try {
      const res = await axios.post("https://book-store-api-coral.vercel.app/api/login", form);
      set({
        user: res.data.payload,
        token: res.data.token,
      });
      return res;
    } catch (err) {
      console.error("Error in actionLogin:", err);
    }
  },

  // Get categories
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
      console.log("Categories:", res.data); // Debug categories
    } catch (err) {
      console.error("Error in getCategory:", err);
    }
  },

  // Get products
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      const products = res.data.map((product) => ({
        ...product,
        image: product.image || "https://via.placeholder.com/150", // Fallback image
      }));
      set({ products });
      console.log("Products:", products); // Debug products
    } catch (err) {
      console.error("Error in getProduct:", err);
    }
  },

  // Search filters
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      const products = res.data.map((product) => ({
        ...product,
        image: product.image || "https://via.placeholder.com/150", // Fallback image
      }));
      set({ products });
      console.log("Search Results:", products); // Debug search results
    } catch (err) {
      console.error("Error in actionSearchFilters:", err);
    }
  },

  // Clear cart
  clearCart: () => set({ carts: [] }),
});

// Persist configuration
const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

// Create store
const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
