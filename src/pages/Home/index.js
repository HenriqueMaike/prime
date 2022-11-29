import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './home.css';

//https://api.themoviedb.org/3/movie/now_playing?api_key=7f3fa4b7e219a692d83a3f720992fbe7&language=pt-BR

function Home(){ 

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "7f3fa4b7e219a692d83a3f720992fbe7",
                    language: "pt-BR",
                    page: 1,
                }
            })

            setFilmes(response.data.results.slice(0,10))
            setLoading(false);
        }

        loadFilmes();

    }, [])

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando...</h2>
            </div>
        );
    }

    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filmes)=>{
                    return(
                        <article key={filmes.id}>
                            <strong>{filmes.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filmes.poster_path}`} alt={filmes.title}/>
                            <Link to={`/filmes/${filmes.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;