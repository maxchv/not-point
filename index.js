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
        y: 100
      },
      debug: true
    },
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("tiles", "./assets/tilesets/tilesetll.png");
  this.load.image('player', './assets/images/player.png');
  this.load.tilemapTiledJSON('map', './assets/tilemaps/level1.json')
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
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, wall);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
  } else {
    player.setVelocityX(0);
  }

  if ((cursors.space.isDown || cursors.up.isDown)) {
    player.setVelocityY(-350);
  }
}