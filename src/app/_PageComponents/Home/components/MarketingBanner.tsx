export const MarketingBanner = () => {
  return (
    <div className="bg-black text-white p-6 sm:p-8">
      <div className="ml-2 sm:ml-4">
        <h2 className="mb-2 text-xl sm:text-3xl font-semibold">
          빠르게 방을 <br></br>
          양도해야하나요?
        </h2>
        <p className="mb-1 font-light text-base sm:text-lg">
          무료 SNS 마케팅 받으세요.
        </p>
        <p className="mb-1 font-light text-base sm:text-lg">
          신속하게 양도를 도와드릴게요.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-4 text-center">
        <a
          href="https://rose-palm-6f0.notion.site/ItHome-95ecc36d50f74a14878c825518ca0e41?pvs=4"
          className="col-span-4 w-full mt-4 border p-2.5 bg-gray-400 border-gray-500 rounded-lg"
        >
          <p className="text-base text-white font-light">ItHome 가이드 보기</p>
        </a>

        <a
          href="https://open.kakao.com/me/ithome"
          className="w-full mt-4 border p-2.5 bg-gray-500 border-gray-500 rounded-lg"
        >
          <p className="text-base text-white font-light">문의하기</p>
        </a>
      </div>
    </div>
  );
};
