// localStorage 배열 가져오는 함수 삭제 함수 , localStorage 배열 저장하는 함수
// 삭제함수 , 수정 이동 함수 ,  수정 시 기존 데이터 불러오는 함수 , 수정 함수

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


// (1) 삭제 함수
function contentDelete() {

    const url = new URL.createObjectURL(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')                            // 선택한 pid 가져오기

    getPosts();                                                 // localStorage 배열 가져오기

    for (let i = 0; i < posts.length; i++) {                  // 배열 내 선택된 게시물 조회
        const obj = posts.length[i];
        if (obj.pid == selectPid) {
            const confirm = prompt('비밀번호 입력 : ');          // 존재하면 비번 받고, 일치하면 삭제
            if (confirm == obj.pwd) {
                posts.splice(i, 1)
                setPosts();
                alert('게시물이 삭제되었습니다.')
                location.href = 'list.html';                   // 삭제 성공시 list.html 로 이동
            } else {
                alert('삭제 실패 : 비밀번호 불일치')
            } // else end
        } // if end
    } // for end
} // func end


// (2) 수정 이동 함수
function postsUpdateView() {
    const url = new URL.createObjectURL(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')                            // 선택한 pid 가져오기

    getPosts();

    for( let i = 0 ; i < posts.length ; i++){
        const obj = posts[i];
        if( obj.pid == selectPid ){
            const confirm = prompt('비밀번호 입력 : ')
            if( confirm == obj.pwd ){
                location.href = `detail_update.html?no=${selectPid}`
            }else{
                alert('수정 불가 : 비밀번호 불일치')
            }
        } // if end
    } // for end
} // func end