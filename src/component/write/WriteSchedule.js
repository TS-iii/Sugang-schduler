import React ,{useState,useCallback, useEffect} from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import {Link} from 'react-router-dom';



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

button{

    width:100%;
    height:50px;
    color:red;
    font-weight:bold;
    background:${palette.gray[9]};
    cursor:pointer;

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
    width:100px;
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

const WriteSchedule=({onFinal,onCalculate})=>{
    
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


    const onResult=()=>{

            // localData 는 문자열 저장된 배열
            // let table={type1:[],type2:[],type3:[]};

            
            let id=0;
          
        
       
            //학점은 1에서 6까지 있는걸로
            localData.forEach(e=>{

                  //중요도/과목명/시간/교수이름/학점
                let splitData=e.split('/');
                let imp=splitData[0].trim();    //중요도
                let classname=splitData[1].trim();  // 과목명  
                let classtime=splitData[2].trim();  //시간
                let profess=splitData[3].trim();    // 교수이름
                let classscore=(splitData[4].trim())*1; //학점 , 숫자로 형변환

                // let totalInfo={
                //     imp,classname,classtime,profess,classscore
                // }
                
                                    let schedule={

                                        keyword:[],
                                        t1:[],
                                        t2:[],
                                        t3:[],
                                        t4:[],
                                        t5:[]

                                    };

                                    let n=-1;
                                    let t=null;

                        for(let i=0;i<classtime.length;i++){
                                    
                                        if(n===3)       
                                            {
                                                n=2;
                                                continue;
                                            }
                                        
                                        if(n===2)
                                            {
                                                n=-1;
                                                continue;
                                            }

                                        if(classtime[i]===' ')
                                            continue;

                                        switch(classtime[i]){

                                            case '월':
                                                t='t1';
                                                schedule.keyword.push(t);
                                                break;
                                            case '화':
                                                t='t2';
                                                schedule.keyword.push(t);
                                                break;
                                            case '수':
                                                t='t3';
                                                schedule.keyword.push(t);
                                                break;
                                            case '목':
                                                t='t4';
                                                schedule.keyword.push(t);
                                                break;
                                            case '금':
                                                t='t5';
                                                schedule.keyword.push(t);
                                                break;    
                                            
                                            default:
                                                break;
                                        
                                        }

                                        if(classtime[i]>='A' && classtime[i]<='J')
                                            {   let b=classtime[i].charCodeAt(0)-65;
                                                b=(b+1)*3;

                                                schedule[t].push(b-1);
                                                schedule[t].push(b);
                                                schedule[t].push(b+1);

                                                continue;
                                            }

                                        else if(classtime[i]>='1' && classtime[i]<='9')
                                            {   
                                                
                                                if(classtime[i+1]>='0' && classtime[i+1]<='9')
                                                    {
                                                        n=1;
                                                        continue;
                                                    }
                                                else if(n===1)
                                                    {
                                                        let b=20+(classtime[i]-'0');
                                                        n=-1;

                                                        if(classtime[i+1]==='.')
                                                            {
                                                                n=3;
                                                                schedule[t].push(b+1);
                                                            }
                                                        else
                                                            schedule[t].push(b);
                                                    
                                                    }

                                                else {

                                                    if(classtime[i+1]==='.')
                                                        {  n=3;
                                                            schedule[t].push(((classtime[i]-'0')*2)+1);
                                                            }
                                                    else
                                                        schedule[t].push((classtime[i]-'0')*2);
                                                }

                                            }

                                        
                                        


                            }//for문 끝  (시간표를 변환해주는 로직)


                classtime=schedule;

              
                
                
            let type;

            if(imp==='1')
                type='type1';
            else if(imp==='2')
                type='type2';
            else if(imp==='3')
                type='type3';
                            
                onFinal({   type,classname,classtime,profess,classscore ,id  });
                
                id++;
            // table[type].push({classname,classtime,profess,classscore});


            
            }) // 현재 LocalData에 있는 원소 각각에 대해 이 함수 실행 
            
            
           onCalculate();
        // onCalculate(); // 상태값을 읽어들임 
            
            
            
            // return <Graph props={localData} />
    
        };  // onresult 끝
    

     

    return(

        <BackTemplate> 

        <ContentBody>

        <WriteList>
                
            <div className="explain">
                -------------------------------------<br/>
                 1/전자장론/월A 수A/박용배/3<br/>
                1/알고리즘/화E 금E/위규범/ 3<br/>
                1/알고리즘/월D 목D/위규범/ 3<br/>
                1/오픈소스SW입문/금 5.5 6.5 7.5 /안병헌/ 3<br/>
                1 /도메인분석 및 sw설계 / 월B 목B/ 이정태 / 4<br/>
                1 /도메인분석 및 sw설계 / 월D 목D/이정태/  4<br/>

                1 /창의소프트웨어입문 /월B 목B/이환용/  1<br/>
                -------------------------------------<br/><br/><br/>
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
                
                <button onClick={onResult}>결과 보기</button>

            </ListTemplate>


        </ContentBody>


        </BackTemplate>


    );


}



export default WriteSchedule;



/*

분석해야되는 데이터
[객체1,객체2,...]

양식
{
과목이름:
교수이름:

중요도:
학점:String
시간:

}

데이터 전처리-해야하는일

1. 중요도로 데이터를 나눔
중요도1 : [,,,]
중요도2: [,,,]
중요도3 : [,,,]

2.같은 중요도에서 동일 과목 확인(시간은 다른데 과목은 동일)
(링크드리스트형태로 표현?)


시간표 객체
{

신청된 총 학점수:
현재 시간표에 들어있는 과목 객체 배열: [객체1,]    
월:[boolean,],
화:[],
수:[],
목:[],
금:[],

}



--------------------------------------------
요일 요소 안에 배열은 크기가 30   
첫번째 0은 '2'를 뜻하고
마지막 29는 '30'을 뜻함   

월 A 라면 시간표->월->0,1,2 번 인덱스 비었는지 확인
월 1.5,2,2.5라면 2를 곱해서 3,4,5로 만든다음 -2를 해서  1,2,3 번 인덱스가 비었는지 확인
(비었으면 false, 찼으면 true)



---------------------------------------
배열에 객체를 저장

// 시간표 비교해서 true,false 반환
export compare = function(a){  


    


} ;


// 목록에 시간표 추가함  
 

//시간표 삭제

export delete = function(a){




}




-----------------------------------

        
    const onResult=()=>{

        // localData 는 문자열 저장된 배열
        
        //학점은 1에서 6까지 있는걸로

        let splitData=localData.split('/'); 
        //중요도/과목명/시간/교수이름/학점
                
        let imp=splitData[0].trim(); // 1~3 앞뒤 공백 제거
        let classname=splitData[1].trim();

        let classtime=splitData[2].trim();
        

        let profess=splitData[3].trim();
        let classScore=splitData[4].trim(); // 1~6학점
        
              
            return <Graph props={localData} />

    };




*/



