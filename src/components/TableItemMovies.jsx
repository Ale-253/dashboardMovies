import PropTypes from 'prop-types'

export const TableItemMovies = ({ title, rating, length, genre, awards }) => {
    return (
        <tr>
            <td>{title}</td>
            <td>{length}</td>
            <td>{rating}</td>
            <td>{genre?.name}</td>
            <td>{awards}</td>
            <td>
                <div className='d-flex justify-content-around'>
                <button className='btn btn-sm btn-primary'>
                        <i className='fas fa-eye'></i>
                    </button>
                    <button className='btn btn-sm btn-success'>
                        <i className='fas fa-pencil-alt'></i>
                    </button>
                    <button className='btn btn-sm btn-danger'>
                        <i className='fas fa-trash'></i>
                    </button>
                </div>
            </td>
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

TableItemMovies.defaultProps = {
    genre: 'SIN ESPECIFICAR'
}