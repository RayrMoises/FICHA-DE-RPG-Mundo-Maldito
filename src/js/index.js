// ==========================================
// 1. BANCO DE DADOS (OCUPAÇÕES)
// ==========================================

const dadosOcupacoes = {
    "ladrao": {
        nome: "Ladrão",
        atributos: "AGI +5, INT +5",
        pericias: "Furtividade 10, Investigação 8, Percepção 7, Reflexos 8"
    },
    "artista_marcial": {
        nome: "Artista Marcial",
        atributos: "AGI +7, FOR +7, VIG +5",
        pericias: "Luta 10, Reflexo 8, Fortitude 8, Atletismo 7"
    },
    "sacerdote_pastor": {
        nome: "Sacerdote/Pastor",
        atributos: "CAR +8",
        pericias: "Religião 10, Vontade 8, Intuição 7"
    },
    "cientista": {
        nome: "Cientista",
        atributos: "INT +8",
        pericias: "Investigação 8, Ciência 10, Tecnologia 7"
    },
    "medico": {
        nome: "Médico",
        atributos: "CAR +10, INT +8",
        pericias: "Medicina 10, Investigação 8, Ciência 6"
    },
    "cacador": {
        nome: "Caçador",
        atributos: "AGI +7, FOR +7, VIG +5",
        pericias: "Pontaria 8, Sobrevivência 10, Percepção 8, Furtividade 7"
    },
    "vendedor": {
        nome: "Vendedor",
        atributos: "INT +8",
        pericias: "Diplomacia 10, Enganação 8, Intuição 6"
    },
    "atleta": {
        nome: "Atleta",
        atributos: "AGI +8, FOR +8, VIG +8",
        pericias: "Atletismo 10, Fortitude 8, Reflexo 7"
    },
    "entregador": {
        nome: "Entregador",
        atributos: "AGI +8",
        pericias: "Reflexo 8, Pilotagem 10, Percepção 7"
    },
    "veterinario": {
        nome: "Veterinário",
        atributos: "CAR +8, INT +6",
        pericias: "Adestramento 10, Medicina 6"
    },
    "advogado": {
        nome: "Advogado",
        atributos: "INT +8, CAR +10",
        pericias: "Diplomacia 10, Investigação 8"
    },
    "mecanico": {
        nome: "Mecânico",
        atributos: "INT +7",
        pericias: "Engenhosidade 10, Tecnologia 8, Investigação 8"
    },
    "soldado": {
        nome: "Soldado",
        atributos: "AGI +7, FOR +10, VIG +8",
        pericias: "Fortitude 10, Pontaria 8, Percepção 8, Luta 7, Tática 8"
    },
    "psicologo": {
        nome: "Psicólogo",
        atributos: "INT +8",
        pericias: "Diplomacia 10, Vontade 8, Intuição 6"
    },
    "professor": {
        nome: "Professor",
        atributos: "INT +10",
        pericias: "Ciência 10, Diplomacia 8, Investigação 7"
    },
    "estrategista": {
        nome: "Estrategista",
        atributos: "INT +8",
        pericias: "Tática 10, Investigação 8, Percepção 7"
    },
    "investigador": {
        nome: "Detetive / Investigador",
        atributos: "INT +8",
        pericias: "Intuição 8, Investigação 10, Percepção 8"
    },
    "policial": {
        nome: "Policial",
        atributos: "AGI +8, VIG +8, FOR +7",
        pericias: "Fortitude 8, Pontaria 10, Pilotagem 8, Percepção 6, Tática 7"
    },
    "quenga_quengo": {
        nome: "Quenga/Quengo",
        atributos: "A definir pelo Mestre",
        pericias: "Safadeza 10, Enganação 8"
    },

    "outro": {
        nome: "Você decide",
        atributos: "A definir pelo mestre de acordo com sua profissão",
        pericias: "O mestre irá definir juntamente de você."
    }
};

// ==========================================
// 1.1 BANCO DE DADOS (CLASSES)
// ==========================================
const bonusClasses = {
    "combatente": { hp: 15, energia: 0, fome: 5 },
    "pactarios":  { hp: 5,  energia: 10, fome: 0 },
    "esoterico":  { hp: 0,  energia: 20, fome: 0 },
    "nenhuma":    { hp: 0,  energia: 0,  fome: 0 }
};

// ==========================================
// 1.2 BARRA DE XP
// ==========================================

function getXpNecessario() {
    const exposicao =
        parseInt(document.getElementById('input-exposicao')?.value) || 0;

    return 50 + (exposicao * 50);
}

function atualizarXPNecessario() {

    const spanXP =
        document.getElementById('max-xp');

    if (!spanXP) return;

    spanXP.textContent = getXpNecessario();
}

function alterarXP(valor) {

    const inputXP =
        document.getElementById('input-xp');

    const inputExpo =
        document.getElementById('input-exposicao');

    if (!inputXP || !inputExpo) return;

    let xpAtual =
        parseInt(inputXP.value) || 0;

    xpAtual += valor;

    if (xpAtual < 0)
        xpAtual = 0;

    let xpNecessario =
        getXpNecessario();

    while (xpAtual >= xpNecessario) {

        xpAtual -= xpNecessario;

        let exposicao =
            parseInt(inputExpo.value) || 0;

        if (exposicao < 100) {

            exposicao = Math.min(exposicao + 3, 100);

            inputExpo.value = exposicao;

            atualizarBarraVisual('exposicao');
            atualizarTudo();

            xpNecessario =
                getXpNecessario();
        }
        else {
            xpAtual = xpNecessario;
            break;
        }
    }

    inputXP.value = xpAtual;

    atualizarXPNecessario();
    atualizarBarraXP();

    salvarFichaLocalStorage();
}

function atualizarBarraXP() {

    const inputXP =
        document.getElementById('input-xp');

    const fillXP =
        document.getElementById('fill-xp');

    if (!inputXP || !fillXP) return;

    const atual =
        parseInt(inputXP.value) || 0;

    const necessario =
        getXpNecessario();

    const porcentagem =
        (atual / necessario) * 100;

    fillXP.style.width =
        porcentagem + '%';
}

// ==========================================
// 1.3 VERIFICADOR DE OCUPAÇÃO
// ==========================================
// Elementos do modal
const modal = document.getElementById("modal-info");
const btnInfoOcupacao = document.getElementById("btn-info-ocupacao");
const closeModal = document.querySelector(".close-modal");
const selectOcupacao = document.getElementById("ocupacao");

// Abrir modal
btnInfoOcupacao.addEventListener("click", () => {

    const ocupacaoSelecionada = selectOcupacao.value;

    // Verifica se alguma ocupação foi escolhida
    if (!ocupacaoSelecionada) {
        alert("Selecione uma ocupação primeiro.");
        return;
    }

    const dados = dadosOcupacoes[ocupacaoSelecionada];

    // Caso não encontre a ocupação
    if (!dados) {
        alert("Informações da ocupação não encontradas.");
        return;
    }

    // Preenche o modal
    document.getElementById("modal-titulo-ocupacao").textContent = dados.nome;
    document.getElementById("modal-atributos-info").textContent = dados.atributos;
    document.getElementById("modal-pericias-info").textContent = dados.pericias;

    // Exibe o modal
    modal.style.display = "block";
});

// Fechar pelo X
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fechar clicando fora
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// ==========================================
// 2. SELEÇÃO DE ELEMENTOS (DOM)
// ==========================================

const inputsPericias =
document.querySelectorAll('#tab-pericias input[type="number"]');

// ==========================================
// 3. SISTEMA DE BARRAS DE STATUS
// ==========================================
function alterarValor(status, quantidade) {
    const input = document.getElementById(`input-${status}`);
    if (!input) return;

    let atual = parseInt(input.value) || 0;
    let max;

    if (status === 'exposicao') {
        max = 100;
    } else {
        const spanMax = document.getElementById(`max-${status}`);
        max = parseInt(spanMax?.textContent) || 0;
    }

    let novoValor = atual + quantidade;

    if (novoValor < 0) novoValor = 0;
    if (novoValor > max) novoValor = max;

    input.value = novoValor;
    atualizarBarraVisual(status);

    // 🔥 CORREÇÃO CRÍTICA
    if (status === 'exposicao') {
        atualizarTudo();
    }
}




function atualizarBarraVisual(status) {
    const input = document.getElementById(`input-${status}`);
    const barra = document.getElementById(`fill-${status}`);
    if (!input || !barra) return;

    let atual = parseInt(input.value) || 0;
    let max = 1;

    if (status === 'exposicao') {
        max = 100;
    } else {
        const spanMax = document.getElementById(`max-${status}`);
        max = parseInt(spanMax?.textContent) || 1;
    }

    const porcentagem = Math.min((atual / max) * 100, 100);
    barra.style.width = porcentagem + "%";
}



// ==========================================
// 4. SISTEMA DE ABAS (TABS)
// ==========================================
function showTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById('tab-' + tabId);
    if (targetTab) {
        targetTab.style.display = 'block';
        targetTab.classList.add('active');
    }

    const clickedBtn = document.querySelector(`button[onclick*="'${tabId}'"]`);
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
}

// ==========================================
// 6. EVENTOS DE INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa barras
    ['hp', 'sanidade', 'fome', 'exposicao', 'energia'].forEach(atualizarBarraVisual);

    // Validação de inputs de perícias
    inputsPericias.forEach(input => {
        input.addEventListener('input', () => {
            let valor = parseInt(input.value);
            if (valor > 20) input.value = 20;
            if (valor < '') input.value = '';
            if (input.value === "") input.value = '';
        });
    });

    // Mudança no Select de Ocupação
    selectOcupacao.addEventListener('change', () => {
        btnInfoOcupacao.classList.add('ativo');

        btnInfoOcupacao.style.transform = "scale(0.95)";

        setTimeout(() => {
            btnInfoOcupacao.style.transform = "scale(1)";
        }, 100);
        });
    // Mudança no Select de Classe
    const selectClasse = document.getElementById('classe');
    if (selectClasse) {
        selectClasse.addEventListener('change', () => {
            atualizarTudo();
            salvarFichaLocalStorage();
        });
    }
});



// ==========================================
// 7. LIMITE DE ATRIBUTOS (INTELIGÊNCIA e CARISMA)
// ==========================================

function limitarAtributoPorNome(nomeAtributo, limite) {
    const atributos = document.querySelectorAll('.atrib-item');

    atributos.forEach(item => {
        const titulo = item.querySelector('h3');
        const input = item.querySelector('input[type="number"]');

        if (!titulo || !input) return;

        if (titulo.innerText.trim().toUpperCase() === nomeAtributo.toUpperCase()) {
            input.addEventListener('input', () => {
                let valor = parseInt(input.value);

                if (isNaN(valor)) {
                    input.value = 0;
                    return;
                }

                if (valor > limite) {
                    input.value = limite;
                }

                if (valor < 0) {
                    input.value = 0;
                }
            });
        }
    });
}

// Inicializa os limites
document.addEventListener('DOMContentLoaded', () => {
    limitarAtributoPorNome('INTELIGÊNCIA', 30);
    limitarAtributoPorNome('CARISMA', 30);
});

// ==========================================
// 8. SINCRONIZAÇÃO ATRIBUTOS ↔ BARRAS
// ==========================================

function getAtributoValor(nome) {
    const itens = document.querySelectorAll('.atrib-item');
    for (const item of itens) {
        const titulo = item.querySelector('h3');
        const input = item.querySelector('input');
        if (titulo && input && titulo.innerText.trim().toUpperCase() === nome.toUpperCase()) {
            return parseInt(input.value) || 0;
        }
    }
    return 0;
}

function setMaxBarra(status, novoMax) {
    const spanMax = document.getElementById(`max-${status}`);
    const input = document.getElementById(`input-${status}`);

    if (!spanMax || !input) return;

    // fonte de verdade do máximo
    input.dataset.max = novoMax;
    spanMax.textContent = novoMax;

    if (parseInt(input.value) > novoMax) {
        input.value = novoMax;
    }

    atualizarBarraVisual(status);
}

// Função auxiliar para identificar bônus da classe atual
function getBonusClasse() {
    const classeAtiva = document.getElementById('classe')?.value || 'nenhuma';
    return bonusClasses[classeAtiva] || bonusClasses["nenhuma"];
}


// ==========================================
// 8.1 VIGOR → VITALIDADE
// ==========================================

function atualizarVitalidade() {
    const vigor = getAtributoValor('VIGOR');
    const bonusVigor = vigor * 4;
    const baseHP = 20;
    const bonusExposicao = calcularBonusExposicao();
    const bonusDaClasse = getBonusClasse().hp; // Bônus de classe

    setMaxBarra('hp', baseHP + bonusVigor + bonusExposicao.hp + bonusDaClasse);
}


// ==========================================
// 8.2 ENERGIA P. → ENERGIA PARANORMAL
// ==========================================

function atualizarEnergiaParanormal() {
    const energiaAtributo = getAtributoValor('ENERGIA P.');
    const bonusExposicao = calcularBonusExposicao();
    const bonusDaClasse = getBonusClasse().energia; // Bônus de classe

    const maxEnergia = (energiaAtributo * 5) + bonusExposicao.energia + bonusDaClasse;
    setMaxBarra('energia', Math.max(0, maxEnergia));
}

// ==========================================
// 8.3 EXPOSIÇÃO PARANORMAL (bônus aleatório)
// ==========================================

let cacheBonusExposicao = { hp: 0, energia: 0 };
let etapasExposicaoAnterior = 0;

function calcularBonusExposicao() {
    const exposicao = parseInt(document.getElementById('input-exposicao')?.value) || 0;
    const etapasAtuais = Math.floor(exposicao / 5);

    // Subiu exposição → adiciona bônus
    if (etapasAtuais > etapasExposicaoAnterior) {
        const diferenca = etapasAtuais - etapasExposicaoAnterior;

        for (let i = 0; i < diferenca; i++) {
            if (Math.random() < 0.5) {
                cacheBonusExposicao.hp++;
            } else {
                cacheBonusExposicao.energia++;
            }
        }
    }

    // Desceu exposição → remove bônus
    if (etapasAtuais < etapasExposicaoAnterior) {
        const diferenca = etapasExposicaoAnterior - etapasAtuais;

        for (let i = 0; i < diferenca; i++) {
            if (cacheBonusExposicao.hp > 0) {
                cacheBonusExposicao.hp--;
            } else if (cacheBonusExposicao.energia > 0) {
                cacheBonusExposicao.energia--;
            }
        }
    }

    etapasExposicaoAnterior = etapasAtuais;
    return cacheBonusExposicao;
}


// ==========================================
// 8.4 OUVINTES DE ATUALIZAÇÃO
// ==========================================

function atualizarTudo() {
    atualizarVitalidade();
    atualizarEnergiaParanormal();
    atualizarFome();

    atualizarXPNecessario();
    atualizarBarraXP();
}


document.addEventListener('input', (e) => {
    if (e.target.closest('.atrib-item') || e.target.id === 'input-exposicao') {
        atualizarTudo();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    atualizarTudo();
});

// ==========================================
// 8.5 VIGOR → FOME (acumulativo)
// ==========================================

let etapasVigorAnterior = 0;
let bonusFomeAcumulado = 0;

function atualizarFome() {
    const vigor = getAtributoValor('VIGOR');
    const etapasAtuais = Math.floor(vigor / 5);

    if (etapasAtuais > etapasVigorAnterior) {
        const diferenca = etapasAtuais - etapasVigorAnterior;
        bonusFomeAcumulado += diferenca * 3;
    }
    if (etapasAtuais < etapasVigorAnterior) {
        const diferenca = etapasVigorAnterior - etapasAtuais;
        bonusFomeAcumulado -= diferenca * 3;
        if (bonusFomeAcumulado < 0) bonusFomeAcumulado = 0;
    }

    etapasVigorAnterior = etapasAtuais;

    const baseFome = 29;
    const bonusDaClasse = getBonusClasse().fome; // Bônus de classe
    const novoMaxFome = baseFome + bonusFomeAcumulado + bonusDaClasse;

    setMaxBarra('fome', novoMaxFome);
}

// ==========================================
// 9. UPLOAD DE IMAGEM DE PERFIL
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const inputFoto = document.getElementById('foto-perfil');
    const imgPerfil = document.getElementById('imagem-perfil');
    const iconePerfil = document.getElementById('icone-perfil');

    if (!inputFoto || !imgPerfil || !iconePerfil) return;

    inputFoto.addEventListener('change', () => {
        const arquivo = inputFoto.files[0];
        if (!arquivo) return;

        if (!arquivo.type.startsWith('image/')) {
            alert('Por favor, selecione apenas imagens.');
            inputFoto.value = '';
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            imgPerfil.src = reader.result; // base64
            imgPerfil.style.display = 'block';
            iconePerfil.style.display = 'none';

            // força salvar imediatamente a imagem
            salvarFichaLocalStorage();
        };

        reader.readAsDataURL(arquivo);
    });
});

// ==========================================
// 10. LOCAL STORAGE (APENAS ADIÇÃO)
// ==========================================

const STORAGE_KEY_FICHA = 'ficha_rpg_mundo_maldito';

// -------- SALVAR --------
function salvarFichaLocalStorage() {
    const data = {
        basicos: {
            personagem: document.getElementById('nome-personagem')?.value || '',
            jogador: document.getElementById('nome-jogador')?.value || '',
            classe: document.getElementById('classe')?.value || '',
            ocupacao: document.getElementById('ocupacao')?.value || ''
        },

        atributos: Array.from(document.querySelectorAll('.atrib-item')).map(item => ({
            nome: item.querySelector('h3')?.innerText || '',
            valor: item.querySelector('input')?.value || 0
        })),

        pericias: Array.from(document.querySelectorAll('#tab-pericias input')).map(input => ({
            id: input.id,
            valor: input.value
        })),

        barras: ['hp', 'sanidade', 'fome', 'energia', 'exposicao'].reduce((acc, b) => {
            acc[b] = document.getElementById(`input-${b}`)?.value || 0;
            return acc;
        }, {}),

        diarios: {
            habilidades: document.getElementById('habilidades')?.value || '',
            itens: document.getElementById('itens')?.value || '',
            historia: document.getElementById('historia')?.value || '',
            notas: document.getElementById('diario-notas')?.value || ''
        },

        estadosInternos: {
            cacheBonusExposicao,
            etapasExposicaoAnterior,
            bonusFomeAcumulado,
            etapasVigorAnterior
        },

        imagemPerfil: (() => {
            const img = document.getElementById('imagem-perfil');
            if (img && img.src.startsWith('data:')) return img.src;
            return null;
        })()
    };

    localStorage.setItem(STORAGE_KEY_FICHA, JSON.stringify(data));
}

// -------- CARREGAR --------
function carregarFichaLocalStorage() {
    const raw = localStorage.getItem(STORAGE_KEY_FICHA);
    if (!raw) return;

    const data = JSON.parse(raw);

    // Básicos
    document.getElementById('nome-personagem').value = data.basicos.personagem;
    document.getElementById('nome-jogador').value = data.basicos.jogador;
    document.getElementById('classe').value = data.basicos.classe;
    document.getElementById('ocupacao').value = data.basicos.ocupacao;

    // Atributos
    data.atributos.forEach(attr => {
        document.querySelectorAll('.atrib-item').forEach(item => {
            const h3 = item.querySelector('h3');
            const input = item.querySelector('input');
            if (h3 && input && h3.innerText === attr.nome) {
                input.value = attr.valor;
            }
        });
    });

    // Perícias
    data.pericias.forEach(p => {
        const input = document.getElementById(p.id);
        if (input) input.value = p.valor;
    });

    // Barras
    Object.entries(data.barras).forEach(([b, v]) => {
        const input = document.getElementById(`input-${b}`);
        if (input) input.value = v;
    });

    // Diário
    document.getElementById('habilidades').value = data.diarios.habilidades;
    document.getElementById('itens').value = data.diarios.itens;
    document.getElementById('historia').value = data.diarios.historia;
    document.getElementById('diario-notas').value = data.diarios.notas;

    // Estados internos
    cacheBonusExposicao = data.estadosInternos.cacheBonusExposicao || cacheBonusExposicao;
    etapasExposicaoAnterior = data.estadosInternos.etapasExposicaoAnterior || 0;
    bonusFomeAcumulado = data.estadosInternos.bonusFomeAcumulado || 0;
    etapasVigorAnterior = data.estadosInternos.etapasVigorAnterior || 0;

    // Imagem
    if (data.imagemPerfil) {
        const img = document.getElementById('imagem-perfil');
        const icone = document.getElementById('icone-perfil');
        img.src = data.imagemPerfil;
        img.style.display = 'block';
        icone.style.display = 'none';
    }

    atualizarTudo();
    ['hp','sanidade','fome','energia','exposicao', 'xp'].forEach(atualizarBarraVisual);
}

// -------- AUTO SAVE --------
document.addEventListener('input', salvarFichaLocalStorage);
document.addEventListener('change', salvarFichaLocalStorage);

// -------- INIT --------
document.addEventListener('DOMContentLoaded', carregarFichaLocalStorage);

