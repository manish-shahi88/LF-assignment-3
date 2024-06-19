const container = document.getElementById('container');

class Ball {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.element = this.createElement();
        this.updatePosition();
    }

    createElement() {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.style.width = `${this.radius * 2}px`;
        ball.style.height = `${this.radius * 2}px`;
        ball.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Random color
        container.appendChild(ball);
        return ball;
    }

    updatePosition() {
        this.element.style.left = `${this.x - this.radius}px`;
        this.element.style.top = `${this.y - this.radius}px`;
    }

    update(balls) {
        this.x += this.dx;
        this.y += this.dy;

        // Check for wall collisions
        if (this.x + this.radius > container.clientWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
            this.x = Math.max(this.radius, Math.min(this.x, container.clientWidth - this.radius));
        }
        if (this.y + this.radius > container.clientHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
            this.y = Math.max(this.radius, Math.min(this.y, container.clientHeight - this.radius));
        }

        // Check for collisions with other balls
        for (let ball of balls) {
            if (this !== ball) {
                let dx = this.x - ball.x;
                let dy = this.y - ball.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.radius + ball.radius) {
                    // Exchange velocities to simulate collision
                    [this.dx, ball.dx] = [ball.dx, this.dx];
                    [this.dy, ball.dy] = [ball.dy, this.dy];
                    // Move balls apart to prevent overlap
                    let overlap = 0.5 * (this.radius + ball.radius - distance);
                    let adjustX = overlap * dx / distance;
                    let adjustY = overlap * dy / distance;
                    this.x += adjustX;
                    this.y += adjustY;
                    ball.x -= adjustX;
                    ball.y -= adjustY;
                }
            }
        }

        this.updatePosition();
    }
}

let balls = [];
for (let i = 0; i < 120; i++) {
    let radius = Math.random() * (15 - 5) + 5;  // Reduced maximum radius
    let x = Math.random() * (container.clientWidth - radius * 2) + radius;
    let y = Math.random() * (container.clientHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 10;
    let dy = (Math.random() - 0.5) * 10;
    balls.push(new Ball(x, y, radius, dx, dy));
}

function animate() {
    for (let ball of balls) {
        ball.update(balls);
    }
    requestAnimationFrame(animate);
}

animate();
