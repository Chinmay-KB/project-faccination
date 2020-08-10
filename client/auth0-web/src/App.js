import React from 'react';
import './App.css';

function App() {
  return (
    <div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" placeholder="Enter Valid URL"/>
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
     </button>
   </div>
</div>
  );
}
export default App;
