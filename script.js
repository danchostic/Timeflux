
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

// Change slide every 6 seconds
setInterval(nextSlide, 6000);
//cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    renderCart(); // Optional: auto-refresh sidebar if open
  });
});
function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItemsDiv.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        $${item.price.toLocaleString()} x ${item.quantity}
      </div>
      <button class="remove-item" data-index="${index}">🗑️</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  cartTotal.textContent = total.toLocaleString();

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });
  });
}

// Open sidebar
document.getElementById("open-cart").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.add("open");
  renderCart();
});

// Close sidebar
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.remove("open");
});




