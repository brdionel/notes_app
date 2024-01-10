import useApp from "../../hooks/App/useApp";
import useHeader from "../../hooks/Header/useHeader";
import { useUser } from "../../hooks/Users/useUser";
import Button from "../Button/button";
import Wrapper from "../Wrapper/wrapper";
import classes from "./header.module.css";

function Header() {

    const { mode, toggleMode } = useHeader();
    const {  handleShowNoteForm, handleShowModal } = useApp();
    const {currentUser, logout} = useUser()

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
                        <div className={classes.buttonContainer}>
                            <Button 
                                handleClick={currentUser ? handleShowNoteForm : handleShowModal}
                                text="Create Note"
                                type="button"
                                variant="primary"
                            />
                        </div>
                        {
                            currentUser && 
                            <span onClick={toggleMode} className={classes.link}>
                                    {
                                        mode === "main" && <>Archived Notes</>
                                    }
                                    {
                                        mode === "archived" && <>Go back to unarchived notes</>
                                    }
                            </span>
                        }
                    </div>
                    <div>
                        {
                            currentUser
                            ? <Button 
                            handleClick={() => logout()}
                            text="Logout"
                            type="button"
                         />
                            : <Button 
                            handleClick={() => handleShowModal()}
                            text="Login"
                            type="button"
                         />
                        }
                        
                    </div>
                </header>

            </Wrapper>
        </div>
    )
}

export default Header;