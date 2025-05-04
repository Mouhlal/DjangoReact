/**
 * Template Name: eNno
 * …
 */
(function() {
  "use strict";

  document.addEventListener('DOMContentLoaded', () => {
    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
      const selectBody   = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader) return;
      if (!selectHeader.classList.contains('scroll-up-sticky') &&
          !selectHeader.classList.contains('sticky-top') &&
          !selectHeader.classList.contains('fixed-top')
      ) return;

      window.scrollY > 100
        ? selectBody.classList.add('scrolled')
        : selectBody.classList.remove('scrolled');
    }
    window.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load',  toggleScrolled);

    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggleBtn) {
      function mobileNavToggle() {
        document.body.classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      }
      mobileNavToggleBtn.addEventListener('click', mobileNavToggle);

      // Hide mobile nav on same-page/hash links
      document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
          if (document.body.classList.contains('mobile-nav-active')) {
            mobileNavToggle();
          }
        });
      });

      // Toggle mobile nav dropdowns
      document.querySelectorAll('.navmenu .toggle-dropdown').forEach(el => {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          this.parentNode.classList.toggle('active');
          this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
          e.stopImmediatePropagation();
        });
      });
    }

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => preloader.remove());
    }

    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      function toggleScrollTop() {
        window.scrollY > 100
          ? scrollTop.classList.add('active')
          : scrollTop.classList.remove('active');
      }
      scrollTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      window.addEventListener('load',   toggleScrollTop);
      document.addEventListener('scroll', toggleScrollTop);
    }

    /**
     * AOS Initialization
     */
    if (typeof AOS !== 'undefined') {
      window.addEventListener('load', () => {
        AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
      });
    }

    /**
     * GLightbox
     */
    if (typeof GLightbox !== 'undefined') {
      GLightbox({ selector: '.glightbox' });
    }

    /**
     * PureCounter
     */
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }

    /**
     * Isotope layout & filters
     */
    document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
      const container = isotopeItem.querySelector('.isotope-container');
      if (!container) return;
      // wait for images
      imagesLoaded(container, () => {
        const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
        const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
        const sort   = isotopeItem.getAttribute('data-sort') ?? 'original-order';

        const iso = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode:   layout,
          filter:       filter,
          sortBy:       sort
        });

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(f => {
          f.addEventListener('click', () => {
            isotopeItem.querySelector('.filter-active')?.classList.remove('filter-active');
            f.classList.add('filter-active');
            iso.arrange({ filter: f.getAttribute('data-filter') });
            AOS && AOS.refresh();
          });
        });
      });
    });

    /**
     * Init Swiper sliders
     */
    function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(swEl => {
        const configEl = swEl.querySelector(".swiper-config");
        if (!configEl) return;
        let config;
        try {
          config = JSON.parse(configEl.innerHTML.trim());
        } catch {
          return;
        }
        if (swEl.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swEl, config);
        } else {
          new Swiper(swEl, config);
        }
      });
    }
    window.addEventListener("load", initSwiper);

    /**
     * Hash scroll correction
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        const sec = document.querySelector(window.location.hash);
        if (sec) {
          setTimeout(() => {
            const offset = parseInt(
              getComputedStyle(sec).scrollMarginTop || 0
            );
            window.scrollTo({ top: sec.offsetTop - offset, behavior: 'smooth' });
          }, 100);
        }
      }
    });

    /**
     * Navmenu Scrollspy
     */
    const navLinks = document.querySelectorAll('.navmenu a');
    function navmenuScrollspy() {
      navLinks.forEach(link => {
        if (!link.hash) return;
        const sec = document.querySelector(link.hash);
        if (!sec) return;
        const pos = window.scrollY + 200;
        if (pos >= sec.offsetTop && pos <= sec.offsetTop + sec.offsetHeight) {
          document.querySelector('.navmenu a.active')?.classList.remove('active');
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
    window.addEventListener('load',   navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);

  }); // end DOMContentLoaded
})();
