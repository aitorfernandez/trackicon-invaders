import randomColor from 'randomcolor';

export default function sketch(p) {

  const CANVAS_WIDTH = 720;
  const CANVAS_HEIGHT = 492;

  const SIZE = 4;
  const TOTAL_BULLETS = 3;
  const COLOR_BULLETS = 'mintcream';
  const COLOR_DEFENDER = 'aliceblue';

  const LIMIT_LEFT = SIZE * 2;
  const LIMIT_RIGHT = SIZE * 6;

  const STEPS = 10;

  let activeBullets = TOTAL_BULLETS;

  let audioObject;

  class Bullet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.active = true;
    }

    draw() {
      p.fill(COLOR_BULLETS);
      p.rect(this.x + (SIZE * 2), this.y - (SIZE * 3), SIZE, SIZE * 2);

      this.y -= SIZE;

      if (this.y < 0) {
        this.active = false;
      }
    }
  }

  class BulletController {
    constructor() {
      this.bullets = [];
      this.counter = 3;
    }

    addBullet(bullet) {
      if (this.bullets.length === TOTAL_BULLETS) {
        return;
      }

      this.bullets.push(bullet);
      activeBullets -= 1;
    }

    draw() {
      for (const bullet of this.bullets) {
        bullet.draw();
      }

      let i = this.bullets.length;
      while (i--) {
        if (!this.bullets[i].active) {
          this.bullets.splice(i, 1);
          activeBullets += 1;
        }
      }
    }
  }

  class Identicon {
    constructor(config) {
      this.identicon = config.icon;
      this.x = config.x;
      this.y = config.y;
      this.color = config.color;
    }

    draw() {
      let x = this.x;
      let y = this.y;

      for (let i = 0; i < this.identicon.length; i++) {
        let grid = this.identicon[i];

        y = (i * SIZE) + this.y;

        for(let j = 0; j < grid.length; j++) {
          if (grid[j]) {
            p.rect(x + (j * SIZE), y, SIZE, SIZE);
          }
        }
      }
    }
  }

  class Defender extends Identicon {
    draw() {
      p.fill(p.color(this.color));

      super.draw();

      p.fill(COLOR_BULLETS);

      for (let i = 0; i < activeBullets; i++) {
        p.rect(this.x + ((i * 2) * SIZE), this.y + (SIZE * 6), SIZE, SIZE);
      }
    }

    keyDown(keyEvent) {
      if (keyEvent === p.LEFT_ARROW) {
        this.x -= 5;
      }

      if (keyEvent === p.RIGHT_ARROW) {
        this.x += 5;
      }

      if (this.x < (LIMIT_LEFT * 3)) {
        this.x = (LIMIT_LEFT * 3);
      }

      if (this.x > (CANVAS_WIDTH - ((LIMIT_RIGHT * 3)))) {
        this.x = CANVAS_WIDTH - (LIMIT_RIGHT * 3);
      }
    }
  }

  class Invader extends Identicon {
    constructor(config) {
      super(config);
      this.previewUrl = config.previewUrl;

      this.moveX = true;
      this.moveY = true;

      this.moveCounter = 0;
      this.downCounter = 0;
    }

    draw() {
      p.fill(this.color);
      // p.fill(p.color(0.5 * this.x, 0.5 * this.y, 0.5 * this.color));

      super.draw();
    }

    move() {
      if (this.moveX) {
        this.x += SIZE * 2;
      }
      else {
        this.x -= SIZE * 2;
      }

      this.moveCounter++;

      if (this.moveCounter === STEPS) {
        this.moveX = !this.moveX;
        this.moveCounter = 0;

        this.downCounter++;

        if (this.moveY) {
          this.y += SIZE * 2;
        }
        else {
          this.y -= SIZE * 2;
        }
      }

      if (this.downCounter === STEPS) {
        this.moveY = !this.moveY;
        this.downCounter = 1;
      }
    }

    playAudio() {
      if (audioObject) {
        audioObject.pause();
      }

      audioObject = new Audio(this.previewUrl);
      audioObject.play();
    }
  }

  class InvaderController {
    constructor() {
      this.invaders = [];

      this.waitTime = 750;
      this.drawTime = null;
    }

    addInvader(invader) {
      this.invaders.push(invader);
    }

    draw(bullets) {
      let move = this.hasToMove();

      let i = this.invaders.length;
      while (i--) {
        this.invaders[i].draw();

        if (move) {
          this.invaders[i].move();
        }

        for (const bullet of bullets) {
          let dx = bullet.x - this.invaders[i].x;
          let dy = bullet.y - this.invaders[i].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < SIZE + (SIZE * 5)) {
            bullet.active = false;

            this.invaders[i].playAudio();
            this.invaders.splice(i, 1);
          }
        }
      }

      if (move) {
        // reset timer
        this.drawTime = p.millis();
      }
    }

    hasToMove() {
      return p.millis() - this.drawTime > this.waitTime;
    }
  }

  let bulletController = new BulletController();
  let invaderController = new InvaderController();
  let defender;

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    const identicons = props.identicons;

    if (Object.keys(identicons.defender).length === 0 && identicons.defender.constructor === Object) {
      return;
    }

    invaderController.invaders = [];

    let positionX = 0;
    let positionY = -1;

    for (let i = 0; i < identicons.invaders.length; i++) {
      if (i % ((CANVAS_WIDTH / (SIZE * 12)) >> 0) === 0) {
        positionX = SIZE / 2;
        positionY++;
      }

      let x = (SIZE * 3) + (positionX * (SIZE * 8));
      let y = (SIZE * 3) + (positionY * (SIZE * 8));

      invaderController.addInvader(new Invader({
        x,
        y,
        icon: identicons.invaders[i].icon,
        color: randomColor(), // Math.floor(Math.random() * (255 - 1) + 1),
        previewUrl: identicons.invaders[i].previewUrl
      }));

      positionX++;
    }

    defender = new Defender({
      icon: identicons.defender.icon,
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - (SIZE * 10),
      color: COLOR_DEFENDER
    });
  };

  // p5js Structure

  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p.P2D);
    p.frameRate(20);
  };

  p.windowResized = () => {
    p.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  p.draw = () => {
    p.background('#1c1d25');
    p.noStroke();

    if (typeof defender === 'undefined') {
      return;
    }

    if (p.keyIsDown(p.LEFT_ARROW)) {
      defender.keyDown(p.LEFT_ARROW);
    }

    if (p.keyIsDown(p.RIGHT_ARROW)) {
      defender.keyDown(p.RIGHT_ARROW);
    }

    defender.draw();
    bulletController.draw();
    invaderController.draw(bulletController.bullets);
  };

  p.keyReleased = () => {
    if (p.keyCode === p.UP_ARROW || p.keyCode === 32) {
      bulletController.addBullet(new Bullet(defender.x, defender.y));
    }
  }

};
