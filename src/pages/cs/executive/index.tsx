import { PositionTe, ROLE } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const CsExecutive = CreatePage('CS/CsExecutive', [ROLE.TE, ROLE.CS, PositionTe.LEADER], ContainerPage);

export default CsExecutive;