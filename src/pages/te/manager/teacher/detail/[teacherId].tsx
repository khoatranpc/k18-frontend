import { PositionTe, ROLE_USER } from '@/global/enum';
import ContainerPage from '@/layouts/containerPage/containerPage';
import CreatePage from '@/utils/hocs/ProviderPage';

const DetailTeacher = CreatePage('ManageTeacher/ListTeacher/DetailTeacher',[ROLE_USER.TE, PositionTe.ASSISTANT, PositionTe.LEADER, PositionTe.QC], ContainerPage);
export default DetailTeacher;