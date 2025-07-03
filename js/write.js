
// 데이터모델링
// 
// 


let postList =[
  { pid:1, title:'투슬리스 귀여움이 말이 안된다....', movieTitle:'드래곤길 들이기' , desc:'너무 슬프고 너무너무 재밋어요 보는내내 울었는데 저만 운것같긴해요 그래도 원작보다 훨씬 재밌고 연출이 너무 좋고 CG인데 티 진짜 안나고 제 인생영화에요 꼬 보세요!!!', file:'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20250514_116%2F17471898410878x4Ud_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2', isSpoiler: false , rating:"5", date:"2025-04-01" },
  { pid:2, title: '스토리에 푹 빠졌다 (2)', movieTitle: '기생충', desc: '감정선이 잘 잡혀 있어서 눈물을 참을 수 없었어요. (리뷰 2)', file: 'https://example.com/image2.jpg', isSpoiler: false, rating:"4", date:"2025-04-02" },{ "pid":3, "title":"비주얼이 황홀해요", "movieTitle":"아바타: 물의 길", "desc":"CG가 정말 리얼하고 immersive했습니다. 3D로 꼭 보세요!", "file":"https://example.com/avatar2.jpg", "isSpoiler":false, "rating":"5", "date":"2025-04-03" },
  { pid: 3, title: '비주얼이 황홀해요', movieTitle: '아바타: 물의 길', desc: 'CG가 정말 리얼하고 immersive했습니다. 3D로 꼭 보세요!', file: 'https://example.com/avatar2.jpg', isSpoiler: false, rating: '5', date: '2025-04-03' },
  { pid: 4, title: '음악이 너무 좋아요', movieTitle: '라라랜드', desc: 'OST 듣고 하루 종일 기분이 좋았어요. 뮤지컬은 역시...', file: 'https://example.com/lalaland.jpg', isSpoiler: false, rating: '5', date: '2025-04-04' },
  { pid: 5, title: '웃음이 빵빵', movieTitle: '슈퍼배드 4', desc: '미니언즈 보고 폭소 터졌어요. 아이들도 좋아할 듯!', file: 'https://example.com/minions4.jpg', isSpoiler: false, rating: '4', date: '2025-04-05' },
  { pid: 6, title: '스릴 장난 아님', movieTitle: '컨저링: 악마가 시켰다', desc: '어두운 분위기, 진짜 소름 돋았어요. 밤에는 혼자 절대 못 봐요.', file: 'https://example.com/conjuring3.jpg', isSpoiler: false, rating: '4', date: '2025-04-06' },
  { pid: 7, title: '감동의 눈물샘 폭발', movieTitle: '타이타닉', desc: '다시 봐도 로맨스와 비극의 조합이 최고네요.', file: 'https://example.com/titanic.jpg', isSpoiler: false, rating: '5', date: '2025-04-07' }
]

// 글 작성 함수

function postWrite(){
    const titleInput = document.querySelector('#titleInput');
    const movieTitleInput = document.querySelector('#movieTitleInput');
    const isSpoilerInput = document.querySelector('#isSpoilerInput');
    const summernote = document.querySelector('#summernote');
    const fileInput = document.querySelector('#fileInput');
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    const title=titleInput.value;
    const movieTitle = movieTitleInput.value;
    const isSpoiler = isSpoilerInput.value;
    const desc = summernote.value;

    const rating = ratingInput ? ratingInput.value : '';  // 별점이 value값이면 value값 , value값이 없으면 ''점

    const file = fileInput.files[0];

    let year = new Date().getFullYear();
    let month = new Date().getMonth()+1;
    month = month < 9 ? `0${month}` : month ; // 만약에 월이 한자리수 이면 앞에 '0' 붙인다.
    let day = new Date().getDate();      // 현재 일 반환 함수 
        day = day < 9 ? `0${day}` : day;    // 만약에 일 이 한자리수 이면 앞에 '0' 붙인다.
    let date = `${year}-${month}-${day}`;

    const obj = { title , movieTitle , isSpoiler , desc , file: file?URL.createObjectURL(file):"https://placehold.co/100x100" , rating ,date }

    let postList = localStorage.getItem('postList');
    if( postList == null){ postList = []}
    else{ postList = JSON.parse( postList);}
    

    obj.pid = postList.length == 0 ? 1 : postList[postList.length-1].pid+1
    postList.push( obj );


    // 작성 후 리셋 
    titleInput.value='';
    movieTitleInput.value='';
    isSpoilerInput.value='';
    summernote.value='';
    document.querySelectorAll('input[name="rating"]').forEach(input => input.checked = false); // 라디오 체크박스 리셋

    localStorage.setItem('postList' , JSON.stringify(postList))

    alert('게시물 작성 성공')

}


function back(){
    if(!confirm("뒤로 가겠습니까?")){
    }else{
        location.href = 'list.html';
    }
}