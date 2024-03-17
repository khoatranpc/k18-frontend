import { PositionTe, ROLE_USER } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const Location = CreatePage('Location',  [ROLE_USER.TE, PositionTe.HR, PositionTe.ASSISTANT, PositionTe.LEADER, PositionTe.QC], ContainerPage);

export default Location;
