

import React , {useState,useCallback,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import WriteSchedule from '../../component/write/WriteSchedule';

import {register} from '../../modules/write';

import Node ,{lookschedule,insertTable,composeTree ,search} from '../../lib/tree/tree';



const WriteContainer=({history})=>{

     const dispatch = useDispatch();

     const {type1,type2,type3}=useSelector(({write})=>({

        type1:write.type1,
        type2:write.type2,
        type3:write.type3,
     }
     ));  // write 가 관리하고 있는 상태를 불러와서 write에 저장


     const table={
         type1,
         type2,
         type3
     };

     
// 1번 순회함.


//type1이 변경되면 onCalculate 함수를 실행 

useEffect(()=>{onCalculate()},[type1]);


const onCalculate=()=>{

   const root= composeTree('type1',table);
   
    //먼저 type1 로 root 만들고
    //학점이 남으면 type2로 root만듬
    //그래도 학점이 남으면 type3으로 root 만듬.


   for(let i=0;i<root.finalTable.length;i++)
   {
       let n=root.finalTable[i];

       console.log('--------%d번째 시간표----------',i+1);
        for(let j=0;j<root.max;j++)
        {   
           
            console.log('%d:%s %s %d',j+1 ,n.data.classname,n.data.profess,n.data.classscore);
            n=n.adault;

        }
        console.log('---------------------------');
   }


};

const onFinal=({imp,classname,classtime,profess,classscore})=>{

        let type;

        if(imp==='1')
            type='type1';
        else if(imp==='2')
            type='type2';
        else if(imp==='3')
            type='type3';

       
        
        dispatch(
            register({
                form:type,
                value:{
                  classname,
                  classtime,
                  profess,
                  classscore,
                 }
                
            })
        );
        
      
    
    };




     return (

        <WriteSchedule 
        
        onFinal={onFinal}
     
        />

     );

};



export default WriteContainer;



