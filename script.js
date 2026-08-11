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
);/* =========================================================
   AGRONEXO - NOVO MÓDULO FINANCEIRO
========================================================= */


/* =========================================================
   FUNÇÕES AUXILIARES DO FINANCEIRO
========================================================= */

function financeiroLista(nome) {

    try {

        const dados = JSON.parse(
            localStorage.getItem(nome)
        );

        return Array.isArray(dados) ? dados : [];

    } catch (erro) {

        return [];

    }

}


function financeiroSalvar(nome, lista) {

    localStorage.setItem(
        nome,
        JSON.stringify(lista)
    );

}


function dinheiro(valor) {

    valor = Number(valor) || 0;

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


function numeroFinanceiro(valor) {

    return Number(valor) || 0;

}


function dataFinanceiro(data) {

    if (!data) {
        return "-";
    }

    const partes = String(data).split("-");

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
   ABAS DO FINANCEIRO
========================================================= */

function abrirFinanceiroAba(nome, botao) {

    const secoes = document.querySelectorAll(
        ".financeiro-secao"
    );

    secoes.forEach(function (secao) {

        secao.classList.remove("ativa");

    });


    const botoes = document.querySelectorAll(
        ".aba-financeiro"
    );

    botoes.forEach(function (item) {

        item.classList.remove("ativa");

    });


    const mapa = {

        compras: "secaoCompras",

        manutencao: "secaoManutencao",

        vendas: "secaoVendas",

        resultado: "secaoResultado"

    };


    const secao = document.getElementById(
        mapa[nome]
    );


    if (secao) {

        secao.classList.add("ativa");

    }


    if (botao) {

        botao.classList.add("ativa");

    }


    atualizarEtapasFinanceiro(nome);


    if (nome === "resultado") {

        atualizarResultadoFinanceiro();

    }


    if (nome === "vendas") {

        carregarLotesFinanceiro();

        calcularVendaGado();

    }

}


/* =========================================================
   ETAPAS SUPERIORES
========================================================= */

function atualizarEtapasFinanceiro(nome) {

    const etapas = {

        compras: "etapaCompra",

        manutencao: "etapaManutencao",

        vendas: "etapaVenda",

        resultado: "etapaResultado"

    };


    Object.values(etapas).forEach(function (id) {

        const elemento =
            document.getElementById(id);

        if (elemento) {

            elemento.classList.remove("ativa");

        }

    });


    const atual =
        document.getElementById(
            etapas[nome]
        );


    if (atual) {

        atual.classList.add("ativa");

    }

}


/* =========================================================
   DATA ATUAL
========================================================= */

function preencherDatasFinanceiro() {

    const hoje = new Date();

    const ano =
        hoje.getFullYear();

    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            hoje.getDate()
        ).padStart(2, "0");

    const data =
        ano + "-" + mes + "-" + dia;


    const campos = [

        "compraData",

        "manutData",

        "vendaData"

    ];


    campos.forEach(function (id) {

        const campo =
            document.getElementById(id);

        if (campo && !campo.value) {

            campo.value = data;

        }

    });

}


/* =========================================================
   CÁLCULO DA COMPRA
========================================================= */

function calcularCompraGado() {

    const quantidade =
        numeroFinanceiro(
            document.getElementById(
                "compraQuantidade"
            )?.value
        );


    const pesoMedio =
        numeroFinanceiro(
            document.getElementById(
                "compraPesoMedio"
            )?.value
        );


    const precoCabeca =
        numeroFinanceiro(
            document.getElementById(
                "compraPrecoCabeca"
            )?.value
        );


    const precoArroba =
        numeroFinanceiro(
            document.getElementById(
                "compraPrecoArroba"
            )?.value
        );


    const frete =
        numeroFinanceiro(
            document.getElementById(
                "compraFrete"
            )?.value
        );


    const comissao =
        numeroFinanceiro(
            document.getElementById(
                "compraComissao"
            )?.value
        );


    const outras =
        numeroFinanceiro(
            document.getElementById(
                "compraOutrasDespesas"
            )?.value
        );


    const pesoTotal =
        quantidade * pesoMedio;


    let valorGado = 0;


    /*
     * Se informou valor por cabeça,
     * usamos esse valor.
     */

    if (precoCabeca > 0) {

        valorGado =
            quantidade * precoCabeca;

    }

    /*
     * Caso não tenha informado por cabeça,
     * calcula pelo preço da arroba.
     *
     * 1 arroba = 15 kg.
     */

    else if (
        precoArroba > 0 &&
        pesoTotal > 0
    ) {

        valorGado =
            (pesoTotal / 15) *
            precoArroba;

    }


    const despesas =
        frete +
        comissao +
        outras;


    const custoTotal =
        valorGado +
        despesas;


    const custoCabeca =
        quantidade > 0
            ? custoTotal / quantidade
            : 0;


    const arrobas =
        pesoTotal / 15;


    const custoArroba =
        arrobas > 0
            ? custoTotal / arrobas
            : 0;


    const pesoCampo =
        document.getElementById(
            "compraPesoTotal"
        );

    if (pesoCampo) {

        pesoCampo.value =
            pesoTotal.toLocaleString(
                "pt-BR",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            ) + " kg";

    }


    const valorCampo =
        document.getElementById(
            "compraValorGado"
        );

    if (valorCampo) {

        valorCampo.value =
            dinheiro(valorGado);

    }


    const elementos = {

        resumoValorAnimais:
            dinheiro(valorGado),

        resumoDespesasCompra:
            dinheiro(despesas),

        resumoCustoCompra:
            dinheiro(custoTotal),

        resumoCustoCabeca:
            dinheiro(custoCabeca),

        resumoArrobasCompra:
            arrobas.toLocaleString(
                "pt-BR",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            ) + " @",

        resumoCustoArroba:
            dinheiro(custoArroba)

    };


    Object.keys(elementos).forEach(function (id) {

        const elemento =
            document.getElementById(id);

        if (elemento) {

            elemento.textContent =
                elementos[id];

        }

    });


    return {

        quantidade,
        pesoMedio,
        pesoTotal,
        precoCabeca,
        precoArroba,
        valorGado,
        frete,
        comissao,
        outras,
        despesas,
        custoTotal,
        custoCabeca,
        arrobas,
        custoArroba

    };

}


/* =========================================================
   SALVAR COMPRA
========================================================= */

function configurarFinanceiroCompra() {

    const formulario =
        document.getElementById(
            "formCompraGado"
        );


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const calculo =
                calcularCompraGado();


            if (
                calculo.quantidade <= 0
            ) {

                alert(
                    "Informe a quantidade de animais."
                );

                return;

            }


            if (
                calculo.valorGado <= 0
            ) {

                alert(
                    "Informe o valor por cabeça ou o preço por arroba."
                );

                return;

            }


            const compra = {

                id: Date.now(),

                tipo: "compra",

                descricao:
                    document.getElementById(
                        "compraDescricao"
                    ).value.trim(),

                data:
                    document.getElementById(
                        "compraData"
                    ).value,

                fornecedor:
                    document.getElementById(
                        "compraFornecedor"
                    ).value.trim(),

                categoria:
                    document.getElementById(
                        "compraCategoria"
                    ).value,

                quantidade:
                    calculo.quantidade,

                pesoMedio:
                    calculo.pesoMedio,

                pesoTotal:
                    calculo.pesoTotal,

                precoCabeca:
                    calculo.precoCabeca,

                precoArroba:
                    calculo.precoArroba,

                valorGado:
                    calculo.valorGado,

                frete:
                    calculo.frete,

                comissao:
                    calculo.comissao,

                outrasDespesas:
                    calculo.outras,

                despesas:
                    calculo.despesas,

                custoTotal:
                    calculo.custoTotal,

                custoCabeca:
                    calculo.custoCabeca,

                arrobas:
                    calculo.arrobas,

                custoArroba:
                    calculo.custoArroba,

                observacoes:
                    document.getElementById(
                        "compraObservacoes"
                    ).value.trim(),

                dataCadastro:
                    new Date().toISOString()

            };


            const compras =
                financeiroLista(
                    "financeiro_compras"
                );


            compras.push(compra);


            financeiroSalvar(
                "financeiro_compras",
                compras
            );


            alert(
                "Compra registrada com sucesso!"
            );


            formulario.reset();


            preencherDatasFinanceiro();

            calcularCompraGado();

            carregarLotesFinanceiro();

            renderizarHistoricoCompras();

            atualizarResultadoFinanceiro();

        }
    );

}


/* =========================================================
   HISTÓRICO DE COMPRAS
========================================================= */

function renderizarHistoricoCompras() {

    const container =
        document.getElementById(
            "historicoCompras"
        );


    if (!container) {

        return;

    }


    const compras =
        financeiroLista(
            "financeiro_compras"
        );


    if (compras.length === 0) {

        container.innerHTML =
            '<div class="vazio-financeiro">' +
            '🐂 Nenhuma compra registrada ainda.' +
            '</div>';

        return;

    }


    container.innerHTML = "";


    compras
        .slice()
        .reverse()
        .forEach(function (compra) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "movimento-financeiro";


            item.innerHTML =

                '<div class="icone">🐂</div>' +

                '<div class="movimento-info">' +

                '<strong>' +
                (compra.descricao || "Lote de gado") +
                '</strong>' +

                '<small>' +
                dataFinanceiro(compra.data) +
                ' • ' +
                compra.quantidade +
                ' animais' +
                '</small>' +

                '</div>' +

                '<div class="movimento-valor">' +
                dinheiro(compra.custoTotal) +
                '</div>';


            container.appendChild(item);

        });

}


/* =========================================================
   CARREGAR LOTES PARA VENDA
========================================================= */

function carregarLotesFinanceiro() {

    const select =
        document.getElementById(
            "vendaLote"
        );


    const selectManut =
        document.getElementById(
            "manutLote"
        );


    const compras =
        financeiroLista(
            "financeiro_compras"
        );


    if (select) {

        const valorAtual =
            select.value;


        select.innerHTML =
            '<option value="">Selecione o lote</option>';


        compras.forEach(function (compra) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                compra.id;


            option.textContent =
                (
                    compra.descricao ||
                    "Lote"
                ) +
                " — " +
                compra.quantidade +
                " animais — " +
                dinheiro(compra.custoTotal);


            select.appendChild(option);

        });


        if (valorAtual) {

            select.value =
                valorAtual;

        }

    }


    if (selectManut) {

        const valorAtual =
            selectManut.value;


        selectManut.innerHTML =
            '<option value="">Geral / sem lote específico</option>';


        compras.forEach(function (compra) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                compra.id;


            option.textContent =
                compra.descricao ||
                "Lote";


            selectManut.appendChild(
                option
            );

        });


        if (valorAtual) {

            selectManut.value =
                valorAtual;

        }

    }

}


/* =========================================================
   SALVAR MANUTENÇÃO
========================================================= */

function configurarFinanceiroManutencao() {

    const formulario =
        document.getElementById(
            "formManutencao"
        );


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const valor =
                numeroFinanceiro(
                    document.getElementById(
                        "manutValor"
                    ).value
                );


            if (valor <= 0) {

                alert(
                    "Informe um valor maior que zero."
                );

                return;

            }


            const gasto = {

                id: Date.now(),

                tipo: "manutencao",

                data:
                    document.getElementById(
                        "manutData"
                    ).value,

                categoria:
                    document.getElementById(
                        "manutTipo"
                    ).value,

                descricao:
                    document.getElementById(
                        "manutDescricao"
                    ).value.trim(),

                valor: valor,

                loteId:
                    document.getElementById(
                        "manutLote"
                    ).value,

                quantidade:
                    numeroFinanceiro(
                        document.getElementById(
                            "manutQuantidade"
                        ).value
                    ),

                observacoes:
                    document.getElementById(
                        "manutObservacoes"
                    ).value.trim(),

                dataCadastro:
                    new Date().toISOString()

            };


            const gastos =
                financeiroLista(
                    "financeiro_manutencoes"
                );


            gastos.push(gasto);


            financeiroSalvar(
                "financeiro_manutencoes",
                gastos
            );


            alert(
                "Gasto registrado com sucesso!"
            );


            formulario.reset();


            preencherDatasFinanceiro();

            renderizarHistoricoManutencao();

            atualizarResultadoFinanceiro();

        }
    );

}


/* =========================================================
   HISTÓRICO DE MANUTENÇÃO
========================================================= */

function renderizarHistoricoManutencao() {

    const container =
        document.getElementById(
            "historicoManutencao"
        );


    if (!container) {

        return;

    }


    const gastos =
        financeiroLista(
            "financeiro_manutencoes"
        );


    if (gastos.length === 0) {

        container.innerHTML =
            '<div class="vazio-financeiro">' +
            '🌾 Nenhum gasto de manutenção registrado.' +
            '</div>';

        return;

    }


    container.innerHTML = "";


    gastos
        .slice()
        .reverse()
        .forEach(function (gasto) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "movimento-financeiro";


            item.innerHTML =

                '<div class="icone">🌾</div>' +

                '<div class="movimento-info">' +

                '<strong>' +
                (gasto.descricao || "Gasto") +
                '</strong>' +

                '<small>' +
                dataFinanceiro(gasto.data) +
                ' • ' +
                gasto.categoria +
                '</small>' +

                '</div>' +

                '<div class="movimento-valor">' +
                dinheiro(gasto.valor) +
                '</div>';


            container.appendChild(item);

        });

}


/* =========================================================
   CÁLCULO DA VENDA
========================================================= */

function calcularVendaGado() {

    const loteId =
        document.getElementById(
            "vendaLote"
        )?.value;


    const quantidade =
        numeroFinanceiro(
            document.getElementById(
                "vendaQuantidade"
            )?.value
        );


    const peso =
        numeroFinanceiro(
            document.getElementById(
                "vendaPeso"
            )?.value
        );


    const precoArroba =
        numeroFinanceiro(
            document.getElementById(
                "vendaPrecoArroba"
            )?.value
        );


    const precoCabeca =
        numeroFinanceiro(
            document.getElementById(
                "vendaPrecoCabeca"
            )?.value
        );


    const despesas =
        numeroFinanceiro(
            document.getElementById(
                "vendaDespesas"
            )?.value
        );


    const compras =
        financeiroLista(
            "financeiro_compras"
        );


    const lote =
        compras.find(function (item) {

            return String(item.id) ===
                String(loteId);

        });


    let receita = 0;


    /*
     * Se informou preço por arroba,
     * usa peso / 15.
     */

    if (
        precoArroba > 0 &&
        peso > 0
    ) {

        receita =
            (peso / 15) *
            precoArroba;

    }

    /*
     * Caso contrário, usa preço por cabeça.
     */

    else if (
        precoCabeca > 0 &&
        quantidade > 0
    ) {

        receita =
            quantidade *
            precoCabeca;

    }


    let custoCompra = 0;

    let manutencao = 0;


    if (lote) {

        custoCompra =
            numeroFinanceiro(
                lote.custoTotal
            );


        const gastos =
            financeiroLista(
                "financeiro_manutencoes"
            );


        manutencao =
            gastos
                .filter(function (gasto) {

                    return String(
                        gasto.loteId
                    ) === String(lote.id);

                })
                .reduce(function (total, gasto) {

                    return total +
                        numeroFinanceiro(
                            gasto.valor
                        );

                }, 0);

    }


    const custoTotal =
        custoCompra +
        manutencao +
        despesas;


    const resultado =
        receita -
        custoTotal;


    const percentual =
        receita > 0
            ? (resultado / receita) * 100
            : 0;


    const campos = {

        vendaReceita:
            dinheiro(receita)

    };


    Object.keys(campos).forEach(function (id) {

        const elemento =
            document.getElementById(id);

        if (elemento) {

            elemento.value =
                campos[id];

        }

    });


    const valores = {

        resumoReceitaVenda:
            dinheiro(receita),

        resumoCustoVenda:
            dinheiro(custoCompra),

        resumoManutVenda:
            dinheiro(manutencao),

        resumoDespVenda:
            dinheiro(despesas),

        resumoCustoTotalVenda:
            dinheiro(custoTotal),

        resumoResultadoVenda:
            dinheiro(resultado)

    };


    Object.keys(valores).forEach(function (id) {

        const elemento =
            document.getElementById(id);

        if (elemento) {

            elemento.textContent =
                valores[id];

        }

    });


    const mensagem =
        document.getElementById(
            "mensagemVenda"
        );


    if (mensagem) {

        if (receita <= 0) {

            mensagem.textContent =
                "Informe o preço e o peso ou preço por cabeça para calcular.";

        }

        else if (resultado > 0) {

            mensagem.textContent =
                "🟢 LUCRO: " +
                dinheiro(resultado) +
                " (" +
                percentual.toFixed(2) +
                "% de margem)";

        }

        else if (resultado < 0) {

            mensagem.textContent =
                "🔴 PREJUÍZO: " +
                dinheiro(
                    Math.abs(resultado)
                ) +
                " (" +
                percentual.toFixed(2) +
                "%)";

        }

        else {

            mensagem.textContent =
                "⚪ Empate: a operação não gerou lucro nem prejuízo.";

        }

    }


    return {

        receita,

        custoCompra,

        manutencao,

        despesas,

        custoTotal,

        resultado,

        percentual,

        lote

    };

}


/* =========================================================
   SALVAR VENDA
========================================================= */

function configurarFinanceiroVenda() {

    const formulario =
        document.getElementById(
            "formVendaGado"
        );


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const calculo =
                calcularVendaGado();


            if (!calculo.lote) {

                alert(
                    "Selecione o lote que será vendido."
                );

                return;

            }


            if (calculo.receita <= 0) {

                alert(
                    "Informe o preço da venda e o peso ou preço por cabeça."
                );

                return;

            }


            const venda = {

                id: Date.now(),

                tipo: "venda",

                loteId:
                    calculo.lote.id,

                lote:
                    calculo.lote.descricao,

                data:
                    document.getElementById(
                        "vendaData"
                    ).value,

                quantidade:
                    numeroFinanceiro(
                        document.getElementById(
                            "vendaQuantidade"
                        ).value
                    ),

                peso:
                    numeroFinanceiro(
                        document.getElementById(
                            "vendaPeso"
                        ).value
                    ),

                precoArroba:
                    numeroFinanceiro(
                        document.getElementById(
                            "vendaPrecoArroba"
                        ).value
                    ),

                precoCabeca:
                    numeroFinanceiro(
                        document.getElementById(
                            "vendaPrecoCabeca"
                        ).value
                    ),

                receita:
                    calculo.receita,

                custoCompra:
                    calculo.custoCompra,

                manutencao:
                    calculo.manutencao,

                despesas:
                    calculo.despesas,

                custoTotal:
                    calculo.custoTotal,

                resultado:
                    calculo.resultado,

                margem:
                    calculo.percentual,

                dataCadastro:
                    new Date().toISOString()

            };


            const vendas =
                financeiroLista(
                    "financeiro_vendas"
                );


            vendas.push(venda);


            financeiroSalvar(
                "financeiro_vendas",
                vendas
            );


            alert(
                calculo.resultado >= 0
                    ? "Venda registrada com LUCRO!"
                    : "Venda registrada. A operação apresentou PREJUÍZO."
            );


            formulario.reset();


            preencherDatasFinanceiro();

            renderizarHistoricoVendas();

            atualizarResultadoFinanceiro();

        }
    );

}


/* =========================================================
   HISTÓRICO DE VENDAS
========================================================= */

function renderizarHistoricoVendas() {

    const container =
        document.getElementById(
            "historicoVendas"
        );


    if (!container) {

        return;

    }


    const vendas =
        financeiroLista(
            "financeiro_vendas"
        );


    if (vendas.length === 0) {

        container.innerHTML =
            '<div class="vazio-financeiro">' +
            '💵 Nenhuma venda registrada ainda.' +
            '</div>';

        return;

    }


    container.innerHTML = "";


    vendas
        .slice()
        .reverse()
        .forEach(function (venda) {

            const item =
                document.createElement(
                    "div"
                );


            const lucro =
                numeroFinanceiro(
                    venda.resultado
                );


            item.className =
                "movimento-financeiro";


            item.innerHTML =

                '<div class="icone">💵</div>' +

                '<div class="movimento-info">' +

                '<strong>' +
                (venda.lote || "Venda de gado") +
                '</strong>' +

                '<small>' +
                dataFinanceiro(venda.data) +
                ' • Resultado: ' +
                dinheiro(lucro) +
                '</small>' +

                '</div>' +

                '<div class="movimento-valor">' +
                dinheiro(venda.receita) +
                '</div>';


            container.appendChild(item);

        });

}


/* =========================================================
   RESULTADO GERAL
========================================================= */

function atualizarResultadoFinanceiro() {

    const compras =
        financeiroLista(
            "financeiro_compras"
        );


    const manutencoes =
        financeiroLista(
            "financeiro_manutencoes"
        );


    const vendas =
        financeiroLista(
            "financeiro_vendas"
        );


    const totalCompras =
        compras.reduce(
            function (total, compra) {

                return total +
                    numeroFinanceiro(
                        compra.custoTotal
                    );

            },
            0
        );


    const totalManutencao =
        manutencoes.reduce(
            function (total, gasto) {

                return total +
                    numeroFinanceiro(
                        gasto.valor
                    );

            },
            0
        );


    const totalVendas =
        vendas.reduce(
            function (total, venda) {

                return total +
                    numeroFinanceiro(
                        venda.receita
                    );

            },
            0
        );


    const resultado =
        totalVendas -
        totalCompras -
        totalManutencao;


    const margem =
        totalVendas > 0
            ? (resultado / totalVendas) * 100
            : 0;


    const elementos = {

        indicadorCompras:
            dinheiro(totalCompras),

        indicadorManutencao:
            dinheiro(totalManutencao),

        indicadorVendas:
            dinheiro(totalVendas),

        indicadorResultado:
            dinheiro(resultado),

        resultadoCompras:
            dinheiro(totalCompras),

        resultadoManutencao:
            dinheiro(totalManutencao),

        resultadoVendas:
            dinheiro(totalVendas),

        resultadoMargem:
            margem.toFixed(2) + "%"

    };


    Object.keys(elementos).forEach(function (id) {

        const elemento =
            document.getElementById(id);

        if (elemento) {

            elemento.textContent =
                elementos[id];

        }

    });


    const principal =
        document.getElementById(
            "resultadoPrincipal"
        );


    const icone =
        document.getElementById(
            "resultadoIcone"
        );


    const texto =
        document.getElementById(
            "resultadoTexto"
        );


    const descricao =
        document.getElementById(
            "resultadoDescricao"
        );


    if (!principal) {

        return;

    }


    principal.classList.remove(
        "resultado-lucro",
        "resultado-prejuizo"
    );


    if (
        compras.length === 0 &&
        manutencoes.length === 0 &&
        vendas.length === 0
    ) {

        icone.textContent =
            "📊";

        texto.textContent =
            "Sem movimentações";

        descricao.textContent =
            "Cadastre compras, gastos e vendas para calcular o resultado.";

        return;

    }


    if (resultado > 0) {

        principal.classList.add(
            "resultado-lucro"
        );

        icone.textContent =
            "🟢";

        texto.textContent =
            "LUCRO DE " +
            dinheiro(resultado);

        descricao.textContent =
            "A propriedade está apresentando resultado positivo de " +
            margem.toFixed(2) +
            "% sobre as vendas.";

    }

    else if (resultado < 0) {

        principal.classList.add(
            "resultado-prejuizo"
        );

        icone.textContent =
            "🔴";

        texto.textContent =
            "PREJUÍZO DE " +
            dinheiro(
                Math.abs(resultado)
            );

        descricao.textContent =
            "Os custos registrados estão maiores que as receitas de venda.";

    }

    else {

        icone.textContent =
            "⚪";

        texto.textContent =
            "RESULTADO ZERADO";

        descricao.textContent =
            "As receitas e os custos registrados estão equilibrados.";

    }

}


/* =========================================================
   EVENTOS DOS CAMPOS
========================================================= */

function configurarEventosFinanceiro() {

    const camposCompra = [

        "compraQuantidade",

        "compraPesoMedio",

        "compraPrecoCabeca",

        "compraPrecoArroba",

        "compraFrete",

        "compraComissao",

        "compraOutrasDespesas"

    ];


    camposCompra.forEach(function (id) {

        const campo =
            document.getElementById(id);

        if (campo) {

            campo.addEventListener(
                "input",
                calcularCompraGado
            );

        }

    });


    const camposVenda = [

        "vendaQuantidade",

        "vendaPeso",

        "vendaPrecoArroba",

        "vendaPrecoCabeca",

        "vendaDespesas",

        "vendaLote"

    ];


    camposVenda.forEach(function (id) {

        const campo =
            document.getElementById(id);

        if (campo) {

            campo.addEventListener(
                "input",
                calcularVendaGado
            );

            campo.addEventListener(
                "change",
                calcularVendaGado
            );

        }

    });

}


/* =========================================================
   INICIALIZAÇÃO DO FINANCEIRO
========================================================= */

function iniciarFinanceiroAgroNexo() {

    if (
        !document.getElementById(
            "formCompraGado"
        )
    ) {

        return;

    }


    preencherDatasFinanceiro();

    configurarFinanceiroCompra();

    configurarFinanceiroManutencao();

    configurarFinanceiroVenda();

    configurarEventosFinanceiro();

    carregarLotesFinanceiro();

    renderizarHistoricoCompras();

    renderizarHistoricoManutencao();

    renderizarHistoricoVendas();

    calcularCompraGado();

    calcularVendaGado();

    atualizarResultadoFinanceiro();

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    iniciarFinanceiroAgroNexo
); 
/* =========================================================
   AGRO NEXO - FINANCEIRO
========================================================= */


/* =========================================================
   LISTA DE MOVIMENTAÇÕES
========================================================= */

function pegarMovimentosFinanceiros() {

    try {

        const dados =
            JSON.parse(
                localStorage.getItem(
                    "movimentosFinanceiros"
                )
            );

        return Array.isArray(dados)
            ? dados
            : [];

    } catch (erro) {

        return [];

    }

}


function salvarMovimentosFinanceiros(lista) {

    localStorage.setItem(
        "movimentosFinanceiros",
        JSON.stringify(lista)
    );

}


/* =========================================================
   FORMATAÇÃO DE DINHEIRO
========================================================= */

function formatarMoedaFinanceiro(valor) {

    valor = Number(valor) || 0;

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================================================
   MOSTRAR ETAPA
========================================================= */

function mostrarFinanceiro(etapa) {

    const secoes = [
        "compra",
        "manutencao",
        "venda",
        "resultado"
    ];


    secoes.forEach(function(nome) {

        const secao =
            document.getElementById(
                "financeiro" +
                nome.charAt(0).toUpperCase() +
                nome.slice(1)
            );

        if (secao) {

            secao.classList.remove(
                "ativa"
            );

        }

    });


    document
        .querySelectorAll(
            ".etapa-financeiro"
        )
        .forEach(function(botao) {

            botao.classList.remove(
                "ativa"
            );

        });


    let nomeId =
        etapa.charAt(0).toUpperCase() +
        etapa.slice(1);


    const secao =
        document.getElementById(
            "financeiro" + nomeId
        );


    if (secao) {

        secao.classList.add(
            "ativa"
        );

    }


    const botoes = {

        compra:
            "btnEtapaCompra",

        manutencao:
            "btnEtapaManutencao",

        venda:
            "btnEtapaVenda",

        resultado:
            "btnEtapaResultado"

    };


    const botao =
        document.getElementById(
            botoes[etapa]
        );


    if (botao) {

        botao.classList.add(
            "ativa"
        );

    }


    if (etapa === "resultado") {

        atualizarResultadoFinanceiro();

    }

}


/* =========================================================
   CALCULAR COMPRA
========================================================= */

function calcularCompraFinanceiro() {

    const quantidade =
        Number(
            document.getElementById(
                "compraQuantidade"
            )?.value
        ) || 0;


    const valorAnimal =
        Number(
            document.getElementById(
                "compraValorAnimal"
            )?.value
        ) || 0;


    const total =
        quantidade * valorAnimal;


    const totalTexto =
        formatarMoedaFinanceiro(
            total
        );


    const totalPrincipal =
        document.getElementById(
            "compraTotal"
        );


    const totalVisual =
        document.getElementById(
            "compraTotalVisual"
        );


    if (totalPrincipal) {

        totalPrincipal.textContent =
            totalTexto;

    }


    if (totalVisual) {

        totalVisual.value =
            totalTexto;

    }

}


/* =========================================================
   CALCULAR VENDA
========================================================= */

function calcularVendaFinanceiro() {

    const quantidade =
        Number(
            document.getElementById(
                "vendaQuantidade"
            )?.value
        ) || 0;


    const valorAnimal =
        Number(
            document.getElementById(
                "vendaValorAnimal"
            )?.value
        ) || 0;


    const total =
        quantidade * valorAnimal;


    const totalTexto =
        formatarMoedaFinanceiro(
            total
        );


    const totalPrincipal =
        document.getElementById(
            "vendaTotal"
        );


    const totalVisual =
        document.getElementById(
            "vendaTotalVisual"
        );


    if (totalPrincipal) {

        totalPrincipal.textContent =
            totalTexto;

    }


    if (totalVisual) {

        totalVisual.value =
            totalTexto;

    }

}


/* =========================================================
   SALVAR COMPRA
========================================================= */

function configurarCompraFinanceiro() {

    const formulario =
        document.getElementById(
            "formCompraFinanceiro"
        );


    if (!formulario) {

        return;

    }


    const camposCalculo = [

        "compraQuantidade",

        "compraValorAnimal"

    ];


    camposCalculo.forEach(function(id) {

        const campo =
            document.getElementById(id);


        if (campo) {

            campo.addEventListener(
                "input",
                calcularCompraFinanceiro
            );

        }

    });


    formulario.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const quantidade =
                Number(
                    document.getElementById(
                        "compraQuantidade"
                    ).value
                ) || 0;


            const valorAnimal =
                Number(
                    document.getElementById(
                        "compraValorAnimal"
                    ).value
                ) || 0;


            const total =
                quantidade * valorAnimal;


            const movimento = {

                id: Date.now(),

                tipo: "compra",

                descricao:
                    document.getElementById(
                        "compraDescricao"
                    ).value.trim(),

                data:
                    document.getElementById(
                        "compraData"
                    ).value,

                quantidade:
                    quantidade,

                peso:
                    Number(
                        document.getElementById(
                            "compraPeso"
                        ).value
                    ) || 0,

                valorAnimal:
                    valorAnimal,

                total:
                    total,

                observacao:
                    document.getElementById(
                        "compraObservacao"
                    ).value.trim(),

                criadoEm:
                    new Date().toISOString()

            };


            const movimentos =
                pegarMovimentosFinanceiros();


            movimentos.push(
                movimento
            );


            salvarMovimentosFinanceiros(
                movimentos
            );


            formulario.reset();


            calcularCompraFinanceiro();


            alert(
                "Compra registrada com sucesso!"
            );


            mostrarFinanceiro(
                "manutencao"
            );

        }
    );

}


/* =========================================================
   SALVAR MANUTENÇÃO
========================================================= */

function configurarManutencaoFinanceiro() {

    const formulario =
        document.getElementById(
            "formManutencaoFinanceiro"
        );


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const valor =
                Number(
                    document.getElementById(
                        "manutencaoValor"
                    ).value
                ) || 0;


            const movimento = {

                id: Date.now(),

                tipo: "manutencao",

                descricao:
                    document.getElementById(
                        "manutencaoDescricao"
                    ).value.trim(),

                categoria:
                    document.getElementById(
                        "manutencaoTipo"
                    ).value,

                data:
                    document.getElementById(
                        "manutencaoData"
                    ).value,

                total:
                    valor,

                observacao:
                    document.getElementById(
                        "manutencaoObservacao"
                    ).value.trim(),

                criadoEm:
                    new Date().toISOString()

            };


            const movimentos =
                pegarMovimentosFinanceiros();


            movimentos.push(
                movimento
            );


            salvarMovimentosFinanceiros(
                movimentos
            );


            formulario.reset();


            alert(
                "Gasto registrado com sucesso!"
            );


            mostrarFinanceiro(
                "venda"
            );

        }
    );

}


/* =========================================================
   SALVAR VENDA
========================================================= */

function configurarVendaFinanceiro() {

    const formulario =
        document.getElementById(
            "formVendaFinanceiro"
        );


    if (!formulario) {

        return;

    }


    const camposCalculo = [

        "vendaQuantidade",

        "vendaValorAnimal"

    ];


    camposCalculo.forEach(function(id) {

        const campo =
            document.getElementById(id);


        if (campo) {

            campo.addEventListener(
                "input",
                calcularVendaFinanceiro
            );

        }

    });


    formulario.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const quantidade =
                Number(
                    document.getElementById(
                        "vendaQuantidade"
                    ).value
                ) || 0;


            const valorAnimal =
                Number(
                    document.getElementById(
                        "vendaValorAnimal"
                    ).value
                ) || 0;


            const total =
                quantidade * valorAnimal;


            const movimento = {

                id: Date.now(),

                tipo: "venda",

                descricao:
                    document.getElementById(
                        "vendaDescricao"
                    ).value.trim(),

                data:
                    document.getElementById(
                        "vendaData"
                    ).value,

                quantidade:
                    quantidade,

                peso:
                    Number(
                        document.getElementById(
                            "vendaPeso"
                        ).value
                    ) || 0,

                valorAnimal:
                    valorAnimal,

                total:
                    total,

                observacao:
                    document.getElementById(
                        "vendaObservacao"
                    ).value.trim(),

                criadoEm:
                    new Date().toISOString()

            };


            const movimentos =
                pegarMovimentosFinanceiros();


            movimentos.push(
                movimento
            );


            salvarMovimentosFinanceiros(
                movimentos
            );


            formulario.reset();


            calcularVendaFinanceiro();


            alert(
                "Venda registrada com sucesso!"
            );


            mostrarFinanceiro(
                "resultado"
            );

        }
    );

}


/* =========================================================
   ATUALIZAR RESULTADO
========================================================= */

function atualizarResultadoFinanceiro() {

    const movimentos =
        pegarMovimentosFinanceiros();


    let compras = 0;

    let manutencao = 0;

    let vendas = 0;


    movimentos.forEach(
        function(movimento) {

            const valor =
                Number(
                    movimento.total
                ) || 0;


            if (
                movimento.tipo ===
                "compra"
            ) {

                compras += valor;

            }


            if (
                movimento.tipo ===
                "manutencao"
            ) {

                manutencao += valor;

            }


            if (
                movimento.tipo ===
                "venda"
            ) {

                vendas += valor;

            }

        }
    );


    const resultado =
        vendas -
        compras -
        manutencao;


    let margem = 0;


    if (vendas > 0) {

        margem =
            (resultado / vendas) *
            100;

    }


    const elementoCompras =
        document.getElementById(
            "resultadoCompras"
        );


    const elementoManutencao =
        document.getElementById(
            "resultadoManutencao"
        );


    const elementoVendas =
        document.getElementById(
            "resultadoVendas"
        );


    const elementoResultado =
        document.getElementById(
            "resultadoFinal"
        );


    const elementoMargem =
        document.getElementById(
            "resultadoMargem"
        );


    if (elementoCompras) {

        elementoCompras.textContent =
            formatarMoedaFinanceiro(
                compras
            );

    }


    if (elementoManutencao) {

        elementoManutencao.textContent =
            formatarMoedaFinanceiro(
                manutencao
            );

    }


    if (elementoVendas) {

        elementoVendas.textContent =
            formatarMoedaFinanceiro(
                vendas
            );

    }


    if (elementoResultado) {

        elementoResultado.textContent =
            formatarMoedaFinanceiro(
                resultado
            );

    }


    if (elementoMargem) {

        elementoMargem.textContent =
            margem.toFixed(2)
                .replace(".", ",") +
            "%";

    }


    atualizarMensagemResultado(
        compras,
        manutencao,
        vendas,
        resultado,
        margem
    );


    atualizarHistoricoFinanceiro(
        movimentos
    );

}


/* =========================================================
   MENSAGEM DE RESULTADO
========================================================= */

function atualizarMensagemResultado(
    compras,
    manutencao,
    vendas,
    resultado,
    margem
) {

    const caixa =
        document.getElementById(
            "resultadoPrincipal"
        );


    const titulo =
        document.getElementById(
            "resultadoTitulo"
        );


    const mensagem =
        document.getElementById(
            "resultadoMensagem"
        );


    const icone =
        document.querySelector(
            "#resultadoPrincipal .icone-resultado"
        );


    if (
        compras === 0 &&
        manutencao === 0 &&
        vendas === 0
    ) {

        if (caixa) {

            caixa.classList.remove(
                "lucro",
                "prejuizo"
            );

        }


        if (icone) {

            icone.textContent =
                "📊";

        }


        if (titulo) {

            titulo.textContent =
                "Sem movimentações";

        }


        if (mensagem) {

            mensagem.textContent =
                "Cadastre compras, gastos e vendas para calcular o resultado.";

        }


        return;

    }


    if (resultado > 0) {

        if (caixa) {

            caixa.classList.remove(
                "prejuizo"
            );

            caixa.classList.add(
                "lucro"
            );

        }


        if (icone) {

            icone.textContent =
                "🟢";

        }


        if (titulo) {

            titulo.textContent =
                "LUCRO DE " +
                formatarMoedaFinanceiro(
                    resultado
                );

        }


        if (mensagem) {

            mensagem.textContent =
                "A operação apresentou resultado positivo.";

        }

    } else if (resultado < 0) {

        if (caixa) {

            caixa.classList.remove(
                "lucro"
            );

            caixa.classList.add(
                "prejuizo"
            );

        }


        if (icone) {

            icone.textContent =
                "🔴";

        }


        if (titulo) {

            titulo.textContent =
                "PREJUÍZO DE " +
                formatarMoedaFinanceiro(
                    Math.abs(resultado)
                );

        }


        if (mensagem) {

            mensagem.textContent =
                "Os custos da operação ficaram acima das vendas.";

        }

    } else {

        if (caixa) {

            caixa.classList.remove(
                "lucro",
                "prejuizo"
            );

        }


        if (icone) {

            icone.textContent =
                "🟡";

        }


        if (titulo) {

            titulo.textContent =
                "OPERAÇÃO EMPATADA";

        }


        if (mensagem) {

            mensagem.textContent =
                "As vendas cobriram exatamente os custos.";

        }

    }

}


/* =========================================================
   HISTÓRICO
========================================================= */

function atualizarHistoricoFinanceiro(
    movimentos
) {

    const container =
        document.getElementById(
            "historicoFinanceiro"
        );


    if (!container) {

        return;

    }


    if (
        !movimentos ||
        movimentos.length === 0
    ) {

        container.innerHTML = `

            <div class="sem-movimentacao">

                <div class="icone">
                    📊
                </div>

                <h3>
                    Nenhuma movimentação
                </h3>

                <p>
                    As compras, gastos e vendas
                    aparecerão aqui.
                </p>

            </div>

        `;

        return;

    }


    const ultimos =
        movimentos
            .slice()
            .reverse()
            .slice(0, 10);


    container.innerHTML = "";


    ultimos.forEach(
        function(movimento) {

            let icone =
                "📊";

            let nome =
                "Movimentação";


            if (
                movimento.tipo ===
                "compra"
            ) {

                icone =
                    "🐂";

                nome =
                    "Compra";

            }


            if (
                movimento.tipo ===
                "manutencao"
            ) {

                icone =
                    "🌱";

                nome =
                    movimento.categoria ||
                    "Manutenção";

            }


            if (
                movimento.tipo ===
                "venda"
            ) {

                icone =
                    "💵";

                nome =
                    "Venda";

            }


            const linha =
                document.createElement(
                    "div"
                );


            linha.className =
                "movimento-financeiro";


            linha.innerHTML = `

                <div class="movimento-icone">
                    ${icone}
                </div>

                <div class="movimento-info">

                    <strong>
                        ${nome}
                    </strong>

                    <small>
                        ${movimento.descricao || "Sem descrição"}
                    </small>

                </div>

                <div class="movimento-valor">
                    ${formatarMoedaFinanceiro(
                        movimento.total
                    )}
                </div>

            `;


            container.appendChild(
                linha
            );

        }
    );

}


/* =========================================================
   INICIALIZAÇÃO DO FINANCEIRO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        configurarCompraFinanceiro();

        configurarManutencaoFinanceiro();

        configurarVendaFinanceiro();

        calcularCompraFinanceiro();

        calcularVendaFinanceiro();

        atualizarResultadoFinanceiro();


        /* Data atual */

        const hoje =
            new Date()
                .toISOString()
                .split("T")[0];


        const camposData = [

            "compraData",

            "manutencaoData",

            "vendaData"

        ];


        camposData.forEach(
            function(id) {

                const campo =
                    document.getElementById(
                        id
                    );


                if (
                    campo &&
                    !campo.value
                ) {

                    campo.value =
                        hoje;

                }

            }
        );

    }
);