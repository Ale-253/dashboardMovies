import { Card, Col, Row, Table } from "react-bootstrap"
import { TableItemMovies } from "../components/TableItemMovies";
import { useEffect, useState } from "react";
import { Loading } from "../components/loading";
import { Paginator } from "../components/Paginator";
import { FormSearchMovies } from "../components/FormSearchMovies.JSX";
import { FormMovie } from "../components/FormMovie";
import { Toast } from "../utils/toast";

export const MoviesListPage = () => {

    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({})

    const apiCall = async (endpoint = '/api/v1/movies') => {

        const response = await fetch(`${import.meta.env.VITE_APP_API_HOST}${endpoint}`);
        const result = await response.json();

        setLoading(false)
        setMovies(result.data)
        setPagination(result.meta)
    }

    useEffect(() => {

        apiCall();

    }, []);

    const handleAddMovie = async (data) => {
        try {

            let response = await fetch(`${import.meta.env.VITE_APP_API_URL_BASE}/movies`, {
                method: 'POST',
                //body: data, <-- EN EL CASO QUE QUERAMOS SUBIR IMAGENES
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let result = await response.json();

            if (result.ok) {
                Toast.fire({
                    icon: "success",
                    title: result.msg
                });
            }

            setMovies([
                ...movies,
                result.data
            ])

        } catch (error) {
            console.log(error);
        }
    }

    const handleEditMovie = async (id) => {
        try {

            let response = await fetch(
                `${import.meta.env.VITE_APP_API_URL_BASE}/movies/${id}`
            );
            let result = await response.json();

            if (result.ok) {
                setMovie(result.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateMovie = async (id, data) => {
        try {
            let response = await fetch(`${import.meta.env.VITE_APP_API_URL_BASE}/movies/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            let result = await response.json()

            if (result.ok) {
                Toast.fire({
                    icon: "success",
                    title: result.msg
                });

                setMovies(movies.map(movie => movie.id === result.data.id ? result.data : movie ))
            }           

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteMovie = async (id) => {
        try {
            let response = await fetch(`${import.meta.env.VITE_APP_API_URL_BASE}/movies/${id}`, {
                method: 'DELETE',
            })

            let result = await response.json();

            if (result.ok) {
                Toast.fire({
                    icon: "success",
                    title: result.msg
                });

                setMovies(movies.filter(movie => movie.id !== id))
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Lista de películas</h1>
            </div>
            <Row>
                <Col sm={12} md={4}>
                    <FormMovie handleAddMovie={handleAddMovie} handleUpdateMovie={handleUpdateMovie} movie={movie} setMovie={setMovie} />
                </Col>
                <Col>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Card >
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <FormSearchMovies apiCall={apiCall} />
                                </div>
                                <Paginator pagination={pagination} apiCall={apiCall} />
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Título</th>
                                            <th>Duración</th>
                                            <th>Rating</th>
                                            <th>Géneros</th>
                                            <th>Premios</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movies.map(
                                            (movie, index) => (
                                                <TableItemMovies
                                                    key={index + movie.title}
                                                    movie={movie}
                                                    handleEditMovie={handleEditMovie}
                                                    handleDeleteMovie={handleDeleteMovie}
                                                />
                                            ))}
                                    </tbody>
                                </Table>
                                <Paginator pagination={pagination} apiCall={apiCall} />
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </>
    );
}
