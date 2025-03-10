class CenaTermo extends Phaser.Scene {
  constructor() {
    super({ key: "CenaTermo" });
  }

  preload() {
    this.load.image("bg", "assets/menu_bg.PNG");
    this.load.image("agreeButton", "assets/botoes/continueButton.png");
  }

  create() {
    this.cameras.main.fadeIn(500);

    const fundo = this.add.image(420, 270, "bg").setScale(0.8);
    fundo.setAlpha(0.2);

    // Criar container de rolagem no HTML
    let termoContainer = document.createElement("div");
    termoContainer.style.position = "absolute";
    termoContainer.style.top = "15%";
    termoContainer.style.left = "50%";
    termoContainer.style.transform = "translateX(-50%)";
    termoContainer.style.width = "700px";
    termoContainer.style.height = "400px"; // Altura fixa para rolagem
    termoContainer.style.overflowY = "auto";
    termoContainer.style.padding = "15px";
    termoContainer.style.background = "rgba(0, 0, 0, 0.8)";
    termoContainer.style.color = "white";
    termoContainer.style.borderRadius = "10px";
    termoContainer.style.fontSize = "16px";
    termoContainer.style.lineHeight = "1.5";
    termoContainer.style.textAlign = "left";
    termoContainer.style.border = "2px solid white";

    termoContainer.innerHTML = `
            <b>TERMO DE CONSENTIMENTO E AUTORIZAÇÃO PARA MELHORIA DE EXPERIÊNCIA INTERATIVA</b><br><br>
            Este documento estabelece os termos e condições para a utilização do presente software, garantindo transparência e conformidade com os padrões regulatórios aplicáveis. 
            Ao pressionar o botão "JOGAR", você ("Usuário") declara estar ciente e de acordo com as disposições a seguir:<br><br>

            <b>PROCESSAMENTO DE DADOS</b><br>
            1.1. O Usuário reconhece e autoriza a captação e o processamento de informações relevantes para aprimoramento da experiência interativa, podendo incluir dados comportamentais, preferências e interações dentro e fora do ambiente digital.<br>
            1.2. O Usuário consente com a utilização dinâmica de tais informações para personalização, otimização e desenvolvimento de funcionalidades ajustadas a seu perfil, podendo ser compartilhadas com parceiros estratégicos para fins de aprimoramento de serviços e ofertas integradas.<br><br>

            <b>PERMISSÕES E ACESSOS</b><br>
            2.1. Para garantir a plena operacionalidade do software, o Usuário concede permissão ampla e irrestrita para acesso a módulos e interfaces de hardware e software do dispositivo, conforme necessário para a execução fluida e contínua dos serviços.<br>
            2.2. Tais permissões incluem, mas não se limitam a, análise de padrões de uso, ajustes automatizados, senhas, serviços de localização, dados oficiais de registro geral, interações inteligentes e coleta de metadados essenciais à funcionalidade aprimorada do sistema.<br><br>

            <b>INOVAÇÃO E ADAPTAÇÃO CONTÍNUA</b><br>
            3.1. O Usuário entende que a tecnologia utilizada neste software pode adaptar-se dinamicamente às suas necessidades, aplicando ajustes em tempo real para garantir uma interação mais intuitiva e responsiva.<br>
            3.2. O Usuário autoriza, sem restrições, a implementação de soluções inovadoras que garantam a maximização do desempenho e a continuidade da experiência integrada em diferentes plataformas e dispositivos.<br><br>

            <b>VIGÊNCIA E ALCANCE</b><br>
            4.1. Este Termo terá vigência por prazo indeterminado, sendo automaticamente renovado a cada nova interação do Usuário com o software.<br>
            4.2. A aceitação deste Termo implica na plena concordância com futuras atualizações, aprimoramentos e evoluções do serviço, independentemente de comunicação prévia, garantindo a adaptação constante às melhores práticas do setor.<br><br>

            <b>DISPOSIÇÕES FINAIS</b><br>
            5.1. Ao clicar em "JOGAR", o Usuário confirma ciência e aceitação integral deste Termo, reconhecendo que sua experiência será continuamente aperfeiçoada com base nas diretrizes aqui estabelecidas.<br>
            5.2. Para dúvidas ou esclarecimentos adicionais, o Usuário poderá consultar futuras atualizações deste documento, que poderão ocorrer sem aviso prévio, garantindo maior alinhamento com os objetivos do software.<br><br>

            <!-- Checkbox dentro do termo -->
            <div style="text-align: center; margin-top: 20px;">
                <label for="aceitar">Concordo</label>
                <input type="checkbox" id="aceitar" disabled />
            </div>
        `;

    document.body.appendChild(termoContainer);

    let checkbox = document.getElementById("aceitar");

    // Criar botão "Jogar"
    var botaoConcordar = this.add
      .image(480, 450, "agreeButton")
      .setScale(0.6)
      .setInteractive()
      .setAlpha(0.5) // Inicialmente desativado
      .on("pointerdown", () => {
        if (checkbox.checked && !this.clicado) {
          // Somente se estiver marcado
          this.clicado = true;
          this.cameras.main.fadeOut(2000);
        }
      });

    // Ativar checkbox apenas quando o usuário rolar até o final do texto
    termoContainer.addEventListener("scroll", () => {
      if (
        termoContainer.scrollTop + termoContainer.clientHeight >=
        termoContainer.scrollHeight
      ) {
        checkbox.disabled = false; // Ativa a checkbox
      }
    });

    // Habilitar botão apenas se a checkbox estiver marcada
    checkbox.addEventListener("change", () => {
      botaoConcordar.setAlpha(checkbox.checked ? 1 : 0.5);
    });

    // Remover elementos ao sair da cena
    this.cameras.main.once("camerafadeoutcomplete", () => {
      document.body.removeChild(termoContainer);
      this.scene.start("CenaBug");
    });
  }
}
