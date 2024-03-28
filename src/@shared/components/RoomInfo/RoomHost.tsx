import * as RS from "@shared/styles/RoomInfo.styles";

export function RoomHost() {
  //추후 Host 정보 fetch로 받아오는 것으로 수정 필요
  return (
    <RS.RoomInfoSection>
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
        <div className="flex-shrink-0">
          <img
            alt="Profile"
            className="h-32 w-32 rounded-full"
            height="64"
            src="/logo.png"
            style={{
              aspectRatio: "64/64",
              objectFit: "cover",
            }}
            width="64"
          />
        </div>

        <section className="flex flex-col">
          <div className="bg-[#ffa500] text-white text-center rounded-md px-4 py-1 text-sm">
            호스트
          </div>
          <div className="bg-[#007bff] text-white text-center rounded-md px-4 py-1 text-sm">
            아주대
          </div>
          <div className="bg-[#6f42c1] text-white text-center rounded-md px-4 py-1 text-sm">
            삼성전자
          </div>
        </section>

        <div>
          <div className="text-2xl font-bold">호스트 이름</div>
          <div className="text-sm">호스트 소개</div>
          <div className="flex space-x-4 mt-1">
            <span className="text-sm text-gray-700">후기 1,220개</span>
            <span className="text-sm text-gray-700">경력 7년</span>
          </div>
        </div>
      </div>

      <button className="w-full rounded-lg bg-gray-300 text-black p-1">
        메세지 보내기
      </button>
    </RS.RoomInfoSection>
  );
}
