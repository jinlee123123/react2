import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,Navbar,Container} from 'react-bootstrap';
import bg from './img/bg.png';
import { lazy,Suspense,useEffect,useState } from 'react';
import  data from './data.js';
import { Routes,Route,Link,useNavigate,Outlet, useParams, json } from 'react-router-dom';
// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js';
import axios from 'axios';
import { useQuery } from 'react-query';

const Detail =lazy(() => import('./routes/Detail.js'));
const Cart =lazy(() => import('./routes/Cart.js'));

function App() {
  useEffect(()=>{
    localStorage.setItem('watched',JSON.stringify([]))
},[])

  let [shoes, setShoes ] = useState(data);
  let [count , setCount ] =useState(1);
  let navigate = useNavigate();

  let result = useQuery(['작명'], ()=>
  axios.get('https://codingapple1.github.io/userdata.json')
  .then((a)=>{ return a.data 
  })
)
  
  // result.data
  // result.isLoading
  // result.error

  return (
    <div className="App">
      <>
        <Navbar bg="dark" variant="dark">
          <Container className='nav-list'>
            <Navbar.Brand onClick={()=>{navigate('/')}}>ShoesShop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
            </Nav>
            <Nav className='ms-auto'>
              {/* { result.isLoading ? '로딩중' : result.data.name } */}
              {result.iserror &&'에러'}
              {result.isLoading &&'에러'}
              {result.data && result.data.name}
            </Nav>
          </Container>
        </Navbar>
      </>
      <Suspense fallback={<div>로딩중</div>}>
      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg' style={{ backgroundImage : `url(${bg})`}}>
            </div>
      
            <div className='container'>
              <div className='row'>

                {
                  shoes.map((a,i)=>{
                    return(
                      <ProductList shoes = { shoes } i ={i} useNavigate = { useNavigate }/>
                    )
                  })
                }

              </div>
            </div>
            <button onClick={()=>{
              setCount(count+1);
              if (count <3){
                axios.get(`https://codingapple1.github.io/shop/data2.json`)
                .then((결과)=>{
                  let copy = [...shoes, ...결과.data];
                  setShoes(copy);
                  })
                .catch(()=>{
                  alert('데이터 전송 실패!')
                })
              }else{
                alert('더이상 자료 x');
              }
            }}>더보기</button>
          </>
        }/>
        <Route path='/detail/:id' element={ <Detail shoes ={ shoes }/>}/>
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<>회사정보임</>}/>
          <Route path='location' element={<>위치정보임</>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='*' element={<><p>주소notfound</p></>}/>
      </Routes>
      </Suspense>

    
    </div>
  );
}

function ProductList(props){
  let navigate = useNavigate();

  return(
    <div className='col-md-4'>
      {/* <img src='https://codingapple1.github.io/shop/shoes1.jpg' width="80%"></img> img src입력란을 자바스크립트형식으로 바꿈*/}
      <img src={`https://codingapple1.github.io/shop/shoes${props.i+1}.jpg`} width="80%"></img>
      <h4 onClick={()=>{navigate(`/detail/${props.i}`)}}>{ props.shoes[props.i].title }</h4>
      <p>{ props.shoes[props.i].content }</p>
    </div>
  )
}


function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
