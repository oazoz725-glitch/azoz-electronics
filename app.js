// ===== MAIN APP LOGIC =====

// ===== TOAST =====
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3100);
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== PRODUCT CARD HTML =====
function createProductCard(product) {
  const catName = CATEGORIES.find(c => c.id === product.category)?.name || '';
  const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');

  return `
    <div class="product-card" onclick="goToProduct(${product.id})" id="prod-${product.id}">
      <div class="product-img-wrap">
        <img src="${product.img}" alt="${product.name}" loading="lazy"
             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><rect fill=%22%230D1424%22 width=%22200%22 height=%22200%22/><text y=%22100%22 x=%22100%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2260%22>${CATEGORIES.find(c=>c.id===product.category)?.icon||'📦'}</text></svg>'">
        ${product.badge ? `<div class="product-badge badge-${product.badge}">${product.badge === 'new' ? 'جديد' : product.badge === 'sale' ? 'خصم' : '🔥 رائج'}</div>` : ''}
        <button class="product-wishlist" id="wish-${product.id}" onclick="toggleWishlist(event, ${product.id})">♡</button>
      </div>
      <div class="product-info">
        <div class="product-category">${catName}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">${product.price.toLocaleString()} ج</span>
            ${product.oldPrice ? `<span class="price-old">${product.oldPrice.toLocaleString()} ج</span>` : ''}
          </div>
          <button class="add-to-cart-btn" onclick="addToCartFromCard(event, ${product.id})" title="أضف للسلة">+</button>
        </div>
      </div>
    </div>
  `;
}

function addToCartFromCard(e, id) {
  e.stopPropagation();
  Cart.add(id);
  const btn = e.currentTarget;
  btn.style.transform = 'scale(1.4) rotate(20deg)';
  setTimeout(() => btn.style.transform = '', 400);
}

function goToProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// ===== WISHLIST =====
let wishlist = JSON.parse(localStorage.getItem('azzouz-wishlist') || '[]');

function toggleWishlist(e, id) {
  e.stopPropagation();
  const idx = wishlist.indexOf(id);
  const btn = e.currentTarget;
  if (idx === -1) {
    wishlist.push(id);
    btn.textContent = '♥';
    btn.classList.add('active');
    showToast('❤️ تمت الإضافة للمفضلة');
  } else {
    wishlist.splice(idx, 1);
    btn.textContent = '♡';
    btn.classList.remove('active');
    showToast('💔 تمت الإزالة من المفضلة');
  }
  localStorage.setItem('azzouz-wishlist', JSON.stringify(wishlist));
}

// ===== HOME PAGE =====
function initHomePage() {
  renderHomeCategories();
  renderFeaturedProducts();
  initSearch();
  initStatsCounter();
}

function renderHomeCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;

  const cats = CATEGORIES.filter(c => c.id !== 'all');
  grid.innerHTML = cats.map(cat => `
    <div class="category-card" onclick="goToCategory('${cat.id}')">
      <div class="category-icon-wrap">
        <span class="category-icon" style="font-size:2rem;">${cat.icon}</span>
      </div>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.count} منتج</div>
    </div>
  `).join('');
}

function goToCategory(catId) {
  window.location.href = `products.html?cat=${catId}`;
}

function renderFeaturedProducts() {
  const grid = document.getElementById('featured-products');
  if (!grid) return;

  const featured = PRODUCTS.filter(p => p.badge || p.rating >= 4.8).slice(0, 8);
  grid.innerHTML = featured.map(createProductCard).join('');

  // Restore wishlist state
  wishlist.forEach(id => {
    const btn = document.getElementById(`wish-${id}`);
    if (btn) { btn.textContent = '♥'; btn.classList.add('active'); }
  });
}

function initStatsCounter() {
  const stats = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }, 16);
      observer.unobserve(el);
    });
  });
  stats.forEach(s => observer.observe(s));
}

// ===== SEARCH =====
function initSearch() {
  const inputs = document.querySelectorAll('.nav-search input, #search-input');
  inputs.forEach(input => {
    input.addEventListener('input', debounce(handleSearch, 300));
    input.addEventListener('focus', () => {
      const dropdown = input.parentElement.querySelector('.search-dropdown');
      if (dropdown && input.value.trim()) dropdown.classList.add('show');
    });
    document.addEventListener('click', (e) => {
      if (!input.parentElement.contains(e.target)) {
        const dropdown = input.parentElement.querySelector('.search-dropdown');
        if (dropdown) dropdown.classList.remove('show');
      }
    });
  });
}

function handleSearch(e) {
  const query = e.target.value.trim().toLowerCase();
  const dropdown = e.target.parentElement.querySelector('.search-dropdown');
  if (!dropdown) return;

  if (!query) { dropdown.classList.remove('show'); return; }

  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.nameEn.toLowerCase().includes(query) ||
    (p.desc && p.desc.toLowerCase().includes(query))
  ).slice(0, 6);

  if (results.length === 0) {
    dropdown.classList.remove('show');
    return;
  }

  dropdown.innerHTML = results.map(p => `
    <div class="search-result-item" onclick="goToProduct(${p.id})">
      <img class="search-result-img" src="${p.img}" alt="${p.name}"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2244%22 height=%2244%22><rect fill=%22%230D1424%22 width=%2244%22 height=%2244%22/><text y=%2222%22 x=%2222%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2220%22>${CATEGORIES.find(c=>c.id===p.category)?.icon||'📦'}</text></svg>'">
      <div>
        <div class="search-result-name">${p.name}</div>
        <div class="search-result-price">${p.price} جنيه</div>
      </div>
    </div>
  `).join('');

  dropdown.classList.add('show');
}

// ===== PRODUCTS PAGE =====
let currentCategory = 'all';
let currentView = 'grid-4';
let currentSort = 'default';
let maxPrice = 500;

function initProductsPage() {
  renderSidebarCategories();
  renderProducts();
  initSearch();
  initFilters();
  initViewToggle();
  loadFromURL();
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    currentCategory = cat;
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.toggle('active', item.dataset.cat === cat);
    });
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.cat === cat);
    });
    renderProducts();
  }
}

function renderSidebarCategories() {
  const list = document.getElementById('sidebar-categories');
  if (!list) return;

  list.innerHTML = CATEGORIES.map(cat => `
    <div class="sidebar-item ${cat.id === currentCategory ? 'active' : ''}" 
         data-cat="${cat.id}" onclick="filterByCategory('${cat.id}')">
      <span>${cat.icon} ${cat.name}</span>
      <span class="sidebar-item-count">${cat.count}</span>
    </div>
  `).join('');
}

function filterByCategory(catId) {
  currentCategory = catId;
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.toggle('active', item.dataset.cat === catId);
  });
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.cat === catId);
  });
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');
  if (!grid) return;

  let filtered = currentCategory === 'all'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.category === currentCategory);

  // Filter by price
  filtered = filtered.filter(p => p.price <= maxPrice);

  // Sort
  switch (currentSort) {
    case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    case 'newest': filtered = filtered.filter(p => p.badge === 'new').concat(filtered.filter(p => p.badge !== 'new')); break;
  }

  if (countEl) countEl.textContent = `${filtered.length} منتج`;

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-secondary)">
      <div style="font-size:3rem;margin-bottom:1rem">😕</div>
      <p>لا توجد منتجات في هذا التصنيف</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(createProductCard).join('');

  // Restore wishlist
  wishlist.forEach(id => {
    const btn = document.getElementById(`wish-${id}`);
    if (btn) { btn.textContent = '♥'; btn.classList.add('active'); }
  });
}

function initFilters() {
  const priceSlider = document.getElementById('price-slider');
  const priceMax = document.getElementById('price-max');
  if (priceSlider) {
    priceSlider.addEventListener('input', () => {
      maxPrice = parseInt(priceSlider.value);
      if (priceMax) priceMax.textContent = `${maxPrice} ج`;
      renderProducts();
    });
  }

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderProducts();
    });
  }
}

function initViewToggle() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.getElementById('products-grid');
      if (grid) {
        grid.className = `products-grid products-grid-${btn.dataset.view}`;
      }
    });
  });
}

// ===== DEBOUNCE =====
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ===== ANIMATIONS ON SCROLL =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .category-card, .about-feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'home') { initHomePage(); }
  else if (page === 'products') { initProductsPage(); }
  else if (page === 'cart') { renderCartPage(); }

  setTimeout(initScrollAnimations, 100);
});
