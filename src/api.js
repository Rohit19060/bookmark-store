import store from "./store";

const url = "https://thinkful-list-api.herokuapp.com/rohit/bookmarks";

const getAllBookmarks = () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      store.error = err;
    });
}

const addBookmark = (bookmark) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(bookmark),
  })
    .then((res) => res.json())
    .catch((err) => {
      store.error = err;
    });
}

const deleteBookmark = (id) => {
  return fetch(url + "/" + id, {
    method: "DELETE",
  }).catch((err) => {
    store.error = err;
  });
}

export default { getAllBookmarks, addBookmark, deleteBookmark };
