
import React , {useState,useCallback,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Graph from '../../component/graph/Graph';

import {register} from '../../modules/write';

import Node ,{lookschedule,insertTable,composeTree ,search} from '../../lib/tree/tree';
import { tsConstructorType } from '../../../../../../../AppData/Local/Microsoft/TypeScript/3.7/node_modules/@babel/types/lib/index';


// 안겹친다는 가정이 필요
// 안겹치고 이 함수를 사용하면 dst 시간표에 src가 추가됨. 
// 시간표와, 시간표에 넣을 과목을 dst, src 차례로 주면됨
//const insertTable=function(dst,src)

class mNode{

    children=[];
    
    constructor(list){

        
        this.classlist=list;

    }
 
    insert(list){
        let node=new mNode(list);

        this.children[this.children.length]=node;
        

    }


};



const GraphContainer=()=>{


    const [TdrawList,setTdrawList]=useState([]);

    const [allList,setallList]=useState([]);

    const [makingdrawList,setmakingdrawList]=useState([]);

    const [nownum,setnownum]=useState(0);

    const Delete=(id)=>{

       const  aa=TdrawList.filter(e=>(e.id!==id));
       
       setTdrawList(aa);
          
      };
      
      
      useEffect(()=>{},TdrawList);
    

    // const dispatch = useDispatch();

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
    const makingDrawList=useCallback(()=>{

        let makingTable=[];

        for(let i=0;i<TdrawList.length;i++){  // 한 과목씩 살펴봄

            for(let j=0;j<TdrawList[i].data.classtime.keyword.length;j++){  // 한 과목의 요일수
                
                let day;

                switch(TdrawList[i].data.classtime.keyword[j]){
                    case 't1': day=5; break;
                    case 't2': day=24; break;
                    case 't3': day=43; break;
                    case 't4': day=62; break;
                    case 't5': day=81; break;
                    default: break;

                }

              

              let dayarr=  TdrawList[i].data.classtime[TdrawList[i].data.classtime.keyword[j]]; // 요일 배열
                
              let timeleng=dayarr.length * 3.5;
              let time=9+((dayarr[0]-2)*3.5);

                makingTable.push({x:day,y:time,ycolor:timeleng,color:"#CEF6F5",text:TdrawList[i].data.classname});
            
            }


        }
        
        console.log(makingTable);
        setmakingdrawList(makingTable);


    },[TdrawList]);

    
    //개수기반
    //우선순위 1개수가 같으면 일단 그거 다출력

    // node 클래스
    // root,일반,leaf마다 가진 요소가 다름
    

    const Calculate=()=>{

     //   let finalrank=[]; //최종 개수 기반 순위


        const root1=composeTree('type1',Maintable);
        
        // 최대개수인 리프노드들을 찾아서 maxrootlist 배열에 저장되어있음.
     

        // 트리를 만듬. (1순위 리스트)

        let treerootlist=[]; // 루트 트리들의 배열

        for(let i=0;i<root1.maxrootlist.length;i++){

            let treeroot=new mNode(root1.maxrootlist[i].list); // 하나의 루트트리를 만듬.
            treerootlist.push(treeroot); // 배열에 넣음
            
            
            // 그다음 2순위 찾음

            let root2=composeTree('type2',Maintable,treeroot.classlist); 
            
            for(let j=0;j<root2.maxrootlist.length;j++){
     
                treeroot.insert(root2.maxrootlist[j].list);
                
                let treeroot2=treeroot.children[j];
                
                let classlist=treeroot.classlist.concat(root2.maxrootlist[j].list);

                let root3=composeTree('type3',Maintable,classlist);
                

                // 3순위 찾음
                for(let k=0;k<root3.maxrootlist.length;k++){

                    treeroot2.insert(root3.maxrootlist[k].list);

                }
            
            
            }
            




        }// for문 끝 
       
        // 모든 리스트가 만들어짐.
        // 이제 순위를 매김
        // 1순위는 어차피 다 같을테니
        
        //treerootlist에 트리가 다 들어있음
        
        // 1,2,3등분으로 나눈다면
        // 일단 1끼리 순위결정을 한다 
        // 결정되면 다시 2내에서 순위결정
        // 결정되면 다시 3내에서 순위결정


        //그럼  1순위끼리는 어떻게 우선순위를 나누냐
        
        // 비교함수를 만들었음 . compare(a,b)  a가크면 1 b가크면 -1 같으면 0

        //퀵소트로 비교하면됨.

        
       //1 정립 

        for(let i=0;i<treerootlist.length-1;i++){


            for(let j=1;j<treerootlist.length;j++)
            {
                let b=compare(treerootlist[i],treerootlist[j])
                
                if(b===-1)
                    {
                        let c=treerootlist[j];
                        treerootlist[j]=treerootlist[i];
                        treerootlist[i]=c;
                    
                    }

            }
        
        }

        //2 정립

        for(let i=0;i<treerootlist.length;i++){

            for(let j=0;j<treerootlist[i].children.length-1;j++){

                for(let k=1;k<treerootlist[i].children.length;k++){

                    let b=compare(treerootlist[i].children[j],treerootlist.children[k]);

                    if(b===-1){

                        let c=treerootlist[i].children[k];
                        treerootlist[i].children[k]=treerootlist[i].children[j];
                        treerootlist[i].children[j]=c;
                    }


                }


            }


            for(let j=0;j<treerootlist[i].children.length;j++){

                for(let a=0;a<treerootlist[i].children[j].children.length-1;a++){

                    for(let b=1;b<treerootlist[i].children[j].children.length;b++){

                            let x=compare(treerootlist[i].children[j].children[a],treerootlist[i].children[j].children[b]);
                            if(x===-1){

                                let y=treerootlist[i].children[j].children[b];
                                treerootlist[i].children[j].children[b]= treerootlist[i].children[j].children[a];
                                treerootlist[i].children[j].children[a]=y;

                            }



                    }



                }
                




            }



        }
                
        
        let finaldata=[];

        for(let a=0;a<treerootlist.length;a++){

                if(treerootlist[a].children.length===0){

                        finaldata.push(treerootlist[a].classlist);
                        continue;

                }
          
            for(let b=0;b<treerootlist[a].children.length;b++){

                    if(treerootlist[a].children[b].children.length===0){

                        finaldata.push(treerootlist[a].classlist.concat(treerootlist[a].children[b].classlist));
                        continue;
                    }
             
                for(let c=0;c<treerootlist[a].children[b].children.length;c++){
                        
                    let x=treerootlist[a].classlist.concat(treerootlist[a].children[b].classlist);
                    let y=x.concat(treerootlist[a].children[b].children[c].classlist);
                    
                    // let temp=[];
                    // for(let z=0;z<y.length;z++){

                    //     temp.push(y[z].data);
                        

                    // }   
                    // if(temp.length>0){

                    //     finaldata.push(temp);
                    // }
                    
                    finaldata.push(y);

                }

            }

            
        




        }
        
        //return treerootlist;
        
        //이부분 고쳐야함
        setallList(finaldata);

        
      

    //    makingDrawList();

       
        //console.log(treerootlist);

        return finaldata;



    }

    const finalprint=()=>{

        let kkk=[];
        if(allList.length!==0){

            

        for(let i=0;i<allList[nownum].length;i++){

            let tt=allList[nownum][i];

            tt={...tt,id:i};

            kkk.push(tt);


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

    //TdrawList = {} 배열 []
    // { id , n (노드)    }


    // 1반환: a가 더큼
    //0반환: 둘이 같음
    //-1반환:b가 더큼
    const compare=(a,b)=>{

        if(a.children.length===0)
        {
            if(b.children.length>0)
                return -1;
            else
                return 0;

        }

        if(b.children.length===0){

            if(a.children.length>0)
                return 1;
            else    
                return 0;
        }

        if(a.children[0].classlist[0].deep > b.children[0].classlist[0].deep)
            return 1;
        else if(a.children[0].classlist[0].deep < b.children[0].classlist[0].deep)
            return -1;
        else
            {
                if(a.children.length > b.children.length)
                    return 1;
                else if(a.children.length < b.children.length)
                    return -1;
                else
                    return 0;


            }
        


    };

    const onCalculate=()=>{
        
        const root= composeTree('type1',Maintable,[]);
        
         
         let maxScoreTable=[];
         let maxTable=[];
     
         for(let i=0;i<root.finalTable.length;i++){
     
             let n=root.finalTable[i];
     
            if(n.score===root.maxScore){
     
             maxScoreTable.push(n);
     
     
            }    
     
     
            if(n.deep===root.max){
     
             maxTable.push(n);
            }
     
         }
         console.log('&&&&&&&&&&&&&&&학점 우선 시간표&&&&&&&&&&&&&&');
         for(let i=0;i<maxScoreTable.length;i++){
     
             let n=maxScoreTable[i];
             let k=n.deep;
             console.log('--------%d번째 시간표----------',i+1);
             for(let j=0;j<k;j++){
     
                 console.log('%d:%s %s %d ',j+1,n.data.classname,n.data.profess,n.data.classscore);
     
                 n=n.adault;
             }
     
             console.log('[총 %d학점]',root.maxScore);
             console.log('---------------------------');
     
         }
     
     
         console.log('&&&&&&&&&&&&&&&과목개수 우선 시간표&&&&&&&&&&&&&&');
     
        for(let i=0;i<maxTable.length;i++)
        {
            let n=maxTable[i];
            let a=n.score;
            console.log('--------%d번째 시간표----------',i+1);
             for(let j=0;j<root.max;j++)
             {   
                
                 console.log('%d:%s %s %d',j+1 ,n.data.classname,n.data.profess,n.data.classscore);
                 n=n.adault;
     
             }
             console.log('[총%d학점]',a);
             console.log('---------------------------');
        }
        
        let a=maxTable[0];
        let bb=[];
        for(let i=0;i<root.max;i++){

            bb.push(a.data);
            a=a.adault;


        }
        makingDrawList(bb);


     };

     


    return (
        <Graph onCalculate={onCalculate}
            TdrawList={TdrawList}
            Delete={Delete}
            makingdrawList={makingdrawList}
            Calculate={Calculate}
            next={next}
            previous={previous}
            >

            </Graph>
    );


};


export default GraphContainer;