<template>
    <div class="submit">
        <Sidebar />
        <div class="content">
            <h2>
                Importação de Dados
                <button @click="enviarDados" class="botãoEnviar">Enviar</button>
            </h2>
            <div v-if="isLoading" id="loader"><p id="loadLegenda">Carregando Dados</p></div>
            <div v-else class="blocos">
                <BlocoImportacao legenda="Extrato Bancário" />
                <BlocoImportacao legenda="Relatório do Adquirente" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import BlocoImportacao from '../components/blocoImportação.vue';

const isLoading = ref(false);
const router = useRouter();

function enviarDados() {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        router.push('/dashboard');
    }, 3500);
}
</script>

<style scoped>
* {
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
        padding: 10px;
        gap: 20px;
        justify-items: center ;
    }
}

@media (max-width: 768px) {
    #choose-box {
        padding: 8px;
        font-size: 14px; 
    }
}

@media (max-width: 768px) {
    .blocos {
        flex-direction: column;
        gap: 20px;
        justify-content: center;

        align-items: center;
    }

    .blocoImportação {
        width: 90%;
        height: auto;
        padding: 10px;
    }

    #import-icon {
        max-width: 70%;
      }
}

@media (max-width: 768px) {
    .botãoEnviar {
        padding: 10px;
        font-size: 18px;
        align-items: center;
    }
}

@media (max-width: 768px) {
    h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        justify-content: center;
        text-align: center;}
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #F6F6F6;
}

.submit{
    display: flex;
    background-color: #F6F6F6;
}

.content {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 50px;
    gap: 50px;
}

#loader {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    background-color: #F6F6F6;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.5s;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
#loader::after {
    content: "";
    width: 120px;
    height: 120px;
    border: 24px solid #f3f3f3;
    border-radius: 50%;
    border-top: 24px solid #402C82;
    animation: spin 1.5s linear infinite;
}   

#loadLegenda {
    position: absolute;
    display: flex;
    margin-top: 25vh;
    justify-content: center;
    align-items: center;
    font-family: 'dubyfont-bold';
    font-size: 30px;
    color: #402C82;
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
    gap: 20px;
}

@media (max-width: 768px) {
    .blocos {
        flex-direction: column;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>

