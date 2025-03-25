import style from './page.module.css';
import Coins from './cube';
const cards = () => {
    return (
        <>
        <div className={style.newcard}>
            <div className={style.newcardleft}>
                <div className={style.divhead}>
                    <h2>Skills & Expertise</h2>
                </div>
                <div className={style.des}>
                    <p style={{marginTop:"60px"}}>I&apos;m a web development enthusiast, currently learning Full-Stack Development while building interactive and user-friendly websites. With expertise in After Effects, I create high-quality motion graphics, VFX, and cinematic edits. I also have strong skills in 3D modeling and animation using Blender, producing realistic renders. My deep understanding of technology, automation, and AI-driven projects helps me explore innovative solutions and push creative boundaries.</p>
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