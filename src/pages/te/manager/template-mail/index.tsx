import { PositionTe, ROLE_USER } from "@/global/enum";
import CreatePage from "@/utils/hocs/ProviderPage";
import ContainerPage from "@/layouts/containerPage/containerPage";

const TemplateMail = CreatePage('Template', [ROLE_USER.TE, PositionTe.LEADER, PositionTe.HR], ContainerPage);
export default TemplateMail;