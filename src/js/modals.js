import scrollset from "./scroll";
gsap.registerPlugin(ScrollTrigger);

function openItem(target, data) {
  this.target = "#" + target;
  this.openButton = "#" + data.openButton;
  this.closeButton = "#" + data.closeButton;
  this.time;
  this.opened = false;
  this.transition = 900;

  this.open = () => {
    if (!this.opened && !$(this.openButton).hasClass("open")) {
      clearTimeout(this.time);
      setSize();
      $(this.openButton).addClass("open show");
      $(this.closeButton).addClass("open show");
      $(this.target).addClass("open show modal--transition");
      $("body").addClass(`is${target}Opened`);
      scrollset.stop();
      this.time = setTimeout(() => {
        $(this.target).removeClass("modal--transition");
        if (this.target === "#search") {
          $(this.target).find(".search-input").trigger("focus");
        }
        this.opened = true;
      }, this.transition);
    }
  };

  this.close = () => {
    if (this.opened) {
      clearTimeout(this.time);
      $(this.openButton).removeClass("open");
      $(this.closeButton).removeClass("open");
      $(this.target).removeClass("open");
      $(this.target).addClass("modal--transition");
      this.time = setTimeout(() => {
        $("body").removeClass(`is${target}Opened`);
        $(this.openButton).removeClass("show");
        $(this.closeButton).removeClass("show");
        $(this.target).removeClass("show modal--transition");
        this.opened = false;
        scrollset.start();
      }, this.transition - 200);
    }
  };

  $(this.openButton).on("click", (e) => {
    e.preventDefault();
    if (!$(this.openButton).hasClass("show")) {
      return this.open();
    } else {
      return this.close();
    }
  });

  $(this.closeButton).on("click", (e) => {
    e.preventDefault();
    if ($(this.closeButton).hasClass("show")) {
      return this.close();
    }
  });

  $(this.target).on("click", () => {
    return this.close();
  });

  $(this.target)
    .find(".modal__close-button")
    .on("click", () => {
      return this.close();
    });

  const setSize = () => {
    const height = $(this.target).children().outerHeight() + "px";
    $(this.target).get(0).style.setProperty("--h", height);
  };

  setTimeout(function () {
    setSize();
  }, 100);

  $(window).on("resize", function () {
    setSize();
  });
}

const Modals = () => {
  const modalOpenButtons = $("[data-modal-target]");
  const modals = [];

  modalOpenButtons.each(function () {
    let newModal = {
      target: $(this).data("modal-target"),
      button: $(this).attr("id"),
      buttonClose: $(this).data("modal-close")
        ? $(this).data("modal-close")
        : $(this).attr("id"),
    };
    modals.push(newModal);
  });

  for (let i = 0; i < modals.length; i++) {
    window[`modal${i + 1}`] = new openItem(modals[i].target, {
      openButton: modals[i].button,
      closeButton: modals[i].buttonClose,
    });
  }

  $(".modal__container").on("click", function (e) {
    e.stopPropagation();
  });

  return { modal1 };
};

export default Modals;
