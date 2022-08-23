# Youtube-Playlist-Length
유튜브 재생목록 url을 받으면 유튜브 api를 사용하여 재생목록에 있는 동영상들의 총 길이를 보내주는 사이트입니다.

* 경험해보기
[https://ytblistlength.herokuapp.com/](https://ytblistlength.herokuapp.com/)

### 로직 설명
* 재생목록 안의 영상 url은 'list=***' 형태로 되어 있고 ***에 해당하는 부분이 재생목록의 id입니다. 
url 을 받으면 이 재생목록 id를 파싱하여 얻어낸 후 api에 넣어서 호출합니다. 
결과로 받는 것은 각 동영상의 id입니다.
각 동영상들의 id를 콤마로 join해서 여러 동영상들의 길이 정보를 받아옵니다.
youtube api는 한 번에 50개의 결과값들만 보내주기 때문에 재생목록에 있는 영상의 개수가 50개가 넘어갈 경우에는 다른 처리를 또 해주어야 합니다.
api 결과값에는 nextPageToken도 포함되어 있어 이를 붙인 요청을 결과값에 nextPageToken이 없을 때까지 반복하여 요청합니다.
각 동영상의 길이를 파싱하여 밀리세컨드 기준으로 다 더한 뒤 humanize-duration을 사용하여 "*시간 *분 *초" 꼴의 객체를 만들어 반환합니다.

### 사용한 방법들
* javascript
* html
* express
* pug
* youtube api

### 완성을 위해 해야 하는 것
* 프론트 작업 - (x)
* 웹사이트 배포 - (O)
* 에러 처리 - (x)

### 업데이트 로그
* 2022/08/23 - postman 으로 url 받고 api 호출하여 재생목록의 총 길이, 1.25배속, 1.5배속, 1.75배속, 2배속으로 시청할 때에 걸리는 시간 보내주기
* 2022/08/23 - express 로 로컬 서버 만듦
* 2022/08/23 - heroku 로 배포 완료
