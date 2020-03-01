
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

        setclick(bb);
        setmaindata(maindatas);
        setnownum(0);
        
        console.log("메인데이터!");
        console.log(maindatas);
        console.log("클릭");
        console.log(bb);
        console.log("fflist");
        console.log(fflist);

        setallList(list);
        finalprint(list,0);
        // 그리고 적용 setnownum이 적용된 후 setallList가 적용됨
        // setworld(false,()=>setnownum(0,()=>setallList(list)));
    
        
        console.log("리스트출력한다!");
        console.log(list);
        

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
    


// useEffect(()=>makingDrawList(),[TdrawList]);
// useEffect(()=>finalprint(),[allList]);

    // 배열로 시간표 리스트만 넘기면됨 

    useEffect(()=>makingDrawList(),[TdrawList]);
    // 얘는 TdrawList를 살펴보고 과목당 시간을 적절히 출력할 수 있게 숫자로 바꿔줌
    const makingDrawList=()=>{

        let makingTable=[];

        for(let i=0;i<TdrawList.length;i++){  // 한 과목씩 살펴봄

            for(let j=0;j<TdrawList[i].classtime.keyword.length;j++){  // 한 과목의 요일수
                
                let day;

                switch(TdrawList[i].classtime.keyword[j]){
                    case 't1': day=5; break;
                    case 't2': day=24; break;
                    case 't3': day=43; break;
                    case 't4': day=62; break;
                    case 't5': day=81; break;
                    default: break;

                }

              

              let dayarr=  TdrawList[i].classtime[TdrawList[i].classtime.keyword[j]]; // 요일 배열
                
              let timeleng=dayarr.length * 3.5;
              let time=9+((dayarr[0]-2)*3.5);

                makingTable.push({x:day,y:time,ycolor:timeleng,color:"#CEF6F5",text:TdrawList[i].classname});
            
            }


        }
        
        setmakingdrawList(makingTable);


    };

    

    const Calculate=()=>{

        const fflist=mainTree(Maintable,[],[]);
        setnownum(0);
        setclick([]);
        
        setmaindata([...fflist[0]]);

        setallList(fflist);
        finalprint(fflist,0);

    

    };


    const finalprint=(list,num)=>{

        let kkk=[];
        if(list.length!==0){

            
        for(let i=0;i<list[num].length;i++){

            let tt=list[num][i];

            kkk.push(tt);

        }

        if(click.length===0){
            setmaindata([...list[num]]);
        }
        

        setTdrawList(kkk);


    }

    };
    

    const next=()=>{
        let num=0;
        if(allList.length -1 === nownum  ){

            setnownum(0);

           
        }

        else {
            num=nownum+1;
            setnownum(nownum+1);
            

        }
 finalprint(allList,num);

    };

    const previous=()=>{

        if(nownum>0){
                let num=nownum-1;
            setnownum(nownum-1);
            finalprint(allList,num);

        }

        

    };

     


    return (
        <Graph 
            TdrawList={TdrawList}
            makingdrawList={makingdrawList}
            Calculate={Calculate}
            next={next}
            previous={previous}
            NextRoot={NextRoot}
            click={click}
            maindata={maindata}
           
            >

            </Graph>
    );


};


export default GraphContainer;