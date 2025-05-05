<template>
  <div class="dashboard">
    <Sidebar />
    <div class="content" :class="{ 'content-expanded': isCollapsed }">
      <div class="topo">
        <div>
          <h1>Dashboard</h1>
        </div>
      </div>
      <div class="blocoInfo">
        <div>
          <i class="bx bx-trending-up iconeBloco"></i>
          <div class="infos">
            <p class="textoInfo">Total conciliado </p>
            <!-- <p>{{ formatarMoeda(valorConciliadoTotal) }}</p> -->
            <p>R$ 9.999.999,99</p>
            <p>20 % a mais que o periodo anterior</p>
          </div>    
        </div>
        <div>
          <i class="bx bx-trending-down iconeBloco"></i>
          <div class="infos">
            <p class="textoInfo">Total Pendente</p>
            <!-- <p>{{ formatarMoeda(valorPendenteTotal) }}</p> -->
            <p>R$ 9.999.999,99</p>
            <p>20 % a mais que o periodo anterior</p>
          </div>
          
        </div>
        <div>
          <p class="textoInfo">Estado de conciliação</p>
          <p>{{ estadoConciliacao }} %</p>
          <!-- <p>100 %</p> -->
        </div>
      </div>
      <div class="blocoGrafico">
        <p style="font-family: 14px; margin-bottom: 20px;">Transações</p>
        <canvas id="graficoLinha" style="width: 100%; height: 500px;"></canvas>
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
const valorConciliadoTotal = ref(((somaBanco + somaAdquirente) - valorPendenteTotal.value) / 2);

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
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 50px;
  box-sizing: border-box;
  max-height: 100vh;
  overflow: auto;
  justify-content: space-between;
}

.blocoInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.blocoInfo > div {
  padding: 1vw;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  min-width: 20vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.textoInfo {
  font-size: 14px;
}

.textoInfo + p {
  font-size: 36px ;
  font-weight: bold;
}

.blocoGrafico {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 2vw;
  box-sizing: border-box;
  border-radius: 10px;
}

.iconeBloco {
  border-radius: 100%;
  font-size: 36px;
  padding: 5px;
  color: #f6f6f6;
  width: 40px;
  height: 40px;
}


.bx-trending-up {
  background-color: lime;
}

.bx-trending-down {
  background-color: red;
}




@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }
}
</style>