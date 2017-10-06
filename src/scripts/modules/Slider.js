export default class Slider {
  constructor() {
    this.sliderContainer = document.querySelector('.slider__container');
    this.labels = document.querySelectorAll('.slider__label');
    this.slider = document.querySelector('.slider__slide');
    this.slideWidth = undefined;
    this.startingX = undefined;
    this.longTouch = undefined;
    this.moveX = undefined;
    this.index = 0;

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.recalcAndMove = this.recalcAndMove.bind(this);
    this.labelsOnClick = this.labelsOnClick.bind(this);

    this.events();
    this.checkForOrientation();
  }

  events() {
    this.sliderContainer.addEventListener('touchstart', this.onTouchStart);
    this.sliderContainer.addEventListener('touchmove', this.onTouchMove);
    this.sliderContainer.addEventListener('touchend', this.onTouchEnd);
    this.labels.forEach((label) => {
      label.addEventListener('click', this.labelsOnClick);
    });
  }

  checkForOrientation() {
    const mql = window.matchMedia('(orientation: portrait)');
    mql.addListener(this.recalcAndMove);
  }

  recalcAndMove(m) {
    const slider = this.slider;
    const sliderContainer = this.sliderContainer;
    const index = this.index;

    if (m.matches || !m.matches) {
      setTimeout(() => {
        sliderContainer.classList.remove('animate');
        const newWidth = parseInt(
          document.defaultView
          .getComputedStyle(slider, null)
          .getPropertyValue('width')
        );

        sliderContainer
        .style
        .transform = 'translateX(-' + index * newWidth + 'px)';
      }, 10);
    }
  }


  labelsOnClick(e) {
    if (e.target.classList.contains('slider__label--active')) return;

    this.labels.forEach((label) => {
      label.classList.remove('slider__label--active');
    });

    e.target.classList.add('slider__label--active');

    this.slideWidth = parseInt(
      document.defaultView
      .getComputedStyle(this.slider, null)
      .getPropertyValue('width')
    );

    this.sliderContainer.classList.add('animate');

    switch(e.target.id) {
      case 'label-0':
        this.index = 0;
        this.sliderContainer
          .style
          .transform = `translateX(-${this.index * this.slideWidth}px)`;
        break;
      case 'label-1':
        this.index = 1;
        this.sliderContainer
          .style
          .transform = `translateX(-${this.index * this.slideWidth}px)`;
        break;
      case 'label-2':
        this.index = 2;
        this.sliderContainer
          .style
          .transform = `translateX(-${this.index * this.slideWidth}px)`;
        break;
    }
  }

  onTouchStart(e) {
    this.sliderContainer.classList.remove('animate');

    this.longTouch = false;
    setTimeout(() => {
      this.longTouch = true;
      console.log(this.longTouch);
    }, 250);

    this.startingX = e.touches[0].clientX;
  }

  onTouchMove(e) {
    this.slideWidth = parseInt(
      document.defaultView
      .getComputedStyle(this.slider, null)
      .getPropertyValue('width')
    );

    const touchMoveX = e.touches[0].clientX;
    this.moveX = this.index * this.slideWidth + (this.startingX - touchMoveX);

    if (this.moveX < this.slideWidth * 2) {
      this.sliderContainer
      .style
      .transform = `translateX(-${this.moveX}px)`;
    }
  }

  onTouchEnd(e) {
    const absMove = Math.abs(this.index * this.slideWidth - this.moveX);

    if (absMove > this.slideWidth / 3 || this.longTouch === false) {
      if (this.moveX > this.index * this.slideWidth && this.index < 2) {
        this.index++;
      } else if (this.moveX < this.index * this.slideWidth && this.index > 0) {
        this.index--;
      }
    }

    this.labels.forEach((label) => {
      label.classList.remove('slider__label--active');
    });

    this.labels[this.index].classList.add('slider__label--active');

    this.sliderContainer.classList.add('animate');
    this.sliderContainer
      .style
      .transform = `translateX(-${this.index * this.slideWidth}px)`;
  }
}