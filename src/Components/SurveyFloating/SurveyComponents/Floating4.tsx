import { useState } from 'react';
import Input1 from '../../Survey/Input/Input1';
import { useLocation, useNavigate } from 'react-router';
import { useGetSubCategoriesQuery } from '../../../redux/apis/surveyApi';
import { useDispatch } from 'react-redux';
import { setSurveyOne } from '../../../redux/slices/surveySlice';

function Floating4() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryId = useLocation().state.categoryId;

  console.log(categoryId);

  let questions: string[] = [];

  if (categoryId === 7) {
    questions = ['부동산/임대차', '재테크/재무관리', '공인중개사 준비'];
  } else {
    questions = [
      '기본 설정(앱 설치, 환경설정 등)',
      '기본 활용(카메라, 갤러리 등)',
      '실생활 활용(카카오톡, 모바일 주문, 배달 앱 등)',
    ];
  }

  const [isCheckedFirst, setIsCheckedFirst] = useState([false, false, false]);
  const [isCheckedMulti, setIsCheckedMulti] = useState([false, false]);

  const handleChangeFirst = (index: number, isChecked: boolean) => {
    const updatedArray = [...isCheckedFirst];
    updatedArray[index] = isChecked;
    setIsCheckedFirst(updatedArray);
  };

  const handleChangeMulti = (index: number, isChecked: boolean) => {
    const updatedArray = [...isCheckedMulti];
    updatedArray[index] = isChecked;
    setIsCheckedMulti(updatedArray);
  };

  const nextHandler = () => {
    dispatch(
      setSurveyOne({
        sub_categoryIds: isCheckedFirst
          .map((value, index) => {
            if (categoryId === 7) {
              return value ? index + 9 : null;
            } else {
              return value ? index + 1 : null;
            }
          })
          .filter((value): value is number => value !== null),
      }),
    );
    navigate('/floating?page=5');
  };

  return (
    <div>
      <div className="flex w-full survey h-4/6">
        <div className="box1 m-14">
          <div className="flex question">
            <p className=" text-[18px] font-semibold">
              2. 어떤 것을 배우고 싶으세요?
            </p>
            <p className=" ml-[16px] mt-[6px] text-[14px] text-[#999999]">
              복수 응답 가능
            </p>
          </div>
          <div className="mt-6 click">
            <Input1
              question={questions[0]}
              isChecked={isCheckedFirst[0]}
              onChange={(isChecked) => handleChangeFirst(0, isChecked)}
            />
            <Input1
              question={questions[1]}
              isChecked={isCheckedFirst[1]}
              onChange={(isChecked) => handleChangeFirst(1, isChecked)}
            />
            <Input1
              question={questions[2]}
              isChecked={isCheckedFirst[2]}
              onChange={(isChecked) => handleChangeFirst(2, isChecked)}
            />
          </div>
        </div>
        <div className="box1 m-14">
          <div className="flex question">
            <p className=" text-[18px] font-semibold">
              3. 어떻게 배우고 싶으세요?
            </p>
            <p className=" ml-[16px] mt-[6px] text-[14px] text-[#999999]">
              복수 응답 가능
            </p>
          </div>
          <div className="mt-6 click">
            <Input1
              question="교육기관 방문"
              isChecked={isCheckedMulti[0]}
              onChange={(isChecked) => handleChangeMulti(0, isChecked)}
            />
            <Input1
              question="우리 집으로 선생님 방문"
              isChecked={isCheckedMulti[1]}
              onChange={(isChecked) => handleChangeMulti(1, isChecked)}
            />
          </div>
        </div>
      </div>
      <button
        onClick={nextHandler}
        className=" hover:opacity-80  w-[240px] h-[51px] bg-primary01 rounded-[50px] text-white ml-[451px] mt-[60px] flex justify-center py-3"
      >
        <p className="font-medium">다음으로</p>
        <img
          className="px-1 py-1 "
          src="/assets/Survey/nextimg.svg"
          alt="img"
        />
      </button>
    </div>
  );
}

export default Floating4;
