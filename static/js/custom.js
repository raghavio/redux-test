var SpreadSheet = React.createClass({
  componentDidMount: function() {

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

    var store = Redux.createStore(data);

    store.subscribe(() =>
      console.log(store.getState())
    )

    this.setState({store: store});
  },
  getInitialState: function () {
      return {store: null};
  },
  handleClick: function() {
    this.state.store.dispatch({type: 'GET'});
  },
  render: function() {
    return (
      <div>
        <div id="table"></div>
        <button onClick={this.handleClick}>Dispatch</button>
      </div>
    );
  }
});

ReactDOM.render(<SpreadSheet />, document.getElementById("content"));
