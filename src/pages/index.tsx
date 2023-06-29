import { Button } from 'antd';
import useLogout from '@/utils/hooks/logout';
import ContainerPage from '@/layouts/containerPage/containerPage';

function Home() {
  const logout = useLogout();
  return (
    <>
      <Button onClick={() => {
        logout();
      }}>Đăng xuất</Button>
      <p><b>Welcome to MindX LMS</b></p>
    </>
  )
}

export default Home;
Home.Layout = ContainerPage;
