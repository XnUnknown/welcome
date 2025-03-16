import style from './page.module.css';
import Coins from './coins';
const cards = () => {
    return (
        <>
        <div className={style.newcard}>
            <div className={style.newcardleft}>
                <div className={style.divhead}>
                    <h2>Profile</h2>
                </div>
                <div className={style.des}>
                    <p>Hey, I&apos;m Nishant Vishwakarma—a tech enthusiast, full-stack developer in the making, and a creative mind passionate about AI, VFX, and web development. Currently pursuing B.Tech in Computer Science at KIET, I&apos;m on a journey to push my skills in coding, design, and engineering.

I love building things—whether it&apos;s web apps, animations, or AI-powered projects. My interests range from 3D modeling in Blender to video editing and VFX, blending tech and creativity in unique ways. I&apos;ve dabbled in Arduino projects, explored speech recognition & AI integration, and I&apos;m always looking for new challenges to tackle.</p>
                </div>
            </div>
            <div className={style.newcardright}>
                <Coins/>
            </div>
            <div className= {style.waterMark}>XnU</div>
        </div>
        </>
    );
}
export default cards;