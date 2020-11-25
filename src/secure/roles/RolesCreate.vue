<template>
  <form class="form-group" @submit.prevent="submit">
    <div class="form-group row"></div>
    <label for="name" class="col-form-label">Name</label>
    <div class="col-sm-10">
      <input
        type="text"
        id="name"
        class="form-control"
        placeholder="Name"
        required
        autofocus
        v-model="name"
      />
    </div>

    <div class="form-group row">
      <label for="permission" class="col-sm-2 col-form-label">Permissions</label>
      <div class="col-sm-10">
        <div
          class="form-check form-check-inline col-3"
          v-for="permission in permissions"
          :key="permission.id"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="permission.id"
            @change="select(permission.id, $event.target.checked)"
          />
          <label class="form-check-label">{{ permission.name }}</label>
        </div>
      </div>
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import CreateRoleDto from '@/dto/createRole.dto';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RolesCreate',
  setup() {
    const name = ref('');
    const permissions = ref([]);
    const selected = ref<number[]>([]);
    const router = useRouter();

    const select = (id: number, checked: boolean) => {
      if (checked) {
        selected.value = [...selected.value, id];
        return;
      }
      selected.value = selected.value.filter((s) => s !== id);
    };

    const submit = async () => {
      const newRole: CreateRoleDto = { name: name.value, permissions: selected.value };
      await axios.post('/roles', newRole);
      await router.push('/roles');
    };

    onMounted(async () => {
      const { data } = await axios.get('/permissions');
      permissions.value = data.data;
    });

    return {
      name,
      permissions,
      selected,
      select,
      submit,
    };
  },
});
</script>

<style scoped></style>
