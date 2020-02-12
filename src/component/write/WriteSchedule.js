import React ,{useState,useCallback} from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';







const BackTemplate= styled.div`

position:absolute;
left:0;
right:0;
top:0;
bottom:0;

background:${palette.gray[2]};
padding-left:10px;
padding-right:10px;




`;


const ContentBody=styled.div`
  
height:100%;
border-top:2rem;

display:flex;
flex-direction:row;
flex-wrap:nowrap; // 한줄에 표사
justify-content:flex-start;



`;


const WriteList=styled.div`

.explain {

    color:green;
    

}

width:50%;
border-right:1px solid black;

display:flex;
flex-direction:column;
 align-items:center;
 justify-content:center;

`;


const WriteBox=styled.form`


display:flex;

input,button{

    border:none;
    outline:none;
}

input {
    flex:1;
    height:50px;
    width:400px;

    font-size:1.5rem;
    
    

}

button{
    cursor:pointer;
    background:${palette.gray[9]};
    color:white;
    font-weight:bold;
    height:50px;
    width:100px;
    font-size:1.5rem;


}

`;


const ListTemplate=styled.div`

width:50%;


 h2 {
   
    text-align:center;

    padding-top:1rem;

 }






`;

const DataBlock=styled.div`


height:80%;

background:white;


`;

const DataList=React.memo(({dataes,onRemove})=>(

    <DataBlock>
    
    
{     
    <ul>
    {
     dataes.map(data=>(
    <li><DataItem key={data} data={data} onRemove={onRemove}   /> </li>
    ))
    }

    </ul> 

}
  
 
    
    
    </DataBlock>

   

));

const DataItemBlock=styled.div`


display:flex;

button,Data{
border:none;
outline:none
}



button{

    cursor:pointer;
    font-weight:bold;
    color:white;
    background:${palette.gray[9]};
    
}

`;

const DataItem=React.memo(({data,onRemove})=>(

    <DataItemBlock>
    <Data >{data}</Data>
    <button onClick={()=>onRemove(data)}>삭제</button>
    </DataItemBlock>

));

const Data=styled.div`


`;

const WriteSchedule=()=>{
    
    const [localData,setLocalData] = useState([]);
    const [input,setInput]=useState('');

    const insertData=useCallback(data=>{

       setLocalData([...localData,data]);

    },[localData]);


    const onChange=useCallback(e=>{

        setInput(e.target.value);

    },[]);
    

    const onSubmit=useCallback(e=>{

        e.preventDefault();
        insertData(input.trim());   // 앞뒤 공백 없앤후 등록
        setInput('');

    },[input,insertData]);


    const onRemove=useCallback(
        data=>{
            setLocalData(localData.filter(d=>d!==data));
        },[localData,]);



    return(

        <BackTemplate> 

        <ContentBody>

        <WriteList>
                
            <div className="explain">
            중요도/과목명/시간/교수이름/학점 으로 입력 <br/>
           **************************************************************<br/>
            중요도: 1,2,3 <br/>
            [1: 꼭 수강신청 해야함]  [2: 1보단 덜함]  [3: 2보단 덜함] <br />
            ************************************************************* <br/>
            ex) 중요도 1, 과목명:전자회로 시간:월A 수A 교수이름: 홍길동 학점:3학점 이면 <br/>
            1/전자회로/월A 수A / 홍길동/3   입력 <br/>
            <br/>
         

            
            </div>

            <WriteBox onSubmit={onSubmit}>
                
                <input 
                placeholder="중요도/과목명/시간/교수이름/학점"
                onChange={onChange}
                value={input}
                />
                <button type="submit">등록 </button>
        
            </WriteBox> 
            
            
             </WriteList>

            <ListTemplate>

                <h2>현재 신청 리스트</h2>
                

                <DataList dataes={localData} onRemove={onRemove} />
                

            </ListTemplate>

             


        </ContentBody>


        </BackTemplate>


    );


}



export default WriteSchedule;







