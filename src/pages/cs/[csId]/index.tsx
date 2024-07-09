import { PositionTe, ROLE } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const DetailCS = CreatePage('CS/Detail', [ROLE.CS, ROLE.TE, PositionTe.LEADER], ContainerPage);

export default DetailCS;
