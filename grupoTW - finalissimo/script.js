/* COPY INPUT VALUES TO CARD MOCKUP */
const bounds = document.querySelectorAll('[data-bound]');

for(let i = 0; i < bounds.length; i++) {
  const targetId = bounds[i].getAttribute('data-bound');
  const defValue = bounds[i].getAttribute('data-def');
  const targetEl = document.getElementById(targetId);
  bounds[i].addEventListener('keyup', () => targetEl.innerText = bounds[i].value || defValue );
}


/* TOGGLE CVC DISPLAY MODE */
const cvc_toggler = document.getElementById('cvc_toggler');

cvc_toggler.addEventListener('click', () => {
  const target = cvc_toggler.getAttribute('data-target');
  const el = document.getElementById(target);
  el.setAttribute('type', el.type === 'text' ? 'password' : 'text');
});


/* TIMER COUNTDOWN */
const timer = document.querySelector('[data-id=timer]');
let timeLeft = 5 * 60 + 1;

const tick = () => {
  if (timeLeft > 0) {
    timeLeft--;
    const date = new Date('2000-01-01 00:00:00');
    date.setSeconds(timeLeft);
    const str = date.toISOString();
    timer.children[0].innerText = str[14];
    timer.children[1].innerText = str[15];
    timer.children[3].innerText = str[17];
    timer.children[4].innerText = str[18];
  }
}

setInterval(() => { tick(); }, 1000);
tick();

// Retrieving the products from localStorage
let products = JSON.parse(localStorage.getItem("cart"));

for (let i = 0; i < products.length; i++) {
  let product = products[i];
  let productName = product.name;
  let productQuantity = product.quantity;
  let productPrice = product.price;

  let productElement = document.createElement("li");
  productElement.innerHTML = `${productName} - ${productQuantity} x $${productPrice}`;
  productsList.appendChild(productElement);
}