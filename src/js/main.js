import {
  createTextAnimations,
  setHeadingAnim,
  dropDown,
  setForms,
  subnavAnim,
  createHeaderAnimations,
} from "./animations";

import Modals from "./modals";

import "../scss/style.scss";
import Sliders from "./sliders";
import { setCustomSelect } from "./custom-select";
import InsertTippy from "./tipp";
import scrollset from "./scroll";
import { mediaQuery } from "./media";

const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};

window.addEventListener("resize", documentHeight);
documentHeight();

document.addEventListener("DOMContentLoaded", function () {
  setCustomSelect();
  InsertTippy();
  Modals();
  Sliders();
  setTimeout(() => {
    $(".hideall").remove();
  }, 100);
  if (mediaQuery.matches) {
    setTimeout(() => {
      createHeaderAnimations();
      createTextAnimations();
      setHeadingAnim();
    }, 100);
  }
  setTimeout(() => {
    $(".header").addClass("loaded");
  }, 400);
  setTimeout(() => {
    $(".header").addClass("full-loaded");
  }, 800);

  dropDown(scrollset);
  setForms();
  subnavAnim();
});
