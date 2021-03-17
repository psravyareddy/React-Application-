import React from 'react';

class Carousel extends React.Component
{
    // constructor(props)
    // {
    //     super(props);
    //     // Object.assign(oldState,newState)
        state={
            photos:[],
            active:0
            };
// this.handleIndexClick = this.handleIndexClick.bind(this);
//helps to weed out different sized images and oklyget a specific sized image 
static getDerivedStateFromProps({media})
{
    let photos =['http://placecorgi.com/600/600'];
    if(media.length)
    {
        photos=media.map(({large})=>large);
    }
    return {photos};
}
//whenever you are passing functions into the childern or whenveer you are using event listeners use arrow funtins that will guarantee too be correct
 handleIndexClick =(event)=>{
    this.setState({
        active :+event.target.dataset.index
    });
};


render()
{
    const{photos, active}= this.state;
    return (
        <div className="carousel">
            <img src={photos[active]} alt="animal"/>
            <div className="carousel-smaller">
                {
                    photos.map((photo,index)=>
                    (
                            <img 
                            key={photo}
                            onClick={this.handleIndexClick}
                            data-index={index}
                            src ={photo}
                            className={index===active?"active":""}
                            alt="animal thumbnail"/>
                    )
                    )
                }
            </div>
        </div>
    );
}

}

export default Carousel;