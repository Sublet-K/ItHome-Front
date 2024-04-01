import "animate.css";
import * as s from "../../styles/Public.styles";
import type { Dispatch, SetStateAction } from "react";
import { ok } from "assert";

const setStateOnandOff = (
  setState: Dispatch<SetStateAction<boolean>> | undefined
) => {
  if (setState === undefined) {
    console.log("[Error] setState가 없습니다.");
    return;
  }
  setState(true);
  setTimeout(() => {
    setState(false);
  }, 5000);
};

export const notFoundError = (
  res: Response,
  animation = false,
  setSuccessState: Dispatch<SetStateAction<boolean>> | undefined = undefined
) => {
  if (!res.ok) {
    console.log(res);
    throw new Error(`${res.status} 에러가 발생했습니다.`);
  }
  if (animation) {
    setStateOnandOff(setSuccessState);
  }
  return res.json();
};

export const raiseError =
  (
    name: string,
    animation = false,
    setFailState: Dispatch<SetStateAction<boolean>> | undefined = undefined
  ) =>
  (e: Error) => {
    console.log(`[Error] ${name}`, e);
    if (!animation) return;

    setStateOnandOff(setFailState);
  };

export function checkEmailFormat(target: string, school: string) {
  if (school === "고려대학교") {
    if (typeof target == "string" && target.split("@", 2)[1] == "korea.ac.kr") {
      return true;
    }
  }
  return false;
}

export function priceToString(price: string | number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getDateDiff(d1: string, d2: string) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diffDate = date1.getTime() - date2.getTime(); // gettime 함수는  number of milliseconds로 return함

  return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
}

export function DateFormat(day: string | Date) {
  const dayDate = new Date(day);
  return `${dayDate.getFullYear()}.${
    dayDate.getMonth() + 1
  }.${dayDate.getDate()}`;
}

export function CalulateDate(date: string, days: number) {
  const clone_date = new Date(date);
  const cal_date = new Date();
  cal_date.setDate(clone_date.getDate() + days);
  return DateFormat(cal_date);
}

export function Alert() {
  return (
    <div
      className="animate__animated  animate__delay-1s animate__slower animate__fadeOut shadow p-2 bg-white items-center text-indigo-100 boarder-black leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
        >
          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
        </svg>
      </span>
      <span className="font-semibold text-black mr-2 text-left flex-auto">
        완료되었습니다!
      </span>
    </div>
  );
}

export function FailAlert() {
  return (
    <div
      className="animate__animated  animate__delay-1s animate__slower animate__fadeOut shadow p-2 bg-white items-center text-indigo-100 boarder-black leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span className="flex rounded-full bg--500 uppercase px-2 py-1 text-xs font-bold mr-3">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.70035 1.50146C5.27785 0.501465 6.72184 0.501465 7.29884 1.50146L10.9763 7.87546C11.5533 8.87546 10.8313 10.1255 9.67685 10.1255H2.32235C1.16785 10.1255 0.446345 8.87546 1.02335 7.87546L4.70035 1.50146ZM5.99985 4.12496C6.0993 4.12496 6.19468 4.16447 6.26501 4.2348C6.33534 4.30513 6.37485 4.40051 6.37485 4.49996V6.37496C6.37485 6.47442 6.33534 6.5698 6.26501 6.64013C6.19468 6.71046 6.0993 6.74996 5.99985 6.74996C5.90039 6.74996 5.80501 6.71046 5.73468 6.64013C5.66435 6.5698 5.62485 6.47442 5.62485 6.37496V4.49996C5.62485 4.40051 5.66435 4.30513 5.73468 4.2348C5.80501 4.16447 5.90039 4.12496 5.99985 4.12496ZM5.99985 8.24996C6.0993 8.24996 6.19468 8.21046 6.26501 8.14013C6.33534 8.0698 6.37485 7.97442 6.37485 7.87496C6.37485 7.77551 6.33534 7.68013 6.26501 7.6098C6.19468 7.53947 6.0993 7.49996 5.99985 7.49996C5.90039 7.49996 5.80501 7.53947 5.73468 7.6098C5.66435 7.68013 5.62485 7.77551 5.62485 7.87496C5.62485 7.97442 5.66435 8.0698 5.73468 8.14013C5.80501 8.21046 5.90039 8.24996 5.99985 8.24996Z"
            fill="#F62424"
          />
        </svg>
      </span>
      <span className="font-semibold text-black mr-2 text-left flex-auto">
        실패하였습니다.
      </span>
    </div>
  );
}

export function StyleComponent({ content }: { content: string }) {
  if (typeof content !== "string") {
    console.log("undefined type");
    return;
  } else if (!content) {
    console.log("Content name isnt given");
    return;
  } else if (content === "CloseButton") {
    return (
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="black"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
  } else if (content === "VerifyRoom") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
      >
        <path
          d="M14.5 0.541992C6.91 0.541992 0.75 6.70199 0.75 14.292C0.75 21.882 6.91 28.042 14.5 28.042C22.09 28.042 28.25 21.882 28.25 14.292C28.25 6.70199 22.09 0.541992 14.5 0.541992ZM10.7738 20.1907L5.8375 15.2545C5.30125 14.7182 5.30125 13.852 5.8375 13.3157C6.37375 12.7795 7.24 12.7795 7.77625 13.3157L11.75 17.2757L21.21 7.81574C21.7462 7.27949 22.6125 7.27949 23.1488 7.81574C23.685 8.35199 23.685 9.21824 23.1488 9.75449L12.7125 20.1907C12.19 20.727 11.31 20.727 10.7738 20.1907Z"
          fill="#6724F7"
        />
      </svg>
    );
  } else if (content === "UnverifyRoom") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
      >
        <path
          d="M14.5 0.929199C6.91 0.929199 0.75 7.0892 0.75 14.6792C0.75 22.2692 6.91 28.4292 14.5 28.4292C22.09 28.4292 28.25 22.2692 28.25 14.6792C28.25 7.0892 22.09 0.929199 14.5 0.929199ZM10.7738 20.5779L5.8375 15.6417C5.30125 15.1054 5.30125 14.2392 5.8375 13.7029C6.37375 13.1667 7.24 13.1667 7.77625 13.7029L11.75 17.6629L21.21 8.20295C21.7462 7.6667 22.6125 7.6667 23.1488 8.20295C23.685 8.7392 23.685 9.60545 23.1488 10.1417L12.7125 20.5779C12.19 21.1142 11.31 21.1142 10.7738 20.5779Z"
          fill="#616161"
        />
      </svg>
    );
  } else if (content === "ImageDrop") {
    return (
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          className="w-8 h-8 mb-4 text-gray-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500 ">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500 ">
          JPG파일만 가능합니다(MAX. 800x400px)
        </p>
      </div>
    );
  } else if (content === "FixInfo") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" />
      </svg>
    );
  } else {
    console.log("check content name");
    return;
  }
}

export function Information({
  title,
  info,
}: {
  title: string;
  info: string | number;
}) {
  return (
    <div>
      <p className="ml-1 text-m font-bold">• {title}</p>
      <s.NormalText className="ml-4 text-sm font-medium">{info}</s.NormalText>
    </div>
  );
}
