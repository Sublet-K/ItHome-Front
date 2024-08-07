export const MarketingBanner = () => {
  return (
    <div className="bg-black text-white p-6 sm:p-8">
      <div className="ml-2 sm:ml-4">
        <h2 className="mb-2 text-xl sm:text-3xl font-semibold">
          잠시 방을 비워야 하나요?
          <br />
        </h2>
        <p className="mb-1 font-light text-base sm:text-lg">
          무수수료로 간편하게 방을 양도하세요. 그리고 마케팅 혜택도 받아가세요
        </p>

        <p className="mb-1 font-light text-base sm:text-lg">
          그리고 양도된 방을 계약해
          <br />
          장기 계약의 혜택을 받으세요.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 text-center mt-4">
        <a
          href="https://rose-palm-6f0.notion.site/ItHome-95ecc36d50f74a14878c825518ca0e41?pvs=4"
          className="flex-1 border p-2.5 bg-gray-400 border-gray-500 rounded-lg"
          target="_blank"
        >
          <p className="text-base text-white font-light">ItHome 가이드 보기</p>
        </a>

        <a
          href="https://open.kakao.com/me/ithome"
          className="sm:w-40 border p-2.5 bg-gray-500 border-gray-500 rounded-lg"
          target="_blank"
        >
          <p className="text-base text-white font-light">문의하기</p>
        </a>
      </div>
    </div>
  );
};
