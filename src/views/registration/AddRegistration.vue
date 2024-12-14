
   <template>
  <div class="container mt-1">
    <div class="col-md-8 mx-auto">
      <h1 class="h4 text-primary mb-4 text-center">Add New Registration</h1>

      <div v-if="registrationStore.error" class="alert alert-danger">
        <p>{{ registrationStore.error }}</p>
      </div>

      <form @submit.prevent="addRegistration">
        <div class="mb-3">
          <label for="studentId" class="form-label">Student</label>
          <select
            id="studentId"
            v-model="registration.studentId"
            class="form-select"
            :class="{ 'is-invalid': errors.studentId }"
            required
          >
            <option disabled value="">Select a student</option>
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
          <label for="moduleId" class="form-label">Module</label>
          <select
            id="moduleId"
            v-model="registration.moduleId"
            class="form-select"
            :class="{ 'is-invalid': errors.moduleId }"
            required
          >
            <option disabled value="">Select a module</option>
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
          <label for="startDate" class="form-label">Start Date</label>
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
          <label for="endDate" class="form-label">End Date</label>
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
          <label for="amount" class="form-label">Amount</label>
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

        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            <span v-if="isLoading">Adding...</span>
            <span v-else>Add Registration</span>
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
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import useRegistrationStore from "@/store/registrationStore";

const router = useRouter();
const registrationStore = useRegistrationStore();
const toast = useToast();

const students = ref([]);
const modules = ref([]);
const registration = ref({
  studentId: "",
  moduleId: "",
  startDate: "",
  endDate: "",
  amount: "",
});

const errors = reactive({});
const isLoading = ref(false);

const loadData = async () => {
  try {
    await registrationStore.loadStudents();
    await registrationStore.loadModules();
    students.value = registrationStore.students;
    modules.value = registrationStore.modules;
    console.log(students.value);
  } catch (error) {
    toast.error("Failed to load students or modules.");
  }
};
const navigateBack = () => router.push({ name: "listRegistration" });

const addRegistration = async () => {
  try {
    isLoading.value = true;
    Object.keys(errors).forEach((key) => (errors[key] = ""));

    await registrationStore.addRegistration(registration.value);
    toast.success("Registration added successfully!");
    router.push({ name: "listRegistration" });
  } catch (error) {
    toast.error("Error while adding the registration.");
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadData);
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
  