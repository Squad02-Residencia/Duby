<template>
    <div class="financial-dashboard-container">
        
      <div class="top-bar">
        <h1>Informações Financeiras</h1>
        <button class="export-button" @click="exportData">Exportar</button>
      </div>
  
      <div class="filters">
        <select v-model="selectedPeriod">
          <option value="">Período da Venda</option>
          <option value="ultimos7dias">Últimos 7 dias</option>
          <option value="mesatual">Mês Atual</option>
        </select>
        <select v-model="selectedPaymentMethod">
          <option value="">Forma de Pagamento</option>
          <option value="debito">Débito</option>
          <option value="creditoavista">Crédito a vista</option>
          <option value="creditoparcelado">Crédito parcelado</option>
        </select>
        <select v-model="selectedBrand">
          <option value="">Bandeira</option>
          <option value="elo">Elo</option>
          <option value="visa">VISA</option>
          <option value="maestro">Maestro</option>
          <option value="mastercard">MasterCard</option>
        </select>
        <select v-model="selectedAcquirer">
          <option value="">Adquirente</option>
          <option value="pagseguro">Pagseguro</option>
          <option value="cielo">Cielo</option>
          <option value="stone">Stone</option>
        </select>
        <div class="search-box">
          <label for="buscar">Buscar:</label>
          <input
            type="text"
            id="buscar"
            placeholder="Digite aqui..."
            v-model="searchTerm"
          />
        </div>
      </div>
  
      <div class="main-content">
        <div class="data-table">
          <table>
            <thead>
              <tr>
                <th class="table-header-cell date-col">Data da Venda</th>
                <th class="table-header-cell payment-col">Forma de Pagamento</th>
                <th class="table-header-cell brand-col">Bandeira</th>
                <th class="table-header-cell acquirer-col">Adquirente</th>
                <th class="table-header-cell bank-col">Banco</th>
                <th class="table-header-cell value-col">Valor da Venda</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredSales" :key="index">
                <td class="table-data-cell date-col">{{ item.date }}</td>
                <td class="table-data-cell payment-col">{{ item.paymentMethod }}</td>
                <td class="table-data-cell brand-col">{{ item.brand }}</td>
                <td class="table-data-cell acquirer-col">{{ item.acquirer }}</td>
                <td class="table-data-cell bank-col">{{ item.bank }}</td>
                <td class="table-data-cell value-col">{{ item.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="charts">
          <div class="chart-container">
            <canvas ref="pieChartCanvas"></canvas>
          </div>
          <div class="chart-container">
            <canvas ref="barChartCanvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>

  import Chart from 'chart.js/auto';
  
  export default {
    name: 'FinancialDashboard',
    data() {
      return {
        selectedPeriod: '',
        selectedPaymentMethod: '',
        selectedBrand: '',
        selectedAcquirer: '',
        searchTerm: '',
        salesData: [
          {
            date: '09/04/2025',
            paymentMethod: 'Débito',
            brand: 'Elo',
            acquirer: 'Pagseguro',
            bank: 'Banco do Brasil',
            value: 'R$13.200,97',
          },
          {
            date: '07/04/2025',
            paymentMethod: 'Débito',
            brand: 'VISA',
            acquirer: 'Cielo',
            bank: 'Itaú',
            value: 'R$5.970,81',
          },
          {
            date: '03/02/2025',
            paymentMethod: 'Débito',
            brand: 'Maestro',
            acquirer: 'Pagseguro',
            bank: 'Santander',
            value: 'R$1.230,13',
          },
          {
            date: '01/01/2025',
            paymentMethod: 'Crédito a vista',
            brand: 'MasterCard',
            acquirer: 'Pagseguro',
            bank: 'Caixa',
            value: 'R$450,97',
          },
          {
            date: '28/12/2024',
            paymentMethod: 'Crédito a vista',
            brand: 'MasterCard',
            acquirer: 'Pagseguro',
            bank: 'Bradesco',
            value: 'R$800,00',
          },
          {
            date: '25/12/2024',
            paymentMethod: 'Débito',
            brand: 'VISA',
            acquirer: 'Cielo',
            bank: 'Itaú',
            value: 'R$2.500,50',
          },
          {
            date: '20/12/2024',
            paymentMethod: 'Crédito parcelado',
            brand: 'Elo',
            acquirer: 'Stone',
            bank: 'Inter',
            value: 'R$1.500,00',
          },
          {
            date: '15/12/2024',
            paymentMethod: 'Débito',
            brand: 'Maestro',
            acquirer: 'Pagseguro',
            bank: 'Original',
            value: 'R$700,00',
          },
          {
            date: '10/12/2024',
            paymentMethod: 'Crédito a vista',
            brand: 'VISA',
            acquirer: 'Cielo',
            bank: 'Banco do Brasil',
            value: 'R$3.200,00',
          },
          {
            date: '05/12/2024',
            paymentMethod: 'Débito',
            brand: 'MasterCard',
            acquirer: 'Pagseguro',
            bank: 'Caixa',
            value: 'R$1.100,00',
          },
        ],
        pieChart: null,
        barChart: null,
      };
    },
    computed: {
      filteredSales() {
        // Simulação de filtro de período para exemplo
        const filterByPeriod = (itemDate) => {
          if (!this.selectedPeriod) return true;
  
          const today = new Date(); // Usar data atual para filtros dinâmicos
          // Atenção: O formato de data 'DD/MM/YYYY' precisa ser parseado corretamente.
          const [day, month, year] = itemDate.split('/').map(Number);
          const saleDate = new Date(year, month - 1, day); // Mês é 0-indexado em Date
  
          if (this.selectedPeriod === 'ultimos7dias') {
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(today.getDate() - 7);
            return saleDate >= sevenDaysAgo && saleDate <= today;
          }
          if (this.selectedPeriod === 'mesatual') {
            return saleDate.getMonth() === today.getMonth() && saleDate.getFullYear() === today.getFullYear();
          }
          return true; // Caso nenhum período específico corresponda
        };
  
        return this.salesData.filter((item) => {
          const matchesPeriod = filterByPeriod(item.date); // Lógica de filtro de período atualizada
          const matchesPaymentMethod =
            this.selectedPaymentMethod === '' ||
            item.paymentMethod.toLowerCase().includes(this.selectedPaymentMethod.toLowerCase());
          const matchesBrand =
            this.selectedBrand === '' ||
            item.brand.toLowerCase().includes(this.selectedBrand.toLowerCase());
          const matchesAcquirer =
            this.selectedAcquirer === '' ||
            item.acquirer.toLowerCase().includes(this.selectedAcquirer.toLowerCase());
          const matchesSearchTerm =
            this.searchTerm === '' ||
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
            );
  
          return (
            matchesPeriod &&
            matchesPaymentMethod &&
            matchesBrand &&
            matchesAcquirer &&
            matchesSearchTerm
          );
        });
      },
    },
    mounted() {
      this.initializeCharts();
    },
    beforeUnmount() {
      if (this.pieChart) {
        this.pieChart.destroy();
      }
      if (this.barChart) {
        this.barChart.destroy();
      }
    },
    methods: {
      initializeCharts() {
        const pieCtx = this.$refs.pieChartCanvas.getContext('2d');
        if (this.pieChart) this.pieChart.destroy();
        this.pieChart = new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: ['Conciliado', 'Pendente'],
            datasets: [
              {
                data: [72, 28],
                backgroundColor: ['#12283F', '#73BA60'],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  usePointStyle: true,
                  boxWidth: 10,
                },
              },
            },
          },
        });
  
        const barCtx = this.$refs.barChartCanvas.getContext('2d');
        if (this.barChart) this.barChart.destroy();
        this.barChart = new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: ['Vendas crédito', 'Vendas débito'],
            datasets: [
              {
                label: 'Vendas',
                data: [168, 96],
                backgroundColor: ['#12283F', '#73BA60'],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          },
        });
      },
      exportData() {
        alert('Funcionalidade de Exportar ainda não implementada.');
      },
    },
  };
  </script>
  
  <style scoped>
  :global(html), :global(body) {
    overflow-x: hidden !important; /* Crucial: Garante que a página inteira não role horizontalmente */
    width: 100% !important;         /* Garante que ocupa 100% da largura disponível */
    box-sizing: border-box !important; /* Inclui padding e border no cálculo da largura */
    margin: 0 !important;           /* Remove margens padrão do body */
    padding: 0 !important;          /* Remove paddings padrão do body */
  }
  
  /* Estilos globais para o container do dashboard */
  .financial-dashboard-container {
    font-family: Arial, sans-serif;
    background-color: #ffffff;
    color: #412884;
    padding: 15px 30px;
    width: 100%; /* Ocupa 100% da largura do pai */
    box-sizing: border-box; /* Inclui padding e border no cálculo da largura */
    position: relative;
  }
  
  /* Estilos para títulos */
  h1 {
    margin-bottom: 20px;
    font-size: 24px; /* Tamanho de fonte base para o título */
  }
  
  /* Barra superior */
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 20px; /* Adicionado espaço abaixo da top-bar */
  }
  
  /* Filtros */
  .filters {
    display: flex;
    gap: 10px; /* Espaçamento entre os filtros */
    margin-bottom: 20px; /* Espaço abaixo dos filtros */
    flex-wrap: wrap; /* Permite que os filtros quebrem linha em telas menores */
    align-items: center;
  }
  
  select,
  input[type='text'] {
    padding: 10px;
    border: 2px solid #412884;
    border-radius: 10px;
    min-width: 150px; /* Largura mínima para cada filtro */
    font-size: 14px;
    box-sizing: border-box;
  }
  
  .search-box {
    display: flex;
    align-items: center;
    gap: 5px; /* Espaço entre o label "Buscar:" e o input */
  }
  
  label {
    font-weight: bold;
    white-space: nowrap; /* Impede que o label quebre linha */
  }
  
  /* Botão Exportar */
  .export-button {
    background-color: #412884;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Efeito suave no hover */
  }
  
  .export-button:hover {
    background-color: #5a3aa0; /* Cor um pouco mais clara no hover */
  }
  
  /* Conteúdo principal (tabela + gráficos) */
  .main-content {
    display: flex;
    gap: 30px;
  }
  
  /* Estilização geral da tabela */
  .data-table {
    flex: 3; /* Tabela ocupa mais espaço horizontalmente */
    background: white;
    border: 2px solid #412884;
    border-radius: 10px;
    overflow-y: auto; /* Rolagem vertical para o container da tabela */
    overflow-x: auto; /* Crucial: Rolagem horizontal APENAS para o container da tabela */
    display: flex;
    flex-direction: column;
    min-height: 400px; /* Altura mínima para a área da tabela */
    max-height: calc(100vh - 250px); /* Exemplo de max-height para não estourar a viewport */
    box-sizing: border-box;
  }
  
  /* Configuração da tabela interna */
  table {
    width: 100%;
    min-width: 1020px; 
    border-collapse: collapse;
    table-layout: fixed; /* Essencial para larguras de coluna fixas e performance */
    /* flex: 1; e display:flex; na table podem ser complexos, a estrutura thead/tbody abaixo lida com isso. */
  }
  
  /* Cabeçalho fixo */
  thead {
    /* flex: 0 0 auto; Não é necessário com display:table */
    display: table;
    width: 100%;
    table-layout: fixed; /* Para alinhar com as colunas do tbody */
    background-color: #f8f8f8; /* Fundo para o cabeçalho */
  }
  
  thead tr {
    display: table-row;
  }
  
  /* Área de dados com rolagem vertical */
  tbody {
    display: block;    /* Essencial para rolagem vertical independente do thead */
    overflow-y: auto;  /* Adiciona rolagem vertical se o conteúdo do tbody exceder a altura do .data-table */
    height: calc(100% - 50px); /* Ajustar 50px pela altura real do seu thead */
  }
  
  /* Linhas do corpo da tabela */
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    box-sizing: border-box;
  }
  
  tbody tr:hover {
    background-color: #f2f2f2;
  }
  
  /* Células (cabeçalho e dados) */
  thead th,
  tbody td {
    padding: 15px; /* Padding padrão para células */
    text-align: left;
    border-bottom: 1px solid #ddd;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  
  thead th {
    font-weight: bold;
    background-color: #f0f0f0; /* Cor de fundo para cabeçalho */
  }
  
  /* Definindo larguras fixas para as colunas */
  .date-col { width: 150px; }
  .payment-col { width: 200px; }
  .brand-col { width: 130px; }
  .acquirer-col { width: 180px; }
  .bank-col { width: 180px; }
  .value-col { width: 180px; text-align: right; } /* Alinhar valores à direita */
  
  /* Gráficos */
  .charts {
    flex: 2; /* Gráficos ocupam menos espaço que a tabela */
    display: flex;
    flex-direction: column;
    gap: 20px; /* Espaço entre os gráficos */
  }
  
  .chart-container {
    background: white;
    border: 2px solid #412884;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    flex: 1; /* Cada gráfico tenta ocupar espaço igual dentro de .charts */
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px; /* Altura mínima para cada container de gráfico */
    box-sizing: border-box;
  }
  
  .charts canvas {
    max-width: 100%;
    max-height: 100%;
  }
  
  /* ==========================================================================
     Responsividade
     ========================================================================== */
  @media (max-width: 1200px) { /* Ajuste para telas um pouco menores antes de empilhar tudo */
    .main-content {
      gap: 20px;
    }
    .data-table {
      flex: 2.5; /* Ajusta proporção */
    }
    .charts {
      flex: 1.5; /* Ajusta proporção */
    }
  }
  
  
  @media (max-width: 992px) { /* Breakpoint para tablets e telas menores */
    .financial-dashboard-container {
      padding: 10px 15px;
    }
  
    .top-bar {
      flex-direction: column; /* Empilha título e botão exportar */
      align-items: flex-start;
      gap: 10px;
    }
    h1 {
      font-size: 20px;
    }
  
    .main-content {
      flex-direction: column; /* Tabela acima dos gráficos */
      height: auto; /* Permite que o conteúdo defina a altura */
      gap: 30px;
    }
  
    .data-table,
    .charts {
      width: 100%;
      flex: 1 1 auto; /* Se ajusta e cresce conforme o conteúdo */
      max-height: none; /* Remove max-height para layout de coluna */
    }
  
    .data-table {
      min-height: 350px;
      max-height: 60vh; /* Limita altura da tabela em modo coluna */
    }
  
    tbody {
       /* Ajusta a altura do tbody para preencher o .data-table ou até o conteúdo rolar */
      height: auto; /* Deixa o conteúdo definir, mas overflow-y no tbody garante scroll */
      max-height: calc(60vh - 50px); /* Subtrai altura aproximada do thead */
    }
  
    .charts {
      min-height: auto; /* Remove min-height fixo, deixa conteúdo definir */
      gap: 20px;
    }
  
    .chart-container {
      min-height: 250px; /* Altura mínima para cada gráfico individual */
    }
  
    .filters {
      flex-direction: column; /* Filtros em coluna */
      align-items: stretch; /* Estica os filtros para ocupar a largura */
      gap: 8px;
    }
  
    select,
    input[type="text"] {
      width: 100%; /* Filtros ocupam 100% da largura */
      min-width: unset;
    }
  
    table {
      /* A min-width aqui deve ser a soma das larguras das colunas + paddings.
         Se as larguras das colunas não mudam, a min-width da tabela não precisa mudar drasticamente,
         a rolagem interna cuidará disso.
         Exemplo: 150+200+130+180+180+180 = 1020px base.
         Paddings (10px*2 por célula = 20px * 6 colunas = 120px). Total ~1140px.
      */
      min-width: 800px; /* Reduz um pouco, mas ainda espera rolagem */
    }
  
    thead th,
    tbody td {
      padding: 12px;
      font-size: 13px;
    }
  }
  
  @media (max-width: 768px) { /* Celulares em paisagem ou tablets menores */
    h1 {
      font-size: 18px;
    }
    .export-button {
      padding: 8px 15px;
      font-size: 12px;
    }
    thead th, tbody td {
      padding: 10px;
      font-size: 12px;
    }
    /* Larguras de coluna podem ser ajustadas aqui se necessário */
    .date-col { width: 120px; }
    .payment-col { width: 150px; }
    .brand-col { width: 100px; }
    .acquirer-col { width: 120px; }
    .bank-col { width: 120px; }
    .value-col { width: 120px; }
    /* Nova min-width da tabela: 120+150+100+120+120+120 = 730px. */
    table {
      min-width: 730px;
    }
  }
  
  
  @media (max-width: 480px) { /* Celulares em retrato */
    .financial-dashboard-container {
      padding: 10px 5px; /* Menos padding horizontal no container geral */
    }
  
    .top-bar, .filters, .main-content {
      padding-left: 5px;
      padding-right: 5px;
    }
  
    h1 {
      font-size: 16px;
    }
    .export-button {
      padding: 6px 10px;
      font-size: 10px;
    }
  
    select,
    input[type="text"] {
      padding: 8px;
      font-size: 12px;
    }
  
    thead th,
    tbody td {
      padding: 8px;
      font-size: 10px;
    }
  
    /* Ajuste fino das larguras das colunas para celulares muito pequenos */
    .date-col { width: 80px; }
    .payment-col { width: 120px; }
    .brand-col { width: 80px; }
    .acquirer-col { width: 100px; }
    .bank-col { width: 100px; }
    .value-col { width: 100px; }
  
  
    table {
      min-width: 676px; /* Ajustado para ser a soma das larguras das colunas + seus paddings */
    }
  
    .chart-container {
      min-height: 180px; /* Reduz altura mínima dos gráficos */
    }
  }
  </style>