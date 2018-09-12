import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';

class App extends Component {
  render() {

    let login;
    if (this.props.match !== undefined) {
      login = this.props.match.params.login;
    }

    return (
      <div id="root">
        <div className="main">
          <Header store={this.context.store} />
          <Timeline login={login} />
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  store: React.PropTypes.object.isRequired
}

export default App;