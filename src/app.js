import api from "./api";
import functions from "./functions";
import store from "./store";

api.getAllBookmarks().then((res) => {
  store.updateBookmark(res);
  functions.render();
});
