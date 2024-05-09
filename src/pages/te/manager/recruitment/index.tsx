import { PositionTe, ROLE, ROLE_USER } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const ManagerRecruitmentPage = CreatePage('ManageRecruitment', [ROLE_USER.TE, ROLE.CXO, PositionTe.ASSISTANT, PositionTe.LEADER, PositionTe.QC, PositionTe.HR], ContainerPage);

export default ManagerRecruitmentPage;