// Run JS only after the page HTML is loaded
document.addEventListener("DOMContentLoaded", () => {

  // ===== Notify button in hero card =====
  const notifyBtn = document.getElementById("notifyBtn");
  if (notifyBtn) {
    notifyBtn.addEventListener("click", () => {
      alert("Thanks for your interest! We will contact you soon for bulk orders.");
    });
  }

  // ===== Contact form submit =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Your enquiry has been submitted. Our team will contact you shortly.");
      contactForm.reset();
    });
  }

  // ===== Back to Top Button =====
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== Stats Counter Animation =====
  const statsSection = document.getElementById("stats");
  const counters = document.querySelectorAll(".stat-number");

  if (statsSection && counters.length > 0) {
    const animateCounters = () => {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const increment = target / 80;

        const update = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        update();
      });
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(statsSection);
  }

  // ===== Careers form submit =====
  const careerForm = document.getElementById("careerForm");
  if (careerForm) {
    careerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your interest in working with SagarTextile. We will contact you if a suitable position is available.");
      careerForm.reset();
    });
  }

}); // END DOMContentLoaded


// ========== Countdown Timer ==========
function countdownTimer() {
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;

  const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;

  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    timerEl.innerText =
      `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

    if (distance <= 0) {
      clearInterval(timerInterval);
      timerEl.innerText = "00:00:00";
    }
  }, 1000);
}

countdownTimer();


// ==== Smart Search Box with Suggestions + Scroll ====
const searchItems = [
  "Shirt",
  "Jeans",
  "Saree",
  "Kurti",
  "Kids Wear",
  "School Uniform",
  "Winter Jacket",
  "T-shirt",
  "Footwear",
  "Hoodies"
];

const searchTargets = {
  "shirt": "#featured",
  "jeans": "#featured",
  "saree": "#featured",
  "kurti": "#featured",
  "kids wear": "#gallery",
  "school uniform": "#contact",
  "winter jacket": "#featured",
  "t-shirt": "#featured",
  "footwear": "#featured",
  "hoodies": "#featured"
};

const searchBox = document.getElementById("searchBox");
const suggestionList = document.getElementById("suggestionList");

if (searchBox && suggestionList) {
  searchBox.addEventListener("input", () => {
    const input = searchBox.value.toLowerCase();
    suggestionList.innerHTML = "";

    if (input === "") {
      suggestionList.style.display = "none";
      return;
    }

    const filtered = searchItems.filter(item =>
      item.toLowerCase().includes(input)
    );

    filtered.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;

      li.addEventListener("click", () => {
        searchBox.value = item;
        suggestionList.style.display = "none";

        const key = item.toLowerCase();
        const targetId = searchTargets[key];

        if (targetId) {
          const section = document.querySelector(targetId);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }
      });

      suggestionList.appendChild(li);
    });

    suggestionList.style.display = filtered.length ? "block" : "none";
  });
}
