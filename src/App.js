/*eslint-disable*/

import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { createContext, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link , useNavigate, Outlet } from 'react-router-dom';
import DetailPage from './routes/DetailPage.js';
import axios from 'axios';
import Cart from './routes/Cart.js';
import { useQuery } from 'react-query';

export let Context1 = createContext() //state 보관함

function App() {

  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10,11,12]);
  let navigate = useNavigate();
  
  let result = useQuery('user', () => {
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((data) => {
      return data.data
    })
  })


  console.log(result.isLoading);

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">My Shoe Mall</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>홈</Nav.Link>
            <Nav.Link onClick={() => navigate('/detail')}>상품</Nav.Link>
            <Nav.Link onClick={() => navigate('/cart')}>장바구니</Nav.Link>
          </Nav>
          <Nav className="ms-auto">{ result.isLoading == true ? '로딩중' : result.name }</Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map((item, i) => {
                    return (
                      <ShoesList shoes={item} i={i} key={i} navigate={navigate} />
                    ) 
                  })
                }
                <button className="btn btn-primary" onClick={() => {
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((data) => {
                    setShoes([...shoes, ...data.data]);
                  }).catch(() => {
                    console.log('실패함 ㅅㄱ');
                  })
                }}>더보기</button>
              </div>
            </div>
          </>
        } />
        <Route path="/detail/:id" element={ <DetailPage shoes={shoes} /> } />   
        <Route path="/cart" element = { <Cart /> } />
        <Route path="/about" element={ <About/> }>
          <Route path="member" element={ <div>멤버임~</div> }/>
          <Route path="location" element={ <div>위치정보임~</div> } />  
        </Route>
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={ <div><p> 첫 주문시 양배추즙 서비스 </p> </div>} />
          <Route path="two" element={ <div><p> 생일기념 쿠폰받기 </p></div>} />
        </Route>
        <Route path="*" element={ <div>404페이지에요</div> } />
      </Routes>
    </div>
  );
}

function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About(){
  return (
    <div>
      <h4>회사 정보임!</h4>
      <Outlet></Outlet>
    </div>
  )
}

function ShoesList(props){
  return (
      <div className="col-md-4" onClick={() => {props.navigate('/detail/'+props.shoes.id)}}>
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i + 1) + '.jpg'} width="80%"></img>
      <h4 >{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}원</p>
    </div>
  )
}


export default App;

