document.addEventListener("DOMContentLoaded", () => {
    // 1. Premium Mobile Side Screen Navigation Drawer
    const initMobileDrawer = () => {
        // Detect relative path prefix from existing logo or CSS link
        const logoLink = document.querySelector(".logo-branded, .logo-new, .logo")?.getAttribute("href") || "./";
        const rootPrefix = (logoLink === "./" || logoLink === "/") ? "" : logoLink;
        const homeHref = logoLink;

        // Create Backdrop
        const backdrop = document.createElement("div");
        backdrop.className = "mobile-drawer-backdrop";
        backdrop.id = "mobile-drawer-backdrop";

        // Create Side Drawer
        const drawer = document.createElement("aside");
        drawer.className = "mobile-drawer";
        drawer.id = "mobile-drawer";
        drawer.setAttribute("aria-label", "Mobile Navigation Menu");

        // Determine current active page
        const currentPath = window.location.pathname.replace(/\/$/, "");

        const navLinksData = [
            { title: "Home", href: homeHref },
            { title: "Commercial Van Insurance", href: `${rootPrefix}van-insurance/commercial-van-insurance/` },
            { title: "Courier Van Insurance", href: `${rootPrefix}commercial-vehicle-insurance/van-insurance/courier-van-insurance/` },
            { title: "Taxi Insurance Hub", href: `${rootPrefix}commercial-vehicle-insurance/taxi-insurance/` },
            { title: "Fleet Insurance Hub", href: `${rootPrefix}commercial-vehicle-insurance/fleet-insurance/` },
            { title: "HGV & Haulage Insurance", href: `${rootPrefix}commercial-vehicle-insurance/hgv-insurance/` },
            { title: "Guides Hub", href: `${rootPrefix}commercial-vehicle-insurance/` },
            { title: "Comparison Guides", href: `${rootPrefix}compare/` },
            { title: "About Us", href: `${rootPrefix}about/` },
            { title: "Contact Us", href: `${rootPrefix}contact/` }
        ];

        let navListHtml = "";
        navLinksData.forEach(item => {
            const isHome = item.title === "Home" && (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/"));
            const isActive = isHome || window.location.href.includes(item.href.replace(/^\.\.\//, "").replace(/^\.\//, ""));
            navListHtml += `
                <li>
                    <a href="${item.href}" class="${isActive ? 'active' : ''}">
                        <span>${item.title}</span>
                        <span class="drawer-arrow">&rsaquo;</span>
                    </a>
                </li>
            `;
        });

        drawer.innerHTML = `
            <div class="mobile-drawer-header">
                <a href="${homeHref}" class="logo logo-branded" style="text-decoration: none;">
                    <span class="logo-text"><span class="logo-ins">Insurance</span><span class="logo-care">Care</span></span>
                </a>
                <button class="mobile-drawer-close" id="mobile-drawer-close-btn" aria-label="Close navigation menu">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>

            <div class="mobile-drawer-contact">
                <div>
                    <span class="contact-label">Freephone UK</span>
                    <a href="tel:08006906008" class="contact-tel">0800 690 6008</a>
                </div>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>

            <div class="mobile-drawer-body">
                <div class="mobile-drawer-section-title">Navigation Menu</div>
                <ul class="mobile-drawer-nav">
                    ${navListHtml}
                </ul>
            </div>

            <div class="mobile-drawer-footer">
                <a href="${rootPrefix}get-matched/" class="btn-drawer-cta">Get Matched Now &rarr;</a>
                <div class="mobile-drawer-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span>FCA-Authorised Broker Panel</span>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);
        document.body.appendChild(drawer);

        const openDrawer = () => {
            backdrop.classList.add("active");
            drawer.classList.add("active");
            document.body.classList.add("mobile-nav-locked");
            document.querySelectorAll(".mobile-nav-toggle, .mobile-nav-toggle-new").forEach(b => b.setAttribute("aria-expanded", "true"));
        };

        const closeDrawer = () => {
            backdrop.classList.remove("active");
            drawer.classList.remove("active");
            document.body.classList.remove("mobile-nav-locked");
            document.querySelectorAll(".mobile-nav-toggle, .mobile-nav-toggle-new").forEach(b => b.setAttribute("aria-expanded", "false"));
        };

        // Attach listeners to all hamburger buttons on the page
        document.querySelectorAll(".mobile-nav-toggle, .mobile-nav-toggle-new").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                openDrawer();
            });
        });

        // Close events
        const closeBtn = document.getElementById("mobile-drawer-close-btn");
        if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
        backdrop.addEventListener("click", closeDrawer);

        // Escape key close
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && drawer.classList.contains("active")) {
                closeDrawer();
            }
        });

        // Close when clicking any nav link
        drawer.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeDrawer);
        });
    };

    initMobileDrawer();

    // 2. Cookie Consent Banner Logic
    const cookieBanner = document.getElementById("cookie-banner");
    const cookieAcceptBtn = document.getElementById("cookie-accept");
    const cookieRejectBtn = document.getElementById("cookie-reject");
    const openCookieSettings = document.getElementById("open-cookie-settings");

    const checkCookieConsent = () => {
        const consent = localStorage.getItem("insurancecare_cookie_consent");
        if (!consent) {
            setTimeout(() => {
                if (cookieBanner) {
                    cookieBanner.style.display = "block";
                    cookieBanner.offsetHeight; // trigger reflow
                    cookieBanner.classList.add("show");
                }
            }, 800);
        }
    };

    if (cookieAcceptBtn && cookieBanner) {
        cookieAcceptBtn.addEventListener("click", () => {
            localStorage.setItem("insurancecare_cookie_consent", "accepted_all");
            localStorage.setItem("insurancecare_consent_timestamp", new Date().toISOString());
            cookieBanner.classList.remove("show");
            setTimeout(() => cookieBanner.style.display = "none", 400);
        });
    }

    if (cookieRejectBtn && cookieBanner) {
        cookieRejectBtn.addEventListener("click", () => {
            localStorage.setItem("insurancecare_cookie_consent", "rejected_non_essential");
            localStorage.setItem("insurancecare_consent_timestamp", new Date().toISOString());
            cookieBanner.classList.remove("show");
            setTimeout(() => cookieBanner.style.display = "none", 400);
        });
    }

    if (openCookieSettings) {
        openCookieSettings.addEventListener("click", (e) => {
            e.preventDefault();
            if (cookieBanner) {
                cookieBanner.style.display = "block";
                cookieBanner.offsetHeight;
                cookieBanner.classList.add("show");
            }
        });
    }

    checkCookieConsent();

    // 3. Multi-Step Matching Form Logic
    const steps = document.querySelectorAll(".form-step");
    const stepDots = document.querySelectorAll(".step-dot");
    const stepProgressBar = document.querySelector(".step-indicator-progress");
    const nextBtn = document.getElementById("form-next-btn");
    const prevBtn = document.getElementById("form-prev-btn");
    const leadForm = document.getElementById("lead-matching-form");
    const formCard = document.getElementById("form-card");

    let currentStep = 0;

    const updateStepIndicators = () => {
        stepDots.forEach((dot, index) => {
            if (index < currentStep) {
                dot.classList.remove("active");
                dot.classList.add("completed");
                dot.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
            } else if (index === currentStep) {
                dot.classList.add("active");
                dot.classList.remove("completed");
                dot.innerHTML = index + 1;
            } else {
                dot.classList.remove("active", "completed");
                dot.innerHTML = index + 1;
            }
        });

        if (stepProgressBar) {
            const progressPercent = (currentStep / (stepDots.length - 1)) * 100;
            stepProgressBar.style.width = `${progressPercent}%`;
        }
    };

    const validateStep = (stepIndex) => {
        let isValid = true;
        const currentStepEl = steps[stepIndex];
        const requiredInputs = currentStepEl.querySelectorAll("[required]");
        
        requiredInputs.forEach(input => {
            input.style.borderColor = "";
            input.style.boxShadow = "";
            
            if (input.type === "checkbox") {
                if (!input.checked) {
                    isValid = false;
                    input.style.outline = "2px solid #EF4444";
                } else {
                    input.style.outline = "";
                }
            } else {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = "#EF4444";
                    input.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";
                }
                
                if (input.type === "email" && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.style.borderColor = "#EF4444";
                        input.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";
                        alert("Please enter a valid email address.");
                    }
                }
                
                if (input.type === "tel" && input.value.trim()) {
                    const stripped = input.value.replace(/[\s\(\)\-\+]/g, "");
                    const ukPhoneRegex = /^(?:0|\+?44)[1-9]\d{8,9}$/;
                    if (stripped.length < 9 || stripped.length > 13) {
                        isValid = false;
                        input.style.borderColor = "#EF4444";
                        input.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";
                        alert("Please enter a valid UK phone number.");
                    }
                }
            }
        });
        
        return isValid;
    };

    const showStep = (stepIndex) => {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? "block" : "none";
        });

        if (prevBtn) {
            prevBtn.style.display = stepIndex === 0 ? "none" : "block";
        }

        if (nextBtn) {
            if (stepIndex === steps.length - 1) {
                nextBtn.innerText = "Submit Enquiry";
            } else {
                nextBtn.innerText = "Next Step";
            }
        }

        updateStepIndicators();
    };

    if (nextBtn && prevBtn && steps.length > 0) {
        showStep(currentStep);

        nextBtn.addEventListener("click", () => {
            if (!validateStep(currentStep)) {
                return;
            }

            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            } else {
                submitLeadForm();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }

    const submitLeadForm = () => {
        if (!leadForm) return;

        const vehicleType = document.getElementById("vehicle_type")?.value || "";
        const usageType = document.getElementById("usage_type")?.value || "";
        const vehicleCount = document.getElementById("vehicle_count")?.value || "";
        const fullName = document.getElementById("full_name")?.value || "";
        const phone = document.getElementById("phone")?.value || "";

        const consentLog = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            form_version: "v2.0_corporate_hybrid",
            consents: {
                callback_requested: true,
                terms_accepted: document.getElementById("consent_terms")?.checked || false,
                marketing_agreed: document.getElementById("consent_marketing")?.checked || false
            }
        };

        localStorage.setItem("insurancecare_last_consent_log", JSON.stringify(consentLog));

        if (formCard) {
            formCard.innerHTML = `
                <div class="thank-you-card">
                    <div class="success-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h2>Thank You, ${fullName.split(" ")[0]}</h2>
                    <p>Your callback enquiry has been successfully logged. We have matched your request with a specialist FCA-authorised broker from our panel.</p>
                    
                    <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 20px; text-align: left; margin-bottom: 24px;">
                        <h4 style="margin-bottom: 8px; font-size: 14px; color: var(--text-primary); font-family: var(--font-heading); font-weight: 700;">What happens next?</h4>
                        <ul style="padding-left: 20px; font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
                            <li style="margin-bottom: 6px;">A representative from your matched FCA-authorised broker will call you shortly on <strong>${phone}</strong>.</li>
                            <li style="margin-bottom: 6px;">The call will display as from a UK landline or mobile number.</li>
                            <li style="margin-bottom: 6px;">They will review your cover needs in detail and offer a tailored quote. There is zero obligation to proceed.</li>
                        </ul>
                    </div>

                    <a href="../" class="btn btn-secondary">Return to Homepage</a>
                </div>
            `;
        }
    };

    // 4. Dynamic Hero CTA Date Generator
    const dynamicDateEl = document.getElementById("dynamic-date");
    if (dynamicDateEl) {
        const today = new Date();
        const day = today.getDate();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[today.getMonth()];
        
        let suffix = "th";
        if (day === 1 || day === 21 || day === 31) {
            suffix = "st";
        } else if (day === 2 || day === 22) {
            suffix = "nd";
        } else if (day === 3 || day === 23) {
            suffix = "rd";
        }
        
        dynamicDateEl.innerText = `${day}${suffix} ${month}`;
    }

    // 5. Clean up markdown divider lists (hide <li>--</li> and empty parents) globally
    document.querySelectorAll("li").forEach(li => {
        const txt = li.innerText.trim();
        if (txt === "--" || txt === "-" || txt === "—") {
            const parent = li.parentElement;
            li.remove();
            if (parent && parent.children.length === 0) {
                parent.remove();
            }
        }
    });
});
