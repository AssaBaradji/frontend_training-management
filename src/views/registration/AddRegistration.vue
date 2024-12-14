<!-- <template>
    <div
      class="container d-flex justify-content-center align-items-center min-vh-75"
    >
      <div class="p-5 bg-white rounded-4 shadow-lg form-container">
        <h3 class="text-center mb-4 fw-bold" style="color: #3fb59e">
          Ajouter une Inscription
        </h3>
        <form @submit.prevent="addRegistration">
          <div class="row gx-5">
            <div class="col-md-6">
              <div class="form-floating mb-4">
                <select
                  id="studentId"
                  class="form-select"
                  v-model="registration.studentId"
                  required
                >
                  <option value="" disabled selected>Choisissez un étudiant</option>
                  <option
                    v-for="student in students"
                    :key="student.id"
                    :value="student.id"
                  >
                    {{ student.firstName }} {{ student.lastName }}
                  </option>
                </select>
                <label for="studentId">
                  <i class="fas fa-user me-2"></i>Étudiant
                </label>
              </div>
  
              <div class="form-floating mb-4">
                <select
                  id="moduleId"
                  class="form-select"
                  v-model="registration.moduleId"
                  required
                >
                  <option value="" disabled selected>Choisissez un module</option>
                  <option
                    v-for="module in modules"
                    :key="module.id"
                    :value="module.id"
                  >
                    {{ module.name }}
                  </option>
                </select>
                <label for="moduleId">
                  <i class="fas fa-book me-2"></i>Module
                </label>
              </div>
  
              <div class="form-floating mb-4">
                <input
                  type="date"
                  id="startDate"
                  class="form-control"
                  v-model="registration.startDate"
                  required
                />
                <label for="startDate">
                  <i class="fas fa-calendar-alt me-2"></i>Date de début
                </label>
              </div>
  
              <div class="form-floating mb-4">
                <input
                  type="date"
                  id="endDate"
                  class="form-control"
                  v-model="registration.endDate"
                  required
                />
                <label for="endDate">
                  <i class="fas fa-calendar-alt me-2"></i>Date de fin
                </label>
              </div>
            </div>
  
            <div class="col-md-6">
              <div class="form-floating mb-4">
                <input
                  type="number"
                  id="amount"
                  class="form-control"
                  v-model="registration.amount"
                  placeholder="Montant"
                  required
                />
                <label for="amount">
                  <i class="fas fa-euro-sign me-2"></i>Montant
                </label>
              </div>
  
              <div class="form-floating mb-4">
                <input
                  type="text"
                  class="form-control readonly-input"
                  :value="authStore.utilisateurNom"
                  readonly
                />
                <label>
                  <i class="fas fa-user me-2"></i>Utilisateur
                </label>
              </div>
            </div>
          </div>
  
          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-outline-secondary fw-bold w-45 shadow-sm"
              @click="cancelAdd"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="btn w-45 py-2 fw-bold shadow-sm"
              style="background-color: #3fb59e; color: white"
            >
              <i class="fas fa-save"></i> Ajouter Inscription
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  import { useRegistrationStore } from "../../store/regsitrationStore.js";
//   import { useAuthStore } from "@/store/authStore.js";
  
  const registrationStore = useRegistrationStore();
//   const authStore = useAuthStore();
  const router = useRouter();
  const toast = useToast();
  
  // Data for the form
  const registration = ref({
    studentId: "",
    moduleId: "",
    startDate: "",
    endDate: "",
    amount: "",
    // utilisateurId: authStore.currentUser?.id || null,
  });
  
  const students = ref([]);
  const modules = ref([]);
  
  onMounted(async () => {
    try {
      // Fetch students and modules
      await registrationStore.loadStudents();
      await registrationStore.loadModules();
      students.value = registrationStore.students;
      modules.value = registrationStore.modules;
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      toast.error("Erreur lors du chargement des données.");
    }
  });
  
  const addRegistration = async () => {
    try {
      const result = await registrationStore.addRegistration(registration.value);
      if (result.success) {
        toast.success("Inscription ajoutée avec succès !");
        router.push("/registrations");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'inscription :", error);
      toast.error("Erreur lors de l'ajout de l'inscription.");
    }
  };
  
  const cancelAdd = () => {
    toast.info("Ajout d'inscription annulé.");
    router.push("/registrations");
  };
  </script>
  
  <style scoped>
  .container {
    min-block-size: 90vh;
  }
  
  .form-container {
    max-inline-size: 850px;
    background-color: #fff;
    padding: 3rem 2.5rem;
    border-radius: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .form-floating label {
    color: #6c757d;
    font-size: 1rem;
  }
  
  .form-control,
  .form-select {
    border: 2px solid #ddd !important;
    transition: border-color 0.3s ease;
    padding: 1.5rem;
    font-size: 1.1rem;
  }
  
  .form-control:focus,
  .form-select:focus {
    border-color: #3fb59e !important;
    box-shadow: 0 0 0 0.2rem rgba(63, 181, 158, 0.25);
  }
  
  .readonly-input {
    background-color: #f8f9fa;
    color: #6c757d;
    font-weight: bold;
  }
  
  .btn {
    transition: all 0.3s ease;
  }
  
  .btn:hover {
    background-color: #36a290;
  }
  
  .w-45 {
    inline-size: 45%;
  }
  </style>
   -->
  