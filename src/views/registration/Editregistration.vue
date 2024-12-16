<template>
  <div>
    <h4 class="mb-4">Edit Registration</h4>

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <div class="shadow-sm rounded bg-white p-4">
      <form @submit.prevent="updateRegistration">
        <div class="mb-3">
          <label for="studentId" class="form-label fw-bold">Student</label>
          <select
            v-model="registration.studentId"
            class="form-select"
            :class="{ 'is-invalid': errors.studentId }"
            required
          >
            <option
              v-for="student in students"
              :key="student.id"
              :value="student.id"
            >
              {{ student.fullName }}
            </option>
          </select>
          <div v-if="errors.studentId" class="invalid-feedback">
            {{ errors.studentId }}
          </div>
        </div>

        <div class="mb-3">
          <label for="moduleId" class="form-label fw-bold">Module</label>
          <select
            v-model="registration.moduleId"
            class="form-select"
            :class="{ 'is-invalid': errors.moduleId }"
            required
          >
            <option
              v-for="module in modules"
              :key="module.id"
              :value="module.id"
            >
              {{ module.name }}
            </option>
          </select>
          <div v-if="errors.moduleId" class="invalid-feedback">
            {{ errors.moduleId }}
          </div>
        </div>

        <div class="mb-3">
          <label for="startDate" class="form-label fw-bold">Start Date</label>
          <input
            type="date"
            id="startDate"
            v-model="registration.startDate"
            class="form-control"
            :class="{ 'is-invalid': errors.startDate }"
            required
          />
          <div v-if="errors.startDate" class="invalid-feedback">
            {{ errors.startDate }}
          </div>
        </div>

        <div class="mb-3">
          <label for="endDate" class="form-label fw-bold">End Date</label>
          <input
            type="date"
            id="endDate"
            v-model="registration.endDate"
            class="form-control"
            :class="{ 'is-invalid': errors.endDate }"
            required
          />
          <div v-if="errors.endDate" class="invalid-feedback">
            {{ errors.endDate }}
          </div>
        </div>

        <div class="mb-3">
          <label for="amount" class="form-label fw-bold">Amount</label>
          <input
            type="number"
            id="amount"
            v-model="registration.amount"
            class="form-control"
            :class="{ 'is-invalid': errors.amount }"
            required
          />
          <div v-if="errors.amount" class="invalid-feedback">
            {{ errors.amount }}
          </div>
        </div>

        <div class="mb-3">
          <label for="remainingAmount" class="form-label fw-bold"
            >Remaining Amount</label
          >
          <input
            type="number"
            id="remainingAmount"
            v-model="registration.remainingAmount"
            class="form-control"
            :class="{ 'is-invalid': errors.remainingAmount }"
            required
          />
          <div v-if="errors.remainingAmount" class="invalid-feedback">
            {{ errors.remainingAmount }}
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
import useRegistrationStore from "../../store/registrationStore.js";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const {
  loadRegistrations,
  loadStudents,
  loadModules,
  updateRegistration: storeUpdateRegistration,
  registrations,
  students,
  modules,
} = useRegistrationStore();

const registration = ref({
  studentId: "",
  moduleId: "",
  startDate: "",
  endDate: "",
  amount: "",
  remainingAmount: "",
});

const errors = reactive({});
const isLoading = ref(false);
const errorMessage = ref("");
const registrationId = Number(route.params.id);

onMounted(async () => {
  try {
    await Promise.all([loadStudents(), loadModules(), loadRegistrations()]);

    const fetchedRegistration = registrations.value.find(
      (r) => r.id === registrationId
    );

    if (fetchedRegistration) {
      registration.value = {
        ...fetchedRegistration,
        startDate: formatDate(fetchedRegistration.startDate),
        endDate: formatDate(fetchedRegistration.endDate),
      };
    } else {
      toast.error("Registration not found!");
      navigateBack();
    }
  } catch (error) {
    errorMessage.value = "Error loading registration data.";
  }
});

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

const updateRegistration = async () => {
  try {
    isLoading.value = true;
    resetErrors();

    await storeUpdateRegistration(registrationId, registration.value);
    toast.success("Registration updated successfully!");
    navigateBack();
  } catch (error) {
    toast.error("Failed to update registration.");
    if (error.response?.data?.errors) {
      Object.assign(errors, error.response.data.errors);
    }
  } finally {
    isLoading.value = false;
  }
};

const resetErrors = () => {
  Object.keys(errors).forEach((key) => (errors[key] = ""));
};

const navigateBack = () => {
  router.push({ name: "listRegistration" });
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
  