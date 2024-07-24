import { useEffect, useRef, useState } from 'react';

export const useTitle = initialTitle => {
  /* 사용법
  탭 이름 변경하는 거임. loading 전까지는 loading 탭으로 주고
  만약 loading이 끝나면 타이틀로 바꾸는 거임
  */
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

// export const useClick = (onClick) => {
//   /* 사용법
//   Click하면 일어날 함수를 onClick param에 보냄.
//   x = useClick
//   <h1 ref={x}> </h1>
//   위와 같이 설정하면 h1에 있는걸 클릭하면 자동으로 listener를 추가해줌.

//   이 함수는 useEffect로 component가 Mount일때 실행하고,
//   unmount일때 이 리스너를 삭제할거임.
//   */
//   if (typeof onClick !== "function") {
//     return;
//   }
//   const element = useRef();
//   useEffect(() => {
//     if (element.current) { //componentDidMount, DidUpdate일떄 호출됨
//       element.current.addEventListner("click", onClick);
//     }
//     return () => {
//       if (element.current) {
//         element.current.removeEventListner("click", onClick);
//       }
//     }
//   }, [])
//   return element;
// }
export const useConfirm = (message = '', onConfirm, onRejection) => {
  /* 사용법
  사용자가 뭔가를 삭제, 취소할때 "삭제하시겠습니까?" 물어보는 용도임.
  */
  if (!onConfirm || typeof onConfirm !== 'function') {
    return;
  }
  if (onRejection && typeof onRejection !== 'function') {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onRejection();
    }
  };
  return confirmAction;
};

export const usePreventLeave = () => {
  /*
  API에 뭔갈 보냈고 사람들이 닫지 않게하기위한거임. 만약 닫으려한다면 진행중인데 닫을거냐고 물어볼거임.
  beforeunload가 막아주는 거임.
   */
  const listener = event => {
    event.preventDefault();
    event.returnValue = '';
  };
  const enablePrevent = () => window.addEventListener('beforeunload', listener);
  const disablePrevent = () =>
    window.addEventListener('beforeunload', listener);
  return { enablePrevent, disablePrevent };
};

// export const useBeforeLeave = (onBefore) => {
//   /*
//   마우스가 특정 프레임을 떠나면 떠나지말라고 할수 있음.
//   만약 마우스가 어디를 벗어나면 '할인 혜택'을 보여줘서 페이지에 머물수 있도록함.
//   이 경우 마우스가 탭으로 향할때 뜨게되어있음.
//   */
//   if (typeof onBefore !== "function") {
//     return;
//   }
//   const handler = event => {
//     const { clientY } = event;
//     if (clientY <= 0) { onBefore(); }
//   }
//   useEffect(() => {
//     if (typeof onBefore !== "function") {
//       return;
//     }
//     document.addEventListener("mouseleave", handler);
//     return () => {
//       document.removeEventListener("mouseleave", handler);
//     };
//   }, []);
// }

// export const useFadeIn = (duration = 1, delay = 0) => {
//   /*
//   말그대로 fadein임 텍스트가 천천히 보이게할수 있음.
//   */
//   if (typeof duration !== "number" || typeof delay !== "number") {
//     return;
//   }
//   const element = useRef();
//   useEffect(() => {
//     if (element.current) {
//       const { current } = element;
//       current.style.transition = `opacity ${duration}s ease-in-out ${delay}`;
//       current.style.opacity = 1;
//     }
//   }, [])
//   return { ref: element, style: { opacity: 0 } };
// }

// export const useNetwork = (onChange) => {
//   /*온라인 오프라인일때 달라야함. 그걸 조절해줌
//   이렇게 해서
//   const handleNetworkChange= online=>{
//     console.log(~~~)
//   }
//   const onlie=useNetwork(handleNetworkChange)
//   <h1>{online ?"on" : "off"} </h1>
//   */
//   const [status, setStatus] = useState(navigator.online) //naviator online은 boolean
//   const handleChange = () => {
//     if (typeof onChange === "function") {
//       onChange(navigator.online);
//     }
//     setStatus(navigator.online)
//   }
//   useEffect(() => {
//     window.addEventListener("online", handleChange);
//     window.addEventListener("offline", handleChange);
//     () => {
//       window.removeEventListener("online", handleChange);
//       window.removeEventListener("offline", handleChange);
//     };
//   }, []);

//   return status
// }

export const useScroll = () => {
  /*
  scroll 위치 알려줌. 위치에 따라 스타일 변경 가능
  const{ y }=useScroll();
  <h1 style={{position: "fixed", color: y>100? "red" :"blue"}}
  */
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });

  const onScroll = () => {
    setState({ y: window.scrollY, x: window.scrollX });
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return state;
};

export const useFullscreen = callback => {
  /*
  이미지 클릭하면 이미지를 전체화면으로 보여줌.
  <div ref={element}>
  <img />
  <button onClick={triggerFull}>
  <button onClick={exitFull}>
  </div?
  */

  const runCb = isFull => {
    if (callback && typeof callback === 'function') {
      callback(isFull);
    }
  };
  const element = useRef();
  const triggerFull = () => {
    if (element.current) {
      if (element.current.requestFullscreen) {
        element.current.requestFullScreent();
      } else if (element.current.mozRequestFullScreen) {
        element.current.mozRequestFullScreen();
      } else if (element.current.webkitRequestFullScreent) {
        element.current.webkitRequestFullScreent();
      } else if (element.current.msRequestFullScreen) {
        element.current.msRequestFullScreen();
      }

      runCb(true);
    }
  };
  const exitFull = () => {
    document.exitFullscreen();

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreent) {
      document.mozCancelFullScreent();
    } else if (document.webkitExitFullScreent) {
      document.webkitExitFullScreent();
    } else if (document.msExitFullScreen) {
      document.msExitFullScreen();
    }
    runCb(false);
  };
  return { element, triggerFull, exitFull };
};

export const useInput = (intialValue, validator) => {
  /* 사용법
  1. 초기값, input value 검증할 함수 넣기. 예시로 글자수 10자 제한
  2. return value는 x=useInput('x', valid)하고  <input {...name} /> 넣으면 onChange event와 value 두마리 토끼 잡을수 있음.
   */
  const [value, setValue] = useState(intialValue);
  const onChange = event => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};
