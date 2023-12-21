import styles from ".././keyboard.module.css"

type HangmanKeyboardProps = {
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void
    disabled? : boolean
    }

export function HangmanKeyboard({activeLetters,inactiveLetters,addGuessedLetter, disabled=false}: HangmanKeyboardProps) {
    const KEYS = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ]
    
    return (<div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
          gap: ".5rem",
        }}>
           {KEYS.map(key => {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);
                return <button onClick={() => addGuessedLetter(key)} key={key} 
                        className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""} `} disabled={isActive || isInactive || disabled}>
                        {key}
                    </button>
           })} 
    </div>)
}