import _ from "lodash"

export function textToHTML(text) {
  let str = text;
  str = _.replace(str, /\n/g, "<br>");
  str = _.replace(str, / /g, "&nbsp;");
  return str;
}

export function purifyHTML(html) {
  let str = html;
  // str = _.replace(str, /(?![^<]*>|[^<>]*<\/(?!(?:p|pre)>))((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/ig, "<a href=\"$1\">$1</a>");

  // span 태그 제거
  str = _.replace(str, /\s*<\/?span[^>]*>\s*/ig, "");

  // 줄바꿈 정규화
  str = _.replace(str, /&nbsp;/ig, " ");
  str = _.replace(str, /\s*<p [^>]*>\s*/ig, "<p>");
  // str = _.replace(str, /<p[^>]*>(.+?)<\/p[^>]*>/ig, "$1<br>");
  str = _.replace(str, /<p>/ig, "");
  str = _.replace(str, /<\/p>/ig, "<br>");
  str = _.replace(str, /<p>\s*&nbsp;\s*<\/p>/ig, "<br>");

  // PRE 태그 처리

  let pres = _.split(str, /<\/?pre/g);
  str = '';

  for (let i = 0; i < pres.length; i++) {
    if (i === 0) {
      str += pres[i];
    } else if (i % 2 === 0) {
      str += _.replace(pres[i], />/, '');
    } else {
      str += _.replace('<pre' + pres[i], /\n/g, '<br>')
    }
  }

  // 연속 줄바꿈 최대 2개로 제한
  str = _.replace(str, /(<br\/?>\s*){3,10}/ig, " <br> <br> <br>");

  // 자동 링크
  str = _.replace(str, /(?![^<]*>|[^<>]*<\/>)((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/ig, "<a href=\"$1\">$1</a>");
  return str;
}

