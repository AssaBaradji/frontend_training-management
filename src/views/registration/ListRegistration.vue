<template>
  <div>
    <h4 class="mb-4">List of Registrations</h4>
    <div class="text-end mb-4">
      <button class="btn btn-primary btn-sm" @click="navigate('AddRegistration')">
        <i class="fa fa-plus me-1"></i> Add Registration
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white p-3 mt-3">
      <table class="table table-hover table-borderless align-middle text-center">
        <thead class="table-light small-header">
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Module Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="registrations.length === 0">
            <td colspan="7" class="text-danger fw-bold">No registrations found</td>
          </tr>
          <tr v-for="(registration, index) in registrations" :key="registration.id">
            <td>{{ index + 1 }}</td>
            <td>{{ getStudentName(registration.studentId) }}</td>
            <td>{{ getModuleName(registration.moduleId) }}</td>
            <td>{{ formatDate(registration.startDate) }}</td>
            <td>{{ formatDate(registration.endDate) }}</td>
            <td>{{ registration.amount }} €</td>
            <td>
              <button class="btn btn-sm btn-info me-2" @click="viewRegistration(registration)">
                <i class="fa fa-eye"></i>
              </button>
              <button class="btn btn-sm btn-warning me-2" @click="editRegistration(registration)">
                <i class="fa fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="confirmDeleteRegistration(registration.id)">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h5>Confirmation</h5>
        <p>Are you sure you want to delete this registration?</p>
        <div class="modal-buttons">
          <button class="btn btn-secondary" @click="closeModal">Cancel</button>
          <button class="btn btn-danger" @click="deleteRegistration">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import useRegistrationStore from "../../store/regsitrationStore.js";

const router = useRouter();
const toast = useToast();

// Load registrations, students, and modules
const {
  registrations,
  students,
  modules,
  loadRegistrations,
  loadStudents,
  loadModules,
  deleteRegistration: storeDeleteRegistration,
} = useRegistrationStore();

const showModal = ref(false);
const registrationToDelete = ref(null);

// Function to format a date
const formatDate = (date) => new Date(date).toLocaleDateString();

// Get the student's name by ID
const getStudentName = (studentId) => {
  const student = students.find((student) => student.id === studentId);
  return student ? student.name : "Unknown";
};

// Get the module's name by ID
const getModuleName = (moduleId) => {
  const module = modules.find((module) => module.id === moduleId);
  return module ? module.name : "Unknown";
};

// Load data on component mount
onMounted(async () => {
  try {
    await Promise.all([loadRegistrations(), loadStudents(), loadModules()]);
  } catch {
    toast.error("Error loading data.");
  }
});

// Navigation
const navigate = (routeName) => router.push({ name: routeName });
const viewRegistration = (registration) =>
  router.push({ name: "viewRegistration", params: { id: registration.id } });
const editRegistration = (registration) =>
  router.push({ name: "editRegistration", params: { id: registration.id } });

// Confirm delete registration
const confirmDeleteRegistration = (id) => {
  registrationToDelete.value = id;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  registrationToDelete.value = null;
};

// Delete registration
const deleteRegistration = async () => {
  try {
    await storeDeleteRegistration(registrationToDelete.value);
    toast.success("Registration deleted successfully!");
  } catch {
    toast.error("Error deleting registration.");
  } finally {
    closeModal();
  }
};
</script>

<style scoped>
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
  background: white;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-buttons button {
  margin: 0 0.5rem;
}
</style>
