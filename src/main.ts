import { render } from "./functions";

let filter = 0;
let isShowBookmark = true;

render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(_ => {
    }, err => {
      console.log(err);
    });
  });
}

const updateFilter = (newFilter: number) => {
  filter = newFilter;
  render();
}

const updateUI = (showBookMarks: boolean) => {
  isShowBookmark = showBookMarks;
  render();
}

export {
  filter,
  updateUI,
  updateFilter,
  isShowBookmark,
};
