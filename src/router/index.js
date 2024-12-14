import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../Dashbord.vue";
import ListStudent from "@/views/student/ListStudent.vue";
import AddStudent from "../views/student/AddStudent.vue";
import EditStudent from "../views/student/EditStudent.vue";
import ListModule from "../views/module/ListMoule.vue";



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

         
        ],
    },
     
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});



export default router;

