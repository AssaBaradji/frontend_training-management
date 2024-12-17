import axios from "axios";
import { ref } from "vue";

const API_BASE_URL = "http://localhost:3005/api";

export default function usePaymentStore() {
  const payments = ref([]);
  const registrations = ref([]);
  const loadPayement = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payements`);
      payments.value = response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des payements :", error);
      throw error;
    }
  };
  const loadRegistrations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inscriptions`);
      registrations.value = response.data;
      return registrations.value;
    } catch (error) {
      console.error("Erreur lors du chargement des inscriptions :", error);
      throw error;
    }
  };
  const addPayment = async (paymentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payements`, paymentData);
      payments.value.push(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de payement :", error);
      throw error;
    }
  };

  // Mettre à jour un étudiant existant
  const updatePayment = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/payements/${id}`, updatedData);
      // Mise à jour des données locales après succès
      const index = payments.value.findIndex((payement) => payement.id === id);
      if (index !== -1) {
        payments.value[index] = { ...response.data };
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de payement :", error);
      throw error;
    }
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/payements/${id}`);
      payments.value = payments.value.filter((payement) => payement.id !== id);
    } catch (error) {
      console.error("Erreur lors de la suppression de payement :", error);
      throw error;
    }
  };

  return {
    payments,
    loadPayement,
    addPayment,
    updatePayment,
    deletePayment,
    loadRegistrations
  };
}
