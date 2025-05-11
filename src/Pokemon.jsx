import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = ()=>{
    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    

    const fetchPokemon = async () =>{
        try {
            const response = await fetch(API);
            const data =  await response.json();

            const detailedPokemon = data.results.map(async (curPokemon)=>{
                // console.log(curPokemon.url);
                const response = await fetch(curPokemon.url);
                const data = await response.json();
                return data;
                // console.log(data);
            });
            // console.log(detailedPokemon);
            const detailedResponse = await Promise.all(detailedPokemon);
            console.log(detailedResponse);
            setPokemon(detailedResponse);
            setLoading(false);
            
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }

    useEffect(()=>{
        fetchPokemon();
    },[])

    const searchData = pokemon.filter((curPokemon)=>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    // const searchData = pokemon.filter((curPokemon)=>{
    //   return curPokemon.name.toLowerCase().includes(search.toLowerCase());
    // });

    
    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }

    return(
        <>
            <section className="container">
                <header>
                    <h1>Let's Catch Pokemon</h1>
                </header>

                <div className="pokemon-search">
                    <input type="text" placeholder="Search Pokemon" value={search} onChange={(e)=>setSearch(e.target.value)} />
                </div>

                <div>
                    <ul className="cards">
                        {
                            // pokemon.map((curPokemon)=>{
                            //     return <PokemonCards key={curPokemon.id} data={curPokemon}/>
                            // })

                            searchData.map((curPokemon)=>{
                                return <PokemonCards key={curPokemon.id} data={curPokemon}/>
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    );
}