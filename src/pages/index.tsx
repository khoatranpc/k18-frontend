import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/global/interface';
import withAuth from '@/utils/hocs';
import useLogout from '@/utils/hooks/logout';
import { AppDispatch, RootState } from '@/store';
import { testCall } from '@/store/reducers/test.reducer';

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const logout = useLogout();
  const crrUser = useSelector((state: RootState) => (state.crrUserInfo as State).state);
  return (
    <>
      <button onClick={() => {
        dispatch(testCall({
          payload: {
            query: {
              params: ['64450834998fa1ae31227795'],
              query: {
                priceMin: 100,
                priceMax: 300
              }
            }
          }
        }));
      }}>Click</button>
      <Button onClick={() => {
        logout();
      }}>Đăng xuất</Button>
      <p><b>Welcome to MindX LMS</b></p>
    </>
  )
}

export default withAuth(Home);
