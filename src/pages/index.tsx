import { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '@/global/interface';
import { AppDispatch, RootState } from '@/store';
import { testCall } from '@/store/reducers/test.reducer';

export default function Home() {
  const testData = useSelector((state: RootState) => (state.test as State).state);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log(testData);
  }, [testData]);
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
