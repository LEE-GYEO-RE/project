// localStorage 배열 가져오는 함수 삭제 함수 , localStorage 배열 저장하는 함수
// 삭제함수 , 수정 이동 함수 ,  수정 시 기존 데이터 불러오는 함수 , 수정 함수

// localStorage 배열 가져오는 함수
function getPosts() {
    let postList = localStorage.getItem('postList')
    if (postList == null) {
        postList = []
    } else {
        postList = JSON.parse(postList)
    } return postList;
}

// localStorage 배열 저장하는 함수
function setPosts(postList) {
    localStorage.setItem('postList', JSON.stringify(postList));
}
function getUser() {
    let userList = localStorage.getItem('userList')
    if (userList == null) {
        userList = []
    } else {
        userList = JSON.parse(userList)
    } return userList;
}
function setUser(userList) {
    localStorage.setItem('userList', JSON.stringify(userList));
}

function getUid(uid) {
    // 함수에 let uid = new URLSearchParams(location.search).get('uid'); 로 uid 값을 가져온 다음, 매개변수에 uid를 넣어 호출할 것

    if (uid == null)
        return null;
    else return `uid=${uid}`;
}
// 조회 함수
detailBoard();
function detailBoard() {
    const url = new URLSearchParams(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid');
    const selectUid = url.get('uid');

    let postList = getPosts();
    let userList = getUser();


    for (let j = 0; j < userList.length; j++) {
        const obj1 = userList[j];
        if (userList[j].uid == selectUid) {
            document.querySelector('.info-user').innerHTML = obj1.uid
            break;
        }
    }

    for (let i = 0; i < postList.length; i++) {
        const obj = postList[i];
        if (postList[i].pid == selectPid) {
            document.querySelector('.title').innerHTML = obj.title                  // 선택된 게시물 번호와 일치하면 내용 출력
            document.querySelector('.review-text').innerHTML = obj.desc      // content.html 의 클래스명 가진 마크업 사이에 찾은 obj.~~` 넣어서 출력
            // document.querySelector('.info-user').innerHTML = obj.uid     // obj에서 user 넣어야 빼오기 가능
            document.querySelector('.rating').innerHTML = makeRating(obj.rating)
            // title , movieTitle , desc , file , isSpoiler , rating , date
            break;
        }
    }
}


// (1) 삭제 함수
function contentDelete() {

    const url = new URLSearchParams(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')                            // 선택한 pid 가져오기
    // const selectUid = url.get('uid');

    let postList = getPosts();                                                 // localStorage 배열 가져오기
    let userList = getUser();
    let uid = localStorage.getItem('uidId'); // 현재 로그인된 아이디.

    // 1. 게시물 찾기
    for( let i = 0 ; i < postList.length ; i++) {
        let post = postList[i];
        if( post.pid == selectPid && post.uid == uid ){ // 현재 보고 있는 게시물 이면서 로그인된 회원 글이면 
            // 2. 내가 쓴글인지 확인 
            alert('게시물이 삭제되었습니다.')
            postList.splice(i, 1)
            setPosts(postList);
            location.href = `list.html?pages=1&${getUid(uid)}`;  
            return;
        }
    }
    alert('내가 쓴글이 아니다.')
    
    // for (let j = 0; j < userList.length; j++) {
    //     const obj = postList[j];
    //     const obj2 = userList[j];
    //     if (obj.uid == selectUid) {
    //         const confirm = prompt('비밀번호 입력 : ');          // 존재하면 비번 받고, 일치하면 삭제
    //         if (confirm == obj2.pwd) {
    //             postList.splice(j, 1)
    //             setPosts(postList);
    //             alert('게시물이 삭제되었습니다.')
    //             location.href = `list.html?pages=1&${getUid(obj.uid)}`;                   // 삭제 성공시 list.html 로 이동
    //         } else {
    //             alert('삭제 실패 : 비밀번호 불일치')
    //             return;
    //         } // else end
    //     } // if end
    // }
}

//     for (let i = 0; i < postList.length; i++) {                  // 배열 내 선택된 게시물 조회
//         const obj = postList[i];
//         if (obj.pid == selectPid) {
//             const confirm = prompt('비밀번호 입력 : ');          // 존재하면 비번 받고, 일치하면 삭제
//             if (confirm == obj.pwd) {
//                 postList.splice(i, 1)
//                 setPosts(postList);
//                 alert('게시물이 삭제되었습니다.')
//                 location.href = 'list.html';                   // 삭제 성공시 list.html 로 이동
//             } else {
//                 alert('삭제 실패 : 비밀번호 불일치')
//             } // else end
//         } // if end
//     } // for end
// } // func end


// (2) 수정 이동 함수
function postsUpdateView() {
    const url = new URLSearchParams(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')                            // 선택한 pid 가져오기

    let postList = getPosts();
    let userList = getUser();
    let uid = localStorage.getItem('uidId');
    // for (let i = 0; i < postList.length; i++) {
    //     const obj = postList[i];
    //     if (obj.pid == selectPid) {
    //         const confirm = prompt('비밀번호 입력 : ');
    //         let isMatched = false;
    //         for (let j = 0; j < userList.length; j++) {
    //             const obj2 = userList[j];
    //                 console.log( obj );
    //                 console.log( obj2 );
    //             if (confirm == obj2.pwd && obj.uid == obj2.uid) {
    //                 isMatched = true;
    //                 break;
    //             }
    //         }
        for( let i = 0 ; i < postList.length ; i++) {
        let post = postList[i];
        if( post.pid == selectPid && post.uid == uid ){ // 현재 보고 있는 게시물 이면서 로그인된 회원 글이면 
            // 2. 내가 쓴글인지 확인 
            location.href = `update.html?pid=${selectPid}`;  
            return;
        }
    }
}

function makeRating(rating) {
    let html = '<span class="star">';
    for (let i=1; i<6; i++) {
        if (i<=rating) {
            html += '★';
        } else {
            html += '☆';
        }
    }
    html += '</span>'
    
    return html;
} // 별점에 별 그리기