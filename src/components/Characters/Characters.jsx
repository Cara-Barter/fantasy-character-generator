import './Characters.scss';

function Characters ({ input, reply }) {
    return (
       <section className="characters">
           <h2 className="characters__title">Characters</h2>
           <ul className="characters__list">
              
                <li className="characters__item">
                    <div className="characters__box">
                        <span className="characters__header">Fantasy Race:</span>
                        <p className="characters__text">{input}</p>
                    </div>
                    <div className="characters__box">
                        <span className="characters__header">Your Character:</span>
                        <p className="characters__text">{reply}</p>
                    </div>
                   
               </li>
           </ul>
           
       </section>
       

    )
}

export default Characters;