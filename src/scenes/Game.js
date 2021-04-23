import Phaser from 'phaser';

export default class Game extends Phaser.Scene
{
    init()
    {
        this.leftScore = 0;
        this.rightScore = 0;
    }

    preload()
    {

    }

    create()
    {
        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);
        this.ball.body.setBounce(1, 1);

        this.ball.body.setCollideWorldBounds(true, 1, 1);
        this.ball.body.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));

        this.leftPaddle = this.add.rectangle(30, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.leftPaddle);
        this.leftPaddle.body.setCollideWorldBounds(true);
        this.leftPaddle.body.setImmovable(true);

        this.rightPaddle = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.rightPaddle);
        this.rightPaddle.body.setCollideWorldBounds(true);
        this.rightPaddle.body.setImmovable(true);

        this.physics.add.collider(this.ball, this.leftPaddle);
        this.physics.add.collider(this.ball, this.rightPaddle);

        const scoreStyle = {
            fontSize: 48
        }

        this.leftScoreLabel = this.add.text(300, 125, this.leftScore, scoreStyle).setOrigin(0.5);
        this.rightScoreLabel = this.add.text(500, 375, this.rightScore, scoreStyle).setOrigin(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        this.leftPaddle.body.setVelocityY(0);
        if(this.cursors.up.isDown)
        {
            this.leftPaddle.body.setVelocityY(-200);
        }
        else if(this.cursors.down.isDown)
        {
            this.leftPaddle.body.setVelocityY(200);
        }
 
        this.rightPaddle.body.velocity.setTo(this.ball.body.velocity.y);
        this.rightPaddle.body.velocity.x = 0;
        // Pour que le paddle droit ne dépasse pas en haut ou en bas
        if(this.rightPaddle.body.y < 0) 
        {
            this.rightPaddle.body.y = 0;
        }
        else if(this.rightPaddle.body.y > (this.physics.world.bounds.height - this.rightPaddle.body.height))
        {
            this.rightPaddle.body.y = this.physics.world.bounds.height - this.rightPaddle.body.height;
        }

        if(this.ball.body.blocked.left)
        {
            console.log('score changed!');
        }
    }
}