function starrynight() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    document.getElementById('starry-sky').appendChild(canvas);

    const stars = [];
    const starCount = 100;
    const maxDist = 150;
    let mouse = { x: undefined, y: undefined };
    const clearZone = 100;

    function makestars() {
        stars.length = 0; 
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1 + 1,
                vx: Math.floor(Math.random() * 50) - 25,
                vy: Math.floor(Math.random() * 50) - 25
            });
        }
    }

    makestars();

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = "lighter";

        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];

            let drawStar = true;
            if (mouse.x !== undefined && mouse.y !== undefined) {
                const dx = s.x - mouse.x;
                const dy = s.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance <= clearZone) {
                    drawStar = false;
                }
            }

            if (drawStar) {
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
                ctx.fill();

                for (let j = i + 1; j < stars.length; j++) {
                    const s2 = stars[j];
                    const d = Math.sqrt(Math.pow(s.x - s2.x, 2) + Math.pow(s.y - s2.y, 2));
                    if (d < maxDist) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - d / maxDist})`;
                        ctx.moveTo(s.x, s.y);
                        ctx.lineTo(s2.x, s2.y);
                        ctx.stroke();
                    }
                }
            }

            s.x += s.vx / 100;
            s.y += s.vy / 100;

            if (s.x < 0 || s.x > width) s.vx = -s.vx;
            if (s.y < 0 || s.y > height) s.vy = -s.vy;
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    function resizestop() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        makestars(); 
    }

    window.addEventListener('resize', resizestop);

    window.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault(); 
            resizestop();
        }
    }, { passive: false });
}

function menuanim() {
    const menulinks = document.getElementById('menu-links');
    const links = menulinks.querySelectorAll('.menu-item');
    const origGap = 8;
    const hoverGap = 4;

    menulinks.addEventListener('mouseenter', () => {
        links.forEach(link => {
            link.style.marginRight = `${hoverGap}px`;
        });
    });

    menulinks.addEventListener('mouseleave', () => {
        links.forEach(link => {
            link.style.marginRight = `${origGap}px`;
        });
    });
}

window.addEventListener('scroll', () => {
    const scrollArrow = document.getElementById('scroll-arrow');
    if (window.scrollY > 100) {
        scrollArrow.style.opacity = '0';
    } else {
        scrollArrow.style.opacity = '1';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sections = document.querySelectorAll('section');
const menulinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    menulinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

const projcards = document.querySelectorAll('.project-card');
const projmodal = document.getElementById('project-modal');
const modaltitle = document.getElementById('modal-title');
const modaldesc = document.getElementById('modal-description');
const modaltags = document.getElementById('modal-tags');
const closemodal = document.getElementById('close-modal');

const projinfo = {
    // sorry zin u gotta add the other games i forgot to lmao, just copy and paste the other games and fill in the info
    // this code makes it so when you click on it, it pops up.
    "Blade-Ball": {
        title: "Blade Ball",
        description: "Blade Ball is an exciting Roblox game that combines elements of dodgeball and sword fighting. Players use their reflexes and strategy to deflect projectiles and outlast their opponents.",
        tags: ["Lua", "Roblox", "Multiplayer", "Action"]
    },
    "devas": {
        title: "Devas Of Creation",
        description: "Devas Of Creation is a unique Roblox experience that allows players to harness the power of creation. Players can build, craft, and shape their own worlds while interacting with others in a vast, shared universe.",
        tags: ["Lua", "Roblox", "Sandbox", "Creativity"]
    },
    "baddies": {
        title: "Baddies",
        description: "Baddies is a thrilling Roblox game where players take on the role of antiheroes. Navigate through a world of moral ambiguity, complete missions, and rise to the top of the criminal underworld.",
        tags: ["Lua", "Roblox", "RPG", "Action"]
    },
    "Fight-In-School": {
        title: "Fight In A School",
        description: "Fight In A School is an action-packed Roblox game set in a school environment. Players engage in hand-to-hand combat, using various fighting styles and techniques to become the ultimate school champion.",
        tags: ["Lua", "Roblox", "Fighting", "Multiplayer"]
    }
};

projcards.forEach(card => {
    card.addEventListener('click', () => {
        const project = projinfo[card.dataset.project];
        modaltitle.textContent = project.title;
        modaldesc.textContent = project.description;
        modaltags.innerHTML = project.tags.map(tag => `<span class="label bg-blue-500">#${tag}</span>`).join('');
        projmodal.classList.remove('hidden');
    });
});

closemodal.addEventListener('click', () => {
    projmodal.classList.add('hidden');
});

document.getElementById('current-year').textContent = new Date().getFullYear();

starrynight();

const fadescroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(fadescroll, {
    root: null,
    threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

function animcounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updcounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.round(current).toLocaleString() + '+';
            requestAnimationFrame(updcounter);
        } else {
            counter.textContent = target.toLocaleString() + '+';
        }
    };

    updcounter();
}

const counterwatch = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animcounter(entry.target);
            counterwatch.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterwatch.observe(counter);
});

document.getElementById('logo').addEventListener('click', function() {
    window.location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
    const vidwrapper = document.querySelector('.video-wrapper');
    const viditems = document.querySelectorAll('.video-item');
    const hoverclip = document.getElementById('hover-clip');
    let currentItem = null;

    function playclip(item) {
        const clipSrc = item.getAttribute('data-video');
        
        console.log(`Playing clip: ${clipSrc}`);

        if (hoverclip.src !== clipSrc) {
            hoverclip.src = clipSrc;
            hoverclip.load(); 
        }

        hoverclip.style.opacity = '1';
        hoverclip.play().catch(error => console.error('Error playing clip:', error));
        currentItem = item;

        const itemindex = Array.from(viditems).indexOf(item);
        hoverclip.style.transform = `translateY(-${itemindex * 100}%)`;
    }

    function stopclip() {
        hoverclip.style.opacity = '0';
        
        setTimeout(() => {
            hoverclip.pause();
            hoverclip.currentTime = 0;
        }, 500);
        
        currentItem = null;
    }

    viditems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            playclip(item);
        });
    });

    vidwrapper.addEventListener('mouseleave', () => {
        stopclip();
    });

    hoverclip.muted = true;
    hoverclip.setAttribute('playsinline', true);
    hoverclip.setAttribute('preload', 'auto');
});