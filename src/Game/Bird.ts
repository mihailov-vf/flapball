import { Collider2D } from "../Base";

export class Bird extends Collider2D {
    gravity = 0.6;
    lift = -15;
    velocity = 0;

    setup() {
        let size = this.proc.height * 0.05;
        let centerHeight = this.proc.height / 2;

        this.width = size;
        this.height = size;
        this.position.set(size, centerHeight + size/2);
    }

    update() {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.position.y += this.velocity;

        if (this.position.y > this.proc.height) {
            this.position.y = this.proc.height;
            this.velocity = 0;
          }
  
          if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity = 0;
          }
    }

    show() {
        this.proc.ellipse(this.position.x, this.position.y, this.width, this.height);
    }

    onKeyPressed() {
        if (this.proc.key == ' ') {
            this.up();
        }
    }

    up() {
        this.velocity = this.lift;
    }
}
