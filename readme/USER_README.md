## 계정에 관한 실제 화면과 다음과 같은 요구사항이 있었어요.

### 로그인
- **휴대폰 문자**로 인증하고, 하나의 인증번호당 **제한시간**과 **3번의 시도**가 가능해요.
- 제한시간이나 횟수 초과 시 해당 **인증번호는 파기**돼요.
- 하루에 인증 요청은 총 3번, 이후 로그인 시도는 **일정시간 차단**돼요.
- 로그인에 성공시 **JWT, Refresh 토큰** 발급 후 기간 별 관리를 통해 **API 인가**에 이용해요.

<p>
<img src= "https://user-images.githubusercontent.com/99117410/230634190-11949ae2-f9e6-4689-b7cd-16983fe71054.jpg" width = "240" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230634629-3f6cae6d-dee4-4034-a973-4a463c528272.jpg" width = "240" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230634218-e78ba2aa-4c70-47cf-a813-70ffab486a1b.jpg" width = "240" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230634228-7118dd40-2f3d-4938-ac12-e72133ccea31.jpg" width = "240" height = "500">
</p>

### 회원가입
- 보호자, 간병인 별 **별도의 가입 페이지**를 제공해요. 
- 휴대폰 인증 성공 시 신규 회원이면 인증 완료된 상태로 **회원가입** 페이지로 자동 이동해요.
- 작성하지 않아도 되는 문항을 제외하곤 입력하지 않으면 **다음 단계가 불가**해요.  

**공통 가입 문항**
<p>
<img src= "https://user-images.githubusercontent.com/99117410/230631973-a6005b51-2612-4933-a888-3eedbfd38903.jpg" width = "240" height = "500">
</p>

**간병인 가입**
<p>
<img src= "https://user-images.githubusercontent.com/99117410/230632362-21c5e8b7-e0c4-419b-93cd-08e8946733b7.jpg" width = "240" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230632576-7f02fc83-cfbe-4660-bece-9e5fec657af9.jpg" width = "240" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230632517-f050740a-50c9-4b4f-8602-916288ca4ed8.jpg" width = "240" height = "500">
</p>

**보호자 가입**
<p>
<img src= "https://user-images.githubusercontent.com/99117410/230633156-6b68c09f-d238-4398-ac7f-8dbb5814b271.png" width = "240" height = "500"> 
<img src= "https://user-images.githubusercontent.com/99117410/230633326-fa4876fe-cadb-4dcf-b5a9-0b81d0a87f19.png" width = "240" height = "500"> 
</p>