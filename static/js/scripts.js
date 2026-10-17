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

// Footer: my local time in Malawi
(function () {
    const el = document.querySelector(".local-time");
    if (!el) return;

    const format = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: el.dataset.timezone,
    });

    function tick() {
        el.textContent = " \u00b7 " + format.format(new Date()) + " CAT";
    }

    tick();
    el.hidden = false;
    setInterval(tick, 30000);
})();
