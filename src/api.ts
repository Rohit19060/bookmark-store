import { BookMark } from "./types";
const bookmarkKey = "bookmarks";

const getAllBookmarks = (): BookMark[] =>
  JSON.parse(localStorage.getItem(bookmarkKey) || "[]");

const updateBookmarks = (bookmarks: BookMark[]) => {
  localStorage.setItem(bookmarkKey, JSON.stringify(bookmarks));
}

const addBookmark = (bookmark: BookMark): BookMark[] => {
  let bookmarks = getAllBookmarks();
  bookmarks.push(bookmark);
  updateBookmarks(bookmarks);
  return bookmarks;
}

const deleteBookmark = (id: string) => {
  let bookmarks = getAllBookmarks();
  bookmarks = bookmarks.filter((bookmark) => bookmark.id != id);
  updateBookmarks(bookmarks);
}

const updateBookmark = (bookmark: BookMark): BookMark[] => {
  let bookmarks = getAllBookmarks();
  bookmarks = bookmarks.map((b) => {
    if (b.id == bookmark.id) {
      return bookmark;
    }
    return b;
  });
  updateBookmarks(bookmarks);
  return bookmarks;
}

export { getAllBookmarks, addBookmark, deleteBookmark, updateBookmark };

