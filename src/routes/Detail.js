import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {Nav,Navbar,Container} from 'react-bootstrap';
import style from './Detail.moudle.css'
import { addList,checkList } from "../store";
import { useDispatch,useSelector } from 'react-redux';


let YelloBtn = styled.button`
    background : ${ props => props.bg };
    color : ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px
`

function Detail(props){


    let {id} = useParams();
    let 찾은상품 = props.shoes.find(((x)=>{
        return x.id == id
    }))
    let [ alert1 , setAlert] = useState(true);
    let [ count , setCount] = useState(5);
    let [ num , setNum ] =useState('');
    let [탭 , 탭넘버] = useState();
    let [count2 , setCount2] = useState(0);
    let dispatch = useDispatch();
    let state = useSelector((state)=> state);
    
    useEffect(()=>{
        if(isNaN(num)==true){
            alert('숫자만입력하세요');
        }
    },[num])
    useEffect(()=>{
        for(let i= 4 ; i>0;i--){
            setTimeout(()=>{setCount(i)},(5-i)*1000)
        }
        setTimeout(()=>{setAlert(false)},5000)
    },[])
    useEffect(()=>{
        //데이터를 수정=> 새로만드는게아니라 기존데이터 가져와서 추가하는형식으로 코드짜야함

            let 꺼낸것 = JSON.parse(localStorage.getItem('watched'));
            꺼낸것.push(찾은상품.id)
            꺼낸것 = new Set(꺼낸것)
            꺼낸것 = Array.from(꺼낸것)
            localStorage.setItem('watched',JSON.stringify(꺼낸것))    

    },[])
    return(
        <>
        <div className="container">
            {
                alert1 == true ? 
                <div className="alert alert-warning">{count}초이내 구매시 할인</div>
                :null 
            }
            <div className="row">
            <div className="col-md-6">
                <img src={`https://codingapple1.github.io/shop/shoes${ 찾은상품.id+1 }.jpg`} width="100%" />
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">{찾은상품.title}</h4>
                <p>{찾은상품.content}</p>
                <p>120000원</p>
                <button className="btn btn-danger" onClick={()=>{
                    let count =0;
                    for(var i = 0; i<state.item.length;i++){
                        if(state.item[i].id == 찾은상품.id){
                            count++;
                        }
                    }
                    if(count == 1){
                        alert('이미 장바구니에 있습니다.')
                    }else{
                        dispatch(addList({id : 찾은상품.id, name : 찾은상품.title, count : 1}))
                        alert('장바구니에 추가되었습니다.')
                    }
            
                }}>주문하기</button> 
                <YelloBtn bg="blue">stylecomponents사용</YelloBtn>
            </div>
            </div>
            <input onChange={(e)=>{setNum(e.target.value)}} placeholder="숫자만입력하시오"></input>
            <YelloBtn bg="white">확인</YelloBtn>
        </div>
        <Nav variant="tabs"  defaultActiveKey="link0">
            
            <Nav.Item>
                <Nav.Link eventKey="link0" onClick={()=>{ 탭넘버(0)}}>버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link1" onClick={()=>{ 탭넘버(1)}} >버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link2" onClick={()=>{ 탭넘버(2)}}>버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent 탭 = { 탭 }/>

        </>
        )
    }

    function TabContent({탭}){
        
        let [fade, setFade] =useState('');

        useEffect(()=>{
            setTimeout(()=>{ setFade('end')},100)
            return()=>{
                setFade('')
            }
        },[탭])

        return (
        <div className={`start ${fade}`}>
            {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][탭]}
        </div>
        ) 
    }

    // function TabContent(props){
    //     if(props.탭 == 0){
    //         return <div>내용0</div>
    //     }else if( props.탭 == 1){
    //         return <div>내용1</div>
    //     }else if ( props.탭 == 2){
    //         return <div>내용2</div>
    //     }
    // }
    // function TabContent({탭,props2}){
    //     if(탭 == 0){
    //         return <div>내용0</div>
    //     }else if( 탭 == 1){
    //         return <div>내용1</div>
    //     }else if ( 탭 == 2){
    //         return <div>내용2</div>
    //     }
    // }
    
    export default Detail;