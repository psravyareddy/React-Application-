import React from 'react';
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
import {navigate} from '@reach/router';
import Modal from './Modal';
// import Results from './Results';

// const Details=(props)=>{

//     return (
// <pre>

// <code>{JSON.stringify(props,null,4)}</code>

// </pre>

//     );
    
//     // <h1>Hi LOL</h1>
// };

class Details extends React.Component
{
    state = {loading:true,showModal:false};
    // state={loading:true};
    constructor(props)
    {
        super(props);
        // Object.assign(oldState,newState)
        this.state = {
            loading:true

        };
    }
    componentDidMount()
    {
        // throw new Error("testing error");
        pet.animal(this.props.id).then(({animal})=>
        {
            this.setState({
                url:animal.url,
                name:animal.name,
                animal:animal.type,
                location:`${animal.contact.address.city},${animal.contact.address.state
                }`,
                description:animal.description,
                media:animal.photos,
                breed:animal.breeds.primary,
                loading: false
            });
        },console.error);
    }
    toggleModal =()=>this.setState({showModal:!this.state.showModal})
    adopt=()=>navigate(this.state.url)
render()
{
    if(this.state.loading)
    {
        return <h1>loading...</h1>;
    }
    // return
    // ;
    
  const{animal,breed,location,description,name,media,showModal}=this.state;
    return(
        <div className="details">
            <Carousel media={media}/>
            
        {/* <div className="details"> */}
            
                <h1>{name}</h1>
                <h2>{`${animal} - ${breed} - ${location}`}</h2>


<button onClick={this.toggleModal}>Adopt {name}</button>

    
                <p>{description}</p>
                {
                    showModal ?
                    (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {name}?</h1>
                                <div className="buttons">
                                    <button onClick={this.adopt}>Yes</button>
                                    <button onClick={this.toggleModal}>No, I'm a monster</button>
                                 </div>
                            </div>
                        </Modal>
                        
                    ):null
                }
            
        {/* </div> */}
        </div>
    );
}
}

export default function DetailsWithErrorBoundary(props)
{
    // ...props copies all the attribute across this function
    return(
        <ErrorBoundary>
            <Details {...props}></Details>
        </ErrorBoundary>
    );
}