<template>
    <div>
        <!-- Title -->
        <h4 class="mb-4">Module Details</h4>

        <!-- Module Details -->
        <div class="details-container shadow-sm rounded bg-white p-4">
            <div v-if="module">
                <div class="mb-3">
                    <strong>Name:</strong>
                    <span>{{ module.name }}</span>
                </div>
                <div class="mb-3">
                    <strong>Duration:</strong>
                    <span>{{ module.duration }} hours</span>
                </div>
                <div class="mb-3">
                    <strong>Price:</strong>
                    <span>${{ module.price.toFixed(2) }}</span>
                </div>
            </div>
            <div v-else>
                <p class="text-danger">Module not found.</p>
            </div>

            <!-- Back Button -->
            <div class="text-end">
                <button class="btn btn-secondary" @click="goBack">Back to List</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import useModuleStore from "@/store/moduleStore";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const { getModuleById } = useModuleStore();

const module = ref(null);
const moduleId = route.params.id;

// Load module details on component mount
onMounted(async () => {
    try {
        const fetchedModule = await getModuleById(moduleId);
        if (fetchedModule) {
            module.value = fetchedModule;
        } else {
            toast.error("Module not found.");
            router.push({ name: "moduleList" });
        }
    } catch (error) {
        toast.error("Error while loading module details.");
    }
});

// Navigate back to the module list
const goBack = () => {
    router.push({ name: "moduleList" });
};
</script>

<style scoped>
.details-container {
    max-width: 600px;
    margin: 0 auto;
}

strong {
    font-weight: bold;
}
</style>
