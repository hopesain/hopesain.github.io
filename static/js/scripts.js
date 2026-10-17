// Mobile navigation toggle
(function () {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("primary-navigation");
    if (!toggle || !nav) return;

    const desktopQuery = window.matchMedia("(min-width: 900px)");

    function setOpen(open) {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
        nav.classList.toggle("is-open", open);
        document.body.classList.toggle("nav-open", open);
    }

    toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link
    nav.addEventListener("click", function (event) {
        if (event.target.closest("a")) setOpen(false);
    });

    // Close on Escape and return focus to the toggle
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
            setOpen(false);
            toggle.focus();
        }
    });

    // Reset when resizing up to the desktop layout
    desktopQuery.addEventListener("change", function (event) {
        if (event.matches) setOpen(false);
    });
})();

// My local time in Malawi (footer and contact page)
(function () {
    const items = document.querySelectorAll(".local-time");
    if (!items.length) return;

    const format = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Africa/Blantyre",
    });

    function tick() {
        const text = " · " + format.format(new Date()) + " CAT";
        items.forEach(function (item) { item.textContent = text; });
    }

    tick();
    items.forEach(function (item) { item.hidden = false; });
    setInterval(tick, 30000);
})();

// Copy to clipboard (e.g. the email on the contact page)
(function () {
    if (!navigator.clipboard) return;

    document.querySelectorAll("[data-copy]").forEach(function (button) {
        const label = button.textContent;
        let timer;

        button.hidden = false;
        button.addEventListener("click", function () {
            navigator.clipboard.writeText(button.dataset.copy).then(function () {
                button.textContent = "Copied!";
                button.classList.add("is-copied");
                clearTimeout(timer);
                timer = setTimeout(function () {
                    button.textContent = label;
                    button.classList.remove("is-copied");
                }, 2000);
            });
        });
    });
})();

// Scroll reveal
// Elements with class "reveal" animate in when they enter the viewport.
// Children of a [data-reveal-stagger] parent animate one after another.
(function () {
    document.querySelectorAll("[data-reveal-stagger]").forEach(function (group) {
        group.querySelectorAll(":scope > .reveal").forEach(function (item, index) {
            item.style.setProperty("--reveal-delay", index * 0.1 + "s");
        });
    });

    const items = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        items.forEach(function (item) { item.classList.add("is-visible"); });
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (item) { observer.observe(item); });
})();
