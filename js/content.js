document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.mySwiper', {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var appendNumber = 4;
    var prependNumber = 1;

    // Prepend 2 slides 버튼
    document.querySelector('.prepend-2-slides').addEventListener('click', function (e) {
        e.preventDefault();
        swiper.prependSlide([
            '<div class="swiper-slide"><img src="./images/5d32e51255c24b9ea6c98734faa67a64.jpg" alt="Slide ' +
                --prependNumber +
                '" /></div>',
            '<div class="swiper-slide"><img src="./images/16661486257480.png" alt="Slide ' +
                --prependNumber +
                '" /></div>',
        ]);
        swiper.slideTo(2, 0); // 추가된 슬라이드로 이동
    });

    // Prepend slide 버튼
    document.querySelector('.prepend-slide').addEventListener('click', function (e) {
        e.preventDefault();
        swiper.prependSlide(
            '<div class="swiper-slide"><img src="./images/overview_img1.jpg" alt="Slide ' +
                --prependNumber +
                '" /></div>'
        );
        swiper.slideTo(1, 0); // 추가된 슬라이드로 이동
    });

    // Append slide 버튼
    document.querySelector('.append-slide').addEventListener('click', function (e) {
        e.preventDefault();
        swiper.appendSlide(
            '<div class="swiper-slide"><img src="./images/f5ca97fa30ef4968873a0cf18b3c9047.jpg" alt="Slide ' +
                ++appendNumber +
                '" /></div>'
        );
        swiper.slideTo(swiper.slides.length - 1, 300); // 마지막 슬라이드로 이동
    });

    // Append 2 slides 버튼
    document.querySelector('.append-2-slides').addEventListener('click', function (e) {
        e.preventDefault();
        swiper.appendSlide([
            '<div class="swiper-slide"><img src="./images/tt.jpg" alt="Slide ' +
                ++appendNumber +
                '" /></div>',
            '<div class="swiper-slide"><img src="./images/2451_2c6ea70c-9d6c-401a-932a-aae0ce1be936.jpg" alt="Slide ' +
                ++appendNumber +
                '" /></div>',
        ]);
        swiper.slideTo(swiper.slides.length - 1, 300); // 마지막 슬라이드로 이동
    });
});
