import React from 'react';
import ContainerPage from '@/layouts/containerPage/containerPage';
import dynamic from 'next/dynamic';
import Loading from '@/components/loading';

const DynamicComponent = dynamic(() => import('@/components/ManagerClass/Detail'), {
  ssr: false,
  loading: () => <Loading />
});
const DetailClassPage = () => {
  return (
    <DynamicComponent />
  )
}

export default DetailClassPage;
DetailClassPage.Layout = ContainerPage;