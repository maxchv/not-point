var config = {
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
  }
};

var map;
var tileset;
var layer;
var player;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('wall', 'assets/images/block.png');
  this.load.image('background', 'assets/images/edible block.jpg');
  this.load.image('tiles', 'assets/tilesets/tilesetll.png');
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
  this.load.image('player', 'assets/images/player.png');
}

function create() { 
  map = this.make.tilemap({ key: 'map' });
  tileset = map.addTilesetImage('tilesetll', 'tiles');
  layer = map.createStaticLayer('Platforms', tileset, 0, 0);




  player = this.physics.add.sprite(50, 300, 'player');

}

function update() {

}