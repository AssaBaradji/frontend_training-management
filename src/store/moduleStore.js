import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = "http://localhost:3004/api/modules"; // Remplacez par votre URL de backend

export default defineStore("moduleStore", {
  state: () => ({
    modules: [],
  }),

  actions: {
    async loadModules() {
      try {
        const response = await axios.get(API_BASE_URL);
        this.modules = response.data;
      } catch (error) {
        console.error("Error loading modules:", error);
        throw error;
      }
    },

    async updateModule(id, updatedModule) {
      try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, updatedModule);
        const index = this.modules.findIndex((module) => module.id === id);
        if (index !== -1) {
          this.modules.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error("Error updating module:", error);
        throw error;
      }
    },

    async createModule(newModule) {
      try {
        const response = await axios.post(API_BASE_URL, newModule);
        this.modules.push(response.data);
      } catch (error) {
        console.error("Error creating module:", error);
        throw error;
      }
    },

    async deleteModule(id) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        this.modules = this.modules.filter((module) => module.id !== id);
      } catch (error) {
        console.error("Error deleting module:", error);
        throw error;
      }
    },
  },
});
