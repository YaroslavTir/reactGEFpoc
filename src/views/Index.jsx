import Layout from "../layouts/Layout.jsx";
import state from '../State';
import React from 'react';
import Input from '../components/Input.jsx'

var Index = React.createClass({

    componentDidMount()
{
    console.time('whole app re-rendered');
    this.forceUpdate(console.timeEnd('whole app re-rendered'));
    },

render()
{
    var {title,
...
    other
}
= this.props;
        return (
            <Layout title={this.props.title}>
                <Input id="first" {...other}/>
            </Layout>
        );
    }
});

React.render(<Index data={state.get()}/>, document.getElementById('app'));