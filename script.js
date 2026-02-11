// --- CONFIGURATION ---
const messageText = "RAHMA...I've been thinking and making plans towards this day for a long time...You're so fun to chat with and make every day brighter and I really like you for that. I told you to let me handle this MY way😂...and now I wanna make it official.";
const questionText = "Will you be my girlfriend SHABABY❤️?";
const typewriterSpeed = 60; 

// --- DOM ELEMENTS ---
const typewriterElement = document.getElementById('typewriter');
const questionElement = document.getElementById('question');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const heartContainer = document.getElementById('heart-container');
const btnWrapper = document.querySelector('.btn-wrapper');

// --- SAFETY CHECK: Only run main page logic if elements exist ---
if (btnWrapper) {
    btnWrapper.style.display = 'none';
}

// --- FLOATING HEARTS LOGIC ---
if (heartContainer) {
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heartContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 5000);
    }
    setInterval(createHeart, 300);
}

// --- TYPEWRITER LOGIC ---
let charIndex = 0;
function typeMessage() {
    if (typewriterElement && charIndex < messageText.length) {
        typewriterElement.innerHTML += messageText.charAt(charIndex);
        charIndex++;
        setTimeout(typeMessage, typewriterSpeed);
    } else if (questionElement) {
        typeQuestion();
    }
}

let qIndex = 0;
function typeQuestion() {
    if (questionElement && qIndex < questionText.length) {
        questionElement.innerHTML += questionText.charAt(qIndex);
        qIndex++;
        setTimeout(typeQuestion, typewriterSpeed);
    } else if (btnWrapper) {
        btnWrapper.style.display = 'flex';
    }
}

// --- BUTTON BEHAVIOR LOGIC ---
if (noBtn && yesBtn) {
    let yesScale = 1;
    let noClickCount = 0;

    noBtn.addEventListener('click', () => {
        yesScale += 0.4;
        yesBtn.style.transform = `scale(${yesScale})`;
        const x = Math.random() * 20 - 10;
        const y = Math.random() * 20 - 10;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
        noClickCount++;
        if(noClickCount > 5) noBtn.innerText = "Are you sure? 🥺";
        if(noClickCount > 10) noBtn.innerText = "Just click Yes already! ❤️";
    });

    yesBtn.addEventListener('click', () => {
        yesBtn.disabled = true;
        // Check if emailjs is defined before calling
        if (typeof emailjs !== 'undefined') {
            emailjs.send("service_fe2y4gd", "template_ifj06rr", {
                message: "Rahma accepted your proposal!"
            }).finally(() => {
                window.location.href = 'success.html';
            });
        } else {
            window.location.href = 'success.html';
        }
    });
}

// --- FIREWORKS ANIMATION ---
const canvas = document.getElementById("fireworksCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    
    // Set proper size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let particles = [];

    function createFirework() {
        let x = Math.random() * canvas.width;
        let y = Math.random() * (canvas.height / 2); // Explode in top half

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: x,
                y: y,
                speedX: (Math.random() - 0.5) * 12,
                speedY: (Math.random() - 0.5) * 12,
                size: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 360}, 100%, 100%)`,
                life: 100
            });
        }
    }

    function updateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;
            p.speedY += 0.1; // Add gravity
            p.life--;

            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(updateFireworks);
    }

    setInterval(createFirework, 800);
    updateFireworks();
}

// --- INIT ON LOAD ---
window.onload = () => {
    if(typewriterElement) typeMessage();
};