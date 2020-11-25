<template>
  <form class="form-signin" @submit.prevent="submit()">
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
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
    <label for="inputPassword" class="sr-only">Password</label>
    <input
      type="password"
      id="inputPassword"
      class="form-control"
      placeholder="Password"
      required
      v-model="password"
    />

    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
  </form>
</template>

<script>
import './public.scss';
import { ref, defineComponent } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const submit = async () => {
      const {
        data: { token },
      } = await axios.post('/login', {
        email: email.value,
        password: password.value,
      });
      localStorage.setItem('token', token);
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

      await router.push('/');
    };
    return {
      email,
      password,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped></style>
