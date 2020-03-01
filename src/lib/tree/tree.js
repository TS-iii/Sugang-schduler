export class Node {

    constructor(data){

        this.data=data;
        this.children=[];
        this.adault=null;
        this.score=0;
        this.maxrootlist=[];
    
    }


   insert(data){

    const node=new Node(data);
    node.adault=this;
    
    node.score=node.adault.score+data.classscore;  // 누적 학점

    this.children.push(node);
    node.num=this.children.length-1;

  
    
   }
   


}




//둘의 시간이 겹치는지 확인
//안겹치면 true 반환
// 시간표를 넘겨줘야함
export const lookschedule= function(a,b){

    if(a.t1.length && b.t1.length)
        {   
                for(let i=0;i<a.t1.length;i++){
                    
                    if(b.t1.indexOf(a.t1[i])!==-1)
                        return false;
                        
                }

        }

    if(a.t2.length && b.t2.length)
    {   
            for(let i=0;i<a.t2.length;i++){
                
                if(b.t2.indexOf(a.t2[i])!==-1)
                    return false;
                    
            }
    }

    if(a.t3.length && b.t3.length)
    {   
            for(let i=0;i<a.t3.length;i++){
                
                if(b.t3.indexOf(a.t3[i])!==-1)
                    return false;
                    
            }
    }

    if(a.t4.length && b.t4.length)
    {   
            for(let i=0;i<a.t4.length;i++){
                
                if(b.t4.indexOf(a.t4[i])!==-1)
                    return false;
                 
            }

    }

    if(a.t5.length && b.t5.length)
    {   
            for(let i=0;i<a.t5.length;i++){
                
                if(b.t5.indexOf(a.t5[i])!==-1)
                    return false;
                   
            }

    }


    return true;



};



// 안겹친다는 가정이 필요
// 안겹치고 이 함수를 사용하면 dst 시간표에 src가 추가됨. 
// 시간표와, 시간표에 넣을 과목을 dst, src 차례로 주면됨
export const insertTable=function(dst,src){

    
    for(let i=0;i<src.keyword.length;i++){

        dst[src.keyword[i]]=dst[src.keyword[i]].concat(src[src.keyword[i]]);
        
    };


};


export const composeTree=function(t,table,banlist,rootdata=null){

  
    const root= new Node(rootdata);

    root.max=0;
    root.maxScore=0;

    root.finalTable=[];
    
    // //실패시 대안 루트 만들어줌.
    // if(rootdata!==null){
        
    //     root.idlist=[];
    //     root.idlist.push(rootdata.id);
        
    //     root.playlist=[]; // type1,2,3 가능한것들  

    //     for(let i=0;i<table.type1.length;i++){
                
    //         let t=0;
              
    //         if(table.type1[i].id===rootdata.id)
    //             continue;

    //         for( let j=0;j<banlist.length;j++){

    //             if(banlist[j].data.classname!==table.type1[i].classname)
    //             {
    //                 if(lookschedule(banlist[j].data.classtime,table.type1[i].classtime))
    //                    {
    //                         t++;

    //                    }
                    

    //             }



    //         }

    //         if(t===banlist.length)
    //             {
    //                 root.insert(table.type1[i]);
    //                 root.playlist.push(table.type1[i]);
    //             }

    //     }


    //     for(let i=0;i<table.type2.length;i++){
                
    //         let t=0;
              
    //         if(table.type2[i].id===rootdata.id)
    //             continue;

    //         for( let j=0;j<banlist.length;j++){

    //             if(banlist[j].data.classname!==table.type2[i].classname)
    //             {
    //                 if(lookschedule(banlist[j].data.classtime,table.type2[i].classtime))
    //                    {
    //                         t++;

    //                    }
                    

    //             }



    //         }

    //         if(t===banlist.length)
    //             {
    //                 root.insert(table.type2[i]);
    //                 root.playlist.push(table.type2[i]);
    //             }
    //     }


    //     for(let i=0;i<table.type3.length;i++){
                
    //         let t=0;
              
    //         if(table.type3[i].id===rootdata.id)
    //             continue;

    //         for( let j=0;j<banlist.length;j++){

    //             if(banlist[j].data.classname!==table.type3[i].classname)
    //             {
    //                 if(lookschedule(banlist[j].data.classtime,table.type3[i].classtime))
    //                    {
    //                         t++;

    //                    }
                    

    //             }



    //         }

    //         if(t===banlist.length)
    //             {   
    //                 root.insert(table.type3[i]);
    //                 root.playlist.push(table.type3[i]);
    //             }

    //     }


    //     for(let i=0;i<root.children.length;i++){
    
    //         search(root.children[i],2,root,true);
           
    //     }



    // } //rootdata!==null 끝 

    
    // else {
    if(t==='type1')
        {
    //루트 바로 밑 1번째 자식들 구성
    for(let i=0;i<table.type1.length;i++){

        root.insert(table.type1[i]);
      
    }


    for(let i=0;i<table.type1.length;i++){

        search(root.children[i],1,root);
       
    }


        }

    else if(t==='type2'){

      
        
        for(let i=0;i<table.type2.length;i++){
            
            if(banlist.length===0)
                root.insert(table.type2[i]);
            
            else {
                let t=0;
              
                for( let j=0;j<banlist.length;j++){

                    if(banlist[j].data.classname!==table.type2[i].classname)
                    {
                        if(lookschedule(banlist[j].data.classtime,table.type2[i].classtime))
                           {
                                t++;

                           }
                        

                    }


                }

                if(t===banlist.length)
                    root.insert(table.type2[i]);

              


            }
    
       
        }
    
   
    
    
        for(let i=0;i<root.children.length;i++){
    
            search(root.children[i],1,root);
           
        }



    }

    else if(t==='type3'){

        for(let i=0;i<table.type3.length;i++){

    
            if(banlist.length===0)
            root.insert(table.type3[i]);
        
        else {
            let t=0;
          
            for( let j=0;j<banlist.length;j++){

                if(banlist[j].data.classname!==table.type3[i].classname)
                {
                    if(lookschedule(banlist[j].data.classtime,table.type3[i].classtime))
                       {
                            t++;

                       }
                    

                }


            }

            if(t===banlist.length)
                root.insert(table.type3[i]);

          


        }
    
       
          
        }
    
            

        for(let i=0;i<root.children.length;i++){
    
            search(root.children[i],1,root);
           
        }


    // }

    }

    for(let i=0;i<root.finalTable.length;i++){

            
        let n=root.finalTable[i];

        if(n.deep===root.max){

            root.maxrootlist.push(n);
        }

    }
 

return root;

};

export const search=function(n,k,root,tf=false,banlist){

 
    let num=0;

    

    for(let i=n.num+1;i<n.adault.children.length;i++){

        

            if(n.data.classname!==n.adault.children[i].data.classname){

            if(lookschedule(n.data.classtime,n.adault.children[i].data.classtime))
                {   
                    
                    n.insert(n.adault.children[i].data);
                    num++;

                }
            }
                   
    };



    if(num===0)      //지금 이 노드가 leaf라는 소리
        {   
            if(root.max<k)
                root.max=k;
            
            if(root.maxScore<n.score)
                root.maxScore=n.score;


            n.deep=k;


            // 리프는 root->자기로 향하는 노드들의 리스트를 따로 저장함.
            n.list=[];
            let tempn=n;
            for(let j=0;j<n.deep;j++){

                n.list.push(tempn);
                tempn=tempn.adault;


            }

            root.finalTable.push(n);


            return;

        }
    else {

        for(let i=0;i<num;i++)
        {
            search(n.children[i],k+1,root);

        }

    }

};


export default Node;


