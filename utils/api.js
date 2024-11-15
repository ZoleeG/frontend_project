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

export function patchArticleVotes(article_id, newVotes) {
  return backendApi.patch(`/articles/${article_id}`, newVotes).then((patchedArticle) => {
      return patchedArticle.data.updatedArticle
  })
}

export const getTotalComments = (article_id) => {
  return backendApi.get(`/articles/${article_id}/comments`, {params:{limit: 120}}).then((res) => {
    return res.data.comments.length
  })
};

export function getArticleComments(article_id, commentsPage, commentsLimit, commentsSortBy, commentsOrder) {
  return backendApi.get(`/articles/${article_id}/comments`, {params: {
      p: commentsPage,
      limit: commentsLimit,
      sort_by: commentsSortBy,
      order: commentsOrder
  }})
  .then((res) => {
      return res.data.comments
  })
}

export function patchCommentVotes(comment_id, newVotes) {
  return backendApi.patch(`/comments/${comment_id}`, newVotes).then((patchedComment) => {
      return patchedComment.data.updatedComment
  })
}

export function postComment(article_id, inputBody) {
  return backendApi.post(`/articles/${article_id}/comments`, inputBody).then((res) => {
      return res.data.newComment
  })
}

export const fetchUser = (username) => {
  return backendApi.get("/users",{params:{username: username}}).then((res) => {
    return res.data.users;
  })
}

export const getUsers = () => {
  return backendApi.get(`/users`).then((res) => {
      return res.data.users
  })
}

export function deleteComments(comment_id) {
  return backendApi.delete(`/comments/${comment_id}`)
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

export function postArticle(newArticle) {
  return backendApi.post(`/articles`, newArticle).then((newArticle) => {
      return newArticle.data.newArticle
  })
}
export function postUser(newUser) {
  return backendApi.post('/users', newUser)
  .then((user) => {
      return user.data.newUser
  })
}

export function getTopics() {
  return backendApi.get("/topics").then((topics) => {
      return topics.data.topics
  })
}

export function deleteArticles (article_id) {
  return backendApi.delete(`/articles/${article_id}`)
}

export function postTopic(inputBody) {
  return backendApi.post(`/topics`, inputBody).then((res) => {
      return res.data.newTopic
  })
}