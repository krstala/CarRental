// ═══════════════════════════════════════
// DAVE CAR RENTAL — VEHICLE DATA
// Based on actual fleet from business flyer
// ═══════════════════════════════════════

const DAVE_CARS = [
  {
    id: 1,
    name: 'Toyota Vios',
    type: 'Sedan',
    transmission: 'A/T',
    seats: 7,
    emoji: '🚗',
    badge: 'Popular',
    available: true,
    features: ['Air-conditioned', 'Power windows', 'Audio system'],
    price6hr: 1000,
    price12hr: 1800,
    price24hr: 2500,
  },
  {
    id: 2,
    name: 'Nissan Navarra',
    type: 'Pickup Truck',
    transmission: 'A/T',
    seats: 5,
    emoji: '🛻',
    badge: null,
    available: true,
    features: ['4x4 Capable', 'Air-conditioned', 'Diesel'],
    price6hr: 1800,
    price12hr: 3000,
    price24hr: 4500,
  },
  {
    id: 3,
    name: 'Toyota Wigo',
    type: 'Hatchback',
    transmission: 'A/T',
    seats: 5,
    emoji: '🚗',
    badge: 'Budget Friendly',
    available: true,
    features: ['Fuel efficient', 'Easy to park', 'City driving'],
    price6hr: 800,
    price12hr: 1400,
    price24hr: 2000,
  },
  {
    id: 4,
    name: 'Hiace Commuter Deluxe',
    type: 'Van',
    transmission: 'M/T',
    seats: 15,
    emoji: '🚐',
    badge: 'Best for Groups',
    available: true,
    features: ['15 seaters', 'A/C throughout', 'Spacious luggage'],
    price6hr: 3500,
    price12hr: 6000,
    price24hr: 9000,
  },
  {
    id: 5,
    name: 'Toyota Innova',
    type: 'MPV',
    transmission: 'Manual',
    seats: 8,
    emoji: '🚙',
    badge: null,
    available: true,
    features: ['Family car', 'Diesel', 'Comfortable ride'],
    price6hr: 2000,
    price12hr: 3500,
    price24hr: 5000,
  },
  {
    id: 6,
    name: 'Mitsubishi Montero Sport',
    type: 'SUV',
    transmission: 'M/T',
    seats: 7,
    emoji: '🚙',
    badge: 'Premium',
    available: true,
    features: ['4WD', 'Leather seats', 'Diesel turbo'],
    price6hr: 2500,
    price12hr: 4500,
    price24hr: 7000,
  },
  {
    id: 7,
    name: 'Toyota Fortuner',
    type: 'SUV',
    transmission: 'A/T',
    seats: 7,
    emoji: '🚙',
    badge: 'Top Pick',
    available: false,
    features: ['4x4', 'Leather interior', 'Auto transmission'],
    price6hr: 2800,
    price12hr: 5000,
    price24hr: 8000,
  },
  {
    id: 8,
    name: 'Hiace Commuter',
    type: 'Van',
    transmission: 'M/T',
    seats: 15,
    emoji: '🚐',
    badge: null,
    available: true,
    features: ['15 seaters', 'A/C', 'Luggage space'],
    price6hr: 3000,
    price12hr: 5500,
    price24hr: 8500,
  },
];

// ── USERS & BOOKINGS (localStorage) ──
function getUsers() { return JSON.parse(localStorage.getItem('dave_users') || '[]'); }
function saveUsers(u) { localStorage.setItem('dave_users', JSON.stringify(u)); }
function getBookings() { return JSON.parse(localStorage.getItem('dave_bookings') || '[]'); }
function saveBookings(b) { localStorage.setItem('dave_bookings', JSON.stringify(b)); }

function getCurrentUser() {
  const id = localStorage.getItem('dave_current_user');
  if (!id) return null;
  return getUsers().find(u => u.id === id) || null;
}
function setCurrentUser(user) {
  if (user) localStorage.setItem('dave_current_user', user.id);
  else localStorage.removeItem('dave_current_user');
}

function getRoot() {
  return window.location.pathname.includes('/pages/') ? '../' : '';
}

// ── TOAST ──
function showToast(msg, type = 'success') {
  let t = document.getElementById('globalToast');
  if (!t) { t = document.createElement('div'); t.id = 'globalToast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = (type === 'success' ? '✓ ' : '✗ ') + msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── DAYS BETWEEN ──
function daysBetween(d1, d2) {
  return Math.max(1, Math.round((new Date(d2) - new Date(d1)) / 86400000));
}
function formatPHP(n) { return '₱' + Number(n).toLocaleString(); }

// ── PRICE BY DURATION ──
function getPriceDuration(car, duration) {
  if (duration === '6hr') return car.price6hr;
  if (duration === '12hr') return car.price12hr;
  return car.price24hr;
}