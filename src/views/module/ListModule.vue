<template>
    <div>
    
      <h4 class="mb-4">Module List</h4>
      <div class="text-end mb-4">
        <button class="btn btn-primary btn-sm fw-bold" @click="navigate('addModule')">
          <i class="fa fa-plus me-1"></i> Add Module
        </button>
      </div>
  
     
      <div class="table-responsive shadow-sm rounded bg-white p-3 mt-3">
        <table class="table table-hover table-borderless align-middle text-center">
          <thead class="table-light small-header">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Duration (hours)</th>
              <th>Price</th>
              <th>Actions</th>
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
                <button class="btn btn-sm btn-info me-2" @click="openDetailsModal(module)">
                  <i class="fa fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning me-2" @click="editModule(module)">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" @click="confirmDeleteModule(module.id)">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
    
      <div v-if="isDetailsModalVisible" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Module Details</h5>
          </div>
          <div class="modal-body">
            <p><strong>Name:</strong> {{ selectedModule.name }}</p>
            <p><strong>Duration:</strong> {{ selectedModule.duration }} hours</p>
            <p><strong>Price:</strong> {{ selectedModule.price }} €</p>
            <p><strong>Description:</strong> {{ selectedModule.description || 'No description available' }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeDetailsModal">Close</button>
          </div>
        </div>
      </div>
  
    
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
  import { useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  import useModuleStore from "@/store/moduleStore";
  

  const toast = useToast();
  const router = useRouter();
  const store = useModuleStore();
  const { modules, loadModules, deleteModule: storeDeleteModule } = store;
  

  const showDeleteModal = ref(false);
  const moduleToDelete = ref(null);
  const isDetailsModalVisible = ref(false);
  const selectedModule = ref(null);
  
  
  onMounted(async () => {
    try {
      store.init();
      await loadModules();
    } catch (error) {
      toast.error("Error while loading modules.");
    }
  });

  const navigate = (routeName) => {
    router.push({ name: routeName });
  };
  

  const openDetailsModal = (module) => {
    selectedModule.value = module;
    isDetailsModalVisible.value = true;
  };
  
 
  const closeDetailsModal = () => {
    isDetailsModalVisible.value = false;
  };
  

  const confirmDeleteModule = (id) => {
    moduleToDelete.value = id;
    showDeleteModal.value = true;
  };
  
 
  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    moduleToDelete.value = null;
  };
  
 
  const deleteModule = async () => {
    try {
      await storeDeleteModule(moduleToDelete.value);
      toast.success("Module deleted successfully!");
      await loadModules();
    } catch (error) {
      toast.error("Error while deleting module.");
    } finally {
      closeDeleteModal();
    }
  };
  

  const editModule = (module) => {
    router.push({ name: "editModule", params: { id: module.id } });
  };
  </script>
  
  <style scoped>
  .table th,
  .table td {
    vertical-align: middle;
    text-align: center;
    white-space: nowrap;
    min-inline-size: 100px;
  }
  
  @media (max-inline-size: 768px) {
    .responsive-hide {
      display: none;
    }
  }
  
  .modal-overlay {
    position: fixed;
    inset-block-start: 0;
    inset-inline-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
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
    max-inline-size: 500px; 
    inline-size: 100%;
  }
  
  .modal-header {
    font-weight: bold;
    margin-block-end: 15px;
  }
  
  .modal-body p {
    text-align: start;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }
  
  .modal-footer .btn {
    margin-inline-start: 10px;
  }
  
  .modal-buttons .btn {
    margin: 0 10px;
  }
  </style>
  