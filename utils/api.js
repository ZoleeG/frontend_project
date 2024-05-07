import axios from 'axios';

const backendApi = axios.create({
    baseURL: "https://be-project-7l6i.onrender.com/api",
  });

export const fetchArticles = () => {
    return backendApi.get(`/articles`).then((res) => {
      return res.data.articles;
    });
  };