import { ROLE } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const ManagerClass = CreatePage('ManageClass', [ROLE.CS], ContainerPage);
export default ManagerClass;
