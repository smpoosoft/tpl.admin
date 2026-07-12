import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '@/pages/home/HomePage.vue';

const HOME_META = { herf: '/', namezh: '首页' };

const extractKey = (path: string): string => {
  return path.replace(/^\.\.\/pages\/bills\//, '').replace(/(\/bizDef\.ts$|\/TMainView\.vue$)/, '');
};

const modulesViewEntries: [string, () => Promise<any>][] = Object.entries(
  import.meta.glob('../pages/bills/**/TMainView.vue')
).map(([path, loader]) => [extractKey(path), loader]);

const modulesView = Object.fromEntries(modulesViewEntries) as Record<string, () => Promise<any>>;

const moduleBizEntries: [string, () => Promise<any>][] = Object.entries(
  import.meta.glob('../pages/bills/**/bizDef.ts')
).map(([path, loader]) => [extractKey(path), loader]);

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', meta: { breadcrumb: [HOME_META] }, component: HomeView }
];

for (const [key, bizLoader] of moduleBizEntries) {
  const viewLoader = modulesView[key];
  if (viewLoader == null) {
    continue;
  }

  try {
    const { bizIdent = key, bizIdentNamezh = key } = await bizLoader() as {
      bizIdent: string;
      bizIdentNamezh: string;
    };
    routes.push({
      path: `/${key}`,
      name: bizIdent,
      meta: {
        breadcrumb: [
          HOME_META,
          { herf: `/${key}`, namezh: bizIdentNamezh }
        ]
      },
      component: viewLoader
    });
  } catch (err) {
    console.error(`[Router] Failed to load bizDef for "${key}":`, err);
  }
}

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 })
});