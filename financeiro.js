// ==========================================
// AGRO NEXO - FINANCEIRO
// ==========================================


// ===============================
// BANCO DE DADOS
// ===============================

let compras =
    JSON.parse(localStorage.getItem("agronexo_compras")) || [];

let custos =
    JSON.parse(localStorage.getItem("agronexo_custos")) || [];

let vendas =
    JSON.parse(localStorage.getItem("agronexo_vendas")) || [];


// ===============================
// FUNÇÕES
// ===============================

function dinheiro(valor) {

    return Number(valor || 0).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


function salvarDados() {

    localStorage.setItem(
        "agronexo_compras",
        JSON.stringify(compras)
    );

    localStorage.setItem(
        "agronexo_custos",
        JSON.stringify(custos)
    );

    localStorage.setItem(
        "agronexo_vendas",
        JSON.stringify(vendas)
    );

}


// ===============================
// TOTAL DA COMPRA
// ===============================

function calcularCompra() {

    const quantidade =
        Number(
            document.getElementById("compraQuantidade").value
        ) || 0;

    const preco =
        Number(
            document.getElementById("compraPreco").value
        ) || 0;

    const tipo =
        document.getElementById("compraTipo").value;


    let total = 0;


    if (tipo === "cabeca") {

        total = quantidade * preco;

    }

    else if (tipo === "kg") {

        const peso =
            Number(
                document.getElementById("compraPeso").value
            ) || 0;

        total = quantidade * peso * preco;

    }

    else if (tipo === "arroba") {

        const peso =
            Number(
                document.getElementById("compraPeso").value
            ) || 0;

        const arrobas = peso / 30;

        total = quantidade * arrobas * preco;

    }


    document.getElementById(
        "totalCompraPreview"
    ).textContent = dinheiro(total);

}


document
    .getElementById("compraQuantidade")
    .addEventListener("input", calcularCompra);

document
    .getElementById("compraPreco")
    .addEventListener("input", calcularCompra);

document
    .getElementById("compraPeso")
    .addEventListener("input", calcularCompra);

document
    .getElementById("compraTipo")
    .addEventListener("change", calcularCompra);


// ===============================
// REGISTRAR COMPRA
// ===============================

document
    .getElementById("formCompra")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const quantidade =
            Number(
                document.getElementById("compraQuantidade").value
            );

        const preco =
            Number(
                document.getElementById("compraPreco").value
            );

        const peso =
            Number(
                document.getElementById("compraPeso").value
            ) || 0;

        const tipo =
            document.getElementById("compraTipo").value;

        const data =
            document.getElementById("compraData").value;

        const origem =
            document.getElementById("compraOrigem").value;


        let total = 0;


        if (tipo === "cabeca") {

            total = quantidade * preco;

        }

        else if (tipo === "kg") {

            total = quantidade * peso * preco;

        }

        else if (tipo === "arroba") {

            total =
                quantidade *
                (peso / 30) *
                preco;

        }


        const compra = {

            id: Date.now(),

            tipo: "Compra",

            quantidade,

            peso,

            forma: tipo,

            preco,

            total,

            data,

            origem

        };


        compras.push(compra);

        salvarDados();

        atualizarTela();

        this.reset();

        calcularCompra();


        alert("Compra registrada com sucesso!");

    });


// ===============================
// REGISTRAR CUSTO
// ===============================

document
    .getElementById("formCusto")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const custo = {

            id: Date.now(),

            tipo: document
                .getElementById("custoTipo")
                .value,

            descricao: document
                .getElementById("custoDescricao")
                .value,

            valor: Number(
                document
                    .getElementById("custoValor")
                    .value
            ),

            data: document
                .getElementById("custoData")
                .value

        };


        custos.push(custo);

        salvarDados();

        atualizarTela();

        this.reset();


        alert("Gasto registrado com sucesso!");

    });


// ===============================
// CÁLCULO DA VENDA
// ===============================

function calcularVenda() {

    const quantidade =
        Number(
            document.getElementById("vendaQuantidade").value
        ) || 0;

    const preco =
        Number(
            document.getElementById("vendaPreco").value
        ) || 0;


    const tipo =
        document.getElementById("vendaTipo").value;


    const peso =
        Number(
            document.getElementById("vendaPeso").value
        ) || 0;


    let receita = 0;


    if (tipo === "cabeca") {

        receita =
            quantidade * preco;

    }

    else if (tipo === "kg") {

        receita =
            quantidade *
            peso *
            preco;

    }

    else if (tipo === "arroba") {

        receita =
            quantidade *
            (peso / 30) *
            preco;

    }


    // TODOS OS CUSTOS ATÉ AGORA

    const totalCompras =
        compras.reduce(
            (soma, item) =>
                soma + Number(item.total || 0),
            0
        );


    const totalCustos =
        custos.reduce(
            (soma, item) =>
                soma + Number(item.valor || 0),
            0
        );


    const custoTotal =
        totalCompras + totalCustos;


    // Custo médio por animal comprado

    const totalAnimais =
        compras.reduce(
            (soma, item) =>
                soma + Number(item.quantidade || 0),
            0
        );


    let custoMedio = 0;


    if (totalAnimais > 0) {

        custoMedio =
            custoTotal / totalAnimais;

    }


    const custoEstimado =
        quantidade * custoMedio;


    const lucro =
        receita - custoEstimado;


    let margem = 0;


    if (receita > 0) {

        margem =
            (lucro / receita) * 100;

    }


    document.getElementById(
        "vendaReceita"
    ).textContent = dinheiro(receita);


    document.getElementById(
        "vendaCusto"
    ).textContent = dinheiro(custoEstimado);


    document.getElementById(
        "vendaLucro"
    ).textContent = dinheiro(lucro);


    document.getElementById(
        "vendaMargem"
    ).textContent =
        margem.toFixed(2) + "%";


    const mensagem =
        document.getElementById(
            "mensagemResultado"
        );


    if (receita === 0) {

        mensagem.textContent =
            "Informe os dados da venda.";

    }

    else if (lucro > 0) {

        mensagem.textContent =
            "🟢 Venda com LUCRO. Você está ganhando dinheiro.";

    }

    else if (lucro < 0) {

        mensagem.textContent =
            "🔴 Venda com PREJUÍZO. O preço de venda está abaixo do custo estimado.";

    }

    else {

        mensagem.textContent =
            "🟡 Venda empatada. Não houve lucro nem prejuízo.";

    }

}


document
    .getElementById("vendaQuantidade")
    .addEventListener("input", calcularVenda);

document
    .getElementById("vendaPreco")
    .addEventListener("input", calcularVenda);

document
    .getElementById("vendaPeso")
    .addEventListener("input", calcularVenda);

document
    .getElementById("vendaTipo")
    .addEventListener("change", calcularVenda);


// ===============================
// REGISTRAR VENDA
// ===============================

document
    .getElementById("formVenda")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const quantidade =
            Number(
                document.getElementById("vendaQuantidade").value
            );

        const preco =
            Number(
                document.getElementById("vendaPreco").value
            );

        const peso =
            Number(
                document.getElementById("vendaPeso").value
            ) || 0;

        const tipo =
            document.getElementById("vendaTipo").value;

        const data =
            document.getElementById("vendaData").value;


        let receita = 0;


        if (tipo === "cabeca") {

            receita =
                quantidade * preco;

        }

        else if (tipo === "kg") {

            receita =
                quantidade *
                peso *
                preco;

        }

        else if (tipo === "arroba") {

            receita =
                quantidade *
                (peso / 30) *
                preco;

        }


        const totalCompras =
            compras.reduce(
                (soma, item) =>
                    soma + Number(item.total || 0),
                0
            );


        const totalCustos =
            custos.reduce(
                (soma, item) =>
                    soma + Number(item.valor || 0),
                0
            );


        const totalAnimais =
            compras.reduce(
                (soma, item) =>
                    soma + Number(item.quantidade || 0),
                0
            );


        let custoMedio = 0;


        if (totalAnimais > 0) {

            custoMedio =
                (totalCompras + totalCustos)
                / totalAnimais;

        }


        const custoEstimado =
            quantidade * custoMedio;


        const lucro =
            receita - custoEstimado;


        const venda = {

            id: Date.now(),

            tipo: "Venda",

            quantidade,

            peso,

            forma: tipo,

            preco,

            receita,

            custo: custoEstimado,

            lucro,

            data

        };


        vendas.push(venda);

        salvarDados();

        atualizarTela();

        this.reset();

        calcularVenda();


        alert("Venda registrada com sucesso!");

    });


// ===============================
// ATUALIZAR INDICADORES
// ===============================

function atualizarTela() {


    const totalAnimais =
        compras.reduce(
            (soma, item) =>
                soma + Number(item.quantidade || 0),
            0
        );


    const totalCompras =
        compras.reduce(
            (soma, item) =>
                soma + Number(item.total || 0),
            0
        );


    const totalCustos =
        custos.reduce(
            (soma, item) =>
                soma + Number(item.valor || 0),
            0
        );


    const totalVendas =
        vendas.reduce(
            (soma, item) =>
                soma + Number(item.receita || 0),
            0
        );


    const resultado =
        totalVendas -
        totalCompras -
        totalCustos;


    document.getElementById(
        "indicadorCompras"
    ).textContent = totalAnimais;


    document.getElementById(
        "indicadorInvestido"
    ).textContent =
        dinheiro(totalCompras);


    document.getElementById(
        "indicadorCustos"
    ).textContent =
        dinheiro(totalCustos);


    document.getElementById(
        "indicadorVendas"
    ).textContent =
        dinheiro(totalVendas);


    document.getElementById(
        "indicadorResultado"
    ).textContent =
        dinheiro(resultado);


    mostrarHistorico();

    calcularVenda();

}


// ===============================
// HISTÓRICO
// ===============================

function mostrarHistorico() {

    const container =
        document.getElementById(
            "historicoFinanceiro"
        );


    const movimentacoes = [

        ...compras.map(item => ({

            ...item,

            categoria: "compra",

            descricao:
                `Compra de ${item.quantidade} animal(is)`

        })),

        ...custos.map(item => ({

            ...item,

            categoria: "custo",

            descricao:
                `${item.tipo}: ${item.descricao}`

        })),

        ...vendas.map(item => ({

            ...item,

            categoria: "venda",

            descricao:
                `Venda de ${item.quantidade} animal(is)`

        }))

    ];


    movimentacoes.sort(
        (a, b) =>
            Number(b.id) -
            Number(a.id)
    );


    if (movimentacoes.length === 0) {

        container.innerHTML = `
            <div class="historico-vazio">
                Nenhuma movimentação registrada.
            </div>
        `;

        return;

    }


    container.innerHTML =
        movimentacoes
            .map(item => {

                let valor = 0;

                let classe = "";

                let icone = "";


                if (item.categoria === "compra") {

                    valor = item.total;

                    classe = "movimento-compra";

                    icone = "🐂";

                }


                if (item.categoria === "custo") {

                    valor = item.valor;

                    classe = "movimento-custo";

                    icone = "💸";

                }


                if (item.categoria === "venda") {

                    valor = item.receita;

                    classe = "movimento-venda";

                    icone = "📈";

                }


                return `

                    <div class="movimento ${classe}">

                        <div class="movimento-icone">
                            ${icone}
                        </div>

                        <div class="movimento-info">

                            <strong>
                                ${item.descricao}
                            </strong>

                            <small>
                                ${item.data || ""}
                            </small>

                        </div>

                        <strong>
                            ${dinheiro(valor)}
                        </strong>

                    </div>

                `;

            })
            .join("");

}


// ===============================
// VOLTAR
// ===============================

function voltarInicio() {

    window.location.href =
        "index.html";

}


// ===============================
// INICIAR
// ===============================

atualizarTela();