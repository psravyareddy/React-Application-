//momstly code from reactjs.org/docs/error-boundaries.html

import React, { Component } from 'react';
import {Link, navigate} from '@reach/router';
class ErrorBoundary extends Component{
    state = {haserror:false}
    static getDerivedStateFromError()
    {
        return {hasError:true};
    }
    componentDidCatch(error, info)
    {
        console.error("ErrorBoundary caught an error", error, info);

    }
    // will run everytime  it gets new state or new props
    componentDidUpdate()
    {
        if(this.state.hasError)
        {
            // this.setState({redirect:true})
            setTimeout(()=>navigate('/'),5000);
        }
    }
    render()
    {
        if(this.state.redirect)
        {
            return <Redirect to="/"/>;
        }
        if(this.state.hasError){
      return(  
            <h1>
                There was an error with this listing. <Link to="/">Click Here</Link>
                {" "}
                to go back to the home page or wait for 5 seconds.

            </h1>
            )
        }

        return this.props.children;
    }
} 

export default ErrorBoundary;