// localStorage 배열 가져오는 함수 삭제 함수 , localStorage 배열 저장하는 함수
// 삭제함수 , 수정 이동 함수 ,  수정 시 기존 데이터 불러오는 함수 , 수정 함수

// localStorage 배열 가져오는 함수
function getPosts() {
    let postList = localStorage.getItem('postList')
    if (postList == null) {
        postList = []
    } else {
        postList = JSON.parse(postList)
    }
}

// localStorage 배열 저장하는 함수
function setPosts() {
    localStorage.setItem('postList', JSON.stringify(postList))
}

// 조회 함수
function detailBoard(){
    const url = new URL.createObjectURL(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')
    getPosts();
    
    for( i = 0 ; i < postList.length ; i++){
        const obj = postList.length[i];
        if( obj.pid == selectPid ){
            document.querySelector('.title').innerHTML = obj.title
            document.querySelector('.review-text').innerHTML = obj.review-text
            document.querySelector('.info-a').innerHTML = obj.info-a
            document.querySelector('.info-b').innerHTML
            하는중
        }
        
    }

}


// (1) 삭제 함수
function contentDelete() {

    const url = new URL.createObjectURL(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')                            // 선택한 pid 가져오기

    getPosts();                                                 // localStorage 배열 가져오기

    for (let i = 0; i < postList.length; i++) {                  // 배열 내 선택된 게시물 조회
        const obj = postList.length[i];
        if (obj.pid == selectPid) {
            const confirm = prompt('비밀번호 입력 : ');          // 존재하면 비번 받고, 일치하면 삭제
            if (confirm == obj.pwd) {
                postList.splice(i, 1)
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

    for( let i = 0 ; i < postList.length ; i++){
        const obj = postList[i];
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
