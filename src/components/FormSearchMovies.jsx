import PropTypes from 'prop-types'
import { useState } from "react"

export const FormSearchMovies = ({ apiCall }) => {

    const [formValues, setFormValues] = useState({});

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        apiCall(`/api/v1/movies?keyword=${formValues.keyword}`);
        e.target.reset()
    }
    return (
        <form action="" className="d-flex align-items-center" onSubmit={handleSubmit}>
            <label htmlFor="">Buscar</label>
            <div className="input-group mb-3">
                <input type="text" className="form-control ml-3" name='keyword' onChange={handleInputChange}/>
                <div className="input-group-append" style={{ cursor: 'pointer' }}>
                    <button type="submit" className="input-group-text" id="basic-addon2"><i className="fas fa-search"></i></button>
                </div>
            </div>
        </form>
    )
}

FormSearchMovies.propTypes = {
    apiCall: PropTypes.func,
}