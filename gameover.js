class GameOverScene extends Phaser.Scene{
    constructor() {
        super({ key: 'GameOverScene' });
    }
    
    preload() {

    }

    create() {    
        this.gameOver = this.add.text(config.width / 2, config.height / 2, 'Game Over', {
            color: '#ff0000',
            fontFamily: 'monospace',
            fontSize: 40,
            resolution: 2
        }).setOrigin(0.5, 0.5)

        this.restart = this.add.text(config.width / 2, 200, 'restart', {
            color: '#ffffff',
            fontFamily: 'monospace',
            fontSize: 20,
            resolution: 2,
        }).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true})
            .on('pointerup',() => {
                this.scene.start('GameScene');
            }, this)
            .on('pointerover', () => {
                this.restart.alpha = 0.5;
            }, )
            .on('pointerout', () => {
                this.restart.alpha = 1;
            })
    }

    update() {

    }
}