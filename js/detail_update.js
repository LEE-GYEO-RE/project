// localStorage 배열 가져오는 함수 삭제 함수 , localStorage 배열 저장하는 함수
// 수정 시 기존 데이터 불러오는 함수 , 수정 함수

// localStorage 배열 가져오는 함수
function getPosts() {
    let posts = localStorage.getItem('posts')
    if (posts == null) {
        posts = []
    } else {
        posts = JSON.parse(posts)
    }
}

// localStorage 배열 저장하는 함수
function setPosts() {
    localStorage.setItem('posts', JSON.stringify(posts))
}


// (1) 수정시 기존 데이터 불러오는 함수
getpost();
function getpost(){
    const url = new URL.createObjectURL(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')                            // 선택한 pid 가져오기

    getPosts();

    for( let i = 0 ; i < posts.length ; i++ ){
        const obj = posts[i];
        if( obj.pid == selectPid ){
            document.querySelector('#titleInput').value = obj.titleInput
            document.querySelector('#movieTitleInput').value = obj.movieTitleInput
            document.querySelector('#descInput').value = obj.descInput
            document.querySelector('#inSpoilerInput').value = obj.isSpoilerInput
            document.querySelector('#fileInput').value = obj.fileInput
            document.querySelector('input[name = "rating"]:checked').value = obj.ratingInput
    
        } // if end
    } // for end
} // func end

// (2) 수정 함수
function detailUpdate(){
    const url = new URL.createObjectURL(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid') 
    getPosts();
    
    for( let i = 0 ; i < posts.length ; i++){
        const obj = posts[i];
        if( obj.pid == selectPid ){
            obj.titleInput = document.querySelector('#titleInput').value;
            obj.movieTitleInput = document.querySelector('#movieTitleInput').value;
            obj.descInput = document.querySelector('#descInput').value;
            obj.isSpoilerInput = document.querySelector('#inSpoilerInput').value;
            obj.fileInput = document.querySelector('#fileInput').value;
            obj.ratingInput = document.querySelector('input[name = "rating"]:checked').value;
            setPosts();
            alert('수정완료');
            location.href = `writedetail.html?no=${selectPid}`
        }
    }
}