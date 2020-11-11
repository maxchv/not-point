const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 896,
  height: 448,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: true
    },
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("tiles", "./assets/tilesets/tilesetll.png");
  this.load.image('player', './assets/images/player.png');
  this.load.image('cobblestone', './assets/images/cobblestone.png');
  this.load.image('eat', './assets/images/eat.png');
  this.load.tilemapTiledJSON('map', './assets/tilemaps/level5.json');
}

let player;
let cursors;

function create() {

  const map = this.make.tilemap({
    key: 'map',
    tileWidth: 64,
    tileHeight: 64
  });

  const tiles = map.addTilesetImage('tilesetll', "tiles");

  const wall = map.createStaticLayer('wall', tiles, 0, 0);

  const floor = map.createStaticLayer('floor', tiles, 0, 0);

  wall.setCollisionByExclusion(-1, true);

  player = this.physics.add.sprite(96, 96, 'player');
  //player.setGravityY(100);
  //console.log(player.getGravity());
  player.setBounce(0);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, wall);

  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.on('keydown-S', function () {
    console.log(player.y);
    if (player.y + 2*64 < config.height) {
      player.setY(player.y + 64);
    }
  });
  this.input.keyboard.on('keydown-W', function () {
    player.setY(player.y - 64); 
  });
  this.input.keyboard.on('keydown-A', function () {
    player.setX(player.x - 64); 
  });
  this.input.keyboard.on('keydown-D', function () {
    player.setX(player.x + 64); 
  });

  const eats = [];
  map.findObject('eat', obj => {
    console.log(obj);
    eats.push(this.physics.add.sprite(obj.x - obj.width / 2, obj.y - obj.height / 2, 'eat'));
    eats[eats.length - 1].setGravityY(50);
  });

  this.physics.add.collider(eats, wall);
  this.physics.add.collider(eats, player);

  const shields = [];
  map.findObject("shield", obj => {
    //console.log(obj);
    shields.push(this.physics.add.sprite(obj.x - obj.width/2, obj.y - obj.height/2, 'cobblestone')); 
  });
  this.physics.add.collider(shields, wall);
  this.physics.add.collider(shields, player);
  this.physics.add.collider(eats, shields);
}

function update() {
  // player.setVelocityX(0);
  
  // if (cursors.left.isDown) {
  //   //player.setVelocityX(-200);
  //   player.setX(player.x - 64);
  // } else if (cursors.right.isDown) {
  //   //player.setVelocityX(200);
  //   player.setX(player.x + 64);
  // } else if (cursors.up.isDown) {
  //   player.setVelocityY(-200);
  // } else if (cursors.down.isDown) {
  //   player.setVelocityY(200);
  // } 

  /*if ((cursors.space.isDown || cursors.up.isDown)) {
    player.setVelocityY(-350);
  }*/
}