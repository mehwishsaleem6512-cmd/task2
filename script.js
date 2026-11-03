/**
 * DREAMHOME INTERIOR & DESIGN
 * Interactive JavaScript for Dark Mode, Mobile Menu, WhatsApp & Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Dark Mode / Light Mode Toggle with LocalStorage
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check saved theme in localStorage or system preference
    const savedTheme = localStorage.getItem('dreamhome_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('dreamhome_theme', newTheme);
        });
    }

    // ----------------------------------------------------
    // 2. Mobile Hamburger Navigation Menu & Overlay
    // ----------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMobileMenu(open) {
        if (!navMenu || !mobileMenuBtn) return;
        const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('open');

        if (shouldOpen) {
            navMenu.classList.add('open');
            if (navOverlay) navOverlay.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            document.body.style.overflow = 'hidden';
        } else {
            navMenu.classList.remove('open');
            if (navOverlay) navOverlay.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', () => toggleMobileMenu(false));
    }

    // Close menu when any nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // ----------------------------------------------------
    // 3. "Ask Question" Modal Dialog Functionality
    // ----------------------------------------------------
    const askModal = document.getElementById('askModal');
    const openAskModalBtn = document.getElementById('openAskModalBtn');
    const heroConsultBtn = document.getElementById('heroConsultBtn');
    const openCtaModalBtn = document.getElementById('openCtaModalBtn');
    const closeAskModalBtn = document.getElementById('closeAskModalBtn');
    const askForm = document.getElementById('askForm');
    const categorySelect = document.getElementById('userCategory');
    const serviceInquireBtns = document.querySelectorAll('.service-inquire-btn');

    // Function to open modal
    function openModal(prefillCategory = null) {
        if (askModal) {
            if (prefillCategory && categorySelect) {
                categorySelect.value = prefillCategory;
            }
            askModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        }
    }

    // Function to close modal
    function closeModal() {
        if (askModal) {
            askModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    if (openAskModalBtn) openAskModalBtn.addEventListener('click', () => openModal());
    if (heroConsultBtn) heroConsultBtn.addEventListener('click', () => openModal());
    if (openCtaModalBtn) openCtaModalBtn.addEventListener('click', () => openModal());
    if (closeAskModalBtn) closeAskModalBtn.addEventListener('click', closeModal);

    // Event listeners for service-specific inquire buttons
    serviceInquireBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceName = e.currentTarget.getAttribute('data-service');
            openModal(serviceName);
        });
    });

    // Close modal if user clicks outside of modal-box
    if (askModal) {
        askModal.addEventListener('click', (e) => {
            if (e.target === askModal) {
                closeModal();
            }
        });
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeProjectModal();
        }
    });

    // ----------------------------------------------------
    // 4. Ask Form Submit -> Send Directly via WhatsApp
    // ----------------------------------------------------
    // REPLACE THIS NUMBER WITH YOUR OFFICIAL WHATSAPP NUMBER (with country code, no + or spaces)
    const COMPANY_WHATSAPP_NUMBER = "923001234567";

    if (askForm) {
        askForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('userName').value.trim();
            const phone = document.getElementById('userPhone').value.trim();
            const category = document.getElementById('userCategory').value;
            const question = document.getElementById('userQuestion').value.trim();

            if (!name || !question) {
                alert('Please fill in your name and question.');
                return;
            }

            // Construct encoded WhatsApp message
            const messageText = 
                `*New Inquiry - DreamHome Interior & Design*%0A` +
                `----------------------------------%0A` +
                `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
                `🏢 *Service:* ${encodeURIComponent(category)}%0A` +
                `💬 *Question/Requirement:*%0A${encodeURIComponent(question)}%0A` +
                `----------------------------------`;

            const waUrl = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${messageText}`;

            // Open WhatsApp in new tab
            window.open(waUrl, '_blank');

            // Reset form and close modal
            askForm.reset();
            closeModal();
        });
    }

    // ----------------------------------------------------
    // 5. Portfolio Interactive Category Filter
    // ----------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ----------------------------------------------------
    // 6. Project Details Lightbox Modal
    // ----------------------------------------------------
    const projectModal = document.getElementById('projectModal');
    const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
    const projectViewBtns = document.querySelectorAll('.portfolio-view-btn');
    const projectModalImg = document.getElementById('projectModalImg');
    const projectModalCat = document.getElementById('projectModalCat');
    const projectModalTitle = document.getElementById('projectModalTitle');
    const projectModalMeta = document.getElementById('projectModalMeta');
    const projectModalDesc = document.getElementById('projectModalDesc');
    const projectModalInquireBtn = document.getElementById('projectModalInquireBtn');
    let currentActiveProjectTitle = '';

    function openProjectModal(data) {
        if (!projectModal) return;
        currentActiveProjectTitle = data.title;
        if (projectModalImg) projectModalImg.src = data.img;
        if (projectModalCat) projectModalCat.textContent = data.category;
        if (projectModalTitle) projectModalTitle.textContent = data.title;
        if (projectModalMeta) projectModalMeta.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.location} | ${data.size}`;
        if (projectModalDesc) projectModalDesc.textContent = data.desc;

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    projectViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const data = {
                title: btn.getAttribute('data-title'),
                category: btn.getAttribute('data-category'),
                location: btn.getAttribute('data-location'),
                size: btn.getAttribute('data-size'),
                desc: btn.getAttribute('data-desc'),
                img: btn.getAttribute('data-img')
            };
            openProjectModal(data);
        });
    });

    if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // Project modal inquire button -> opens WhatsApp ask modal
    if (projectModalInquireBtn) {
        projectModalInquireBtn.addEventListener('click', () => {
            closeProjectModal();
            openModal();
            const questionInput = document.getElementById('userQuestion');
            if (questionInput) {
                questionInput.value = `I am interested in designing a space similar to your project: "${currentActiveProjectTitle}". Please share pricing and feasibility details.`;
            }
        });
    }

    // Spotlight project button
    const spotlightInquireBtn = document.getElementById('spotlightInquireBtn');
    if (spotlightInquireBtn) {
        spotlightInquireBtn.addEventListener('click', () => {
            const waUrl = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=Hello%20DreamHome!%20I%20am%20interested%20in%20a%20luxury%20design%20similar%20to%20The%20Obsidian%20Penthouse.`;
            window.open(waUrl, '_blank');
        });
    }

    // ----------------------------------------------------
    // 8. Contact Page Form Submit -> WhatsApp
    // ----------------------------------------------------
    const contactPageForm = document.getElementById('contactPageForm');
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName')?.value.trim() || '';
            const phone = document.getElementById('contactPhone')?.value.trim() || '';
            const email = document.getElementById('contactEmail')?.value.trim() || 'Not Provided';
            const service = document.getElementById('contactService')?.value || '';
            const city = document.getElementById('contactCity')?.value.trim() || '';
            const budget = document.getElementById('contactBudget')?.value || '';
            const message = document.getElementById('contactMessage')?.value.trim() || '';

            if (!name || !phone || !message) {
                alert('Please fill in your name, phone, and requirements.');
                return;
            }

            const formattedMsg = 
                `*New Detailed Inquiry - DreamHome Interior & Design*%0A` +
                `==================================%0A` +
                `👤 *Client Name:* ${encodeURIComponent(name)}%0A` +
                `📞 *Phone / WhatsApp:* ${encodeURIComponent(phone)}%0A` +
                `✉️ *Email:* ${encodeURIComponent(email)}%0A` +
                `🏛️ *Service Required:* ${encodeURIComponent(service)}%0A` +
                `📍 *Project Location:* ${encodeURIComponent(city)}%0A` +
                `💰 *Estimated Budget:* ${encodeURIComponent(budget)}%0A` +
                `📝 *Project Details:*%0A${encodeURIComponent(message)}%0A` +
                `==================================`;

            const waUrl = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${formattedMsg}`;
            window.open(waUrl, '_blank');
            contactPageForm.reset();
        });
    }

    // ----------------------------------------------------
    // 9. FAQ Accordion Toggle
    // ----------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            if (questionBtn) {
                questionBtn.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    // Close others
                    faqItems.forEach(i => i.classList.remove('active'));
                    // Toggle current
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // ----------------------------------------------------
    // 10. Navbar Message Inquiry Dropdown Click Toggle
    // ----------------------------------------------------
    const navMsgBtn = document.getElementById('navMsgBtn');
    const navMsgWrapper = document.getElementById('navMsgWrapper');

    if (navMsgBtn && navMsgWrapper) {
        navMsgBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMsgWrapper.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!navMsgWrapper.contains(e.target)) {
                navMsgWrapper.classList.remove('open');
            }
        });
    }
});
