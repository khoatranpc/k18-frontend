import React from 'react';
import styles from '@/styles/auth/AuthLayout.module.scss';
import HumanCharacter from '@/assets/svgs/human-character.svg';
import Image from 'next/image';

interface Props {
    children?: React.ReactElement;
}

const AuthLayout = (props: Props) => {
    return (
        <div className={styles.auth_layout}>
            <div className={styles.bar_icon}>
                <div className={styles.wall}>

                </div>
                <Image src={HumanCharacter} alt='' className={styles.human} />
                <div className={styles.list_ac}>
                    <ul>
                        <li>© 2023 MindX Technology School</li>
                        <li>Privacy Policy</li>
                        <li>Term</li>
                        <li>Help</li>
                    </ul>
                </div>
            </div>
            <div className={styles.content_auth}>
                {props.children}
            </div>
        </div>
    )
}

export default AuthLayout;