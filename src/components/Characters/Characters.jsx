import './Characters.scss';

function Characters ({ input, reply }) {
    return (
       <section className="characters">
           <h2 className="characters__title">Characters</h2>
           <div className="characters__box">
                <span className="characters__header">Fantasy Race:</span>
                <p className="characters__text">{input}</p>
                <span className="characters__header">Your Character:</span>
                <p className="characters__text">{reply}</p>
           </div>
       </section>
       

    )
}

export default Characters;