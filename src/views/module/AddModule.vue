<template>
    <div class="container mt-1">
        <div class="col-md-8 mx-auto">
            <h1 class="h4 text-primary mb-4 text-center">Add New Module</h1>

            <!-- Affichage des erreurs globales -->
            <div v-if="globalError" class="alert alert-danger">
                <p>{{ globalError }}</p>
            </div>

            <form @submit.prevent="submitForm">
                <!-- Module Name -->
                <div class="mb-3">
                    <label for="moduleName" class="form-label">Module Name</label>
                    <input 
                        type="text" 
                        id="moduleName" 
                        v-model="form.name" 
                        class="form-control"
                        :class="{ 'is-invalid': errors.name }" 
                        required 
                        placeholder="Enter module name" 
                    />
                    <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
                </div>

                <!-- Duration -->
                <div class="mb-3">
                    <label for="moduleDuration" class="form-label">Duration (hours)</label>
                    <input 
                        type="number" 
                        id="moduleDuration" 
                        v-model="form.duration" 
                        class="form-control"
                        :class="{ 'is-invalid': errors.duration }" 
                        required 
                        min="1" 
                        placeholder="Enter module duration" 
                    />
                    <div v-if="errors.duration" class="invalid-feedback">{{ errors.duration }}</div>
                </div>

                <!-- Price -->
                <div class="mb-3">
                    <label for="modulePrice" class="form-label">Price</label>
                    <input 
                        type="number" 
                        id="modulePrice" 
                        v-model="form.price" 
                        class="form-control"
                        :class="{ 'is-invalid': errors.price }" 
                        required 
                        min="0" 
                        step="0.01" 
                        placeholder="Enter module price" 
                    />
                    <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
                </div>

                <!-- Boutons -->
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary" :disabled="isLoading">
                        <span v-if="isLoading">Adding...</span>
                        <span v-else>Save Module</span>
                    </button>
                    <button type="button" class="btn btn-secondary ms-3" @click="cancel">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import useModuleStore from "@/store/moduleStore";

// Dépendances
const router = useRouter();
const toast = useToast();

// Store
const { createModule } = useModuleStore(); // Extraire seulement la méthode createModule

// État local pour le formulaire
const form = reactive({
    name: "",
    duration: null,
    price: null,
});

// Gestion des erreurs
const errors = reactive({
    name: "",
    duration: "",
    price: "",
});
const globalError = ref(null);
const isLoading = ref(false);

// Annuler et retourner à la liste
const cancel = () => router.push({ name: "listModule" });

// Soumission du formulaire
const submitForm = async () => {
    isLoading.value = true;
    globalError.value = null;
    Object.keys(errors).forEach((key) => (errors[key] = "")); // Réinitialiser les erreurs

    try {
        // Appeler l'action du store
        await createModule({ ...form });

        toast.success("Module added successfully!");
        router.push({ name: "listModule" });
    } catch (error) {
        toast.error("Error while adding module.");
        // Gestion des erreurs du backend
        if (error.response && error.response.data) {
            if (error.response.data.errors) {
                Object.assign(errors, error.response.data.errors); // Assigner les erreurs par champ
            } else if (error.response.data.message) {
                globalError.value = error.response.data.message; // Afficher une erreur globale
            }
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.container {
    max-width: 700px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

button {
    min-width: 120px;
}

.is-invalid {
    border-color: #dc3545;
}

.invalid-feedback {
    color: #dc3545;
    font-size: 0.875em;
}
</style>
