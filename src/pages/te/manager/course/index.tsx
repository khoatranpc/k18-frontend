import { ROLE_USER } from '@/global/enum';
import ContainerPage from '@/layouts/containerPage/containerPage';
import CreatePage from '@/utils/hocs/ProviderPage';

const ManagerClass = CreatePage('@/components/ManagerCourse', ROLE_USER.TE, ContainerPage);
export default ManagerClass;
