import { ROLE } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const ManagerClass = CreatePage('ManageFeedback', [ROLE.CS], ContainerPage)

export default ManagerClass;