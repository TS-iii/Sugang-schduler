//전체화면 회색 배경

import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

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

//수강신청 스케줄러
//시간표 짜기
//결과 보기
const MainTemplate=({children})=>{


    return (
        
        <BackTemplate>    
          <MainTitle>수강신청 스케줄러</MainTitle>
      

          <ContentBody>


            <StyleButtonTemplate>
        
            <StyledButton>시간표 짜기</StyledButton>
            <StyledButton>결과 보기</StyledButton>

            </StyleButtonTemplate>
            
            <ReadMe>시간표 짜는것을 도와드립니다. 한번 이용해 보세요 ^^ 껄껄껄</ReadMe>



          </ContentBody>

      </BackTemplate>


    );
}



export default MainTemplate;
