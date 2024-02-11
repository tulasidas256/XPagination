import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [page, setpage] = useState(1);
  const [start, setstart] = useState(0);
  const [end, setend] = useState(10);

  const employeApi = async () => {

    try {
      let res = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
      //console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log("Error fetching data: ", e);
      alert("failed to fetch data");
    }
  };


  const next = () => {
    //console.log("next");
    let lastPage = Math.ceil(data.length / 10);
    if (page < lastPage) {
      setstart(end );
      setend(end + 10);
      setpage(page + 1);
    }
  }

  const previous = () => {
    //console.log("prev");
    if (page > 1) {
      setstart(start - 10);
      setend(end - 10);
      setpage(page - 1);
    }
  }


  useEffect(() => {
    employeApi();
  }, []);

  useEffect(()=>{
    console.log("render");
    console.log("after render",data);
    console.log("start =>",start);
    console.log("end =>",end);
  },[page]);


  return (
    <div className="App">
      <h1>Employee Data Table</h1>

      <table>
        <thead>
          <tr>
            <th >ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(start,end).map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div className='button'>
        <button onClick={previous}>Previous</button>
        <p>{page}</p>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}

export default App;
