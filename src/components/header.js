import React from 'react';//imported when class extended

export class Header extends React.Component { //extending react class Component
  
    render() {
        return (
            <div>
                <h1>This is  my header component</h1>
                 {/* //heading displayed on header page */}
            </div>
        );
    }
}