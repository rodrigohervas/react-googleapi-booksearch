import React, {Component} from 'react';
import '../Book/Book.css';

class BookDetails extends Component {
  
  render() {
    
    return (
      <div className="bookDetails">
        <div className="bookDescription">{this.props.bookDetails.description}</div>
        <div className="buy">
            <div className="buy-link"><a href={this.props.bookDetails.googlePlayUrl} target="_blank" rel="noopener noreferrer" >Buy in Google Play</a></div>
            <div className="buy-price">{this.props.bookDetails.price} USD</div>        
        </div>
      </div>
    );
  }
}

export default BookDetails;
