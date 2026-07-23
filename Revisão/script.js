const sensoresIniciais = [
  { id: 1, nome: 'Sensor Galpão A', tipo: 'Temperatura', valor: 24.5, unidade: '°C', status: 'normal' },
  { id: 2, nome: 'Sensor Estufa 02', tipo: 'Umidade', valor: 88.0, unidade: '%', status: 'critico' },
  { id: 3, nome: 'Sensor Compressor', tipo: 'Pressão', valor: 6.2, unidade: 'bar', status: 'normal' },
  { id: 4, nome: 'Sensor Câmara Fria', tipo: 'Temperatura', valor: -2.1, unidade: '°C', status: 'normal' },
  { id: 5, nome: 'Sensor Almoxarifado', tipo: 'Umidade', valor: 45.5, unidade: '%', status: 'normal' },
  { id: 6, nome: 'Sensor Caldeira', tipo: 'Temperatura', valor: 98.4, unidade: '°C', status: 'critico' }
];

let sensoresAtuais = [...sensoresIniciais];

function filtrarSensores(listaSensores, filtro) {
  if (filtro === 'Todos') {
    return listaSensores;
  }

  return listaSensores.filter((sensor) => sensor.tipo === filtro);
}

function atualizarValoresSensores(listaSensores) {
  return listaSensores.map((sensor) => {
    const variacao = (Math.random() * 4 - 2).toFixed(1);
    const novoValor = Number((sensor.valor + Number(variacao)).toFixed(1));

    return {
      ...sensor,
      valor: novoValor
    };
  });
}

function formatarHorario(data) {
  return data.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function atualizarHorarioRodape() {
  const elemento = document.getElementById('ultimo-update');
  if (elemento) {
    elemento.textContent = formatarHorario(new Date());
  }
}

function renderizarDashboard(listaSensores) {
  const container = document.getElementById('sensor-grid');
  const contador = document.getElementById('contador-sensores');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  listaSensores.forEach((sensor) => {
    const card = document.createElement('article');
    card.className = `sensor-card${sensor.status === 'critico' ? ' card-alerta' : ''}`;

    const iconeMap = {
      Temperatura: '🌡️',
      Umidade: '💧',
      Pressão: '🔧'
    };

    card.innerHTML = `
      <div class="sensor-card__top">
        <div class="sensor-icon">${iconeMap[sensor.tipo] || '📡'}</div>
        <span class="sensor-status">${sensor.status === 'critico' ? 'Crítico' : 'Normal'}</span>
      </div>
      <h3>${sensor.nome}</h3>
      <p class="sensor-type">${sensor.tipo}</p>
      <p class="sensor-value">${sensor.valor.toFixed(1)} ${sensor.unidade}</p>
      <p class="sensor-meta">Status: ${sensor.status}</p>
      <button class="sensor-history" type="button">Ver histórico</button>
    `;

    container.appendChild(card);
  });

  if (contador) {
    contador.textContent = `${listaSensores.length} sensor${listaSensores.length === 1 ? '' : 'es'}`;
  }
}

function atualizarDados() {
  sensoresAtuais = atualizarValoresSensores(sensoresAtuais);
  const filtroAtual = document.getElementById('filtro-sensor')?.value || 'Todos';
  renderizarDashboard(filtrarSensores(sensoresAtuais, filtroAtual));
  atualizarHorarioRodape();
}

function inicializarDashboard() {
  const botaoAtualizar = document.getElementById('btn-atualizar');
  const selectFiltro = document.getElementById('filtro-sensor');

  if (botaoAtualizar) {
    botaoAtualizar.addEventListener('click', atualizarDados);
  }

  if (selectFiltro) {
    selectFiltro.addEventListener('change', () => {
      renderizarDashboard(filtrarSensores(sensoresAtuais, selectFiltro.value));
      atualizarHorarioRodape();
    });
  }

  renderizarDashboard(sensoresAtuais);
  atualizarHorarioRodape();
  setInterval(atualizarDados, 30000);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', inicializarDashboard);
}

if (typeof module !== 'undefined') {
  module.exports = {
    sensoresIniciais,
    filtrarSensores,
    atualizarValoresSensores
  };
}
