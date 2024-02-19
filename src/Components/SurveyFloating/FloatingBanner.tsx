import { Outlet } from 'react-router-dom';

const FloatingBanner = () => {
  return (
    <div>
      <div className="relative w-full mt-5 h-80">
        <img
          alt="임시 배너"
          src="/assets/TimeLine/floating.png"
          className="w-full h-80"
        />
        <section className="absolute top-[44%] left-[40%] text-center text-white">
          <p className="pb-10 text-6xl font-semibold">딱 맞는 교육 찾기</p>
          <p className="text-sm w-[300px]">
            배우고 싶은 마음만 있다면 준비 완료! 올래가 딱 맞는 교육을 찾아
            드릴게요.
          </p>
          내용
        </section>
      </div>
      <Outlet />
    </div>
  );
};

export default FloatingBanner;
