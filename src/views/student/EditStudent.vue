<template>
    <div>
        <!-- Title -->
        <h4 class="mb-4">Edit Student</h4>

        <!-- Error Message -->
        <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
        </div>

        <!-- Edit Student Form -->
        <div class="shadow-sm rounded bg-white p-4">
            <form @submit.prevent="updateStudent">
                <!-- Full Name -->
                <div class="mb-3">
                    <label for="fullName" class="form-label fw-bold">Full Name</label>
                    <input type="text" id="fullName" v-model="student.fullName" class="form-control"
                        :class="{ 'is-invalid': errors.fullName }" required />
                    <div v-if="errors.fullName" class="invalid-feedback">
                        {{ errors.fullName }}
                    </div>
                </div>

                <!-- Phone Number -->
                <div class="mb-3">
                    <label for="phoneNumber" class="form-label fw-bold">Phone Number</label>
                    <input type="tel" id="phoneNumber" v-model="student.phoneNumber" class="form-control"
                        :class="{ 'is-invalid': errors.phoneNumber }" required />
                    <div v-if="errors.phoneNumber" class="invalid-feedback">
                        {{ errors.phoneNumber }}
                    </div>
                </div>

                <!-- Email -->
                <div class="mb-3">
                    <label for="email" class="form-label fw-bold">Email</label>
                    <input type="email" id="email" v-model="student.email" class="form-control"
                        :class="{ 'is-invalid': errors.email }" required />
                    <div v-if="errors.email" class="invalid-feedback">
                        {{ errors.email }}
                    </div>
                </div>

                <!-- Address -->
                <div class="mb-3">
                    <label for="address" class="form-label fw-bold">Address</label>
                    <input type="text" id="address" v-model="student.address" class="form-control" />
                    <div v-if="errors.address" class="invalid-feedback">
                        {{ errors.address }}
                    </div>
                </div>

                <!-- Tutor -->
                <div class="mb-3">
                    <label for="tutor" class="form-label fw-bold">Tutor</label>
                    <input type="text" id="tutor" v-model="student.tutor" class="form-control" />
                    <div v-if="errors.tutor" class="invalid-feedback">
                        {{ errors.tutor }}
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-secondary me-2" @click="navigateBack">
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
import useStudentStore from "@/store/studentStore";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const { loadStudents, updateStudent: storeUpdateStudent, students } = useStudentStore();

const student = ref({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    tutor: "",
});
const errors = reactive({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    tutor: "",
});
const isLoading = ref(false);
const errorMessage = ref("");
const studentId = Number(route.params.id); // Convertit en nombre

onMounted(async () => {
    try {
        await loadStudents();
        const fetchedStudent = students.value.find((s) => s.id === studentId); // Comparaison avec Number
        if (fetchedStudent) {
            student.value = { ...fetchedStudent };
        } else {
            toast.error("Student not found!");
            navigateBack();
        }
    } catch (error) {
        errorMessage.value = "Error loading student data.";
    }
});

const validatePhone = () => {
  const phoneRegex = /^[0-9\s]*$/; 
  if (!phoneRegex.test(phoneNumber.value)) {
    errors.phoneNumber = "Phone must be a number ";
  } else if(phoneNumber.value.length > 15) {
    errors.phoneNumber = "Phone cannot be most 15 chractere long";
  } else{
    errors.phoneNumber = "";
  }
};
// Update Student
const updateStudent = async () => {
    validatePhone()
    if (errors.phoneNumber) {
        return; 
    }
    try {
        isLoading.value = true;
        resetErrors();

        await storeUpdateStudent(studentId, student.value);
        toast.success("Student updated successfully!");
        navigateBack();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach(err => {
        if (err.path === "fullName") {
          errors.fullName = err.msg; 
        } else if (err.path == "phoneNumber") {
          errors.phoneNumber = err.msg;
        } else if (err.path == "email") {
          errors.email = err.msg;
        } else if (err.path == "address") {
          errors.address = err.msg;
        } else if(err.path == "tutor") {
          errors.tutor = err.msg;
        }
      });
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
    } finally {
        isLoading.value = false;
    }
};

// Reset Errors
const resetErrors = () => {
    Object.keys(errors).forEach((key) => (errors[key] = ""));
};

// Navigate Back
const navigateBack = () => {
    router.push({ name: "listStudent" }); // Correction du nom de la route
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