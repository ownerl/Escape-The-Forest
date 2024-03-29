// Interactables and obstacles

export class KeyObject {
    constructor(game) {
        this.game = game;
        this.width = 3;
        this.height = 1.7;
        this.treeTopOffset = this.game.player.treeTopOffset;
        this.treeBottomOffset = this.game.player.treeBottomOffset;
        this.treeRightOffset = this.game.player.treeRightOffset;
        this.treeLeftOffset = this.game.player.treeLeftOffset;
        this.x = 5 + Math.random() * 80;
        this.y = 5 + Math.random() * 80;
        this.key = new Image();
        this.key.src = './images/key.png';
        this.width = (this.width / 100) * this.game.width;
        this.height = (this.height / 100) * this.game.height;
        this.x = (this.x / 100) * this.game.width;
        this.y = (this.y / 100) * this.game.height;
    }
    update(player, color, keySound) {
        if (
            player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y
        ) {
            this.x = player.x + (0.9 / 100) * this.game.width;
            this.y = player.y + (3 / 100) * this.game.height;
            if (!this.game.keysCollected.includes(color)) {
                keySound.play();
                this.game.keysCollected.push(color);
            }
        }
    }
    render(context) {
        context.drawImage(this.key, this.x, this.y, this.width, this.height);
    }
}

export class Door {
    constructor(game) {
        this.game = game;
        this.width = 6;
        this.height = 6;
        this.randomSeed = Math.random() * 2;
        if (this.randomSeed < 1) {
            this.x = Math.random() * 2;
            this.y = Math.random() * 95;
        } else {
            this.x = 92 + Math.random() * 2;
            this.y = Math.random() * 95;
        }
        this.door = new Image();
        this.door.src = './images/door.png';
        this.width = (this.width / 100) * this.game.width;
        this.height = (this.height / 100) * this.game.height;
        this.x = (this.x / 100) * this.game.width;
        this.y = (this.y / 100) * this.game.height;
    }
    update(player, hatch) {
        if (
            this.game.keysCollected.length === 1 && 
            player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y
            ) {
            hatch.play();
            this.game.win = true;
        }
    }
    render(context) {
        context.drawImage(this.door, this.x, this.y, this.width, this.height);
    }
}

export class Obstacle {
    constructor(width, height) {
        this.gameWidth = width;
        this.gameHeight = height;
        this.width = 4;
        this.height = 4;
        this.x = 5 + Math.random() * 80;
        this.y = Math.random() * 90;
        this.trees = new Image();
        this.trees.src = './images/tree.png';
        this.width = (this.width / 100) * this.gameWidth;
        this.height = (this.height / 100) * this.gameHeight;
        this.x = (this.x / 100) * this.gameWidth;
        this.y = (this.y / 100) * this.gameHeight;
    }
    render(context, player) {
        if (
            player.y + player.height > this.y + (0.06 * this.gameHeight) &&
            player.y < this.y + this.height + (0.14 * this.gameHeight) &&
            player.x + player.width > this.x + (0.04 * this.gameWidth) &&
            player.x < this.x + this.width + (0.06 * this.gameWidth)
        ) {
            context.save();
            context.globalAlpha = 0.3;
            context.drawImage(this.trees, this.x, this.y, this.width + (0.1 * this.gameWidth), this.height + (0.16 * this.gameHeight));
            context.restore();
        } else {
            context.drawImage(this.trees, this.x, this.y, this.width + (0.1 * this.gameWidth), this.height + (0.16 * this.gameHeight));
        }
    }
}