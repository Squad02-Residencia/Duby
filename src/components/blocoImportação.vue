// filepath: c:\Users\Anderson\Desktop\UNIT Web Front End\Duby-1\src\components\blocoImportação.vue
<template>
    <div class="blocoImportação" @click="triggerFileInput" @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop">
        <h3 class="legenda">{{ legenda }}</h3>
        <img id="import-icon" src="../assets/imagens/import-icon.svg">
        <input type="file" id="fileinput" hidden @change="onFileChange">
        <p><font size="20px">Arraste e Solte</font></p>
        <p id="choose-box" @click="triggerFileInput"><font size="5px">ou escolha um arquivo</font></p>
        <span>utilize arquivos do tipo .csv</span>
        <p class="upload-feedback">{{ feedback }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Define a prop chamada 'legenda'
defineProps({
    legenda: {
        type: String,
        required: true
    }
});

const feedback = ref('');

function triggerFileInput(event) {
    event.currentTarget.querySelector('input[type="file"]').click();
}

function onDragOver(event) {
    event.currentTarget.classList.add('dragover');
}

function onDragLeave(event) {
    event.currentTarget.classList.remove('dragover');
}

function onDrop(event) {
    event.currentTarget.classList.remove('dragover');
    handleFiles(event.dataTransfer.files);
}

function onFileChange(event) {
    handleFiles(event.target.files);
}

function handleFiles(files) {
    for (const file of files) {
        console.log('Arquivo recebido', file.name);
        feedback.value = `Arquivo recebido: ${file.name}`;
    }
}


</script>

<style scoped>

.legenda {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #12283F;
}

.blocoImportação{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 37vw;
    height: 69vh;
    border: 3px solid #402C82;
    border-radius: 10px;
}

.blocoImportação.dragover{
    background-color: #73BA60;
    border-color: #12283F;
    opacity: 85%;
}

.icon-upload{
    width: 15vw;
    height: 15vh;
    z-index: -1;
}

#inside-box-text{
    color: #12283F;
}

#import-icon{
    width: 10vw;
    height: 15vh;
}

#choose-box{
    border-style: solid;
    border-color: #402C82;
    padding: 10px;
    border-radius: 10px;
    margin-top: px;
    cursor: pointer;
}

#choose-box:hover{
    background-color: #402C82;
    transition: 0.4s;
    color: white;
}

span{
    margin-top: 10px;
}

.upload-feedback {
    margin-top: 15px;
    color: green;
    font-weight: bold;
}

</style>