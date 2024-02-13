const Anecdote = ( {anecdote}) => {
    return (
        <section>
            <h2>
                {anecdote.content}
            </h2>
            <h3>
                {anecdote.author}
            </h3>
            <section>
                <a href={anecdote.info} target='_blank'>{anecdote.info}</a>
                    
                <span>
                    votes: {anecdote.votes}
                </span>

            </section>
        </section> 
    )
}

export default Anecdote