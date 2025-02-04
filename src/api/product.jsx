import axios from "axios";

export const createProduct = async (token, form) => {
  // code body
  return axios.post("https://book-store-api-coral.vercel.app/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 100) => {
  // code body
  return axios.get("https://book-store-api-coral.vercel.app/api/products/" + count);
};

export const readProduct = async (token, id) => {
  // code body
  return axios.get("https://book-store-api-coral.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (token, id) => {
  // code body
  return axios.delete("https://book-store-api-coral.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProduct = async (token, id, form) => {
  // code body
  return axios.put("https://book-store-api-coral.vercel.app/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    "https://book-store-api-coral.vercel.app/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    "https://book-store-api-coral.vercel.app/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = async (arg) => {
  // code body
  return axios.post("https://book-store-api-coral.vercel.app/api/search/filters", arg);
};

export const listProductBy = async (sort, order, limit) => {
  // code body
  return axios.post("https://book-store-api-coral.vercel.app/api/productby", {
    sort,
    order,
    limit,
  });
};
