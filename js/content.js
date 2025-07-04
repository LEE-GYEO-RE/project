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


    // for (let j = 0; j < userList.length; j++) {
    //     const obj1 = userList[j];
    //     if (userList[j].uid == selectUid) {
    //         document.querySelector('.info-user').innerHTML = obj1.uid
    //         break;
    //     }
    // }

    for (let i = 0; i < postList.length; i++) {
        const obj = postList[i];
        if (postList[i].pid == selectPid) {
            document.querySelector('.title').innerHTML = obj.title                  // 선택된 게시물 번호와 일치하면 내용 출력
            document.querySelector('.review-text').innerHTML = obj.desc      // content.html 의 클래스명 가진 마크업 사이에 찾은 obj.~~` 넣어서 출력
            document.querySelector('.info-user').innerHTML = obj.uid     // obj에서 user 넣어야 빼오기 가능
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
    for (let i = 0; i < postList.length; i++) {
        let post = postList[i];
        if (post.pid == selectPid && post.uid == uid) { // 현재 보고 있는 게시물 이면서 로그인된 회원 글이면 
            // 2. 내가 쓴글인지 확인 
            alert('게시물이 삭제되었습니다.')
            postList.splice(i, 1)
            setPosts(postList);
            location.href = `list.html?pages=1&${getUid(uid)}`;
            return;
        }
    }
    alert('내가 쓴글이 아니다.')
}


// (2) 수정 이동 함수
function postsUpdateView() {

    const url = new URLSearchParams(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')                            // 선택한 pid 가져오기
    // const selectUid = url.get('uid');

    let postList = getPosts();                                                 // localStorage 배열 가져오기
    let userList = getUser();
    let uid = localStorage.getItem('uidId'); // 현재 로그인된 아이디.

    // 1. 게시물 찾기
    for (let i = 0; i < postList.length; i++) {
        let post = postList[i];
        if (post.pid == selectPid && post.uid == uid) { // 현재 보고 있는 게시물 이면서 로그인된 회원 글이면 
            // 2. 내가 쓴글인지 확인 
            location.href = `update.html?pid=${selectPid}&${getUid(uid)}`;
            return;
        }
    }
    alert('내가 쓴글이 아니다.')
}

// 별점에 별 그리기
function makeRating(rating) {
    let html = '<span class="star">';
    for (let i = 1; i < 6; i++) {
        if (i <= rating) {
            html += '★';
        } else {
            html += '☆';
        }
    }
    html += '</span>'

    return html;
}
// 공통 JS (헤더 로그인 구현)
isLogin();
function isLogin() {
    const header_content = document.querySelector("#header_content");
    let userList = getUserList();
    let currentUser = new URLSearchParams(location.search).get('uno');
    let html = '';

    if (currentUser != null) {
        for (let i = 0; i < userList[i].length; i++) {
            if (userList[i].uno == currentUser) {
                html += `<ul id="header_top">
                            <li><a href="list.html?pages=1">로그아웃</a></li>
                        </ul>
                        <ul id="header_bottom">
                            <li>${userList[i].uid}님, 환영합니다</li>
                        </ul>`;
            }
        }
    } else return;

    header_content.innerHTML = html;
} // 로그인 여부 확인, 로그인 시 html 변경 (로그아웃, uid 포함으로)

function getUserList() {
    let userList = localStorage.getItem('userList');
    if (userList == null) {
        userList = [];
    } else {
        userList = JSON.parse(userList);
    }
    return userList;
} // userList getter