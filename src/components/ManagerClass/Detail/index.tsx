import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Obj } from '@/global/interface';
import useGetDataRoute from '@/utils/hooks/getDataRoute';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import { uuid } from '@/utils';
import { STATUS_CLASS } from '@/global/enum';
import CombineRoute from '@/global/route';

const Detail = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const stateRoute = useGetDataRoute();
    useEffect(() => {
        if (!stateRoute.replaceTitle) {
            const payloadRoute: PayloadRoute = {
                payload: {
                    ...stateRoute,
                    moreData: {
                        key: uuid(),
                        codeClass: 'PNL-UID08',
                        subject: 'Code',
                        teacher: 'Nguyễn Văn Cường',
                        style: 'Hybrid',
                        dateStart: '20/02/2022',
                        status: STATUS_CLASS.RUNNING,
                        timeSchedule: [{
                            weekday: 'T2',
                            time: '19h15-22h15'
                        }]
                    },
                    replaceTitle: 'PNL-CIJS84',
                }
            };
            dispatch(initDataRoute(payloadRoute));
        }
    }, []);
    return (
        <div>Detail</div>
    )
}

export default Detail;