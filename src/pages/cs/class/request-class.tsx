import { ROLE } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const RequestClass = CreatePage('ManageClass/CreateClass', [ROLE.CS], ContainerPage);
export default RequestClass;
