# ItHome
Next.js 전쟁의 서막

## 과거 코드의 문제점들 및 개선 방향
### <디자인 & 재활용 & 모듈화>

- 디자인 컴포넌트의 재활용성 ~~(모바일 웹뷰 기반으로 / 기준, 규칙이 필요해)~~
    - 에어비앤비 좁을 때 기준으로 다 구현 / → 추후 모바일 웹뷰 & 넓을 때 구현
- .env 통일 필요
- 모듈화 : 예) 버튼은 하나만 만들어 놓고 복붙복붙 / 이미지 보여주는것도 하나만 만들고 모양 복붙복붙 /

### <코딩 스타일>

- eslint (카멜케이스) / prettier의 필요성 (코딩 컨벤션 통일)
- 변수이름 규칙 짓기 (강조해야 할 것이 앞에 오도록 ex. fetchList)
- useState 사용시 특별한 경우가 아니라면 하나하나 만들지 말고 inputs 양식 쓰기
(대표적인 예시로 방 업로드와 방 수정 dialog 차이 보면됨)
- fetch에서 axios로 변경
- zustand 기준 정하기..?

### <코딩 건축 기초공사 집짓기>

- Next.js 도입 : SEO!!!
- Typescript 도입 - 에러처리, type 헷갈림…

- ~~개발 서버 - docker 파일로.~~

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
