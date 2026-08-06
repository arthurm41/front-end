const sensoresIniciais = [
  { id: 1, nome: "Sensor Galpão A", tipo: "Temperatura", valor: 24.5, unidade: "°C", status: "normal" },
  { id: 2, nome: "Sensor Estufa 02", tipo: "Umidade", valor: 88.0, unidade: "%", status: "critico" },
  { id: 3, nome: "Sensor Compressor", tipo: "Pressão", valor: 6.2, unidade: "bar", status: "normal" },
  { id: 4, nome: "Sensor Câmara Fria", tipo: "Temperatura", valor: -2.1, unidade: "°C", status: "normal" },
  { id: 5, nome: "Sensor Almoxarifado", tipo: "Umidade", valor: 45.5, unidade: "%", status: "normal" },
  { id: 6, nome: "Sensor Caldeira", tipo: "Temperatura", valor: 98.4, unidade: "°C", status: "critico" }
];

let sensoresAtuais = [...sensoresIniciais];

// Histórico dos sensores
const historicoSensores = {};

function formatarHorario(data) {
  return data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

// Inicializa o histórico
sensoresIniciais.forEach(sensor => {
  historicoSensores[sensor.id] = [
    {
      horario: formatarHorario(new Date()),
      valor: sensor.valor
    }
  ];
});

// Atualiza o status automaticamente
function definirStatus(sensor) {
  switch (sensor.tipo) {
    case "Temperatura":
      return sensor.valor > 80 || sensor.valor < 0 ? "critico" : "normal";

    case "Umidade":
      return sensor.valor > 80 ? "critico" : "normal";

    case "Pressão":
      return sensor.valor > 8 ? "critico" : "normal";

    default:
      return "normal";
  }
}

function filtrarSensores(listaSensores, filtro) {
  if (filtro === "Todos") {
    return listaSensores;
  }

  return listaSensores.filter(sensor => sensor.tipo === filtro);
}

function atualizarValoresSensores(listaSensores) {
  return listaSensores.map(sensor => {

    const variacao = (Math.random() * 4 - 2).toFixed(1);

    let novoValor = Number(
      (sensor.valor + Number(variacao)).toFixed(1)
    );

    if (sensor.tipo === "Pressão" && novoValor < 0) {
      novoValor = 0.0;
    }

    const novoStatus = definirStatus({
      ...sensor,
      valor: novoValor
    });

    // Salva no histórico
    historicoSensores[sensor.id].push({
      horario: formatarHorario(new Date()),
      valor: novoValor
    });

    return {
      ...sensor,
      valor: novoValor,
      status: novoStatus
    };

  });
}

function atualizarHorarioRodape() {

  const elemento = document.getElementById("ultimo-update");

  if (elemento) {
    elemento.textContent = formatarHorario(new Date());
  }

}
function abrirHistorico(sensor){

    const modal = document.getElementById("modal-historico");
    const titulo = document.getElementById("titulo-historico");
    const conteudo = document.getElementById("conteudo-historico");

    titulo.textContent = sensor.nome;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Horário</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
    `;

    historicoSensores[sensor.id].forEach(item => {

        html += `
            <tr>
                <td>${item.horario}</td>
                <td>${item.valor} ${sensor.unidade}</td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>
    `;

    conteudo.innerHTML = html;

    modal.style.display = "flex";
}

function fecharHistorico() {
  const modal = document.getElementById("modal-historico");
  if (modal) {
    modal.style.display = "none";
  }
}

function renderizarDashboard(listaSensores) {

  const container = document.getElementById("sensor-grid");
  const contador = document.getElementById("contador-sensores");

  if (!container) return;

  container.innerHTML = "";

  const iconeMap = {
    Temperatura: "🌡️",
    Umidade: "💧",
    Pressão: "🔧"
  };

  // Coloca críticos primeiro
  listaSensores.sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "critico" ? -1 : 1;
  });

  listaSensores.forEach(sensor => {

    const card = document.createElement("article");

    card.className =
      `sensor-card ${sensor.status === "critico" ? "card-alerta" : ""}`;

    card.innerHTML = `
      <div class="sensor-card__top">
          <div class="sensor-icon">
              ${iconeMap[sensor.tipo] || "📡"}
          </div>

          <span class="sensor-status">
              ${sensor.status === "critico" ? "Crítico" : "Normal"}
          </span>
      </div>

      <h3>${sensor.nome}</h3>

      <p class="sensor-type">${sensor.tipo}</p>

      <p class="sensor-value">
          ${sensor.valor.toFixed(1)} ${sensor.unidade}
      </p>

      <p class="sensor-meta">
          Status: ${sensor.status}
      </p>

      <button
          class="sensor-history"
          type="button">
          Ver histórico
      </button>
    `;

    // Botão histórico
    card.querySelector(".sensor-history")
      .addEventListener("click", () => {
        abrirHistorico(sensor);
      });

    container.appendChild(card);

  });

  if (contador) {
    contador.textContent =
      `${listaSensores.length} sensor${listaSensores.length > 1 ? "es" : ""}`;
  }

}

function atualizarDados() {

  sensoresAtuais = atualizarValoresSensores(sensoresAtuais);

  const filtroAtual =
    document.getElementById("filtro-sensor")?.value || "Todos";

  const sensoresFiltrados =
    filtrarSensores(sensoresAtuais, filtroAtual);

  renderizarDashboard(sensoresFiltrados);

  atualizarHorarioRodape();

}

function inicializarDashboard() {

  const botaoAtualizar =
    document.getElementById("btn-atualizar");

  const selectFiltro =
    document.getElementById("filtro-sensor");

  if (botaoAtualizar) {

    botaoAtualizar.addEventListener(
      "click",
      atualizarDados
    );

  }

  if (selectFiltro) {

    selectFiltro.addEventListener("change", () => {

      renderizarDashboard(
        filtrarSensores(
          sensoresAtuais,
          selectFiltro.value
        )
      );

      atualizarHorarioRodape();

    });

  }

  renderizarDashboard(sensoresAtuais);

  atualizarHorarioRodape();

  const modalHistorico = document.getElementById("modal-historico");
  const botaoFecharHistorico = document.getElementById("btn-fechar-historico");

  if (botaoFecharHistorico) {
    botaoFecharHistorico.addEventListener("click", fecharHistorico);
  }

  if (modalHistorico) {
    modalHistorico.addEventListener("click", event => {
      if (event.target === modalHistorico) {
        fecharHistorico();
      }
    });
  }

  // Atualiza automaticamente a cada 30 segundos
  setInterval(atualizarDados, 30000);

}

if (typeof document !== "undefined") {

  document.addEventListener(
    "DOMContentLoaded",
    inicializarDashboard
  );

}

if (typeof module !== "undefined") {

  module.exports = {
    sensoresIniciais,
    filtrarSensores,
    atualizarValoresSensores
  };

}