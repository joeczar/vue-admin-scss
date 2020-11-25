/* eslint-disable @typescript-eslint/camelcase */
<template>
  <form class="form-signin" @submit.prevent="submit()">
    <h1 class="h3 mb-3 font-weight-normal">Please register</h1>

    <label for="first_name" class="sr-only">First name</label>
    <input
      type="text"
      id="first_name"
      class="form-control"
      placeholder="First Name"
      required
      autofocus
      v-model="firstName"
    />
    <label for="last_name" class="sr-only">Last name</label>
    <input
      type="text"
      id="last_name"
      class="form-control"
      placeholder="Last Name"
      required
      v-model="lastName"
    />
    <label for="inputEmail" class="sr-only">Email address</label>
    <input
      type="email"
      id="inputEmail"
      class="form-control"
      placeholder="Email address"
      required
      autofocus
      v-model="email"
    />
    <label for="password" class="sr-only">Password</label>
    <input
      type="password"
      id="password"
      class="form-control"
      placeholder="Password"
      required
      v-model="password"
    />
    <label for="passwordConfirm" class="sr-only">Confirm Password</label>
    <input
      type="password"
      id="passwordConfirm"
      class="form-control"
      placeholder="Confirm Password"
      required
      v-model="passwordConfirm"
    />

    <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
  </form>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import './public.scss';

export default defineComponent({
  name: 'Register',
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const router = useRouter();

    const submit = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data } = await axios.post('/register', {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          password: password.value,
          password_confirm: passwordConfirm.value,
          submit,
        });
        await router.push('/login');
      } catch (err) {
        console.log('error in submit', err);
      }
    };

    return {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped></style>
