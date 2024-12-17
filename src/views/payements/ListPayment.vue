<template>
  <div>
    <!-- Add Student Button -->
    <h4 class="mb-4">Payments List</h4>
    <div class="text-end mb-4">
      <button class="btn btn-primary btn-sm me-3 fw-bold" @click="navigate('addPayment')">
        <i class="fa fa-plus me-1"></i> Add Payment
      </button>
    </div>

    <!-- Student Table -->
    <div class="table-responsive shadow-sm rounded bg-white p-3 mt-3">
      <table class="table table-hover table-borderless align-middle text-center">
        <thead class="table-light small-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Payment Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Payer</th>
            <th scope="col">Payer Number</th>
            <th scope="col">Payment Mode</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="payments.length === 0">
            <td colspan="7" class="text-danger fw-bold">No payments found</td>
          </tr>
          <tr v-for="(payment, index) in payments" :key="payment.id">
            <td>{{ index + 1 }}</td>
            <td>{{ new Date(payment.payment_date).toLocaleDateString()}}</td>
            <td>{{ payment.amount }}</td>
            <td>{{ payment.payer }}</td>
            <td>{{ payment.payer_number }}</td>
            <td>{{ payment.payment_mode }}</td>
            <td>
              <button class="btn btn-sm btn-info me-2" @click="openModal(payment)">
                <i class="fa fa-eye"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="confirmDeletePayment(payment.id)">
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
          <button class="btn btn-danger" @click="deletePayment">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isModalVisible" class="modal-overlay d-flex" id="modal-overlay " @click="closeModale">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h5 class="font-wb-md mt-3">Details Payement</h5>
        </div>
        <div class="tx modal-body">
          <p>
            <strong>Registration: </strong> {{ selectedPayment.registration_id }}
          </p>
          <p>
            <strong>Remaining Amount: </strong> {{ selectedPayment.remainingAmount }}
          </p>
          <p>
            <strong>Student: </strong> {{ selectedPayment.student_name }}
          </p>
          <p>
            <strong>Module: </strong> {{ selectedPayment.module_name }}
          </p>
        </div>
        <button class="btn btn-danger text-white font-wb" @click="closeModale">
          Close
        </button>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import usePaymentStore from "../../store/paymentStore";


const router = useRouter();
const toast = useToast();
const { payments, loadPayement, deletePayment: storeDeletePayment } = usePaymentStore();

const showModal = ref(false);
const paymentToDelete = ref(null);

onMounted(async () => {
  try {
    await loadPayement();
  } catch (error) {
    toast.error("Error while loading payments.");
  }
});

const navigate = (routeName) => {
  router.push({ name: routeName });
};


const confirmDeletePayment = (id) => {
  paymentToDelete.value = id;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  paymentToDelete.value = null;
};

const deletePayment = async () => {
  try {
    await storeDeletePayment(paymentToDelete.value);
    toast.success("Payment deleted successfully!");
  } catch (error) {
    toast.error("Error while deleting the payment.");
  } finally {
    closeModal();
  }
};



const isModalVisible = ref(false);
const selectedPayment = ref(null);

const openModal = (payment) => {
  selectedPayment.value = payment;
  isModalVisible.value = true;
};

const closeModale = () => {
  isModalVisible.value = false;
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

.tx{
  text-align: start;
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


#modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

#modal-content {
  background: white;
  padding: 20px;
  padding-top: 5px;
  border-radius: 8px;
  max-width: 300px;
  position: relative;
}
#modal-body {
  padding: 20px;
}
.font-wb-md{
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
