// plugins/pinia-router.js
import { markRaw } from 'vue'; // Important for reactivity
import { useRouter } from 'vue-router';

export default defineNuxtPlugin(({ $pinia }) => {
  const router = useRouter();
  $pinia.use(({ store }) => {
    store.router = markRaw(router); // Attach the raw router instance
  });
});