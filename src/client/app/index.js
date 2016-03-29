import React from 'react';
import Handsontable from 'handsontable';
import {render} from 'react-dom';
import { createStore } from 'redux'

class SpreadSheet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {store : null};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {

  var hot = new Handsontable(document.getElementById("table"), {
    data: [["hello", "", "", ""]],
    minSpareRows: 1,
    manualRowResize: false,
  });

  var data = function(state=[], action) {
    if (action.type == "GET") {
      return hot.getData();
    }
  }

  var store = createStore(data);

  store.subscribe(() =>
    console.log(store.getState())
  )

  this.setState({store: store});

  }

  handleClick () {
    this.state.store.dispatch({type: 'GET'});
  }

  render () {
    return (
      <div>
        <div id="table"></div>
        <button onClick={this.handleClick}>Dispatch</button>
      </div>
    );
  }
}


render(<SpreadSheet />, document.getElementById("content"));
