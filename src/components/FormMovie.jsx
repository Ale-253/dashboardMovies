import { PropTypes } from "prop-types"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "react-bootstrap"
import { validate } from '../validations/moviesValidator'

export const FormMovie = ({ handleAddMovie, handleUpdateMovie, movie, setMovie }) => {

    const [genres, setGenres] = useState([])

    const getGenres = async () => {
        try {
            let response = await fetch(`${import.meta.env.VITE_APP_API_URL_BASE}/genres`);
            let result = await response.json();

            const genresArray = result.data.map(({ id, name }) => ({
                id,
                name
            }));

            const genresOrder = genresArray.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)

            setGenres(genresOrder)

            return null

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGenres()
    }, []);

    useEffect(() => {
        if (movie) {
            formik.setValues({
                title: movie.title,
                rating: movie.rating,
                awards: movie.awards,
                release_date: movie.release_date.split('T')[0],
                length: movie.length,
                genre_id: movie.genre.id,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movie]);

    const handleReset = () => {
        formik.resetForm();
        setMovie(null)
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            rating: "",
            awards: "",
            release_date: "",
            length: "",
            genre_id: "",
        },

        validate,

        onSubmit: (values) => {

            /* -> EN EL CASO DE QUE QUERAMOS SUBIR IMAGENES

            const data = new FormData()
            data.append("title", values.title)
            data.append("rating", values.rating)
            data.append("awards", values.awards)
            data.append("release_date", values.release_date)
            data.append("length", values.length)
            data.append("genre_id", values.genre_id)

            handleAddMovie(data);
            */

            movie ?
                handleUpdateMovie(movie.id, values)
                :
                handleAddMovie(values);

            formik.handleReset();
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Agregar Película
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Form className="Row" onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3 col-12">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Título de película"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            className={formik.errors.title && 'is-invalid'}
                        />
                        {formik.errors.title ? <div className="text-danger ml-2">{formik.errors.title}</div> : null}
                    </Form.Group>
                    <Form.Group className="mb-3 col-12">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="number"
                            name="rating"
                            value={formik.values.rating}
                            onChange={formik.handleChange}
                            className={formik.errors.rating && 'is-invalid'}
                        />
                        {formik.errors.rating ? <div className="text-danger ml-2">{formik.errors.rating}</div> : null}
                    </Form.Group>
                    <Form.Group className="mb-3 col-12">
                        <Form.Label>Premios</Form.Label>
                        <Form.Control
                            type="number"
                            name="awards"
                            value={formik.values.awards}
                            onChange={formik.handleChange}
                            className={formik.errors.awards && 'is-invalid'}
                        />
                        {formik.errors.awards ? <div className="text-danger ml-2">{formik.errors.awards}</div> : null}
                    </Form.Group>
                    <Form.Group className="mb-3 col-12">
                        <Form.Label>Duración</Form.Label>
                        <Form.Control
                            type="number"
                            name="length"
                            value={formik.values.length}
                            onChange={formik.handleChange}
                            className={formik.errors.length && 'is-invalid'}
                        />
                        {formik.errors.length ? <div className="text-danger ml-2">{formik.errors.length}</div> : null}
                    </Form.Group>
                    <Form.Group className="mb-3 col-12">
                        <Form.Label>Fecha de estreno</Form.Label>
                        <Form.Control
                            type="date"
                            name="release_date"
                            value={formik.values.release_date}
                            onChange={formik.handleChange}
                            className={formik.errors.release_date && 'is-invalid'}
                        />
                        {formik.errors.release_date ? <div className="text-danger ml-2">{formik.errors.release_date}</div> : null}
                    </Form.Group>
                    <Form.Group className="mb-3 col-12">
                        <Form.Label>Género</Form.Label>
                        <Form.Select
                            className={`form-control ${formik.errors.release_date && 'is-invalid'}`}
                            name="genre_id"
                            value={formik.values.genre_id}
                            onChange={formik.handleChange}
                        >
                            <option hidden defaultValue>Selecciona el género</option>
                            {
                                genres.map(({ id, name }) => <option key={id} value={id}>{name}</option>)
                            }
                        </Form.Select>
                        {formik.errors.genre_id ? <div className="text-danger ml-2">{formik.errors.genre_id}</div> : null}
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Button type="button" onClick={() => handleReset} variant="outline-secondary" className="mt-5">
                            Cancelar
                        </Button>
                        <Button type="submit" variant="outline-dark" className="mt-5">
                            Guardar
                        </Button>
                    </div>
                </Form>
            </CardBody>
        </Card>
    )
}

FormMovie.propTypes = {
    handleAddMovie: PropTypes.func,
    handleUpdateMovie: PropTypes.func,
    setMovie: PropTypes.func,
    movie: PropTypes.object
}