import axios from "axios";
import { ref } from "vue";

const API_BASE_URL = "http://localhost:3005/api";

export default function useStudentStore() {
  const students = ref([]);

  const loadStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students`);
      students.value = response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des étudiants :", error);
      throw error;
    }
  };

  const addStudent = async (studentData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/students`,
        studentData
      );
      students.value.push(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant :", error);
      throw error;
    }
  };

  const updateStudent = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/students/${id}`,
        updatedData
      );

      const index = students.value.findIndex((student) => student.id === id);
      if (index !== -1) {
        students.value[index] = { ...response.data };
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'étudiant :", error);
      throw error;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/students/${id}`);
      students.value = students.value.filter((student) => student.id !== id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant :", error);
      throw error;
    }
  };

  return {
    students,
    loadStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}
