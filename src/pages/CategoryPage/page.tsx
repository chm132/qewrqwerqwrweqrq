import { useLocation, useParams } from 'react-router-dom';
import TimeLine from '../../Components/TimeLine';
import { useGetCategoryLessonsQuery } from '../../redux/apis/lessonApi';
import FilterBox from '../../Components/Announcement/FilterBox';
import LessonCard from '../../Components/Announcement/LessonCard';
import Pagination from '../../Components/Pagination';
import { useScroll } from '../../utils/useScroll';
import { useState } from 'react';
import { useDebounce } from '../../utils/useDebounce';
import FloatingButton from '../../Components/Home/FloatingButton';

export const categoryMapping: { [key: string]: string } = {
  스마트폰: 'smartphone',
  컴퓨터: 'computer',
  키오스크: 'kiosk',
  외국어: 'foreignLanguage',
  운동: 'exercise',
  공예: 'art',
  부동산: 'estate',
  심리: 'mental',
  '취업/창업': 'employ',
  요리: 'cook',
  악기: 'instrument',
  자산: 'asset',
};

const CategoryPage = () => {
  const categoryName = useParams()?.category || '스마트폰';
  const categoryId = Number(useParams()?.categoryId);

  // params로 넘기는거 지역 상태로 관리
  // 첫 번째 Params 설정 - keyword
  const [keyword, setKeyword] = useState('');
  const enteredKeyword = useDebounce(keyword, 500);

  // 두 번째 Params 설정 - orderCriteria
  // default: createdAt(최신순), gatherEndDate(마감순), join(선착순)
  const [selectedOrderCriteria, setSelectedOrderCriteria] =
    useState('createdAt');

  const [freeClick, setFreeClick] = useState(false);

  const { y: scrollHeight } = useScroll();
  const fixStandard = scrollHeight > 500; // display: fixed 이정표 역할

  // 원래는 아래 코드를 사용해야함
  let pageNo = new URLSearchParams(useLocation().search).get('pageNo');

  if (!pageNo) {
    pageNo = '1';
  }

  const { data, error } = useGetCategoryLessonsQuery({
    categoryId,
    pageNo,
    keyword: enteredKeyword,
    orderCriteria: selectedOrderCriteria,
  });
  // error가 뜬경우 해당 페이지에 대한 데이터가 존재하지 않으면 에러가 남
  // 에러 메시지 꼭 읽어보기
  let content;

  if (error) {
    content = <p>찾으시는 교육이 없습니다.</p>;
  }

  if (data) {
    let lessonData = data.result.lessonPreviewDTOList;

    if (freeClick) {
      lessonData = lessonData.filter((lesson) => lesson.price === 0);
    }

    content = (
      <div className="bg-gray-100">
        <section className="grid grid-cols-4 gap-8 py-12 px-44">
          {lessonData.map((lesson, index) => (
            <LessonCard
              key={index}
              id={lesson.lessonId}
              img={lesson.imageUrl}
              title={lesson.title}
              endDate={lesson.lessonEndDate}
              startDate={lesson.lessonStartDate}
              endTime={lesson.lessonEndTime}
              startTime={lesson.lessonStartTime}
              gatherEndDate={lesson.gatherEndDate}
            />
          ))}
        </section>
        <Pagination
          page={Number(pageNo)}
          totalItems={freeClick ? lessonData.length : data.result.totalElements} // freeClick이 false일때
          perPage={10}
        />
      </div>
    );
  }

  return (
    <div>
      <TimeLine
        title={categoryName}
        imgSrc={`/assets/TimeLine/${categoryMapping[categoryName]}.png`}
        contents={(() => {
          if (categoryName === '스마트폰') {
            return '스마트폰에 있는 디지털 서비스 사용이 어려우신가요? 올래에서 함께 배우세요!';
          } else if (categoryName === '컴퓨터') {
            return '컴퓨터 하나만 제대로 배워도 할 수 있는 것들이 아주 많죠! 올래에서 한번 배워볼까요?';
          } else if (categoryName === '키오스크') {
            return '요즘은 어딜가나 키오스크를 많이 쓰죠. 걱정 마세요! 올래가 있으니까요!';
          } else if (categoryName === '공예') {
            return '손으로 무언갈 만드는 걸 좋아하시나요? 유리, 가죽, 펠트, 도자기 등등 다양하게 배워 봐요!';
          } else if (categoryName === '요리') {
            return '요리를 처음 시작하시는 분들, 또는 새로운 음식에 도전해보고 싶으신 분들 모두 올래로 모여요!';
          } else if (categoryName === '운동') {
            return '건강한 노후 생활, 그 첫걸음은 바로 운동 입니다. 꾸준한 운동으로 내 건강 내가 책임져요!';
          } else if (categoryName === '악기') {
            return '좋아하는 악기가 있나요? 연주해보고 싶은 악기가 있나요? 올래가 쉽고 재미있게 가르쳐 드릴게요.';
          } else if (categoryName === '자산') {
            return '제 2의 인생 계획에 꼭 필요한 자산 관리, 올래와 함께라면 어렵지 않을 거에요!';
          } else if (categoryName === '부동산') {
            return '부동산 입문 단계부터 공인중개사 준비까지! 어렵지 않아요, 올래가 있잖아요.';
          } else if (categoryName === '취업/창업') {
            return '인생 제 2막을 새롭게 열 준비가 되셨나요? 꿈이 현실이 되는 그 날까지, 올래가 함께할게요.';
          } else {
            return '';
          }
        })()}
      />

      <FilterBox
        fix={fixStandard}
        setKeyword={setKeyword}
        categoryId={categoryId}
        selectedOrderCriteria={selectedOrderCriteria}
        setSelectedOrderCriteria={setSelectedOrderCriteria}
        setFreeClick={setFreeClick}
        freeClick={freeClick}
      />
      {content}
      <FloatingButton />
    </div>
  );
};

export default CategoryPage;
