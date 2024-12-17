<template>
  <div class="container mt-1">
    <div class="col-md-8 mx-auto">
      <h1 class="h4 text-primary mb-4 text-center">Add New Payment</h1>

      <!-- Affichage des erreurs globales du backend -->
      <div v-if="paymentStore.error" class="alert alert-danger">
        <p>{{ paymentStore.error }}</p>
      </div>

      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="paymentDate" class="form-label">Payment Date</label>
          <input type="date" id="paymentDate" v-model="form.paymentDate" class="form-control"
            :class="{ 'is-invalid': errors.paymentDate }" required />
          <div v-if="errors.paymentDate" class="invalid-feedback">{{ errors.paymentDate }}</div>
        </div>

        <div class="mb-3">
          <label for="amount" class="form-label">Amount</label>
          <input type="number" id="amount" v-model="form.amount" class="form-control"
            :class="{ 'is-invalid': errors.amount }" required />
          <div v-if="errors.amount" class="invalid-feedback">{{ errors.amount }}</div>
        </div>

        <div class="mb-3">
          <label for="payer" class="form-label">Payer</label>
          <input type="text" id="payer" v-model="form.payer" class="form-control"
            :class="{ 'is-invalid': errors.payer }" required />
          <div v-if="errors.payer" class="invalid-feedback">{{ errors.payer }}</div>
        </div>

        <div class="mb-3">
          <label for="payerNumber" class="form-label">Payer Number</label>
          <input type="tel" id="payerNumber" v-model="form.payerNumber" class="form-control"
            :class="{ 'is-invalid': errors.payerNumber }" required />
          <div v-if="errors.payerNumber" class="invalid-feedback">{{ errors.payerNumber }}</div>
        </div>
        <div class="mb-3">
          <label for="paymentMode" class="form-label">Payment Mode</label>

          <select id="paymentMode" v-model="form.paymentMode" class="form-control"
          :class="{ 'is-invalid': errors.paymentMode }" required >
            <option value="" disabled selected>
              Select Payment Mode
            </option>
            <option value="Masrvi">Masrvi</option>
            <option value="Bankily">Bankily</option>
            <option value="Cash">Cash</option>
        </select>
          <div v-if="errors.paymentMode" class="invalid-feedback">{{ errors.paymentMode }}</div>
        </div>

        <!-- <div class="mb-3">
          <label for="registration" class="form-label">Registration</label>
          <input type="number" id="registration" v-model="form.registrationId" class="form-control"
            :class="{ 'is-invalid': errors.registrationId }" />
          <div v-if="errors.registrationId" class="invalid-feedback">{{ errors.registrationId }}</div>
        </div> -->
        <div class="mb-3">
          <label for="registration" class="form-label">Registration</label>
          <select
            id="registration"
            v-model="form.registrationId"
            class="form-select"
            :class="{ 'is-invalid': errors.registrationId }"
            required
          >
            <option disabled value="">Select a registration</option>
            <option
              v-for="registration in registrations"
              :key="registration.id"
              :value="registration.id"
            >
              {{ registration.id }}
            </option>
          </select>
          <div v-if="errors.registrationId" class="invalid-feedback">
            {{ errors.registrationId }}
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            <span v-if="isLoading">Adding...</span>
            <span v-else>Add Payment</span>
          </button>
          <button type="button" class="btn btn-secondary ms-3" @click="navigate('listPayment')">
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
// import useStudentStore from "@/store/studentStore";
import usePaymentStore from "../../store/paymentStore";
// import useRegistrationStore from "../../store/registrationStore";

// const registrationStore = useRegistrationStore()

// Dépendances
const router = useRouter();
const paymentStore = usePaymentStore();
const toast = useToast();

const registrations = ref([]);
// État local pour le formulaire
const form = ref({
  paymentDate: "",
  amount: "",
  payer: "",
  payerNumber: "",
  paymentMode: "",
  registrationId: "",
});

const errors = reactive({
  paymentDate: "",
  amount: "",
  payer: "",
  payerNumber: "",
  paymentMode: "",
  registrationId: "",
});

const loadData = async () => {
  try {
    await paymentStore.loadRegistrations();
    const registrationsData = await paymentStore.loadRegistrations()
    registrations.value = registrationsData;
    console.log("Loaded registration:", registrations.value);

  } catch (error) {
    toast.error("Failed to load registrations.");
  }
};
onMounted(async () => {
  try {
    await loadData();
  } catch (error) {
    toast.error("Error while loading students.");
  }
});
const isLoading = ref(false);

const navigate = (routeName) => {
    router.push({ name: routeName });
};

const validatePhone = () => {
  const phoneRegex = /^[0-9\s]*$/; 
  if (!phoneRegex.test(payerNumber.value)) {
    errors.payerNumber = "Phone must be a number ";
  } else if(payerNumber.value.length > 15) {
    errors.payerNumber = "Phone cannot be most 15 chractere long";
  } else{
    errors.payerNumber = "";
  }
};
const submitForm = async () => {
  validatePhone()
  if (errors.payerNumber) {
    return; 
  }
  try {
    isLoading.value = true;
    Object.keys(errors).forEach((key) => (errors[key] = ""));

    const response = await paymentStore.addPayment(form.value);

    toast.success("Student added successfully!");
    router.push({ name: "listPayment" });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach(err => {
        if (err.path === "amount") {
          errors.amount = err.msg; 
        } else if (err.path == "payer") {
          errors.payer = err.msg;
        } else if (err.path == "paymentMode") {
          errors.paymentMode = err.msg;
        } else if (err.path == "payerNumber") {
          errors.payerNumber = err.msg;
        } else if (err.path == "registrationId") {
          errors.registrationId = err.msg;
        } else {
          errors.general = err.msg;
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
