export abstract class GameObject {
    proc: p5;
    position: p5.Vector;
    width: number;
    height: number;

    constructor(proc: p5) {
        this.proc = proc;
        this.position = new p5.Vector();
        this.width = 0;
        this.height = 0;

        this.setup();
    }

    setup() {

    }

    update() {

    }

    show() {

    }

    onKeyPressed() {

    }
}

export class Collider2D extends GameObject {
    hits(target: Collider2D) : boolean {
        // TODO: implements colision
        return this.position == target.position;
    }
}

export class Osd extends GameObject{
    show() {
        let fps = this.proc.frameRate();
        let boxSize = 50;
        let x = this.proc.width - boxSize / 2;
        let y = boxSize / 2;

        this.proc.fill(255, 30);
        this.proc.rectMode(this.proc.CENTER);
        this.proc.rect(x, y, boxSize, boxSize);

        this.proc.fill(255);
        this.proc.textAlign(this.proc.CENTER, this.proc.CENTER);
        this.proc.text(fps.toFixed(2), x, y, boxSize, boxSize);
    }
}
