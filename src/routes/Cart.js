import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from '../store/userSlice.js';  
import { changeCount } from '../store.js'; 


function Cart() {
    let cart = useSelector((state) => state.cart );

    let user = useSelector(state => state.user);

    let dispatch = useDispatch(); //storejs에 요청을 보내는 함수

    return (
        <div>
            <h6>{user.name}님의 장바구니 입니다.{user.age}</h6>
            <button onClick={() => console.log(cart)}>버튼</button>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>상품번호</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>
                        
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    cart.map((item, i) => 
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>
                                <button onClick={() => {
                                    dispatch(changeCount(item.id))
                                }}> +++ </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
            </Table>
        </div>
    )
}
export default Cart;