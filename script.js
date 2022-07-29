//função que chama o modal
function iniciaModal(modalID) {

  //dizendo que o modal só deverá abrir se a informação não estiver salva 
  if(localStorage.fechaModal !== modalID){

    //selecionando o modalID
    var modal = document.getElementById(modalID);
    
    //adicionando classe 'mostrar', assim mudando o display: hidden do CSS e exibindo o anúncio 
    modal.classList.add('mostrar');

    //adicionando evento 'click' para fechar o anúncio
    modal.addEventListener('click', (event) => {

      //definindo onde deve ser clicado, selecionando os locais por ID e classe
      if(event.target.id == modalID || event.target.className == 'fechar') {

        //removendo a classe 'mostrar' para que o anúncio volte a ter a propriedade 'display: hidden'
        modal.classList.remove('mostrar');

        //fazendo com que o pop-up não apareça novamente depois de fechado
        //salvando opção no local storage do usuário
        localStorage.fechaModal = modalID;
      }


    });
  }
}

//iniciando função acima
iniciaModal('modal-promocao');


//COOKIES

//funções que ocorrerão dependendo do que estiver marcado na caixa
function cookies (functions) {

  //selecionando o container
  const container = document.querySelector('.cookies-container');

  //selecionando botão de salvar 
  const save = document.querySelector('.cookies-save');

  //ativando as funções sem ter que exibir o formulário novamente, com base nos dados salvos na máquina do usuário
  const localPref = JSON.parse(window.localStorage.getItem('cookies-pref'));

  //se retornar um valor verdadeiro, ativará as funções
  if (localPref) activateFunctions(localPref);


  //criando função que pega as preferências do formulário 
  function getFormPref(){

    //selecionando os inputs por atributo e filtrando elementos com array, o que retornar verdadeiro, será mantido, o que retornar falso, será removido
    return [...document.querySelectorAll('[data-function]')].filter ((el) => el.checked, 

    //mostrando qual das opções foi selecionada ao invés de somente 'input'
    ).map(el => el.getAttribute('data-function'));
    console.log(inputs);
  }

  //ativando função escolhida
  function activateFunctions(pref){

    //dizendo que ative uma opção baseado na chave
    pref.forEach((f) => functions[f]());

    //fazendo com que o balão não apareça novamente caso o usuário clique em 'salvar e continuar'
    container.style.display = 'none';

    //salvando preferências do usuário na máquina
    window.localStorage.setItem('cookies-pref', JSON.stringify(pref));
  }

  //criando função abaixo
  function handleSave() {

    //pegando preferências do formulário
    const pref = getFormPref();

    //ativando funções
    activateFunctions(pref)

  }



  //dizendo ao botão de salvar que algo deve acontecer quando ele for clicado
  save.addEventListener('click', handleSave);
}


//função opção marketing
function marketing() {
  console.log('Função de marketing');

  //aqui dentro ficam todas as configurações/scripts dependendo do serviço desejado
}


//função opção analytics
function analytics() {
  console.log('Função de analytics');

  //aqui dentro ficam todas as configurações/scripts dependendo do serviço desejado
}

//ativando função com base nas preferências
cookies({
  marketing,
  analytics,

});