// Starfield - interactive floating stars
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize stars
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    });
}

// Draw stars
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 0.1;
        ctx.fill();
    });
}

// Update stars
function updateStars() {
    stars.forEach(star => {
        star.x += star.dx;
        star.y += star.dy;

        // Bounce off edges
        if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
    });
}

// Interact with stars on click
canvas.addEventListener('click', (e) => {
    stars.forEach(star => {
        const distX = star.x - e.clientX;
        const distY = star.y - e.clientY;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < 100) { // Within 100px range
            star.dx += distX / dist * 2; // Push away
            star.dy += distY / dist * 2;
        }
    });
});

function animateStars() {
    drawStars();
    updateStars();
    requestAnimationFrame(animateStars);
}
animateStars();

// Typing and Deleting Effect
const text = `b4rnz@kali:~$ ssh user@target.com 'while :; do echo "Attempting password crack..."; sleep 0.2; done' & sudo rm -rf /dev/null`;
const typingElement = document.getElementById('typing');

let index = 0;
let isDeleting = false;
let typingSpeed = 30;
let deletingSpeed = 20;

function type() {
    if (!isDeleting) {
        typingElement.textContent = text.substring(0, index++);
        if (index === text.length + 1) {
            setTimeout(() => {
                isDeleting = true;
            }, 1000); // 1 second wait after typing
        }
    } else {
        typingElement.textContent = text.substring(0, index--);
        if (index < 0) {
            index = 0;
            isDeleting = false;
        }
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

type();