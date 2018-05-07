import "p5";
import { Bird } from "./Game/Bird";
import { ObstacleGenerator } from "./Game/Pipe";
import { Osd } from "./Base";

var game = (p: p5) => {
    let bird;
    let osd;
    let obstacles;

    p.preload = () => {
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        bird = new Bird(p);
        osd = new Osd(p);

        obstacles = new ObstacleGenerator(p);
        obstacles.setTarget(bird);
        obstacles.addObstacle();
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    
    p.keyPressed = () => {
        bird.onKeyPressed();
        obstacles.onKeyPressed();
    }

    p.draw = () => {
        p.background(0);
        obstacles.update();
        obstacles.show();
        bird.update();
        bird.show();
        osd.update();
        osd.show();
    }
}

var gameP = new p5(game);