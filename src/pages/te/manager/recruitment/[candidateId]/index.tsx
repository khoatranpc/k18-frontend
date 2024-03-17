import CreatePage from '@/utils/hocs/ProviderPage';
import { PositionTe, ROLE_USER } from '@/global/enum';
import ContainerPage from '@/layouts/containerPage/containerPage';

const DetailCandidate = CreatePage('ManagerRecruitment/DetailCandidate', [ROLE_USER.TE, PositionTe.HR, PositionTe.ASSISTANT, PositionTe.LEADER, PositionTe.QC], ContainerPage);
export default DetailCandidate;