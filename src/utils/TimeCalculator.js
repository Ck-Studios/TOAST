class TimeCalculator {
  getAge(time) {
    // TODO : 시간 함수 새로 만듬. 정확한지 확인 후 DueDate도 같은 로직으로 변경
    // TODO : 오늘인 경우, 시간 별, 분 별, 조금 전 정밀도로 수정
    const _today = new Date();
    const _time = new Date(time);

    let before = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate());
    let after = new Date(_time.getFullYear(), _time.getMonth(), _time.getDate());
    let gap = before - after;
    let age = gap / (1000 * 86400);

    if (age === 0) {
      before = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate());
      after = new Date(_time.getFullYear(), _time.getMonth(), _time.getDate());
      return "오늘";

    } else {
      return age + "일 전";
    }
  }

  getFormattedTime(time) {
    const _time = new Date(time);
    return `${_time.getFullYear()}년 ${_time.getMonth() + 1}월 ${_time.getDate()}일 ${_time.getHours()}시 ${_time.getMinutes()}분`
  }

  getDueDate(time) {
    const _today = new Date();
    const gap = new Date(time).getTime() - _today.getTime();
    const due = Math.floor(gap / (1000 * 60 * 60 * 24)) + 1;

    if (due === 0) {
      return "오늘 마감";
    } else if (due === 1) {
      return "내일 마감";
    } else if (due < 0) {
      return "기한이 지났습니다";
    } else {
      return due + "일 후 마감";
    }
  }
}

export const timeCalculator = new TimeCalculator();