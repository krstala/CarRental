/**
 * ══════════════════════════════════════════════
 *  DAVE CAR RENTAL — data-bridge.js
 *  Connects admin panel → public index.html
 *  
 *  HOW TO USE:
 *  Add this BEFORE js/data.js and js/main.js in index.html:
 *  <script src="js/data-bridge.js"></script>
 *  <script src="js/data.js"></script>
 *  <script src="js/main.js"></script>
 * ══════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ── LOAD ADMIN CARS → Override DAVE_CARS if admin has added cars ──
  const adminCars = JSON.parse(localStorage.getItem('dave_public_cars') || 'null');
  if (adminCars && adminCars.length > 0) {
    // Remap admin car format to the format used by index.html / main.js
    window.DAVE_CARS = adminCars.map(car => ({
      id: car.id,
      name: car.name,
      type: car.type,
      transmission: car.transmission,
      seats: car.seats,
      price6hr: car.price6hr,
      price12hr: car.price12hr,
      price24hr: car.price24hr,
      features: car.features || [],
      badge: car.badge || null,
      available: car.available,
      image: car.image || null,       // ← real uploaded photo
      emoji: car.emoji || '🚗',       // ← fallback if no photo
      heroPin: car.heroPin || false,
    }));
  }

  // ── LOAD ADMIN PROMOS → Override hardcoded promos ──
  const adminPromos = JSON.parse(localStorage.getItem('dave_public_promos') || 'null');
  if (adminPromos && adminPromos.length > 0) {
    window.DAVE_PROMOS = adminPromos;
  }

  // ── DETERMINE HERO CAR ──
  // 1. Check admin manual override
  // 2. Otherwise pick most-booked this month
  // 3. Fallback: first available car
  function getHeroCar() {
    const settings = JSON.parse(localStorage.getItem('dave_admin_settings') || '{}');
    const cars = window.DAVE_CARS || [];
    if (!cars.length) return null;

    // Manual override
    if (settings.heroOverride) {
      const override = cars.find(c => c.id === settings.heroOverride);
      if (override) return override;
    }

    // Auto: most booked this month
    const bookings = JSON.parse(localStorage.getItem('dave_bookings') || '[]');
    const now = new Date();
    const monthBookings = bookings.filter(b => {
      const d = new Date(b.createdAt || b.pickupDate || 0);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const carCount = {};
    monthBookings.forEach(b => {
      if (b.carId) carCount[b.carId] = (carCount[b.carId] || 0) + 1;
    });
    let topCarId = null, topCount = 0;
    Object.entries(carCount).forEach(([id, c]) => {
      if (c > topCount) { topCount = c; topCarId = id; }
    });
    if (topCarId) {
      const top = cars.find(c => c.id === topCarId);
      if (top) return top;
    }

    // Fallback: first available car
    return cars.find(c => c.available) || cars[0];
  }

  window.getDaveHeroCar = getHeroCar;

  // ── OWNER INFO ──
  window.getDaveOwnerInfo = function() {
    const s = JSON.parse(localStorage.getItem('dave_admin_settings') || '{}');
    return {
      name: s.ownerName || 'David Esmino',
      title: s.ownerTitle || 'Owner / Founder',
      photo: s.ownerPhoto || null,
    };
  };

  // ── FORMAT HELPER (make sure it's available) ──
  if (!window.formatPHP) {
    window.formatPHP = n => '₱' + Number(n).toLocaleString();
  }

})();