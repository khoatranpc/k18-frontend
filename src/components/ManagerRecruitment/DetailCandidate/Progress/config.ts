import { RoundProcess } from "@/global/enum";
import { useUpdateDataProcessRoundCandidate } from "@/utils/hooks";

const queryHandleDataStep = (round: RoundProcess, roundId: string, result?: boolean, linkMeet?: string, time?: Date, doc?: string) => {
    const updateDataRoundProcessCandidate = useUpdateDataProcessRoundCandidate();
    updateDataRoundProcessCandidate.query({
        params: [roundId],
        body: {
            result, linkMeet, time, doc, round
        }
    });
};
export {
    queryHandleDataStep
}