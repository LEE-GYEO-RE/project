const loginList = [
  { uid: "admin", pwd: "1234", name: "관리자", isAdmin: true },
  { uid: "user", pwd: "1234", name: "일반회원", isAdmin: false }
];

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
  
  //2-1. 관리자 권한으로 로그인 또는 일반 사용자 로그인
  const Master = loginList.find(u=> u.uid == uid && u.pwd == pwd);
  
  if (!Master) {
    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    return;
  }

  if(Master.isAdmin == true){
   alert(`${Master.uid}님, 관리자 로그인 성공!`); //`${Master.name}님
    window.location.href = "/list.html";
  }else{
    alert("일반 사용자로 로그인합니다.")
    window.location.href = "/list.html";
  }

  //3. 객체화
  const obj = { uid, pwd, isAdmin };

  // 4. localStorage 에서 배열 가져오기.
  let loginList = localStorage.getItem('loginList');
  if (loginList == null) { loginList = [] }
  else { loginList = JSON.parse(loginList); }

  // 5. 객체를 배열에 저장
  obj.uno = loginList.length == 0 ? 1 : loginList[loginList.length - 1].uno + 1; //자동번호
  loginList.push(obj);

  // 6. localStorage 에 배열 저장하기. 
  localStorage.setItem('loginList', JSON.stringify(loginList));

  // 7. 기타 등등

  if (!uid || !pwd) {
    alert('아이디와 비밀번호를 모두 입력해주세요.');
    return;
  }

  console.log(loginList);
  alert('로그인 성공!!!');
  location.href = '/list.html' //로그인 성공시 목록(list) 페이지로 이동

} // func end 



