import React from 'react';
import onClickOutside from 'react-onclickoutside';


class ClickOutside extends React.Component {

    handleClickOutside = () => this.props.clickedOutside();

    backdropWrapper= ()=>{
        if(this.props.provided){
            return (
                <div {...this.props.provided.dragHandleProps}>{this.props.children}</div>
            );
        }

        else {
           return (<div>{this.props.children}</div>)
        }
    }

    render() {

       return this.backdropWrapper()
    }
}

export default onClickOutside(ClickOutside);