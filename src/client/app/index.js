import React from 'react';
import Handsontable from 'handsontable';
import {render} from 'react-dom';
import { createStore } from 'redux'
import axios from 'axios'

function getDataFromServer(hot) {
  axios.get("/api/data").then(function(response) {
    hot.loadData(response.data);
  }).catch(function(response) {
    return null;
  });
}

class SpreadSheet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {store : null};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {

    var hot = new Handsontable(document.getElementById("table"), {
      minSpareRows: 1,
      manualRowResize: false,
      afterChange: function(change, source) {
        if (source == "edit") {
          var row = this.getDataAtRow(change[0][0]);
          var rowEmpty = row.filter(function(item) {
            return item == null;
          }).length > 0;

          if (!rowEmpty) {
            //TODO send each complete row instead of whole data
          }
        }
      }
    });
    getDataFromServer(hot);

    var data = function(state=[], action) {
      if (action.type == "GET") {
        return hot.getData();
      }
    }

    var store = createStore(data);

    var config = {
      headers: {'Content-Type': 'application/json'}
    };
    store.subscribe(() =>
      axios.post("/api/receive", {data: JSON.stringify(store.getState())}, config).then(function(response) {
        console.log(response);
      }).catch(function(response) {
        console.log(response);
      })
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
