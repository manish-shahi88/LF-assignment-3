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
        if (this.x + this.radius >= container.clientWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius >= container.clientHeight || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }

        // Check for collisions with other balls
        for (let ball of balls) {
            if (this !== ball) {
                let dx = this.x - ball.x;
                let dy = this.y - ball.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.radius + ball.radius) {
                    // Simple collision response: exchange velocities
                    [this.dx, ball.dx] = [ball.dx, this.dx];
                    [this.dy, ball.dy] = [ball.dy, this.dy];

                    // Move balls apart to prevent overlap
                    let overlap = (this.radius + ball.radius) - distance;
                    let moveX = (overlap * dx) / distance;
                    let moveY = (overlap * dy) / distance;
                    this.x += moveX / 2;
                    this.y += moveY / 2;
                    ball.x -= moveX / 2;
                    ball.y -= moveY / 2;
                }
            }
        }

        this.updatePosition();
    }
}

let balls = [];
for (let i = 0; i < 15; i++) {
    // let radius = 20;
    let radius = Math.random() * (20 - 5) + 10;
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
