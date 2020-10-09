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

function create() { 

 
  const map = this.make.tilemap({ key: 'map', tileWidth: 64, tileHeight: 64 });
  const tiles = map.addTilesetImage('tilesetll', "tiles");

  const wall = map.createStaticLayer('wall', tiles, 0, 0);
  const floor = map.createStaticLayer('floor', tiles, 0, 0);

  player = this.physics.add.sprite(96, 96, 'player');
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, wall);
}

function update() {

}