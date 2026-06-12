document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');

    // ===== 1. DARK MODE + LOCALSTORAGE =====
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        const icon = themeToggle?.querySelector('i');
        if(icon) {
            icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
        }
    }

    // ===== 2. NAVBAR + BACK TO TOP - 1 SEUL SCROLL =====
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Navbar shrink : utilise "scrolled" partout, pas "navbar-scrolled"
        navbar?.classList.toggle('scrolled', scrollY > 50);
        
        // Bouton retour haut
        backToTop?.classList.toggle('show', scrollY > 300);
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // ===== 3. COMPTEURS + FADE-IN =====
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                if(entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('fade-in-visible');
                }
                if(entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .counter').forEach(el => {
        observer.observe(el);
    });

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if(current >= target) {
                element.textContent = target.toLocaleString() + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        }, 16);
    }
});

// ===== 4. VALIDATION FORMULAIRE CONTACT =====
const formulaire = document.getElementById("contactForm");

if (formulaire) {
    formulaire.addEventListener("submit", function(e) {
        e.preventDefault();
        let valide = true;

        const nom = document.getElementById("nom");
        const prenom = document.getElementById("prenom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");

        // Reset toutes erreurs
        document.getElementById("erreurNom").textContent = "";
        document.getElementById("erreurPrenom").textContent = "";
        document.getElementById("erreurEmail").textContent = "";
        document.getElementById("erreurSujet").textContent = "";
        document.getElementById("erreurMessage").textContent = "";

        if (nom.value.trim() === "") {
            document.getElementById("erreurNom").textContent = "Le nom est obligatoire";
            valide = false;
        }

        if (prenom.value.trim() === "") {
            document.getElementById("erreurPrenom").textContent = "Le prénom est obligatoire";
            valide = false;
        }

        // Email vide + format
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === "") {
            document.getElementById("erreurEmail").textContent = "L'email est obligatoire";
            valide = false;
        } else if (!regexEmail.test(email.value)) {
            document.getElementById("erreurEmail").textContent = "Email invalide";
            valide = false;
        }

        if (sujet.value === "Choisir un sujet...") {
            document.getElementById("erreurSujet").textContent = "Veuillez choisir un sujet";
            valide = false;
        }

        if (message.value.trim().length < 20) {
            document.getElementById("erreurMessage").textContent = "Le message doit contenir au moins 20 caractères";
            valide = false;
        }

        if (valide) {
            document.getElementById("messageSucces").classList.remove("d-none");
            formulaire.reset();
            setTimeout(() => {
                document.getElementById("messageSucces").classList.add("d-none");
            }, 5000);
        }
    });
}

// ===== 5. FILTRAGE DYNAMIQUE FREELANCES =====
const boutons = document.querySelectorAll(".filtre-btn");
const freelances = document.querySelectorAll(".freelance");

if (boutons.length > 0) {
    boutons.forEach(bouton => {
        bouton.addEventListener("click", () => {
            // Reset classe active sur tous boutons
            boutons.forEach(b => {
                b.classList.remove("btn-primary");
                b.classList.add("btn-outline-primary");
            });
            // Bouton actif
            bouton.classList.remove("btn-outline-primary");
            bouton.classList.add("btn-primary");

            const categorie = bouton.dataset.categorie;

            freelances.forEach(freelance => {
                if (categorie === "all" || freelance.dataset.categorie === categorie) {
                    freelance.style.display = "block";
                } else {
                    freelance.style.display = "none";
                }
            });
        });
    });
}