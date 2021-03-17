import React,{useState,useEffect,useContext} from "react";
import pet,{ANIMALS} from "@frontendmasters/pet";
import useDropDown from "./useDropdown";
import Results from'./Results';
import ThemeContext from './ThemeContext';
const SearchParams = ()=>
{

    const  [location,setLocation] = useState("Seattle,WA");
    const [breeds,setBreeds]=useState([]);    
    const [animal,AnimalDropdown]=useDropDown("Animal","dog",ANIMALS);
    const [breed,BreedDropDown,setBreed]=useDropDown("Breed","",breeds);
    const [pets,setPets] = useState([]);
    const [theme,setTheme] = useContext(ThemeContext);
    // console.log("state of location",location);

// makes sure that the render happens after the content is first rendered
async function requestPets(){
    const{animals} = await pet.animals({
location,
breed,
type:animal
    })
    setPets(animals||[]);
}

useEffect(()=>{
        setBreeds([]);
        setBreed("");
        pet.breeds(animal).then(({breeds})=>
        {
            const breedStrings= breeds.map(({name})=>name);
            setBreeds(breedStrings);
        },error=>console.error(error))
// pet.breeds("dog").then(console.log,console.error);
},[animal,setBreed,setBreeds]);
    return (
<div className="search-params">
    <h1>{location}</h1>
<form onSubmit={(e)=>
{
e.preventDefault();
requestPets();
}}
>
    <label htmlFor="location">
        Location
        <input 
        id="location" 
        value={location}
         placeholder="Location" 
         onChange={event =>
            setLocation(event.target.value)}
            />
    </label>
    {/* <label htmlFor="animal">
        animal<select id="animal" value ="animal" onChange={e=>setAnimal(e.target.value)}
        onBlur={e=>setAnimal(e.target.value)}>
            <option>All</option>
            {
                ANIMALS.map(animal=>
                    // if we use () it implies implicit return i.e no return statement required if you use {} external  return statement required
                    {
                        // inorder to avoid instantiating the App every time we select an option we'd rather use key uniquely to identify each record of animal
                return <option key={animal} value={animal}>{animal}</option>
                    }
            )
                }
        </select>
    </label>
    <label htmlFor="breed">
        breed
        <select id="breed"
        value={breed}
        onChange={e=>setBreed(e.target.value)}
        onBlur={e=>setBreed(e.target.value)}
        disabled = {breeds.length===0}
        >
            <option>All</option>
            {breeds.map(breedString=>
            {<option key={breedString} value={breedString}>
                {breedString}
                </option> 
 })}
        </select>
    </label>*/}
<AnimalDropdown/>
<BreedDropDown/>
<label htmlFor="theme">
Theme
<select 
    value={theme}
    onChange={e=>setTheme(e.target.value)}
    onBlur ={e=>setTheme(e.target.value)}
>
    <option value="peru">Peru</option>
    <option value="darkblue">Dark Blue</option>
    <option value="mediumOrchid">Medium Orchid</option>
    <option value="chartreuse">Chartreuse</option>
    </select>
</label>
        <button style={{backgroundColor:theme}}>submit</button>
</form>
<Results pets={pets}/>
</div>
    );
}
export default SearchParams;