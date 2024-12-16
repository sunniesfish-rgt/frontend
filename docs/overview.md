# RGT 도서관리 시스템 개요

## 프로젝트 개요

RGT 도서관리 시스템은 도서 목록을 관리하고 조회할 수 있는 웹 애플리케이션입니다. 이 시스템은 Next.js를 기반으로 하며, 클라이언트와 서버 사이드 렌더링을 모두 활용하여 최적의 성능을 제공합니다.

## 기술 스택

- **Next.js 15**: 최신 버전의 Next.js를 사용하여 서버 사이드 렌더링과 정적 사이트 생성 기능을 활용합니다.
- **TypeScript**: 타입 안전성을 보장하여 코드의 신뢰성을 높입니다.
- **Tailwind CSS**: 유틸리티 기반의 CSS 프레임워크로, 빠르고 일관된 스타일링을 제공합니다.
- **React Query**: 서버 상태 관리를 통해 데이터 페칭과 캐싱을 효율적으로 처리합니다.
- **Zustand**: 전역 상태 관리를 위한 경량 상태 관리 라이브러리입니다.

## 구현상의 특징

### 1. SEO 최적화

- **메타데이터 및 OpenGraph**: 각 페이지에 적절한 메타데이터와 OpenGraph 태그를 설정하여 검색 엔진 최적화 및 소셜 미디어 공유 최적화를 구현합니다.
- **sitemap.xml 및 robots.txt**: 사이트맵과 로봇 파일을 통해 검색 엔진이 사이트를 효율적으로 크롤링할 수 있도록 지원합니다.

### 2. 인증 시스템

- **HTTP-only 쿠키 기반 JWT 인증**: 보안성을 높이기 위해 HTTP-only 쿠키를 사용하여 JWT 토큰을 관리합니다. 이는 XSS 공격으로부터 보호합니다.
- **미들웨어를 통한 인증 보호**: Next.js의 미들웨어 기능을 사용하여 관리자 페이지에 대한 접근을 보호합니다. 미들웨어는 요청을 가로채고 인증 상태를 확인하여 적절한 리다이렉션을 수행합니다.

### 3. 데이터 관리

- **React Query**: 서버 상태 관리를 통해 데이터 페칭과 캐싱을 효율적으로 처리합니다. 이는 클라이언트 사이드에서의 데이터 일관성을 유지하고, 불필요한 네트워크 요청을 줄입니다.
- **Zustand**: 전역 상태 관리를 위한 경량 상태 관리 라이브러리로, 인증 상태와 같은 전역 상태를 관리합니다.

### 4. 성능 최적화

- **서버 사이드 렌더링(SSR)**: 초기 페이지 로드 시 서버에서 데이터를 렌더링하여 빠른 초기 로딩 속도를 제공합니다.
- **정적 사이트 생성(SSG)**: 자주 변경되지 않는 페이지는 정적으로 생성하여 성능을 최적화합니다.
- **React Suspense**: 데이터 로딩 중 로딩 상태를 표시하여 사용자 경험을 개선합니다.
- **코드 스플리팅**: 필요할 때만 코드를 로드하여 초기 로딩 시간을 줄입니다.

### 5. 페이지네이션 및 검색

- **쿼리 파라미터 기반 페이지네이션**: URL 쿼리 파라미터를 사용하여 페이지네이션을 구현, 사용자가 페이지를 이동할 때 검색 조건을 유지합니다.
- **실시간 검색 및 필터링**: 사용자가 입력한 검색어에 따라 실시간으로 도서 목록을 필터링합니다.

## 프로젝트 구조

```
src/
├── app/                    # Next
```