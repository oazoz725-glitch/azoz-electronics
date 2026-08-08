// ===== CART MANAGEMENT =====
const Cart = (() => {
  let items = JSON.parse(localStorage.getItem('azzouz-cart') || '[]');

  function save() {
    localStorage.setItem('azzouz-cart', JSON.stringify(items));
    updateCartUI();
  }

  function updateCartUI() {
    const count = getTotalCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  function add(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ ...product, quantity });
    }
    save();
    showToast(`✅ تم إضافة "${product.name}" للسلة`);
    animateCartBtn();
  }

  function remove(productId) {
    items = items.filter(i => i.id !== productId);
    save();
    if (typeof renderCartPage === 'function') renderCartPage();
  }

  function updateQty(productId, newQty) {
    if (newQty < 1) { remove(productId); return; }
    const item = items.find(i => i.id === productId);
    if (item) {
      item.quantity = newQty;
      save();
      if (typeof renderCartPage === 'function') renderCartPage();
    }
  }

  function clear() {
    items = [];
    save();
    if (typeof renderCartPage === 'function') renderCartPage();
  }

  function getItems() { return [...items]; }

  function getTotalCount() {
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  }

  function animateCartBtn() {
    const cartBtns = document.querySelectorAll('.nav-btn[href="cart.html"]');
    cartBtns.forEach(btn => {
      btn.classList.add('cart-bounce');
      setTimeout(() => btn.classList.remove('cart-bounce'), 600);
    });
  }

  // Init
  updateCartUI();

  return { add, remove, updateQty, clear, getItems, getTotalCount, getTotalPrice };
})();

// ===== CART PAGE RENDER =====
function renderCartPage() {
  const wrap = document.getElementById('cart-items-wrap');
  const summaryWrap = document.getElementById('cart-summary-wrap');
  if (!wrap) return;

  const items = Cart.getItems();

  if (items.length === 0) {
    wrap.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h3>السلة فارغة</h3>
        <p>لم تقم بإضافة أي منتجات بعد</p>
        <a href="products.html" class="btn-gold" style="display:inline-flex">تسوق الآن</a>
      </div>
    `;
    if (summaryWrap) summaryWrap.style.opacity = '0.5';
    document.getElementById('total-price').textContent = '0 جنيه';
    document.getElementById('subtotal-price').textContent = '0 جنيه';
    return;
  }

  if (summaryWrap) summaryWrap.style.opacity = '1';

  wrap.innerHTML = items.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" 
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2290%22 height=%2290%22><rect fill=%22%23141C2E%22 width=%2290%22 height=%2290%22/><text y=%2245%22 x=%2245%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2232%22>📦</text></svg>'">
      <div class="cart-item-info">
        <div class="cart-item-cat">${CATEGORIES.find(c=>c.id===item.category)?.name || ''}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="quantity-control">
          <button class="qty-btn" onclick="Cart.updateQty(${item.id}, ${item.quantity - 1})">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" onclick="Cart.updateQty(${item.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <div class="cart-item-actions">
        <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()} ج</div>
        <button class="remove-item-btn" onclick="Cart.remove(${item.id})">🗑️ حذف</button>
      </div>
    </div>
  `).join('');

  // Update summary
  const subtotal = Cart.getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  document.getElementById('subtotal-price').textContent = `${subtotal.toLocaleString()} ج`;
  document.getElementById('shipping-price').textContent = shipping === 0 ? 'مجاناً 🎉' : `${shipping} ج`;
  document.getElementById('total-price').textContent = `${total.toLocaleString()} ج`;
}
