//Area_de_chamada_do_DOM_das_listas_ul
document.addEventListener('DOMContentLoaded', function(){
    const buttons = document.querySelectorAll('[data-tab-button]');
    const questions = document.querySelectorAll('[data-faq-question]');
    const heroSection = document.querySelector('.hero');
    const alturaHero = heroSection.offsetHeight-350;
   // const alturaHero = 250; // valor fixo em px

    window.addEventListener('scroll', function(){
        const posicaoAtual = window.scrollY;
        if (posicaoAtual <= alturaHero) {
            ocultarElementosDoHeader();
        }
        else {
            exibeElementosDoHeader();
        }
    })
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(botao){
            const abaAlvo = botao.target.dataset.tabButton;
            const aba = document.querySelector(`[data-tab-id=${abaAlvo}]`);

            escondeTodasAbas();//chama a função para esconder todas as abas
            aba.classList.add('shows__list--is-active');

            removeBotaoAtivo(); // chama a função para remover o botão ativo
            botao.target.classList.add('shows__tabs__button--is-active');

        })
    }

    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', abreOuFechaResposta);

    }

})

// Função ocultar elementos do header
function ocultarElementosDoHeader() {
    const header = document.querySelector("header")
    header.classList.add("header--is-hidden");
}

// Função exibe elementos do header
function exibeElementosDoHeader() {
    const header = document.querySelector("header")
    header.classList.remove("header--is-hidden");
}

//Função abre ou Fecha resposta
function abreOuFechaResposta(elemento) {
    const classe = 'faq__questions__item--is-open';
    console.log(elemento);
    const elementoPai = elemento.target.parentNode;

    elementoPai.classList.toggle(classe);
}

//Area_de_remoção do botão ativo
function removeBotaoAtivo() {
    const buttons = document.querySelectorAll('[data-tab-button]');

    for (let i = 0; i< buttons.length; i++) {
        buttons[i].classList.remove('shows__tabs__button--is-active');
    }

}
//Area de ocultar todas as abas
function escondeTodasAbas() {
    const tabsContainer = document.querySelectorAll('[data-tab-id]');

    for (let i = 0; i < tabsContainer.length; i++) {
        tabsContainer[i].classList.remove('shows__list--is-active');
    }
};