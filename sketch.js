const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, table, ground, gunImg, bottleImg, bulletImg, gun, bottle;
var bullets = [];
var bottles = [];
var score = 0;

var isGameOver = false;
var fireSound;
var isGameOver = false

function preload() {
  backgroundImg = loadImage("assets/bg.png")
  tableImg = loadImage("assets/table.png")

}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(300, height, width, 20);
  gun = new Gun(180, 110, 100, 50, angle);
  table = createSprite(100, 355, 20, 20)
  table.addImage("myTable", tableImg)
  table.scale = 0.02
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  if (!bgMusic.isPlaying()) {
    bgMusic.play()
    bgMusic.setVolume(0.1)
  }

  Engine.update(engine);
  ground.display();
  ground.show();
  Table.show()
  showBottles();

  for (var i = 0; i < bullets.length; i++) {
    showCannonBullets(bullets[i], i);
    for (var j = 0; j < bottles.length; j++) {
      if (bottles[i] !== undefined && bottles[j] !== undefined) {
        var collision = Matter.SAT.collides(bottles[i].body, bottles[j].body);
        if (collision.collided) {
          if (!bottles[j].isBroken) {
            score += 5;
            bottles[j].remove(j);
            j--;
          }

          Matter.World.remove(world, bullets[i].body);
          bullets.splice(i, 1);
          i--;
        }
      }
    }
  }

  Gun.display();
  table.display();

  fill("#6d4c41");
  textSize(40);
  text(`Score:${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var bullet = new bullets(gun.x, gun.y);
    bullet.trajectory = [];
    Matter.Body.setAngle(bullet.body, bullet.angle);
    bullets.push(bullet);
  }
}

function showBullets(bullet) {
  bullet.display();
  bullet.animate();

}

function showBottles() {
  if (bottles.length > 0) {
    if (
      bottles.length < 4 &&
      bottles[bottles.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var bottle = new bottle(
        width,
        height - 100,
        170,
        170,
        position,
        bottleAnimation
      );

      bottles.push(bottle);
    }

    for (var i = 0; i < bottles.length; i++) {
      Matter.Body.setVelocity(bottles[i].body, {
        x: -0.9,
        y: 0
      }
      );

      bottles[i].display();
      bottles[i].animate();
      var collision = Matter.SAT.collides(table, bottles[i].body);
      if (collision.collided && !bottles[i].isBroken) {
        isGameOver = true;
        gameOver();
      }
    }
  } else {
    var bottle = new Bottle(width, height - 60, 170, 170, -60);
    bottles.push(bottle);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    bullets[bullets.length - 1].shoot();
    fireSound.play()
  }

}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}