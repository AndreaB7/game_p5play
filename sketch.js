// GAME basado en el siguiente tutorial:
// "https://www.udemy.com/build-the-next-great-video-game-using-the-hottest-tools/learn/v4/content";

// 01 creas el ship + pones las primeras animaciones
// 02 creas el S --> sprite (cubos interacción) + en movimiento
// 03 creas los asteroides --> los pones con .add para que formen parte del grupo de S
// 04 ajustas sprites contenidas en canvas + propiedades de collider
// 05-6 ajustas parámetros del ship / animation + parámetros del texto
// 07 parámetros del keys
// 08 reajustar el collider + crear nueva imagen para asteroides
// 09 creamos un COMMAND para los asteriodes (reemplaza antiguo código)
// 10 crear el random con imágenes de asteroides asteroides + set los parámetros del asteroid
// 11 relación entre los sprites de los asteroides y los sprites de los bullets

var ship;
var temp1;
var temp2;
// var asteroidGroup = []; // asi defines que es un array
var asteroidGroup;
// var bulletGroup = []; // asi defines que es un array
var bulletGroup;

var MARGIN = 40;


function preload() {

  temp1 = loadImage("img/ship1.png");
  temp2 = loadImage("img/y-bullet.png");
}

function setup(){

  // 001 creas las primeras animaciones con SHIP + el sprite
  createCanvas (800, 600);


  // sprite = caja mágica de animacions p5.play
  ship = createSprite(width/2, height/2, 200, 200);

  ship.addImage("normal", temp1);

  ship.addAnimation("normal", "img/ship1.png", "img/ship4.png");
  ship.addAnimation("green", "img/ship-g0.png", "img/ship-g5.png");

  // 003 creación de Asteroides + Collider (area de proteccion del ship)

  ship.setCollider("circle", 0, 0, 150);

  // 005 parámetros de la animation set
  ship.scale = 0.5;
  ship. maxSpeed = 6 ;
  ship.friction = 0.20;

  // funciona con el set Collider (el área verde de la ship)
  ship.debug = true;

  // 002 creación de los obstáculos de interacción (asteroides) en Sprites
  // new array --> lo defines dentro de setup como un array = new Group, sino no funcionará
  asteroidGroup = new Group();

  bulletGroup = new Group();

  for(var i = 0; i < 10; i++){
    // ======= el siguiente código comentado es la versión anterior ====
    // s = sprite variable
    //var s = createSprite(random(0, width), random(0, height));
    //s.setSpeed(random(3,5), random(0,360));
    // add es similar a push

    var px = random (0,width);
    var py = random (0,height);
    createAsteroid(3, px, py);
  }
}


function draw() {

  background(50);
  fill(255);

//006 parámetros del texto

  textAlign(CENTER);
  text("Controls Arrow keys + x", width/2, 20);

// 004 sprites contenidos en canvas
// selects sprites in the array "allSprites" and calls the selected Sprite "s" --> propiedad de p5. play
  for(var i = 0; i < allSprites.length; i++){
    var s = allSprites[i];

    //resets the position in case S goes outside the canvas
    if(s.position.x > width + MARGIN){
      s.position.x = - MARGIN;
    }
    if(s.position.x < - MARGIN){
      s.position.x = width + MARGIN;
    }
    // if the position is on the top bottom, reimerge at the top
    if(s.position.y > height + MARGIN){
      s.position.y = - MARGIN;
    }
    // if the position is on the top, reimerge at the top bottom
    if(s.position.y < - MARGIN){
      s.position.y = height + MARGIN;
    }
  }

// 007 rotación de la nave
  if(keyDown(LEFT_ARROW)){
    // ship.roation -= 4
    ship.rotation = ship.rotation -4;
  }

  if(keyDown(RIGHT_ARROW)){
    ship.rotation += 4;
  }

  if(keyDown(UP_ARROW)){
    ship.changeAnimation("thrust");
    // si no añadimos ship.rotation, la nave no se mueve bien
    ship.addSpeed(0.6, ship.rotation -90);
  } else {
    ship.changeAnimation("normal");
  }

// 008 añades BULLETS
//keyDown te crea un array de bullets
  if(keyWentDown("x")){

    var bullet = createSprite(ship.position.x, ship.position.y);
    bullet.addImage(temp2);
    bullet.scale = 0.5;
    bullet.setSpeed(10 + ship.getSpeed(), ship.rotation - 90);
    bullet.life = 30;
    bulletGroup.add(bullet);
  }

  // 011 asteroid overlap
  //asteroidGroup.overlap(bulletGroup, asteroidHit);


  // ship no permite un overlap con los asteroides
  ship.bounce(asteroidGroup);

  // al final de todo
  drawSprites();


} // end function draw


function createAsteroid(type, x, y){

  var myAsteroid = createSprite(x,y);

  //10 random de imágenes
  var img = loadImage("img/asteroid" + floor(random(1,5)) + ".png");

  // te permite añadir las imágenes de asteroid y moverlas
  myAsteroid.addImage(img);
  myAsteroid.setSpeed(2.5 - (type/2), random(0, 360));
  myAsteroid.rotationSpeed = random(-0.5, 0.5);

  // see the collision areas
  myAsteroid.debug = true;

  // we set "type" as a property of the sprite
  myAsteroid.type = type;
  //console.log(myAsteroid.type);

  if(type === 3){
    myAsteroid.scale = 0.7;
  } else if (type === 2){
    myAsteroid.scale = 0.5;
  } else if (type === 1){
    myAsteroid.scale = 0.2;
  }

  myAsteroid.mass = 2 + myAsteroid.scale;

  myAsteroid.setCollider("circle", 0, 0, 80);

  asteroidGroup.add(myAsteroid);
}

// 011 asteroidHit function

/*function asteroidHit(anyAsteroid){
  var newType = anyAsteroid.type - 1;
  console.log(anyAsteroid);
}
/*
function asteroidHit(a,b){
  var newType = a.type - 1;
  console.log(a.type);
/*
  // when you make disappear an asteroid, create 2 news
  if(newType > 0){
    createAsteroid(newType.asteroid.position.x, asteroid.position.y);
  }

  bullet.remove();

  asteroid.remove();

}

*/




