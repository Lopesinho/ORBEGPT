// Formulário de contato da Orbe.
// ATENÇÃO: por enquanto ele só mostra a mensagem de sucesso (não envia nada para ninguém).
// Para enviar de verdade, o grupo precisa ligar o formulário a um serviço (por exemplo, Formspree).

(function () {
    const form = document.getElementById("contato-form");
    const success = document.getElementById("contato-sucesso");
    const again = document.getElementById("contato-novo");

    if (!form || !success || !again) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Aqui entraria o envio real dos dados: new FormData(form)

        form.hidden = true;
        success.hidden = false;
        success.focus();
        form.reset();
    });

    again.addEventListener("click", function () {
        success.hidden = true;
        form.hidden = false;
        form.elements[0].focus();
    });
})();
