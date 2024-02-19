// const lessonEndTime = "2024-03-25T07:00:00"; // 수업 종료 시간

// const endTime = new Date(lessonEndTime); // 수업 종료 시간을 Date 객체로 변환
// const endHour = endTime.getHours(); // 종료 시간에서 시간 부분 추출

// console.log(endHour); // 예상 결과: 7
export const getHour = (date: string) => {
  const time = new Date(date);
  return time.getHours();
};
