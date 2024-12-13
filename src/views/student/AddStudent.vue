<template>
    <div>
      <!-- Add Student Form -->
      <h4 class="mb-4">Add New Student</h4>
      <form @submit.prevent="submitForm" class="bg-white p-4 shadow-sm rounded">
        <div class="mb-3">
          <label for="fullName" class="form-label">Full Name</label>
          <input type="text" id="fullName" v-model="newStudent.fullName" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Phone Number</label>
          <input type="tel" id="phoneNumber" v-model="newStudent.phoneNumber" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="newStudent.email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Address</label>
          <input type="text" id="address" v-model="newStudent.address" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="tutor" class="form-label">Tutor</label>
          <input type="text" id="tutor" v-model="newStudent.tutor" class="form-control" />
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-primary">Add Student</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  
  const router = useRouter();
  const store = useStudentStore();
  const toast = useToast();
  
  const newStudent = ref({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    tutor: "",
  });
  
  // Submit form to add student
  const submitForm = async () => {
    try {
      await store.addStudent(newStudent.value);
      toast.success("Student added successfully!");
      router.push({ name: "studentList" });
    } catch (error) {
      toast.error("Error while adding the student.");
    }
  };
  </script>
  
  <style scoped>
  .form-label {
    font-weight: 600;
  }
  
  .form-control {
    min-width: 300px;
  }
  
  @media (max-width: 768px) {
    .form-control {
      width: 100%;
    }
  }
  </style>
  