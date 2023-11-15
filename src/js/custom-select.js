export function setCustomSelect(){
    var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected input__item  sm-text--9 text--25");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide  block-scroll text--13");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.parentNode.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.parentNode.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
    
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    $(this).closest('.input--select').addClass('active')
    $(this).closest('.custom-select').siblings('.input__title').removeClass('sm-text--9')
    $(this).closest('.custom-select').siblings('.input__title').addClass('sm-text--14')
  });
}

$('.select-items > div').wrapAll('<div class="select-items__container" />')
$('.select-items__container').wrap('<div class="select-items__wrapper" />')

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
      if($(y).text().trim().length < 1){
        $(x).closest('.input--select').removeClass('active')
        $(x).closest('.custom-select').siblings('.input__title').addClass('sm-text--9')
        $(x).closest('.custom-select').siblings('.input__title').removeClass('sm-text--14')
      }
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

$('.select-items__container div').on('mouseenter', function() {
  console.log('ss')
  $(this).closest('.select-items__wrapper').addClass('show-back')
  $(this).closest('.select-items__wrapper').get(0).style.setProperty('--h', $(this).outerHeight()+ 'px')
  $(this).closest('.select-items__wrapper').get(0).style.setProperty('--top', ($(this).offset().top - $(this).closest('.select-items__wrapper').offset().top)+ 'px')
})
$('.select-items__container div').on('mouseleave', function() {
  console.log('ss')
  $(this).closest('.select-items__wrapper').removeClass('show-back')
})

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
  $('.modal__container').on("click", closeAllSelect);
  $('.custom-select').on("click", function (e) {
    e.stopPropagation()
  });
}

