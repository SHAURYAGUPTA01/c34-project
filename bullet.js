class bullet {
  constructor(x, y) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
      isStatic: true
    };
    this.r = 30;
    this.speed = 0.05;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("assets/bullet.png");
    this.trajectory = [];
    this.isSink = false;
    World.add(world, this.body);
  }

  remove(index) {
    this.isSink = true;
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

    setTimeout(() => {
      Matter.World.remove(world, this.body);
      bullets.splice(index, 1);
    }, 1000);
  }

  shoot() {
    var velocity = p5.Vector.fromAngle(gun.angle);
    velocity.mult(20);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.r, this.r);
    pop();

    if (
      this.body.velocity.x > 0 &&
      this.body.position.x > 300 &&
      !this.isSink
    ) {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}