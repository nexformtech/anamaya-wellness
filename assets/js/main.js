/* ANAMAYA — shared interactions (vanilla JS, no dependencies) */
(function () {
  "use strict";

  /* Flag JS availability so reveal animations never hide content without JS */
  document.documentElement.className += " js";

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- Header shadow on scroll + back-to-top ---------- */
    var header = document.querySelector(".site-header");
    var backTop = document.querySelector(".back-top");
    function onScroll() {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
      if (backTop) backTop.classList.toggle("show", window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backTop) {
      backTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* ---------- Mobile nav ---------- */
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("open")) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* ---------- Reveal on scroll ---------- */
    var revealEls = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window && revealEls.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("revealed"); });
    }

    /* ---------- Tabs ---------- */
    document.querySelectorAll("[data-tabs]").forEach(function (tabs) {
      var buttons = tabs.querySelectorAll(".tabs__btn");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) {
            b.setAttribute("aria-selected", b === btn ? "true" : "false");
          });
          tabs.querySelectorAll(".tabs__panel").forEach(function (panel) {
            panel.hidden = panel.id !== btn.getAttribute("aria-controls");
          });
        });
      });
    });

    /* ---------- Accordion ---------- */
    document.querySelectorAll(".accordion").forEach(function (acc) {
      acc.querySelectorAll(".accordion__btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var panel = document.getElementById(btn.getAttribute("aria-controls"));
          var open = btn.getAttribute("aria-expanded") === "true";
          /* close siblings for a tidy one-open accordion */
          acc.querySelectorAll(".accordion__btn").forEach(function (b) {
            b.setAttribute("aria-expanded", "false");
            var p = document.getElementById(b.getAttribute("aria-controls"));
            if (p) p.hidden = true;
          });
          if (!open && panel) {
            btn.setAttribute("aria-expanded", "true");
            panel.hidden = false;
          }
        });
      });
    });

    /* ---------- Testimonials carousel ---------- */
    document.querySelectorAll("[data-carousel]").forEach(function (car) {
      var track = car.querySelector(".carousel__track");
      var slides = car.querySelectorAll(".carousel__slide");
      var dotsWrap = car.querySelector(".carousel__controls");
      var index = 0;
      var timer = null;

      function dots() {
        if (!dotsWrap) return;
        dotsWrap.innerHTML = "";
        slides.forEach(function (_, i) {
          var d = document.createElement("button");
          d.className = "carousel__dot";
          d.setAttribute("aria-label", "Go to testimonial " + (i + 1));
          d.setAttribute("aria-current", i === index ? "true" : "false");
          d.addEventListener("click", function () { go(i); restart(); });
          dotsWrap.appendChild(d);
        });
      }
      function go(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = "translateX(-" + index * 100 + "%)";
        if (dotsWrap) {
          dotsWrap.querySelectorAll(".carousel__dot").forEach(function (d, j) {
            d.setAttribute("aria-current", j === index ? "true" : "false");
          });
        }
      }
      function restart() {
        if (timer) clearInterval(timer);
        timer = setInterval(function () { go(index + 1); }, 7000);
      }
      dots();
      restart();
      car.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
      car.addEventListener("mouseleave", restart);
    });

    /* ---------- Gallery lightbox ---------- */
    var lightbox = document.getElementById("lightbox");
    if (lightbox) {
      var lbImg = lightbox.querySelector("img");
      var lbCap = lightbox.querySelector("figcaption");
      var lbClose = lightbox.querySelector(".lightbox__close");
      function openLb(fig) {
        var img = fig.querySelector("img");
        var cap = fig.querySelector("figcaption");
        lbImg.src = img.getAttribute("src");
        lbImg.alt = img.alt;
        lbCap.textContent = cap ? cap.textContent : "";
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
        lbClose.focus();
      }
      function closeLb() {
        lightbox.hidden = true;
        document.body.style.overflow = "";
      }
      document.querySelectorAll(".gallery-grid figure").forEach(function (fig) {
        fig.setAttribute("tabindex", "0");
        fig.setAttribute("role", "button");
        fig.addEventListener("click", function () { openLb(fig); });
        fig.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(fig); }
        });
      });
      lbClose.addEventListener("click", closeLb);
      lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLb(); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !lightbox.hidden) closeLb();
      });
    }

    /* ---------- Forms (client-side validation + success state) ---------- */
    function validate(form) {
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var wrap = field.closest(".field");
        var valid = field.value.trim() !== "";
        if (valid && field.type === "email") {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        }
        if (wrap) wrap.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      return ok;
    }
    document.querySelectorAll("form[data-validate]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validate(form)) return;
        var success = document.getElementById(form.getAttribute("data-success-target"));
        if (success) {
          success.hidden = false;
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        form.reset();
      });
      form.querySelectorAll("input, select, textarea").forEach(function (f) {
        f.addEventListener("input", function () {
          var wrap = f.closest(".field");
          if (wrap) wrap.classList.remove("invalid");
        });
      });
    });

    /* ---------- Footer year ---------- */
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  });
})();
