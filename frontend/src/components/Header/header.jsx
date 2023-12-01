import useApp from "../../hooks/App/useApp";
import useHeader from "../../hooks/Header/useHeader";
import Button from "../Button/button";
import Wrapper from "../Wrapper/wrapper";
import classes from "./header.module.css";

function Header() {

    const { mode, handleMode } = useHeader();
    const {  handleShowNoteForm } = useApp();

    return (
        <div className={classes.container}>
            <Wrapper>
                <header className={classes.header_container}>
                    <div className={classes.header_container_logo}>
                        <h1>
                            {
                                mode === "main" && <>My Notes</>
                            }
                            {
                                mode === "archived" && <>Archived notes</>
                            }
                            
                        </h1>
                        <Button 
                            handleClick={handleShowNoteForm}
                            text="Create Note"
                            type="button"
                        />
                        <span onClick={handleMode} className={classes.link}>
                                {
                                    mode === "main" && <>Archived Notes</>
                                }
                                {
                                    mode === "archived" && <>Go back to unarchived notes</>
                                }
                        </span>
                    </div>
                    <div style={{display: "none"}}>
                        <Button 
                            handleClick={() => {}}
                            text="Login"
                            type="button"
                        />
                    </div>
                </header>

            </Wrapper>
        </div>
    )
}

export default Header;