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

// Get the up arrow element
const upArrow = document.getElementById("up-arrow");
const footer = document.querySelector(".slide-up-footer");
let isOpen = false;

// Add an event listener to toggle the "show" class
upArrow.addEventListener("click", toggleFooter);
upArrow.addEventListener("mouseover", toggleFooter);

function toggleFooter() {
  if (isOpen) {
    footer.style.bottom = "-100%";
    upArrow.style.transform = "rotate(0deg)";
  } else {
    footer.style.bottom = "0";
    upArrow.style.transform = "rotate(180deg)";
  }
  isOpen = !isOpen;
}

function displayInfo() {
  document.getElementById("info-text").innerHTML = "Enter email:";
  document.getElementById("info-text").classList.add("visible")
}

function displaySecondInfo() {
  document.getElementById("info-text2").innerHTML = "Please enter a valid email address.";
  document.getElementById("info-text2").classList.add("visible")
}

document.getElementById("newsletter-form").addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the default behavior of the form (submitting and reloading the page)

  var emailInput = document.getElementById("email-input");
  if (!validateEmail(emailInput.value)) {
      // display an error message
      document.getElementById("info-text2").innerHTML = "Please enter a valid email address.";
  } else {
      // update the text of info-text
      document.getElementById("info-text").innerHTML = "Thank you for subscribing!";
      document.getElementById("info-text2").innerHTML = "";
      document.getElementById("info-text").classList.add("submited");
  }
});

function validateEmail(email) {
  var re = /^\S+@\S+.\S+$/;
  return re.test(String(email).toLowerCase());
}


// Sign up form
const signupForm = document.querySelector('#signup-form');
const signupUsernameInput = signupForm.querySelector('input[name="txt"]');
const signupEmailInput = signupForm.querySelector('input[name="email"]');
const signupPasswordInput = signupForm.querySelector('input[name="pswd"]');

signupForm.addEventListener('submit', e => {
  e.preventDefault();

  const username = signupUsernameInput.value;
  const email = signupEmailInput.value;
  const password = signupPasswordInput.value;

  if (!username) {
    alert('Please enter a username.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!validatePassword(password)) {
    alert('Password must be at least 8 characters long and contain a number, a symbol, an uppercase and a lowercase letter.');
    return;
  }

  // If all validation passed, submit the form
  // You can also add a callback function to handle the form data after it's been submitted
  signupForm.submit();
});

// Login form
const loginForm = document.querySelector('#login-form');
const loginEmailInput = loginForm.querySelector('input[name="email"]');
const loginPasswordInput = loginForm.querySelector('input[name="pswd"]');
let main_node = document.getElementById("main");
// Example default user account
const defaultUser = {
  email: 'test@example.com',
  password: 'password',
  username: 'grupo 15'
}

loginForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get email and password from form
  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  // Validate email and password
  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!password) {
    alert('Please enter your password.');
    return;
  }

  // Check if the user is valid
  if (isValidUser(email, password)) {
    alert('Logged in successfully');
    main.style.display = "none";
    document.getElementById("value").innerHTML = defaultUser.username;
  } else {
    alert('Invalid email or password');
  }
});

function isValidUser(email, password) {
  if (email === defaultUser.email && password === defaultUser.password) {
    document.getElementById("value").innerHTML = defaultUser.username;
    return true;
  }
  return false;
}


const slideBtn = document.getElementById("slide-btn");
const slideContainer = document.querySelector(".slide-container");

slideBtn.addEventListener("click", function () {
  slideContainer.classList.toggle("slide-in");
});

document.getElementById("log-btn").addEventListener("click", function(){
  if(main_node.style.display === "block"){
    main_node.style.display = "none";
    main_node.classList.remove("popup");
  }else{
    main_node.style.display = "block";
    main_node.classList.add("popup");
  }
});

let opinionsFormContainer = document.querySelector("#opinions-form-container");
let opinionsCollectorBtn = document.querySelector("#opinions-collector-btn");

opinionsCollectorBtn.addEventListener("click", function(){
  opinionsFormContainer.style.display = opinionsFormContainer.style.display === "none" ? "block" : "none";
});

/*document.addEventListener("click", function(event){
  if(event.target != opinionsFormContainer && !opinionsFormContainer.contains(event.target)){
    opinionsFormContainer.classList.remove("show");
  }
});*/
