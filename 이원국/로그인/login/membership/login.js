function logins() {
  //1. 입력 마크업 객체 가져오기
  const uidInput = document.querySelector('#uidInput');
  const pwdInput = document.querySelector('#pwdInput');
  //const isAdminInput = document.querySelector('#isAdminInput');
  const isAdminInput = document.getElementById("isAdminInput").checked;
  
  
  //2. 입력 마크업 객체내 입력값 가져오기
  const uid = uidInput.value;
  const pwd = pwdInput.value;
  const isAdmin = isAdminInput.value;

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
  location.href = 'list.html' //로그인 성공시 목록(list) 페이지로 이동

} // func end 



