import { ref } from "vue";
import axios from "axios";

const API_BASE_URL = "http://localhost:3004/api/modules"; // Remplacez par votre URL de backend

export default function useModuleStore() {
  // État local
  const modules = ref([]);

  // Charger les modules depuis le backend
  const loadModules = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      modules.value = response.data;
      // Sauvegarde dans localStorage
      localStorage.setItem("modules", JSON.stringify(modules.value));
    } catch (error) {
      console.error("Erreur lors du chargement des modules :", error);
      throw error;
    }
  };

  // Ajouter un module
  const createModule = async (newModule) => {
    try {
      const response = await axios.post(API_BASE_URL, newModule);
      modules.value.push(response.data);
      // Mise à jour dans localStorage
      localStorage.setItem("modules", JSON.stringify(modules.value));
    } catch (error) {
      console.error("Erreur lors de la création du module :", error);
      throw error;
    }
  };

  // Mettre à jour un module
  const updateModule = async (id, updatedModule) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedModule);
      const index = modules.value.findIndex((module) => module.id === id);
      if (index !== -1) {
        modules.value.splice(index, 1, response.data);
        // Mise à jour dans localStorage
        localStorage.setItem("modules", JSON.stringify(modules.value));
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du module :", error);
      throw error;
    }
  };

  // Supprimer un module
  const deleteModule = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      modules.value = modules.value.filter((module) => module.id !== id);
      // Mise à jour dans localStorage
      localStorage.setItem("modules", JSON.stringify(modules.value));
    } catch (error) {
      console.error("Erreur lors de la suppression du module :", error);
      throw error;
    }
  };

  // Initialiser le store à partir de localStorage
  const init = () => {
    const storedModules = localStorage.getItem("modules");
    if (storedModules) {
      modules.value = JSON.parse(storedModules);
    } else {
      loadModules(); // Charger depuis l'API si localStorage est vide
    }
  };

  return {
    modules,
    loadModules,
    createModule,
    updateModule,
    deleteModule,
    init,
  };
}
