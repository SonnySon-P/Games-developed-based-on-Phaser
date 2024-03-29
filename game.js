class GameScene extends Phaser.Scene{
    constructor() {
        super({ key: 'GameScene' });
        this.score = 0;
    }
    
    preload() {
        this.load.image('sky', './assets/sky.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.image('mountain', './assets/mountain.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.image('pine1', './assets/pine1.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.image('pine2', './assets/pine2.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.image('ground', './assets/ground.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.image('props', './assets/props.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.tilemapTiledJSON('map', './assets/map.json');

        this.load.spritesheet('Adam_Smith', 'assets/Adam_Smith.png', {
            frameWidth: 32,
            frameHeight: 32, 
        });
        this.load.spritesheet('Abigail_Chen', 'assets/Abigail_Chen.png', {
            frameWidth: 32,
            frameHeight: 32, 
        });
        this.load.image('dollar', './assets/dollar.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    create() {    
        const map = this.make.tilemap({key: 'map', tileWidth: 16, tileHeight: 16});
        const tileset1 = map.addTilesetImage('sky');
        this.skyLayer = map.createLayer('Sky', tileset1, 0, 0);
        const tileset2 = map.addTilesetImage('mountain');
        this.mountainLayer = map.createLayer('Mountain', tileset2, 0, 0);
        const tileset3 = map.addTilesetImage('pine1');
        this.pine1Layer = map.createLayer('Pine1', tileset3, 0, 0);
        const tileset4 = map.addTilesetImage('pine2');
        this.pine2Layer = map.createLayer('Pine2', tileset4, 0, 0);
        const tileset5 = map.addTilesetImage('ground');
        const tileset6 = map.addTilesetImage('props');
        this.groundLayer = map.createLayer('Ground', [tileset5, tileset6], 0, 0);
        this.groundLayer.setCollisionByExclusion([-1]);
        this.decorLayer = map.createLayer('Props', tileset6, 0, 0);

        this.cameras.main.setBounds(0, 0, 2016, 320, false);
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(0, 320);

        this.player = this.physics.add.sprite(20, 200, 'Abigail_Chen')
            .setBounce(0.1)
            .setCollideWorldBounds(true)

        this.physics.world.enable(this.player);
        this.player.setBounce(0);

        this.player.setCollideWorldBounds(false);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        this.anims.create({
            key: 'playerLeft',
            frames: this.anims.generateFrameNumbers('Abigail_Chen', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: 1,
        });
        this.anims.create({
            key: 'playerRight',
            frames: this.anims.generateFrameNumbers('Abigail_Chen', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: 1,
        });
        this.anims.create({
            key: 'playerTurn',
            frames: this.anims.generateFrameNumbers('Abigail_Chen', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1,
        });

        this.anims.create({
            key: 'enemyLeft',
            frames: this.anims.generateFrameNumbers('Adam_Smith', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: 1,
        });
        this.anims.create({
            key: 'enemyRight',
            frames: this.anims.generateFrameNumbers('Adam_Smith', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: 1,
        });

        this.enemy1 = this.physics.add.sprite(190, 150, 'Adam_Smith');
        this.physics.world.enable(this.enemy1);
        this.enemy1.setBounce(0);

        this.enemy2 = this.physics.add.sprite(590, 200, 'Adam_Smith');
        this.physics.world.enable(this.enemy2);
        this.enemy2.setBounce(0);

        this.enemy3 = this.physics.add.sprite(1100, 100, 'Adam_Smith');
        this.physics.world.enable(this.enemy3);
        this.enemy3.setBounce(0);

        this.enemy4 = this.physics.add.sprite(1820, 100, 'Adam_Smith');
        this.physics.world.enable(this.enemy4);
        this.enemy4.setBounce(0);

        this.coins = this.physics.add.staticGroup();
        this.coins.create(50, 280, 'dollar');
        this.coins.create(80, 280, 'dollar');
        this.coins.create(140, 232, 'dollar');
        this.coins.create(210, 232, 'dollar');
        this.coins.create(270, 200, 'dollar');
        this.coins.create(350, 232, 'dollar');
        this.coins.create(350, 232, 'dollar');
        this.coins.create(432, 200, 'dollar');
        this.coins.create(440, 280, 'dollar');
        this.coins.create(480, 168, 'dollar');
        this.coins.create(545, 136, 'dollar');
        this.coins.create(622, 120, 'dollar');
        this.coins.create(684, 280, 'dollar');
        this.coins.create(850, 232, 'dollar');
        this.coins.create(950, 216, 'dollar');
        this.coins.create(980, 216, 'dollar');
        this.coins.create(1010, 216, 'dollar');
        this.coins.create(1160, 216, 'dollar');
        this.coins.create(1190, 216, 'dollar');
        this.coins.create(1220, 216, 'dollar');
        this.coins.create(1310, 216, 'dollar');
        this.coins.create(1600, 216, 'dollar');
        this.coins.create(1665, 184, 'dollar');
        this.coins.create(1720, 184, 'dollar');
        this.coins.create(1750, 184, 'dollar');
        this.physics.world.enable(this.coins);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreText = this.add.text(10, 10, '', {
            font: '18px monospace',
            fill: '#ffffff',
        }).setScrollFactor(0);

        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.enemy1, this.groundLayer);
        this.physics.add.collider(this.player, this.enemy1, this.colliderEnemy, null, this);
        this.physics.add.collider(this.enemy2, this.groundLayer);
        this.physics.add.collider(this.player, this.enemy2, this.colliderEnemy, null, this);
        this.physics.add.collider(this.enemy3, this.groundLayer);
        this.physics.add.collider(this.player, this.enemy3, this.colliderEnemy, null, this);
        this.physics.add.collider(this.enemy4, this.groundLayer);
        this.physics.add.collider(this.player, this.enemy4, this.colliderEnemy, null, this);
        this.physics.add.collider(this.coins, this.player, this.colliderCoin, null, this);
    }

    colliderCoin(player, coins){
        coins.disableBody(true, true);
        this.score++;
    }

    colliderEnemy (player, enemy) {
        this.physics.pause();
        player.setTint(0xff0000);   
        player.anims.play('turn');
        
        setTimeout(() => {
            this.scene.start('GameOverScene');
        }, 1000)
    }

    update(time, delta) {
        if (parseInt(time / 2000) % 2 == 0) {
            this.enemy1.setVelocityX(-20);
            this.enemy1.anims.play('enemyLeft', true);
            this.enemy2.setVelocityX(-20);
            this.enemy2.anims.play('enemyLeft', true);
            this.enemy3.setVelocityX(-20);
            this.enemy3.anims.play('enemyLeft', true);
            this.enemy4.setVelocityX(-20);
            this.enemy4.anims.play('enemyLeft', true);
        } else {
            this.enemy1.setVelocityX(20);
            this.enemy1.anims.play('enemyRight', true);
            this.enemy2.setVelocityX(20);
            this.enemy2.anims.play('enemyRight', true);
            this.enemy3.setVelocityX(20);
            this.enemy3.anims.play('enemyRight', true);
            this.enemy4.setVelocityX(20);
            this.enemy4.anims.play('enemyRight', true);
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('playerLeft', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('playerRight', true);
        } else if (this.cursors.space.isDown) {
            this.player.setVelocityY(-330);
            this.player.anims.play('playerTurn', true);
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }

        this.scoreText.setText('Score:' + this.score);

        if (this.player.y > 320) {
            this.scene.start('GameOverScene');
        }

        if (this.player.x > 2010 && this.coins >= 20) {
            this.scene.start('WinScene');
        }
    }
}