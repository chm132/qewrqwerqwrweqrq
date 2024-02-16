import { useLocation } from 'react-router-dom';
import { useGetDetailLessonQuery } from '../../redux/apis/lessonApi';
import LeassonDetail from '../../Components/LessonComponent/LeassonDetail';
import Apply from '../../Components/LessonComponent/Apply';
import { useScroll } from '../../utils/useScroll';
import LoginModal from '../../Components/AlertModal/LoginModal';
import { useState } from 'react';

const LessonPage = () => {
  const [showNonLoginModal, setShowNonLoginModal] = useState(false);
  const { y: scrollHeight } = useScroll();
  const fixStandard = scrollHeight > 500; // display: fixed 이정표 역할

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const lessonId = query.get('lessonId');

  const { data, isLoading, error } = useGetDetailLessonQuery(Number(lessonId));
  let content;

  if (isLoading) {
    content = <p>해당 공고 준비중입니다...</p>;
  }

  if (error) {
    content = <p>Network Error...</p>;
  }

  if (data) {
    const detailLessonData = data.result;
    content = (
      <div className=" w-[1142px] m-auto flex gap-4">
        <div className="w-[756px] bg-[#FFFFFF] mt-8 rounded-3xl pb-10 mb-12">
          <LeassonDetail
            title={detailLessonData.title}
            categoryId={detailLessonData.categoryId}
            description={detailLessonData.description}
            lessonStartDate={detailLessonData.lessonStartDate}
            lessonEndDate={detailLessonData.lessonEndDate}
            lessonStartTime={detailLessonData.lessonStartTime}
            lessonEndTime={detailLessonData.lessonEndTime}
            lessonTeacher={detailLessonData.lessonTeacherList[0].name}
            limitCount={detailLessonData.limitCount}
            lessonType={detailLessonData.lessonType}
            price={detailLessonData.price}
            supplies={detailLessonData.supplies}
          />
        </div>
        <div
          className={`${
            fixStandard && 'fixed right-[149px] -top-10'
          } w-[370px] bg-[#FFFFFF] rounded-3xl mt-8 mb-12`}
        >
          <Apply
            lessonTeacher={detailLessonData.lessonTeacherList[0].name}
            title={detailLessonData.title}
            price={detailLessonData.price}
            lessonStartDate={detailLessonData.lessonStartDate}
            lessonEndDate={detailLessonData.lessonEndDate}
            currentCount={detailLessonData.currentCount}
            limitCount={detailLessonData.limitCount}
            lessonId={Number(lessonId)}
            setShowModal={setShowNonLoginModal}
          />
        </div>
        {showNonLoginModal && (
          <LoginModal setShowNonLoginModal={setShowNonLoginModal} />
        )}
      </div>
    );
  }

  return <div className=" w-full bg-[#F2F2F2] relative">{content}</div>;
};

export default LessonPage;
