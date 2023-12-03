import PropTypes from 'prop-types'

export const TableItemMovies = ({ title, rating, length, genre, awards }) => {
    return (
        <tr>
            <td>{title}</td>
            <td>{length}</td>
            <td>{rating}</td>
            <td>{genre?.name}</td>
            <td>{awards}</td>
        </tr>
    )
}

TableItemMovies.propTypes = {
    title: PropTypes.string,
    rating: PropTypes.number,
    awards: PropTypes.number,
    length: PropTypes.number,
    genre: PropTypes.object
}

TableItemMovies.defaultProp = {
    genres: 'SIN ESPECIFICAR'
}