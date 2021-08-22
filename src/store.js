let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

function status() {
  console.log(this.adding)
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

function stopAdding() {
  this.adding = false;
}

export default {
  status,
  stopAdding,
  updateBookmark,
  bookmarks,
  addForm,
  filter,
};
