import { useField } from "../hooks"

const Form = ( {fetch} ) => {
    const nameInput = useField('text')

    console.log('Form is rerender')
    
    return (
        <form onSubmit={(e) => fetch(e, nameInput.value)}>
            <input {...nameInput} />
            <button>find</button>
        </form>
  
    )
}

export default Form