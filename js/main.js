// 获取电脑头元素
const head = document.querySelector(".figure-head");

// 鼠标移动时，让电脑头产生轻微 3D 转动
document.addEventListener("mousemove", function (event) {
  if (!head) return;

  // 鼠标在屏幕中的相对位置，范围大致为 -0.5 到 0.5
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  // 控制转动幅度
  const rotateY = x * 50;
  const rotateX = -y * 50;

  head.style.transform =
    "translateX(-50%) " +
    "rotateX(" + rotateX + "deg) " +
    "rotateY(" + rotateY + "deg)";
});

// 鼠标离开页面时，让头部回到正面
document.addEventListener("mouseleave", function () {
  if (!head) return;

  head.style.transform = "translateX(-50%) rotateX(0deg) rotateY(0deg)";
});

// 导航点击平滑滚动 + active 切换
const navLinks = document.querySelectorAll(".nav-links a");
const scrollLinks = document.querySelectorAll(".nav-links a, .hero-button");
const sections = document.querySelectorAll("section[id]");
const navbar = document.querySelector(".navbar");

function setActiveNav(targetId) {
  navLinks.forEach(function (link) {
    link.classList.remove("active");

    if (link.getAttribute("href") === targetId) {
      link.classList.add("active");
    }
  });
}

function scrollToSection(targetId) {
  const targetSection = document.querySelector(targetId);

  if (!targetSection) return;

  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  const targetTop =
    targetSection.getBoundingClientRect().top +
    window.scrollY -
    navbarHeight +
    112;

  window.scrollTo({
    top: targetTop,
    behavior: "smooth"
  });

  setActiveNav(targetId);
}

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) return;

    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    event.preventDefault();

    scrollToSection(targetId);
  });
});

function updateActiveNav() {
  let currentId = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 180;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentId = section.getAttribute("id");
    }
  });

  if (currentId) {
    setActiveNav("#" + currentId);
  }
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);