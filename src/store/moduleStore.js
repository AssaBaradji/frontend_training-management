// import { ref } from "vue";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:3005/api/modules"; // Remplacez par votre URL de backend

// export default function useModuleStore() {
//   const modules = ref([]);
//   const isLoading = ref(false);

//   // Charger tous les modules
//   const loadModules = async () => {
//     isLoading.value = true;
//     try {
//       const response = await axios.get(API_BASE_URL);
//       modules.value = response.data;
//       localStorage.setItem("modules", JSON.stringify(modules.value));
//     } catch (error) {
//       console.error("Erreur lors du chargement des modules :", error);
//       throw error;
//     } finally {
//       isLoading.value = false;
//     }
//   };

//   // Charger un module par ID
//   const getModuleById = async (id) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Erreur lors du chargement du module :", error);
//       throw error;
//     }
//   };

//   // Ajouter un module
//   const createModule = async (newModule) => {
//     try {
//       const response = await axios.post(API_BASE_URL, newModule);
//       modules.value.push(response.data);
//       localStorage.setItem("modules", JSON.stringify(modules.value));
//     } catch (error) {
//       console.error("Erreur lors de la création du module :", error);o
//       throw error;
//     }
//   };

//   // Mettre à jour un module
//   const updateModule = async (id, moduleData) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/${id}`, moduleData);
//       const index = modules.value.findIndex((m) => m.id === id); // Corrigé : modules au lieu de registrations
//       if (index !== -1) {
//         modules.value[index] = response.data;
//         localStorage.setItem("modules", JSON.stringify(modules.value)); // Mise à jour locale
//       }
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour du module :", error);
//       throw error;
//     }
//   };
  

//   // Supprimer un module
//   const deleteModule = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/${id}`);
//       modules.value = modules.value.filter((module) => module.id !== id);
//       localStorage.setItem("modules", JSON.stringify(modules.value));
//     } catch (error) {
//       console.error("Erreur lors de la suppression du module :", error);
//       throw error;
//     }
//   };

//   // Initialisation depuis localStorage
//   const init = () => {
//     const storedModules = localStorage.getItem("modules");
//     if (storedModules) {
//       modules.value = JSON.parse(storedModules);
//     } else {
//       loadModules();
//     }
//   };

//   return {
//     modules,
//     isLoading,
//     loadModules,
//     getModuleById,
//     createModule,
//     updateModule,
//     deleteModule,
//     init,
//   };
// }
import { ref } from "vue";
import axios from "axios";

const API_BASE_URL = "http://localhost:3005/api/modules"; // Remplacez par votre URL de backend

export default function useModuleStore() {
  const modules = ref([]);
  const isLoading = ref(false);

  // Charger tous les modules
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

  // Charger un module par ID
  const getModuleById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors du chargement du module :", error);
      throw error;
    }
  };

  // Ajouter un module
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

  // Mettre à jour un module
  const updateModule = async (id, moduleData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, moduleData);
      const index = modules.value.findIndex((m) => m.id === id); // Recherche du module
      if (index !== -1) {
        modules.value[index] = response.data; // Mise à jour dans le tableau local
        localStorage.setItem("modules", JSON.stringify(modules.value)); // Mise à jour du localStorage
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
      localStorage.setItem("modules", JSON.stringify(modules.value));
    } catch (error) {
      console.error("Erreur lors de la suppression du module :", error);
      throw error;
    }
  };

  // Initialisation depuis localStorage
  const init = () => {
    const storedModules = localStorage.getItem("modules");
    if (storedModules) {
      modules.value = JSON.parse(storedModules); // Charger depuis localStorage
    } else {
      loadModules(); // Si pas de données dans localStorage, charger depuis l'API
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
