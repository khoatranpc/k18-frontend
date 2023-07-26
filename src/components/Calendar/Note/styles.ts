
export enum StatusEvent {
    FREE = 'FREE',
    DAYOFF = 'DAYOFF',
    FINISH = 'FINISH',
    ACTIVE = 'ACTIVE',
    PREOPEN = 'PREOPEN'
}
export const getColor: Record<StatusEvent, string> = {
    FREE: '#13734B',
    DAYOFF: '#F6A351',
    FINISH: '#B4A7D6',
    ACTIVE: '#6EC9BF',
    PREOPEN: '#FF9902'
}