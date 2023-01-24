import {Table} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import {changeName,stockUp} from './../store.js';

function Cart(){

    let state = useSelector((state)=> state);
    // let a = useSelector((state)=>{ return state.user})
    // user라는 항목만 가져다쓰는거임
    // ()=>{return a} 축약해서 사용가능 ()=> a 
    let dispatch = useDispatch();
    //store.js에서 함수좀 실행해달라고 메세지보내는용으로 사용

    return(
        <>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                {
                    state.item.map((a,i)=>{
                        return(
                            <tbody>
                            <tr>
                                <td>{state.item[i].id}</td>
                                <td>{state.item[i].name}</td>
                                <td>{state.item[i].count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(stockUp(state.item[i].id))
                                        //i를 넣는게아니라 id값을 넣어서 정렬값충돌방지해주기
                                    }}>+</button>
                                </td>
                            </tr>
                        </tbody>
                        )
                    })
                }
            </Table> 
        
        
        </>
    )

}


export default Cart;