<template>
  <Nav :user="user" />

  <div class="container-fluid">
    <div class="row">
      <Menu />
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Menu from '@/secure/components/Menu.vue';
import Nav from '@/secure/components/Nav.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import './secure.scss';

export default defineComponent({
  name: 'Secure',
  components: {
    Menu,
    Nav,
  },
  setup() {
    const router = useRouter();
    const user = ref(null);

    onMounted(async () => {
      try {
        const {
          data: { data },
        } = await axios.get('/user');
        user.value = data;
      } catch (err) {
        await router.push('/login');
      }
    });
    return { user };
  },
});
</script>

<style lang="scss" scoped></style>
