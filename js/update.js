// localStorage 배열 가져오는 함수 삭제 함수 , localStorage 배열 저장하는 함수
// 수정 시 기존 데이터 불러오는 함수 , 수정 함수

// localStorage 배열 가져오는 함수
function getPosts() {
    let postList = localStorage.getItem('postList')
    if (postList == null) {
        postList = []
    } else {
        postList = JSON.parse(postList)
    }return postList;
}

// localStorage 배열 저장하는 함수
function setPosts(postList) {
    localStorage.setItem('postList', JSON.stringify(postList))
}


// (1) 수정시 기존 데이터 불러오는 함수
getpost();
function getpost(){
    const url = new URLSearchParams(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')                            // 선택한 pid 가져오기

    let postList = getPosts();

    for( let i = 0 ; i < postList.length ; i++ ){
        const obj = postList[i];
        if( obj.pid == selectPid ){
            document.querySelector('#titleInput').value = obj.title
            document.querySelector('#movieTitleInput').value = obj.movieTitle
            document.querySelector('#descInput').value = obj.desc
            document.querySelector('#inSpoilerInput').value = obj.isSpoiler
            document.querySelector('#fileInput').value = obj.file
            document.querySelector('input[name = "rating"]:checked').value = obj.rating
    
        } // if end
    } // for end
} // func end

// (2) 수정 함수
function detailUpdate(){
    const url = new URLSearchParams(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid') 
    let postList = getPosts();
    
    for( let i = 0 ; i < postList.length ; i++){
        const obj = postList[i];
        if( obj.pid == selectPid ){
            obj.title = document.querySelector('#titleInput').value;
            obj.movieTitle = document.querySelector('#movieTitleInput').value;
            obj.desc = document.querySelector('#descInput').value;
            obj.isSpoiler = document.querySelector('#inSpoilerInput').value;
            obj.file = document.querySelector('#fileInput').value;
            obj.rating = document.querySelector('input[name = "rating"]:checked').value;
            setPosts();
            alert('수정완료');
            location.href = `content.html?no=${selectPid}`
        }
    }
}

function back(){
    if(!confirm("뒤로 가겠습니까?")){
    }else{
        location.href = 'content.html';
    }
}
