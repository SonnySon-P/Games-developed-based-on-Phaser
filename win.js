class WinScene extends Phaser.Scene{
    constructor() {
        super({ key: 'WinScene' });
    }
    
    preload() {

    }

    create()
    {    
        this.gameOver = this.add.text(config.width / 2, config.height / 2, 'You Win!', {
            color: '#ffffff',
            fontFamily: 'monospaces',
            fontSize: 40,
            resolution: 2
        }).setOrigin(0.5, 0.5)
    }

    update() {

    }
}