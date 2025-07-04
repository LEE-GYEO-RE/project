viewList();
//isLogin();
drawLogin();

function viewList() {
    const table_content = document.querySelector(".table_content");
    const pagination = document.querySelector('.pagination');
    let postList = getPostList();

    let uid = new URLSearchParams(location.search).get('uid'); // querystring: 사용자 id
    let currentPage = new URLSearchParams(location.search).get('pages'); // querystring: 현재 페이지
    if (currentPage == null) currentPage = 1;
    let start = (currentPage-1)*10;
    let end = start+10;
    let html = '';
    for (let i=start; i<end && i<postList.length; i++) {
        html += `<tr>
                    <td class="list_num">${postList[i].pid}</td>
                    <td class="list_title"><a href="content.html?pid=${postList[i].pid}&${getUid(uid)}">${postList[i].title} ${spoilerCheck(postList[i].isSpoiler)}</a></td>
                    <td class="list_movieTitle">${postList[i].movieTitle}</td>
                    <td class="list_rating">${makeRating(postList[i].rating)}</td>
                    <td class="list_date">${postList[i].date}</td>
                </tr>`
    }

    let totalPage = postList[postList.length-1].pid;
    let pages = '';
    for (let i=1; i<=(totalPage/10)+1; i++) {
        pages += `<li class="page-item"><a class="page-link" href='list.html?pages=${i}&${getUid(uid)}'>${i}</a></li>`;
    }

    table_content.innerHTML = html;
    pagination.innerHTML = pages;
} // 게시글 목록 출력

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

function spoilerCheck(isSpoiler) {
    let html = '';
    if (isSpoiler == 'spoO') {
        html += '<span class="spoiler">[스포일러 주의]</span>';
    }

    return html;
} // 스포일러 체크

/* function deleteList() {
    let postList = getPostList();
    let uid = new URLSearchParams(location.search).get('uid');

    if (uid != 'admin') {
        alert("관리자만 접근 가능한 메뉴입니다.");
        return;
    }

    let pid = prompt("삭제할 게시물의 번호를 입력해주세요: ");
    for (let i=0; i<postList.length; i++) {
        if (postList[i].pid == pid) {
            postList.splice(i, 1);
            alert('삭제 완료');
            localStorage.setItem('postList', JSON.stringify(postList));
            viewList();
            return;
        }
    }

    alert('존재하지 않는 페이지 번호입니다.');
    return;
} // 페이지 번호를 입력받아 삭제 (관리자 전용) */

function getPostList() {
    let postList = localStorage.getItem('postList');
    if (postList == null) {
        postList = [];
    } else {
        postList = JSON.parse(postList);
    }
    return postList;
} // postList getter

// 공통 JS (헤더 로그인 구현)
// function isLogin() {
//     const header_content = document.querySelector("#header_content");
//     let userList = getUserList();
//     let uid = new URLSearchParams(location.search).get('uid');
//     let html = '';

//     if (uid != null) {
//         for (let i=0; i<userList.length; i++) {
//             if (userList[i].uid == uid) {
//                 html += `<ul id="header_top">
//                             <li><a href="list.html?pages=1">로그아웃</a></li>
//                         </ul>
//                         <ul id="header_bottom">
//                             <li>${userList[i].uid}님, 환영합니다</li>
//                         </ul>`;
//             }
//         }
//     } else return;

//     header_content.innerHTML = html;
// } // 로그인 여부 확인, 로그인 시 html 변경 (로그아웃, uid 포함으로)

function getUserList() {
    let userList = localStorage.getItem('userList');
    if (userList == null) {
        userList = [];
    } else {
        userList = JSON.parse(userList);
    }
    return userList;
} // userList getter

function drawLogin() {
    let uid = new URLSearchParams(location.search).get('uid');

    const header_logo = document.querySelector('#header_logo');
    const main_buttons = document.querySelector('#main_buttons');

    let logo = `<a href="list.html?pages=1&${getUid(uid)}"><img class="logo" src="sample_img/logo.png" />무비존</a>`;
    let buttons = `<button onclick="writeCheck()" class="btn btn-primary">글쓰기</button>`;

    header_logo.innerHTML = logo;
    main_buttons.innerHTML = buttons;
} // 로그인 체크 후 쿼리스트링 구현

function writeCheck() {
    // uid = new URLSearchParams(location.search).get('uid');

    const uid = localStorage.getItem('uidId')
    if (uid == null) {
        alert('로그인 후 글쓰기가 가능합니다.');
        return;
    } else {
        location.href = `/write.html?uid=${uid}`;
    }
}

function getUid(uid) {
    // 함수에 let uid = new URLSearchParams(location.search).get('uid'); 로 uid 값을 가져온 다음, 매개변수에 uid를 넣어 호출할 것

    if (uid == null)
        return null;
    else return `uid=${uid}`;
}