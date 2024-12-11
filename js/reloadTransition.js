gsap.registerPlugin();

document.addEventListener("DOMContentLoaded", () => {
  const ease = "power4.inOut";
  if (window.innerWidth > 768) {
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const href = link.getAttribute("href");
        const target = link.getAttribute("target");

        if (
          href &&
          !href.startsWith("#") &&
          href !== window.location.pathname
        ) {
          animateTransition().then(() => {
            window.location.href = href;
          });
        }
      });
    });

    revealTransition().then(() => {
      gsap.set(".block", { visibility: "hidden" });
    });

    function revealTransition() {
      return new Promise((resolve) => {
        gsap.set(".block", { scaleY: 1 });
        gsap.to(".block", {
          scaleY: 0,
          duration: 1.5,
          stagger: {
            each: 0.1,
            from: "start",
            grid: "auto",
            axis: "x",
          },
          ease: ease,
          onComplete: resolve,
        });
      });
    }

    function animateTransition() {
      return new Promise((resolve) => {
        gsap.set(".block", { visibility: "visible", scaleY: 0 });
        gsap.to(".block", {
          scaleY: 1,
          duration: 1.5,
          stagger: {
            each: 0.1,
            from: "start",
            grid: "[2, 5]",
            axis: "x",
          },
          ease: ease,
          onComplete: resolve,
        });
      });
    }
  }
});
