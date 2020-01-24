import React, {Component} from 'react';
import './App.css';
import BookList from './BookList/BookList';
import SearchForm from './SearchForm/SearchForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: null, 
      query: 'best sellers', 
      printTypeFilter: 'all', 
      bookTypeFilter: 'ebooks'
    }
  }

  getBooks() {
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    const apiKey = 'AIzaSyBNShOaeaUx9q8twkmhw2fJjWGyiXRpMLo';
    const printType = this.state.printTypeFilter;
    const filter = this.state.bookTypeFilter;
    const url = `${baseUrl}?key=${apiKey}&printType=${printType}&filter=${filter}&q=${this.state.query}`;
    const options = {
      method: 'GET', 
      key: apiKey, 
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json"
      }
    };

    fetch(url, options)
        .then(response => {
          if(!response.ok) {
            //throw new Error('There was a problem retrieving the book list, please try again!');
            throw new Error(`There was a problem retrieving the book list (code: ${response.status})`);
          }
          return response.json();
        })
        .then(data => {
          console.log(`items.length: ${data.items.length}`)
          if (data.items.length === 0 ){
            throw new Error('There were no results for your search');
          }
          this.setState({
            books: data.items, 
            error: null
          });
        })
        .catch( error => {
          this.setState({
            error: error.message
          });
        });
  }

  componentDidMount() {
    this.getBooks();
  }

  componentDidUpdate(prevProps, prevState) {
    
    if( (prevState.query !== this.state.query) ||
    (prevState.printTypeFilter !== this.state.printTypeFilter) ||
    (prevState.bookTypeFilter !== this.state.bookTypeFilter) )
    {
      this.getBooks();
    }     
  }

  handleQuery(value) {
    this.setState({
      query: value, 
    });
  }

  handlePrintTypeFilter(value) {
    this.setState({
      printTypeFilter: value
    });
  } 

  handleBookTypeFilter(value) {
    this.setState({
      bookTypeFilter: value
    });
  }

  render() { 
    
    const books = this.state.books;
    const errorMessage = this.state.error ? this.state.error : 'There were no results for your search';
    console.log(`error: ${this.state.error}`);
    books.map(book => console.log(`title: ${book.volumeInfo.title}`));
    return (
      <div className="App">

        { <SearchForm 
              onClick={query => this.handleQuery(query)} 
              printTypeFilter={printType => this.handlePrintTypeFilter(printType)} 
              bookTypeFilter={bookType => this.handleBookTypeFilter(bookType)} /> }

        { books.length > 0 && <BookList books={books} /> }
        
        { books.length === 0 && 
                      <div className="noResults">
                        <h1>{errorMessage}</h1>
                        <h2>Please, try again!</h2>
                      </div> }

      </div>
    );
  }
}

export default App;
