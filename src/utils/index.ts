import { v4 as uid } from 'uuid';

const uuid = () => {
    return uid() as string;
}

export {
    uuid
}