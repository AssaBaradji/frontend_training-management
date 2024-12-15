
import axios from "axios";
import { ref } from "vue";

const API_BASE_URL = "http://localhost:3004/api";

export default function useRegistrationStore() {
  const registrations = ref([]);
  const students = ref([]);
  const modules = ref([]);

  // Charger la liste des inscriptions
  const loadRegistrations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inscriptions`);
      registrations.value = response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des inscriptions :", error);
      throw error;
    }
  };

  // Charger la liste des étudiants
  // const loadStudents = async () => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/students`);
  //     students.value = response.data;
  //   } catch (error) {
  //     console.error("Erreur lors du chargement des étudiants :", error);
  //     throw error;
  //   }
  // };
  const loadStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students`);
      return response.data; // Retournez directement les données
    } catch (error) {
      console.error("Erreur lors du chargement des étudiants :", error);
      throw error;
    }
  };

  // Charger la liste des modules
  const loadModules = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/modules`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des modules :", error);
      throw error;
    }
  };

  // Ajouter une inscription
  const addRegistration = async (registrationData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/inscriptions`, registrationData);
      registrations.value.push(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'inscription :", error);
      throw error;
    }
  };

  // Supprimer une inscription
  const deleteRegistration = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/inscriptions/${id}`);
      registrations.value = registrations.value.filter((registration) => registration.id !== id);
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
    deleteRegistration,
  };
}
