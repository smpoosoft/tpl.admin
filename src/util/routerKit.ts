import { useRouter } from 'vue-router';

const router = useRouter();

export const navTo = (item: any) => {
  if (item.items?.length) {
    router.push(item.path);
  }
};
