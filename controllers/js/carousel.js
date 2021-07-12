((d) => {
  // VARIABLES
  const $carousel = d.querySelector(".carousel"),
    $btnRight = d.querySelector(".btn-right"),
    $btnLeft = d.querySelector(".btn-left"),
    $dots = d.querySelector(".dots"),
    PROPERTYS = {
      center: "translateX(-50%)",
      right: "translateX(100%)",
      left: "translateX(-200%)",
      active: "active",
    };

  // CLASE
  class Carousel {
    constructor(carousel, dots, propertys, btn) {
      this.carousel = carousel;
      this.slides = [...carousel.children];
      this.dots = [...dots.children];
      this.prop = propertys;
      this.btn = btn;
      if (this.btn.className === "btn-right") this.slideNext();
      if (this.btn.className === "btn-left") this.slidePrev();
    }

    // DIAPOSITIVA ACTUAL
    dotCurrent(slide) {
      if (this.slides[slide].className === "slide1") {
        this.dots[0].id = this.prop.active;
        this.dots[1].id = "";
        this.dots[2].id = "";
      }
      if (this.slides[slide].className === "slide2") {
        this.dots[0].id = "";
        this.dots[1].id = this.prop.active;
        this.dots[2].id = "";
      }
      if (this.slides[slide].className === "slide3") {
        this.dots[0].id = "";
        this.dots[1].id = "";
        this.dots[2].id = this.prop.active;
      }
    }

    // DIAPOSITIVA SIGUIENTE
    slideNext() {
      this.dotCurrent(1);

      this.btn.style.pointerEvents = "none";

      this.slides[0].style.transform = this.prop.left;
      this.slides[1].style.transform = this.prop.center;

      setTimeout(() => {
        this.carousel.appendChild(this.slides[0]);
        this.slides[0].style = defaultStatus;
        this.slides[1].style = defaultStatus;
      }, 800);

      this.btnDefault();
    }

    // DIAPOSITIVA ANTERIOR
    slidePrev() {
      this.dotCurrent(2);
      this.btn.style.pointerEvents = "none";

      this.slides[2].style.transform = this.prop.left;

      this.carousel.insertBefore(
        this.carousel.lastElementChild,
        this.carousel.firstElementChild
      );

      setTimeout(() => {
        this.slides[0].style.transform = this.prop.right;
        this.slides[2].style.transform = this.prop.center;
      }, 100);

      this.btnDefault();
    }

    // REACTIVAR LAS FLECHAS RIGHT Y LEFT
    btnDefault = () => setTimeout(() => (this.btn.style = defaultStatus), 1000);
  }

  // EVENTOS
  $btnRight.onclick = () =>
    new Carousel($carousel, $dots, PROPERTYS, $btnRight);
  $btnLeft.onclick = () => new Carousel($carousel, $dots, PROPERTYS, $btnLeft);
})(document);
