import { PositionTe, ROLE_USER } from "@/global/enum";
import CreatePage from "@/utils/hocs/ProviderPage";
import ContainerPage from "@/layouts/containerPage/containerPage";

const Evaluate = CreatePage(
  "Evaluate",
  [ROLE_USER.TE, PositionTe.ASSISTANT, PositionTe.LEADER, PositionTe.QC],
  ContainerPage
);

export default Evaluate;
