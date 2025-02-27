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
        
        // Adicionando o fundo no centro do mapa sem redimensionamento
        var background = this.add.image(496 / 2, 509 / 2, 'inSchool').setOrigin(0.5, 0.5);
        
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

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2); // Ajuste o valor conforme desejar
        
        // Configurar os limites do mundo e da câmera corretamente
        this.physics.world.setBounds(0, 0, 496, 509);
        this.cameras.main.setBounds(0, 0, 496, 509);

        // Ajustando o zoom da câmera
        this.cameras.main.setZoom(2.5);

        // Fazendo a câmera seguir o jogador
        this.cameras.main.startFollow(this.player);

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