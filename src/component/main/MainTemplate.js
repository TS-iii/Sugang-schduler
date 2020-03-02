//전체화면 회색 배경

import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
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
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;


`;

const MainTitle=styled.div`

height:20%;
font-size:2rem;
font-weight:bold;
color:${palette.cyan[7]};

//텍스트 수평 수직 중앙 정렬 
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;

border-bottom:1px solid black;
`;




const ContentBody=styled.div`
  
height:70%;
border-top:2rem;
display:flex;
flex-direction:row;
flex-wrap:nowrap; // 한줄에 표사
justify-content:flex-start;



`;

const StyleButtonTemplate=styled.div`

width:50%;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;


border-bottom:1px solid black;
border-right:1px solid black;

border-left:1px solid black;
`;


const StyledButton=styled(Button)`

  margin:3rem;
  width:250px;
  height:150px;

`;

const ReadMe=styled.div`

padding:10px;
width:100%;
border-bottom:1px solid black;
border-right:1px solid black;

`;


const MainTemplate=()=>{


    return (
        
        <BackTemplate>    
          <MainTitle>아주대학교 수강신청 스케줄러</MainTitle>
      

          <ContentBody>


            <StyleButtonTemplate>
        
         <Link to="/write" ><StyledButton>시간표 짜기</StyledButton></Link>
           <Link to="/write"><StyledButton >결과 보기</StyledButton></Link> 

            </StyleButtonTemplate>
            
            <ReadMe>시간표 짜는것을 도와드립니다. 한번 이용해 보세요 ^^ 껄껄껄 <br/>
            1,2,3지망을 정해서 각각 수강과목들을 입력하면 우선순위가 가장 높은 과목이 최대한 많이 수강될 수 있게 시간표를 추천해드립니다. <br/>
            계획한 시간표가 실패할경우 짤 수 있는 대안 시간표도 보여드려요 :D <br/>
            
            

            </ReadMe>



          </ContentBody>

      </BackTemplate>


    );
}



export default MainTemplate;
