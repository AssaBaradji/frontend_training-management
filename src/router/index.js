import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../Dashbord.vue";

import ListStudent from "@/views/student/ListStudent.vue";
import AddStudent from "../views/student/AddStudent.vue";
import AddRegistration from "../views/registration/AddRegistration.vue";
import ListRegistration from "@/views/registration/ListRegistration.vue";
import EditStudent from "@/views/student/editStudent.vue";
import ListModule from "@/views/module/ListModule.vue";
import Editregistration from "../views/registration/Editregistration.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      { path: "list-Student", name: "listStudent", component: ListStudent },
      { path: "Add-Student", name: "AddStudent", component: AddStudent },
      {
        path: "list-Registration",
        name: "listRegistration",
        component: ListRegistration,
      },
      { path: "Add-Registration", name: "AddRegistration", component: AddRegistration },
      { path: "edit-registration/:id", name: "editRegistration", component: Editregistration },

      { path: "edit-student/:id", name: "editStudent", component: EditStudent },
      { path: "list-module", name: "listModule", component: ListModule },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
