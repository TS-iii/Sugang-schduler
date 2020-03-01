

export class Node {

    constructor(data){

        this.data=data;
        this.children=[];
        this.adault=null;
        this.score=0;
        this.maxrootlist=[];
        this.deep=0;
       
    
    }


   insert(data){

    const node=new Node(data);
    node.adault=this;
    
    node.score=node.adault.score+data.classscore;  // 누적 학점
    
    this.children.push(node);
    node.num=this.children.length-1;

    

   }
   
}

export class classTree{

    constructor(){
        
        
        this.deep=0;
        this.classlist=[];
        this.children=[];
        this.childinfo={max:0, maxleng:0};
    }


    insert(deep,classlist,type){

        const tree=new classTree();

        tree.type=type;
        tree.deep=deep;
        tree.classlist=classlist;
        tree.adault=this;
        this.children.push(tree);
        tree.num=this.children.length-1;


    }

    insertinfo(max,maxleng){


        this.childinfo.max=max;
        this.childinfo.maxleng=maxleng;


    }


}



const typer=["type1","type2","type3"];
let fflist=[];

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


//banlist는 data 배열이어야함
export const mainTree=(table,banlist,specialbanlist)=>{

    fflist=[];

    const classroot=new classTree();

    // console.log("0을 composetree한테 보냄");

    composeTree(classroot,table,banlist,0,specialbanlist);
    
    // console.log("컴포스트리 끝남 ");
    //이제 비교
    // console.log(classroot);

    comparemain(classroot);
    
    // console.log("comparemain끝남");
    
    analyze(classroot);

    // console.log("analyze 끝남");

    // console.log(fflist);

    fflist=uniq(fflist);

    // console.log("uniq 끝남");

    // console.log(fflist);

    return fflist;

};


//부분집합이 되는거 삭제
export const uniq=function(list){

   

for(let i=0;i<list.length-1;i++){

    if(list[i].id===-1)
        continue;
  

    for(let j=i+1;j<list.length;j++){

        if(list[j].id===-1)
            continue;

        let tf=uniqfunc(list[i],list[j]);

        if(tf===0 || tf===1)
            {   
                list[j].id=-1;
                
            }

        else if(tf===-1)
            {   //i를 버려야함
                list[i].id=-1;

                break;
            }
        else if(tf===2)
            {   // i랑 j 둘다 살림.
                
                continue;
            
            }


    }

}
    

let bb=[];
for(let i=0;i<list.length;i++){

    if(list[i].id!==-1)
        bb.push(list[i]);


}

    return bb;



};

export const uniqfunc=function(a,b){

    let aa=a.length;
    let bb=b.length;

    for(let i=0;i<a.length;i++){

        for(let j=0;j<b.length;j++){

            if(a[i].id===b[j].id)
                {   aa--;
                    bb--;
                    break;
                }


        }

    }

    if(aa===0 && bb===0)
        return 0;
    else if(aa>0 && bb===0)
        return 1;
    else if(aa===0 && bb>0)
        return -1;
    else if(aa>0 && bb>0)
        return 2;


};


export const analyze=function(root){


    if(root.children.length!==0){
      

        for(let i=0;i<root.children.length;i++){

            let list=[];
            analyzetree(root.children[i],list);

        }

    }
   


};


export const analyzetree=function(root,list){

       let alist=list.concat(root.classlist);

     if(root.children.length===0)
        {
            fflist.push(alist);
            return;
        }

    else{

        for(let i=0;i<root.children.length;i++){

            analyzetree(root.children[i],alist);

        }


    }




};

export const comparemain=function(root){

    if(root.children.length===0)
            return;

      
            for(let i=0;i<root.children.length-1;i++){
        
                for(let j=i+1;j<root.children.length;j++)
                        {
        
                            if(compare(root.children[i],root.children[j])===-1)
                                {
                                        let temp=root.children[j];
                                        root.children[j]=root.children[i];
                                        root.children[i]=temp;
                                    
                                }
        
        
        
                        }
        
        
            }


            for(let i=0;i<root.children.length;i++){

                comparemain(root.children[i]);


            }


};


export const compare=function(a,b){

    if(a.deep>b.deep)
        return 1;
    if(a.deep<b.deep)
        return -1;

    if(a.deep===b.deep){

        if(a.children.length===0 && b.children.length===0)
            return 0;
        else if(a.children.length===0 && b.children.length!==0)
            return -1;
        else if(a.children.length!==0 && b.children.length===0)
            return 1;
        else
            {
                if(a.childinfo.max>b.childinfo.max)
                    return 1;
                if(a.childinfo.max<b.childinfo.max)
                    return -1;
           
                if(a.childinfo.maxleng>b.childinfo.maxleng)
                    return 1;
                else if(a.childinfo.maxleng<b.childinfo.maxleng)
                    return -1;
                else 
                    return 0;
                
                    
            }



    }



};

export const composeTree=function(classroot,table,banlist,index,specialbanlist){

    const root= new Node();

    root.memberlist=[];
    root.finalTable=[];

     

    
        // console.log("composeTree에서 exbanlist로 들어감");
        // console.log("banlist는");
        // console.log(banlist);

        if(exbanlist(typer[index],table,banlist,root,specialbanlist)){
          
            
                // console.log("rootdeep:" + root.deep);
                // console.log("maxrootlist:" + root.maxrootlist.length);
                // console.log(root.memberlist);

             classroot.insertinfo(root.deep,root.maxrootlist.length);
         
                    for(let i=0;i<root.memberlist.length;i++){
                        let temp=root.memberlist[i];
                        let tempdata=[];

                      

                        for(let j=0;j<root.memberlist[i].deep;j++){
                                
                                tempdata.push(temp.data);
                    
                                temp=temp.adault;

                                
                        }

                        
                        classroot.insert(root.memberlist[i].deep,tempdata,typer[index]);
                        
                        if(index<typer.length-1){
                           
                        let addbanlist=banlist.concat(tempdata);
                        composeTree(classroot.children[i],table,addbanlist,index+1,specialbanlist);
                            
                        }

                        else
                            return;

                    }


        

        }

        else{

            if(index<typer.length-1)
                composeTree(classroot,table,banlist,index+1,specialbanlist);
            
            else
                return;


        }

      
        
        

    };
     
            

// type과 table에서 banlist를 주면 root에 알아서 목록을 집어넣어준다 
export const exbanlist=(type,table,banlist,root,specialbanlist)=>{

    // console.log("exbanlist 내부 첫줄임");
    // console.log("banlist는");
    // console.log(banlist);

   
    for(let i=0;i<table[type].length;i++){

    
        if(banlist.length===0){

            let t=0;
            for(let j=0;j<specialbanlist.length;j++){

                if(table[type][i].id!==specialbanlist[j].id)
                    t++;


            }
            
            if(t===specialbanlist.length)
                 root.insert(table[type][i]);
        }
    else {
        let t=0;
      
        for( let j=0;j<banlist.length;j++){

            if(banlist[j].classname!==table[type][i].classname)
            {
                if(lookschedule(banlist[j].classtime,table[type][i].classtime))
                   {
                        t++;

                   }
                

            }


        }


        if(t===banlist.length)
            {
                t=0;
                for(let j=0;j<specialbanlist.length;j++){

                    if(table[type][i].id!==specialbanlist[j].id)
                        t++;
    
    
                }
                
                if(t===specialbanlist.length)
                root.insert(table[type][i]);
            
            
            }

      
    }

      
    }

    
    for(let i=0;i<root.children.length;i++){

        root.memberlist.push(root.children[i]);
        search(root.children[i],1,root);

        }


        for(let i=0;i<root.finalTable.length;i++){

            
            let n=root.finalTable[i];
    
            if(n.deep===root.deep){
    
                root.maxrootlist.push(n);
            }
    
        }
     


    if(root.children.length!==0)
        return true;
    else    
        return false;



};



export const search=function(n,k,root){

 
    let num=0;

    n.deep=k;
    

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
            if(root.deep<k)
                root.deep=k;
            

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
            root.memberlist.push(n.children[i]);
            search(n.children[i],k+1,root);

        }

    }

};



export default Node;


