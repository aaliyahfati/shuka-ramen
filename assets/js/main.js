document.addEventListener("DOMContentLoaded", () => {
    // 1. Load Navbar
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (navbarPlaceholder) {
        fetch("components/navbar.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load navbar");
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                setActiveNavLink();
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    // 2. Load Footer
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("components/footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load footer");
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error("Error loading footer:", error));
    }

    // 3. Set Active Navigation Link dynamically
    function setActiveNavLink() {
        // Get current page filename (e.g., 'about.html')
        let path = window.location.pathname;
        let page = path.split("/").pop();
        
        // Default to index.html if at root
        if (page === "" || page === "/") {
            page = "index.html";
        }

        const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
        
        navLinks.forEach(link => {
            // Reset all links to default custom style
            link.classList.remove("nav-link-active");
            link.classList.add("nav-link-custom");
            
            // If the href matches the current page, set it to active
            const href = link.getAttribute("href");
            if (href === page) {
                link.classList.remove("nav-link-custom");
                link.classList.add("nav-link-active");
            }
        });
    }

    // 4. Reservation Page - Guest Counter Logic
    const btnDecrease = document.getElementById('btn-decrease-guests');
    const btnIncrease = document.getElementById('btn-increase-guests');
    const guestDisplay = document.getElementById('guest-count-display');
    const guestInput = document.getElementById('guest-count-input');

    if (btnDecrease && btnIncrease && guestDisplay && guestInput) {
        btnDecrease.addEventListener('click', () => {
            let currentVal = parseInt(guestDisplay.innerText);
            if (currentVal > 8) { // Limit to 8 guests min per booking online
                currentVal--;
                guestDisplay.innerText = currentVal;
                guestInput.value = currentVal;
            }
        });

        btnIncrease.addEventListener('click', () => {
            let currentVal = parseInt(guestDisplay.innerText);
            if (currentVal < 20) { // Limit to 20 guests max per booking online
                currentVal++;
                guestDisplay.innerText = currentVal;
                guestInput.value = currentVal;
            }
        });
    }

    // 5. Reservation Form Validation & Modal
    const reserveForm = document.getElementById('reservation-form');
    const btnReserveNow = document.getElementById('btn-reserve-now');
    if (reserveForm && btnReserveNow) {
        btnReserveNow.addEventListener('click', () => {
            if (reserveForm.checkValidity()) {
                // Populate modal
                document.getElementById('confirm-name').innerText = document.getElementById('input-name').value;
                document.getElementById('confirm-email').innerText = document.getElementById('input-email').value;
                
                // Format date nicely
                const dateVal = document.getElementById('input-date').value;
                if (dateVal) {
                    const dateObj = new Date(dateVal);
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    document.getElementById('confirm-date').innerText = dateObj.toLocaleDateString('en-US', options);
                } else {
                    document.getElementById('confirm-date').innerText = '-';
                }
                
                document.getElementById('confirm-time').innerText = document.getElementById('input-time').value;
                document.getElementById('confirm-guests').innerText = document.getElementById('guest-count-input').value + ' People';
                
                const requests = document.getElementById('input-requests').value;
                document.getElementById('confirm-requests').innerText = requests ? requests : 'None';
                
                // Show modal
                const modalElement = document.getElementById('confirmationModal');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                // Trigger HTML5 validation UI
                reserveForm.reportValidity();
            }
        });
    }
});
