gsap.registerPlugin(ScrollTrigger);

let windowWidth = window.outerWidth;

const SplitTexts = (el, className = "split-lines") => {
  let myText = el;
  let mySplitText;
  function createSplits() {
    mySplitText = new SplitText(myText, {
      type: "lines",
      linesClass: className,
    });
  }
  createSplits();
  $(window).on("resize", function () {
    if (window.outerWidth !== windowWidth) {
      mySplitText.revert();
    }
    windowWidth = window.outerWidth;
  });
};

// HEADER ANIMS

export function createHeaderAnimations() {
  SplitTexts($(".site-menu .container > div:last-child > p"));
}

// SMALL TEXT ANIMATION
export function createTextAnimations() {
  $(".text-anim p").each(function () {
    if ($(this).parents(".news-modal").length === 0) {
      SplitTexts($(this));
    }
  });

  $(".text-anim").each(function () {
    let triggerElement = $(this);
    let targetElement = $(this).find(".split-lines");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top bottom",
        end: "bottom top",
        // toggleActions: "restart none none none"
      },
    });
    tl.from(targetElement, {
      duration: 0.5,
      y: "150%",
      rotationX: -90,
      opacity: 0,
      ease: "power1.inOut",
      stagger: {
        amount: 0.4,
        from: "0",
      },
      onComplete: () => $(targetElement).css("display", "inline"),
    });
  });
}

//--------------------------------

// BIG TEXT ANIMATION

export function setHeadingAnim() {
  $(".heading").each(function () {
    SplitTexts($(this));
    $(this)
      .find(".split-lines")
      .wrap('<div class="heading__word-container" />');
    $(this)
      .find(".heading__word-container")
      .find(".split-lines")
      .wrap('<div class="wrap_header_hidden_left" />');
  });

  const headingTriggers = gsap.utils.toArray(".heading");

  headingTriggers.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",

      onEnter: () => {
        const elems = $(el).find(".heading__word-container");

        elems.each(function (i) {
          setTimeout(() => {
            $(this).addClass("heading__word-container--visible");
          }, i * 100);
        });
      },
    });
  });
}

// ------------------------------------

// DROPDOWN

export function dropDown(scrollEl) {
  if ($(".drop-down").length > 0) {
    const drops = $(".drop-down");

    const setSizeDrop = (el) => {
      let height = el.find(".drop-down__body > div").get(0).scrollHeight + "px";
      el.addClass("active");
      el.get(0).style.setProperty("--bodyheight", height);
      setTimeout(function () {
        el.get(0).style.setProperty("--bodyheight", "auto");
        scrollEl.update();
      }, 400);
    };

    const closeDrop = (el) => {
      drops.each(function () {
        if ($(this).not(el)) {
          $(this)
            .get(0)
            .style.setProperty(
              "--bodyheight",
              $(this).find(".drop-down__body > div").get(0).scrollHeight + "px"
            );
          setTimeout(() => {
            $(this).removeClass("active");
          }, 10);
          setTimeout(() => {
            scrollEl.update();
          }, 410);
        }
      });
    };

    drops.each(function () {
      $(this).on("click", function () {
        closeDrop($(".drop-down.active").not($(this)));
        if (!$(this).hasClass("active")) {
          setTimeout(() => {
            setSizeDrop($(this));
          }, 10);
        } else {
          closeDrop();
        }
      });
    });
  }
}

// -------------------------------

// FORMS

export function setForms() {
  if ($(".input").length > 0) {
    function inputOnClick(el) {
      el.addClass("active");
    }

    function setInputs(el) {
      if (el.find(".input__item").val().trim().length < 1) {
        el.removeClass("active");
      } else {
        inputOnClick(el);
      }
    }

    let inp = $(".input");

    inp.each(function () {
      const $this = $(this);
      setInputs($this);

      $this.find(".input__item").on("focus", function () {
        inputOnClick($this);
      });

      $this.find(".input__item").on("blur", function () {
        setInputs($this);
      });
    });
  }

  if ($("textarea").length > 0) {
    const textareas = $("textarea");

    textareas.each(function () {
      $(this).on("input", function () {
        if ($(this).val().trim().length < 1) {
          $(this).css(
            "height",
            "calc(calc(var(--scale-rem) * 0.95) + var(--plusheight))"
          );
        } else {
          $(this).css("height", $(this).get(0).scrollHeight + "px");
        }
      });
    });
  }

  if ($(".search-input").length > 0) {
    const search = $(".search-input");
    const searchInput = search.find("input");

    searchInput.on("focus", function () {
      search.addClass("active");
    });

    searchInput.on("blur", function () {
      if ($(this).val().trim().length < 1) {
        search.removeClass("active");
      }
    });

    searchInput.on("input", function () {
      if ($(this).val().trim().length < 1) {
        search.find(".search-input__reset").addClass("display-none");
      } else {
        search.find(".search-input__reset").removeClass("display-none");
      }
    });
  }
}

// ----------------------------

// SUBNAV

export function subnavAnim() {
  $(".subnav").on("mouseenter", () => {
    if ($(".header").hasClass("scroll")) {
      $(".header").removeClass("hide-subnav");
    }
  });
  $(".header").on("mouseleave", () => {
    if ($(".header").hasClass("scroll")) {
      $(".header").addClass("hide-subnav");
    }
  });
}

// ----------------------------

// SITE MENU

export function siteMapAnim() {
  $(".site-menu ul li").on("mouseenter", () => {
    if ($(".header").hasClass("scroll")) {
      $(".header").removeClass("hide-subnav");
    }
  });
  $(".header").on("mouseleave", () => {
    if ($(".header").hasClass("scroll")) {
      $(".header").addClass("hide-subnav");
    }
  });
}

// ----------------------------
