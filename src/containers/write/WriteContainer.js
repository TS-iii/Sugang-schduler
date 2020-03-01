

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


// 1번 순회함.


//type1이 변경되면 onCalculate 함수를 실행 




// useEffect(()=>{history.push('/graph')},[onCalculate]);

const onCalculate=()=>{
    


history.push('/graph');



};

const onFinal=({type,classname,classtime,profess,classscore,id})=>{

        

        dispatch(
            register({
                form:type,
                value:{
                  classname,
                  classtime,
                  profess,
                  classscore,
                  id,
                 }
                
            })
        );
        
      
    
    };




     return (

        <WriteSchedule 
        
        onFinal={onFinal}
    onCalculate={onCalculate}
       />

     );

};



export default withRouter(WriteContainer);



