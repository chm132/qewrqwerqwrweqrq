import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';
import { setCurrentUser } from '../../redux/slices/currentUserSlice';
import axios from 'axios';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async (data: FieldValues) => {
    if (data) {
      try {
        const response = await axios.post('/member/login', data);

        const accessToken = response.headers.authorization;
        const refreshToken = response.headers['authorization-refresh'];

        if (accessToken && refreshToken) {
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
        }

        dispatch(
          setCurrentUser({
            id: response.data.result.memberId,
            name: response.data.result.memberName,
            isLoggedIn: true,
          }),
        );

        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return { signIn };
};
