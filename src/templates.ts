import { deleteBookmark, getAllBookmarks } from "./api";
import "./assets/css/styles.css";
import star from "./assets/icons/star.svg";
import { addBookMarkToApi, render, toggle } from "./functions";
import { filter, updateFilter, updateUI } from "./main";
import { BookMark } from "./types";

const addBookmarkForm = () => {
  let form = document.createElement("form");
  form.id = "addBookmark";
  let h2 = document.createElement("h2");
  h2.innerText = "Add Bookmark";
  form.appendChild(h2);
  let titleDiv = document.createElement("div");
  titleDiv.classList.add("inputDiv");
  let titleLabel = document.createElement("label");
  titleLabel.htmlFor = "title";
  titleLabel.innerText = "Title: ";
  let titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.required = true;
  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);
  form.appendChild(titleDiv);
  let urlDiv = document.createElement("div");
  urlDiv.classList.add("inputDiv");
  let urlLabel = document.createElement("label");
  urlLabel.htmlFor = "url";
  urlLabel.innerText = "Url: ";
  let urlInput = document.createElement("input");
  urlInput.type = "url";
  urlInput.id = "url";
  urlInput.required = true;
  urlDiv.appendChild(urlLabel);
  urlDiv.appendChild(urlInput);
  form.appendChild(urlDiv);
  let descDiv = document.createElement("div");
  descDiv.classList.add("inputDiv");
  let descLabel = document.createElement("label");
  descLabel.htmlFor = "desc";
  descLabel.innerText = "Description: ";
  let descInput = document.createElement("input");
  descInput.type = "text";
  descInput.id = "desc";
  descInput.required = true;
  descDiv.appendChild(descLabel);
  descDiv.appendChild(descInput);
  form.appendChild(descDiv);
  let br = document.createElement("br");
  form.appendChild(br);
  let ratingLabel = document.createElement("label");
  ratingLabel.innerText = "Rating: ";
  form.appendChild(ratingLabel);
  let ratingSelect = document.createElement("select");
  ratingSelect.name = "rating";
  ratingSelect.id = "rating";
  for (let i = 1; i <= 5; i++) {
    let rating = document.createElement("option");
    rating.value = i.toString();
    rating.innerText = i.toString();
    ratingSelect.appendChild(rating);
  }

  form.appendChild(ratingSelect);
  let br2 = document.createElement("br");
  form.appendChild(br2);
  let submit = document.createElement("button");
  submit.type = "submit";
  submit.value = "Submit";
  submit.innerText = "Submit";
  form.appendChild(submit);
  let cancel = document.createElement("button");
  cancel.type = "button";
  cancel.id = "cancel";
  cancel.innerText = "Cancel";
  form.appendChild(cancel);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookMarkToApi();
  });
  cancel.addEventListener("click", (_) => {
    updateUI(true);
  });

  document.querySelector("main")!.appendChild(form);
};


const bookmark = (bookmark: BookMark) => {
  let div = document.createElement("section");
  div.classList.add("bookmark");
  let mainView = document.createElement("div");
  mainView.id = bookmark.id.toString();
  mainView.classList.add("mainView");
  let title = document.createElement("span");
  title.classList.add("h2");
  title.innerText = bookmark.title;
  let rating = document.createElement("span");
  for (let i = 0; i < bookmark.rating; i++) {
    let starImg = document.createElement("img");
    starImg.src = star;
    starImg.width = 15;
    starImg.alt = "star";
    rating.appendChild(starImg);
  }
  mainView.appendChild(title);
  mainView.appendChild(rating);
  div.appendChild(mainView);
  let hidden = document.createElement("span");
  hidden.classList.add("hidden");
  let desc = document.createElement("div");
  desc.classList.add("h2");
  desc.classList.add("mb-3");
  desc.innerText = bookmark.desc;
  let hiddenView = document.createElement("div");
  hiddenView.classList.add("hiddenView");
  let link = document.createElement("a");
  link.href = bookmark.url;
  link.target = "_blank";
  let linkButton = document.createElement("button");
  linkButton.innerText = "Visit Link";
  link.appendChild(linkButton);
  let removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.addEventListener("click", () => {
    deleteBookmark(bookmark.id);
    render();
  });
  hiddenView.appendChild(link);
  hiddenView.appendChild(removeButton);
  hidden.appendChild(desc);
  hidden.appendChild(hiddenView);
  div.appendChild(hidden);
  mainView.addEventListener("click", () => {
    toggle(bookmark.id);
  });
  document.querySelector("main")!.appendChild(div);
};

const showBookmarks = () => {
  let data = document.createElement("button");
  data.id = "addForm";
  data.innerText = "+ New";
  data.type = "button";
  data.addEventListener("click", () => {
    updateUI(false);
  });
  let text = document.createElement("span");
  text.classList.add("text");
  text.innerText = "Rating Above:";
  let filterSelect = document.createElement("select");
  filterSelect.id = "filter";
  filterSelect.title = "Filter";
  filterSelect.addEventListener("change", () => {
    updateFilter(parseInt(filterSelect.value));
    render();
  });
  for (let i = 1; i <= 5; i++) {
    let option = document.createElement("option");
    option.value = i.toString();
    if (i == filter) {
      option.selected = true;
    }
    option.innerText = i.toString();
    filterSelect.appendChild(option);
  }
  document.querySelector("main")!.appendChild(data);
  document.querySelector("main")!.appendChild(text);
  document.querySelector("main")!.appendChild(filterSelect);

  let bookmarks = getAllBookmarks();
  let filteredBookmarks = bookmarks.filter((element) => {
    return element.rating >= filter;
  });
  if (filteredBookmarks.length == 0) {
    let noBookmarks = document.createElement("div");
    noBookmarks.classList.add("h2");
    if (bookmarks.length == 0) {
      noBookmarks.innerText = "No Bookmarks Added";
    } else {
      noBookmarks.innerText = "No Bookmarks above this Rating";
    }
    document.querySelector("main")!.appendChild(noBookmarks);
  } else {
    filteredBookmarks.forEach((element) => {
      bookmark(element);
    });
  }

};

export {
  showBookmarks,
  addBookmarkForm,
};

