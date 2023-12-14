
const FormToAddPeopleNumber = (props) => {
    const {handleSubmit, handleNameChange, handlePhoneChange, newName, newPhone} = props;

    return (
        <section>
            <form onSubmit={handleSubmit}>

                <div>
                    name: <input 
                        onChange={handleNameChange}
                        value={newName}
                        />
                </div>

                <div>
                    number: <input
                        onChange={handlePhoneChange}
                        value={newPhone}
                        type="tel"
                        required
                    />
                </div>

                <div>
                    <button type="submit">add</button>
                </div>

            </form>
        </section>
    )
}

export default FormToAddPeopleNumber;