// Step A: Read the movie name from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieName = urlParams.get("movie") || "Unknown Movie";

// Display it at the top of the page
document.getElementById("movie-name-display").textContent = movieName;

// Step B: List of available showtimes (you can adjust these)
const showtimes = [
    { date: "2026-06-20", time: "10:00 AM" },
    { date: "2026-06-20", time: "1:30 PM" },
    { date: "2026-06-20", time: "5:00 PM" },
    { date: "2026-06-20", time: "9:00 PM" },
    { date: "2026-06-21", time: "11:00 AM" },
    { date: "2026-06-21", time: "3:30 PM" },
    { date: "2026-06-21", time: "7:00 PM" },
];

// This will store the user's choice once they pick one
let selectedShowtime = null;

// Step C: Build the showtime buttons dynamically
function renderShowtimes() {
    const step1Div = document.getElementById("step1");

    // Start with the heading, then add a container for buttons
    step1Div.innerHTML = `
        <h2>Choose Date & Showtime</h2>
        <div class="showtime-grid" id="showtime-grid"></div>
        <button id="step1-next" class="btn" disabled>Continue to Seats</button>
    `;

    const grid = document.getElementById("showtime-grid");

    // Loop through each showtime and create a button for it
    showtimes.forEach((show, index) => {
        const btn = document.createElement("button");
        btn.className = "showtime-btn";
        btn.textContent = `${show.date} — ${show.time}`;

        // When clicked, mark this as selected
        btn.addEventListener("click", () => {
            selectedShowtime = show;

            // Remove "selected" style from all buttons first
            document.querySelectorAll(".showtime-btn").forEach(b => b.classList.remove("selected"));
            // Add "selected" style to the one just clicked
            btn.classList.add("selected");

            // Enable the "Continue" button now that something is picked
            document.getElementById("step1-next").disabled = false;
        });

        grid.appendChild(btn);
    });

    // Wire up the "Continue to Seats" button
    document.getElementById("step1-next").addEventListener("click", goToStep2);
}

// Run this function when the page loads
renderShowtimes();

// Step D: Seat map data and rendering

// Define seat categories with pricing
const seatCategories = {
    recliner: { rows: ["A", "B"], price: 800, label: "Recliner" },
    vip: { rows: ["C", "D", "E"], price: 500, label: "VIP" },
    regular: { rows: ["F", "G", "H"], price: 300, label: "Regular" },
};

const seatsPerRow = 10;

// Randomly mark some seats as already booked (for demo purposes)
const bookedSeats = ["A3", "A4", "C5", "C6", "F1", "F2", "F9", "H7"];

// This will store the seats the user selects
let selectedSeats = [];

// Helper: figure out which category a row belongs to
function getCategoryForRow(row) {
    for (const key in seatCategories) {
        if (seatCategories[key].rows.includes(row)) {
            return { key, ...seatCategories[key] };
        }
    }
}

function renderSeatMap() {
    const step2Div = document.getElementById("step2");

    step2Div.innerHTML = `
        <h2>Select Your Seats</h2>
        <div class="screen">SCREEN</div>
        <div class="seat-map" id="seat-map"></div>
        <div class="seat-legend">
            <span><span class="seat-box available"></span> Available</span>
            <span><span class="seat-box selected"></span> Selected</span>
            <span><span class="seat-box booked"></span> Booked</span>
        </div>
        <div class="price-summary" id="price-summary">
            Selected: 0 seats — Total: Rs 0
        </div>
        <button id="step2-next" class="btn" disabled>Continue to Payment</button>
    `;

    const seatMap = document.getElementById("seat-map");

    // Get all row letters in order (A through H)
    const allRows = ["A", "B", "C", "D", "E", "F", "G", "H"];

    allRows.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "seat-row";

        // Row label (A, B, C...)
        const rowLabel = document.createElement("span");
        rowLabel.className = "row-label";
        rowLabel.textContent = row;
        rowDiv.appendChild(rowLabel);

        // Create each seat in this row
        for (let i = 1; i <= seatsPerRow; i++) {
            const seatId = `${row}${i}`;
            const seatBtn = document.createElement("button");
            seatBtn.className = "seat";
            seatBtn.textContent = i;
            seatBtn.dataset.seatId = seatId;

            if (bookedSeats.includes(seatId)) {
                // Already booked — can't click
                seatBtn.classList.add("booked");
                seatBtn.disabled = true;
            } else {
                // Available — clicking toggles selection
                seatBtn.addEventListener("click", () => toggleSeat(seatBtn, seatId, row));
            }

            rowDiv.appendChild(seatBtn);
        }

        seatMap.appendChild(rowDiv);
    });

    // Wire up the "Continue to Payment" button
    document.getElementById("step2-next").addEventListener("click", goToStep3);
}

function toggleSeat(seatBtn, seatId, row) {
    const category = getCategoryForRow(row);

    if (selectedSeats.find(s => s.id === seatId)) {
        // Already selected — deselect it
        selectedSeats = selectedSeats.filter(s => s.id !== seatId);
        seatBtn.classList.remove("selected");
    } else {
        // Not selected — select it
        selectedSeats.push({ id: seatId, price: category.price, category: category.label });
        seatBtn.classList.add("selected");
    }

    updatePriceSummary();
}

function updatePriceSummary() {
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    document.getElementById("price-summary").textContent =
        `Selected: ${selectedSeats.length} seats — Total: Rs ${total}`;

    // Enable "Continue" button only if at least 1 seat is picked
    document.getElementById("step2-next").disabled = selectedSeats.length === 0;
}

// Step G: Payment screen (demo only — no real processing)

function renderPayment() {
    const step3Div = document.getElementById("step3");
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    step3Div.innerHTML = `
        <h2>Payment</h2>

        <div class="order-summary">
            <h3>Order Summary</h3>
            <p><strong>Movie:</strong> ${movieName}</p>
            <p><strong>Showtime:</strong> ${selectedShowtime.date} — ${selectedShowtime.time}</p>
            <p><strong>Seats:</strong> ${selectedSeats.map(s => s.id).join(", ")}</p>
            <p class="total-line"><strong>Total: Rs ${total}</strong></p>
        </div>

        <h3>Choose Payment Method</h3>
        <div class="payment-options" id="payment-options">
            <button class="payment-btn" data-method="card"> Credit / Debit Card</button>
            <button class="payment-btn" data-method="esewa">eSewa</button>
            <button class="payment-btn" data-method="khalti"> Khalti</button>
            <button class="payment-btn" data-method="cash"> Pay at Counter</button>
        </div>

        <p class="payment-note">Note: This is a demo project — no real payment will be processed.</p>

        <button id="step3-next" class="btn" disabled>Confirm Booking</button>
    `;

    // Let user pick ONE payment method
    document.querySelectorAll(".payment-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".payment-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            document.getElementById("step3-next").disabled = false;
        });
    });

    document.getElementById("step3-next").addEventListener("click", goToStep4);
}

// Step H: Generate and display the final ticket

function renderTicket() {
    const step4Div = document.getElementById("step4");
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    // Generate a random booking ID for realism
    const bookingId = "AABS-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    step4Div.innerHTML = `
        <h2> Booking Confirmed!</h2>

        <div class="ticket" id="ticket">
            <div class="ticket-header">
                <h2>AABS Movies</h2>
                <p>E-Ticket</p>
            </div>
            <div class="ticket-body">
                <p><strong>Booking ID:</strong> ${bookingId}</p>
                <p><strong>Movie:</strong> ${movieName}</p>
                <p><strong>Date & Time:</strong> ${selectedShowtime.date} — ${selectedShowtime.time}</p>
                <p><strong>Seats:</strong> ${selectedSeats.map(s => s.id).join(", ")}</p>
                <p><strong>Total Paid:</strong> Rs ${total}</p>
            </div>
            <div class="ticket-footer">
                <p>Please arrive 15 minutes before showtime.</p>
            </div>
        </div>

        <button id="download-ticket" class="btn">⬇ Download Ticket</button>
        <a href="web_page.html" class="btn btn-secondary">Back to Home</a>
    `;

    document.getElementById("download-ticket").addEventListener("click", downloadTicket);
}

function downloadTicket() {
    const ticketHTML = document.getElementById("ticket").outerHTML;

    // Build a small standalone HTML page containing just the ticket + its styles
    const fullPage = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>AABS Movies Ticket</title>
            <link rel="stylesheet" href="booking.css">
        </head>
        <body style="background:#0a0a0a; padding:40px;">
            ${ticketHTML}
        </body>
        </html>
    `;

    // Create a downloadable file in the browser
    const blob = new Blob([fullPage], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "AABS-Movie-Ticket.html";
    link.click();

    URL.revokeObjectURL(url);
}

// Step F: Navigate between steps
function goToStep2() {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");

    document.getElementById("step1-indicator").classList.remove("active");
    document.getElementById("step2-indicator").classList.add("active");

    renderSeatMap();
}

function goToStep3() {
    document.getElementById("step2").classList.add("hidden");
    document.getElementById("step3").classList.remove("hidden");

    document.getElementById("step2-indicator").classList.remove("active");
    document.getElementById("step3-indicator").classList.add("active");

    renderPayment();
}

function goToStep4() {
    document.getElementById("step3").classList.add("hidden");
    document.getElementById("step4").classList.remove("hidden");

    document.getElementById("step3-indicator").classList.remove("active");
    document.getElementById("step4-indicator").classList.add("active");

    renderTicket();
}

// Step E: Hide/show navbar on scroll
let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN and past 100px — hide navbar
        header.classList.add("hide-nav");
    } else {
        // Scrolling UP — show navbar
        header.classList.remove("hide-nav");
    }

    lastScrollY = currentScrollY;
});