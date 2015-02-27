import BInput from "react-bootstrap/Input";
import React from 'react';
require("../css/components/Input/input.css");

export default React.createClass({
        propTypes: {
            id: React.PropTypes.string.isRequired
        },

    render() {
        return (
                    <BInput
                        type="text"
                        placeholder="Enter text"
                        label={this.props.label}
                        help={this.props.help}
                        hasFeedback
                        ref="input"
                        groupClassName="group-class"
                        wrapperClassName="wrapper-class"
                        labelClassName="label-class"
                        id={this.props.id}
                    />
                );


        }
});
