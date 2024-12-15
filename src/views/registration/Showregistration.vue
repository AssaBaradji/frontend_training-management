<!-- <template>
  <div
    class="modal fade"
    id="showRegistrationModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary">Registration Details</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
          <div v-if="registration">
            <p>
              <strong>Student Name:</strong>
              {{ getStudentName(registration.studentId) }}
            </p>
            <p>
              <strong>Module Name:</strong>
              {{ getModuleName(registration.moduleId) }}
            </p>
            <p>
              <strong>Start Date:</strong>
              {{ formatDate(registration.startDate) }}
            </p>
            <p>
              <strong>End Date:</strong>
              {{ formatDate(registration.endDate) }}
            </p>
            <p>
              <strong>Amount:</strong>
              {{ registration.amount }} €
            </p>
            <p>
              <strong>Remaining Amount:</strong>
              {{ registration.remainingAmount }} €
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button class="btn btn-warning" @click="editRegistration">
            Edit Registration
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import useRegistrationStore from "@/store/registrationStore";

const registrationStore = useRegistrationStore();
const registration = ref(null);
const errorMessage = ref("");

const props = defineProps({
  registrationId: {
    type: String,
    required: true,
  },
});

const getStudentName = (studentId) => {
  const student = registrationStore.students.find((s) => s.id === studentId);
  return student ? student.fullName : "Unknown";
};

const getModuleName = (moduleId) => {
  const module = registrationStore.modules.find((m) => m.id === moduleId);
  return module ? module.name : "Unknown";
};

const formatDate = (date) => new Date(date).toLocaleDateString();

const editRegistration = () => {
  console.log("Editing registration:", registration.value.id);
};

const loadRegistration = async () => {
  try {
    const allRegistrations = await registrationStore.loadRegistrations();
    registration.value = allRegistrations.find(
      (r) => r.id === props.registrationId
    );

    if (!registration.value) {
      throw new Error("Registration not found.");
    }
  } catch (error) {
    errorMessage.value =
      error.message || "Failed to load registration details.";
  }
};

onMounted(loadRegistration);
</script>
  
  <style scoped>
.modal-content {
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
   -->