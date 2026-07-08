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
              <Badge v-if="item.badge" class="ml-auto badge-sm" :value="item.badge" />
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
              <TDarkSwitcher class="mR2"></TDarkSwitcher>
              <TPopoveIcon :items="commentItems" icon="comment" :size="20" :overlay="{ val: 3, color: 'orange' }" class="mR2"></TPopoveIcon>
              <TPopoveIcon :items="bellItems" icon="bell" :size="20" :overlay="{ val: 7, color: 'orange' }" class="mR2"></TPopoveIcon>
              <TPopoveIcon :items="mailItems" icon="mail" :size="20" :overlay="{ val: 1, type: 'dot', color: 'orange' }" class="mR2"></TPopoveIcon>
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
import TPopoveIcon from '@/components/widget/TPopoveIcon.vue';
import type { TPopoverItem } from '@/components/widget/TPopoveIcon.vue';
import TDarkSwitcher from '@/components/widget/TDarkSwitcher.vue';

import { useToast } from 'primevue/usetoast';

const panelPt: PanelPassThroughOptions = {
  root: { class: 'workSpaceWrpper fullH-H overHidden' },
  header: { class: 'workSpaceHeader fullWH' },
  contentContainer: { class: 'workSpaceContainer p2 fullH overHidden' },
  contentWrapper: { class: 'workspaceCZone fullWH overHidden' },
  content: { class: 'panelContent fullWH overHidden' }
};

const avatarPt: AvatarPassThroughOptions = {
  root: { class: 'avatar20' }
};

const toast = useToast();

const AVATAR_BASE = 'https://i.pravatar.cc/40?u=';

const commentItems = ref<TPopoverItem[]>([
  { label: 'Amy Elsner', description: 'Re: Project timeline update', value: '1', image: `${AVATAR_BASE}amy` },
  { label: 'Bernardo Dominic', description: 'Design review completed', value: '2', image: `${AVATAR_BASE}bernardo` },
  { label: 'Ioni Bowcher', description: 'Meeting notes from sprint', value: '3', image: `${AVATAR_BASE}ioni` }
]);

const bellItems = ref<TPopoverItem[]>([
  { label: 'System Update', description: 'v2.4.1 deployed to staging', value: 'update', icon: 'info' },
  { label: 'New User', description: 'John joined your workspace', value: 'user', icon: 'success' },
  { label: 'Server Alert', description: 'CPU usage exceeded 90%', value: 'alert', icon: 'warning' }
]);

const mailItems = ref<TPopoverItem[]>([
  { label: 'Xavit Wiliams', description: 'Invoice #2024-08 attached', value: 'inbox', image: `${AVATAR_BASE}xavit` },
  { label: 'Sonya Kaur', description: 'Q3 report for your review', value: 'sent', image: `${AVATAR_BASE}sonya` },
  { label: 'Tara Williams', description: 'Meeting rescheduled to 3pm', value: 'drafts', image: `${AVATAR_BASE}tara` }
]);

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
  background-color: var(--p-bg-page);
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  .sliderMenu {
    display: grid;
    grid-template-rows: 100px 1fr 48px;
    row-gap: 8px;
    background-color: var(--p-content-background);
  }

  .workSpaceWrpper {
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: transparent;

    :deep(.workSpaceHeader) {
      display: grid;
      grid-template-columns: 1fr auto;
      align-self: center;

      .avatar20 {
          width: 20px;
          height: 20px;
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

:deep(.badge-sm) {
  font-size: 0.6rem;
  min-width: 1.2rem;
  height: 1.2rem;
  padding: 0 0.3rem;
  border-radius: 3px;
  line-height: 1;
}
</style>
