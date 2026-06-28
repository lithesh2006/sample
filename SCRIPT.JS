
    
    <script>
        const hamburger = document.getElementById('hamburger');
        const navUl = document.querySelector('nav ul');

        // ── Hamburger toggle ──
        hamburger.addEventListener('click', function () {
            navUl.classList.toggle('nav-open');
            hamburger.classList.toggle('active');
        });

        // ── Close menu when a link is clicked ──
        navUl.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navUl.classList.remove('nav-open');
                hamburger.classList.remove('active');
            });
        });

        // ── Active nav link highlight on scroll ──
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav ul li a');

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3          // section must be 30% visible to activate
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });

        // ── Contact Form Validation ──
        const contactForm = document.getElementById('contactForm');

        // Helper: show error
        function showError(inputId, errorId, message) {
            const input = document.getElementById(inputId);
            const error = document.getElementById(errorId);
            error.textContent = message;
            input.classList.add('input-error');
        }

        // Helper: clear error
        function clearError(inputId, errorId) {
            const input = document.getElementById(inputId);
            const error = document.getElementById(errorId);
            error.textContent = '';
            input.classList.remove('input-error');
        }

        // Clear errors live as user types
        document.getElementById('contactName').addEventListener('input', function () {
            if (this.value.trim() !== '') clearError('contactName', 'nameError');
        });
        document.getElementById('contactEmail').addEventListener('input', function () {
            if (this.value.trim() !== '') clearError('contactEmail', 'emailError');
        });
        document.getElementById('contactSubject').addEventListener('input', function () {
            if (this.value.trim() !== '') clearError('contactSubject', 'subjectError');
        });
        document.getElementById('contactMessage').addEventListener('input', function () {
            if (this.value.trim() !== '') clearError('contactMessage', 'messageError');
        });

        // Form submit validation
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name    = document.getElementById('contactName').value.trim();
            const email   = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            const success = document.getElementById('formSuccess');

            let isValid = true;

            // Validate Name
            if (name === '') {
                showError('contactName', 'nameError', '⚠ Please enter your full name.');
                isValid = false;
            } else {
                clearError('contactName', 'nameError');
            }

            // Validate Email
            if (email === '') {
                showError('contactEmail', 'emailError', '⚠ Please enter your email address.');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('contactEmail', 'emailError', '⚠ Please enter a valid email address.');
                isValid = false;
            } else {
                clearError('contactEmail', 'emailError');
            }

            // Validate Subject
            if (subject === '') {
                showError('contactSubject', 'subjectError', '⚠ Please enter a subject.');
                isValid = false;
            } else {
                clearError('contactSubject', 'subjectError');
            }

            // Validate Message
            if (message === '') {
                showError('contactMessage', 'messageError', '⚠ Please describe your project or message.');
                isValid = false;
            } else {
                clearError('contactMessage', 'messageError');
            }

            // If all valid, show success
            if (isValid) {
                success.style.display = 'block';
                contactForm.reset();
                setTimeout(function () {
                    success.style.display = 'none';
                }, 4000);
            } else {
                success.style.display = 'none';
            }
        });
    </script>


