import { PositionTe, ROLE } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const ListCS = CreatePage('CS/List', [ROLE.CS, ROLE.TE, PositionTe.LEADER], ContainerPage);

export default ListCS;
