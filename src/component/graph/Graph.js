import React ,{useEffect} from 'react';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import styled ,{css} from 'styled-components';



const BackTemplate=styled.div`

position:absolute;
left:0;
right:0;
top:0;
bottom:0;

background:${palette.gray[2]};
padding-left:10px;
padding-right:10px;
padding:10px;


display:flex;


`;


const TimeTemplate=styled.div`

width:70%;
height:100%;


background:${palette.gray[5]};


`;
const TimeTable=styled.div`

 width:80%;
 height:100%;



background:${palette.gray[5]};

border-top:1px solid black;
border-right:1px solid black;
border-left:1px solid black;
border-bottom:1px solid black;


position:relative;
// overflow:hidden;


`;

const RowZero=styled.div`




width:100%;
height:9%;

border-bottom:1px solid black;

background:#BCF5A9;

display:flex;
flex-direction:row;



`;

const Blank=styled.div`


width:5%;
background:black;
border-left:1px solid black;

`;

const ItemBoxStyle=css`

border:none;
outline:none;
width:19%;
border-left:1px solid black;




${props=>
    props.rowTitle && 
    css`
    
    font-weight:bold;
    display:flex;
    justify-content: center;
    align-items: center;
    
    `}
}

`;


const ItemBox=styled.div`



${ItemBoxStyle}

`;


const RowElement=styled.div`




height:7%;
width:100%;

display:flex;
flex-direction:row;
border-bottom:1px solid black;

`;

const ColumnTitle=styled.div`


width:5%;
display:flex;
font-weight:bold;
justify-content: center;
align-items: center;



`;

const Position=styled.div`


position:absolute;

left:${props=>props.x}%;
top: ${props=>props.y}% ;

width:19%;
height:${props=>props.ycolor}%;

background:${props=>props.color};

border-left:1px solid black;
border-bottom:1px solid black;



`;


const ListTemplate=styled.div`

width:30%;
height:100%;

background:#D0F5A9;

display:flex;
flex-direction:column;

overflow:scroll;


`;

const ListList=styled.div`
font-weight:bold;
display:flex;
flex-direction:column;
&:hover {
    background: ${palette.gray[6]};
  }


.n {

background:red;
color:white;

}

.worldt{

    background:blue;
    color:white;

}

.title{


    background:black;
    color:white;

}


`;

const OneList=styled.div`


display:flex;
flex-direction:row;

border:1px solid black;


`;

const ListName=styled.div`


font-weight:bold;



`;

const ListDelete=styled.button`

font-weight:bold;
background:${palette.gray[7]};
color:white;

`;

const ListFail=styled.button`

font-weight:bold;
backgrund:${palette.gray[9]};
color:red;


`;

const Element=({time})=>(

    <RowElement>
        <ColumnTitle>{time}</ColumnTitle>
        <ItemBox></ItemBox>
        <ItemBox></ItemBox>
        <ItemBox></ItemBox>
        <ItemBox></ItemBox>
        <ItemBox></ItemBox>
    </RowElement>

);

const arr=[9,10,11,12,13,14,15,16,17,18,19,20,21];

// const drawlist=[{x:43,y:9,ycolor:3.5,color:"red",text:"hi"}];   // 요소 1개당 x,y,ycolor,text가 정의되어있음

const DrawPosition=({x,y,ycolor,color,text})=>(

    <Position x={x} y={y} ycolor={ycolor} color={color} >{text}</Position>

);


// 가로: 5% 19% *5
// 세로: 9% 7& * 13


// 시간표 출력
// 시간을 계산을 해야함.


// 실패 버튼  
// 다른시간표 볼때


//뒤로가기 -> 그냥 뒤로감


const BottomList=styled.div`

position:absolute;

bottom:200px;




`;

const Graph=({makingdrawList,NextRoot,click,maindata,allList,makingDrawList,nownum,world})=>{



    return (
       
    <BackTemplate>


        <ListTemplate>

{
     
     world===false ? 



allList.map((list,index)=>(      
<ListList onClick={()=>makingDrawList(list,index)}>

{
index===nownum? <div className="n">{`${index+1}순위 추천 시간표(선택)`} </div> : <div>{`${index+1}순위 추천 시간표`}</div> 
}

{
    index!==nownum  ? list.map((n)=>(  <OneList>      <ListName>{`${n.classname}  ${n.profess} ${n.classscore}학점 `}</ListName>  </OneList>)) 
                 :    list.map((n)=>(
    <OneList>
         <ListName>{`${n.classname}  ${n.profess} ${n.classscore}학점 `}</ListName>
     { maindata.find(c=>c.id===n.id) ? <ListDelete onClick={()=>{NextRoot(n.id)}}>실패시 대안 시간표</ListDelete> : ""  }
    </OneList>))
    
}

<div>--------------------------------</div>
</ListList>
)) 


//world가 true면 
: 
    <>
    <ListList>

        <div className="title">****선택한 시간표 ****</div>
        {
        maindata.map((n)=>(
            <OneList>  
             <ListName>{`${n.classname}  ${n.profess} ${n.classscore}학점 `}</ListName>
             <ListDelete onClick={()=>{NextRoot(n.id)}}>실패시 대안 시간표</ListDelete> 
             </OneList>
        ))
        }
        {
        click.map((n)=>(
            <OneList>
          <ListName>{`${n.classname}  ${n.profess} ${n.classscore}학점 `}</ListName>
            <ListDelete onClick={()=>{NextRoot(n.id)}}>실패 취소</ListDelete>
            </OneList>
        ))
        
        } 
           <div>--------------------</div>
     <div className="title">***선택한 시간표중 과목 일부가 실패했을때 대안 시간표***</div>
     </ListList>
   
     {
   allList.map((list,index)=>(

      
    <ListList onClick={()=>makingDrawList(list,index)}>
        {index===nownum? <div className="n">{`${index+1}순위 추천 시간표(선택)`} </div> : <div className="worldt">{`${index+1}순위 추천 시간표`}</div> }
    {list.map((n)=>(
        <OneList>
            
            <ListName>{`${n.classname}  ${n.profess} ${n.classscore}학점`}</ListName>
    
        </OneList>
        
    
    )) 
    
    
    

    }
    
    
    
    <div>--------------------------------</div>
    </ListList>
    ))}
    </>


}


     </ListTemplate>
    {/* {TdrawList.map((n)=>(
    <OneList>
        <ListName>{`${n.classname}  ${n.profess}`}</ListName>
    

        {
        maindata.find(c=>c.id===n.id) ? <ListDelete onClick={()=>{NextRoot(n.id)}}>실패시 대안 루트</ListDelete> :
        ""
        }
        
        </OneList>)
        
        
        
        
        
        )}  

        {   click.map((n)=>(
                <OneList>
                       <ListName>{`${n.classname}  ${n.profess}`}</ListName>
          

        <ListDelete onClick={()=>{NextRoot(n.id)}}>실패 취소</ListDelete>
                </OneList>


        ))


        }
         */}
     

{/* 
        </ListTemplate> */}


        <TimeTemplate>
        <TimeTable>
        
        <RowZero>
        <Blank></Blank>
        <ItemBox rowTitle>월</ItemBox>
        <ItemBox rowTitle>화</ItemBox>
        <ItemBox rowTitle>수</ItemBox>
        <ItemBox rowTitle>목</ItemBox>
        <ItemBox rowTitle>금</ItemBox>
        </RowZero>



        {arr.map((time)=><Element time={time} />)}

        {makingdrawList.map((d)=><DrawPosition x={d.x} y={d.y} ycolor={d.ycolor} color={d.color} 
        text={d.text} />)}
        
        </TimeTable>
        </TimeTemplate>



     </BackTemplate>
    




    );
}



export default Graph;