<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap aligh-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <div class="btn-toolbar mb-2 mb-md-0">
      <router-link to="/users/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>E-Mail</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" v-bind:key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role.name }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link :to="`/users/${user.id}}/edit`" class="btn btn-sm btn-outline-secondary"
                >Edit</router-link
              >
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-outline-secondary"
                @click="deleteUser(user.id)"
                >Delete</a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="prev">Previous</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import axios from 'axios';
import { Entity } from '@/interfaces/entity';

export default defineComponent({
  setup() {
    const users = ref([]);
    const page = ref(1);
    const lastPage = ref(0);

    const load = async () => {
      const { data } = await axios.get(`users?page=${page.value}`);
      users.value = data.data;
      lastPage.value = data.meta.last_page;
    };

    const next = async () => {
      if (page.value === lastPage.value) return;
      page.value += 1;
      await load();
    };

    const prev = async () => {
      if (page.value === 1) return;
      page.value -= 1;
      await load();
    };

    const deleteUser = async (id: number) => {
      //eslint-disable-line
      if (confirm('Are you sure you want to delete this user?')) {
        await axios.delete(`/users/${id}`);
        users.value = users.value.filter((e: Entity) => e.id !== id);
      }
    };

    onMounted(load);

    return { users, next, prev, load, deleteUser };
  },
});
</script>

<style lang="scss" scoped></style>
