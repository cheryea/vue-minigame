<template>
  <article class="pc-widths mobile-paddings">
    <div class="intro-wrap">
      <h1>반응속도 테스트</h1>
      <p>시각적 자극에 대한 자신의 반응 속도를 알아볼 수 있는 간단한 테스트입니다.</p>
      <p>빨간색 박스가 초록색으로 변할 때 최대한 빨리 탭 또는 클릭하면 됩니다.</p>
    </div>
    <div class="content">
        <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
        <div v-if="result.length">
          <div>평균 시간: {{ average }}ms</div>
          <button @click="onReset">리셋</button>
        </div>
    </div>
  </article>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
  data() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요.',
    };
  },
  computed: {
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
    }
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickScreen() {
      if (this.state === 'waiting') {
        this.state = 'ready';
        this.message = '초록색이 되면 클릭하세요.';
        timeout = setTimeout(() => {
          this.state = 'now';
          this.message = '지금 클릭!';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
      } else if (this.state === 'ready') {
        clearTimeout(timeout);
        this.state = 'waiting';
        this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
      } else if (this.state === 'now') {
        endTime = new Date();
        this.state = 'waiting';
        this.message = '클릭해서 시작하세요.';
        this.result.push(endTime - startTime);
      }
    }
  },
};
</script>

<style scoped>
  #screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
    margin: 0 auto;
  }

  #screen.waiting {
    background-color: aqua;
  }

  #screen.ready {
    background-color: red;
    color: white;
  }

  #screen.now {
    background-color: greenyellow;
  }
</style>
