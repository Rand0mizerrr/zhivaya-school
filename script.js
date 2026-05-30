// ===== Живая школа — интерактив =====
(function () {
  "use strict";

  // Залипающая шапка — тень при скролле
  var header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });

  // Мобильное меню
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
  // Закрыть меню по клику на ссылку
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
    });
  });

  // Аккордеон методик
  document.querySelectorAll(".acc-head").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".acc-item.open").forEach(function (i) {
        i.classList.remove("open");
      });
      if (!isOpen) item.classList.add("open");
    });
  });

  // Лайтбокс галереи
  var links = Array.prototype.slice.call(
    document.querySelectorAll("#gallery-grid a")
  );
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var current = 0;

  function openLb(i) {
    current = (i + links.length) % links.length;
    lbImg.src = links[current].getAttribute("data-full");
    lbImg.alt = links[current].querySelector("img").alt || "";
    lb.classList.add("open");
  }
  function closeLb() {
    lb.classList.remove("open");
  }
  links.forEach(function (a, i) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      openLb(i);
    });
  });
  document.getElementById("lb-close").addEventListener("click", closeLb);
  document.getElementById("lb-next").addEventListener("click", function () {
    openLb(current + 1);
  });
  document.getElementById("lb-prev").addEventListener("click", function () {
    openLb(current - 1);
  });
  lb.addEventListener("click", function (e) {
    if (e.target === lb) closeLb();
  });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") openLb(current + 1);
    if (e.key === "ArrowLeft") openLb(current - 1);
  });

  // Форма заявки -> открываем Telegram (текст заявки копируем в буфер обмена)
  var form = document.getElementById("lead-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.name.value || "").trim();
      var phone = (form.phone.value || "").trim();
      var msg = (form.msg.value || "").trim();
      var text =
        "Здравствуйте! Хочу записаться/узнать о Живой школе.\n" +
        "Имя: " + name + "\nТелефон: " + phone +
        (msg ? "\nВопрос: " + msg : "");
      function go() {
        window.open("https://t.me/+79324720279", "_blank", "noopener");
        form.reset();
        alert("Спасибо! Откроется Telegram, а текст заявки скопирован — вставьте его в чат и отправьте.");
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(go, go);
      } else {
        go();
      }
    });
  }

  // Фильтр материалов «Родительского клуба» по темам
  var filters = document.getElementById("club-filters");
  if (filters) {
    var chips = filters.querySelectorAll(".chip");
    var cards = document.querySelectorAll("#res-grid .res-card");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var cat = chip.getAttribute("data-cat");
        cards.forEach(function (card) {
          var show = cat === "all" || card.getAttribute("data-cat") === cat;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }
})();
