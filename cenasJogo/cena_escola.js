//Criar classe para a cena da escola
class CenaEscola extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaEscola'});
    }

    //Carregar imagem e sprite
    preload(){
        this.load.image('inSchool', 'assets/fundosJogo/mapaOficial.png');

        this.load.spritesheet("player", "assets/user_walk/Sprite_Lu.png", {
            frameWidth: 1805,
            frameHeight: 2394
        });
    }

    
    create() {
        //Adicionar animação de Fade In no início da cena
        this.cameras.main.fadeIn(500);
        
        //Criar o fundo no centro do mapa sem redimensionamento
        var background = this.add.image(500 / 2, 515 / 2, 'inSchool').setOrigin(0.5, 0.5);
        
        //Criar o jogador
        this.player = this.physics.add.sprite(400, 400, "player").setScale(0.04);
        this.player.setCollideWorldBounds(true);

        //Criar animações juntamente a seus frames para cada posição em que ele caminhar
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

        //Criar os controles
        this.cursor = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });

        //Colocar a câmera para seguir personagem e setar seu zoom
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2.5); 
        
        
        //Configurar os limites do mundo e da câmera corretamente
        this.physics.world.setBounds(-50, 0, 496, 509);
        this.cameras.main.setBounds(0, 0, 496, 509);

    }

    update(){
            
        //Definir o estado inicial do personagem
        let moving = false;
        this.player.setVelocity(0);

    //Adicionar os comandos que vão rodar quando cada tecla são pressionadas
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