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

    NavLinks.forEach(l => {
        if (l.shouldBeActive()) l.activate();
    });
});

// Add link icon to linked cards
const links = Array.from(document.querySelectorAll('a.card p'));
links.forEach(l => {
    l.innerHTML += '<i class="fas fa-external-link-square-alt"></i>';
});

// Handle nav on small screens
const activeNav = document.querySelector('nav>.active');
const activeSub = activeNav.parentNode.querySelector('.active+.sub');

if (activeSub) {
    activeNav.addEventListener('click', e => {
        if (window.innerWidth > 900)
            return;
        activeSub.style.display = 'block';
        e.preventDefault();
    });
}


