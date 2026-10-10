
document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // 1. MOBILE NAVIGATION
    // ========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        // Mobile menu close after clicking a link
        nav.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", event => {
            if (
                !nav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                nav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        // Close menu with Escape key
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                nav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    // ========================================
    // 2. SMOOTH SCROLLING
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            let target;

            try {
                target = document.querySelector(targetId);
            } catch (error) {
                return;
            }

            if (!target) {
                return;
            }

            event.preventDefault();

            // Find the best heading/content element
            const heading =
                target.querySelector(".section-heading") ||
                target.querySelector(".projects-head") ||
                target.querySelector(".contact-inner") ||
                target;

            // Keep the heading in a consistent screen position
            const topOffset = Math.min(
                120,
                Math.max(60, window.innerHeight * 0.15)
            );

            const targetPosition =
                heading.getBoundingClientRect().top +
                window.scrollY -
                topOffset;

            const maxScroll =
                document.documentElement.scrollHeight -
                window.innerHeight;

            window.scrollTo({
                top: Math.max(
                    0,
                    Math.min(targetPosition, maxScroll)
                ),
                behavior: "smooth"
            });

            // Update URL without jumping to the anchor
            history.replaceState(null, "", targetId);

        });

    });


    // ========================================
    // 3. REVEAL ANIMATIONS
    // ========================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // ========================================
    // 4. ACTIVE NAVIGATION LINK
    // ========================================

    const sections = document.querySelectorAll("main section[id]");

    const navLinks = document.querySelectorAll(
        '.nav a[href^="#"]'
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {

                            const isActive =
                                link.getAttribute("href") ===
                                "#" + entry.target.id;

                            link.classList.toggle(
                                "active",
                                isActive
                            );

                        });

                    }

                });

            },
            {
                rootMargin: "-20% 0px -65% 0px",
                threshold: 0
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    // ========================================
    // 5. CURSOR GLOW EFFECT
    // ========================================

    const cursorGlow = document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        document.addEventListener("mousemove", event => {

            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";

        });

    }


    // ========================================
    // 6. CURRENT YEAR IN FOOTER
    // ========================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});
