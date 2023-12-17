export function formatDate(date: Date | string | number, fmt: string = "yyyy-MM-dd hh:mm:ss") {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  const o: Record<string, number> = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] + "" : ("00" + o[k]).substr(("" + o[k]).length),
      );
    }
  }
  return fmt;
}

export function getQueryParams(url: string): { [key: string]: string } {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);
  const queryObj: { [key: string]: string } = {};

  params.forEach((value, key) => {
    queryObj[key] = value;
  });

  return queryObj;
}
export function buildQueryString(params: { [key: string]: string }): string {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.append(key, params[key]);
    }
  }

  return searchParams.toString();
}
