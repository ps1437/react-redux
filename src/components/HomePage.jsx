import React, { Component } from "react";

const DB = {
  data: [
    { name: "A", amount: "", status: "" },
    { name: "B", amount: "", status: "" },
    { name: "C", amount: "", status: "" },
    { name: "D", amount: "", status: "" },
    { name: "E", amount: "", status: "" }
  ]
};

class HomePage extends Component {
  state = {
    amount: "",
    noOfPersons: "",
    perPersonAmt: 0,
    personsData: [],
    person: { name: "", amount: "", status: "" }
  };

  handleChange = index => event => {
    const id = event.target.id;
    console.clear();
    console.log(index);
    this.setState({ personsData: [] });
  };

  showPersonData = event => {
    const val = event.target.value;
    let persons = [];
    for (let i = 0; i < val; i++) {
      persons.push(this.state.person);
    }

    const amt = (this.state.amount / val).toFixed(2);
    this.setState({
      personsData: persons,
      noOfPersons: val,
      perPersonAmt: amt
    });
  };

  render() {
    const data = DB.data.map((data, index) => {
      return (
        <tr key={index + data.name}>
          <td>{data.name} </td>
          <td>{data.amount} </td>
          <td>{data.status} </td>
        </tr>
      );
    });

    const listData = this.state.personsData.map((obj, index) => {
      return (
        <span key={index}>
          <span>Amount to pay -{this.state.perPersonAmt}</span>
          <input
            type="text"
            name="name"
            id="name"
            value={obj.name}
            onChange={e => this.handleChange(index)}
            className="form-control form-custome"
            placeholder={index + 1 + " Person name"}
            aria-describedby="name"
          />
        </span>
      );
    });
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1">
            <i className="fa fa-money" aria-hidden="true"></i>
            &nbsp; Expense Calculator
          </span>
        </nav>
        <div className="layout">
          <div
            className="container card form-container model fade"
            id="form"
            tabIndex="-1"
            role="dialog"
          >
            <form autoComplete="off">
              <div className="form-group">
                <label htmlFor="amount">Total Amount</label>

                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={this.state.amount}
                  onChange={event =>
                    this.setState({ amount: event.target.value })
                  }
                  className="form-control"
                  placeholder="please enter the total amount"
                  aria-describedby="amount"
                />
              </div>
              <div className="form-group">
                <label htmlFor="totalPerson">Persons</label>
                <input
                  type="number"
                  name="noOfPersons"
                  id="noOfPersons"
                  value={this.state.noOfPersons}
                  onChange={this.showPersonData}
                  className="form-control"
                  placeholder="no of persons"
                  aria-describedby="totalPerson"
                />
              </div>

              {listData}

              <button
                type="submit"
                name="cal"
                id="cal"
                className="btn btn-primary btn-lg btn-block"
              >
                {" "}
                Calculate
              </button>
            </form>
          </div>

          <button
            type="button"
            name="ADD"
            data-target="#form"
            data-toggle="modal"
            className="btn btn-primary btn-lg btn-block"
          >
            {" "}
            ADD
          </button>

          <div class="panel panel-primary table-data">
            <div class="panel-heading text-center ">Expenses Sheet</div>
            <div class="panel-body">
              <table class="table table-striped ">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>{data}</tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
