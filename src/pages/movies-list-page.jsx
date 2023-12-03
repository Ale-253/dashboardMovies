import { Card, Table } from "react-bootstrap"
import { TableItemMovies } from "../components/TableItemMovies";
import { useEffect, useState } from "react";
import { Loading } from "../components/loading";

export const MoviesListPage = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const apiCall = async () => {
            const response = await fetch('http://localhost:3031/api/movies');
            const result = await response.json();
            setLoading(false)
            setMovies(result.data)
        }

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
                        </Card.Body>
                    </Card>
            }

        </>
    );
}
