// 피그마의 공고 상세 컴포넌트 입니다!
import { formatTime } from '../../utils/dayjs';
import LeassonInput from './Input';
import LeassonInput2 from './Input2';

interface LessonDetailProps {
  title: string;
  categoryId: number;
  description: string;
  lessonStartDate: string;
  lessonEndDate: string;
  lessonStartTime: string;
  lessonEndTime: string;
  lessonTeacher: string;
  limitCount: number;
  lessonType: string;
  price: number;
  supplies: string;
}

function LeassonDetail({
  title,
  categoryId,
  description,
  lessonStartDate,
  lessonEndDate,
  lessonStartTime,
  lessonEndTime,
  lessonTeacher,
  limitCount,
  lessonType,
  price,
  supplies,
}: LessonDetailProps) {
  return (
    <div className="w-[603px] rounded-3xl m-auto mt-8">
      <div className=" w-full h-auto min-h-[176px] bg-primary01 rounded-t-3xl overflow-hidden break-keep p-10 text-center font-bold text-[30px] text-[#FFFFFF]">
        {title}
      </div>

      <div className="1 w-[523px] h-[733px] gap-10 m-auto mt-10">
        <div className="2 w-full h-[81px] gap-4 flex">
          <div className="flex items-center justify-center w-16 h-16 rounded-full shadow-md 3 bg-primary01 bg-opacity-85">
            <img
              src={`/assets/Lesson/category/${categoryId}.svg`}
              alt="category-img"
            />
          </div>
          <div className="4 w-[443px] h-full text-[18px] leading-[27px] font-normal ">
            {/* 1. 카카오톡의 다양한 기능을 알아보는 과정 (카메라, 오픈채팅방,
            카카오T, 카카오 선물하기 등)
            <br /> 2. 배달앱, 건강기록앱, 캘린더앱 사용방법 알아보기 */}
            1. {description}
          </div>
        </div>
        <div className="mt-10 5 ">
          <LeassonInput
            iconSrc="/assets/Lesson/date.svg"
            label="일 &nbsp;시"
            // value="2024.2.8(목) ~ 3.29.(금) 14:00~16:00"
            value={
              formatTime(lessonStartDate, 'YYYY.MM.DD(ddd)') +
              ' ~ ' +
              formatTime(lessonEndDate, 'MM.DD(ddd)') +
              '  ' +
              formatTime(lessonStartTime, 'hh:mm') +
              '~' +
              formatTime(lessonEndTime, 'hh:mm')
            }
          />
          <LeassonInput
            iconSrc="/assets/Lesson/teacher.svg"
            label="강 &nbsp;사"
            value={lessonTeacher}
          />
          <LeassonInput
            iconSrc="/assets/Lesson/personnel.svg"
            label="인 &nbsp;원"
            value={String(limitCount)}
          />
          <LeassonInput2
            iconSrc="/assets/Lesson/book.svg"
            label="학습방법"
            value={lessonType === 'ONLINE' ? '온라인' : '오프라인'}
          />
          <LeassonInput
            iconSrc="/assets/Lesson/pay.svg"
            label="수 강 료"
            // value="20,000원"
            value={price === 0 ? '무료' : `${price.toLocaleString()}원`}
          />
          <LeassonInput2
            iconSrc="/assets/Lesson/stuff.svg"
            label="준 비 물"
            value={supplies}
          />
        </div>
      </div>
      <img
        src="/assets/Lesson/Announcement.svg"
        alt="공고샘플 승인 대기 여부"
        className=" mt-[49px] mb-[30px]"
      />
      <img src="/assets/Lesson/Announcement2.svg" alt="공고샘플 수강료" />
    </div>
  );
}

export default LeassonDetail;

//w-full h-auto min-h-[176px] bg-primary01 rounded-t-3xl overflow-hidden break-all p-10 text-center text-[32px] font-bold text-[#FFFFFF]
