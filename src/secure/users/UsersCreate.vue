<template>
  <form class="form-group" @submit.prevent="submit">
    <label for="first_name">First name</label>
    <input
      type="text"
      id="first_name"
      class="form-control"
      placeholder="First Name"
      required
      autofocus
      v-model="firstName"
    />
    <label for="last_name">Last name</label>
    <input
      type="text"
      id="last_name"
      class="form-control"
      placeholder="Last Name"
      required
      v-model="lastName"
    />
    <label for="inputEmail">Email address</label>
    <input
      type="email"
      id="inputEmail"
      class="form-control"
      placeholder="Email address"
      required
      autofocus
      v-model="email"
    />
    <div class="form-group">
      <label for="role">Role</label>
      <select id="role" class="form-control" v-model="roleId">
        <option value="0">Select Role</option>
        <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
      </select>
    </div>
    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { UserDto } from '@/dto';

export default defineComponent({
  name: 'UsersCreate',
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const roleId = ref(0);
    const roles = ref([]);
    const router = useRouter();

    onMounted(async () => {
      const { data } = await axios.get('roles');

      roles.value = data.data;
    });

    const submit = async () => {
      const user: UserDto = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        role_id: roleId.value,
      };
      try {
        await axios.post('/users', user);
        await router.push('/users');
      } catch (error) {
        console.log('error in create User', error);
      }
    };

    return {
      firstName,
      lastName,
      email,
      roleId,
      roles,
      submit,
    };
  },
});
</script>

<style scoped></style>
