import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../Dashbord.vue";

import ListStudent from "@/views/student/ListStudent.vue";
import AddStudent from "../views/student/AddStudent.vue";



const routes = [
  
    {
        path: "/",
        name: "home",
        component: Dashboard,
        meta: { requiresAuth: true },
        children: [
            { path: "list-Student", name: "listStudent", component: ListStudent },
            { path: "Add-Student", name: "AddStudent", component: AddStudent},
         
        ],
    },
   
     
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});



export default router;

