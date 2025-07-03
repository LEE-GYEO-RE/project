// 공통 JS (헤더 로그인 구현)
isLogin();
function isLogin() {
    const header_content = document.querySelector("#header_content");
    let userList = getuserList();
    let currentUser = new URLSearchParams(location.search).get('uno');
    let html = '';

    if (currentUser != null) {
        for (let i=0; i<userList[i].length; i++) {
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