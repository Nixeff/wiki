import './Top.css';

function Top() {
  return (
    <div>
      <div className='title'>Title</div>
      <div className='searchBox'>
        <input className='search'></input>
        <input type="submit" className='searchButton'/>
      </div>
    </div>
  );
}

export default Top;