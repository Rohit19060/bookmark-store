import $ from "jquery";
import api from "./api";
import store from "./store";
import "./styles.css";
import templates from "./templates";

const removeBookmark = (id) => {
  api.deleteBookmark(id).then((res) => {
    api.getAllBookmarks().then((res) => {
      store.updateBookmark(res);
      render();
    });
  });
}

const addEvents = () => {
  $("main").off();
  if (store.adding) {
    $("#cancel").on("click", () => {
      store.stopAdding();
      render();
    });
    $("#addBookmark").on("submit", (evt) => {
      evt.preventDefault();
      addBookMarkToApi();
    });
  } else if (store.error != null) {
    $("#back").on("click", () => {
      store.stopAdding();
      render();
    });
  } else {
    $("#addForm").on("click", () => {
      store.addForm();
      render();
    });
    $("#filter").on("change", () => {
      store.filter = $("#filter").val();
      render();
    });
  }
}

const toggle = (id) => {
  $(`#${id}`).next("span").toggleClass("hidden");
}

const addBookMarkToApi = () => {
  let send = {
    title: $("#title").val(),
    url: $("#url").val(),
    desc: $("#desc").val(),
    rating: $("#rating").val(),
  };

  api.addBookmark(send).then(() => {
    store.stopAdding();
    api.getAllBookmarks().then((res) => {
      store.updateBookmark(res);
      render();
    });
  });
}

const render = () => {
  $("main").html("<h1>My Bookmarks</h1>");
  switch (store.status()) {
    case "Adding":
      $("main").append(templates.addBookmarkForm());
      break;
    case "Error":
      $("main").append(templates.error());
      break;
    default:
      $("main").append(templates.ShowBookmarks());
      break;
  }
  addEvents();
}

export default {
  render,
  addBookMarkToApi,
  toggle,
  removeBookmark,
};
