import { addBookmark } from "./api";
import { isShowBookmark, updateUI } from "./main";
import { addBookmarkForm, showBookmarks } from "./templates";
import { BookMark } from "./types";

const toggle = (id: string) => {
  let span = document.querySelector(`#${id}`)?.nextElementSibling as HTMLElement;
  span.classList.toggle("hidden");
}

const addBookMarkToApi = () => {

  let send = {
    id: Math.random().toString(36).substring(2, 9).replace(/\d/g, "") + Date.now().toString(),
    title: (document.querySelector("#title") as HTMLInputElement).value,
    url: (document.querySelector("#url") as HTMLInputElement).value,
    desc: (document.querySelector("#desc") as HTMLInputElement).value,
    rating: parseInt((document.querySelector("#rating") as HTMLInputElement).value),
  } as BookMark;
  addBookmark(send);
  updateUI(true);
  render();
}

const render = () => {
  document.querySelector("main")!.innerHTML = "<h1>My Bookmarks</h1>";
  if (isShowBookmark) {
    showBookmarks();
  } else {
    addBookmarkForm();
  }
}

export {
  render,
  addBookMarkToApi,
  toggle,
};

