import ContainerPage from '@/layouts/containerPage/containerPage';
import { PositionTe, ROLE_USER } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';

const OverView = CreatePage('OverView', [ROLE_USER.TE, ...Object.values(PositionTe)], ContainerPage);

export default OverView;