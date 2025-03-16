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
                    <p>Hey&lsquo; I&apos;m Nishant Vishwakarma—a tech enthusiast&lsquo; full-stack developer in the making&lsquo; and a creative mind passionate about AI&lsquo; VFX&lsquo; and web development. Currently pursuing B.Tech in Computer Science at KIET&lsquo; I&apos;m on a journey to push my skills in coding&lsquo; design&lsquo; and engineering.

I love building things—whether it&apos;s web apps&lsquo; animations&lsquo; or AI-powered projects. My interests range from 3D modeling in Blender to video editing and VFX&lsquo; blending tech and creativity in unique ways. I&apos;ve dabbled in Arduino projects&lsquo; explored speech recognition & AI integration&lsquo; and I&apos;m always looking for new challenges to tackle.</p>
                </div>
            </div>
            <div className={style.newcardright}>
                <Coins/>
            </div>
        </div>
        </>
    );
}
export default cards;