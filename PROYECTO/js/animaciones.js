
(function () {
  "use strict";

  var raiz = document.documentElement;
  var reducir =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  function iniciarReveal() {
    if (reducir || !("IntersectionObserver" in window)) return;

    var SELECTOR = ".card, .beneficio, .destacados h2, .home-section h2";

    var observador = new IntersectionObserver(
      function (entradas) {
        var orden = 0;
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          // Pequeño retraso escalonado entre elementos que aparecen juntos
          entrada.target.style.setProperty("--d", orden * 70 + "ms");
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
          orden++;
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    function registrar() {
      var elementos = document.querySelectorAll(SELECTOR);
      Array.prototype.forEach.call(elementos, function (el) {
        if (el.getAttribute("data-reveal") === "1") return;
        el.setAttribute("data-reveal", "1");
        el.classList.add("reveal");
        observador.observe(el);
      });
    }

    raiz.classList.add("js-reveal");
    registrar();

   
    if ("MutationObserver" in window) {
      new MutationObserver(registrar).observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }


  function volarAlCarrito(imagen, destino) {
    if (reducir || !imagen || !destino || typeof imagen.animate !== "function") return;

    var a = imagen.getBoundingClientRect();
    var b = destino.getBoundingClientRect();
    if (!a.width || !a.height) return;

    var clon = imagen.cloneNode(false);
    clon.removeAttribute("id");
    clon.style.cssText =
      "position:fixed;z-index:3500;pointer-events:none;margin:0;" +
      "border-radius:12px;object-fit:cover;" +
      "left:" + a.left + "px;top:" + a.top + "px;" +
      "width:" + a.width + "px;height:" + a.height + "px;";
    document.body.appendChild(clon);

    var dx = b.left + b.width / 2 - (a.left + a.width / 2);
    var dy = b.top + b.height / 2 - (a.top + a.height / 2);

    var vuelo = clon.animate(
      [
        { transform: "translate(0px, 0px) scale(1)", opacity: 1 },
        {
          transform:
            "translate(" + dx * 0.6 + "px, " + (dy * 0.6 - 60) + "px) scale(0.45)",
          opacity: 0.9,
          offset: 0.6
        },
        { transform: "translate(" + dx + "px, " + dy + "px) scale(0.05)", opacity: 0.2 }
      ],
      { duration: 700, easing: "ease-in-out" }
    );

    vuelo.onfinish = function () {
      if (clon.parentNode) clon.parentNode.removeChild(clon);
    };
  }


  function iniciarCarrito() {
    var boton = document.getElementById("btnCarrito");
    if (!boton) return;

    function rebotar() {
      boton.classList.remove("bump");
      void boton.offsetWidth; // reinicia la animación
      boton.classList.add("bump");
    }

    boton.addEventListener("animationend", function (e) {
      if (e.animationName === "bumpCarrito") boton.classList.remove("bump");
    });

    document.addEventListener("click", function (e) {
      var objetivo = e.target;
      if (!objetivo || typeof objetivo.closest !== "function") return;
      var comprar = objetivo.closest(".buy-cart");
      if (!comprar) return;

      var tarjeta = comprar.closest(".card");
      var imagen = tarjeta ? tarjeta.querySelector("img") : null;
      volarAlCarrito(imagen, boton);
      window.setTimeout(rebotar, reducir ? 0 : 600);
    });
  }


  function iniciarTotales() {
    if (reducir || !("MutationObserver" in window)) return;

    ["totalCarrito", "totalBoleta"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var ultimo = el.textContent;

      new MutationObserver(function () {
        if (el.textContent === ultimo) return;
        ultimo = el.textContent;
        el.classList.remove("flash");
        void el.offsetWidth;
        el.classList.add("flash");
      }).observe(el, { childList: true, characterData: true, subtree: true });

      el.addEventListener("animationend", function () {
        el.classList.remove("flash");
      });
    });
  }

  iniciarReveal();
  iniciarCarrito();
  iniciarTotales();
})();