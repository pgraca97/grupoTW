document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    let menuOpen = false;
    menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
            menuBtn.classList.add('open');
            menu.classList.add('open');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            menu.classList.remove('open');
            menuOpen = false;
        }
    });
});

const slider = document.querySelector('.product-slider');
slider.addEventListener("wheel", (event) => {
    event.preventDefault();

    let [x, y] = [event.deltaX, event.deltaY];
    let magnitude;

    if (x === 0) {
      magnitude = y > 0 ? -30 : 30;
    } else {
      magnitude = x;
    }

    //console.log({ x, y, magnitude });
    slider.scrollBy({
      left: magnitude
    });
  });

  var factsButton = document.getElementById("facts-button");
  var textBox = document.getElementById("draggable-text-box");

  factsButton.addEventListener("click", function() {
    textBox.classList.toggle("hidden");
  });

  let offset = { x: 0, y: 0 };

textBox.addEventListener("mousedown", function(event) {
    offset.x = event.clientX - textBox.offsetLeft;
    offset.y = event.clientY - textBox.offsetTop;
    textBox.style.position = "absolute";
    textBox.style.cursor = "grabbing";
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
});

function mousemove(event) {
    let left = event.clientX - offset.x;
    let top = event.clientY - offset.y;
    let viewportWidth = document.documentElement.clientWidth;
    let viewportHeight = document.documentElement.clientHeight;
    let textBoxWidth = textBox.offsetWidth;
    let textBoxHeight = textBox.offsetHeight;
    if (left < 0) {
      left = 0;
    } else if (left + textBoxWidth > viewportWidth) {
      left = viewportWidth - textBoxWidth;
    }
    if (top < 0) {
      top = 0;
    } else if (top + textBoxHeight > viewportHeight) {
      top = viewportHeight - textBoxHeight;
    }
    textBox.style.left = left + "px";
    textBox.style.top = top + "px";
  }


function mouseup() {
    textBox.style.cursor = "grab";
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
}

const closeButton = document.getElementById("close-text-box");
closeButton.addEventListener("click", function() {
  textBox.classList.toggle("hidden");
});

const decrementButton = document.querySelector(".decrement-quantity");
const incrementButton = document.querySelector(".increment-quantity");
const quantityDisplay = document.querySelector(".quantity-display");
let quantity = 1;
const maxQuantity = 4;
const shoppingCart = document.getElementById("shopping-cart");

let remainingStock = maxQuantity;
decrementButton.addEventListener("click", function() {
  if(quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
      incrementButton.disabled = false;
      // Check if the tooltip element is present and remove it
      const tooltip = incrementButton.querySelector(".tooltip");
      if (tooltip) {
          incrementButton.removeChild(tooltip);
      }
  }
  if (quantity === 0 || remainingStock === 0) {
      addToCartBtn.disabled = true;
  }  else {
    incrementButton.disabled = false;
    decrementButton.disabled = false;
    addToCartBtn.disabled = false;
  }
});


incrementButton.addEventListener("click", function() {
  if(quantity < remainingStock) {
      quantity++;
      quantityDisplay.textContent = quantity;
      incrementButton.disabled = false;
  } 
  if (quantity === 0 || remainingStock === 0) {
      incrementButton.disabled = true;
      const tooltip = document.createElement("div");
      tooltip.setAttribute("data-tooltip", "");
      tooltip.innerHTML = "Sorry, no more products available";
      incrementButton.appendChild(tooltip);
      
  }
});

function addProductQuantityButtons(productDiv, existingProduct) {
  productDiv.innerHTML = `
    <img src="${existingProduct.src}" alt="${existingProduct.name}">
    <h4>"${existingProduct.name}"</h4>
    <p>${existingProduct.price}</p>
    <button class="decrement-quantity-btn">-</button>
    <span class="product-quantity">${existingProduct.quantity}</span>
    <button class="increment-quantity-btn">+</button>
  `;

  // Get the new plus and minus buttons
  const decrementButton = productDiv.querySelector(".decrement-quantity-btn");
  const incrementButton = productDiv.querySelector(".increment-quantity-btn");
  const productQuantity = productDiv.querySelector(".product-quantity");

  // Add click event listeners to the plus and minus buttons
  decrementButton.addEventListener("click", function() {
    if (existingProduct.quantity > 1) {
      existingProduct.quantity--;
      remainingStock++;
      quantityDisplay.textContent = remainingStock;
      productQuantity.textContent = existingProduct.quantity;
      currentCount = existingProduct.quantity;
      cartCount.innerHTML = `(${currentCount})`;
      if (remainingStock > 0) {
        incrementButton.disabled = false;
        decrementButton.disabled = false;
        addToCartBtn.disabled = false;
        const tooltip = addToCartBtn.querySelector("[data-tooltip]");
        if (tooltip) {
            addToCartBtn.removeChild(tooltip);
        }
      }
    }
  });
  incrementButton.addEventListener("click", function() {
    if (existingProduct.quantity < maxQuantity) {
      existingProduct.quantity++;
      remainingStock--;
      quantityDisplay.textContent = remainingStock;
      productQuantity.textContent = existingProduct.quantity;
      currentCount = existingProduct.quantity;
      cartCount.innerHTML = `(${currentCount})`;
    }else{
      alert("Sorry, no more products available");
    } 
  });
}
const checkoutButton = document.createElement("button");
function addCheckoutButton() {
  
  checkoutButton.textContent = "CHECKOUT";
  checkoutButton.classList.add("checkout-btn");
  if (currentCount > 0) {
    shoppingCart.appendChild(checkoutButton);
  } else {
    shoppingCart.removeChild(checkoutButton);
  }
  checkoutButton.addEventListener("click", function() {
    // your checkout process here
  });
}


function addDeleteButton(productDiv, existingProduct) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE";
  deleteButton.classList.add("delete-btn");
  productDiv.appendChild(deleteButton);

  deleteButton.addEventListener("click", function() {
    const index = cart.indexOf(existingProduct);
    cart.splice(index, 1);
    productDiv.remove();
    remainingStock += existingProduct.quantity;
    currentCount -= existingProduct.quantity;
    cartCount.innerHTML = `(${currentCount})`;
    quantityDisplay.textContent = remainingStock;
    quantity = 1;
    if (remainingStock > 0) {
      incrementButton.disabled = false;
      decrementButton.disabled = false;
      addToCartBtn.disabled = false;
      const tooltip = addToCartBtn.querySelector("[data-tooltip]");
      if (tooltip) {
          addToCartBtn.removeChild(tooltip);
      }
    if (currentCount === 0) {
      shoppingCart.removeChild(checkoutButton);
    }
  } 

});  addCheckoutButton();
}

checkoutButton.addEventListener("click", function() {
  window.location.href = 'checkout.html';
});

const addToCartBtn = document.getElementById("add-to-cart-btn");
const cartCount = document.getElementById("cart-count");
const slide1 = document.querySelector("#slide-1");
const imageSrc = slide1.src;
let image = document.querySelector('.product-slider img');
let value = document.getElementById("value");

let cart = [];

let currentCount = 0;


addToCartBtn.addEventListener("click", function() {
  
  remainingStock -= quantity;
  currentCount += quantity;  
  cartCount.innerHTML = `(${currentCount})`;
  let product = {
    name: image.alt,
    price: value.textContent,
    src: imageSrc,
    quantity: currentCount,
  }
  quantity = remainingStock;
  quantityDisplay.textContent = remainingStock;
  // Create a new div to represent the product
  


  let existingProduct = cart.find(p => p.name === product.name);
  let productDiv;
  if (existingProduct) {
    if (existingProduct.quantity) {
      existingProduct.quantity = product.quantity;
    } else {
      existingProduct.quantity = maxQuantity;
    }
    productDiv = document.querySelector(`div[data-name="${product.name}"]`);
    productDiv.innerHTML = `
    <img src="${product.src}" alt="${product.name}">
    <h4>"${product.name}"</h4>
    <p>${product.price}</p>
    <p>quantity: ${product.quantity}</p>
  `;
    //Call the function here 
    addProductQuantityButtons(productDiv, existingProduct);
    addDeleteButton(productDiv, existingProduct);
  } else {
    cart.push(product);
    productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.setAttribute("data-name", product.name);
    productDiv.innerHTML = `
    <img src="${product.src}" alt="${product.name}">
    <h4>"${product.name}"</h4>
    <p>${product.price}</p>
    <p>quantity: ${product.quantity}</p>
  `;
    shoppingCart.appendChild(productDiv);
    addProductQuantityButtons(productDiv, product);
    addDeleteButton(productDiv, product);
  }


  if (quantity === 0 || remainingStock === 0) {
    incrementButton.disabled = true;
    decrementButton.disabled = true;
    addToCartBtn.disabled = true;
    const tooltip = document.createElement("div");
    tooltip.setAttribute("data-tooltip", "");
    tooltip.innerHTML = "Sorry, no more products available";
    addToCartBtn.appendChild(tooltip);
} else {
    // Check if the tooltip element is present and remove it
    const tooltip = addToCartBtn.querySelector(".tooltip");
    if (tooltip) {
        addToCartBtn.removeChild(tooltip);
    }
    incrementButton.disabled = false;
    decrementButton.disabled = false;
    addToCartBtn.disabled = false;
}    
});


const cartMenuItem = document.getElementById("cart");
const closeShoppingCart = document.getElementById("close-shopping-cart");


cartMenuItem.addEventListener("click", function() {
  if(shoppingCart.classList.contains("hidden")){
    shoppingCart.classList.remove("hidden");
  }else{
    shoppingCart.classList.add("show");
  }
});
closeShoppingCart.addEventListener("click", function() {
  if(shoppingCart.classList.contains("show")){
    shoppingCart.classList.remove("show");
  }else{
    shoppingCart.classList.add("hidden");
  }
});

