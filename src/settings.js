//Definir as configurações do jogo
const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    scale: {
        mode: Phaser.Scale.FIT,
    
    },
    physics: { default: "arcade", arcade: { debug: false}},
    scene: [CenaMenu, CenaTermo, CenaBug, CenaEscola]
};

//Criar o jogo
const game = new Phaser.Game(config);
