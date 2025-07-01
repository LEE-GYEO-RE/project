
// 데이터모델링
// 
// 


let posts =[
  { pid:1, title:'투슬리스 귀여움이 말이 안된다....', movieTitle:'드래곤길 들이기' , desc:'너무 슬프고 너무너무 재밋어요 보는내내 울었는데 저만 운것같긴해요 그래도 원작보다 훨씬 재밌고 연출이 너무 좋고 CG인데 티 진짜 안나고 제 인생영화에요 꼬 보세요!!!', file:'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20250514_116%2F17471898410878x4Ud_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2', isSpoiler: false , rating:"5", date:"2025-04-01" },
  { pid:2, title: '스토리에 푹 빠졌다 (2)', movieTitle: '기생충', desc: '감정선이 잘 잡혀 있어서 눈물을 참을 수 없었어요. (리뷰 2)', file: 'https://example.com/image2.jpg', isSpoiler: false, rating:"4", date:"2025-04-02" },
 ];

// 글 작성 함수

function postWrite(){
    const titleInput = document.querySelector('#titleInput');
    const movieTitleInput = document.querySelector('#movieTitleInput');
    const isSpoilerInput = document.querySelector('#isSpoilerInput');
    const descInput = document.querySelector('#descInput');
    const fileInput = document.querySelector('#fileInput');
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    const title=titleInput.value;
    const movieTitle = movieTitleInput.value;
    const isSpoiler = isSpoilerInput.value;
    const desc = descInput.value;

    const rating = ratingInput ? ratingInput.value : '';  // 별점이 value값이면 value값 , value값이 없으면 ''점

    const file = fileInput.files[0];

    let year = new Date().getFullYear();
    let month = new Date().getMonth()+1;
    month = month < 9 ? `0${month}` : month ; // 만약에 월이 한자리수 이면 앞에 '0' 붙인다.
    let day = new Date().getDate();      // 현재 일 반환 함수 
        day = day < 9 ? `0${day}` : day;    // 만약에 일 이 한자리수 이면 앞에 '0' 붙인다.
    let date = `${year}-${month}-${day}`;

    const obj = { title , movieTitle , isSpoiler , desc , file: file?URL.createObjectURL(file):"https://placehold.co/100x100" , rating ,date }

    let posts = localStorage.getItem('posts');
    if( posts == null){ posts = []}
    else{ posts = JSON.parse( posts);}
    

    obj.pid = posts.length == 0 ? 1 : posts[posts.length-1].pid+1
    posts.push( obj );


    // 작성 후 리셋 
    titleInput.value='';
    movieTitleInput.value='';
    isSpoilerInput.value='';
    descInput.value='';
    document.querySelectorAll('input[name="rating"]').forEach(input => input.checked = false); // 라디오 체크박스 리셋

    localStorage.setItem('posts' , JSON.stringify(posts))

    alert('게시물 작성 성공')
    // 글쓰기 성공시 게시물목록(list) 페이지 로 이동

}

