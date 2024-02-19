import { useNavigate } from 'react-router-dom';
import { formatTime, fromNow } from '../../utils/dayjs';
import { getHour } from '../../utils/getHour';

interface LessonCardProps {
  id: number;
  img: string;
  title: string;
  endDate: string;
  startDate: string;
  endTime: string;
  startTime: string;
  gatherEndDate: string;
}

const LessonCard = ({
  id,
  img,
  title,
  endDate,
  startDate,
  endTime,
  startTime,
  gatherEndDate,
}: LessonCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-64 border-2 rounded-[18px] shadow-lg cursor-pointer hover:scale-105 hover:ease-in-out transition-all"
      onClick={() => navigate(`/lesson?lessonId=${id}`)}
    >
      <img
        src={img}
        alt="lesson-img"
        className="object-cover w-64 h-64 rounded-t-[18px]"
      />
      <section className="w-full p-4">
        <p className="mb-2">{title}</p>
        <p className="text-sm font-medium text-[#666666] mb-2">
          {formatTime(startDate, 'YYYY.MM.DD (ddd)')} ~{' '}
          {formatTime(endDate, 'MM.DD (ddd)')}
        </p>
        <p className="text-sm font-medium text-[#666666]">
          {formatTime(startTime, 'HH:mm') + '~' + formatTime(endTime, 'HH:mm')}{' '}
          ({getHour(endTime) - getHour(startTime)}시간)
        </p>
      </section>
      <span className="absolute right-0 flex items-center justify-center w-16 h-8 rounded-tl-lg top-56 bg-primary01">
        <p className="text-sm font-semibold text-white">
          {fromNow(gatherEndDate)}일 남음
        </p>
      </span>
    </div>
  );
};

export default LessonCard;
