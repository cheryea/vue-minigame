<template>
  <article class="pc-widths mobile-paddings">
    <div class="intro-wrap">
      <h1>숫자야구</h1>
      <p>총 10번의 기회 안에 랜덤한 4자리의 숫자를 맞추는 게임입니다.
      </p>
      <p>숫자와 자리가 정확하게 일치한 경우 '스트라이크'<br>숫자는 일치하지만 자리가 일치하지 않을 경우 '볼'</p>
    </div>
    <div class="content">
      <h1>{{ result }}</h1>
      <form @submit.prevent="onSubmitForm">
        <input ref="inputRef" minlength="4" maxlength="4" v-model="value" />
        <button type="submit">입력</button>
      </form>
      <div>시도 : {{ tries.length }}</div>
      <ul>
        <li v-for="t in tries" :key="t.try">
          <div>{{ t.try }}</div>
          <div>{{ t.result }}</div>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(
      Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;

};

export default {
  data() {
    return {
      answer: getNumbers(), // ex) [1,5,3,4]
      tries: [], // 시도
      value: '', // 입력
      result: '', // 결과
    }
  },
  methods: {
    onSubmitForm() {
      if (this.value === this.answer.join('')) { //정답 맞췄을 때
        alert('홈런! 게임을 리셋합니다.');
        this.result = `홈런! 답은 ${this.answer.join('')}가 맞았습니다.`
        this.answer = getNumbers();
        this.tries = [];
        this.value = '';
        this.$refs.inputRef.focus();
      } else if (this.tries.length >= 9) { // 정답 틀렸을 때
        this.result = `10번 넘게 틀리셨습니다. 답은 ${this.answer.join('')} 였습니다.`
        alert('10번 넘게 틀려서 게임을 다시 시작합니다.')
        this.answer = getNumbers();
        this.tries = [];
        this.value = '';
        this.$refs.inputRef.focus();
      } else {
        let strike = 0;
        let ball = 0;
        const answerArray = this.value.split('').map(v => parseInt(v));
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.answer[i]) {
            strike++;
          } else if (this.answer.includes(answerArray[i])) {
            ball++;
          }
        }
        this.tries.push({
          try: this.value,
          result: `${strike} 스트라이크, ${ball}볼입니다.`,
        });
        this.value = '';
        this.$refs.inputRef.focus();
      }
    }
  }
};
</script>

<style></style>
