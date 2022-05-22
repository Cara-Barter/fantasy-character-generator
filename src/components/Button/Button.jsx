import './Button.scss';

function Button({className, type, text}) {
    return(
        <button 
            className={className}
            type={type}
        >
            {text}
        </button>
    )
}

export default Button;