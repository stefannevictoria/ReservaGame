//Criar classe para a cena
class CenaBug extends Phaser.Scene {
    constructor (){
        super({key: "CenaBug"})
    }

    //Fazer carregamento de imagem e sprite
    preload() {
        this.load.spritesheet('glitch', "assets/glitch.png", {
            frameWidth: 300,
            frameHeight: 166
        });

        this.load.image("botaoEntendido", "assets/botoes/entendidoButton.png")
    }

    create() {
        
        //Adicionar sprite do bug do fundo, diminuir e transparência
        this.bug = this.add.sprite(480, 270, "glitch").setScale(5);
        this.bug.setAlpha(0.3)

        //Criar animação de bug e reproduzir
        this.anims.create({
            key: 'bugou',
            frames: this.anims.generateFrameNumbers('glitch', {start: 0, end: 20}),
            frameRate: 15,
            repeat: -1
        });

        //Colocar animação para rodar
        this.bug.anims.play('bugou', true);

        //Criar variável "textin"
        var textin = 'Você está sendo hackeado!!!! Possui 10 minutos para resolver suas tasks, antes que seus dados sejam vazados'
        this.add.text(480, 270, textin)
        .setScale(0.8)
        .setOrigin(0.5)

        //Adicionar botão e atribuir a função de iniciar a animação de Fade Out 
        var botaozinho = this.add.image(480, 310, "botaoEntendido").setScale(0.7).setOrigin(0.5, 0.5)
            .setInteractive()
            .on("pointerdown", () => {
                if (!this.clicado) { // Impede múltiplos cliques
                    this.clicado = true; 
                    this.cameras.main.fadeOut(1350);
                }
            });
            botaozinho.setScale(0.75);

        //Trocar de cena quando acabar
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("CenaEscola");
            });
        
    };
}