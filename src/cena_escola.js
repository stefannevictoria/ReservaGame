class CenaEscola extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaEscola' });
    }

    preload() {
        // Carrega as imagens do tileset
        this.load.image("mapTileset", "assets/new/mapinha.png");
        this.load.image("colisaoTileset", "assets/new/colisao.png");
        this.load.image("blocosTileset", "assets/new/blocos1.png");
        this.load.image("blocosTileset2", "assets/new/blocos2.png");
        this.load.image("blocosTileset3", "assets/new/blocos3.png");
        this.load.image("blocosTileset5", "assets/new/blocos5.png");
        this.load.image("blocosTileset7", "assets/new/blocos7.png");

        // Carrega o arquivo JSON do mapa
        this.load.tilemapTiledJSON("map", "assets/new/mapinha.json");

        // Carrega o spritesheet do jogador
        this.load.spritesheet("player", "assets/user_walk/Sprite_Lu.png", {
            frameWidth: 1805,
            frameHeight: 2394
        });
    }

    create() {
        // Faz o fade in da câmera
        this.cameras.main.fadeIn(500);

        // Cria o tilemap
        const map = this.make.tilemap({ key: "map" });

        // Adiciona os tilesets ao mapa
        const blocosTileset = map.addTilesetImage("blocos1", "blocosTileset");
        const blocosTileset2 = map.addTilesetImage("blocos2", "blocosTileset2");
        const blocosTileset3 = map.addTilesetImage("blocos3", "blocosTileset3");
        const blocosTileset5 = map.addTilesetImage("blocos5", "blocosTileset5");
        const blocosTileset7 = map.addTilesetImage("blocos7", "blocosTileset7");
        const colisaoTileset = map.addTilesetImage("colisao", "colisaoTileset");

        // Cria as camadas do mapa
        map.createLayer("grama", [blocosTileset, blocosTileset2, blocosTileset3, blocosTileset5, blocosTileset7]);
        map.createLayer("construcao", [blocosTileset, blocosTileset2, blocosTileset3, blocosTileset5, blocosTileset7]);
        map.createLayer("detalhes", [blocosTileset, blocosTileset2, blocosTileset3, blocosTileset5, blocosTileset7]);
        map.createLayer("detalhes2", [blocosTileset, blocosTileset2, blocosTileset3, blocosTileset5, blocosTileset7]);
        const colisaoLayer = map.createLayer("colidir", colisaoTileset).setVisible(false);

        colisaoLayer.setCollisionByExclusion([-1]);

        colisaoLayer.setCollisionByExclusion([-1]);




        this.player = this.physics.add.sprite(100, 200, "player").setScale(0.02).setSize(500,830).setOffset(680,1250);
        this.player.setOrigin(0.5, 0.5);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, colisaoLayer);

        this.anims.create({ key: "andar-baixo", frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: "andar-esquerda", frames: this.anims.generateFrameNumbers("player", { start: 7, end: 8 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: "andar-direita", frames: this.anims.generateFrameNumbers("player", { start: 5, end: 6 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: "andar-cima", frames: this.anims.generateFrameNumbers("player", { start: 3, end: 4 }), frameRate: 10, repeat: -1 });

        this.cursor = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({ W: Phaser.Input.Keyboard.KeyCodes.W, A: Phaser.Input.Keyboard.KeyCodes.A, S: Phaser.Input.Keyboard.KeyCodes.S, D: Phaser.Input.Keyboard.KeyCodes.D });

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2.5);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

   

    update() {
        let moving = false;
        this.player.setVelocity(0);

        if (this.cursor.left.isDown || this.keys.A.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("andar-esquerda", true);
            moving = true;
        } else if (this.cursor.right.isDown || this.keys.D.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("andar-direita", true);
            moving = true;
        } else if (this.cursor.up.isDown || this.keys.W.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play("andar-cima", true);
            moving = true;
        } else if (this.cursor.down.isDown || this.keys.S.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play("andar-baixo", true);
            moving = true;
        }

        if (!moving) {
            this.player.anims.stop();
        }
    }
}