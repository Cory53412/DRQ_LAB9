import React from 'react';//imported when class extended

export class Content extends React.Component {//extending react class Component

    render() {
        return (
            <div>
                <h1> Hello World!</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
                {/* //Current time will be presented on Content page */}
            </div>
        );
    }
}