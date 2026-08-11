/* =========================================================
   AGRONEXO - SCRIPT PRINCIPAL
   ========================================================= */


/* =========================================================
   LIMPEZA INICIAL DOS DADOS ANTIGOS
   Executa somente uma vez.
   ========================================================= */

if (!localStorage.getItem("agronexo_limpeza_2026")) {

    localStorage.removeItem("animais");
    localStorage.removeItem("rebanho");
    localStorage.removeItem("pastos");
    localStorage.removeItem("manejos");

    localStorage.setItem(
        "agronexo_limpeza_2026",
        "ok"
    );
}


/* =========================================================
   FUNÇÕES AUXILIARES
   ========================================================= */

function pegarLista(nome) {

    try {

        const dados = JSON.parse(
            localStorage.getItem(nome)
        );

        return Array.isArray(dados) ? dados : [];

    } catch (erro) {

        console.error(
            "Erro ao ler:",
            nome,
            erro
        );

        return [];

    }
}


function salvarLista(nome, lista) {

    localStorage.setItem(
        nome,
        JSON.stringify(lista)
    );

}


/* =========================================================
   CONTADORES DA TELA INICIAL
   ========================================================= */

function atualizarContadores() {

    const animais = pegarLista("animais");
    const pastos = pegarLista("pastos");
    const manejos = pegarLista("manejos");


    const totalBovinos =
        document.getElementById("totalBovinos");

    const totalPastos =
        document.getElementById("totalPastos");

    const totalManejos =
        document.getElementById("totalManejos");


    if (totalBovinos) {

        totalBovinos.textContent =
            animais.length;

    }


    if (totalPastos) {

        totalPastos.textContent =
            pastos.length;

    }


    if (totalManejos) {

        totalManejos.textContent =
            manejos.length;

    }

}


/* =========================================================
   MENU LATERAL
   ========================================================= */

function abrirMenu() {

    const menu =
        document.getElementById("menuLateral");

    const fundo =
        document.getElementById("fundoMenu");


    if (menu) {

        menu.classList.add("aberto");

    }


    if (fundo) {

        fundo.classList.add("aberto");

    }


    document.body.classList.add(
        "menu-visivel"
    );

}


function fecharMenu() {

    const menu =
        document.getElementById("menuLateral");

    const fundo =
        document.getElementById("fundoMenu");


    if (menu) {

        menu.classList.remove("aberto");

    }


    if (fundo) {

        fundo.classList.remove("aberto");

    }


    document.body.classList.remove(
        "menu-visivel"
    );

}


/* =========================================================
   ALTERNAR MENU
   ========================================================= */

function alternarMenu() {

    const menu =
        document.getElementById("menuLateral");


    if (!menu) {

        console.warn(
            "Elemento #menuLateral não encontrado."
        );

        return;

    }


    if (
        menu.classList.contains("aberto") ||
        menu.classList.contains("menu-aberto")
    ) {

        fecharMenu();

    } else {

        abrirMenu();

    }

}


/* =========================================================
   NAVEGAÇÃO
   ========================================================= */

function irPara(pagina) {

    fecharMenu();

    window.location.href = pagina;

}


function abrirGado() {

    fecharMenu();

    window.location.href =
        "gado.html";

}


function abrirPastos() {

    fecharMenu();

    window.location.href =
        "pastos.html";

}


function abrirManejo() {

    fecharMenu();

    window.location.href =
        "manejo.html";

}


function abrirCadastro() {

    fecharMenu();

    window.location.href =
        "cadastro.html";

}


function abrirFinanceiro() {

    fecharMenu();

    window.location.href =
        "financeiro.html";

}


function abrirRelatorios() {

    fecharMenu();

    window.location.href =
        "relatorios.html";

}


function abrirConfiguracoes() {

    fecharMenu();

    window.location.href =
        "configuracoes.html";

}


/* =========================================================
   SAIR
   ========================================================= */

function sair() {

    fecharMenu();

    window.location.href =
        "login.html";

}


/* =========================================================
   CADASTRO DE ANIMAL
   ========================================================= */

function configurarCadastroAnimal() {

    const formulario =
        document.getElementById("formAnimal");


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const dados =
                new FormData(formulario);


            const animal = {};


            dados.forEach(
                function (valor, campo) {

                    animal[campo] =
                        String(valor).trim();

                }
            );


            animal.id =
                Date.now();


            animal.dataCadastro =
                new Date().toISOString();


            const animais =
                pegarLista("animais");


            animais.push(animal);


            salvarLista(
                "animais",
                animais
            );


            atualizarContadores();


            formulario.reset();


            window.location.href =
                "cadastro.html";

        }
    );

}


/* =========================================================
   PREENCHER SELECT DE ANIMAIS NO MANEJO
   ========================================================= */

function carregarAnimaisNoManejo() {

    const select =
        document.getElementById("animal");


    if (!select) {

        return;

    }


    const animais =
        pegarLista("animais");


    select.innerHTML =
        '<option value="">Selecione um animal</option>';


    animais.forEach(
        function (animal) {

            const opcao =
                document.createElement("option");


            opcao.value =
                animal.id;


            const nome =
                animal.nome ||
                animal.brinco ||
                animal.identificacao ||
                animal.numero ||
                "Animal";


            opcao.textContent =
                nome;


            select.appendChild(
                opcao
            );

        }
    );

}


/* =========================================================
   CADASTRO DE MANEJO
   ========================================================= */

function configurarManejo() {

    const formulario =
        document.getElementById("formManejo");


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const dados =
                new FormData(formulario);


            const manejo = {};


            dados.forEach(
                function (valor, campo) {

                    manejo[campo] =
                        String(valor).trim();

                }
            );


            manejo.id =
                Date.now();


            manejo.dataCadastro =
                new Date().toISOString();


            const manejos =
                pegarLista("manejos");


            manejos.push(manejo);


            salvarLista(
                "manejos",
                manejos
            );


            atualizarContadores();


            formulario.reset();


            window.location.href =
                "manejo.html";

        }
    );

}


/* =========================================================
   CADASTRO DE PASTO
   ========================================================= */

function configurarPastos() {

    const formulario =
        document.getElementById("formPasto");


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const dados =
                new FormData(formulario);


            const pasto = {};


            dados.forEach(
                function (valor, campo) {

                    pasto[campo] =
                        String(valor).trim();

                }
            );


            pasto.id =
                Date.now();


            pasto.dataCadastro =
                new Date().toISOString();


            const pastos =
                pegarLista("pastos");


            pastos.push(pasto);


            salvarLista(
                "pastos",
                pastos
            );


            atualizarContadores();


            formulario.reset();


            window.location.href =
                "pastos.html";

        }
    );

}


/* =========================================================
   EXCLUIR ANIMAL
   ========================================================= */

function excluirAnimal(id) {

    if (
        !confirm(
            "Tem certeza que deseja excluir este animal?"
        )
    ) {

        return;

    }


    let animais =
        pegarLista("animais");


    animais =
        animais.filter(
            function (animal) {

                return String(animal.id) !==
                    String(id);

            }
        );


    salvarLista(
        "animais",
        animais
    );


    atualizarContadores();


    location.reload();

}


/* =========================================================
   EXCLUIR PASTO
   ========================================================= */

function excluirPasto(id) {

    if (
        !confirm(
            "Tem certeza que deseja excluir este pasto?"
        )
    ) {

        return;

    }


    let pastos =
        pegarLista("pastos");


    pastos =
        pastos.filter(
            function (pasto) {

                return String(pasto.id) !==
                    String(id);

            }
        );


    salvarLista(
        "pastos",
        pastos
    );


    atualizarContadores();


    location.reload();

}


/* =========================================================
   EXCLUIR MANEJO
   ========================================================= */

function excluirManejo(id) {

    if (
        !confirm(
            "Tem certeza que deseja excluir este manejo?"
        )
    ) {

        return;

    }


    let manejos =
        pegarLista("manejos");


    manejos =
        manejos.filter(
            function (manejo) {

                return String(manejo.id) !==
                    String(id);

            }
        );


    salvarLista(
        "manejos",
        manejos
    );


    atualizarContadores();


    location.reload();

}


/* =========================================================
   FORMATAR DATA
   ========================================================= */

function formatarData(data) {

    if (!data) {

        return "-";

    }


    const partes =
        String(data).split("-");


    if (partes.length === 3) {

        return (
            partes[2] +
            "/" +
            partes[1] +
            "/" +
            partes[0]
        );

    }


    return data;

}


/* =========================================================
   CONFIGURAR BOTÃO DO MENU
   ========================================================= */

function configurarMenu() {

    const botaoMenu =
        document.getElementById("botaoMenu");

    const iconeMenu =
        document.getElementById("iconeMenu");

    const fundoMenu =
        document.getElementById("fundoMenu");

    const botaoFechar =
        document.querySelector(".fechar-menu");


    function atualizarIcone() {

        const menu =
            document.getElementById("menuLateral");

        if (!menu || !iconeMenu) {
            return;
        }

        const aberto =
            menu.classList.contains("aberto");

        if (aberto) {

            iconeMenu.textContent = "×";

            botaoMenu.setAttribute(
                "aria-label",
                "Fechar menu"
            );

        } else {

            iconeMenu.textContent = "☰";

            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }
    }


    /* Botão ☰ / × */

    if (botaoMenu) {

        botaoMenu.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                evento.stopPropagation();

                const menu =
                    document.getElementById(
                        "menuLateral"
                    );

                if (
                    menu &&
                    menu.classList.contains("aberto")
                ) {

                    fecharMenu();

                } else {

                    abrirMenu();

                }

                atualizarIcone();

            }
        );

    }


    /* Fundo escuro */

    if (fundoMenu) {

        fundoMenu.addEventListener(
            "click",
            function () {

                fecharMenu();

                atualizarIcone();

            }
        );

    }


    /* Botão X interno, caso exista */

    if (botaoFechar) {

        botaoFechar.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                fecharMenu();

                atualizarIcone();

            }
        );

    }


    /* ESC fecha */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Escape") {

                fecharMenu();

                atualizarIcone();

            }

        }
    );


    atualizarIcone();
}

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        atualizarContadores();

        configurarMenu();

        configurarCadastroAnimal();

        configurarManejo();

        configurarPastos();

        carregarAnimaisNoManejo();

    }
);