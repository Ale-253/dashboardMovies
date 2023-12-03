import { Card, Table } from "react-bootstrap"
import { TableItemMovies } from "../components/TableItemMovies";
import { useEffect, useState } from "react";
import { Loading } from "../components/loading";
import { Paginator } from "../components/Paginator";

export const MoviesListPage = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({})

    const apiCall = async (endpoint = '/api/v1/movies') => {

        const response = await fetch(`http://localhost:3001${endpoint}`);
        const result = await response.json();

        setLoading(false)
        setMovies(result.data)
        setPagination(result.meta)
    }

    useEffect(() => {

        apiCall();

    }, [])


    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Lista de películas</h1>
            </div>
            {
                loading ?
                    <Loading />
                    :
                    <Card>
                        <Card.Body>
                            <Paginator pagination={pagination} apiCall={apiCall} />
                            <Table stripped>
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Duración</th>
                                        <th>Rating</th>
                                        <th>Géneros</th>
                                        <th>Premios</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movies.map(({ title, length, genre, awards, rating }, index) => (
                                        <TableItemMovies key={index + title} title={title} length={length} genre={genre} awards={awards} rating={rating} />
                                    ))}
                                </tbody>
                            </Table>
                            <Paginator pagination={pagination} apiCall={apiCall} />
                        </Card.Body>
                    </Card>
            }

        </>
    );
}
