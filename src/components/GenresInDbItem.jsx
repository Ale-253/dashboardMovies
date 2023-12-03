import PropTypes from 'prop-types';

export const GenresInDbItem = ({ name }) => {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    {name}
                </div>
            </div>
        </div>
    )
}

GenresInDbItem.propTypes = {
    name: PropTypes.string,
}