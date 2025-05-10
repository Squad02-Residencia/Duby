<template>
    <div class="layout">
        <Sidebar />
        <div class="content">
            <h2>Gerir Taxas</h2>
            <div class="border-container">
                <div class="container">
                    <div class="t">
                        <p><strong>Total Arrecadado:</strong></p>
                        <h1>R$999</h1>
                    </div>
                    <div class="t">
                        <p><strong>Total Pendentes:</strong></p>
                        <h1>R$999</h1>
                    </div>
                    <div class="t">
                        <p><strong>Taxas Reembolso:</strong></p>
                        <h1>R$999</h1>
                    </div>      
                    <div class="t">
                        <p><strong>Número de Taxas:</strong></p>
                        <h1>20</h1>
                    </div>
                </div>

                <div class="tx">Taxas:</div>

                <div class = "container1">
                    <div class="t1">
                        <p><strong>Tipo:</strong></p>
                    </div>
                    <div class="t1">
                        <p><strong>Aplicação:</strong></p>
                    </div>
                    <div class="t1">
                        <p><strong>Percentual:</strong></p>
                    </div>      
                    <div class="t1">
                        <p><strong>Valor:</strong></p>
                    </div>
                    <div class="t1">
                        <p><strong>C. Receitas:</strong></p>
                    </div>
                    <div class="t1">
                        <p><strong>Status:</strong></p>
                    </div>
                </div>

                <div class="line"></div>

                <div class="tx1">
                    <div class="taxas1">
                        <p><strong>Tarifa de ...</strong></p>
                    </div>
                    <div class="taxas1">
                        <p><strong>Transações</strong></p>
                    </div>
                    <div class="taxas1">
                        <p><strong>3%</strong></p>
                    </div>
                    <div class="taxas1">
                        <p><strong>R$999</strong></p>
                    </div>
                    <div class="taxas1">
                        <p><strong>Receita de Taxas</strong></p>
                    </div>
                    <div class="taxas1">
                        <p><strong>Ativada</strong></p>
                    </div>
                </div>

                <div class="line"></div>

                <div class="tx2">
                    <div class="taxas2">
                        <p><strong>Tarifa de ...</strong></p>
                    </div>
                    <div class="taxas2">
                        <p><strong>Pagamentos</strong></p>
                    </div>
                    <div class="taxas2">
                        <p><strong>Fixo</strong></p>
                    </div>
                    <div class="taxas2">
                        <p><strong>R$999</strong></p>
                    </div>
                    <div class="taxas2">
                        <p><strong>Receita de Taxas</strong></p>
                    </div>
                    <div class="taxas2">
                        <p><strong>Desativada</strong></p>
                    </div>
                </div>

                <div class="line"></div>

                <div class="tx3">
                    <div class="taxas3">
                        <p><strong>Tarifa de ...</strong></p>
                    </div>
                    <div class="taxas3">
                        <p><strong>Transferência</strong></p>
                    </div>
                    <div class="taxas3">
                        <p><strong>2,5%</strong></p>
                    </div>
                    <div class="taxas3">
                        <p><strong>R$999</strong></p>
                    </div>
                    <div class="taxas3">
                        <p><strong>Receita de Taxas</strong></p>
                    </div>
                    <div class="taxas3">
                        <p><strong>Ativada</strong></p>
                    </div>
                </div>

                <div class="line"></div>

                <div class="tx4">
                    <div class="taxas4">
                        <p><strong>Tarifa de ...</strong></p>
                    </div>
                    <div class="taxas4">
                        <p><strong>Retiradas</strong></p>
                    </div>
                    <div class="taxas4">
                        <p><strong>5%</strong></p>
                    </div>
                    <div class="taxas4">
                        <p><strong>R$999</strong></p>
                    </div>
                    <div class="taxas4">
                        <p><strong>Receita de Taxas</strong></p>
                    </div>
                    <div class="taxas4">
                        <p><strong>Ativada</strong></p>
                    </div>
                </div>

                <div class="line"></div>

                <div class="tx5">
                    <div class="taxas5">
                        <p><strong>Tarifa de ...</strong></p>
                    </div>
                    <div class="taxas5">
                        <p><strong>Transações</strong></p>
                    </div>
                    <div class="taxas5">
                        <p><strong>Fixo</strong></p>
                    </div>
                    <div class="taxas5">
                        <p><strong>R$999</strong></p>
                    </div>
                    <div class="taxas5">
                        <p><strong>Receita de Taxas</strong></p>
                    </div>
                    <div class="taxas5">
                        <p><strong>Ativada</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
</script>

<style scoped>
.layout {
    display: flex;
    height: 100vh;
}

.sidebar {
    width: 250px;
    background-color: #412884;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f6f6f6;
}

h2 {
    font-size: 40px;
    color: #12283F;
    text-align: center;
    margin-bottom: 20px;
}

.border-container {
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #412884;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
}

.container {
    display: flex;
    gap: 5rem;
    margin: 5rem auto 0 auto;
    justify-content: center;
    flex-wrap: wrap;
}

.t {
    border-radius: 10px;
    border: 2px solid #412884;
    width: 315px;
    height: 111px;
    flex-shrink: 0;
    font-size: 20px;
}

h1 {
    font-family: 'TL';
    margin-left: 15px;
    font-size: 32px;
}

.tx {
    margin-left: 46px;
    margin-top: 29px;
    font-size: 40px;
}

.container1 {
    display: flex;
    margin-left: 127px;
    margin-top: 19px;
    gap: 130px;
    font-size: 20px;
    justify-content: left;
}

.line {
    border-bottom: 1px solid #000000;
    width: 80%;
    height: 1px;
    background-color: #ccc;
    margin-left: 5%;
}

.tx1, .tx2, .tx3, .tx4, .tx5 {
    display: flex;
    margin-left: 127px;
    margin-top: 19px;
    gap: 120px;
    font-size: 20px;
    justify-content: left;
}

.border-container {
    margin: 0 auto; /* Centraliza o container horizontalmente */
    margin-top: 0; /* Remove qualquer margem superior */
    padding-top: 20px; /* Adiciona um pequeno espaçamento interno, se necessário */
    border-radius: 10px;
    border: 2px solid #412884;
    box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25);
    width: 1596px;
    height: 800px;
    flex-shrink: 0;
}

#iconeDuby {
    margin: 20px;
    cursor: pointer;
}

#sidebar {
    width: 250px;
    box-sizing: border-box;
}

.sidebar {  
    background-color: #412884;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-size: 24px;
    width: 250px;
    height: 100vh;
    justify-content: space-between;
}

.parteSidebar {
    display: flex;
    flex-direction: column;
}

.parteSidebar > a {
    gap: 10px;
    box-sizing: border-box;
    height: 70px;
    display: flex;
    align-items: center;
    padding-left: 25px;
    text-decoration: none;
    color: #f6f6f6;
}

.parteSidebar a:hover {
    background-color: #262756;
}

.iconeSidebar {
    width: 24px;
    height: auto;
    margin: 0;
    object-fit: cover;
}
</style>