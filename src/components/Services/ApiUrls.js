import {
  axiosInstances,
} from "../Helpers/axiosWrapper";

const baseURL = process.env.REACT_APP_API_URL;
//sample request
//need call service : {url:'/', method:'post', data:'params'}
function fetchCategories(params) {
  return axiosInstances({
    url: `${baseURL}/products/categories`,
    method: "get",
  });
}

function productsByCategory(category) {
  return axiosInstances({
    url: `${baseURL}/products/productsbycategory/${category}`,
    method: "get",
  });
}



export const API_URLS = {
  fetchCategories,
  productsByCategory,
};
