import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://be-project-7l6i.onrender.com/api",
});

export const fetchArticleById = (article_id) => {
  return backendApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const fetchArticles = () => {
  return backendApi.get(`/articles`).then((res) => {
    return res.data.articles;
  });
};
