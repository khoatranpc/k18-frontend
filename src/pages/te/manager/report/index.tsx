import { PositionTe, ROLE_USER } from "@/global/enum";
import ContainerPage from "@/layouts/containerPage/containerPage";
import CreatePage from "@/utils/hocs/ProviderPage";

const ReportStaff = CreatePage("TEs/Report", [ROLE_USER.TE, PositionTe.HR, PositionTe.ASSISTANT, PositionTe.LEADER, PositionTe.QC], ContainerPage);
export default ReportStaff;