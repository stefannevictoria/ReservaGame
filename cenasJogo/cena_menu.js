class CenaMenu extends Phaser.Scene {
    constructor() {
        super({ key: "CenaMenu" });
    }

    preload() {
        this.load.image("bg", "assets/menu_bg.PNG");
        this.load.image("logo", "assets/logoHackerados.png");
        this.load.image("button", "assets/botoes/playButton.png");
    }

    create() {
        // Adicionando fundo e logo
        this.add.image(700, 365, "bg").setScale(1);
        this.add.image(750, 160, "logo").setScale(0.9);

        // Criando botão
        var botao = this.add.image(745, 365, "button")
            .setScale(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.cameras.main.fadeOut(1350);

                // Apenas agora adicionamos o evento para trocar de cena corretamente
                this.cameras.main.once("camerafadeoutcomplete", () => {
                    this.scene.start("CenaTermo"); // Troque para a cena correta
                });
            });

        // Animação de "pulsação" do botão
        this.tweens.add({
            targets: botao,
            scaleX: 0.55,
            scaleY: 0.55,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
        });

        // Efeitos visuais ao passar o mouse
        botao.on("pointerover", () => {
            botao.setScale(0.45);
            botao.setAlpha(0.7);
        });

        botao.on("pointerout", () => {
            botao.setScale(0.5);
            botao.setAlpha(1);
        });
    }
}
