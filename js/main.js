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
let st;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (start, end, t) => start + (end - start) * t;

const getMaxScroll = () => sliderWrapper.scrollWidth - window.innerWidth;

function updateCon4Height() {
    const con4Height = sliderWrapper.scrollWidth - window.innerHeight + window.innerHeight;
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

    // content4 높이 업데이트
    updateCon4Height();

    st = ScrollTrigger.create({
        trigger: con4,
        start: 'top top',
        end: () => `+=${con4.offsetHeight - window.innerHeight}`,
        pin: '.con4 .slider', // 슬라이더만 pin
        pinSpacing: false,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            target = clamp(maxScroll * self.progress, 0, maxScroll);

            if (self.progress >= 0.95) {
                gsap.to(markerWrapper, { opacity: 0, duration: 0.5, ease: 'power2.out' });
            } else {
                gsap.to(markerWrapper, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            }
        },
        onEnter: () => {
            // 진입 시 초기화
            target = 0;
            current = 0;
            gsap.set(sliderWrapper, { x: 0 });
        },
        markers: true // 디버깅용 - 완료 후 제거
    });
}

function init() {
    if (!con4 || !sliderWrapper || slides.length === 0) {
        console.error('Required elements not found');
        return;
    }

    totalSlides = slides.length;
    activeSlideEl.textContent = `1/${totalSlides}`;
    
    // 초기 위치 설정
    gsap.set(sliderWrapper, { x: 0 });
    gsap.set(markerWrapper, { opacity: 1 });
    
    setupScrollTrigger();
    render();
}

window.addEventListener('resize', () => {
    maxScroll = getMaxScroll();
    updateCon4Height();
    if (st) {
        st.vars.end = `+=${con4.offsetHeight - window.innerHeight}`;
        st.refresh();
    }
});

// DOMContentLoaded 대신 load 사용
window.addEventListener('load', () => {
    // 약간의 딜레이를 주어 모든 요소가 렌더링되도록 함
    setTimeout(() => {
        init();
    }, 100);
});