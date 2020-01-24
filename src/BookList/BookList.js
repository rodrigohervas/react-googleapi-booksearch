import React, {Component} from 'react';
import Book from '../Book/Book';

class BookList extends Component {
  
  isForSale(book) {
    return book.saleInfo.saleability === "NOT_FOR_SALE" ? false : true;
  }

  renderBooks() {
      const books = this.props.books.map( book => {
        const authors = !book.volumeInfo.authors ? 'Not available' : book.volumeInfo.authors.join(', ');
        const snippet = !book.searchInfo ? 'Not available' : book.searchInfo.textSnippet;
        const retailPrice = book.saleInfo && this.isForSale(book) && book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : 0;

        return <Book key={book.id} 
                     imageUrl={book.volumeInfo.imageLinks.thumbnail} 
                     title={book.volumeInfo.title} 
                     author={authors}
                     publisher={book.volumeInfo.publisher} 
                     publishedDate={book.volumeInfo.publishedDate}
                     googlePlayUrl={book.volumeInfo.infoLink} 
                     price={retailPrice} 
                     bookIntro={snippet}  
                     description={book.volumeInfo.description} /> 
      });
      return books;
  };

  render() {

    return (
      <div className="bookList">

        {this.renderBooks()}

      </div>
    );
  }
}

export default BookList;
