const PersonNameAndNumber = (props) => {
    const object = props.object;
    return (
        <li>
            {object.name} {object.number}
        </li>
    )
}

export default PersonNameAndNumber;