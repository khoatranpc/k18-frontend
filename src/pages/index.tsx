import Link from 'next/link';
import { useDispatch } from 'react-redux';
import withAuth from '@/utils/hocs';
import { AppDispatch } from '@/store';
import { testCall } from '@/store/reducers/test.reducer';

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <button onClick={() => {
        {
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
          }))
          // dispatch(incr())
        }
      }}>Click</button>
      <Link href={'/auth/login'}>
        Login
      </Link>
      <p><b>Welcome to MindX LMS</b></p>
    </>
  )
}

export default withAuth(Home);
