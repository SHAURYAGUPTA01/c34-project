class Bottle {
    constructor(x, y, width, height, bottlePos) {
      var options = {
        restitution: 0.8,
        friction: 1.0,
        density: 1.0,
        label: "bottle"
      };
      this.body = Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
      this.image = loadImage("assets/bottle.png")
      this.bottlePosition = bottlePos;
      this.isBroken = false;
  
      World.add(world, this.body);
    }

    remove(index) {
      this.isBroken = true;
      setTimeout(() => {
        Matter.World.remove(world, bottles[index].body);
        bottles.splice(index, 1);
      }, 2000);
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, this.bottlePosition, this.width, this.height);
      noTint();
      pop();
    }
  }
  