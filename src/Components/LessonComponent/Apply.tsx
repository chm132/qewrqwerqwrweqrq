import { useSelector } from 'react-redux';
import { formatTime } from '../../utils/dayjs';
import { RootState } from '../../redux/store';

interface ApplyProps {
  lessonTeacher: string;
  title: string;
  price: number;
  lessonStartDate: string;
  lessonEndDate: string;
  currentCount: number;
  limitCount: number;
  lessonId: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Apply({
  lessonTeacher,
  title,
  price,
  lessonStartDate,
  lessonEndDate,
  currentCount,
  limitCount,
  lessonId,
  setShowModal,
}: ApplyProps) {
  const isUser = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn,
  );

  const applyHandler = () => {
    if (isUser) {
      console.log('이제 곧 만들거임');
    }
    setShowModal(true);
  };

  return (
    <div>
      <div className="1 h-[21px] text-[18px] text-[#666666] p-8 font-medium">
        {lessonTeacher}
      </div>
      <div className="2 w-[306px] h-[72px] font-semibold m-auto text-[21px] text-[#1A1A1A] leading-[36px] mt-4">
        {title}
      </div>
      <div className="3 w-[306px] h-[122px] m-8">
        <div className="flex items-center justify-between w-full 4 h-9">
          <div className="5 w-[100px] h-[19px] text-[#999999] text-[16px]">
            수강료
          </div>
          <div className="6 font-semibold text-[24px] text-primary01">
            {price === 0 ? '무료' : `${price.toLocaleString()}원`}
          </div>
        </div>

        <div className="7 w-full h-[19px] mt-6 flex justify-between items-center">
          <div className="8 w-[100px] h-full text-[#999999] text-[16px]">
            모집 기간
          </div>
          <div className="9 w-[250px] h-full font-medium text-right">
            {formatTime(lessonStartDate, 'YYYY.MM.DD') +
              ' ~' +
              formatTime(lessonEndDate, 'YYYY.MM.DD')}
          </div>
        </div>

        <div className="10 w-full h-[19px] mt-6 flex justify-between items-center">
          <div className="11 w-[100px] h-full text-[#999999] text-[16px]">
            모집 인원
          </div>
          <div className="12 w-[250px] h-full font-medium text-right whitespace-nowrap">
            <p className="inline font-medium text-[#333333]">{currentCount}</p>{' '}
            / <p className="inline text-[#666666]">{limitCount}명</p>
          </div>
        </div>
      </div>
      <button
        className=" w-[306px] h-[51px] rounded-[50px] ml-8 mt-8 mb-4 font-semibold  bg-primary01 text-[#FFFFFF] hover:border-2 hover:border-primary01 hover:bg-white hover:text-primary01 transition-all"
        onClick={applyHandler}
      >
        신청하기
      </button>
      <button className="w-[306px] h-[51px] rounded-[50px] ml-8 mb-[62px] bg-[#FFFFFF] font-semibold text-[#666666] border-[2px]">
        찜하기
      </button>
      <div className=" w-[322px] border-[1px] rounded-3xl m-auto mb-8"></div>
      <button className="flex items-center w-[306px] h-[51px] rounded-[50px] ml-8 mb-[17px] bg-[#FFEB00] font-semibold text-[#3C1E1E]">
        <img
          src="/assets/Lesson/kakao.svg"
          alt="kakao"
          className=" ml-[55px] mr-2"
        />
        카카오톡으로 공유하기
      </button>
      <button className="flex items-center w-[306px] h-[51px] rounded-[50px] ml-8 mb-[62px] bg-[#25CA33] font-semibold text-[#FFFFFF]">
        <img
          src="/assets/Lesson/band.svg"
          alt="kakao"
          className=" ml-[85px] mr-2"
        />
        밴드로 공유하기
      </button>
    </div>
  );
}
