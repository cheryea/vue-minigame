<template>
    <article class="pc-widths mobile-paddings">
        <div class="intro-wrap">
            <h1>반응속도 테스트</h1>
            <p>시각적 자극에 대한 자신의 반응 속도를 알아볼 수 있는 간단한 테스트입니다.</p>
            <p>빨간색 박스가 초록색으로 변할 때 최대한 빨리 탭 또는 클릭하면 됩니다.</p>
        </div>
        <div class="content">
            <h1>{{ result }}</h1>
            <form @submit.prevent="onSubmitForm">
                <input ref="answer" minlength="4" maxlength="4" v-model="value" />
                <button type="submit">입력</button>
            </form>
            <div>시도: {{ tries.length }}</div>
            <ul>
                <li v-for="t in tries" :key="t.try">
                    <div>{{ t.try }}</div>
                    <div>{{ t.result }}</div>
                </li>
            </ul>
        </div>
    </article>
</template>
-
<script>
const getNumbers = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {

        console.log(candidates, array, "1");            // 원소를 하나 빼기 전의 상황
        const chosen = candidates.splice(
            Math.floor(Math.random() * (9 - i)),
            1
        )[0];
        array.push(chosen);
        console.log(candidates, array);          // 원소를 하나 뺀 후의 상황
    }
    return array;
};

export default {
    data() {
        return {
            answer: getNumbers(), // ex) [1,5,3,4]
            tries: [], // 시도 수
            value: '', // 입력
            result: '', // 결과
        }
    },
    methods: {
        onSubmitForm() {
            if (this.value === this.answer.join('')) { // 정답 맞췄으면 (join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만든다)
                this.tries.push({
                    try: this.value,
                    result: '홈런',
                });
                this.result = '홈런';
                alert('게임을 다시 실행합니다.');
                this.value = '';
                this.answer = getNumbers();
                this.tries = [];
                this.$refs.answer.focus();
            } else { // 정답 틀렸을 때
                if (this.tries.length >= 9) { // 10번째 시도
                    this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')}였습니다!`;
                    alert('게임을 다시 시작합니다.');
                    this.value = '';
                    this.answer = getNumbers();
                    this.tries = [];
                    this.$refs.answer.focus();
                }
                let strike = 0;
                let ball = 0;
                const answerArray = this.value.split('').map(v => parseInt(v)); //(split() 메서드는 특정 구분자를 기준으로 문자열을 분리하여 결과를 배열로 반환한다)
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === this.answer[i]) { // 숫자 자릿수 모두 정답
                        strike++;
                    } else if (this.answer.includes(answerArray[i])) { // 숫자만 정답 (includes() 메서드는 하나의 문자열이 다른 문자열에 포함되어 있는지를 판별하고, 결과를 true 또는 false 로 반환합니다)
                        ball++;
                    }
                }
                this.tries.push({
                    try: this.value,
                    result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                });
                this.value = '';
                this.$refs.answer.focus();
            }
        }
    }
};
</script>

<style></style>
