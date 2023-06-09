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
  console.log(crrUser);
  return (
    <>
      <button onClick={() => {
        dispatch(testCall({
          payload: {
            query: {
              params: ['645f607b064bb32e8dab977c'],
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
