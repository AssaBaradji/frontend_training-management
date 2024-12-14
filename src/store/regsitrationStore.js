import axios from "axios";
import { ref } from "vue";

const API_BASE_URL = "http://localhost:3004/api";

export default function useRegistrationStore() {
  const registrations = ref([]);

  const loadRegistrations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inscriptions`);
      registrations.value = response.data;
    } catch (error) {
      console.error("Error while loading registrations:", error);
      throw error;
    }
  };

  const addRegistration = async (registrationData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/inscriptions`, registrationData);
      registrations.value.push(response.data);
    } catch (error) {
      console.error("Error while adding a registration:", error);
      throw error;
    }
  };

  const updateRegistration = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/inscriptions/${id}`, updatedData);
      const index = registrations.value.findIndex((registration) => registration.id === id);
      if (index !== -1) {
        registrations.value[index] = response.data;
      }
    } catch (error) {
      console.error("Error while updating the registration:", error);
      throw error;
    }
  };

  const deleteRegistration = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/inscriptions/${id}`);
      registrations.value = registrations.value.filter((registration) => registration.id !== id);
    } catch (error) {
      console.error("Error while deleting the registration:", error);
      throw error;
    }
  };

  return {
    registrations,
    loadRegistrations,
    addRegistration,
    updateRegistration,
    deleteRegistration,
  };
}
