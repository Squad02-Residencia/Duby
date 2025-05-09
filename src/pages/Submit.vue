<template>
    <div class="submit">
        <Sidebar/>
        <div class="content">
            <h2>Importação de Dados <router-link to="/dashboard" class="botãoEnviar">Enviar</router-link></h2>
            <div class="blocos">
                <BlocoImportacao legenda="Extrato Bancário" />
                <BlocoImportacao legenda="Relatório do Adquirente"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import BlocoImportacao from '../components/blocoImportação.vue';
</script>



<style scoped>
*{
    font-family: 'dubyfont';
    margin: 0;
    color: #12283F;
}

@font-face {
    font-family: 'dubyfont';
    src: url(../assets/fonts/TT\ Commons\ Regular.otf);
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'dubyfont-bold';
    src: url(../assets/fonts/TT\ Commons\ Bold.otf);
}

@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
}

@media (max-width: 768px) {
    .submit, #dragText, #legenda {
        padding: 20px;
        gap: 20px;
        justify-items: center ;
    }
}

@media (max-width: 768px) {
    #choose-box {
        padding: 8px;
        font-size: 14px; /* Ajusta o tamanho do texto */
    }
}

@media (max-width: 768px) {
    .blocos {
        flex-direction: column;
        gap: 20px;
        align-items: center;
    }

    .blocoImportação {
        width: 90%;
        height: auto;
        padding: 50px;
    }
}

body {
    display: flex;
    background-color: #F6F6F6;
}

.submit{
    display: flex;
}

.content {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 50px;
    gap: 50px;
}

h2{
    font-size: 40px;
    color: #12283F;
    font-family: 'dubyfont-bold';
    display: flex;
    justify-content: space-between;
}

.botãoEnviar{
    font-family: 'dubyfont';
    font-size: 25px;
    text-decoration: none;
    cursor: pointer;
    padding: 8px;
    border: solid;
    border-color: #402C82;
    border-radius: 10px;
    border-width: 2px;
    color: white;
    background-color: #73BA60;
    display: flex;
    justify-content: flex-end;
}

.botãoEnviar:hover{
    background-color: #402C82;
    transition: 0.2s;
}

.blocos{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px; /* Espaçamento entre as caixas */
}

@media (max-width: 768px) {
    .blocos {
        flex-direction: column; /* Alinha as caixas em coluna */
        align-items: center; /* Centraliza as caixas horizontalmente */
        gap: 20px; /* Espaçamento entre as caixas */
    }
}

</style>

