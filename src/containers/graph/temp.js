
import React , {useState,useCallback,useEffect} from 'react';
import {useSelector} from 'react-redux';

import Graphy from '../../component/graph/Graphy';

import  { mainTree,lookschedule} from '../../lib/tree/tree1';



// 안겹친다는 가정이 필요
// 안겹치고 이 함수를 사용하면 dst 시간표에 src가 추가됨. 
// 시간표와, 시간표에 넣을 과목을 dst, src 차례로 주면됨
//const insertTable=function(dst,src)



const GraphContainer=()=>{



    //TdrawList랑 addlist id는 배열의 인덱스랑 같음 
    const [TdrawList,setTdrawList]=useState([]);    // 현재 신청된 목록들  (/graph 상단 목록에 영향)
    //{data: , id: }
    const [addlist,setaddlist]=useState([]);    // 현재 추가 가능한 목록들 (/graph 하단 목록에 영향 )
    // {data: id: }

    const [makingdrawList,setmakingdrawList]=useState([]); // 현재 신청된 목록의 시간표 좌표 구현

    const [allList,setallList]=useState([]);    

    const [nownum,setnownum]=useState(0);   


    const [click,setclick]=useState([]);
    const [maindata,setmaindata]=useState([]);


    // const [first,setfirst]=useState(true);

    
    


    // 대안 루트 (id)는 실패했을 경우 
    
    //TdrawList에 의존적
    // click에 의존적 
     
    const NextRoot=(id)=>{
        
        let bb=[];


        let tf=false;
        
        let maindatas=[];
        let data=TdrawList.find(c=>c.id===id);

        if(click.length===0)
            {   
               
               maindatas=TdrawList.filter(c=>c.id!==id);
                bb.push(data);
             
                tf=false;
            }

        else{

        for(let i=0;i<click.length;i++){

            
            if(click[i].id!==id)
                {
                   bb.push(click[i]);

                }
            

        }
        
        
            // id가 있었음
        if(bb.length!==click.length){
                tf=true;
               
                  maindatas=[...maindata,data];
                
            
        }

        //id가 없었음 
        else{
            tf=false;
          
            bb.push(data);

            maindatas=TdrawList.filter(c=>c.id!==id);
        }

         }


         let kk=[];
         if(tf===false)
            kk=TdrawList.filter(c=>c.id!==id);
        else 
            kk=TdrawList;

       
         
        
         console.log("시작");
       
         //기존 고정맴버랑 실패된 과목 빼고 시간표짬.
        const fflist=mainTree(Maintable,kk,bb);
         
        let list=[];
         // 그리고 기존 고정맴버 추가
        if(fflist.length===0)
         list.push(kk);

            
        else{
        for(let i=0;i<fflist.length;i++){

            list.push(fflist[i].concat(kk));

        
        }
        }

        setclick(bb);
        setmaindata(maindatas);
        setnownum(0);
        

        setallList(list);
        
        // 그리고 적용 setnownum이 적용된 후 setallList가 적용됨
        // setworld(false,()=>setnownum(0,()=>setallList(list)));
    
        

        

    };



    // 현재 시간표에서 삭제 버튼 클릭시 함수 호출 
    const Delete=(id)=>{

       const aa=TdrawList.filter(e=>(e.id!==id));  // 일단 삭제할 id찾아서 지운배열을 aa에 전달


       setTdrawList(aa);    // 그리고 TdrawList에 적용

       let addtemp=[];      // 추가가능한 과목들 배열 만듬
    
      

       // 여기서부터는 1,2,3순위 입력된 모든 과목들중에 aa에 있는 과목을 제외하고 추가로 신청 가능한 과목이 있는지 살펴봄.
       for(let j=0;j<type1.length;j++){ // type1부터 살펴봄

        let i=0;
        for(i=0;i<aa.length;i++)    // aa는 현재 선택된 시간표 
        {
        if(aa[i].classname===type1[j].classname)   // 같은 과목은 동시 수강 못하므로 
                    break;
        if(!lookschedule(aa[i].classtime,type1[j].classtime))
                break;  // 시간표가 중복되면 동시 수강 못하므로 
                


        }

        if(i===aa.length){  // 최종적으로 수강 가능한 과목이면
            addtemp.push(type1[j]);    // addtemp에 넣음.
          
        }



        }




       
        for(let j=0;j<type2.length;j++){

            let i=0;
            for(i=0;i<aa.length;i++)
            {
            if(aa[i].classname===type2[j].classname)
                        break;
            if(!lookschedule(aa[i].classtime,type2[j].classtime))
                    break;
                    
    
    
            }
    
            if(i===aa.length){
                addtemp.push(type2[j]);
             
    
            }
    
    
    
            }


            for(let j=0;j<type3.length;j++){

                let i=0;
                for(i=0;i<aa.length;i++)
                {
                if(aa[i].classname===type3[j].classname)
                            break;
                if(!lookschedule(aa[i].classtime,type3[j].classtime))
                        break;
                        
        
        
                }
        
                if(i===aa.length){
                    addtemp.push(type3[j]);
                    
        
                }
        
        
        
                }
    
        setaddlist(addtemp);
          
      };

      
      const Add=(id)=>{

        

        let aa=[];

        let data=addlist.find(c=>c.id===id);

        if(TdrawList.length!==0)    // 과목 개수가 0이 아니면
             aa=[...TdrawList,data]; // 기존 과목배열에 신규 과목 추가 
        else
            aa.push(data);    // 현재 과목 개수가 0이면 그냥 추가 



     
        let bb=[];
     
      
        for(let i=0;i<addlist.length;i++){
            if(addlist[i].id!==id){
                if(addlist[i].classname!==data.classname){
                    if(lookschedule(addlist[i].classtime,data.classtime))
                        {
                            bb.push(addlist[i]);
                         
                        }

                }
          
            }


        }
      
        setaddlist(bb);
        setTdrawList(aa);


      };
    
      
      

    const {type1,type2,type3}=useSelector(({write})=>({

       type1:write.type1,
       type2:write.type2,
       type3:write.type3,
    }
    )); 

    const Maintable={
        type1,type2,type3
    };
    


useEffect(()=>makingDrawList(),[TdrawList]);
useEffect(()=>finalprint(),[allList]);

    // 배열로 시간표 리스트만 넘기면됨 

    // 얘는 TdrawList를 살펴보고 과목당 시간을 적절히 출력할 수 있게 숫자로 바꿔줌
    const makingDrawList=useCallback(()=>{

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
        
        console.log(makingTable);
        setmakingdrawList(makingTable);


    },[TdrawList]);

    

    const Calculate=()=>{

        const fflist=mainTree(Maintable,[],[]);
        setnownum(0);
        setmaindata([...fflist[0]]);
        

        setallList(fflist);
        
       // setnownum(0,()=>setworld(true,()=>setallList(fflist,()=>console.log("씨발"))));
    

    };


    const finalprint=()=>{

        let kkk=[];
        if(allList.length!==0){

            
        for(let i=0;i<allList[nownum].length;i++){

            let tt=allList[nownum][i];

            kkk.push(tt);



            // if(world===false){

            //     if(!maindata.find(c=>c.id===allList[nownum][i].id)){

            //         setsubdata(allList[nownum][i]);

            //     }
                
            // }

        }



        for(let i=0;i<click.length;i++){
            kkk.push(click[i]);
        }

        

        setTdrawList(kkk);

    }

    };
    

    const next=()=>{

        if(allList.length -1 === nownum  ){

            setnownum(0);

           
        }

        else {

            setnownum(nownum+1);
            

        }
 finalprint();

    };

    const previous=()=>{

        if(nownum>0){

            setnownum(nownum-1);
            finalprint();

        }

        

    };

     


    return (
        <Graphy 
            TdrawList={TdrawList}
            Delete={Delete}
            makingdrawList={makingdrawList}
            Calculate={Calculate}
            next={next}
            previous={previous}
            Add={Add}
            addlist={addlist}
            NextRoot={NextRoot}
            click={click}
            maindata={maindata}
           
            >

            </Graphy>
    );


};


export default GraphContainer;