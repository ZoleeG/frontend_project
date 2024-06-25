import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://be-project-7l6i.onrender.com/api",
});

export const fetchArticleById = (article_id) => {
  return backendApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const fetchArticles = (topicparam, sortbyparam, orderparam, limit, page) => {
  return backendApi.get(`/articles`,{params:{topic: topicparam, sort_by: sortbyparam, order: orderparam, limit, p: page }}).then((res) => {
    return res.data.articles;
  });
};

export const fetchCommentsByArticleId = (article_id) => {
  return backendApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  })
};

export const patchVote = (article_id, vote) => {
  return backendApi.patch(`/articles/${article_id}`, { inc_votes : vote }).then((res) => {
    return res.data.updatedArticle;
  })
}

export const postComment = (article_id, author, comment ) => {
  return backendApi.post(`/articles/${article_id}/comments`, {username: author, body: comment}).then((res) => {
    return res.data.newComment;
  })
}

export const fetchUser= (username) => {
  return backendApi.get("/users",{params:{username: username}}).then((res) => {
    return res.data.users;
  })
}

export const deleteComment= (comment_id) => {
  return backendApi.delete(`comments/${comment_id}`).then((res) => {
    return res.data;
  })
}

export const fetchTopics = () => {
  return backendApi.get("/topics").then((res) => {
    return res.data.topics;
  })
}

export const getTotalArticles = (topicparam) => {
  return backendApi.get(`/articles`,{params:{topic: topicparam, limit: 120}}).then((res) => {
    return res.data.articles.length;
  });
};


