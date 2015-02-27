import Panel from "react-bootstrap/Panel";
import React from  'react';
require("../css/components/Layout/panel.css");
require("../css/components/Layout/normalize.css");

export default React.createClass({

    getInitialState() {
        return {
            style: {
                width: '800',
                margin: '20'
            }
        };
    },
    componentDidMount() {

    },
    render() {
        var title = (
            <h3>{this.props.title}</h3>
        );
        return (<div style={this.state.style}>
            <Panel header={title}>
            {this.props.children}
            </Panel>
        </div>);
    }
});
