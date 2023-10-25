/*eslint-disable*/

import { useContext, useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context1 } from './../App.js';
import { addProduct } from './../store.js';
import { useDispatch } from "react-redux";

const DetailPage = (props) => {
    
    let [isShow, setIsShow] = useState(true);
    let [count, setCount] = useState(0);
    let [tab, setTab] = useState(0);

    let [fade2, setFade2] = useState('');

    const {id} = useParams();

    let dispatch = useDispatch();
    
    useEffect(() => {
        let watched = localStorage.getItem('watched');
        if(watched == null) {
            localStorage.setItem('watched', JSON.stringify([id]));
        }else{
            watched = JSON.parse(watched);
            watched.push(id);
            watched = new Set(watched);
            watched = Array.from(watched);
            localStorage.setItem('watched', JSON.stringify(watched));
        }
    }, []);


    useEffect(() => {
        let timer = setTimeout(() => { setIsShow(false) },2000)
        setFade2('end')
        
        return () => { //clean up function
            setFade2('');
        }
    }, []);

    let shoe = props.shoes.find((item) => {
        return item.id == id
    });

    





    return (
        <div className={`container start ${fade2}`}>
            {
                isShow == true ? <div className="alert alert-warning"> 2초이내 구매시 할인 </div> : null
            }
            {/* <YellowBtn bg="blue">노오오오란박스버튼</YellowBtn>
            <YellowBtn bg="red">노오오오란박스버튼</YellowBtn> */}
            <div className="row">
                <div className="col-md-6">
                <img src={'https://codingapple1.github.io/shop/shoes'+(Number(id) + 1)+'.jpg'} width="100%" />
                </div>
                <div className="col-md-6">
                <h4 className="pt-5">{shoe.title}</h4>
                <p>{shoe.content}</p>
                <p>{shoe.price}원</p>
                <button className="btn btn-danger" onClick={() => dispatch(addProduct(shoe))}>주문하기</button> 
                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => setTab(0)}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => setTab(1)}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => setTab(2)}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}></TabContent>
        </div> 
    )
};


function TabContent(props){

    let [fade, setFade] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setFade('end');
        }, 100);
        
        return () => {
            clearTimeout();
            setFade('');
        }
    }, [props.tab]);


    return (<div className={`start ${fade}`}>
        { [<div>버튼0</div>, <div>버튼1</div>, <div>버튼2</div>][props.tab] }
    </div>)
}


export default DetailPage;
