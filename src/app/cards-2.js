import Styles from './page.module.css';
import Coins from './coins';
const cards = () => {
    return (
        <>
        <div className={Styles.card}>
                <h3>About Me</h3>
                {/* <p>Hey, I'm Nishant Vishwakarma—a tech enthusiast, full-stack developer in the making, and a creative mind passionate about AI, VFX, and web development. Currently pursuing B.Tech in Computer Science at KIET, I’m on a journey to push my skills in coding, design, and engineering.</p> */}
            <div>
                <Coins/>
            </div>
        </div>
        </>
    );
};
export default cards;