<template>
  <span class="tScreenServer">
    <TIcon name="screenServer" :size="18" :strokeWidth="1.8" clickAble @click="lock" />
    <BlockUI v-if="isLocked" fullScreen :blocked="isLocked" autoZIndex :baseZIndex="1000">
      <div class="lockScreen">
        <div class="aurora"></div>
        <div class="scanline"></div>
        <div ref="particlesRef" class="particles"></div>

        <div class="lockContent">
          <div class="clock">{{ timeStr }}</div>
          <div class="date">{{ dateStr }}</div>

          <div class="passwordBox flexXY mY2">
            <input v-model="uPwdStr" type="password" maxlength="8" placeholder="输入解锁密码"
              class="passwordInput textCenter flexSplit" @keyup.enter="unlock" ref="pwdInputRef" />

          </div>
        </div>
      </div>
    </BlockUI>
  </span>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import BlockUI from 'primevue/blockui';
import TIcon from '@/components/widget/TIcon.vue';

const isLocked = ref(false);
const pwdInputRef = ref<HTMLInputElement | null>(null);
const particlesRef = ref<HTMLElement | null>(null);

const timeStr = ref('00:00');
const dateStr = ref('');
const uPwdStr = ref('');


let clockTimer: ReturnType<typeof setInterval> | null = null;
let particleTimer: ReturnType<typeof setInterval> | null = null;

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

const updateClock = () => {
  const now = new Date();
  timeStr.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  dateStr.value = `${now.getFullYear()}年${MONTHS[now.getMonth()]}${now.getDate()}日 ${WEEKDAYS[now.getDay()]}`;
};

const spawnParticle = () => {
  const container = particlesRef.value;
  if (!container) return;
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 3 + 1.2;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${Math.random() * 100}vw`;
  p.style.top = '105vh';
  p.style.opacity = `${Math.random() * 0.6 + 0.35}`;
  const duration = Math.random() * 32 + 26;
  p.style.animationDuration = `${duration}s`;
  const drift = (Math.random() - 0.5) * 140;
  p.style.transform = `translateX(${drift}px)`;
  container.appendChild(p);
  setTimeout(() => p.remove(), duration * 1000 + 200);
};

const startParticles = () => {
  for (let i = 0; i < 28; i++) {
    setTimeout(spawnParticle, i * 90);
  }
  particleTimer = setInterval(() => {
    if (Math.random() > 0.35) spawnParticle();
  }, 160);
};

const stopParticles = () => {
  if (particleTimer) clearInterval(particleTimer);
  particleTimer = null;
};

const lock = () => {
  document.querySelectorAll('.p-blockui-mask').forEach(m => m.remove());
  isLocked.value = true;
  updateClock();
  clockTimer = setInterval(updateClock, 1000);
  setTimeout(() => startParticles(), 50);
};

const unlock = () => {
  isLocked.value = false;
  stopParticles();
  if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
  setTimeout(() => document.querySelectorAll('.p-blockui-mask').forEach(m => m.remove()));
};

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer);
  stopParticles();
});
</script>

<style lang="scss" scoped>
:global(.p-blockui-mask) {
  background: #000 !important;
}

.tScreenServer {
  position: relative;
}

.lockScreen {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  font-family: 'Inter', system-ui, sans-serif;
  color: #fff;
  overflow: hidden;
}

.aurora {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 25% 30%, rgba(120, 180, 255, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 75% 70%, rgba(180, 120, 255, 0.05) 0%, transparent 50%);
  animation: auroraAnim 35s ease infinite alternate;
  z-index: 1;
}

@keyframes auroraAnim {
  0% {
    opacity: 0.55;
    transform: translate(0, 0);
  }

  100% {
    opacity: 0.75;
    transform: translate(6px, -10px);
  }
}

.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 50%, rgba(100, 200, 255, 0.025) 50%);
  background-size: 100% 4px;
  animation: scan 8s linear infinite;
  pointer-events: none;
  z-index: 2;
  opacity: 0.35;
}

@keyframes scan {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(100%);
  }
}

.particles {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

:global(.particle) {
  position: absolute;
  background: #a5b4fc;
  border-radius: 50%;
  box-shadow: 0 0 10px #c4d0ff;
  animation: particleFloat linear forwards;
}

@keyframes particleFloat {
  to {
    transform: translateY(-110vh) scale(0.35);
    opacity: 0;
  }
}

.lockContent {
  position: relative;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.clock {
  font-family: 'Roboto Mono', monospace;
  font-size: 7.2rem;
  font-weight: 300;
  letter-spacing: -0.06em;
  text-shadow:
    0 0 35px rgba(96, 165, 250, 0.5),
    0 0 70px rgba(147, 197, 253, 0.3);
  animation: clockPulse 10s ease-in-out infinite;
}

@keyframes clockPulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.96;
  }
}

.date {
  font-size: 1.55rem;
  letter-spacing: 0.06em;
  opacity: 0.7;
  margin-top: 0.4rem;
}

.passwordBox {
  width: 100%;
  max-width: 240px;
}

.passwordInput {
  width: 100%;
  background: transparent;
  border: none;
  padding: 8px 24px;
  border-radius: 50px;
  color: #fff;
  font-size: 16px;
  letter-spacing: 0.6rem;
  outline: none;
  transition: all 0.4s ease;

  &:focus {
    border: 1px solid #60a5fa;
    box-shadow: 0 0 30px rgba(96, 165, 250, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
    letter-spacing: normal;
  }
}
</style>
