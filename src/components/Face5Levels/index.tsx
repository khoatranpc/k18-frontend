import React from 'react';
import { FaRegFaceFrown } from "react-icons/fa6";
import { FaRegFaceFrownOpen } from "react-icons/fa6";
import { FaRegFaceGrimace } from "react-icons/fa6";
import { FaRegFaceKissWinkHeart } from "react-icons/fa6";
import { FaRegFaceKissBeam } from "react-icons/fa6";
import { FaRegFaceGrinStars } from "react-icons/fa6";

type Level = 1 | 2 | 3 | 4 | 5;

interface Props {
    level?: Level;
}

const getFace: Record<Level, React.ReactNode> = {
    [1]: <FaRegFaceFrown className='text-[3.2rem]' />,
    [2]: <FaRegFaceFrownOpen />,
    [3]: <FaRegFaceGrimace />,
    [4]: <FaRegFaceKissBeam />,
    [5]: <FaRegFaceKissWinkHeart />
};

const Face5Levels = (props: Props) => {
    return <div>
        {props.level ? getFace[props.level] : <FaRegFaceGrinStars />}
    </div>
}

export default Face5Levels;