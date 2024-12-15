<template>
    <div>
        <!-- Title -->
        <h4 class="mb-4">Module List</h4>

        <!-- Add Module Button -->
        <div class="text-end mb-4">
            <button class="btn btn-primary btn-sm fw-bold" @click="navigate('addModule')">
                <i class="fa fa-plus me-1"></i> Add Module
            </button>
        </div>

        <!-- Module Table -->
        <div class="table-responsive shadow-sm rounded bg-white p-3 mt-3">
            <table class="table table-hover table-borderless align-middle text-center">
                <thead class="table-light small-header">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Duration (hours)</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="modules.length === 0">
                        <td colspan="5" class="text-danger fw-bold">No modules found</td>
                    </tr>
                    <tr v-for="(module, index) in modules" :key="module.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ module.name }}</td>
                        <td>{{ module.duration }}</td>
                        <td>{{ module.price }}</td>
                        <td>
                            <button class="btn btn-sm btn-info me-2" @click="viewModule(module)">
                                <i class="fa fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-warning me-2" @click="editModule(module)">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger me-2" @click="confirmDeleteModule(module.id)">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Confirmation Modal -->
        <div v-if="showDeleteModal" class="modal-overlay">
            <div class="modal-content">
                <h5>Confirmation</h5>
                <p>Are you sure you want to delete this module?</p>
                <div class="modal-buttons">
                    <button class="btn btn-secondary" @click="closeDeleteModal">Cancel</button>
                    <button class="btn btn-danger" @click="deleteModule">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import useModuleStore from "@/store/moduleStore";

const toast = useToast();
const router = useRouter();
const store = useModuleStore();
const { modules, loadModules, deleteModule: storeDeleteModule } = store;

const showDeleteModal = ref(false);
const moduleToDelete = ref(null);

// Load modules on component mount
onMounted(async () => {
    try {
        // Initialize store to load data from localStorage or backend
        store.init();
        await loadModules()
    } catch (error) {
        toast.error("Error while loading modules.");
    }
});

// Navigation
const navigate = (routeName) => {
    router.push({ name: routeName });
};

// Open modal to edit module
const editModule = (module) => {
    router.push({ name: "editModule", params: { id: module.id } });
};

// View module details
const viewModule = (module) => {
    router.push({ name: "viewModule", params: { id: module.id } });
};

// Confirm delete module
const confirmDeleteModule = (id) => {
    moduleToDelete.value = id;
    showDeleteModal.value = true;
};

// Close delete modal
const closeDeleteModal = () => {
    showDeleteModal.value = false;
    moduleToDelete.value = null;
};

// Delete module
const deleteModule = async () => {
    try {
        await storeDeleteModule(moduleToDelete.value);
        toast.success("Module deleted successfully!");
        store.loadModules(); // Reload modules from backend/localStorage
    } catch (error) {
        toast.error("Error while deleting module.");
    } finally {
        closeDeleteModal();
    }
};
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
    text-align: center;
    white-space: nowrap;
    min-width: 100px;
}

@media (max-width: 768px) {
    .responsive-hide {
        display: none;
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    width: 100%;
}

.modal-buttons .btn {
    margin: 0 10px;
}
</style>
