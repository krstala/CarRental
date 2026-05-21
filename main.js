// ═══════════════════════════════════════
// DAVE CAR RENTAL — MAIN JS
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
  }

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }

  // Update nav based on login state
  updateNavUser();
});

function updateNavUser() {
  const user = getCurrentUser();
  const actions = document.querySelector('.nav-actions');
  if (!actions || !user) return;
  actions.innerHTML = `
    <span style="font-family:var(--font-condensed);font-size:0.85rem;font-weight:700;color:rgba(255,255,255,0.6);letter-spacing:0.04em">
      Hi, ${user.name.split(' ')[0].toUpperCase()}
    </span>
    <a href="${getRoot()}pages/dashboard.html" class="btn-nav-ghost">My Bookings</a>
    <button onclick="doLogout()" class="btn-nav-primary">Sign Out</button>
  `;
}

function doLogout() {
  setCurrentUser(null);
  window.location.href = getRoot() + 'index.html';
}

// ── CAR CARD RENDERER ──
function renderCarCard(car, root = '') {
  const avail = car.available;
  return `
    <div class="car-card" onclick="window.location='${root}pages/booking.html?car=${car.id}'">
      <div class="car-card-img">
        ${car.badge ? `<div class="car-card-badge">${car.badge}</div>` : ''}
        <div class="car-avail-badge ${avail ? 'avail-yes' : 'avail-no'}">${avail ? 'Available' : 'Booked'}</div>
        <span>${car.emoji}</span>
      </div>
      <div class="car-card-body">
        <div class="car-card-name">${car.name}</div>
        <div class="car-card-type">${car.type} · ${car.transmission} · ${car.seats} Seaters</div>
        <div class="car-card-pricing">
          <div class="price-cell">
            <span class="price-cell-label">6 Hours</span>
            <span class="price-cell-val">${formatPHP(car.price6hr)}</span>
          </div>
          <div class="price-cell">
            <span class="price-cell-label">12 Hours</span>
            <span class="price-cell-val">${formatPHP(car.price12hr)}</span>
          </div>
          <div class="price-cell">
            <span class="price-cell-label">24 Hours</span>
            <span class="price-cell-val">${formatPHP(car.price24hr)}</span>
          </div>
        </div>
        <button class="btn-book-card ${!avail ? 'unavail' : ''}" onclick="event.stopPropagation(); ${avail ? `window.location='${root}pages/booking.html?car=${car.id}'` : ''}">
          ${avail ? 'Book This Car →' : 'Currently Unavailable'}
        </button>
      </div>
    </div>`;
}