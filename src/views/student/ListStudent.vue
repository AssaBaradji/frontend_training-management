<template>
  <div>
    <!-- Add Student Button -->
    <h4 class="mb-4">Student List</h4>
    <div class="text-end mb-4">
      <button class="btn btn-primary btn-sm me-3 fw-bold" @click="navigate('AddStudent')">
        <i class="fa fa-plus me-1"></i> Add Student
      </button>
    </div>

    <!-- Student Table -->
    <div class="table-responsive shadow-sm rounded bg-white p-3 mt-3">
      <table class="table table-hover table-borderless align-middle text-center">
        <thead class="table-light small-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Tutor</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="students.length === 0">
            <td colspan="7" class="text-danger fw-bold">No students found</td>
          </tr>
          <tr v-for="(student, index) in students" :key="student.id">
            <td>{{ index + 1 }}</td>
            <td>{{ student.fullName }}</td>
            <td>{{ student.phoneNumber }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.address }}</td>
            <td>{{ student.tutor || "N/A" }}</td>
            <td>
              <button class="btn btn-sm btn-info me-2" @click="viewStudent(student)">
                <i class="fa fa-eye"></i>
              </button>
              <button class="btn btn-sm btn-warning me-2" @click="editStudent(student, index)">
                <i class="fa fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="confirmDeleteStudent(student.id)">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h5>Confirmation</h5>
        <p>Are you sure you want to delete this student?</p>
        <div class="modal-buttons">
          <button class="btn btn-secondary" @click="closeModal">Cancel</button>
          <button class="btn btn-danger" @click="deleteStudent">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import useStudentStore from "@/store/studentStore";

const router = useRouter();
const toast = useToast();
const { students, loadStudents, deleteStudent: storeDeleteStudent } = useStudentStore();

const showModal = ref(false);
const studentToDelete = ref(null);

// Load students on component mount
onMounted(async () => {
  try {
    await loadStudents();
  } catch (error) {
    toast.error("Error while loading students.");
  }
});

// Navigation
const navigate = (routeName) => {
  router.push({ name: routeName });
};

// View a student
const viewStudent = (student) => {
  router.push({ name: "viewStudent", params: { id: student.id } });
};

// Edit a student
const editStudent = (student) => {
  router.push({ name: "editStudent", params: { id: student.id } });
};

// Delete a student
const confirmDeleteStudent = (id) => {
  studentToDelete.value = id;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  studentToDelete.value = null;
};

const deleteStudent = async () => {
  try {
    await storeDeleteStudent(studentToDelete.value);
    toast.success("Student deleted successfully!");
  } catch (error) {
    toast.error("Error while deleting the student.");
  } finally {
    closeModal();
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
