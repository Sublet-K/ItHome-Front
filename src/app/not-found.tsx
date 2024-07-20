// app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="mt-4 font-thin">페이지가 존재하지 않습니다.</p>
      <p className="font-thin">다른 재밌는 방을 찾으러 가봐요.</p>

      <button
        className="border p-3 mt-4 bg-gray-800 border-black rounded-lg hover:bg-black"
        onClick={() => router.push("/")}
      >
        <p className="text text-white font-light">홈으로</p>
      </button>
    </div>
  );
};

export default NotFoundPage;
