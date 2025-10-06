gsap.registerPlugin(ScrollTrigger);

let target4 = 0;
let current4 = 0;
const ease4 = 0.075;

const con4 = document.querySelector('.con4');
const sliderWrapper4 = document.querySelector('.con4 .slider-wrapper');
const markerWrapper4 = document.querySelector('.con4 .marker-wrapper');
const activeSlideEl4 = document.querySelector('.con4 .active-slide');
const slides4 = Array.from(document.querySelectorAll('.con4 .slide'));

let totalSlides4 = slides4.length;
let maxScroll4 = 0;
let st4;

const clamp4 = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp4 = (start, end, t) => start + (end - start) * t;

const getMaxScroll4 = () => sliderWrapper4.scrollWidth - window.innerWidth;

function updateActiveSlideNumber4(progress) {
    const idx = clamp4(Math.round(progress * (totalSlides4 - 1)) + 1, 1, totalSlides4);
    activeSlideEl4.textContent = `${idx}/${totalSlides4}`;
}

function updateMarker4(progress) {
    const start = 70;
    const end = window.innerWidth - markerWrapper4.offsetWidth - 100;
    const x = lerp4(start, Math.max(start, end), progress);
    gsap.set(markerWrapper4, { x });
}

function render4() {
    current4 = lerp4(current4, target4, ease4);

    gsap.set(sliderWrapper4, { x: -current4 });

    const progress = maxScroll4 > 0 ? current4 / maxScroll4 : 0;
    updateMarker4(progress);
    updateActiveSlideNumber4(progress);

    requestAnimationFrame(render4);
}

function setupScrollTrigger4() {
    if (st4) st4.kill();
    maxScroll4 = getMaxScroll4();

    st4 = ScrollTrigger.create({
        trigger: con4,
        start: 'top top',
        end: () => `+=${maxScroll4}`,
        pin: con4,
        pinSpacing:true,
        scrub: true,
        anticipatePin: 1,
        markers: false,
        onUpdate: (self) => {
            target4 = clamp4(maxScroll4 * self.progress, 0, maxScroll4);

            if (self.progress >= 0.95) {
                gsap.to(markerWrapper4, { opacity: 0, duration: 0.5, ease: 'power2.out' });
            } else {
                gsap.to(markerWrapper4, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            }
        },
    });
}

function init4() {
    totalSlides4 = slides4.length;
    activeSlideEl4.textContent = `1/${totalSlides4}`;
    setupScrollTrigger4();
    render4();
}

window.addEventListener('resize', () => {
    maxScroll4 = getMaxScroll4();
    if (st4) {
        st4.vars.end = `+=${maxScroll4}`;
        st4.refresh();
    }
});

init4();