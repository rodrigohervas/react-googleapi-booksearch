import React, {Component} from 'react';
import './SearchForm.css';

class SearchForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: '', 
      printTypeFilter: 'all', 
      bookTypeFilter: 'ebooks'
    }
  }

  handleChange(event) {
    this.setState({
      query: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onClick(this.state.query);
  }

  handlePrintType(event) {
    this.setState({
      printTypeFilter: event.target.value
    });
    this.props.printTypeFilter(event.target.value);
    console.log(event.target.name)
  }

  handleBookType(event) {
    this.setState({
      bookTypeFilter: event.target.value
    });
    this.props.bookTypeFilter(event.target.value);
  }
  
  render() {

    return (
      <div className="searchForm">
        
        <form className=" search centered-row">
          <label htmlFor="queryInput">Search: </label>
          <input type="text" id="queryInput" name="queryInput" placeholder="query here" onChange={e => this.handleChange(e)} />
          <button type="submit" onClick={ e => this.handleSubmit(e) }> Search Books </button>
        </form>
        
        <div className="filters centered-row">
          
          <label className="filters">Filters:</label>
          
          <label htmlFor="printType">Print Type</label>
          <select id="printType" name="printType" value={this.state.printTypeFilter} onChange={ e => this.handlePrintType(e) }>
            <option>all</option>
            <option>books</option>
            <option>magazines</option>
          </select>

          <label htmlFor="bookType">Book Type</label>
          <select id="bookType" name="bookType" value={this.state.bookTypeFilter} onChange={e => this.handleBookType(e)}>
            <option>ebooks</option>
            <option>free-ebooks</option>
            <option>full</option>
            <option>paid-ebooks</option>
            <option>partial</option>
          </select>

        </div>
      </div>
    );
  }
}

export default SearchForm;
