gsap.registerPlugin(ScrollTrigger);

let target = 0;
let current = 0;
const ease = 0.075;

const con4 = document.querySelector('.con4');
const sliderWrapper = document.querySelector('.con4 .slider-wrapper');
const markerWrapper = document.querySelector('.con4 .marker-wrapper');
const activeSlideEl = document.querySelector('.con4 .active-slide');
const slides = Array.from(document.querySelectorAll('.con4 .slide'));

let totalSlides = slides.length;
let maxScroll = 0;
let st; // ScrollTrigger instance

/* lerp & clamp */
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (start, end, t) => start + (end - start) * t;

const getMaxScroll = () => sliderWrapper.scrollWidth - window.innerWidth;

// ✅ con4 높이 업데이트 함수 추가
function updateCon4Height() {
    const con4Height = sliderWrapper.scrollWidth - window.innerWidth + window.innerHeight;
    con4.style.height = `${con4Height}px`;
}

function updateActiveSlideNumber(progress) {
    const idx = clamp(Math.round(progress * (totalSlides - 1)) + 1, 1, totalSlides);
    activeSlideEl.textContent = `${idx}/${totalSlides}`;
}

function updateMarker(progress) {
    const start = 70;
    const end = window.innerWidth - markerWrapper.offsetWidth - 100;
    const x = lerp(start, Math.max(start, end), progress);
    gsap.set(markerWrapper, { x });
}

function render() {
    current = lerp(current, target, ease);

    gsap.set(sliderWrapper, { x: -current });

    const progress = maxScroll > 0 ? current / maxScroll : 0;
    updateMarker(progress);
    updateActiveSlideNumber(progress);

    requestAnimationFrame(render);
}

function setupScrollTrigger() {
    if (st) st.kill();
    maxScroll = getMaxScroll();

    st = ScrollTrigger.create({
        trigger: con4,
        start: 'top top',
        end: () => `+=${maxScroll}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
            target = clamp(maxScroll * self.progress, 0, maxScroll);

            // ✅ marker-wrapper opacity 제어
            if (self.progress >= 0.95) {
                gsap.to(markerWrapper, { opacity: 0, duration: 0.5, ease: 'power2.out' });
            } else {
                gsap.to(markerWrapper, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            }
        },
    });
}

function init() {
    totalSlides = slides.length;
    activeSlideEl.textContent = `1/${totalSlides}`;
    setupScrollTrigger();
    render();
}

window.addEventListener('resize', () => {
    maxScroll = getMaxScroll();
    if (st) {
        st.vars.end = `+=${maxScroll}`;
        st.refresh();
    }
});

window.addEventListener('load', () => {
    init();
});
