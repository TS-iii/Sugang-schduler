
import React , {useState,useCallback,useEffect} from 'react';
import {useSelector} from 'react-redux';

import Graph from '../../component/graph/Graph';

import  { mainTree,lookschedule} from '../../lib/tree/tree';




// 안겹친다는 가정이 필요
// 안겹치고 이 함수를 사용하면 dst 시간표에 src가 추가됨. 
// 시간표와, 시간표에 넣을 과목을 dst, src 차례로 주면됨
//const insertTable=function(dst,src)



const GraphContainer=()=>{



    //TdrawList랑 addlist id는 배열의 인덱스랑 같음 
    const [TdrawList,setTdrawList]=useState([]);    // 현재 신청된 목록들  (/graph 상단 목록에 영향)
    //{data: , id: }


    const [makingdrawList,setmakingdrawList]=useState([]); // 현재 신청된 목록의 시간표 좌표 구현

    const [allList,setallList]=useState([]);    

    const [nownum,setnownum]=useState(0);   


    const [click,setclick]=useState([]);
    const [maindata,setmaindata]=useState([]);


    const [world,setworld]=useState(false);
    const [first,setfirst]=useState(true);


    // 대안 루트 (id)는 실패했을 경우 
    
    //TdrawList에 의존적
    // click에 의존적 
     

    const NextRoot=(id)=>{
        
        let bb=[];

        

        let maindatas=[];
        let data;
        data=maindata.find(c=>c.id===id);

        if(data){
            maindatas=maindata.filter(c=>c.id!==id);
            bb=click.concat(data);
             
        }

        else{
            data=click.find(c=>c.id===id);
            if(data){

                bb=click.filter(c=>c.id!==id);
                maindatas=maindata.concat(data);
                
            }

        }


         console.log("시작");
       
         //기존 고정맴버랑 실패된 과목 빼고 시간표짬.
        const fflist=mainTree(Maintable,maindatas,bb);
         
        let list=[];
         // 그리고 기존 고정맴버 추가
        if(fflist.length===0)
         list.push(maindatas);

            
        else{
        for(let i=0;i<fflist.length;i++){

            list.push(fflist[i].concat(maindatas));

        
        }
        }

        if(bb.length===0)
            Calculate();

        else{
        setclick(bb);
        setmaindata(maindatas);
        setnownum(0);
  
        setallList(list);
     
        finalprint(list,0,true);
        setworld(true);

        }
      
   
        

    };



    // 현재 시간표에서 삭제 버튼 클릭시 함수 호출 
  
      

    const {type1,type2,type3}=useSelector(({write})=>({

       type1:write.type1,
       type2:write.type2,
       type3:write.type3,
    }
    )); 

    const Maintable={
        type1,type2,type3
    };
    




    // 배열로 시간표 리스트만 넘기면됨 

    useEffect(()=>makingDrawList([],-1),[TdrawList]);
    useEffect(()=>finalprint(allList,nownum,world),[nownum]);
    useEffect(()=>firstfunc(),[first]);

    const firstfunc=()=>{

        if(first===true){

            setfirst(false);
            Calculate();

        }


    }

    // 얘는 TdrawList를 살펴보고 과목당 시간을 적절히 출력할 수 있게 숫자로 바꿔줌
    const makingDrawList=(something,index)=>{

        if(something.length===0)
            something=TdrawList;

        if(index!==-1)
            {
                setnownum(index);

            }


        let makingTable=[];

        for(let i=0;i<something.length;i++){  // 한 과목씩 살펴봄

            for(let j=0;j<something[i].classtime.keyword.length;j++){  // 한 과목의 요일수
                
                let day;

                switch(something[i].classtime.keyword[j]){
                    case 't1': day=5; break;
                    case 't2': day=24; break;
                    case 't3': day=43; break;
                    case 't4': day=62; break;
                    case 't5': day=81; break;
                    default: break;

                }

              

              let dayarr=  something[i].classtime[something[i].classtime.keyword[j]]; // 요일 배열
                
              let timeleng=dayarr.length * 3.5;
              let time=9+((dayarr[0]-2)*3.5);

                makingTable.push({x:day,y:time,ycolor:timeleng,color:"#CEF6F5",text:something[i].classname});
            
            }


        }
        
        setmakingdrawList(makingTable);


    };

    

    const Calculate=()=>{

        const fflist=mainTree(Maintable,[],[]);
        setnownum(0);
        setclick([]);
        
        setmaindata([...fflist[0]]);
        setworld(false);
        setallList(fflist);
        finalprint(fflist,0,false);

    

    };


    const finalprint=(list,num,c)=>{

        let kkk=[];
        if(list.length!==0){

            
        for(let i=0;i<list[num].length;i++){

            let tt=list[num][i];

            kkk.push(tt);

        }

        if(c===false){
            setmaindata([...list[num]]);
        }
        

        setTdrawList(kkk);


    }

    };
    

    return (
        <Graph 
            makingdrawList={makingdrawList}
            NextRoot={NextRoot}
            click={click}
            maindata={maindata}
            allList={allList}
            makingDrawList={makingDrawList}
            nownum={nownum}
            world={world}
            >

            </Graph>
    );


};


export default GraphContainer;