import React from "react";

import styles from "@/styles/Test.module.scss";
import Image from "next/image";
import chronometer from "@/assets/imgs/chronometer.png";

const StudentQuizzUI = () => {
  return (
    <div className={styles.containerStudentQuizz}>
      <div className={styles.studentQuizzWrapper}>
        <div className={styles.background}></div>
        <div className={styles.contentWrapper}>
          <div className={styles.quizzTime}>
            <Image width={45} src={chronometer} alt="" />
            <span>11:45</span>
          </div>

          <div className={styles.quizz}>
            <div className={styles.quizz_quesstion}>
              <div className={styles.quesstionCount}>Câu số 1 / 10</div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis odio voluptatem enim iste quibusdam in tenetur
                libero? Eius corporis repellat, nobis itaque ullam error placeat
                reiciendis quibusdam, iste, dignissimos fuga.
              </p>
            </div>

            <div className={styles.answer}>
              <div>
                <p>
                  Câu 1 : alo alo alo alo alo alo alo alo alo alo alo alo alo
                  alo alo alo alo
                </p>
              </div>
              <div>
                <p>
                  Câu 2 : alo alo alo alo alo alo alo alo alo alo alo alo alo
                  alo alo alo alo
                </p>
              </div>
              <div>
                <p>
                  Câu 3 : alo alo alo alo alo alo alo alo alo alo alo alo alo
                  alo alo alo alo
                </p>
              </div>
              <div>
                <p>
                  Câu 4 : alo alo alo alo alo alo alo alo alo alo alo alo alo
                  alo alo alo alo
                </p>
              </div>
            </div>

            <button>Trả lời</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizzUI;
