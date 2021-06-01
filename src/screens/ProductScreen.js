import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import data from '../data';


var callAPI = (firstName,lastName)=>{
  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // using built in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify({"firstName":firstName,"lastName":lastName});
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };
  // make API call with parameters and use promises to get response
  fetch("https://n3gbqg4hh3.execute-api.us-east-1.amazonaws.com/dev/", requestOptions)
  .then(response => response.text())
  .then(result => alert(JSON.parse(result).body))
  .catch(error => console.log('error', error));
}



export default function ProductScreen(props) {
  const product = data.products.find((x) => x._id === props.match.params.id);
  if (!product) {
    return <div> Product Not Found</div>;
  }

  return (
    <div>
      <Link to="/">Back to result</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name}></img>
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </li>
            <li>Pirce : ${product.price}</li>
            <li>
              Description:
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="error">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button className="primary block">Add to Cart</button>
                <form>
                  <label>First Name :</label>
                  <input type="text" ref={fName}/>
                  <label>Last Name :</label>
                  <input type="text" ref={lName}/>
                  <label>Email :</label>
                  <input type="text" ref={email}/>
                  
                
                </form>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}