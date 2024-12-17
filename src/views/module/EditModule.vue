<template>
  <div>
    <h4 class="mb-4">Edit Module</h4>

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <div class="shadow-sm rounded bg-white p-4">
      <form @submit.prevent="updateModule">
        <div class="mb-3">
          <label for="name" class="form-label fw-bold">Module Name</label>
          <input
            type="text"
            id="name"
            v-model="module.name"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
            required
          />
          <div v-if="errors.name" class="invalid-feedback">
            {{ errors.name }}
          </div>
        </div>

        <div class="mb-3">
          <label for="duration" class="form-label fw-bold">Duration (days)</label>
          <input
            type="number"
            id="duration"
            v-model="module.duration"
            class="form-control"
            :class="{ 'is-invalid': errors.duration }"
            required
          />
          <div v-if="errors.duration" class="invalid-feedback">
            {{ errors.duration }}
          </div>
        </div>

        <div class="mb-3">
          <label for="price" class="form-label fw-bold">Price</label>
          <input
            type="number"
            id="price"
            v-model="module.price"
            class="form-control"
            :class="{ 'is-invalid': errors.price }"
            required
          />
          <div v-if="errors.price" class="invalid-feedback">
            {{ errors.price }}
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-secondary me-2"
            @click="navigateBack"
          >
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            <span v-if="isLoading">Saving...</span>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import useModuleStore from "../../store/moduleStore.js";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const {
  loadModules,
  updateModule: storeUpdateModule,
  modules,
} = useModuleStore();

const module = ref({
  name: "",
  duration: 0,
  price: 0,
});

const errors = reactive({ name: "", duration: "", price: "" });
const isLoading = ref(false);
const errorMessage = ref("");
const moduleId = Number(route.params.id);

onMounted(async () => {
  try {
    await loadModules();

    const fetchedModule = modules.value.find((m) => m.id === moduleId);

    if (fetchedModule) {
      module.value = { ...fetchedModule };
    } else {
      toast.error("Module not found!");
      navigateBack();
    }
  } catch (error) {
    errorMessage.value = "Error loading module data.";
  }
});

const validateForm = () => {
  let isValid = true;

 
  resetErrors();

  
  if (!module.value.name) {
    errors.name = "Module name is required.";
    isValid = false;
  }


  if (!module.value.duration || module.value.duration <= 0) {
    errors.duration = "Duration must be a positive number.";
    isValid = false;
  }


  if (!module.value.price || module.value.price <= 0) {
    errors.price = "Price must be a positive number.";
    isValid = false;
  }

  return isValid;
};

const updateModule = async () => {
  try {
    isLoading.value = true;
    resetErrors();

    
    if (!validateForm()) {
      return; 
    }

    await storeUpdateModule(moduleId, module.value);
    toast.success("Module updated successfully!");
    navigateBack();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        if (err.path === "name") {
          errors.name = err.msg;
        } else if (err.path === "duration") {
          errors.duration = err.msg;
        } else if (err.path === "price") {
          errors.price = err.msg;
        }
      });
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  } finally {
    isLoading.value = false;
  }
};

const resetErrors = () => {
  Object.keys(errors).forEach((key) => (errors[key] = ""));
};

const navigateBack = () => {
  router.push({ name: "listModule" });
};
</script>

<style scoped>
.form-label {
  font-weight: 600;
}

.shadow-sm {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
}
</style>
