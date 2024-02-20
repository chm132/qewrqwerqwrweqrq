import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPhoneNum } from '../../../../redux/slices/joinPhoneSlice';

const FirstArea = () => {
  const dispatch = useDispatch();

  const [enteredPhoneNum, setEnteredPhoneNum] = useState('');

  const navigate = useNavigate();

  const nextHandler = () => {
    if (enteredPhoneNum.length > 0) {
      dispatch(setPhoneNum({ phoneNum: enteredPhoneNum }));
      navigate('/auth/join/2');
    }
  };

  return (
    <div className="mt-10 mb-48 px-96 ">
      <div className="my-5">
        <div className="flex flex-col items-center justify-center gap-6 mb-5">
          <p className="text-2xl font-semibold">휴대폰 번호 입력</p>
          <section className="relative my-5">
            <input
              placeholder="휴대폰 번호 입력 (-없이 숫자만 입력)"
              className="pl-12 py-4 bg-[#F2F2F2] rounded-lg outline-none transition placeholder-[#B3B3B3] w-[500px] text-[#B3B3B3]"
              value={enteredPhoneNum}
              onChange={(e) => setEnteredPhoneNum(e.target.value)}
            />
            <img
              src="/assets/MyPage/enterPhone.svg"
              alt="icon"
              className="absolute left-4 top-4"
            />
          </section>
          <button
            className="text-white bg-primary01 rounded-[50px] w-[500px] font-semibold py-3 hover:opacity-80 transition-all"
            onClick={nextHandler}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstArea;
