// 초기 사용자 등록 및 관리자 조건부 등록
if (!localStorage.getItem("userList")) {
  const defaultUsers = [
    { uid: "admin", pwd: "1234", name: "관리자", isAdmin: true, uno: 1 },
    { uid: "user", pwd: "1234", name: "일반회원", isAdmin: false, uno: 2 }
  ];
  localStorage.setItem("userList", JSON.stringify(defaultUsers));
};


function logins() {
  //1. 입력 마크업 객체 가져오기
  const uidInput = document.querySelector('#uidInput'); // 아이디 입력 요소 선택
  const pwdInput = document.querySelector('#pwdInput'); // 비밀번호 입력 요소 선택
  //const isAdminInput = document.querySelector('#isAdminInput');
  const isAdminInput = document.getElementById("isAdminInput"); // 관리자 권한 체크박스 선택

  //2. 입력 마크업 객체내 입력값 가져오기
  const uid = uidInput.value; // 아이디 값
  const pwd = pwdInput.value; // 비밀번호 값
  const isAdmin = isAdminInput.checked; // 체크박스 체크 여부 (true/false)
  //isAdminInput.checked는 체크박스가 체크되었는지 여부를 true 또는 false로 반환합니다.
  //체크되어 있으면 관리자용 처리를 하고, 아니면 일반 사용자로 처리합니다. 

  //3. 입력값이 비어있는지 확인.
  if (!uid || !pwd) {
    alert('로그인 아이디와 비밀번호를 모두 입력해주세요.');
    return;
  }

  // 4. localStorage 에서 배열 가져오기.
  let userList = localStorage.getItem('userList');
  if (userList == null) { userList = [] }
  else { userList = JSON.parse(userList); } // 기존유저 목록 불러오기

  //5.관리자 권한으로 로그인 또는 일반 사용자로 로그인
  //로그인할 사용자 찾기
  const foundUser = userList.find(u => u.uid == uid);
  if (!foundUser) {
    alert("존재하지 않는 아이디입니다.");
    return;
  }
  if (foundUser.pwd !== pwd) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  // 관리자 체크했는데 일반 사용자일 경우 → 접근 금지
  if (isAdmin && !foundUser.isAdmin) {
    alert("일반 사용자는 관리자 로그인을 할 수 없습니다.");
    return;
  }

  if (foundUser.isAdmin && !isAdmin) {
    alert("관리자 계정입니다. 관리자 로그인을 원하시면 체크박스를 선택하세요.");
    return;
  }
  const role = foundUser.isAdmin ? "관리자" : "일반 사용자";
  alert((foundUser.name || foundUser.uid) + "님, " + role + "로 로그인 성공!");

  localStorage.setItem("uidId", foundUser.uid);
  //if (foundUser.isAdmin) {
    location.href = `/list.html?pages=1&uid=${foundUser.uid}`; //로그인 성공시 리스트(list) 페이지로 이동 + uid 값 전달
  //} else {
  //  location.href = `/admin_list.html`;  //관리자 모드로 회원리스트 확인
  //}


}

// 공통 JS (헤더 로그인 구현)
isLogin();
function isLogin() {
    const header_content = document.querySelector("#header_content");
    let userList = getUserList();
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

function drawLogin() {
    let uid = new URLSearchParams(location.search).get('uid');
    const header_logo = document.querySelector('#header_logo');

    let logo = `<a href="list.html?pages=1&${getUid(uid)}"><img class="logo" src="sample_img/logo.png" />무비존</a>`;
    header_logo.innerHTML = logo;
} // 로그인 체크 후 쿼리스트링 구현


function getUid(uid) {
    // 함수에 let uid = new URLSearchParams(location.search).get('uid'); 로 uid 값을 가져온 다음, 매개변수에 uid를 넣어 호출할 것

    if (uid == null)
        return null;
    else return `uid=${uid}`;
}