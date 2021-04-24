let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

function status() {
  if (this.adding) {
    return "Adding";
  } else if (this.error != null) {
    return "Error";
  } else {
    return "Bookmark";
  }
}

function updateBookmark(bookmarks) {
  this.bookmarks = [];
  bookmarks.forEach((element) => {
    this.bookmarks.push(element);
  });
}

function addForm() {
  this.adding = true;
}

function stopPadding() {
  this.adding = false;
}

export default {
  status,
  stopPadding,
  updateBookmark,
  bookmarks,
  addForm,
  filter,
};
