import Swiper, {Scrollbar} from 'swiper';
import 'swiper/css';




const Sliders = () => {
    const roleSlider = new Swiper('.slider--roller', {
        modules: [Scrollbar],
        slidesPerView: 'auto',
        spaceBetween: 28,
        scrollbar: {
          el: '.slider--roller .swiper-scrollbar',
          draggable: true,
        },
        
    });

    const carousel = new Swiper('.slider--carousel', {
        modules: [Scrollbar],
        slidesPerView: 'auto',
        spaceBetween: 16,
        scrollbar: {
            el: '.slider--carousel .swiper-scrollbar',
            draggable: true,
        },

        breakpoints: {
            576: {
                spaceBetween: 36
            },
          }
    });


}

export default Sliders