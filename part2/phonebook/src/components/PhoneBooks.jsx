import PersonNameAndNumber from "./PersonNameAndNumber"

const PhoneBooks = ({persons}) => {
    return (
      <div>
        
        <ul>
          {persons.map(object => {
            return (
              <PersonNameAndNumber key={object.id} object={object} />
            )
          })
        }
        </ul>
      </div>
    )
}

export default PhoneBooks;