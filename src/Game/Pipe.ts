import { Collider2D } from "../Base";

class Pipe extends Collider2D {
    gapSize: number;
    gapHeight: number;
    speed: number = 1;

    setup() {
        this.width = this.proc.width * 0.1;
        this.height = this.proc.height;

        this.position.set(this.proc.width, 0);

        let sizeFactor = this.proc.random(0.2, 0.5);
        this.gapSize = this.proc.height * sizeFactor;

        let heightVariation = this.proc.height - this.gapSize;
        this.gapHeight = this.proc.random(0, heightVariation);
    }

    update() {
        this.position.sub(this.speed);
    }

    show() {
        this.proc.beginShape();
        this.proc.vertex(this.position.x, 0);
        this.proc.vertex(this.position.x + this.width, 0);
        this.proc.vertex(this.position.x + this.width, this.gapHeight);
        this.proc.vertex(this.position.x, this.gapHeight);
        this.proc.endShape(this.proc.CLOSE);
    }

    increaseSpeed(speed: number = 1) {
        this.speed += speed;
    }

    offscreen() {
        return (this.position.x < -this.width);
    }
}

export class ObstacleGenerator extends Collider2D {
    proc: p5;
    target: Collider2D;
    obstacles: Pipe[] = [];
    dificulty: number = 1;

    setup() {
    }

    update() {
        for (let key = 0; key < this.obstacles.length; key++) {
            const obstacle = this.obstacles[key];
            obstacle.update();
            obstacle.show();

            // check colisions
            // obstacle.hits(this.target);

            // check offscreen
            if (obstacle.offscreen()) {
                this.obstacles.splice(key, 1);
                console.log('removed', this.obstacles.length);
            }

            obstacle.speed = this.dificulty;
        }

        let rate = 1000 - this.dificulty;
        if (this.proc.frameCount % rate == 0) {
            this.addObstacle();
        }
    }

    setTarget(target: Collider2D) {
        this.target = target;
    }

    addObstacle() {
        this.obstacles.push(new Pipe(this.proc));
    }

    increaseDificulty() {
        console.log('dificulty +');
        this.dificulty++;
    }

    onKeyPressed() {
        if(this.proc.key == 'Y') {
            this.increaseDificulty();
        }
    }
}