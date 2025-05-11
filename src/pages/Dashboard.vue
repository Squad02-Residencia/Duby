<template>
  <div class="dashboard">
    <Sidebar />
    <div class="content" :class="{ 'content-expanded': isCollapsed }">
      <div class="topo">
        <h1>Dashboard</h1>
        <div class="filtros">
        <div class="data">
          <div>
            <p>De:</p>
            <input type="date">
          </div>
          <div>
            <p>até:</p>
            <input type="date">
          </div>
        </div>
        <div class="adquirentes">
          <p>Adquirentes:</p>
          <select name="adquirentesSelect" id="">
            <option value="todosAdquirentes">Todos</option>
            <option value="cielo">Cielo</option>
            <option value="stone">Stone</option>
            <option value="getnet">Getnet</option>
            <option value="rede">Rede</option>
          </select>
        </div>
        <div class="bandeira">
          <p>Bandeira:</p>
          <select name="bandeiraSelect" id="">
            <option value="todosAdquirentes">Todos</option>
            <option value="mastercard">Mastercard</option>
            <option value="visa">Visa</option>
            <option value="elo">elo</option>
            <option value="hipercard">hipercard</option>
          </select>
        </div>
      </div>
      </div>
      
      <div class="blocoInfo">
        <div>
          <div class="infos">
            <p class="textoInfo">Total conciliado </p>
            <!-- <p>{{ formatarMoeda(valorConciliadoTotal) }}</p> -->
            <p>R$ 999.999.999,99</p>
            <!-- <p>20 % a mais que o periodo anterior</p> -->
          </div>    
          <i class='bx bxs-check-circle iconeBloco'></i>
        </div>
        <div>
          <div class="infos">
            <p class="textoInfo">Total Pendente</p>
            <!-- <p>{{ formatarMoeda(valorPendenteTotal) }}</p> -->
            <p>R$ 999.999.999,99</p>
            <!-- <p>20 % a mais que o periodo anterior</p> -->
          </div>
          <i class='bx bxs-x-circle iconeBloco'></i>
          
        </div>
        <div>
          <div class="infos">
            <p class="textoInfo">Taxa de conciliação</p>
            <p>{{ estadoConciliacao }} %</p>
            <!-- <p>100 %</p> -->
          </div>
        </div>
      </div>
      <div class="blocoGrafico">
        <div class="blocoGraficoLinha">
          <p style="font-size: calc(8px + 1vw); font-family: dubyfont-bold; margin-bottom: 20px;">Transações</p>
          <canvas id="graficoLinha" style="width: 100%; height: 90%; justify-self: center;"></canvas>
        </div>
        <div>
          <table>
            <Caption style="font-size: calc(8px + 1vw); font-family: dubyfont-bold; text-align: left;">Divergências</Caption>
            <thead>
              <tr>
                <th>Data</th>
                <th>Adquirente</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25/02</td>
                <td>Stone</td>
                <td>R$ 500</td>
              </tr>
              <tr>
                <td>02/03</td>
                <td>Stone</td>
                <td>R$ 2000</td>
              </tr>
              <tr>
                <td>07/03</td>
                <td>Stone</td>
                <td>R$ 1500</td>
              </tr>
              <tr>
                <td>12/03</td>
                <td>Stone</td>
                <td>R$ 2000</td>
              </tr>
              <tr>
                <td>18/03</td>
                <td>Stone</td>
                <td>R$ 2500</td>
              </tr>
            </tbody>
          </table>
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
      scales: {
          yAxes: [{
              ticks: {
                  stepSize: 1000,
                  beginAtZero: true,
              }
          }]},
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
  overflow: auto;
  gap: 20px;

}

.topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1, .textoInfo + p, thead  {
  font-family: dubyfont-bold;
}

.filtros {
  display: flex;
  flex-wrap: wrap ;
  gap: 20px;
}

.filtros > div > select, input{
  border: 1px solid black;
  border-radius: 10px;
  padding: 8px;
  margin: 5px 10px 5px 0;
  background-color: white;
  font-size: calc(8px + 0.4vw);
}

.blocoInfo {
  display: flex;
  flex-direction: row;
  gap: 20px;
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
  overflow: hidden;
  width: 100%;
  min-width: 200px;
}

.infos{
  flex-grow: 1;
}

.textoInfo {
  font-size: calc(8px + 1vw);
}

.textoInfo + p {
  font-size: calc(16px + 1vw);
  font-family: dubyfont-bold;
}

.blocoGrafico {
  display: flex;
  gap: 20px;
  height: 100%;
}

.blocoGrafico > div {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 2vw;
  box-sizing: border-box;
  border-radius: 10px;
}

.blocoGraficoLinha {
  flex-grow: 1;
}


table {
  width: 350px;
  text-align: center;
  border-spacing: 0 10px;
  border-color: black;
  border-collapse: collapse;
}


thead {
  background-color: #dfdfdf;
}

tbody > tr{
  border-bottom: 1px solid black;
}

td {
  padding: 5px 0 5px 0;
}

.iconeBloco {
  border-radius: 100%;
  font-size: 3vw;
  color: #f6f6f6;
}

.bxs-check-circle {
  color: lime;
}

.bxs-x-circle {
  color: red;
}

.data {
  display: flex;
}


@media (max-width: 768px) {
  
  .dashboard {
    flex-direction: column;
    
  }

  .content {
    height: calc(100vh - 60px);
    padding: 20px;
  }

  .topo {
    flex-direction: column;
    gap: 10px;
  }

  .blocoInfo {
    flex-direction: column;
  }

  .textoInfo, .textoInfo + p {
    text-align: center;
  }

  .iconeBloco {
    display: none;
  }

  .blocoGrafico {
    flex-direction: column;
  }

  table {
    width: 100%;
  }
}
</style>