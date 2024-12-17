<template>
  <div class="container mt-1">
    <div class="col-md-8 mx-auto">
      <h1 class="h4 text-primary mb-4 text-center">Add New Student</h1>

      <div v-if="studentStore.error" class="alert alert-danger">
        <p>{{ studentStore.error }}</p>
      </div>

      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="fullName" class="form-label">Full Name</label>
          <input
            type="text"
            id="fullName"
            v-model="form.fullName"
            class="form-control"
            :class="{ 'is-invalid': errors.fullName }"
            required
          />
          <div v-if="errors.fullName" class="invalid-feedback">
            {{ errors.fullName }}
          </div>
        </div>

        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            v-model="form.phoneNumber"
            class="form-control"
            :class="{ 'is-invalid': errors.phoneNumber }"
            required
          />
          <div v-if="errors.phoneNumber" class="invalid-feedback">
            {{ errors.phoneNumber }}
          </div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
            required
          />
          <div v-if="errors.email" class="invalid-feedback">
            {{ errors.email }}
          </div>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">Address</label>
          <input
            type="text"
            id="address"
            v-model="form.address"
            class="form-control"
            :class="{ 'is-invalid': errors.address }"
          />
          <div v-if="errors.address" class="invalid-feedback">
            {{ errors.address }}
          </div>
        </div>

        <div class="mb-3">
          <label for="tutor" class="form-label">Tutor</label>
          <input
            type="text"
            id="tutor"
            v-model="form.tutor"
            class="form-control"
            :class="{ 'is-invalid': errors.tutor }"
          />
          <div v-if="errors.tutor" class="invalid-feedback">
            {{ errors.tutor }}
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            <span v-if="isLoading">Adding...</span>
            <span v-else>Add Student</span>
          </button>
          <button
            type="button"
            class="btn btn-secondary ms-3"
            @click="navigateBack"
          >
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
import useStudentStore from "@/store/studentStore";

const router = useRouter();
const studentStore = useStudentStore();
const toast = useToast();

const form = ref({
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

const navigateBack = () => {
  router.push({ name: "listStudent" });
};
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
const submitForm = async () => {
  validatePhone();
  if (errors.phoneNumber) {
    return; 
  }
  try {
    isLoading.value = true;
    Object.keys(errors).forEach((key) => (errors[key] = ""));

    const response = await studentStore.addStudent(form.value);

    toast.success("Student added successfully!");
    router.push({ name: "listStudent" });
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
</script>

<style scoped>
.container {
  max-inline-size: 700px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

button {
  min-inline-size: 120px;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875em;
}
</style>
