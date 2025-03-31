import style from './page.module.css';
import Coins from './rose.js';
import BlurText from "./textanimation/blurtext.js";
const cards = () => {
    return (
        <>
        <div style={{alignContent:"center", display:"flex", width:"1500px",height:"500px"}}>
            <div style={{width: "700px", height: "100%", justifyContent:"center", alignItems:"center", display:"flex", flexDirection:"column"}}>
                <div style={{width:"500px", display:"flex", flexDirection:"column", gap:"50px"}}>
                    <BlurText
                            text="Blender"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-2xl mb-8"
                            textSize='2.5em'
                    />
                    <BlurText
                        text="Creating whatever I can imagine with Blender, where creativity knows no bounds." // Updated text
                        delay={180}
                        animateBy="words"
                        direction="top"
                        className="text-2xl mb-8"
                        textSize='1.1em'
                    />
                </div>
            </div>
            <div style={{width:"900px", height:"100%"}}>
                <Coins/>
            </div>
        </div>
        </>
    );
}
export default cards;