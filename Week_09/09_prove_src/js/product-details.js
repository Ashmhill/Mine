let queryString = window.location.search;
let params = new URLSearchParams(queryString);
let id = params.get("id");
console.log(id);

async function loadDetails() {
  let response = await fetch("js/dental.json");
  let details = await response.json();
  console.log(details);

  let productsDetails = document.getElementById("description");
  let matchingDetails = details.find(x => x.id == Number(id));
  if (matchingDetails) {
    productsDetails.innerHTML =
      `<h2>${matchingDetails.name}</h2>
        <p>${matchingDetails.description}</p>
        <p>Price: ${matchingDetails.price ? matchingDetails.price : ""}</p>
        <img src="${matchingDetails.imageUrl}" alt="${matchingDetails.name}">`;
  } else {
    productsDetails.textContent = "Product not found.";
  }

  let overlay = document.getElementById("overlay");
  // Show overlay: remove inert, set aria-hidden to false
  overlay.style.display = "block";
  overlay.removeAttribute("inert");
  overlay.setAttribute("aria-hidden", "false");

  // Dismiss function for all closing scenarios
  function dismissOverlay() {
    // Move focus to main content before hiding, for a11y
    productsDetails.setAttribute("tabindex", "-1");
    productsDetails.focus();
    overlay.style.display = "none";
    overlay.setAttribute("inert", ""); // makes all children non-focusable
    overlay.setAttribute("aria-hidden", "true");
  }

  // Click-outside modal to dismiss
  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) {
      dismissOverlay();
    }
  });

  // ESC key to dismiss
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      dismissOverlay();
    }
  });

  // Sign Up button to dismiss, but only if email is filled
  document.getElementById("signup-btn").addEventListener("click", function() {
    let email = document.getElementById("signup-email").value.trim();
    if (email) {
      dismissOverlay();
    } else {
      alert("Please enter your email address.");
      document.getElementById("signup-email").focus();
    }
  });

  console.log(matchingDetails);
}
loadDetails();
