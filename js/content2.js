gsap.utils.toArray('.content2 section').forEach((section) => {
    gsap.fromTo(
        section.querySelectorAll('h1'),
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse',
            },
            duration: 1.5,
            ease: 'power2.out',
        }
    );

    gsap.fromTo(
        section.querySelectorAll('img'),
        { opacity: 0, scale: 0.9 },
        {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse',
            },
            duration: 1.5,
            ease: 'power2.out',
        }
    );
});
