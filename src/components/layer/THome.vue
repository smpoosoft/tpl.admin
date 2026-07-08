<template>
  <TLayerBase>
    <div class="homeWrapper fullW-H overHidden">
      <!-- 左侧边栏 -->
      <div class="sliderMenu p2 fullH overHidden">
        <div class="flex items-center gap-2">
          <span class="font-bold">Amy Elsner</span>
        </div>
        <PanelMenu :model="items" class="w-full h-full overY">
          <template #item="{ item }">
            <a v-ripple class="flex items-center px-4 py-2 cursor-pointer group">
              <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
              <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
              <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
              <span
                v-if="item.shortcut"
                class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
              >
                {{ item.shortcut }}
              </span>
            </a>
          </template>
        </PanelMenu>

        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <Button icon="pi pi-user" rounded text></Button>
            <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
          </div>
          <!-- <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span> -->
        </div>
      </div>

      <!-- 工作区 -->
      <Panel class="workSpaceWrpper fullWH overHidden" :pt="panelPt">
        <template #header>
          <div class="workSpaceHeader">
            <span>CRM.pro</span>
            <div class="flex items-center gap-4">
              <TIcon name="chevron_up" :size="24" class="mR2" style="color: red"></TIcon>
              <TIcon name="bell" :size="24" class="mR2"></TIcon>
              <TIcon name="success" :size="24" class="mR2"></TIcon>
              <TIcon name="warning" :size="24" class="mR2"></TIcon>
              <span class="font-bold">Amy Elsner</span>
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
                :pt="avatarPt"
              />
            </div>
          </div>
        </template>

        <div v-for="i in 50" :key="i" class="content-row">Content row {{ i }}</div>
      </Panel>
    </div>
  </TLayerBase>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TLayerBase from './TLayerBase.vue';
import PanelMenu from 'primevue/panelmenu';
import Panel, { type PanelPassThroughOptions } from 'primevue/panel';
import Avatar from 'primevue/avatar';
import type { AvatarPassThroughOptions } from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import TIcon from '@/components/widget/TIcon.vue';

import { Moon, Comment, Bell, Envelope } from '@primeicons/vue';

import { useToast } from 'primevue/usetoast';

const panelPt: PanelPassThroughOptions = {
  root: { class: 'workSpaceWrpper fullH-H overHidden' },
  header: { class: 'workSpaceHeader fullWH' },
  contentContainer: { class: 'workSpaceContainer p2 fullH overHidden' },
  contentWrapper: { class: 'workspaceCZone fullWH overHidden' },
  content: { class: 'panelContent fullWH overHidden' }
};

const avatarPt: AvatarPassThroughOptions = {
  root: { class: 'avatar24' }
};

const toast = useToast();

const items = ref([
  {
    label: 'Mail',
    icon: 'pi pi-envelope',
    badge: 5,
    items: [
      {
        label: 'Compose',
        icon: 'pi pi-file-edit',
        shortcut: '⌘+N'
      },
      {
        label: 'Inbox',
        icon: 'pi pi-inbox',
        badge: 5
      },
      {
        label: 'Sent',
        icon: 'pi pi-send',
        shortcut: '⌘+S'
      },
      {
        label: 'Trash',
        icon: 'pi pi-trash',
        shortcut: '⌘+T'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    shortcut: '⌘+R',
    items: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Products',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    shortcut: '⌘+W',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  }
]);

const showToast = () => {
  toast.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', life: 3000 });
};
</script>

<style lang="scss" scoped>
.homeWrapper {
  display: grid;
  grid-template-columns: 260px 1fr;
  background-color: #f2f4f8;

  .sliderMenu {
    display: grid;
    grid-template-rows: 100px 1fr 48px;
    row-gap: 8px;
    background-color: #fff;
  }

  .workSpaceWrpper {
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: transparent;

    :deep(.workSpaceHeader) {
      display: grid;
      grid-template-columns: 1fr auto;
      align-self: center;

      .avatar24 {
        width: 24px;
        height: 24px;
      }
    }

    :deep(.workSpaceContainer) {
      overflow: hidden;
    }

    // :deep(.workspaceCZone) {
    //   height: 100%;
    //   display: flex;
    //   flex-direction: column;
    // }

    :deep(.panelContent) {
      padding: 0;
    }

    .content-row {
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-border);
    }
  }
}
</style>
