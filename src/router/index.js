import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../Dashbord.vue";

import ListStudent from "@/views/student/ListStudent.vue";
import AddStudent from "../views/student/AddStudent.vue";
import EditStudent from "../views/student/EditStudent.vue";

import ListModule from "../views/module/ListMoule.vue";
import AddModule from "../views/module/AddModule.vue";
import EditModule from "../views/module/EditModule.vue";
import ShowModule from "../views/module/ShowModule.vue";
import ListPayment from "../views/payements/ListPayment.vue";
import AddPayment from "../views/payements/AddPayment.vue";
import ListRegistration from "../views/registration/ListRegistration.vue";
import AddRegistration from "../views/registration/AddRegistration.vue";

const routes = [
  
    {
        path: "/",
        name: "home",
        component: Dashboard,
        meta: { requiresAuth: true },
        children: [
            { path: "list-Student", name: "listStudent", component: ListStudent },
            { path: "Add-Student", name: "AddStudent", component: AddStudent},
            { path: "edit-student/:id", name: "editStudent", component: EditStudent },
            { path: "list-module", name: "listModule", component: ListModule },
            { path: "Add-module", name: "addModule", component: AddModule },
            { path: "edit-module/:id", name: "editModule", component: EditModule },
            { path: "show-module/:id", name: "showModule", component: ShowModule },
            { path: "list-payment", name: "listPayment", component: ListPayment },
            { path: "add-payment", name: "addPayment", component: AddPayment},
            { path: "list-registration", name: "listRegistration", component: ListRegistration},
            { path: "add-registration", name: "AddRegistration", component: AddRegistration },

         
        ],
    },
     
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
