import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../hooks/Auth/useLogin';
import Input from '../../../Components/Auth/Join/Input';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      emailOrPhoneNum: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    signIn(data);
  };

  const naverLoginHandler = () => {
    window.location.href =
      'http://3.38.228.144:8080/oauth2/authorization/naver';
  };

  const kakaoLoginHandler = () => {
    window.location.href =
      'http://3.38.228.144:8080/oauth2/authorization/kakao';
  };

  return (
    <div className="grid gap-5 my-32 place-items-center">
      <img
        src="/assets/logo.svg"
        alt="logo"
        className="object-cover w-32 h-16"
      />
      <form
        className="flex flex-col justify-center w-[300px] gap-5 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="emailOrPhoneNum"
          placeholder="이메일 또는 휴대전화번호"
          register={register}
          errors={errors}
          message="이메일 또는 휴대전화번호를 입력해주세요"
          required
        />
        <Input
          id="password"
          placeholder="비밀번호"
          register={register}
          errors={errors}
          message="비밀번호를 입력해주세요"
        />

        <button
          type="submit"
          className="w-full py-4 mt-5 transition rounded-lg bg-primary01 hover:opacity-80"
        >
          <p className="font-semibold text-white">로그인</p>
        </button>
      </form>
      <section className="flex items-center justify-center text-sm font-semibold text-[#B3B3B3] h-4">
        <p className="pr-1 cursor-pointer">아이디 찾기 | </p>
        <p className="pr-1 cursor-pointer">비밀번호 찾기 | </p>
        <p className="cursor-pointer" onClick={() => navigate('/auth/join/1')}>
          회원가입
        </p>
      </section>
      <section className="w-[300px] flex flex-col gap-5 mt-10">
        <img
          src="/assets/Auth/naverLogin.svg"
          alt="naver"
          className="cursor-pointer"
          onClick={naverLoginHandler}
        />
        <img
          src="/assets/Auth/kakaoLogin.svg"
          alt="kakao"
          className="cursor-pointer"
          onClick={kakaoLoginHandler}
        />
      </section>
    </div>
  );
};

export default LoginPage;
