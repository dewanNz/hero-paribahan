// Define seat IDs
const seatIds = [
  "a1",
  "a2",
  "a3",
  "a4",
  "b1",
  "b2",
  "b3",
  "b4",
  "c1",
  "c2",
  "c3",
  "c4",
  "d1",
  "d2",
  "d3",
  "d4",
  "e1",
  "e2",
  "e3",
  "e4",
  "f1",
  "f2",
  "f3",
  "f4",
  "g1",
  "g2",
  "g3",
  "g4",
  "h1",
  "h2",
  "h3",
  "h4",
  "i1",
  "i2",
  "i3",
  "i4",
  "j1",
  "j2",
  "j3",
  "j4",
];

// Number of seats
const totalSeats = seatIds.length;
const seatPrice = 550; // Price per seat

// Track selected seats
let selectedSeats = 0;
let totalPrice = 0;
let selectedSeatNumbers = [];

// Function to toggle seat selection
function toggleSeat(seatId) {
  const seat = document.getElementById(seatId);
  const seatNumber = seat.textContent;
  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats--;
    totalPrice -= seatPrice;
    selectedSeatNumbers = selectedSeatNumbers.filter(
      (number) => number !== seatNumber
    );
  } else {
    if (selectedSeats < 4) {
      seat.classList.add("selected");
      selectedSeats++;
      totalPrice += seatPrice;
      selectedSeatNumbers.push(seatNumber);
    } else {
      alert("You can only select up to 4 seats.");
    }
  }
  updateUI();
}

// Function to calculate total price
function calculateTotalPrice() {
  return totalPrice;
}
// Function to calculate Grand total price
function calculateGrandTotal(couponCode) {
  let grandTotal = totalPrice;
  if (selectedSeats === 4 && couponCode === "coupon20") {
    grandTotal *= 0.8; // 20% discount
  } else if (selectedSeats === 4 && couponCode === "new15") {
    grandTotal *= 0.85; // 15% discount
  }
  return grandTotal;
}

// Function to update UI elements
function updateUI() {
  const remainingSeats = totalSeats - selectedSeats;
  document.getElementById("selected-seats").textContent = selectedSeats;
  document.getElementById("remaining-seats").textContent = remainingSeats;
  const couponCode = document.getElementById("coupon-code").value;
  document.getElementById("total-price").textContent = calculateTotalPrice();
  document.getElementById("grand-total").textContent =
    calculateGrandTotal(couponCode);
  //document.getElementById("selected-seat-numbers").textContent =
  // selectedSeatNumbers.join(", </br>");

  // Update selected seat numbers and prices
  const selectedSeatsElement = document.getElementById("selected-seat-numbers");
  selectedSeatsElement.innerHTML = "";
  for (let i = 0; i < selectedSeatNumbers.length; i++) {
    const seatNumber = selectedSeatNumbers[i];
    const seatPrice = 550; // Price per seat
    const seatElement = document.createElement("p");
    seatElement.textContent = `${seatNumber} \t\t  Economy \t\t${seatPrice}`;
    seatElement.classList.add("seat-details");
    selectedSeatsElement.appendChild(seatElement);
    if (i < selectedSeatNumbers.length - 1) {
      selectedSeatsElement.appendChild(document.createElement("br")); // Add line break
    }
  }

  const applyButton = document.getElementById("apply-button");
  if (selectedSeats < 4) {
    applyButton.disabled = true;
  } else {
    applyButton.disabled = false;
  }
}

// Function to apply coupon code
function applyCoupon() {
  updateUI();
}

// Assign click event listeners to seats
seatIds.forEach((seatId) => {
  const seat = document.getElementById(seatId);
  seat.addEventListener("click", () => toggleSeat(seatId));
});
