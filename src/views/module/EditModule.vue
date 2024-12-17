<template>
  <div>
    <h4 class="mb-4">Edit Module</h4>

    <div class="form-container shadow-sm rounded bg-white p-4">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Module Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="form-control"
            placeholder="Enter module name"
            required
          />
        </div>

        <div class="mb-3">
          <label for="duration" class="form-label">Duration (days)</label>
          <input
            type="number"
            id="duration"
            v-model="form.duration"
            class="form-control"
            placeholder="Enter duration"
            required
          />
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input
            type="number"
            id="price"
            v-model="form.price"
            class="form-control"
            placeholder="Enter price"
            required
          />
        </div>

        <div class="text-end">
          <button type="button" class="btn btn-secondary me-2" @click="cancel">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import useModuleStore from "@/store/moduleStore";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const { getModuleById, updateModule } = useModuleStore();

const form = ref({
  name: "",
  duration: 0,
  price: 0.0,
});

const moduleId = route.params.id;

onMounted(async () => {
  try {
    const module = await getModuleById(moduleId);
    if (module) {
      form.value = { ...module };
    } else {
      toast.error("Module not found.");
      router.push({ name: "moduleList" });
    }
  } catch (error) {
    toast.error("Error while loading module details.");
  }
});

const submitForm = async () => {
  try {
    await updateModule(moduleId, form.value);
    toast.success("Module updated successfully!");
    router.push({ name: "moduleList" });
  } catch (error) {
    toast.error("Error while updating module.");
  }
};

const cancel = () => {
  router.push({ name: "listModule" });
};
</script>

<style scoped>
.form-container {
  max-inline-size: 600px;
  margin: 0 auto;
}

.form-label {
  font-weight: bold;
}
</style>
