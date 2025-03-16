import Styles from './page.module.css';
import Chips from "./chips";
const cards = () => {
    return (
        <>
        <div className={Styles.card}>
            <h3>Skills</h3>
            <div>
            <Chips/>
            </div>
        </div>
        </>
    );
};
export default cards;