<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap aligh-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <div class="btn-toolbar mb-2 mb-md-0">
      <router-link to="/roles/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link :to="`/roles/${role.id}/edit`" class="btn btn-sm btn-outline-secondary"
                >Edit</router-link
              >
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-outline-secondary"
                @click="deleteRole(role.id)"
                >Delete</a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue';
import axios from 'axios';
import { Entity } from '@/interfaces/entity';

export default defineComponent({
  name: 'Roles',
  setup() {
    const roles = ref([]);

    const deleteRole = async (id: number) => {
      if (confirm('Are you sure you want to delete this role?')) {
        await axios.delete(`/roles/${id}`);
        roles.value = roles.value.filter((e: Entity) => e.id !== id);
      }
    };
    onMounted(async () => {
      const { data } = await axios.get('/roles');

      roles.value = data.data;
    });

    return {
      roles,
      deleteRole,
    };
  },
});
</script>

<style lang="scss" scoped></style>
