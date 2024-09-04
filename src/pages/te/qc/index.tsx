import ContainerPage from '@/layouts/containerPage/containerPage';
import { PositionTe, ROLE_USER } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';

const QC = CreatePage('QC', [ROLE_USER.TE, ...Object.values(PositionTe)], ContainerPage);

export default QC;