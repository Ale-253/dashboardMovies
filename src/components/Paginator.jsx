import PropTypes from 'prop-types'

export const Paginator = ({ pagination, apiCall }) => {
    return (
        <div className="d-flex justify-content-end">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" hidden={pagination.currentPage === 1}>
                        <a className="page-link" href="#" aria-label="Previous" onClick={() => apiCall(`/api/v1/movies?=${pagination.currentPage-1}`)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pagination.pages.map((page) => (
                        <li key={page.number} className={`page-item ${page.number === pagination.currentPage && 'active'}`}>
                            <a className="page-link" href="#" onClick={() => apiCall(page.url)}>
                                {page.number}
                            </a>
                        </li>
                    ))}

                    <li className="page-item" hidden={pagination.currentPage === pagination.pages[pagination.pages.length - 1].number}>
                        <a className="page-link" href="#" aria-label="Next" onClick={() => apiCall(`/api/v1/movies?=${pagination.currentPage+1}`)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

    );
};

Paginator.propTypes = {
    pagination: PropTypes.object,
    apiCall: PropTypes.func
}