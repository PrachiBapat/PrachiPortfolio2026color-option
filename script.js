document.addEventListener('DOMContentLoaded', function() {

    console.log('Portfolio page loaded');

    document.documentElement.style.scrollBehavior = 'smooth';


    /* =====================================================
       MOUSE FOLLOWING GLOW
       ===================================================== */

    const mouseGlow =
        document.getElementById('mouseGlow');

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', function(event) {

        mouseX = event.clientX;
        mouseY = event.clientY;

    });

    function animateGlow() {

        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        mouseGlow.style.left =
            glowX + 'px';

        mouseGlow.style.top =
            glowY + 'px';

        requestAnimationFrame(animateGlow);

    }

    animateGlow();


    /* =====================================================
       SCROLL PROGRESS
       ===================================================== */

    const progress =
        document.getElementById('scrollProgress');

    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

        progress.style.width =
            percentage + '%';

    }

    window.addEventListener(
        'scroll',
        updateProgress,
        { passive: true }
    );

    updateProgress();


    /* =====================================================
       NAVBAR SCROLL ANIMATION
       ===================================================== */

    const navbar =
        document.querySelector('.navbar');

    window.addEventListener(
        'scroll',
        function() {

            if (window.scrollY > 40) {

                navbar.classList.add('scrolled');

            } else {

                navbar.classList.remove('scrolled');

            }

        },
        { passive: true }
    );


    /* =====================================================
       PROJECT SCROLL REVEAL
       ===================================================== */

    const projects =
        document.querySelectorAll('.project');

    const projectObserver =
        new IntersectionObserver(
            function(entries) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add('visible');

                    }

                });

            },
            {
                threshold: 0.08
            }
        );

    projects.forEach(function(project) {

        projectObserver.observe(project);

    });


        /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const navLinks =
        document.querySelectorAll('.nav-item a');

    const sections =
        document.querySelectorAll('.project[id]');

    const sectionObserver =
        new IntersectionObserver(
            function(entries) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {

                        navLinks.forEach(function(link) {

                            link.classList.remove('active');

                        });

                        const activeLink =
                            document.querySelector(
                                '.nav-item a[href="#' +
                                entry.target.id +
                                '"]'
                            );

                        if (activeLink) {

                            activeLink.classList.add('active');

                        }

                    }

                });

            },
            {
                threshold: 0.2,
                rootMargin:
                    '-20% 0px -60% 0px'
            }
        );

    sections.forEach(function(section) {

        sectionObserver.observe(section);

    });


    /* REMOVE ACTIVE HIGHLIGHT WHEN SECTION IS NO LONGER VISIBLE */

    window.addEventListener(
        'scroll',
        function() {

            let visibleSection = false;

            sections.forEach(function(section) {

                const rect =
                    section.getBoundingClientRect();

                if (
                    rect.top < window.innerHeight * 0.8 &&
                    rect.bottom > window.innerHeight * 0.2
                ) {

                    visibleSection = true;

                }

            });

            if (!visibleSection) {

                navLinks.forEach(function(link) {

                    link.classList.remove('active');

                });

            }

        },
        { passive: true }
    );


    /* =====================================================
       PROJECT 3D MOUSE EFFECT
       ===================================================== */

    document
        .querySelectorAll('.project')
        .forEach(function(card) {

            card.addEventListener(
                'mousemove',
                function(event) {

                    if (window.innerWidth < 768) {
                        return;
                    }

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                        centerY) * -1.3;

                    const rotateY =
                        ((x - centerX) /
                        centerX) * 1.3;

                    card.style.transform =
                        `translateY(-10px)
                         scale(1.01)
                         perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );

            card.addEventListener(
                'mouseleave',
                function() {

                    card.style.transform =
                        '';

                }
            );

        });


    /* =====================================================
       PROJECT IMAGE PARALLAX
       ===================================================== */

    document
        .querySelectorAll('.project-images img')
        .forEach(function(image) {

            image.addEventListener(
                'mousemove',
                function(event) {

                    if (window.innerWidth < 768) {
                        return;
                    }

                    const rect =
                        image.getBoundingClientRect();

                    const x =
                        (event.clientX -
                        rect.left) /
                        rect.width;

                    const y =
                        (event.clientY -
                        rect.top) /
                        rect.height;

                    const moveX =
                        (x - 0.5) * 8;

                    const moveY =
                        (y - 0.5) * 8;

                    image.style.transform =
                        `scale(1.025)
                         translate(${moveX}px, ${moveY}px)`;

                }
            );

            image.addEventListener(
                'mouseleave',
                function() {

                    image.style.transform =
                        '';

                }
            );

        });


    /* =====================================================
       VIDEO / IMAGE LINKS
       ===================================================== */

    document
        .querySelectorAll('.project-images')
        .forEach(function(project) {

            project.addEventListener(
                'click',
                function(event) {

                    if (
                        event.target.tagName === 'A' ||
                        event.target.tagName === 'IFRAME'
                    ) {

                        return;

                    }

                    if (project.dataset.link) {

                        window.open(
                            project.dataset.link,
                            '_blank',
                            'noopener'
                        );

                    }

                }
            );

        });


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.getElementById('backToTop');

    window.addEventListener(
        'scroll',
        function() {

            if (window.scrollY > 500) {

                backToTop.classList.add('show');

            } else {

                backToTop.classList.remove('show');

            }

        },
        { passive: true }
    );

    backToTop.addEventListener(
        'click',
        function() {

            window.scrollTo({

                top: 0,

                behavior: 'smooth'

            });

        }
    );


    /* =====================================================
       RANDOM FLOATING PARTICLES
       ===================================================== */

    const particleCount = 22;

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement('span');

        particle.style.position =
            'fixed';

        particle.style.left =
            Math.random() * 100 + '%';

        particle.style.top =
            Math.random() * 100 + '%';

        const size =
            Math.random() * 7 + 3;

        particle.style.width =
            size + 'px';

        particle.style.height =
            size + 'px';

        particle.style.borderRadius =
            '50%';

        particle.style.background =
            [
                '#22c55e',
                '#84cc16',
                '#facc15',
                '#fb7185'
            ][
                Math.floor(
                    Math.random() * 4
                )
            ];

        particle.style.opacity =
            '0.20';

        particle.style.pointerEvents =
            'none';

        particle.style.zIndex =
            '-2';

        particle.style.animation =
            `particleFloat ${
                5 + Math.random() * 8
            }s ease-in-out infinite`;

        particle.style.animationDelay =
            `${Math.random() * 5}s`;

        document.body.appendChild(
            particle
        );

    }


    /* =====================================================
       DYNAMIC PARTICLE ANIMATION
       ===================================================== */

    const particleStyle =
        document.createElement('style');

    particleStyle.innerHTML = `

        @keyframes particleFloat {

            0%, 100% {

                transform:
                    translate(0, 0)
                    scale(1);

            }

            25% {

                transform:
                    translate(20px, -35px)
                    scale(1.25);

            }

            50% {

                transform:
                    translate(-25px, -60px)
                    scale(0.8);

            }

            75% {

                transform:
                    translate(30px, -25px)
                    scale(1.15);

            }

        }

    `;

    document.head.appendChild(
        particleStyle
    );


    /* =====================================================
       STAGGER PROJECT ANIMATION
       ===================================================== */

    projects.forEach(
        function(project, index) {

            project.style.transitionDelay =
                `${Math.min(index * 0.04, 0.35)}s`;

        }
    );


    /* =====================================================
       CURSOR POSITION FOR EXTRA INTERACTION
       ===================================================== */

    document
        .querySelectorAll('.project')
        .forEach(function(card) {

            card.addEventListener(
                'mouseenter',
                function() {

                    mouseGlow.style.transform =
                        'translate(-50%, -50%) scale(1.35)';

                }
            );

            card.addEventListener(
                'mouseleave',
                function() {

                    mouseGlow.style.transform =
                        'translate(-50%, -50%) scale(1)';

                }
            );

        });


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        'Prachi Portfolio — animation system loaded'
    );


       // Logo-bulb
        function changeImage() {
          var image = document.getElementById('myImage');
          if (image.src.match("bulb-off.png")) {
            image.src = "bulb-on.png";
          } else {
            image.src = "bulb-off.png";
          }
        }


});

 