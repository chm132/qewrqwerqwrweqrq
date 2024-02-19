import { formatTime } from '../../utils/dayjs';
import { transEnCategoryId } from '../../utils/transKrCategoryId';
import LeassonInput from './Input';
import LeassonInput2 from './Input2';

interface LessonDetailProps {
  title: string;
  description: string;
  categoryId: number;
  gatherStartDate: string;
  gatherEndDate: string;
  lessonStartTime: string;
  lessonEndTime: string;
  teacher: string;
  limitCount: number;
  lessonType: string;
  price: number;
  supplies: string;
}

function LeassonDetail({
  title,
  description,
  categoryId,
  gatherStartDate,
  gatherEndDate,
  lessonStartTime,
  lessonEndTime,
  teacher,
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

      <div className="1 w-[523px] gap-10 m-auto mt-10">
        <div className="flex w-full gap-4 2">
          <div className="flex items-center justify-center w-16 h-16 rounded-full shadow-md 3 bg-primary01 bg-opacity-85">
            <img
              src={`/assets/Category/${transEnCategoryId(categoryId)}.svg`}
              alt="임시 카테고리 이미지"
            />
          </div>
          <div className="4 w-[443px] h-full text-[18px] leading-[27px] font-normal ">
            {description}
          </div>
        </div>
        <div className="mt-10 5 ">
          <LeassonInput
            iconSrc="/assets/Lesson/date.svg"
            label="일 &nbsp;시"
            value={
              formatTime(gatherStartDate, 'YYYY.MM.DD (ddd)') +
              ' ~ ' +
              formatTime(gatherEndDate, 'MM.DD(ddd)') +
              ' ' +
              formatTime(lessonStartTime, 'HH:mm') +
              '~' +
              formatTime(lessonEndTime, 'HH:mm')
            }
          />
          <LeassonInput
            iconSrc="/assets/Lesson/teacher.svg"
            label="강 &nbsp;사"
            value={teacher}
          />
          <LeassonInput
            iconSrc="/assets/Lesson/personnel.svg"
            label="인 &nbsp;원"
            value={String(limitCount)}
          />
          <LeassonInput2
            iconSrc="/assets/Lesson/book.svg"
            label="학습방법"
            value={lessonType === 'OFFLINE' ? '오프라인' : '온라인'}
          />
          <LeassonInput
            iconSrc="/assets/Lesson/pay.svg"
            label="수 강 료"
            value={price === 0 ? '무료' : price.toLocaleString() + '원'}
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
      />
      <img src="/assets/Lesson/Announcement2.svg" alt="공고샘플 수강료" />
    </div>
  );
}

export default LeassonDetail;
