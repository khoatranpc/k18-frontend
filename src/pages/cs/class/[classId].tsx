import { ROLE } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const DetailClassPage = CreatePage('ManageClass/Detail', [ROLE.CS], ContainerPage);
export default DetailClassPage;