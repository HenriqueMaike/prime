import React, { useState } from 'react';
import { useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filme.css'
//import { Toast } from 'react-toastify';

function Filme(){

    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] =useState(true);
    const navigate = useNavigate();


    useEffect(()=>{
    async function loadFilmes(){
        await api.get(`/movie/${id}`, {
            params: {
                api_key: "7f3fa4b7e219a692d83a3f720992fbe7",
                language: "pt-BR",
            }
        })
        .then((response)=>{
            setFilme(response.data);
            setLoading(false);
        })
        .catch(()=>{
            navigate("/", {replace: true});
            return;
        })
    }

        loadFilmes();
    }, [navigate, id]);


function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeFlix");

    let filmesSalvo = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvo.some((filmesSalvo) => filmesSalvo.id === filme.id)

    if (hasFilme) {
        alert("ESSE FILME JA ESTA NA LISTA");
        //toats.sucess("ESSE FILME JA ESTA NA LISTA");
        return;
    }

    filmesSalvo.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvo));
    alert("FILME SALVO COM SUCESSO");
}

if(loading){
    return(
        <div className="filme-info">
        </div>
    )
}

    return(
        <div className="descricao">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliacao: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>

            </div>
        </div>
    )
}

export default Filme;