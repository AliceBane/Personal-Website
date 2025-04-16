document.addEventListener('DOMContentLoaded', function() {
    const helloWorldText = "Hello world,";
    const aliceText = "Alice";
    const hereText = "\u00A0here.";
    const helloWorldElement = document.getElementById('hello-world');
    const aliceHereElement = document.getElementById('alice-here');
    const andHereElement = document.getElementById('and-here');
    const aboutSection = document.querySelector('#about');
    const facts = document.querySelectorAll('.facts li');
    const connectContainer = document.querySelector('.connect-container');
    const navbar = document.querySelector('.nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const connectButtons = document.querySelectorAll(".connect-button a, #contact-link");
    const targetButton = document.getElementById("highlight-target");
    const menuIcon = document.getElementById('menu-icon');
    const nav = document.querySelector('nav');
    
    function typeText(text, element, delay, nextFunction) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 50);
            } else if (nextFunction) {
                nextFunction();
            }
        }
        setTimeout(typing, delay);
    }

    function typeHelloWorld() {
        typeText(helloWorldText, helloWorldElement, 0, typeAlice);
    }

    function typeAlice() {
        typeText(aliceText, aliceHereElement, 50, typeHere);
    }

    function typeHere() {
        typeText(hereText, andHereElement, 50);
    }

    typeHelloWorld();

    function animateConnectContainer() {
        if (connectContainer) {
            connectContainer.classList.add('animate');
        }
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                facts.forEach((fact, index) => {
                    fact.style.animationDelay = `${index * 0.3}s`;
                    fact.classList.add('animate');
                });
            setTimeout(animateConnectContainer, facts.length * 300);
            observer.disconnect();
            }
        
        });
      }, { threshold: 0.2 });
      observer.observe(aboutSection);

      window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top >= offset && top < offset + height){
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('nav ul li a[href*="' + id + '"]').classList.add('active');
                })
            }
        })
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.scrollTo({ top: window.scrollY });
            tabs.forEach((t) => t.classList.remove('active'));
            tabContents.forEach((content) => {
                content.classList.remove('active');
                content.style.opacity = "0";
            });
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    connectButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("home").scrollIntoView({ behavior: "smooth" });
            if (!targetButton) return;
            targetButton.classList.add("highlight-effect", "active");
            
            setTimeout(() => {
                targetButton.classList.remove("highlight-effect", "active");
            }, 2000);
        });
    });

    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});