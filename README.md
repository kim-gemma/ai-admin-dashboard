✅ ✨ 최종 README (그대로 복붙)
# JobTrend — 채용 공고 수집·분석 시스템

채용 공고를 **수집 → 저장 → 분석 → 시각화 → AI 인사이트 제공**까지  
하나의 흐름으로 처리하는 풀스택 웹 서비스입니다.

단순 데이터 조회가 아니라,  
**AI + RAG 기반으로 채용 시장 트렌드를 분석**하는 것이 핵심입니다.

---

## 🚀 핵심 특징

- Python 크롤러로 채용 공고 자동 수집
- Cloudflare D1 기반 데이터 저장 및 통계 처리
- Chart.js 기반 데이터 시각화
- OpenAI(GPT) 기반 트렌드 분석
- **RAG(검색 증강 생성) 기반 맞춤형 인사이트 제공**
- **AI 통제 아키텍처 적용 (DB → AI → DB 구조)**

---

## 🏗 아키텍처 (한눈에)


Python Crawler
│
▼
POST /api/jobs/bulk
│
▼
Hono (TypeScript API)
│
▼
Cloudflare D1 (SQLite)
│
├── 통계 데이터
├── 공고 데이터
└── 임베딩 벡터 (RAG)
│
▼
Browser (Vanilla JS + Chart.js)
│
▼
OpenAI API (GPT + Embeddings)


---

## 💡 AI 통제 아키텍처 (핵심 포인트)

> 단순히 AI에게 모든 판단을 맡기지 않음

1. DB에서 공고 데이터 필터링  
2. 임베딩 기반 유사도 검색 (RAG)  
3. **AI는 "선택/요약"만 수행**  
4. 결과를 다시 DB에 저장  

👉 **AI의 자유도를 제한하고, 서비스 안정성과 재현성을 확보**

---

## 🧩 주요 기능

### 📊 대시보드
- 공고 수 / 기업 수
- 기술 스택 분포
- 경력 분포
- 최신 채용 공고

### 📄 공고 관리 (CRUD)
- 목록 조회 / 필터링 / 페이지네이션
- 등록 / 수정 / 소프트 삭제

### 📈 기술 통계
- 기술별 빈도 분석
- 랭킹 및 차트 시각화

### 🤖 AI 분석
- 채용 시장 트렌드 요약 (캐싱 적용)
- 사용자 질문 기반 분석
- 분석 히스토리 저장

### 🧠 RAG 시스템
- 공고 텍스트 임베딩 저장
- 코사인 유사도 기반 검색
- AI 응답에 컨텍스트 주입

### 🕷 크롤러
- 사람인 / 원티드 채용 공고 수집
- JSON 저장 및 API 업로드

---

## 🛠 기술 스택

### Frontend
- HTML, Vanilla JS
- Tailwind CSS (CDN)
- Chart.js

### Backend
- Hono (TypeScript)
- Cloudflare Workers

### Database
- Cloudflare D1 (SQLite)

### AI
- OpenAI GPT-4o-mini
- text-embedding-3-small

### Crawler
- Python 3
- BeautifulSoup
- requests

---

## 📁 폴더 구조


src/
├── index.tsx # Hono 앱 진입점
├── routes/ # API 라우트
│ ├── jobs.ts
│ ├── stats.ts
│ ├── ai.ts
│ ├── rag.ts
│ └── crawler.ts
├── rag/ # 임베딩 & RAG 로직
└── types/

public/static/app.js # 프론트 UI
crawler/ # Python 크롤러
migrations/ # DB 스키마


---

## ⚡ 실행 방법

```bash
# 1. 설치
npm install

# 2. DB 마이그레이션
npx wrangler d1 migrations apply DB --local

# 3. 환경 변수
OPENAI_API_KEY=sk-...

# 4. 실행
npm run dev

브라우저:

http://localhost:5173
📡 API 예시
GET    /api/jobs
POST   /api/jobs/bulk
GET    /api/stats/dashboard
GET    /api/ai/trend
POST   /api/ai/summary
POST   /api/rag/reindex

🔍 데이터베이스 구조
jobs — 채용 공고 데이터
tech_stats — 기술 통계
ai_analysis — AI 분석 결과
job_embeddings — RAG 임베딩

🧯 트러블슈팅
문제	원인
통계 API 오류	D1 마이그레이션 미적용
AI 결과 안 나옴	OPENAI_API_KEY 설정
크롤 데이터 없음	업로드 API URL 확인
RAG 검색 안됨	reindex 미실행

📈 배운 점
AI를 서비스에 적용할 때
"통제 가능한 구조"가 중요함을 경험
RAG를 통해
정확도 + 신뢰성 향상
서버리스 환경(Cloudflare)에서
경량 API 설계 경험

🚧 향후 개선
벡터 DB (Pinecone / Weaviate) 적용
실시간 데이터 스트리밍
사용자 맞춤 추천 강화
배치 기반 임베딩 처리



📝 프로젝트 소개
JobTrend는
데이터 수집부터 AI 분석까지 한 흐름으로 연결된 시스템을 구현한 프로젝트입니다.

단순 CRUD가 아닌,
"AI + 데이터 + 아키텍처 설계 능력"을 보여주는 포트폴리오 프로젝트입니다.
