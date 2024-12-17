<template>
  <div>
    <h4 class="mb-4">List of Registrations</h4>
    <div class="text-end mb-4">
      <button
        class="btn btn-primary btn-sm"
        @click="navigate('AddRegistration')"
      >
        <i class="fa fa-plus me-1"></i> Add Registration
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white p-3 mt-3">
      <table
        class="table table-hover table-borderless align-middle text-center"
      >
        <thead class="table-light small-header">
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Module Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Remaining Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="registrations.length === 0">
            <td colspan="7" class="text-danger fw-bold">
              No registrations found
            </td>
          </tr>
          <tr
            v-for="(registration, index) in registrations"
            :key="registration.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ getStudentName(registration.studentId) }}</td>
            <td>{{ getModuleName(registration.moduleId) }}</td>
            <td>{{ formatDate(registration.startDate) }}</td>
            <td>{{ formatDate(registration.endDate) }}</td>
            <td>{{ registration.amount }} €</td>
            <td>{{ registration.remainingAmount }} €</td>

            <td>
              <button
                class="btn btn-sm btn-info me-2"
                @click="viewRegistration(registration)"
              >
                <i class="fa fa-eye"></i>
              </button>
              <button
                class="btn btn-sm btn-warning me-2"
                @click="editRegistration(registration)"
              >
                <i class="fa fa-edit"></i>
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="confirmDeleteRegistration(registration.id)"
              >
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
          <button class="btn btn-danger" @click="deleteRegistration">
            Delete
          </button>
        </div>
      </div>
    </div>

    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="font-wb-md mt-3">Registration Details</h5>
        </div>
        <div class="tx modal-body">
          <p><strong>Student Name:</strong> {{ getStudentName(selectedRegistration.studentId) }}</p>
          <p><strong>Module Name:</strong> {{ getModuleName(selectedRegistration.moduleId) }}</p>
          <p><strong>Start Date:</strong> {{ formatDate(selectedRegistration.startDate) }}</p>
          <p><strong>End Date:</strong> {{ formatDate(selectedRegistration.endDate) }}</p>
          <p><strong>Total Amount:</strong> {{ selectedRegistration.amount }} €</p>
          <p><strong>Remaining Amount:</strong> {{ selectedRegistration.remainingAmount }} €</p>
        </div>
        <button class="btn btn-danger text-white font-wb" @click="closeModalDetails">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import useRegistrationStore from "../../store/registrationStore.js";

const router = useRouter();
const toast = useToast();

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


const isModalVisible = ref(false);
const selectedRegistration = ref(null);

onMounted(async () => {
  try {
    await Promise.all([loadRegistrations(), loadStudents(), loadModules()]);
  } catch (error) {
    toast.error("Error while loading data.");
  }
});

const formatDate = (date) => new Date(date).toLocaleDateString();

const navigate = (routeName) => {
  router.push({ name: routeName });
};

const confirmDeleteRegistration = (id) => {
  registrationToDelete.value = id;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  registrationToDelete.value = null;
};

const editRegistration = (registration) => {
  router.push({ name: "Editregistration", params: { id: registration.id } });
};

const deleteRegistration = async () => {
  // const isConfirmed = window.confirm(
  //   "Are you sure you want to delete this registration?"
  // );

  // if (isConfirmed) {
    try {
      await storeDeleteRegistration(registrationToDelete.value);
      toast.success("Registration deleted successfully!");
    } catch (error) {
      toast.error("Error while deleting the registration.");
    } finally {
      closeModal();
    }
  // } else {
  //   toast.info("Registration deletion canceled.");
  // }
};


const viewRegistration = (registration) => {
  selectedRegistration.value = registration;
  isModalVisible.value = true;
};


const closeModalDetails = () => {
  isModalVisible.value = false;
};
onMounted(async () => {
  try {
    
    await Promise.all([loadRegistrations(), loadStudents(), loadModules()]);

    
    students.value = studentsData;  
    modules.value = modulesData;  

    console.log("Loaded students:", students.value);
    console.log("Loaded modules:", modules.value);
  } catch (error) {
    // toast.error("Error while loading data.");
  }
});

const getStudentName = (studentId) => {
  const student = students.value.find((s) => s.id === studentId);
  return student ? student.fullName : "N/A";  
};

const getModuleName = (moduleId) => {
  const module = modules.value.find((m) => m.id === moduleId);
  return module ? module.name : "N/A";  
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
  text-align: center;
  white-space: nowrap;
}

.tx {
  text-align: start;
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  inline-size: 80%; 
  max-inline-size: 500px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
}

.modal-header {
  font-size: 1.25rem;
  font-weight: bold;
  margin-block-end: 1rem;
}

.modal-body p {
  margin-block-end: 1rem;
  text-align: start;
}

.modal-buttons button {
  margin: 0 0.5rem;
}
</style>
