import { useSelector } from 'react-redux';
import { formatTime } from '../../utils/dayjs';
import { RootState } from '../../redux/store';
import {
  usePostApplyMutation,
  usePostLikeMutation,
} from '../../redux/apis/lessonApi';

interface ApplyProps {
  lessonId: string;
  teacher: string;
  title: string;
  price: number;
  gatherStartDate: string;
  gatherEndDate: string;
  limitCount: number;
  currentCount: number;
  applyStatus: boolean;
  likeStatus: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCancel: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLikeLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLikeCancel: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLikeConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Apply({
  lessonId,
  teacher,
  title,
  price,
  gatherStartDate,
  gatherEndDate,
  limitCount,
  currentCount,
  applyStatus,
  likeStatus,
  setShowLogin,
  setShowCancel,
  setShowConfirm,
  setShowLikeLogin,
  setShowLikeCancel,
  setShowLikeConfirm,
}: ApplyProps) {
  const [postApply] = usePostApplyMutation();
  const [postLike] = usePostLikeMutation();
  // 유저가 로그인을 했는지
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn,
  );

  const applyHandler = () => {
    if (currentUser) {
      // 회원일떄
      if (applyStatus) {
        setShowCancel(true);
      } else {
        // 수업 신청하기
        postApply(lessonId);
        setShowConfirm(true);
      }
    } else {
      setShowLogin(true);
    }
  };

  const likeHandler = () => {
    if (currentUser) {
      // 회원일때
      if (likeStatus) {
        // 찜하기 취소 기능
        // 수업 찜하기 취소할래 유도 모달 띄우기
        setShowLikeCancel(true);
      } else {
        postLike(lessonId);
        // 찜하기 성공 모달 떠야함
        setShowLikeConfirm(true);
      }
    } else {
      // 비회원이 감히 찜하기 누르려 할 때 로그인 모달 띄우기
      setShowLikeLogin(true);
    }
  };

  return (
    <div>
      <div className="1 h-[21px] text-[18px] text-[#666666] p-8 font-medium">
        {teacher}
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
            {price === 0 ? '무료' : price.toLocaleString() + '원'}
          </div>
        </div>

        <div className="7 w-full h-[19px] mt-6 flex justify-between items-center">
          <div className="8 w-[100px] h-full text-[#999999] text-[16px]">
            모집 기간
          </div>
          <div className="9 w-[250px] h-full font-medium text-right">
            {formatTime(gatherStartDate, 'YYYY.MM.DD') +
              ' ~ ' +
              formatTime(gatherEndDate, 'MM.DD')}
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
        className={`
          ${
            applyStatus
              ? 'bg-primary01 flex items-center justify-center gap-2'
              : 'bg-[#FFFFFF] border-2 border-primary01'
          }
          w-[306px] h-[51px] rounded-[50px] ml-8 mt-8 mb-4 font-semibold cursor-pointer hover:opacity-80 transition-all 
        `}
        onClick={applyHandler}
      >
        {applyStatus && <img src="/assets/Lesson/check.svg" alt="check" />}
        <p className={`${applyStatus ? 'text-[#FFFFFF]' : 'text-primary01'}`}>
          {applyStatus ? '신청 완료' : '신청하기'}
        </p>
      </button>
      <button
        className={`
          ${
            likeStatus
              ? 'border-primary01 flex items-center justify-center gap-2'
              : 'bg-[#FFFFFF] '
          }
          w-[306px] h-[51px] rounded-[50px] ml-8 mb-[62px] bg-[#FFFFFF] border-[2px] cursor-pointer hover:opacity-80 transition-all 
        `}
        onClick={likeHandler}
      >
        {likeStatus && <img src="/assets/Lesson/heart.svg" alt="heart" />}
        <p
          className={`${
            likeStatus ? 'text-primary01 ' : 'text-[#666666]'
          } font-semibold `}
        >
          {likeStatus ? '찜 완료' : '찜하기'}
        </p>
      </button>
      <div className=" w-[322px] border-[1px] rounded-3xl m-auto mb-8"></div>
      <button className="flex items-center w-[306px] h-[51px] rounded-[50px] ml-8 mb-[17px] bg-[#FFEB00] font-semibold text-[#3C1E1E] cursor-pointer hover:opacity-80 transition-all ">
        <img
          src="/assets/Lesson/kakao.svg"
          alt="kakao"
          className=" ml-[55px] mr-2"
        />
        카카오톡으로 공유하기
      </button>
      <button className="flex items-center w-[306px] h-[51px] rounded-[50px] ml-8 mb-[62px] bg-[#25CA33] font-semibold text-[#FFFFFF] cursor-pointer hover:opacity-80 transition-all ">
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
