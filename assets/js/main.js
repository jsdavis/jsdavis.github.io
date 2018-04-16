// When clicking to an anchor, ignore the scroll event
let ignoreScroll = false;

class NavLink {
    constructor(elem) {
        this.elem = elem;

        // Ignore the first scroll event after clicking
        this.elem.addEventListener('click', () => {
            ignoreScroll = true;
            this.activate();
        });

        const link = document.querySelector(elem.getAttribute('href'));
        const box = link.getBoundingClientRect();

        const breakpoint = window.innerHeight / 4;
        this.bounds = {
            top : box.top + window.scrollY - breakpoint,
            bottom : box.bottom + window.scrollY
        };
    }

    shouldBeActive() {
        return window.scrollY >= this.bounds.top &&
               window.scrollY <= this.bounds.bottom;I
    }

    activate() {
        if (NavLink.active) NavLink.active.deactivate();
        this.elem.classList.add('active');
        NavLink.active = this;
    }

    deactivate() {
        this.elem.classList.remove('active');
        NavLink.active = null;
    }
}

const NavLinks = Array.from(document.querySelectorAll('nav .sub a')).map(elem => new NavLink(elem));

window.addEventListener('scroll', () => {
    // Ignore the first scroll event after clicking
    if (ignoreScroll) {
        ignoreScroll = false;
        return
    }

    for (let l of NavLinks)
        if (l.shouldBeActive()) l.activate();
});
