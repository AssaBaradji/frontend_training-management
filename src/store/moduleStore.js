import { ref } from "vue";
import axios from "axios";

const API_BASE_URL = "http://localhost:3005/api/modules";

export default function useModuleStore() {
  const modules = ref([]);
  const isLoading = ref(false);

  const loadModules = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get(API_BASE_URL);
      modules.value = response.data;
      localStorage.setItem("modules", JSON.stringify(modules.value));
    } catch (error) {
      console.error("Erreur lors du chargement des modules :", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const getModuleById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors du chargement du module :", error);
      throw error;
    }
  };

  const createModule = async (newModule) => {
    try {
      const response = await axios.post(API_BASE_URL, newModule);
      modules.value.push(response.data);
      localStorage.setItem("modules", JSON.stringify(modules.value));
    } catch (error) {
      console.error("Erreur lors de la création du module :", error);
      throw error;
    }
  };

  const updateModule = async (id, moduleData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, moduleData);
      const index = modules.value.findIndex((m) => m.id === id);
      if (index !== -1) {
        modules.value[index] = response.data;
        localStorage.setItem("modules", JSON.stringify(modules.value));
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du module :", error);
      throw error;
    }
  };

  const deleteModule = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      modules.value = modules.value.filter((module) => module.id !== id);
      localStorage.setItem("modules", JSON.stringify(modules.value));
    } catch (error) {
      console.error("Erreur lors de la suppression du module :", error);
      throw error;
    }
  };

  const init = () => {
    const storedModules = localStorage.getItem("modules");
    if (storedModules) {
      modules.value = JSON.parse(storedModules);
    } else {
      loadModules();
    }
  };

  return {
    modules,
    isLoading,
    loadModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule,
    init,
  };
}
