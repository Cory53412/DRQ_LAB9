import React from 'react';//imported when class extended

export class Footer extends React.Component { //extending react class Component

    render() {
        return (
            <div>
                <h1>This is my footer component</h1> 
                {/* heading is displayed on Footer component */}
            </div>
        );
    }
}