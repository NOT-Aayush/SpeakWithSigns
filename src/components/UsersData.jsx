const UsersData = ({persons}) => {
    return persons.map((curPerson) => {
        const {id, name, face_descriptor, created_at} = curPerson;
        const date = new Date(created_at).toLocaleDateString();

        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                    <span className="descriptor-badge">
                        {face_descriptor ? `${face_descriptor.length} points` : "No data"}
                    </span>
                </td>
                <td>{date}</td>
            </tr>
        )
    })
}

export default UsersData;