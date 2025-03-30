const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Define colors as constants
const COLORS = {
    TERMINAL: {
        BASE: '#121212',      // Pure black
        HOVER: '#282828'      // Slightly lighter black for hover
    },
    PASTEL: {
        BASE: '#FFB4A2',      // Soft pink
        HOVER: '#FFCDB2'      // Lighter pink for hover
    }
};

// Define the sections using the color constants
const sections = [
    { 
        name: 'Terminal',
        color: COLORS.TERMINAL.BASE,
        url: 'terminal/index.html'
    },
    { 
        name: 'Pastel',
        color: COLORS.PASTEL.BASE,
        url: 'pastel/index.html'
    }
];

let activeSection = null;

// At the top of your file, after the constants
WebFont.load({
    google: {
        families: [
            'Press Start 2P',  // Good for terminal text
            'Quicksand'        // Nice for pastel text
        ]
    },
    active: function() {
        // Fonts are loaded, now we can draw
        draw();
    }
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate tilted division points
    const topDivision = canvas.width * 0.55;    
    const bottomDivision = canvas.width * 0.45;  

    // Draw Terminal theme (left)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(topDivision, 0);
    ctx.lineTo(bottomDivision, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = activeSection === sections[0] ? lightenColor(sections[0].color) : sections[0].color;
    ctx.fill();

    // Draw Pastel theme (right)
    ctx.beginPath();
    ctx.moveTo(topDivision, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(bottomDivision, canvas.height);
    ctx.closePath();
    ctx.fillStyle = activeSection === sections[1] ? lightenColor(sections[1].color) : sections[1].color;
    ctx.fill();

    // Terminal text
    ctx.font = '22px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#62eb8f'; // Matrix green for terminal text
    ctx.fillText('TERMINAL', canvas.width * 0.25, canvas.height * 0.5);
    
    // Pastel text
    ctx.font = 'bold 30px Quicksand';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#604652'; // Muted rose for pastel text
    ctx.fillText('PASTEL', canvas.width * 0.75, canvas.height * 0.5);
}

function lightenColor(color) {
    if (color === COLORS.TERMINAL.BASE) return COLORS.TERMINAL.HOVER;
    if (color === COLORS.PASTEL.BASE) return COLORS.PASTEL.HOVER;
    return color; // Fallback
}

function getSection(x, y) {
    const progress = y / canvas.height;
    const divisionX = (canvas.width * 0.55) * (1 - progress) + (canvas.width * 0.45) * progress;
    return x < divisionX ? sections[0] : sections[1];
}

// Event Listeners
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSection = getSection(x, y);
    if (newSection !== activeSection) {
        activeSection = newSection;
        draw();
    }
});

canvas.addEventListener('mouseleave', () => {
    activeSection = null;
    draw();
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const section = getSection(x, y);
    window.location.href = section.url;
});

// Initial setup
resizeCanvas();
window.addEventListener('resize', resizeCanvas);