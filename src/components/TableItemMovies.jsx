import PropTypes from 'prop-types'

export const TableItemMovies = ({ movie: { title, rating, length, genre, awards }, handleEditMovie }) => {
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
                    <button className='btn btn-sm btn-success' onClick={() => handleEditMovie}>
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
    movie: PropTypes.object,
    handleEditMovie: PropTypes.func
}

TableItemMovies.defaultProps = {
    genre: 'SIN ESPECIFICAR'
}