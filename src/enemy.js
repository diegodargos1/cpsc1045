class Enemy {
    constructor(canvas, context, x = 10, y = 10, dX = 10, dY = 10, width = 120, height = 65) {
        this.x = x;
        this.y = 10;
        this.dX = dX;
        this.dY = dY;
        this.image = new Image();
        this.image.src = 'assets/enemy1.png';
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.context = context;
        this.img = {
            img: new Image(),
            red: { width: 70, height: 110, x: 200, y: 310 },
        }
        this.img.img.src = 'assets/beams.png';

        this.wall = {
            left: 0,
            top: 0,
            right: this.canvas.width,
            bottom: this.canvas.height
        }
        this.bulletsLimit = 1;
        this.fire = true;
        this.b = [];
        this.status = 1;
        this.live = 1;
    }

    Draw() {
        if (this.status) this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.b.forEach((element, i) => {
            if (!element.MoveDown()) {
                this.b.splice(i, 1);
                if (!this.status) this.live = 0;
            } else {
                element.Draw();
            }
        });
        return true;
        // this.context.beginPath();
        // this.context.fillStyle = 'white';
        // this.context.fillRect(this.x, this.y, this.width, this.height);
        // this.context.stroke();
    }

    Shoot() {
        if (this.b.length < this.bulletsLimit) {
            this.fire = false;
            this.b.push(new EnemyBullet((this.x + (this.width / 2)), (this.height + this.y + 60), 5, 10, 30,
                this.context, this.canvas));
        }
    }

    Movement() {
        let newX = this.x - this.dX;
        let newY = this.y - this.dY;

        if (newY < 0 || newY > 50) {
            this.dY = -this.dY;
        }


        if (getRandomNumber(0, 100) <= 5) this.dX = -this.dX;
        if ((newX + this.width >= this.canvas.width + 50) || (newX <= 0)) {
            this.dX = -this.dX;
        }
        this.x = newX;
        this.y = newY;
    }

    MoveUp() {
        let newY = this.y - this.dY;

        if (!(newY <= 0)) {
            this.y = newY;
        }
    }

    MoveDown() {
        let newY = this.y + this.dY;

        if (!(newY + this.height >= this.canvas.height)) {
            this.y = newY;
        }
    }

    MoveLeft() {
        let newX = this.x - this.dX;

        if (!(newX <= 0)) {
            this.x = newX;
        }
    }

    MoveRight() {
        let newX = this.x + this.dX;

        if (!(newX + this.width >= this.canvas.width)) {
            this.x = newX;
        }
    }

    GetHitBox() {
        return {
            x: this.x,
            y: this.y,
            height: this.height + this.y,
            width: this.width + this.x
        }
    }
}