import axios from "axios";
import { ref } from "vue";

const API_BASE_URL = "http://localhost:3004/api";

export default function useRegistrationStore() {
  const registrations = ref([]);
  const students = ref([]);
  const modules = ref([]);

  const loadRegistrations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inscriptions`);
      registrations.value = response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des inscriptions :", error);
      throw error;
    }
  };

  const addRegistration = async (registrationData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/inscriptions`,
        registrationData
      );
      registrations.value.push(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'inscription :", error);
      throw error;
    }
  };
  const updateRegistration = async (id, registrationData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/inscriptions/${id}`,
        registrationData
      );

      const index = registrations.value.findIndex((r) => r.id === id);
      if (index !== -1) {
        registrations.value[index] = response.data;
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'inscription :", error);
      throw error;
    }
  };

  const loadStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students`);
      students.value = response.data;
      return students.value;
    } catch (error) {
      console.error("Erreur lors du chargement des étudiants :", error);
      throw error;
    }
  };

  const loadModules = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/modules`);
      modules.value = response.data;
      return modules.value;
    } catch (error) {
      console.error("Erreur lors du chargement des modules :", error);
      throw error;
    }
  };

  const deleteRegistration = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/inscriptions/${id}`);
      registrations.value = registrations.value.filter(
        (registration) => registration.id !== id
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'inscription :", error);
      throw error;
    }
  };

  return {
    registrations,
    students,
    modules,
    loadRegistrations,
    loadStudents,
    loadModules,
    addRegistration,
    updateRegistration,
    deleteRegistration,
  };
}
