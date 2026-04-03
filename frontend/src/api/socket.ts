/**
 * WebSocket 유틸리티
 *
 * 사용법:
 *   const result = await sendWsMessage<ResponseType>(url, payload);
 *
 * - 매 호출마다 새 WebSocket 연결을 맺고, 응답을 받으면 즉시 닫습니다.
 * - 서버가 { status: "error", message: "..." } 를 반환하면 Promise가 reject 됩니다.
 */
export function sendWsMessage<T = unknown>(
  url: string,
  payload: object
): Promise<T> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);

    const timer = setTimeout(() => {
      ws.close();
      reject(new Error("WebSocket 응답 시간 초과"));
    }, 10_000);

    ws.onopen = () => {
      ws.send(JSON.stringify(payload));
    };

    ws.onmessage = (event) => {
      clearTimeout(timer);
      try {
        const data = JSON.parse(event.data) as { status: string; message?: string } & T;
        if (data.status === "error") {
          reject(new Error(data.message ?? "서버 오류"));
        } else {
          resolve(data as T);
        }
      } catch {
        reject(new Error("응답 파싱 실패"));
      } finally {
        ws.close();
      }
    };

    ws.onerror = () => {
      clearTimeout(timer);
      reject(new Error("WebSocket 연결 오류"));
      ws.close();
    };

    ws.onclose = (event) => {
      if (!event.wasClean) {
        clearTimeout(timer);
        reject(new Error("WebSocket 비정상 종료"));
      }
    };
  });
}
