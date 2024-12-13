<template>
    <div class="d-flex">
        <!-- Sidebar -->
        <aside class="sidebar bg-primary p-3 text-white">
            <!-- Profil utilisateur -->

            <ul class="nav flex-column text-small">
                <!-- Lien Student -->
                <li class="nav-item mb-3">
                    <button class="btn btn-outline-light w-100 text-start" :class="isActive('listStudent')"
                        @click="navigate('listStudent')">
                        <i class="fas fa-user-graduate fa-lg me-2"></i> Student
                    </button>
                </li>

                <!-- Lien Module -->
                <li class="nav-item mb-3">
                    <button class="btn btn-outline-light w-100 text-start" :class="isActive('listModule')"
                        @click="navigate('listModule')">
                        <i class="fas fa-chalkboard-teacher fa-lg me-2"></i> Module
                    </button>
                </li>

                <!-- Lien Registrement Payment -->
                <li class="nav-item mb-3">
                    <button class="btn btn-outline-light w-100 text-start" :class="isActive('listPayment')"
                        @click="navigate('listPayment')">
                        <i class="fas fa-wallet fa-lg me-2"></i> Registrement
                    </button>
                </li>
            </ul>
        </aside>

        <!-- Main Content -->
        <main class="main-content flex-grow-1 p-4">
            <header class="d-flex justify-content-end align-items-center mb-4">
            </header>

            <div class="row mb-4">
                <!-- Exemple de widgets pour le tableau de bord -->
            </div>

            <!-- Le contenu principal change en fonction de la route -->
            <router-view />
        </main>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { onMounted } from "vue";

const router = useRouter();
const route = useRoute();

// Fonction de navigation vers la route
const navigate = (routeName) => {
    router.push({ name: routeName });
};

onMounted(async () => {
});

// Fonction pour vérifier si la route est active
const isActive = (routeName) => {
    return route.name === routeName ? "active" : "";
};

</script>

<style scoped>
/* Styles de la mise en page */
.d-flex {
    display: flex;
}

.sidebar {
    width: 250px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: 0.85rem;
}

.sidebar-header {
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.main-content {
    background-color: #f8f9fc;
    min-height: 100vh;
}

.btn-outline-light {
    font-size: 0.85rem;
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
}

.btn-outline-light:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.active {
    background-color: rgba(255, 255, 255, 0.2) !important;
    color: #ffffff !important;
}

.btn-primary {
    background-color: transparent;
    border: 2px solid #dc3545;
    color: #dc3545;
}

.btn-primary:hover {
    background-color: rgba(220, 53, 69, 0.1);
    border-color: #c82333;
    color: #c82333;
}

.btn-sm {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
}
</style>
