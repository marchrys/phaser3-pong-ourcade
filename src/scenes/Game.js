import Phaser from 'phaser';

export default class Game extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
        const ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(ball);
        ball.body.setBounce(1, 1);

        ball.body.setCollideWorldBounds(true, 1, 1);

        ball.body.setVelocity(-200, 0);

        const leftPaddle = this.add.rectangle(30, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(leftPaddle);
        leftPaddle.body.setImmovable(true);

        this.physics.add.collider(ball, leftPaddle);
    }
}