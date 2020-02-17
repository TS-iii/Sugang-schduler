

import React , {useState,useCallback,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import WriteSchedule from '../../component/write/WriteSchedule';

import {register} from '../../modules/write';



class Node {

    constructor(data){

        this.data=data;
        this.children=[];
        this.adault=null;
    
    }


   insert(data){

    const node=new Node(data);
    node.adault=this;
  
    this.children.push(node);
    node.num=this.children.length-1;

   }
   


}



//둘의 시간이 겹치는지 확인
//안겹치면 true 반환
const lookschedule= function(a,b){

        if(a.t1.length)
            {   
                if(b.t1.length)
                {
                    for(let i=0;i<a.t1.length;i++){
                        
                        if(b.t1.indexOf(a.t1[i])!==-1)
                            return false;
                            
                    }

                }

            }
    
        if(a.t2.length)
        {   
            if(b.t2.length)
            {
                for(let i=0;i<a.t2.length;i++){
                    
                    if(b.t2.indexOf(a.t2[i])!==-1)
                        return false;
                        
                }

            }

        }

        if(a.t3.length)
        {   
            if(b.t3.length)
            {
                for(let i=0;i<a.t3.length;i++){
                    
                    if(b.t3.indexOf(a.t3[i])!==-1)
                        return false;
                        
                }

            }

        }

        if(a.t4.length)
        {   
            if(b.t4.length)
            {
                for(let i=0;i<a.t4.length;i++){
                    
                    if(b.t4.indexOf(a.t4[i])!==-1)
                        return false;
                        
                }

            }

        }

        if(a.t5.length)
        {   
            if(b.t5.length)
            {
                for(let i=0;i<a.t5.length;i++){
                    
                    if(b.t5.indexOf(a.t5[i])!==-1)
                        return false;
                        
                }

            }

        }


        return true;
    


};

// 안겹친다는 가정이 필요
// 안겹치고 이 함수를 사용하면 dst 시간표에 src가 추가됨. 
// 시간표와, 시간표에 넣을 과목을 dst, src 차례로 주면됨
const insertTable=function(dst,src){

    
    for(let i=0;i<src.keyword.length;i++){

        dst[src.keyword[i]]=dst[src.keyword[i]].concat(src[src.keyword[i]]);
        
    };


};



const WriteContainer=({history})=>{

     const dispatch = useDispatch();

     const {type1,type2,type3}=useSelector(({write})=>({

        type1:write.type1,
        type2:write.type2,
        type3:write.type3,
     }
     ));  // write 가 관리하고 있는 상태를 불러와서 write에 저장


     
     let max=0;
     let finalTable=[];

// 1번 순회함.
const composeTree=function(){

  
    const root= new Node();
    
    //루트 바로 밑 1번째 자식들 구성
    for(let i=0;i<type1.length;i++){

        // let node= new Node(type1[i]);

        root.insert(type1[i]);

   
      
    }




    for(let i=0;i<type1.length;i++){

        search(root.children[i],1);
       
    }

    

return root;

};

const search=function(n,k){

 
    let num=0;

    for(let i=n.num+1;i<n.adault.children.length;i++){

            if(lookschedule(n.data.classtime,n.adault.children[i].data.classtime))
                {
                    n.insert(n.adault.children[i].data);
                    num++;

                }
                   
    };



    if(num===0)      //지금 이 노드가 leaf라는 소리
        {   
        
            if(max<k)
            {
                max=k;
                
                finalTable=[];
                finalTable.push(n);

               

            }

            else if (max===k)
            {
                    finalTable.push(n);
                 
            }
            return;
        }
    else {

        for(let i=0;i<num;i++)
        {
            search(n.children[i],k+1);

        }

    }

};


useEffect(()=>{onCalculate()},[type1]);

const onCalculate=()=>{



   composeTree();
   
   for(let i=0;i<finalTable.length;i++)
   {
       let n=finalTable[i];

       console.log('--------%d번째 시간표----------',i+1);
        for(let j=0;j<max;j++)
        {
            console.log('%d:%s ',j+1 ,n.data.classname);
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
        onCalculate={onCalculate}
        />

     );

};



export default WriteContainer;




//시간표 변환
// const classTimeMod=function(c){

// let schedule={

//     t1:[],
//     t2:[],
//     t3:[],
//     t4:[],
//     t5:[]

// };

// let n=-1;
// let t=null;

// for(let i=0;i<c.length;i++){
   
//     if(n===3)       
//         {
//             n=2;
//             continue;
//         }
    
//     if(n===2)
//         {
//             n=-1;
//             continue;
//         }

//     if(c[i]===' ')
//         continue;

//     switch(c[i]){

//         case '월':
//             t='t1';
//             break;
//         case '화':
//             t='t2';
//             break;
//         case '수':
//             t='t3';
//             break;
//         case '목':
//             t='t4';
//             break;
//         case '금':
//             t='t5';
//             break;    
        
//         default:
//             break;
    
//     }

//     if(c[i]>='A' && c[i]<='J')
//         {   let b=c[i]-'A';
//             b=(b+1)*3;

//             schedule[t].push(b-1);
//             schedule[t].push(b);
//             schedule[t].push(b+1);

//             continue;
//         }

//     else if(c[i]>='1' && c[i]<='9')
//         {   
            
//             if(c[i+1]>='0' && c[i+1]<='9')
//                 {
//                     n=1;
//                     continue;
//                 }
//             else if(n===1)
//                 {
//                     let b=20+(c[i]-'0');
//                     n=-1;

//                     if(c[i+1]==='.')
//                         {
//                             n=3;
//                             schedule[t].push(b+1);
//                         }
//                     else
//                         schedule[t].push(b);
                
//                 }

//             else {

//                 if(c[i+1]==='.')
//                     {  n=3;
//                         schedule[t].push((c[i]-'0')+1);
//                         }
//                 else
//                     schedule[t].push(c[i]-'0');
//             }

//         }

    
    


// }//for문 끝


// return schedule;

// };