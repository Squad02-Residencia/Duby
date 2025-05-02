<template>
  <div class="dashboard">
    <Sidebar />
    <div class="content" :class="{ 'content-expanded': isCollapsed }">
      <div class="topo">
        <div>
          <h1>Dashboard</h1>
        </div>
      </div>

      <div class="blocos">
        <div class="blocoInfo">
          <div>
            <p>Total conciliado</p>
            <p>{{ formatarMoeda(valorConciliadoTotal) }}</p>
          </div>
          <div>
            <p>Total Pendente</p>
            <p>{{ formatarMoeda(valorPendenteTotal) }}</p>
          </div>
          <div>
            <p>Estado de conciliação</p>
            <p>{{ estadoConciliacao }} %</p>
          </div>
        </div>
        <div class="blocoGrafico">
          <canvas id="graficoLinha"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { Chart } from 'chart.js';
import { onMounted, ref } from 'vue';

// Bloco destinado a tratamento de informações que irão para o dashboard

const data = ["20/02", "25/02", "02/03", "07/03", "12/03", "18/03", "20/03"];
const banco = [100, 500, 3000, 2000, 4000, 2500, 1200];
const adquirente = [100, 1000, 1000, 3500, 2000, 2000, 1200];

let somaBanco = banco.reduce((acc, val) => acc + val, 0);
let somaAdquirente = adquirente.reduce((acc, val) => acc + val, 0);

const valorPendenteTotal = ref(Math.abs(somaBanco - somaAdquirente));
const valorConciliadoTotal = ref((Math.abs(somaBanco + somaAdquirente) - valorPendenteTotal.value) / 2);

let conciliadoPorcentagem = ((valorConciliadoTotal.value / fatorPorcentagem()) * 100).toFixed(1);
const estadoConciliacao = ref(conciliadoPorcentagem);

console.log(somaBanco);
console.log(somaAdquirente);

function fatorPorcentagem() {
  return Math.max(somaBanco, somaAdquirente);
}


function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

onMounted(() => {
  new Chart("graficoLinha", {
    type: "line",
    data: {
    labels: data,
    datasets: [
    {
        label: "Adquirente",
        fill: false,
        tension: 0,
        borderColor: "#73BA60",
        backgroundColor: '#73BA60',
        borderWidth: 5,
        data: adquirente
    },
    {
        label: "Extrato",
        fill: false,
        lineTension: 0,
        borderColor: "#12283F",
        backgroundColor: "#12283F",
        borderWidth: 5,
        data: banco
    }
    ]
},
    options: {
      legend: {
        display: true,
        position: "bottom",
      }
    }
});
});
</script>

<style scoped>
.dashboard {
  display: flex;
}

.content {
  flex-grow: 1;
  padding: 50px;
  box-sizing: border-box;
  max-height: 100vh;
  overflow: auto;
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }
}
</style>