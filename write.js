
// 데이터모델링
// 
// 

let posts =[{uid:1 , title:'투슬리스 귀여움이 말이 안된다....', movieTitle:'드래곤길 들이기' , desc:'너무 슬프고 너무너무 재밋어요 보는내내 울었는데 저만 운것같긴해요 그래도 원작보다 훨씬 재밌고 연출이 너무 좋고 CG인데 티 진짜 안나고 제 인생영화에요 꼬 보세요!!!', file:'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20250514_116%2F17471898410878x4Ud_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2', isSpoiler: false}]

function postWrite(){
    const titleInput = document.querySelector('#titleInput');
    const movieTitleInput = document.querySelector('#movieTitleInput');
    const isSpoilerInput = document.querySelector('#isSpoilerInput');
    const descInput = document.querySelector('#descInput');
    const fileInput = document.querySelector('#fileInput');
    const ratingInput = document.querySelector('#ratingInput');

    const title=titleInput.value;
    const movieTitle = movieTitleInput.value;
    const isSpoiler = isSpoilerInput.value;
    const desc = descInput.value;
    const rating = ratingInput.value;

    const file = fileInput.files[0];

    const obj = { title , movieTitle , isSpoiler , desc , file , rating}

    let posts = localStorage.getItem('posts');
    if( posts == null){ posts = []}
    else{ posts = JSON.parse( posts);}

    obj.uid = posts.length == 0 ? 1 : posts[posts.length-1].uid+1
    posts.push( obj );

    localStorage.setItem('posts' , JSON.stringify(posts))

    alert('게시물 작성 성공')
   
}

function back(){
    
}