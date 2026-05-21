document.addEventListener('DOMContentLoaded', () => {
  renderFleet();
  renderPricingTable();
  animateCards();
});

function renderFleet() {
  const grid = document.getElementById('fleetGrid');
  if (!grid) return;
  const featured = DAVE_CARS.slice(0, 4);
  grid.innerHTML = featured.map(c => renderCarCard(c, '')).join('');
}

function renderPricingTable() {
  const tbody = document.getElementById('pricingTableBody');
  if (!tbody) return;
  tbody.innerHTML = DAVE_CARS.map(car => `
    <tr>
      <td>
        <div class="td-car-name">
          <span class="td-emoji">${car.emoji}</span>
          ${car.name}
        </div>
      </td>
      <td style="color:var(--white-muted)">${car.seats} seats</td>
      <td style="color:var(--white-muted)">${car.transmission}</td>
      <td class="td-price">${formatPHP(car.price6hr)}</td>
      <td class="td-price">${formatPHP(car.price12hr)}</td>
      <td class="td-price-highlight">${formatPHP(car.price24hr)}</td>
      <td>
        ${car.available
          ? `<a href="pages/booking.html?car=${car.id}" style="font-family:var(--font-condensed);font-size:0.8rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:var(--orange);border:1px solid var(--border-orange);padding:6px 14px;border-radius:6px;white-space:nowrap;display:inline-block;transition:all 0.2s" onmouseover="this.style.background='var(--orange)';this.style.color='var(--black)'" onmouseout="this.style.background='';this.style.color='var(--orange)'">Book Now</a>`
          : `<span class="badge-cancelled">Unavailable</span>`}
      </td>
    </tr>`).join('');
}

function animateCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.car-card, .service-card, .how-step, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.22s, box-shadow 0.22s';
    observer.observe(el);
  });
}