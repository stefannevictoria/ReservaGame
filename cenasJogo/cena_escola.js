//Criando classe para a cena 
class CenaEscola extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaEscola'});
    }

    preload(){
        this.load.image('inSchool', 'assets/fundosJogo/mapaOficial.png');

        this.load.spritesheet("player", "assets/user_walk/Sprite_Lu.png", {
            frameWidth: 1805,
            frameHeight: 2394
        });
    }

    
    create() {
        // Animação de Fade In no início da cena
        this.cameras.main.fadeIn(500);
        
        // Adicionando o fundo e mudando a escala
        var background = this.add.image(767.5, 365, 'inSchool').setOrigin(0.5, 0.5);
        background.setScale(2.0);
        
        
        // Criando o jogador
        this.player = this.physics.add.sprite(400, 400, "player").setScale(0.07);
        this.player.setCollideWorldBounds(true);

        // Criando animações
        this.anims.create({
            key: "andar-baixo",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "andar-esquerda",
            frames: this.anims.generateFrameNumbers("player", { start: 7, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "andar-direita",
            frames: this.anims.generateFrameNumbers("player", { start: 5, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "andar-cima",
            frames: this.anims.generateFrameNumbers("player", { start: 3, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        // Criando os controles
        this.cursor = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update(){
            
        // Definindo o estado inicial do personagem
        let moving = false;
        this.player.setVelocity(0);

        // Adicionando os comandos que vão rodar quando cada tecla são pressionadas
        if (this.cursor.left.isDown || this.keys.A.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("andar-esquerda", true);
            moving = true;
        } 
        
        else if (this.cursor.right.isDown || this.keys.D.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("andar-direita", true);
            moving = true;
        } 
    
        else if (this.cursor.up.isDown || this.keys.W.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play("andar-cima", true);
            moving = true;
        } 
    
        else if (this.cursor.down.isDown || this.keys.S.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play("andar-baixo", true);
            moving = true;
        } 

        if (!moving) {
            this.player.anims.stop();
        }
    }
}