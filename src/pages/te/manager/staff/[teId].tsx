import { PositionTe, ROLE_USER } from "@/global/enum";
import ContainerPage from "@/layouts/containerPage/containerPage";
import CreatePage from "@/utils/hocs/ProviderPage";

const DeatailStaff = CreatePage("TEs/DetailTe", [ROLE_USER.TE, PositionTe.LEADER], ContainerPage);
export default DeatailStaff;