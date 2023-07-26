
export enum StatusEvent {
    FREE = 'FREE',
    DAYOFF = 'DAYOFF',
    FINISH = 'FINISH',
    ACTIVE = 'ACTIVE'
}
export const getColor: Record<StatusEvent, string> = {
    FREE: '#917EF1',
    DAYOFF: '#F6A351',
    FINISH: '#B4A7D6',
    ACTIVE: '#6EC9BF'
}