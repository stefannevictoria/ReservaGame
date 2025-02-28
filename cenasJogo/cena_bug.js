//Criar classe para a cena
class CenaBug extends Phaser.Scene {
    constructor (){
        super({key: "CenaBug"})
    }

    //Fazer carregamento de imagens e sprite
    preload() {
        this.load.spritesheet('glitch', "assets/glitch.png", {
            frameWidth: 300,
            frameHeight: 166
        });

        this.load.image("botaoEntendido", "assets/botoes/entendidoButton.png")
    }

    create() {
        
        // Adicionar sprite do bug do fundo, diminuir e transparência
        this.bug = this.add.sprite(737.5, 270, "glitch").setScale(7);
        this.bug.setAlpha(0.3)

        // Criar animação de bug e reproduzir
        this.anims.create({
            key: 'bugou',
            frames: this.anims.generateFrameNumbers('glitch', {start: 0, end: 20}),
            frameRate: 15,
            repeat: -1
        });

        //Colocar animação para rodar
        this.bug.anims.play('bugou', true);

        var textin = 'Você está sendo hackeado!!!! Possui 10 minutos para resolver suas tasks, antes que seus dados sejam vazados'

        //Adicionar botão e atribuir a função de iniciar a animação de Fade Out 
        this.add.text(737.5, 365, textin).setOrigin(0.5)
        var botaozinho = this.add.image(737.5, 430, "botaoEntendido").setOrigin(0.5, 0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.cameras.main.fadeOut(1350)
            });

        //Trocar de cena quando acabar
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("CenaEscola");
            });
        botaozinho.setScale(0.75);
    };
}