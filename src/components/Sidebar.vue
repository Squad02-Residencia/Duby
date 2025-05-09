<template>
    <div :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
        <div class="opções">
            <div>
                <img id="logoDuby" v-if= !isCollapsed src="@/assets/imagens/Murilo_Logo_tipografia_Branco.svg" alt="">
                <img id="logoDubyPequena" v-else-if = isCollapsed src="@/assets/imagens/LogoBranco.svg" alt="">
            </div>
            <div class="escolhas">
                <router-link to="/dashboard" :class="['icon', {'icon-retraido': isCollapsed}]">
                    <i class="bx bx-home"></i>
                    <span v-show= !isCollapsed>Dashboard</span>
                </router-link>

                <div :class="['icon', {'icon-retraido': isCollapsed}]">
                    <i class="bx bx-wallet"></i>
                    <span v-show= !isCollapsed>Financeiro</span>
                </div>

                <div :class="['icon', {'icon-retraido': isCollapsed}]">
                    <i class="bx bxs-bank"></i>
                    <span v-show= !isCollapsed>Banco</span>
                </div>

                <div :class="['icon', {'icon-retraido': isCollapsed}]">
                    <i class="bx bx-credit-card"></i>
                    <span v-show= !isCollapsed>Adquirente</span>
                </div>

                <div :class="['icon', {'icon-retraido': isCollapsed}]">
                    <i class="bx bx-user"></i>
                    <span v-show= !isCollapsed>Usuário</span>
                </div>

                <div :class="['icon', {'icon-retraido': isCollapsed}]">
                    <i class="bx bx-cog"></i>
                    <span v-show= !isCollapsed>Configurações</span>

                </div>

                <router-link to="/submit" :class="['icon', {'icon-retraido': isCollapsed}]">
                    <i class="bx bx-import"></i>
                    <span v-show="!isCollapsed">Importar</span>
                </router-link>

            </div>
            
        </div>
        <button @click="toggleSidebar" class="menu-btn">
                <div id="botãoSidebar">
                    <i v-if= !isCollapsed class='bx bx-chevron-left'></i>
                    <i v-else-if= isCollapsed class='bx bx-chevron-right'></i>
                </div>
            </button>
        
    </div>
</template>

<style>

* {
    font-family: sans-serif;
}

.sidebar {
    background-color: #412884;
    color: #fff;
    width: 250px;
    min-width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: width 0.3s, min-width 0.3s;
    box-sizing: border-box;
}

.sidebar-collapsed {
    width: 80px;
    min-width: 80px;
}

.opções {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
}

.icon {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 24px;
    color: white;
    text-decoration: none;
    display: flex;
    padding-left: 25px;
    gap: 10px;
    align-items: center;
}

.icon-retraido {
    width: 100%;
    padding: 0;
    justify-content: center;
}

.escolhas{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.escolhas :hover {
    
    background-color: #262756;
}

.menu-btn {
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: center;
}


#logoDuby {
    width: 200px;
    height: auto;
    align-self: center;
    margin-bottom: 20px;
}

#logoDubyPequena {
    width: 50px;
    height: 56px;
    align-self: center;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .sidebar, .sidebar-collapsed {
        width: 100vw;
        height: 60px;
        justify-content: center;
    }

    #logoDuby, 
    span,
    .menu-btn,
    #logoDubyPequena{
        display: none;
    }

    .icon {
        padding: 0;
        width: 100px;
        height: 60px;
        justify-content: center;
        align-items: center;
    }

    .escolhas {
        height: 100%;
        gap: 0;
        flex-direction: row;
    }
    
    .opções {
        margin:0; 
    }
}
</style>

<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value;
}
</script>
