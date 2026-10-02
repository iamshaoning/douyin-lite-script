// ==UserScript==
// @name         抖音精简
// @namespace    local.douyin-lite
// @version      2026.10.02.01
// @description  抖音页面精简与直播聊天室消息过滤：按消费等级/粉丝团/黑名单/自定义规则过滤发言，屏蔽送礼、福袋、信息播报；自定义直播清晰度、自动网页全屏；导航栏布局屏蔽；显示具体互动数量与UID
// @license      GPL-3.0-only
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAF19JREFUeF7tnQl8U1X2x38vabqlLWOFrpStUMrWsrdUEARkEREQCoiAghswHQdQEFREGXfhD24MjOiMIqKD4IyICCObFCgt1JaC0ELpmq0L3ZLuyft/bkpL8pI07yUvaVre/Xz6KTT3nnvOud93381dzqXAU+riGzJarMMoGogGqD4A3RXAPQC8eKribhSjBVBJA0UUkAfgGgXq90YRzpZUybL4cAhlj5BAn9DxoOkFAGYB8LdHllCWsweuAfgvDWpvkUaWzrn07QI2ARDkExpPg14FGqNsrVgox58HaFCHAd2HRRrFEa5SOQEQ7B08VEdR7wCYxLUiIb8TPEDjB0qke1WpVv7BtjbWAARJQ9bQwPtsBQv52tID9CqVRrGNjQZsAKACpSG7ATzORqCQxzU8QIHerdQoFlvTplUAuvp19W/Q0gcAeqw1QcLnrugB+qRELJ5dWFl4y5J2FgFoanztYYAa6YqmCTqx9QCdLBGLp1qCwCIAgdLgEwA1jm01Qj5X9gB1SqWRPQCAZmppFoAgafBXNKhFrmySoBtnD+xRaeQLrQIQKA1eCVBbOYsXCri8ByhgrVIj/8BQUaMeIMgnqD9Ni664vCWCgjZ7QETTwxTVitRmAUYABHqHHACln9YVUsf1wFGVRj7ZBIAAafBkCtQvHddu85aJ40bYbbL2bIrdMpwpgKKouUq1bB+ps6UHCJCG/kyBnupMRVyhLj/VZbvUqN/5FWpfa2cTpBTOqdTyuBYAAqSh0RToNLs80U4L2wtAw76DqElY3/6sp6gJKrXsuL4HCJSGvAvgpfZnhf0a2wtA45GTqF6cYL8izpfwuUojf7oZgKsAIp2vQ9vXyARg2NVsTkr1u5aPtJWvmpQ5W1vBSU4bZL6l0sjvpTr7hkaIdXRmGyjgElUyARh+LRvfDBvOWrfClEvotGQTfChRS5knVVdxpNri9Dtr2Y7OqBNhDBUkDX2SBv1PR1fmqvKZAIy4lo09HAAgdmWMegwD1WT3VlNKKM7CfnWxq5rcoheZGCJLvR8CeN7ltXWQgkwARl7LxtccAUhauh4xKXdeHa+U3sQXlQoHacyr2D0EALKN6K7d4cMEIObaTeweNoyTl7P2/4I+r3/RUmZzWT62lBdwktE2malkKkAaco0C+raNAm1fKxOA2Myb+GooNwCIFckPLMaIklq9QadqyjFf2S5m1OWkByCjFbJ9+65MTABGZd7ElzYAcGnHNxj06X/0PizWNiAqP7k9+LOGANAIQNwetHWEjnwBQHS7GLcAQ6uIO4EJsjT8Ua9xhMq8yiQAmGwS4LUGFxfGBCAuMwf/GjrUJq1vHDyGLuu3w48S441budhRIbNJjjMLCQAw1gLuy8rBP4fYBgBpuLPLNmDUmUxcqKvCdPklZ7alTXUJADAAGJ2Vgy/sAMDwVRCvvIzEGteeERQAYAAwJisHn9sJQPOr4LCmFCuLr9v0ZDqrkAAAA4D7s3Kxa8gQu/2f/vFX6LLjAN4szcUBF54VFABgADD2ei4+G2w/AISggp9PomrtVswtSEeJtsFuqBwhQADAgQCQBqu/no+f5iZgxfWLjmg/u2UKADAAGHc9D/8YPNhuxxoJKK/CW7OfxsfnE/mVy4M0AQAGAA9cz8NOvgEgDUXTmLNtO85s/gR0RSUPTcePCAEABgDjb+RhRzTPPYBBWy0+cRKnjv+G+m8OgFa1/ZKxAAADgAk38vB3BwJAWFiReAb/69UV2sRkNJ5OQsOPR0GXts0GEgEABgATb+Rje3Q0P/1rK1I+/y0R2yN6oMpXqs/VeDYFdKECOpkCdHEp6JJS6IpvwdFbzgUAGAA8mJ2PT6McDwBp9CtZ2fiopAgnos1vx9TMWiIA4OhHkbkY5EwAmm376XwK9rhRuBgZbmSuAICjWx8AE4BJ2fn4xEk9ANO8vYnncBxapPcIQ/k9fhAAaAMAJmcX4OOoKCfUbLkKlaoY57NvomrLl0g5ew5FjQ0o0tajSNv0m88kjAEYY4ApNwvw0aC2BaC5gS8Pj8eAOuMQDsE5Z/hsfwgAMACYerMAHwoA8AqZSwtjjgEeulmAbQIALt1mvCpnCkAhtg0axGsdtgoTXgG2eo5DOSYA03IKsXUgewAq8mTo1D2UQ43sswoAsPeVzTmZADycU4j/4wDA5S/2oTpXhpGbVtqsg6WCAgC8u9RUIBOA6TkybBk4kHXNBIABW/chuYsX7n1+IXrPfJB1WWsZBQCseYiHz5kAPJIjw2YbACCqqGktMgb3xJCPNsDLv5Pd2gkAMFxIBQdCPKgfRIFdQJGfoC76f8PDHaiuAa2pBq2uBtQaNBw7zWoenQnAjFwZPhjAvQcwVPWGWIvioX3Q7Zm56DrK9i3mAgDkyFLcCLiNHw23cXH6xmeb2E6jOgKAVSXXscm/FzwoEdI7e0E8JQ7D1i1jq3pLvrsWAFG3UEgemwXJzKkQ9erO2XGkgK0AzMyV4/0BA1jX2TwGMCwwW3EZJEJIQqeueMW/Sf8ckRaKAd3h98AIRC6cBYmXp9U67joARJG94U4a/rFZoDr5WXVQaxlsBWBWrhzv8QQA0a+HxFMPwuO+gS3qVtJa3PDzQF1UOAKmjUPv6RPMmnLXAEBJveHx+ov6xodEwrnhO5eUIbi0DKHqanTT0ejr44OeL3yEvIIClOkaUU1rUa3T4d0ycu+ScWK+Ah7Nk+Pd/vz0AIY1TfS+B3N9AjBd2tlEBx1o1NA0akGjjiI/FBrETT8dfi1A1LMbPLe8Drf72Eeld6+tw8jLWZgAEaYOGgB/f9PT7edHxmNkjfWFFCYAs/PkeMcBADS3+jAPX8z1DUC8TwC8DOIKsaW+Qy0GiWOGwvubv4PyadoW1VoKkasQU6BErMQdU4YPgZdX67fRHY+NxwMa7gDMyVPg7f79ralzZ6B2ex7A3BigNSG9JF76HmGStz/6uXuzrq/DACB5ZDK8Ptti1XC/SjWeysrF8rFjrOY1zHBoVDweUnMHID5fgbf6OR4AQ10Dxe6I8vBBlLsU0eS3hw/I38ylDgGA53sb4P7kPKsNOj31Cp4L7YqIXj2s5mVm2B8Xj0er2gcA5ozzpkS4Vyxp+eksavr3dp5jDjh9P4DXzs2QzJzSaoP2y87HMzX1eDjG9kDO394Xj3mV3AGYm6/Am07uATjTzWMBpwLgvmQ+PN81jappaM/ylAwsj42Bp6eHXWbaCsC8fCX+1o/9hFNr8wB2GeCkwk4DgHzH9znVFETJUlqeeBGrJk/kxXRbAZhfoMSmSAEAXhrBUIjPyQMQ9YuwKPe53T/ghWVLeavXVgAeK1DiDQEA3tpBL8jzg41wXxxvUeizu77Di3/lPlfempa2ArCgQInXBQD4A0Aydwa8Pn7LosBlPx3H6nmz+avwtiTbAVDh9Uj2gdOFMUArTUf5+kB6aA9EfY1PvDQXWZ5yGavGcft+z5YUWwF4vFCFjX0FANj6udV8Hi+ugMeaFWbzRJ1Pw7f33w83NztjVNbWAeVVQFkV0NAIRPYA3CWwFYCFhSq8JgBgf/uTp548/aQXYCZdbgH+cUuN8WP019ZwT9dy8cdn38LvdDpCa+6EaW8WVCemIBPR6MUIy2NuFo25FrCosAgb+rIPnSy8Aiw0n+db6+H+tPkLxxd8/zNef4L7ZeSl+/8HzdbdCKtoCsrMNbEBYHFhEV4VAODqWtP8Pkk/g6z0MVOPU0n4NjbW7AqexVq1OmQl/A19Eu2LwM0GgCdkRXglQugB7CLAbcIY/SqfufT++QzMHH8/e/nZhchZ8gp6lNWwL2MhpwCAqWMcMhNoqfufkXIJH4wby74hswshm78GIbWm73mmkNS6Kn1AxtQ6Ncp1DSjTNqJc14ieEk/0dPPS//7czC0ezDHAk7JivBxhecKKWa8wBjDTnD6//dfsV79d1wtw/2CWJ2+ra5E/bgnCzAzyDKskjb67SomkWtsibzEBWCIrxnoBAPYPKTMnGf0TAJgpXF6Ew33Yv1szlr6CgSmtx9ndVl6A98rybVfWTICIpfJirOsj9AA2O1WycDa8trxhUn5ZRhZWx8awkluRdhV+iza2mndYwQXIG+tYyWstE7MHeEpejJcEAGz3q9cX2yCZZrqit09WiuiI3qwEX0zYhKGnLN/pO7QgBYpGfiJlMAF4Wl6CtX36sNKTZBLGAAxXSY9+B3G08a5art3/leFz0d/Cw9285551C1nJKADA85Ux5r7/L0+9glVjRrNqs8zTyYhYsdls3rdu5eGTikJWcthmYgLwjKIEa3oLPQBb/5nk8716GhRjm/aeHAVGDGS30fL7v7yG2SevmchNq1NjuuISGml+rzhiAvCsogQvCgDY3P7wk6UDjAWeQ0WV6NOT3RGvg8texsNnbpgo8FxRJn7UlNiumIWSTACeU5Tihd7sxirCGMCMU81dx36mRocune9l1XhHn3oJDybnGOW92VCD+wpTWZXnmomp7zJlKVaHCwBw9WNLfnMA/OHhCzc3N1YyTy56EWPTjL/bkyef9AB8J3Lc3DftmJHY5cpSrBIAsN3VTACkmmr8HsA+hs7/lqzFxAu5Rgq8VpqDzyrltitloSQ5ei79wfji9BXKW1gZbn4Dizkx5zduw8gDZ40+4vubCu+GGwjkfS2ACUCwshinwtnPrKUc+hXD1/3DyOZ5yiv4raacdz+Ym7TiCsCJmcsxLrtUAKDZA74ZJ0EF3DkBG5mdjx85xt49FjkF4yV3joc7agDo+c4rcF/6mFHjPS8vQQKHiaCk4XMQUycykjFNfglkcao9JN57AO+9O/QRPZrTkMyb+I7jZcy7Jy3GQsWdTR/rSrPxZaWSV3+S+AM+p/+rDzVjmF7OLsSTUezDxGX3fwS9xMbBHkYXpiK7wf7la14NtiCMdwA8N6yGe8Kd/f3heXIc5nDcmuh5YOeXGLJ1vz64AknkXP+H5fxOAEkWPAqvrZtM3PJOZi5mD2V3bVz66fOIWmF6wHVgfjJKXfSaOKbBvAPAdGyXkjKc6d6LM8xfT3kCj8uaniJHfAvw3rMdbhNNN6Z8kpmHSUPZ3Rl0eNM2TNlnPAAk+oblnuV9woqzA1kW4B0A8ZBBkP6yt6V6j7p6ZPjfCY/CUi+kpaajZv46xHr4oqCxDiMLLrAtajWfJ4lGsvxJs/m+zCrAqCHs9izsm5uAOVeLjOSotPUYnJ9iVQdXycA7AMQw7+93wW1MbIuNp9QNCA4M4GzzD39+FQ+dugZ3SoSxhb8jq6GaswxmAfHwaP1uZXMpLCkVxyaYj9djLv+h4bPwUJ1xSJvk2krMUGTYraezBDgEADKyJiPs5vThlWxMHTncJpu+W7kRsUd+xy+aW9h4y3iGkKtAMuDzvXTCYrFlv57F6hnTWIk9tWsvYrbt14eCM0z71EV43sUvjDbU1yEAUMEB8Ek82BL65dmUDLw4jsNGUEYT/Oulv6HfgTN6AMiikC3JbdI4eO/+xGJRt0I5jnh3QlhYV1biD49fhCnFpmvWm8vysaW8gJUMV8jkEACIYWSETQaEJI1Pv4odcTYeArntpezMG8h4Yj2WXTYddLXmSFFYCCTzZlo8odRc9pnTF7BmCrs4v1eOn0FAwmZ0FptGNBtTmIob7eQrILHdYQC4jR4J7/1f6P3bqaIKR7074Z4/2R8/9+W3P8Hu3Ew07DsINFi+kVs8MBKSeTP0jU918m31YXsoKxfbOFwZ/+ucBEzINB78kQou1akxWZ7uCg82ax0cBgDRwHBS6L30LMyKY7cn0Jr2Pfd+CxJkqvG3c6DLKpp+yisgCugMqkcYyFMvCmO//pAlNQ0zZ0mH0nwZqqb+Gd1FpkGc3i7Lw8c8z1dY84W9nzsUAMmch+H16bt6Haf9fgVbR7PbFWTNqAvJFzEnKQnuTy2wlrXVzwedPo/9U1qPV8QUkLj8NdyXaLphheSbJEtHRr1tYxS7DLGjsEMB0PcC+z+H2+gY/WvgkMQbAV1MI2Xaon9VZRWe27ELydMfBIktzCk1NmJRSgY2TBzPqVjZzXyUzlqFcJ3piWYy90/WANpbcjgA5Hu39/efg/LyxKoLlznH+7Pm0P8cPIyk2loc6x6MigGtnzugi0oQn5WL+d26Iaof+zMKzTokTVqKGIX5J3xNSTa+ruJ3vcKa7Xx87nAAiJLuyxbD84216FGgwMGe4fDwsC8CmCXDz6VdwpnyclRSFKpEFKokboCORoSmBj0oCpEBXRAVxf4uAMN6kl54GzFH08xW3R4Hf82GOAUAUhmJCkoGbq+lXsVCW+MC8IG8DTKyfzqOe9Z9inso88Es2uvTT1zhNABIZT6//4rQ+kZ87eePMA6jdBvajNciabHzEa3Rdbin3+kAkAp9s87ikQuXseURdlOuvLakDcLOLFiNuAzLS9Ht+elvEwBIpdKj/8Y7VbWYO5n9wosNbWd3kbOPJmDUddMJn2bB/9GUYLkDNqvarTgHAU59BRjqFfTdZ9gV1g3DbRyUcbDRpqznpj2L2HzL+xBzGmoRV3jRJtmuVKjNACBOGPb+RvxzzqMIMNhD6ArOSXpwKWKUrU/oTJCl4Y96jSuoa48OWgIAWWRv/fYFe6qwUvbhZUuwK2EF0CPEgbWwF508bjFGlLYehOovxVn4Xl3MXqjr5iwjAMgAtKn3n+kXjUXjJyDivRfazFUX3vwU0gMnENlgvL7PVGhDaQ52OeCMQlsYTgOZVKA09DxAs7+wx0GaksuU1vbsD9Gf5yN80QwH1WIq9ureg9Bs/w7Dyq3HG5guv4QL7WS7N0sHHiU9wNcAuAftY1kDl2wEgvc7hyOrTzBCVj+BsPsdx+WVf30P9e5DGFlk/T1OtnmtLLkOMvDrYOkjKkgasoYG3ncVw8gFSiv/FIZHpJ2R4Qmoo8IROGsiwh+2/yujWlWC63t+hPbAMQyrsLyXwNAXhzSlWF1yA5W6RldxEW96UKCWUF18Q0aLdDjNm1SeBJGLFgkIXd2a1g1kaERBty4QR/eBf+xg9Jw8FmIPy3cM1mlqoEzNQFHaVVQnpsLvphwRNTTIXTxsUka9BjsrZNjfMQZ7Zk3Wiqi++kt1AqUh5HCbPxvHODNPkNgdS/2CscQvGD4i03n4PKoRanfjv4u1NPwbdAig2J1GZtpDDnTsrJRjZ4Uc9bT56V9n+sCBdV1TaeT9mgHYBeApB1Zml+jeEq8WEOwS1ErhKp0W+9VF+sbP7XjvenOWv6fSyNc1AeATOh40bXxQ3lGetkNuhMQb06X36q9f7cvhssXWqjxWXYYj1bfwc3VpuznOZYcLW4rSoAYXaWTpLfeqBfqEnAWNUXwId4aMkZ5+eNDbHz3cPPVnCMlvc68JQ11qaZ0+vJxCW4eDmlIc1JTcVY3e7Asa1OEijewh8v8WAIJ8QuNpmv63MxrPUXWQbdrNQHR384RSW3+7wcnvOn3sYCEBNOgpRRrFESMAbg8GyR8nCU7qwB6g8YOqWt50YMOwByD/CfYOHqqjqPa/xNWB289e0yhKN0CpVv5hFgDyR1ebGLLXYKG8oQfoVSqNYpvhX4wv1739iStNDwsNyI8HKNC7lRrFYqY0swA07RUMPQHQHG534EdRQYojPECfVGkUD5iTbAkAdPXr6t+g1R4GKMetyDjCVkEmwwN0skQsnlpYWXiLEwAk820I9gPUOMGv7dED1CmJmHrUUuObfAuwZGKQNPgrGtSi9uiCu1jnPSqNnLRZq9G1Lb4CmI4LlAavBKitd7FD243pFLBWqZF/wEZh1gDovyL6BPWndaI3QWEWG+FCHqd74KiIptcrqhWsI2tzAqDZnABp8GRA9FcK9FSnmyhUaOoBCucoUFuVatk+ru6xCYA7IIRGU6BJrFWyiY/9ldtctRTym/MAGdX/AIr6RqWWHbfVRXYBYFhpZ9/QCDcd4mjQJMxmJA10pwASG44E/bXzinBbzesQ5Ui0zDKAKgTo6xSQrhXhXHGVPJEP6/4fAayH1yFvEgIAAAAASUVORK5CYII=
// @downloadURL  https://raw.githubusercontent.com/iamshaoning/douyin-lite-script/main/scripts-vite/抖音精简/dist/抖音精简.user.js
// @updateURL    https://raw.githubusercontent.com/iamshaoning/douyin-lite-script/main/scripts-vite/抖音精简/dist/抖音精简.meta.js
// @match        *://*.douyin.com/*
// @exclude      *://creator.douyin.com/*
// @grant        GM_addValueChangeListener
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @grant        GM_removeValueChangeListener
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";
  var setByDocument = (option) => {
    const segments = [`${option.name}=${option.value}`];
    if (option.domain != null) segments.push(`domain=${option.domain}`);
    segments.push(`path=${option.path ?? "/"}`);
    if (option.expirationDate != null) segments.push(`expires=${new Date(option.expirationDate * 1e3).toUTCString()}`);
    if (option.secure) segments.push("secure");
    document.cookie = segments.join("; ");
    return null;
  };
  var cookieManager = {
    update(option, callback) {
      return new Promise((resolve) => {
        const finish = (error) => {
          callback?.(error);
          resolve(error);
        };
        try {
          finish(setByDocument(option));
        } catch (error) {
          finish(error);
        }
      });
    },
  };
  function isNull(...args) {
    for (const obj of args) {
      let flag = false;
      if (obj === null || obj === void 0) flag = true;
      else
        switch (typeof obj) {
          case "object":
            if (typeof obj[Symbol.iterator] === "function") {
              if (obj instanceof Map) flag = obj.size === 0;
              else {
                const length = obj.length;
                if (typeof length === "number") flag = length === 0;
              }
            } else if (String(obj) === "[object Object]") flag = Object.keys(obj).length === 0;
            break;
          case "number":
            flag = isNaN(obj) || obj === 0;
            break;
          case "string": {
            const trimStr = obj.trim();
            flag = trimStr === "" || trimStr === "null" || trimStr === "undefined";
            break;
          }
          case "boolean":
            flag = !obj;
            break;
          case "function": {
            const funcStr = obj.toString().replace(/\s/g, "");
            flag = Boolean(funcStr.match(/^\(.*?\)=>\{\}$|^function.*?\(.*?\)\{\}$/));
            break;
          }
          default:
            flag = false;
        }
      if (!flag) return false;
    }
    return true;
  }
  function debounce(callback, delay = 0) {
    let timeId;
    return function (...args) {
      if (timeId != null) clearTimeout(timeId);
      timeId = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  }
  async function copy(text) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {}
    try {
      const $textarea = document.createElement("textarea");
      $textarea.value = text;
      $textarea.setAttribute("style", "position:fixed;top:-9999px;left:-9999px;opacity:0;");
      document.body.appendChild($textarea);
      $textarea.select();
      const result = document.execCommand("copy");
      $textarea.remove();
      return result;
    } catch {
      return false;
    }
  }
  function getReactInstance(element) {
    const result = {};
    if (element == null) return result;
    Object.keys(element).forEach((domPropsName) => {
      if (!domPropsName.startsWith("__react")) return;
      const propsName = domPropsName.replace(/__(.+)\$.+/i, "$1");
      if (propsName in result) return;
      Reflect.set(result, propsName, Reflect.get(element, domPropsName));
    });
    return result;
  }
  function queryProperty(target, handler) {
    const visited = new Set();
    let current = target;
    while (current != null) {
      if (visited.has(current)) return;
      visited.add(current);
      const result = handler(current);
      if (result == null) return;
      if (result.isFind) return result.data;
      current = result.data;
    }
  }
  function mutationObserver(target, option) {
    const MutationObserverApi = window.MutationObserver;
    if (MutationObserverApi == null || target == null) return;
    const config = {
      callback: option.callback,
      config: option.config,
      immediate: option.immediate ?? false,
      once: option.once ?? false,
    };
    const handler = (mutations, observer) => {
      if (config.once) observer.disconnect();
      config.callback(mutations, observer);
    };
    const observer = new MutationObserverApi(handler);
    (target instanceof NodeList || Array.isArray(target) ? Array.from(target) : [target]).forEach(($el) => {
      observer.observe($el, config.config);
    });
    if (config.immediate) handler([], observer);
    return observer;
  }
  function mutationObserverBySelector(selectors, option) {
    if (window.MutationObserver == null || document.documentElement == null) return;
    const selectorList = Array.isArray(selectors) ? selectors : [selectors];
    let targetObserver;
    const disconnectTarget = () => {
      targetObserver?.disconnect();
      targetObserver = void 0;
    };
    const observeTarget = () => {
      const $nodeList = [];
      selectorList.forEach((selector) => {
        $nodeList.push(...document.querySelectorAll(selector));
      });
      if ($nodeList.length === 0) return false;
      disconnectTarget();
      targetObserver = mutationObserver($nodeList, option);
      return true;
    };
    if (observeTarget()) return { disconnect: disconnectTarget };
    const rootObserver = mutationObserver(document.documentElement, {
      config: {
        childList: true,
        subtree: true,
      },
      callback: () => {
        if (observeTarget()) rootObserver?.disconnect();
      },
    });
    return {
      disconnect() {
        rootObserver?.disconnect();
        disconnectTarget();
      },
    };
  }
  function waitPropertyByInterval(getTarget, checkFn, intervalTimer = 250, maxTime = -1) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const inst = getTarget();
        if (inst == null || typeof inst !== "object") return;
        if (checkFn(inst)) {
          clearInterval(interval);
          resolve();
        }
      }, intervalTimer);
      if (maxTime !== -1)
        setTimeout(() => {
          clearInterval(interval);
          resolve();
        }, maxTime);
    });
  }
  var LockFunction = class {
    #flag = false;
    #delayTime;
    #context;
    #callback;
    #timeId;
    constructor(callback, ...args) {
      this.#callback = callback;
      if (args.length <= 1) {
        this.#context = null;
        this.#delayTime = args[0] ?? 0;
      } else {
        this.#context = args[0];
        this.#delayTime = args[1] ?? 0;
      }
    }
    lock() {
      this.#flag = true;
      if (this.#timeId != null) clearTimeout(this.#timeId);
    }
    unlock() {
      this.#timeId = setTimeout(() => {
        this.#flag = false;
      }, this.#delayTime);
    }
    isLock() {
      return this.#flag;
    }
    async run(...args) {
      if (this.isLock()) return;
      this.lock();
      try {
        await this.#callback.apply(this.#context, args);
      } finally {
        this.unlock();
      }
    }
  };
  var utils = {
    isNull,
    debounce,
    copy,
    getReactInstance,
    queryProperty,
    mutationObserver,
    mutationObserverBySelector,
    waitPropertyByInterval,
    LockFunction,
  };
  var CONTAINS_END_REG = /[^\s]:contains\((["'])([\s\S]*)\1\)$/;
  var REGEXP_END_REG = /[^\s]:regexp\((["'])([\s\S]*)\1\)$/;
  var EMPTY_END_REG = /[^\s]:empty$/;
  function parseSelector(selector) {
    if (typeof selector !== "string") return null;
    let css = selector.trim();
    if (css === "") return null;
    const result = { css: "" };
    let hasMatched = true;
    while (hasMatched) {
      hasMatched = false;
      const containsMatch = css.match(CONTAINS_END_REG);
      if (containsMatch) {
        result.contains = containsMatch[2];
        css = css.replace(CONTAINS_END_REG, "");
        hasMatched = true;
        continue;
      }
      const regexpMatch = css.match(REGEXP_END_REG);
      if (regexpMatch) {
        try {
          result.regexp = new RegExp(regexpMatch[2]);
        } catch {
          return null;
        }
        css = css.replace(REGEXP_END_REG, "");
        hasMatched = true;
        continue;
      }
      if (EMPTY_END_REG.test(css)) {
        result.empty = true;
        css = css.replace(EMPTY_END_REG, "");
        hasMatched = true;
      }
    }
    css = css.trim();
    if (css === "") return null;
    result.css = css;
    return result;
  }
  function checkSelectorFilter($el, parsed) {
    if (parsed.empty && $el.innerHTML.trim() !== "") return false;
    if (parsed.contains == null && parsed.regexp == null) return true;
    const domText = $el.textContent ?? $el.innerText;
    if (typeof domText !== "string") return false;
    if (parsed.contains != null && !domText.includes(parsed.contains)) return false;
    if (parsed.regexp != null && !parsed.regexp.test(domText)) return false;
    return true;
  }
  function selector(selector, parent) {
    return selectorAll(selector, parent)[0];
  }
  function selectorAll(selector, parent) {
    const parsed = parseSelector(selector);
    if (parsed == null) return [];
    const $parent = parent ?? document;
    let $list;
    try {
      $list = Array.from($parent.querySelectorAll(parsed.css));
    } catch {
      return [];
    }
    if (parsed.contains == null && parsed.regexp == null && !parsed.empty) return $list;
    return $list.filter(($el) => checkSelectorFilter($el, parsed));
  }
  var $ = selector;
  var $$ = selectorAll;
  function matches($el, selector) {
    if ($el == null || !($el instanceof Element)) return false;
    const parsed = parseSelector(selector);
    if (parsed == null) return false;
    if (!$el.matches(parsed.css)) return false;
    return checkSelectorFilter($el, parsed);
  }
  function closest($el, selector) {
    if ($el == null || !($el instanceof Element)) return null;
    const parsed = parseSelector(selector);
    if (parsed == null) return null;
    const $closest = $el.closest(parsed.css);
    if ($closest == null) return null;
    return checkSelectorFilter($closest, parsed) ? $closest : null;
  }
  function createElement(tagName, property, attributes) {
    const $el = document.createElement(tagName);
    if (typeof property === "string") {
      html($el, property);
      return $el;
    }
    Object.keys(property ?? {}).forEach((key) => {
      const value = property[key];
      if (key === "innerHTML") {
        html($el, value);
        return;
      }
      Reflect.set($el, key, value);
    });
    Object.keys(attributes ?? {}).forEach((key) => {
      let value = attributes[key];
      if (typeof value === "object") value = JSON.stringify(value);
      else if (typeof value === "function") value = value.toString();
      $el.setAttribute(key, value);
    });
    return $el;
  }
  function text($el, content) {
    if ($el == null) return "";
    if (arguments.length === 1) return $el.textContent ?? "";
    $el.textContent = String(content);
  }
  function html($el, content) {
    if ($el == null) return "";
    if (arguments.length === 1) return $el.innerHTML;
    if (content instanceof Element) {
      $el.innerHTML = "";
      $el.appendChild(content);
    } else $el.innerHTML = String(content);
  }
  function remove($el) {
    $el?.remove();
  }
  function prev($el) {
    return $el?.previousElementSibling ?? void 0;
  }
  var SCRIPT_NODE_ATTR = "data-dy-lite";
  function isScriptNode($el) {
    return $el?.closest(`[${SCRIPT_NODE_ATTR}]`) != null;
  }
  var styleCache = new Map();
  var styleRefCount = new Map();
  function addStyle(cssText) {
    if (typeof cssText !== "string") throw new Error("addStyle 参数 cssText 必须为 string 类型");
    const $cached = styleCache.get(cssText);
    if ($cached != null) {
      if ($cached.isConnected) {
        styleRefCount.set($cached, (styleRefCount.get($cached) ?? 1) + 1);
        return $cached;
      }
      styleRefCount.delete($cached);
    }
    const $style = createElement("style", {
      type: "text/css",
      innerHTML: cssText,
    });
    const $document = document;
    if ($document.head) $document.head.appendChild($style);
    else if ($document.documentElement.childNodes.length === 0) $document.documentElement.appendChild($style);
    else $document.documentElement.insertBefore($style, $document.documentElement.childNodes[0]);
    styleCache.set(cssText, $style);
    styleRefCount.set($style, 1);
    return $style;
  }
  function removeStyle($el) {
    if ($el == null) return;
    const styleEl = $el;
    const count = styleRefCount.get(styleEl);
    if (count == null) {
      $el.remove();
      return;
    }
    if (count > 1) {
      styleRefCount.set(styleEl, count - 1);
      return;
    }
    styleRefCount.delete(styleEl);
    $el.remove();
  }
  function addBlockCSS(...args) {
    const selectorList = [];
    args.forEach((item) => {
      if (Array.isArray(item)) selectorList.push(...item);
      else selectorList.push(item);
    });
    const validList = selectorList.map((item) => item.trim()).filter((item) => item !== "");
    if (validList.length === 0) return;
    return addStyle(`${validList.join(",\n")}{display: none !important;}`);
  }
  function queryWaitNodeTarget(target) {
    try {
      if (typeof target === "function") return target() ?? null;
      if (Array.isArray(target)) {
        for (const item of target) {
          const $el = selector(item);
          if ($el != null) return $el;
        }
        return null;
      }
      return selector(target) ?? null;
    } catch {
      return null;
    }
  }
  function waitNode(target, timeout = -1) {
    const $immediate = queryWaitNodeTarget(target);
    if ($immediate != null) return Promise.resolve($immediate);
    return new Promise((resolve) => {
      let observer;
      let timeId;
      const finish = ($el) => {
        observer?.disconnect();
        if (timeId != null) clearTimeout(timeId);
        resolve($el);
      };
      observer = mutationObserver(document.documentElement, {
        config: {
          childList: true,
          subtree: true,
        },
        callback: () => {
          const $el = queryWaitNodeTarget(target);
          if ($el != null) finish($el);
        },
      });
      if (timeout !== -1)
        timeId = setTimeout(() => {
          finish(null);
        }, timeout);
    });
  }
  function onReady(callback) {
    if (document.readyState !== "loading") {
      if (typeof callback === "function") {
        callback();
        return;
      }
      return Promise.resolve();
    }
    if (typeof callback === "function") {
      document.addEventListener("DOMContentLoaded", () => callback(), { once: true });
      return;
    }
    return new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
    });
  }
  function normalizeEventTarget(target) {
    if (target == null) return [];
    if (typeof target === "string") return selectorAll(target);
    if (target instanceof NodeList || Array.isArray(target)) return Array.from(target);
    return [target];
  }
  function on(target, eventType, selector, callback, option) {
    const $elList = normalizeEventTarget(target);
    const eventTypeList = (Array.isArray(eventType) ? eventType : eventType.split(" "))
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter((item) => item !== "");
    let selectorList = [];
    let listenerCallBack;
    const listenerOption = {
      capture: false,
      once: false,
      passive: false,
      isComposedPath: false,
      overrideTarget: true,
      isPreventEvent: false,
    };
    if (typeof selector === "function" || selector == null) {
      listenerCallBack = selector ?? callback;
      Object.assign(listenerOption, typeof callback === "object" ? callback : void 0);
    } else {
      selectorList = (Array.isArray(selector) ? selector : [selector]).filter(
        (item) => typeof item === "string" && item !== ""
      );
      listenerCallBack = callback;
      Object.assign(listenerOption, option);
    }
    const boundList = [];
    $elList.forEach(($elItem) => {
      const targetIsWindow = isWinNode($elItem);
      eventTypeList.forEach((eventName) => {
        const handler = function (event) {
          if (listenerOption.isPreventEvent) preventEvent(event);
          let callThis;
          let execCallback = false;
          let matchedSelector;
          if (selectorList.length) {
            const $originTarget =
              (typeof event.composedPath === "function" ? event.composedPath() : [])[0] ?? event.target ?? void 0;
            let $target = (listenerOption.isComposedPath ? $originTarget : event.target) ?? void 0;
            if ($target != null) {
              const $parent = targetIsWindow ? document.documentElement : $elItem;
              if (
                selectorList.find((selectors) => {
                  if (matches($target, selectors)) return true;
                  const $closest = closest($target, selectors);
                  if ($closest != null && $parent?.contains?.($closest)) {
                    $target = $closest;
                    return true;
                  }
                  return false;
                })
              ) {
                if (listenerOption.overrideTarget)
                  try {
                    const originTarget = event.target;
                    Object.defineProperties(event, {
                      target: {
                        get() {
                          return $target;
                        },
                      },
                      originTarget: {
                        get() {
                          return originTarget;
                        },
                      },
                    });
                  } catch {}
                execCallback = true;
                callThis = $target;
                matchedSelector = $target;
              }
            }
          } else {
            execCallback = true;
            callThis = $elItem;
          }
          if (execCallback) {
            const result = listenerCallBack.call(callThis, event, matchedSelector);
            if (listenerOption.once) off();
            if (typeof result === "boolean" && !result) return false;
          }
        };
        $elItem.addEventListener(eventName, handler, listenerOption);
        boundList.push({
          $el: $elItem,
          eventName,
          handler,
        });
      });
    });
    function off() {
      boundList.forEach((item) => {
        item.$el.removeEventListener(item.eventName, item.handler, listenerOption);
      });
      boundList.length = 0;
    }
    return { off };
  }
  function isWinNode(target) {
    if (typeof target !== "object" || target == null) return false;
    return target === window || target === self || target === globalThis;
  }
  function preventEvent(event, onlyStopPropagation = false) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (onlyStopPropagation) return;
    event.preventDefault();
    return false;
  }
  var DOMUtils = {
    selector,
    createElement,
    text,
    html,
    remove,
    prev,
    waitNode,
    onReady,
    on,
    preventEvent,
  };
  var _GM_addValueChangeListener = (() =>
    typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
  var _GM_getValue = (() => (typeof GM_getValue != "undefined" ? GM_getValue : void 0))();
  var _GM_info = (() => (typeof GM_info != "undefined" ? GM_info : void 0))();
  var _GM_registerMenuCommand = (() =>
    typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_removeValueChangeListener = (() =>
    typeof GM_removeValueChangeListener != "undefined" ? GM_removeValueChangeListener : void 0)();
  var _GM_setValue = (() => (typeof GM_setValue != "undefined" ? GM_setValue : void 0))();
  var _unsafeWindow = (() => (typeof unsafeWindow != "undefined" ? unsafeWindow : void 0))();
  var SCRIPT_NAME = "抖音精简";
  var STYLE_MAP = {
    log: "background:#3a3a44;color:#e8e8ea;",
    info: "background:#2b6cb0;color:#ffffff;",
    success: "background:#0eac0e;color:#ffffff;",
    warn: "background:#d69e2e;color:#ffffff;",
    error: "background:#e53e3e;color:#ffffff;",
  };
  var PREFIX_STYLE = "padding:1px 6px;border-radius:3px;font-weight:600;margin-right:4px;";
  function output(style, method, args) {
    const prefixArg = `%c${SCRIPT_NAME}`;
    const styleArg = `${style}${PREFIX_STYLE}`;
    if (method === "warn") console.warn(prefixArg, styleArg, ...args);
    else if (method === "error") console.error(prefixArg, styleArg, ...args);
    else console.log(prefixArg, styleArg, ...args);
  }
  var log = {
    log: (...args) => output(STYLE_MAP.log, "log", args),
    info: (...args) => output(STYLE_MAP.info, "log", args),
    success: (...args) => output(STYLE_MAP.success, "log", args),
    warn: (...args) => output(STYLE_MAP.warn, "warn", args),
    error: (...args) => output(STYLE_MAP.error, "error", args),
  };
  var CONTAINER_ID = "dy-lite-toast-container";
  var TYPE_COLOR_MAP = {
    info: "#2b6cb0",
    success: "#0eac0e",
    warning: "#d69e2e",
    error: "#e53e3e",
  };
  var TOAST_CSS = `
#${CONTAINER_ID} {
  position: fixed;
  top: 88px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483647;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}
#${CONTAINER_ID} .dy-lite-toast {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  max-width: 80vw;
  padding: 10px 12px 10px 0;
  border-radius: 4px;
  background: #1f1f26;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.28);
  color: #f2f2f4;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  word-break: break-all;
  animation: dy-lite-toast-in 0.18s ease-out;
}
#${CONTAINER_ID} .dy-lite-toast::before {
  content: "";
  flex: none;
  width: 4px;
  align-self: stretch;
  margin-right: 8px;
  border-radius: 4px 0 0 4px;
}
#${CONTAINER_ID} .dy-lite-toast[data-type="info"]::before {
  background: ${TYPE_COLOR_MAP.info};
}
#${CONTAINER_ID} .dy-lite-toast[data-type="success"]::before {
  background: ${TYPE_COLOR_MAP.success};
}
#${CONTAINER_ID} .dy-lite-toast[data-type="warning"]::before {
  background: ${TYPE_COLOR_MAP.warning};
}
#${CONTAINER_ID} .dy-lite-toast[data-type="error"]::before {
  background: ${TYPE_COLOR_MAP.error};
}
@keyframes dy-lite-toast-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
#${CONTAINER_ID} .dy-lite-toast--leave {
  animation: dy-lite-toast-out 0.2s ease-in forwards;
}
@keyframes dy-lite-toast-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}
`;
  var isStyleAdded = false;
  function getContainer() {
    if (!isStyleAdded) {
      isStyleAdded = true;
      addStyle(TOAST_CSS);
    }
    let $container = document.querySelector(`#${CONTAINER_ID}`);
    if ($container == null) {
      $container = document.createElement("div");
      $container.id = CONTAINER_ID;
      $container.setAttribute(SCRIPT_NODE_ATTR, "");
      (document.body ?? document.documentElement).appendChild($container);
    }
    return $container;
  }
  function show(type, message, duration = 2200) {
    const $container = getContainer();
    const $toast = document.createElement("div");
    $toast.className = "dy-lite-toast";
    $toast.setAttribute("data-type", type);
    $toast.textContent = message;
    $container.appendChild($toast);
    setTimeout(() => {
      $toast.classList.add("dy-lite-toast--leave");
      let removed = false;
      const remove = () => {
        if (removed) return;
        removed = true;
        $toast.remove();
      };
      $toast.addEventListener("animationend", remove, { once: true });
      setTimeout(remove, 400);
    }, duration);
  }
  var toast = {
    info: (message, duration) => show("info", message, duration),
    success: (message, duration) => show("success", message, duration),
    warning: (message, duration) => show("warning", message, duration),
    error: (message, duration) => show("error", message, duration),
  };
  function parseURL(href) {
    return new URL(href ?? globalThis.location.href, globalThis.location.href);
  }
  function getPathname(href) {
    return parseURL(href).pathname;
  }
  var DouYinRouter = {
    isIndex(href) {
      const hostname = parseURL(href).hostname;
      return hostname === "www.douyin.com" || hostname === "douyin.com";
    },
    isLive(href) {
      return parseURL(href).hostname === "live.douyin.com" || this.isFollowLive(href) || this.isRootLive(href);
    },
    isFollowLive(href) {
      return this.isIndex(href) && getPathname(href).startsWith("/follow/live/");
    },
    isRootLive(href) {
      return this.isIndex(href) && getPathname(href).startsWith("/root/live/");
    },
    isSearch(href) {
      return (
        this.isIndex(href) &&
        (this.isRootSearch(href) || getPathname(href).startsWith("/search/") || this.isUserSearch(href))
      );
    },
    isRootSearch(href) {
      return this.isIndex(href) && getPathname(href).startsWith("/root/search/");
    },
    isChannel(href) {
      return this.isIndex(href) && getPathname(href).startsWith("/channel/");
    },
    isUser(href) {
      return this.isIndex(href) && getPathname(href).startsWith("/user/");
    },
    isUserSearch(href) {
      return this.isUser(href) && getPathname(href).includes("/search/");
    },
    isVideo(href) {
      return this.isIndex(href) && getPathname(href).startsWith("/video/");
    },
    isJingxuan(href) {
      return this.isIndex(href) && getPathname(href).startsWith("/jingxuan");
    },
    isNote(href) {
      return this.isIndex(href) && getPathname(href).startsWith("/note/");
    },
  };
  var GMStorage = class {
    storageKey;
    #cacheData = null;
    #listeners = new Map();
    #cancelCallbackList = [];
    #listenerIdSeed = 0;
    constructor(key) {
      const trimKey = String(key).trim();
      if (trimKey === "") throw new Error("storage key can not be empty string");
      this.storageKey = trimKey;
    }
    #getLocalValue() {
      if (this.#cacheData != null) return this.#cacheData;
      let localValue = _GM_getValue(this.storageKey, null);
      if (localValue == null || typeof localValue !== "object") {
        localValue = {};
        _GM_setValue(this.storageKey, localValue);
      }
      this.#cancelListener();
      this.#cacheData = localValue;
      const listenerId = _GM_addValueChangeListener(this.storageKey, (_name, _oldValue, newValue) => {
        this.#cacheData = newValue ?? {};
      });
      this.#cancelCallbackList.push(() => {
        _GM_removeValueChangeListener(listenerId);
      });
      return this.#cacheData;
    }
    #setLocalValue(value) {
      this.#cacheData = value;
      _GM_setValue(this.storageKey, value);
    }
    #cancelListener() {
      this.#cacheData = null;
      for (let index = this.#cancelCallbackList.length - 1; index >= 0; index--) {
        this.#cancelCallbackList[index]();
        this.#cancelCallbackList.splice(index, 1);
      }
    }
    set(key, value) {
      const oldValue = this.get(key);
      const localValue = this.#getLocalValue();
      Reflect.set(localValue, key, value);
      this.#setLocalValue(localValue);
      this.#emitValueChangeListenerAsync(key, value, oldValue);
    }
    get(key, defaultValue) {
      const localValue = this.#getLocalValue();
      return Reflect.get(localValue, key) ?? defaultValue;
    }
    addValueChangeListener(key, callback) {
      const listenerId = ++this.#listenerIdSeed;
      const listenerList = this.#listeners.get(key) ?? [];
      listenerList.push({
        id: listenerId,
        key,
        callback,
      });
      this.#listeners.set(key, listenerList);
      return listenerId;
    }
    removeValueChangeListener(listenerId) {
      let flag = false;
      for (const [key, listenerList] of this.#listeners) {
        for (let index = listenerList.length - 1; index >= 0; index--) {
          const item = listenerList[index];
          if (
            (typeof listenerId === "string" && item.key === listenerId) ||
            (typeof listenerId === "number" && item.id === listenerId)
          ) {
            listenerList.splice(index, 1);
            flag = true;
          }
        }
        this.#listeners.set(key, listenerList);
      }
      return flag;
    }
    emitValueChangeListener(key, newValue, oldValue) {
      const listenerList = this.#listeners.get(key);
      if (listenerList == null) return;
      for (const item of [...listenerList]) item.callback(key, newValue, oldValue);
    }
    #emitValueChangeListenerAsync(key, newValue, oldValue) {
      if (this.#listeners.get(key) == null) return;
      setTimeout(() => {
        this.emitValueChangeListener(key, newValue, oldValue);
      }, 0);
    }
  };
  var defaultValueMap = new Map();
  var disabledKeyList = [];
  function setDefaultValue(key, defaultValue) {
    defaultValueMap.set(key, defaultValue);
  }
  function getDefaultValue(key) {
    return defaultValueMap.get(key);
  }
  function hasDefaultValue(key) {
    return defaultValueMap.has(key);
  }
  function addDisabledKey(key) {
    if (!disabledKeyList.includes(key)) disabledKeyList.push(key);
  }
  function isDisabledKey(key) {
    return disabledKeyList.includes(key);
  }
  var panelStorage = new GMStorage("douyin-lite-setting");
  function getValue(key, defaultValue) {
    const localValue = panelStorage.get(key, null);
    if (localValue == null) {
      if (hasDefaultValue(key)) return getDefaultValue(key);
      return defaultValue;
    }
    return localValue;
  }
  function setValue(key, value) {
    panelStorage.set(key, value);
  }
  function addValueChangeListener(key, callback, option) {
    const listenerId = panelStorage.addValueChangeListener(key, callback);
    if (option?.immediate || option?.immediateAll) {
      const value = getValue(key);
      if (option.immediate) callback(key, value, value);
      else panelStorage.emitValueChangeListener(key, value, value);
    }
    return listenerId;
  }
  function removeValueChangeListener(listenerId) {
    panelStorage.removeValueChangeListener(listenerId);
  }
  function getDynamicValue(key, defaultValue) {
    let isInit = false;
    let __value = defaultValue;
    const listenerId = addValueChangeListener(key, (_key, newValue) => {
      __value = newValue;
    });
    return {
      get value() {
        if (!isInit) {
          isInit = true;
          __value = getValue(key, defaultValue);
        }
        return __value;
      },
      destroy() {
        removeValueChangeListener(listenerId);
      },
    };
  }
  var DouYinUrlHandler = {
    getSearchUrl(searchText) {
      return "https://www.douyin.com/search/" + encodeURIComponent(searchText);
    },
    redirectHomeToRecommend() {
      if (!getValue("dy-common-recommend-home")) return;
      const url = new URL(globalThis.location.href);
      if ((url.hostname !== "www.douyin.com" && url.hostname !== "douyin.com") || url.pathname !== "/") return;
      if (url.searchParams.has("from_nav")) return;
      url.searchParams.set("recommend", "1");
      url.searchParams.set("from_nav", "1");
      log.success(`首页重定向到推荐页: ` + url.href);
      globalThis.location.replace(url.href);
    },
  };
  var PANEL_CSS = `
.dyl-panel-mask {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
}
.dyl-panel {
  display: flex;
  flex-direction: column;
  width: 880px;
  height: 620px;
  max-width: 92vw;
  max-height: 88vh;
  overflow: hidden;
  color: #e8e8ea;
  background: #1f1f26;
  border: 1px solid #2f2f3a;
  border-radius: 12px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
}
.dyl-panel-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid #2f2f3a;
}
.dyl-panel-header-title {
  font-size: 16px;
  font-weight: 600;
  color: #e8e8ea;
}
.dyl-panel-header-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 16px;
  line-height: 1;
  color: #8a8a99;
  cursor: pointer;
  border-radius: 6px;
  user-select: none;
}
.dyl-panel-header-close:hover {
  color: #ffffff;
  background: #2a2a34;
}
.dyl-panel-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.dyl-panel-menu {
  flex-shrink: 0;
  width: 168px;
  padding: 8px;
  overflow-y: auto;
  border-right: 1px solid #2f2f3a;
}
.dyl-panel-menu-item {
  display: flex;
  align-items: center;
  height: 36px;
  margin-bottom: 4px;
  padding: 0 12px;
  font-size: 14px;
  color: #b5b5c0;
  cursor: pointer;
  border-radius: 8px;
  user-select: none;
}
.dyl-panel-menu-item:hover {
  color: #e8e8ea;
  background: #2a2a34;
}
.dyl-panel-menu-item--active {
  font-weight: 600;
  color: #fe2c55;
  background: rgba(254, 44, 85, 0.15);
}
.dyl-panel-content {
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
}
.dyl-panel-container {
  margin-bottom: 12px;
  padding: 4px 12px;
  background: #26262f;
  border-radius: 10px;
}
.dyl-panel-container-title {
  padding: 8px 0;
  font-size: 13px;
  color: #8a8a99;
}
.dyl-panel-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.dyl-panel-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 48px;
  padding: 10px 0;
  border-bottom: 1px solid #2f2f3a;
}
.dyl-panel-item:last-child {
  border-bottom: none;
}
.dyl-panel-item-text {
  flex: 1;
  min-width: 0;
}
.dyl-panel-item-text-main {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: #e8e8ea;
  word-break: break-all;
}
.dyl-panel-item-text-desc {
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 18px;
  color: #8a8a99;
  word-break: break-all;
}
.dyl-panel-item-text-desc code {
  padding: 0 4px;
  color: #fe2c55;
  background: #3a3a44;
  border-radius: 4px;
}
.dyl-switch {
  position: relative;
  flex-shrink: 0;
  width: 40px;
  height: 22px;
  cursor: pointer;
  background: #4a4a55;
  border-radius: 11px;
  transition: background 0.2s;
}
.dyl-switch::after {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  content: "";
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s;
}
.dyl-switch--on {
  background: #fe2c55;
}
.dyl-switch--on::after {
  transform: translateX(18px);
}
.dyl-switch--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.dyl-panel-select {
  flex-shrink: 0;
  min-width: 110px;
  height: 32px;
  padding: 0 8px;
  font-size: 13px;
  color: #e8e8ea;
  cursor: pointer;
  background: #2a2a34;
  border: 1px solid #3a3a44;
  border-radius: 6px;
  outline: none;
}
.dyl-panel-select:focus {
  border-color: #fe2c55;
}
.dyl-panel-input {
  flex-shrink: 0;
  width: 90px;
  height: 32px;
  padding: 0 8px;
  font-size: 13px;
  color: #e8e8ea;
  background: #2a2a34;
  border: 1px solid #3a3a44;
  border-radius: 6px;
  outline: none;
}
.dyl-panel-input:focus {
  border-color: #fe2c55;
}
.dyl-panel-button {
  flex-shrink: 0;
  height: 32px;
  padding: 0 14px;
  font-size: 13px;
  color: #ffffff;
  cursor: pointer;
  background: #fe2c55;
  border: none;
  border-radius: 6px;
  outline: none;
}
.dyl-panel-button:hover {
  background: #ff4d6d;
}
.dyl-panel-button:active {
  background: #e02149;
}
.dyl-panel-textarea {
  width: 100%;
}
.dyl-panel-textarea textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  font-family: Consolas, Monaco, monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #e8e8ea;
  resize: vertical;
  background: #2a2a34;
  border: 1px solid #3a3a44;
  border-radius: 8px;
  outline: none;
}
.dyl-panel-textarea textarea:focus {
  border-color: #fe2c55;
}
.dyl-panel-deep-menu {
  cursor: pointer;
}
.dyl-panel-deep-menu-arrow {
  flex-shrink: 0;
  font-size: 14px;
  color: #8a8a99;
}
.dyl-panel-deep-menu:hover .dyl-panel-deep-menu-arrow {
  color: #fe2c55;
}
.dyl-panel-back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
  font-size: 13px;
  color: #8a8a99;
  cursor: pointer;
  user-select: none;
}
.dyl-panel-back:hover {
  color: #fe2c55;
}
.dyl-panel-footer {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
  padding: 0 16px;
  font-size: 12px;
  color: #5f5f6b;
  border-top: 1px solid #2f2f3a;
}
.dyl-panel-content::-webkit-scrollbar,
.dyl-panel-menu::-webkit-scrollbar {
  width: 6px;
}
.dyl-panel-content::-webkit-scrollbar-thumb,
.dyl-panel-menu::-webkit-scrollbar-thumb {
  background: #3a3a44;
  border-radius: 3px;
}
`;
  var PanelMenuResultsHandler = class {
    #storeNodeList = [];
    #destroyFnList = [];
    #option;
    constructor(option) {
      this.#option = option;
    }
    handlerResult(enableValue, args) {
      const dynamicStoreNodeList = [];
      const dynamicDestroyFnList = [];
      const flatResult = (target, result) => {
        if (Array.isArray(target)) {
          for (const item of target) flatResult(item, result);
          return;
        }
        if (typeof target === "object" && target != null) {
          if (target instanceof Element) {
            result.push(target);
            return;
          }
          const { $css, destroy } = target;
          if ($css != null) {
            if (Array.isArray($css)) {
              for (const item of $css) if (item instanceof Element) result.push(item);
            } else if ($css instanceof Element) result.push($css);
          }
          if (typeof destroy === "function") result.push(destroy);
          return;
        }
        if (typeof target === "function" || target != null) result.push(target);
      };
      const resultValueList = [];
      flatResult(args, resultValueList);
      for (const item of resultValueList) {
        if (item == null) continue;
        if (item instanceof Element) dynamicStoreNodeList.push(item);
        else if (typeof item === "function") dynamicDestroyFnList.push(item);
      }
      this.clearStoreNodeList();
      this.execDestroyFnAndClear();
      if (enableValue) {
        this.#storeNodeList = this.#storeNodeList.concat(dynamicStoreNodeList);
        this.#destroyFnList = this.#destroyFnList.concat(dynamicDestroyFnList);
      }
    }
    getEnableStatus(key) {
      return Boolean(this.#option.getValue(key));
    }
    getStoredResourceCount() {
      return this.#storeNodeList.length + this.#destroyFnList.length;
    }
    checkMenuExec() {
      if (typeof this.#option.checkExec === "function") return this.#option.checkExec(this.#option.keyList);
      return this.#option.keyList.every((key) => this.getEnableStatus(key));
    }
    clearStoreNodeList = () => {
      for (let index = this.#storeNodeList.length - 1; index >= 0; index--) {
        removeStyle(this.#storeNodeList[index]);
        this.#storeNodeList.splice(index, 1);
      }
    };
    execDestroyFnAndClear = () => {
      for (let index = this.#destroyFnList.length - 1; index >= 0; index--) {
        this.#destroyFnList[index]();
        this.#destroyFnList.splice(index, 1);
      }
    };
  };
  var PanelClass = class {
    $data = {
      scriptName: SCRIPT_NAME,
      contentConfigList: [],
      onceExecMenuData: new Map(),
      urlChangeReloadMenuExecOnce: new Map(),
    };
    #session = null;
    #navStack = [];
    addContentConfig(config) {
      const configList = Array.isArray(config) ? config : [config];
      this.$data.contentConfigList.push(...configList);
    }
    init() {
      this.#registerMenuCommand();
    }
    getValue(key, defaultValue) {
      return getValue(key, defaultValue);
    }
    setValue(key, value) {
      setValue(key, value);
    }
    addValueChangeListener(key, callback, option) {
      return addValueChangeListener(key, callback, option);
    }
    removeValueChangeListener(listenerId) {
      removeValueChangeListener(listenerId);
    }
    transformKey(key) {
      if (Array.isArray(key)) {
        if (key.length > 1) return JSON.stringify(key.sort());
        if (key.length === 1) return key[0];
      }
      return key;
    }
    async exec(queryKey, callback, checkExec, once = true) {
      const queryKeyResult = typeof queryKey === "function" ? queryKey() : queryKey;
      const isArrayKey = Array.isArray(queryKeyResult);
      const keyList = isArrayKey ? [...queryKeyResult] : [queryKeyResult];
      const notExistKey = keyList.find((key) => !hasDefaultValue(key));
      if (notExistKey != null) {
        log.warn(`${notExistKey} 键不存在`);
        return;
      }
      const storageKey = JSON.stringify(keyList);
      if (once) {
        const storedResult = this.$data.onceExecMenuData.get(storageKey);
        if (storedResult) return storedResult;
      }
      const listenerIdList = [];
      const handler = new PanelMenuResultsHandler({
        keyList,
        getValue: (key) => Boolean(this.getValue(key)),
        checkExec:
          typeof checkExec === "function"
            ? checkExec
            : (keyList) => keyList.every((key) => Boolean(this.getValue(key))),
      });
      const valueChangeCallback = async (valueOption) => {
        const execFlag = handler.checkMenuExec();
        let callbackResult;
        if (execFlag) {
          const valueList = keyList.map((key) => this.getValue(key));
          callbackResult = await callback({
            key: keyList,
            triggerKey: valueOption?.key,
            value: isArrayKey ? valueList : valueList[0],
          });
        }
        handler.handlerResult(execFlag, callbackResult);
      };
      if (once)
        keyList.forEach((key) => {
          listenerIdList.push(
            this.addValueChangeListener(key, (key, newValue, oldValue) =>
              valueChangeCallback({
                key,
                newValue,
                oldValue,
              })
            )
          );
        });
      await valueChangeCallback();
      const result = {
        keyList,
        checkMenuExec: () => handler.checkMenuExec(),
        getResourceCount: () => handler.getStoredResourceCount(),
        reload: () => {
          handler.clearStoreNodeList();
          handler.execDestroyFnAndClear();
          valueChangeCallback();
        },
        clear: () => {
          handler.clearStoreNodeList();
          handler.execDestroyFnAndClear();
          result.removeValueChangeListener();
          result.clearOnceExecMenuData();
        },
        clearStoreNodeList: () => handler.clearStoreNodeList(),
        execDestroyFnAndClear: () => handler.execDestroyFnAndClear(),
        removeValueChangeListener: () => {
          listenerIdList.forEach((listenerId) => this.removeValueChangeListener(listenerId));
          listenerIdList.length = 0;
        },
        clearOnceExecMenuData: () => {
          if (once) this.$data.onceExecMenuData.delete(storageKey);
        },
      };
      this.$data.onceExecMenuData.set(storageKey, result);
      return result;
    }
    async execMenu(key, callback, isReverse = false, once = false) {
      return await this.exec(
        key,
        callback,
        (keyList) =>
          keyList.every((__key__) => {
            let flag = Boolean(this.getValue(__key__));
            if (isDisabledKey(__key__)) {
              flag = false;
              log.warn(`execMenu${once ? "Once" : ""} ${__key__} 被禁用`);
            }
            return isReverse ? !flag : flag;
          }),
        once
      );
    }
    async execMenuOnce(key, callback, isReverse = false, listenUrlChange = false) {
      const result = await this.execMenu(key, callback, isReverse, true);
      if (listenUrlChange && result) {
        const urlChangeCallback = () => {
          result.reload();
        };
        this.removeUrlChangeWithExecMenuOnceListener(key);
        this.addUrlChangeWithExecMenuOnceListener(key, urlChangeCallback);
      }
      return result;
    }
    addUrlChangeWithExecMenuOnceListener(key, callback) {
      const transformKey = this.transformKey(key);
      if (typeof transformKey !== "string") return { off: () => {} };
      this.$data.urlChangeReloadMenuExecOnce.set(transformKey, callback);
      return {
        off: () => {
          this.removeUrlChangeWithExecMenuOnceListener(transformKey);
        },
      };
    }
    removeUrlChangeWithExecMenuOnceListener(key) {
      const transformKey = this.transformKey(key);
      if (typeof transformKey === "string") this.$data.urlChangeReloadMenuExecOnce.delete(transformKey);
    }
    hasUrlChangeWithExecMenuOnceListener(key) {
      const transformKey = this.transformKey(key);
      return typeof transformKey === "string" && this.$data.urlChangeReloadMenuExecOnce.has(transformKey);
    }
    async emitUrlChangeWithExecMenuOnceEvent(config) {
      for (const callback of [...this.$data.urlChangeReloadMenuExecOnce.values()]) await callback();
    }
    getMenuExecStateList() {
      return Array.from(this.$data.onceExecMenuData.values()).map((result) => ({
        keyList: [...result.keyList],
        enable: result.checkMenuExec(),
        resourceCount: result.getResourceCount(),
        reload: () => result.reload(),
      }));
    }
    #registerMenuCommand() {
      const menuCommandCallback = () => {
        this.showPanel(this.$data.contentConfigList);
      };
      _GM_registerMenuCommand(`${SCRIPT_NAME}-设置`, menuCommandCallback);
    }
    showPanel(content, title = `${SCRIPT_NAME}-设置`) {
      this.closePanel();
      const $mask = createElement("div", { className: "dyl-panel-mask" });
      $mask.setAttribute(SCRIPT_NODE_ATTR, "");
      const $panel = createElement("div", { className: "dyl-panel" });
      const $header = createElement("div", { className: "dyl-panel-header" });
      const $headerTitle = createElement("div", { className: "dyl-panel-header-title" });
      $headerTitle.textContent = title;
      const $close = createElement("div", { className: "dyl-panel-header-close" });
      $close.textContent = "✕";
      $close.addEventListener("click", () => this.closePanel());
      $header.append($headerTitle, $close);
      const $body = createElement("div", { className: "dyl-panel-body" });
      const $menu = createElement("div", { className: "dyl-panel-menu" });
      const $content = createElement("div", { className: "dyl-panel-content" });
      $body.append($menu, $content);
      const $footer = createElement("div", { className: "dyl-panel-footer" });
      $footer.textContent = `v${_GM_info.script.version}`;
      $panel.append($header, $body, $footer);
      $mask.append($panel);
      const $panelStyle = addStyle(PANEL_CSS);
      const session = {
        $mask,
        listenerIdList: [],
        isOpened: true,
      };
      this.#session = session;
      $mask.addEventListener("click", (event) => {
        if (event.target === $mask) this.closePanel();
      });
      const keydownCallback = (event) => {
        if (event.key === "Escape") this.closePanel();
      };
      window.addEventListener("keydown", keydownCallback);
      const contentList = content.filter((it) => it.views && it.views.length > 0);
      let activeIndex = 0;
      const renderContent = () => {
        $content.textContent = "";
        const navItem = this.#navStack.at(-1);
        if (navItem) {
          const $back = createElement("div", { className: "dyl-panel-back" });
          $back.textContent = "‹ 返回";
          $back.addEventListener("click", () => {
            this.#navStack.pop();
            renderContent();
          });
          $content.append($back);
        }
        const viewList = navItem ? navItem.views : (contentList[activeIndex]?.views ?? []);
        $content.append(this.#renderViewList(viewList, session));
      };
      contentList.forEach((config, index) => {
        const $item = createElement("div", { className: "dyl-panel-menu-item" });
        $item.textContent = config.title;
        $item.addEventListener("click", () => {
          activeIndex = index;
          this.#navStack = [];
          $menu
            .querySelectorAll(".dyl-panel-menu-item")
            .forEach(($el) => $el.classList.remove("dyl-panel-menu-item--active"));
          $item.classList.add("dyl-panel-menu-item--active");
          $content.scrollTop = 0;
          renderContent();
        });
        if (index === 0) $item.classList.add("dyl-panel-menu-item--active");
        $menu.append($item);
      });
      renderContent();
      document.body.append($mask);
      this.#openDeepMenu = (deepMenu) => {
        this.#navStack.push({
          text: deepMenu.text,
          views: deepMenu.views,
        });
        $content.scrollTop = 0;
        renderContent();
      };
      this.#closePanelCallback = () => {
        window.removeEventListener("keydown", keydownCallback);
        session.listenerIdList.forEach((listenerId) => this.removeValueChangeListener(listenerId));
        session.listenerIdList.length = 0;
        session.isOpened = false;
        $mask.remove();
        removeStyle($panelStyle);
        if (this.#session === session) this.#session = null;
      };
      return {
        $mask,
        $panel,
        content: contentList,
      };
    }
    #closePanelCallback = null;
    #openDeepMenu = null;
    closePanel() {
      this.#closePanelCallback?.();
      this.#closePanelCallback = null;
      this.#navStack = [];
    }
    #renderViewList(views, session) {
      const $wrapper = createElement("div");
      let $currentList = null;
      const ensureContainer = () => {
        if ($currentList) return $currentList;
        const $container = createElement("div", { className: "dyl-panel-container" });
        const $list = createElement("ul", { className: "dyl-panel-list" });
        $container.append($list);
        $wrapper.append($container);
        $currentList = $list;
        return $list;
      };
      for (const view of views)
        if (view.type === "container") {
          $currentList = null;
          $wrapper.append(this.#renderContainer(view, session));
        } else if (view.type === "deepMenu") ensureContainer().append(this.#renderDeepMenu(view));
        else ensureContainer().append(this.#renderItem(view, session));
      return $wrapper;
    }
    #renderContainer(container, session) {
      const $container = createElement("div", { className: "dyl-panel-container" });
      if (container.text) {
        const $title = createElement("div", { className: "dyl-panel-container-title" });
        $title.textContent = container.text;
        $container.append($title);
      }
      const $list = createElement("ul", { className: "dyl-panel-list" });
      for (const view of container.views) {
        if (view.type === "container") {
          $container.append(this.#renderContainer(view, session));
          continue;
        }
        if (view.type === "deepMenu") {
          $list.append(this.#renderDeepMenu(view));
          continue;
        }
        $list.append(this.#renderItem(view, session));
      }
      if ($list.childElementCount) $container.append($list);
      return $container;
    }
    #renderDeepMenu(deepMenu) {
      const $li = createElement("li", { className: "dyl-panel-item dyl-panel-deep-menu" });
      const $text = createElement("div", { className: "dyl-panel-item-text" });
      $text.innerHTML = `<p class="dyl-panel-item-text-main">${deepMenu.text}</p>`;
      const $arrow = createElement("div", { className: "dyl-panel-deep-menu-arrow" });
      $arrow.textContent = "›";
      $li.append($text, $arrow);
      $li.addEventListener("click", () => {
        this.#openDeepMenu?.(deepMenu);
      });
      return $li;
    }
    #renderItem(view, session) {
      const $li = createElement("li", { className: "dyl-panel-item" });
      switch (view.type) {
        case "switch":
          this.#renderSwitch(view, $li, session);
          break;
        case "select":
          this.#renderSelect(view, $li, session);
          break;
        case "inputNumber":
          this.#renderInputNumber(view, $li, session);
          break;
        case "own":
          this.#renderOwn(view, $li);
      }
      return $li;
    }
    #createItemText(text, description) {
      const $text = createElement("div", { className: "dyl-panel-item-text" });
      const $main = createElement("p", { className: "dyl-panel-item-text-main" });
      $main.textContent = text ?? "";
      $text.append($main);
      if (description) {
        const $desc = createElement("p", { className: "dyl-panel-item-text-desc" });
        $desc.innerHTML = description;
        $text.append($desc);
      }
      return $text;
    }
    #renderSwitch(view, $li, session) {
      $li.append(this.#createItemText(view.text, view.description));
      const $switch = createElement("div", { className: "dyl-switch" });
      if (view.disabled) $switch.classList.add("dyl-switch--disabled");
      const updateView = (value) => {
        $switch.classList.toggle("dyl-switch--on", Boolean(value));
      };
      updateView(Boolean(this.getValue(view.key, view.defaultValue)));
      session.listenerIdList.push(
        this.addValueChangeListener(view.key, (_key, newValue) => {
          updateView(Boolean(newValue));
        })
      );
      $switch.addEventListener("click", (event) => {
        if (view.disabled) return;
        const newValue = !Boolean(this.getValue(view.key, view.defaultValue));
        if (view.clickCallBack?.(event, newValue)) return;
        this.setValue(view.key, newValue);
        updateView(newValue);
        view.valueChangeCallback?.(event, newValue);
      });
      $li.append($switch);
    }
    #renderSelect(view, $li, session) {
      $li.append(this.#createItemText(view.text, view.description));
      const optionList = typeof view.data === "function" ? view.data() : view.data;
      const $select = createElement("select", { className: "dyl-panel-select" });
      optionList.forEach((option, index) => {
        const $option = createElement("option");
        $option.value = String(index);
        $option.textContent = option.text;
        $select.append($option);
      });
      const updateView = (value) => {
        const index = optionList.findIndex((option) => String(option.value) === String(value));
        $select.value = String(index === -1 ? 0 : index);
      };
      updateView(this.getValue(view.key, view.defaultValue));
      session.listenerIdList.push(
        this.addValueChangeListener(view.key, (_key, newValue) => {
          updateView(newValue);
        })
      );
      $select.addEventListener("change", () => {
        const option = optionList[Number($select.value)];
        if (!option) return;
        if (view.selectCallBack?.(option)) {
          updateView(this.getValue(view.key, view.defaultValue));
          return;
        }
        this.setValue(view.key, option.value);
        view.valueChangeCallback?.(option);
      });
      $li.append($select);
    }
    #renderInputNumber(view, $li, session) {
      $li.append(this.#createItemText(view.text, view.description));
      const $input = createElement("input", {
        className: "dyl-panel-input",
        type: "number",
        placeholder: view.placeholder,
      });
      const updateView = (value) => {
        $input.value = value == null ? "" : String(value);
      };
      updateView(this.getValue(view.key, view.defaultValue));
      session.listenerIdList.push(
        this.addValueChangeListener(view.key, (_key, newValue) => {
          updateView(newValue);
        })
      );
      $input.addEventListener("change", (event) => {
        const value = $input.value;
        let valueAsNumber = $input.valueAsNumber;
        if (valueAsNumber == null || Number.isNaN(valueAsNumber)) valueAsNumber = Number(view.defaultValue);
        if (view.changeCallback?.(event, value, valueAsNumber)) {
          updateView(this.getValue(view.key, view.defaultValue));
          return;
        }
        this.setValue(view.key, value);
        view.valueChangeCallback?.(event, value, valueAsNumber);
      });
      $li.append($input);
      const container = { target: $li };
      view.afterAddToUListCallBack?.(view, container);
    }
    #renderOwn(view, $li) {
      const $result = view.createLIElement($li);
      if ($result instanceof HTMLElement && $result !== $li) {
        $li.className = $result.className;
        $li.innerHTML = $result.innerHTML;
        while ($result.firstChild) $li.append($result.firstChild);
      }
    }
  };
  var Panel = new PanelClass();
  var BlockLeftNavigator = {
    init() {
      Panel.exec(
        ["shieldLeftNavigator"],
        () => {
          return this.shieldLeftNavigator();
        },
        (keyList) => {
          const [mainKey] = keyList;
          return Panel.getValue(mainKey);
        }
      );
      Panel.execMenuOnce("shieldLeftNavigator-tab-home", () => {
        return this.block_tab_home();
      });
      Panel.execMenuOnce("shieldLeftNavigator-tab-recommend", () => {
        return this.block_tab_recommend();
      });
      Panel.execMenuOnce("shieldLeftNavigator-tab-follow", () => {
        return this.block_tab_follow();
      });
      Panel.execMenuOnce("shieldLeftNavigator-tab-friend", () => {
        return this.block_tab_friend();
      });
      Panel.execMenuOnce("shieldLeftNavigator-tab-user_self", () => {
        return this.block_tab_user_self();
      });
      Panel.execMenuOnce("shieldLeftNavigator-tab-live", () => {
        return this.block_tab_live();
      });
      Panel.execMenuOnce("shieldLeftNavigator-tab-vs", () => {
        return this.block_tab_vs();
      });
      Panel.execMenuOnce("shieldLeftNavigator-tab-series", () => {
        return this.block_tab_series();
      });
      Panel.execMenuOnce("shieldLeftNavigator-tab-microgame", () => {
        return this.block_tab_microgame();
      });
      Panel.execMenuOnce("shieldLeftNavigator-tab-ai-search", () => {
        return this.block_tab_ai_search();
      });
      Panel.execMenuOnce("shieldLeftNavigator-tab-activity", () => {
        return this.block_tab_activity();
      });
      Panel.execMenuOnce("shieldLeftNavigator-panel-menu-setting", () => {
        return this.block_panel_menu_setting();
      });
      Panel.execMenuOnce("shieldLeftNavigator-panel-menu-about", () => {
        return this.block_panel_menu_about();
      });
      Panel.execMenuOnce("shieldLeftNavigator-panel-menu-q_a", () => {
        return this.block_panel_menu_q_a();
      });
      Panel.execMenuOnce("shieldLeftNavigator-panel-menu-survey", () => {
        return this.block_panel_menu_survey();
      });
    },
    shieldLeftNavigator() {
      const result = [];
      result.push(addBlockCSS("#douyin-navigation"));
      result.push(
        addStyle(`
			/* 修复顶部导航栏的宽度 */
			#douyin-header{
				width: 100%;
			}`)
      );
      return result;
    },
    block_tab_home() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div:has(.tab-discover)');
    },
    block_tab_recommend() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div:has(.tab-recommend)');
    },
    block_tab_ai_search() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div:has([class^="tab-aisearch"])');
    },
    block_tab_follow() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div:has(.tab-follow)');
    },
    block_tab_friend() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div:has(.tab-friend)');
    },
    block_tab_user_self() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div > div:has(.tab-user_self)');
    },
    block_tab_activity() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div:has([class^="tab-activity_"])');
    },
    block_tab_live() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div:has(.tab-live)');
    },
    block_tab_vs() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div:has(.tab-vs)');
    },
    block_tab_series() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div:has(.tab-series)');
    },
    block_tab_microgame() {
      return addBlockCSS('[data-e2e="douyin-navigation"] > div > div > div > div:has(.tab-microgame)');
    },
    block_panel_menu_setting() {
      return addBlockCSS(
        '[data-e2e="douyin-navigation"] #panel-menu div:has(>#btn-feelgood) > div:has(path[d="M13.6032 3.57455L13.6012 3.5734C13.1238 3.29458 12.5424 3.17798 12.003 3.17798C11.4626 3.17798 10.8801 3.29506 10.4003 3.57252L10.4002 3.57256L5.91125 6.16801C5.8962 6.17671 5.88145 6.18593 5.86705 6.19566L5.84354 6.21152C5.45545 6.47347 5.12936 6.69357 4.8772 6.89334C4.615 7.10106 4.37899 7.32726 4.20899 7.62136C4.03466 7.92295 3.96491 8.23437 3.93338 8.55508C3.90423 8.8515 3.90425 9.20597 3.90427 9.6083V9.60833L3.90427 9.64131V14.3507L3.90427 14.3836V14.3837C3.90425 14.7881 3.90423 15.144 3.93334 15.4414C3.96481 15.7628 4.03439 16.0749 4.20852 16.377C4.37847 16.6719 4.61457 16.8985 4.877 17.1066C5.12925 17.3066 5.45543 17.5267 5.84343 17.7886L5.86705 17.8046C5.88145 17.8143 5.8962 17.8235 5.91125 17.8322L10.4002 20.4276C10.8801 20.7051 11.4625 20.8222 12.003 20.8222C12.5424 20.8222 13.1239 20.7056 13.6013 20.4267L13.6032 20.4257L18.0887 17.8322C18.1038 17.8235 18.1185 17.8143 18.1329 17.8046L18.1565 17.7887C18.5445 17.5267 18.8706 17.3066 19.1228 17.1069C19.385 16.8991 19.621 16.6729 19.791 16.3789C19.9653 16.0773 20.0351 15.7658 20.0666 15.4451C20.0957 15.1487 20.0957 14.7942 20.0957 14.3919V14.3919L20.0957 14.3589V9.64131L20.0957 9.60833V9.60831C20.0957 9.20598 20.0957 8.8515 20.0666 8.55508C20.0351 8.23437 19.9653 7.92295 19.791 7.62136C19.621 7.32726 19.385 7.10106 19.1228 6.89334C18.8706 6.69357 18.5445 6.47347 18.1564 6.21153L18.1329 6.19566C18.1185 6.18593 18.1038 6.17671 18.0887 6.16801L13.6032 3.57455ZM11.1512 4.87106C11.3488 4.75678 11.656 4.67798 12.003 4.67798C12.3506 4.67798 12.6538 4.75694 12.8454 4.86907L12.8454 4.86908L12.8489 4.87109L17.3153 7.45352C17.7211 7.72744 17.9929 7.91194 18.1913 8.06909C18.3882 8.22508 18.4583 8.31311 18.4923 8.37202C18.522 8.42343 18.5543 8.50378 18.5738 8.70186C18.5949 8.91616 18.5957 9.1962 18.5957 9.64131V14.3589C18.5957 14.804 18.5949 15.0841 18.5738 15.2983C18.5543 15.4964 18.522 15.5768 18.4923 15.6282C18.4583 15.6871 18.3882 15.7751 18.1913 15.9311C17.9929 16.0883 17.7211 16.2728 17.3153 16.5467L12.8489 19.1291L12.8489 19.1291L12.8454 19.1311C12.6538 19.2433 12.3506 19.3222 12.003 19.3222C11.656 19.3222 11.3488 19.2434 11.1512 19.1292L11.1511 19.1291L6.68465 16.5467C6.27885 16.2727 6.00712 16.0883 5.80886 15.9311C5.61219 15.7752 5.54221 15.6871 5.50811 15.628C5.47819 15.5761 5.44575 15.4948 5.42621 15.2952C5.4051 15.0796 5.40427 14.7978 5.40427 14.3507V9.64131C5.40427 9.1962 5.40511 8.91616 5.42618 8.70186C5.44565 8.50378 5.47793 8.42343 5.50764 8.37202C5.54169 8.31311 5.61175 8.22508 5.80866 8.06909C6.00703 7.91194 6.27888 7.72744 6.68464 7.45352L11.1511 4.87109L11.1512 4.87106ZM10.029 12C10.029 10.9114 10.9114 10.0289 12 10.0289C13.0886 10.0289 13.9711 10.9114 13.9711 12C13.9711 13.0886 13.0886 13.971 12 13.971C10.9114 13.971 10.029 13.0886 10.029 12ZM12 8.52893C10.083 8.52893 8.52896 10.083 8.52896 12C8.52896 13.917 10.083 15.471 12 15.471C13.917 15.471 15.4711 13.917 15.4711 12C15.4711 10.083 13.917 8.52893 12 8.52893Z"])'
      );
    },
    block_panel_menu_about() {
      return addBlockCSS(
        '[data-e2e="douyin-navigation"] #panel-menu div:has(>#btn-feelgood) > div:has(path[d="M5.68365 7.62549C5.68365 6.55301 6.55307 5.68359 7.62555 5.68359C8.69803 5.68359 9.56744 6.55301 9.56744 7.62549C9.56744 8.69797 8.69803 9.56738 7.62555 9.56738C6.55307 9.56738 5.68365 8.69797 5.68365 7.62549ZM7.62555 4.18359C5.72464 4.18359 4.18365 5.72458 4.18365 7.62549C4.18365 9.52639 5.72464 11.0674 7.62555 11.0674C9.52645 11.0674 11.0674 9.52639 11.0674 7.62549C11.0674 5.72458 9.52645 4.18359 7.62555 4.18359ZM5.68365 16.3741C5.68365 15.3017 6.55307 14.4322 7.62555 14.4322C8.69803 14.4322 9.56744 15.3017 9.56744 16.3741C9.56744 17.4466 8.69803 18.316 7.62555 18.316C6.55307 18.316 5.68365 17.4466 5.68365 16.3741ZM7.62555 12.9322C5.72464 12.9322 4.18365 14.4732 4.18365 16.3741C4.18365 18.275 5.72464 19.816 7.62555 19.816C9.52646 19.816 11.0674 18.275 11.0674 16.3741C11.0674 14.4732 9.52646 12.9322 7.62555 12.9322ZM16.3741 5.68359C15.3017 5.68359 14.4322 6.55301 14.4322 7.62549C14.4322 8.69797 15.3017 9.56738 16.3741 9.56738C17.4466 9.56738 18.316 8.69797 18.316 7.62549C18.316 6.55301 17.4466 5.68359 16.3741 5.68359ZM12.9322 7.62549C12.9322 5.72458 14.4732 4.18359 16.3741 4.18359C18.275 4.18359 19.816 5.72458 19.816 7.62549C19.816 9.52639 18.275 11.0674 16.3741 11.0674C14.4732 11.0674 12.9322 9.52639 12.9322 7.62549ZM14.4322 16.3741C14.4322 15.3017 15.3017 14.4322 16.3741 14.4322C17.4466 14.4322 18.316 15.3017 18.316 16.3741C18.316 17.4466 17.4466 18.316 16.3741 18.316C15.3017 18.316 14.4322 17.4466 14.4322 16.3741ZM16.3741 12.9322C14.4732 12.9322 12.9322 14.4732 12.9322 16.3741C12.9322 18.275 14.4732 19.816 16.3741 19.816C18.275 19.816 19.816 18.275 19.816 16.3741C19.816 14.4732 18.275 12.9322 16.3741 12.9322Z"])'
      );
    },
    block_panel_menu_q_a() {
      return addBlockCSS(
        '[data-e2e="douyin-navigation"] #panel-menu div:has(>#btn-feelgood) > div:has(path[d="M11.9999 4.75C7.99575 4.75 4.74976 7.99599 4.74976 12.0001C4.74976 16.0043 7.99575 19.2502 11.9999 19.2502C16.004 19.2502 19.25 16.0043 19.25 12.0001C19.25 10.5774 18.841 9.2525 18.1344 8.13394C16.8488 6.0989 14.5816 4.75 11.9999 4.75ZM3.24976 12.0001C3.24976 7.16756 7.16732 3.25 11.9999 3.25C15.1176 3.25 17.8537 4.88105 19.4025 7.33284C20.2561 8.68408 20.75 10.2856 20.75 12.0001C20.75 16.8327 16.8324 20.7502 11.9999 20.7502C7.16732 20.7502 3.24976 16.8327 3.24976 12.0001ZM8.25 10C8.25 7.92894 9.92894 6.25 12 6.25C14.0711 6.25 15.75 7.92894 15.75 10C15.75 11.8142 14.4617 13.3275 12.75 13.675V14.5H11.25V13C11.25 12.5858 11.5858 12.25 12 12.25C13.2426 12.25 14.25 11.2426 14.25 10C14.25 8.75736 13.2426 7.75 12 7.75C10.7574 7.75 9.75 8.75736 9.75 10H8.25ZM13.25 16.5625C13.25 17.2528 12.6903 17.8125 12 17.8125C11.3097 17.8125 10.75 17.2528 10.75 16.5625C10.75 15.8722 11.3097 15.3125 12 15.3125C12.6903 15.3125 13.25 15.8722 13.25 16.5625Z"])'
      );
    },
    block_panel_menu_survey() {
      return addBlockCSS('[data-e2e="douyin-navigation"] #panel-menu #btn-feelgood');
    },
  };
  var BlockPlayerRightToolbar = {
    init() {
      Panel.execMenuOnce("dy-video-shieldPlaySwitchButton", () => {
        return this.shieldPlaySwitchButton();
      });
      Panel.execMenuOnce("dy-video-blockAIDouYin", () => {
        return this.blockAIDouYin();
      });
      Panel.execMenuOnce("dy-video-shieldListenDouYinButton", () => {
        return this.blockListenDouYinButton();
      });
      Panel.execMenuOnce("dy-video-shieldRelatedRecommendationsButton", () => {
        return this.blockRelatedRecommendationsButton();
      });
      Panel.execMenuOnce("dy-video-shieldMoreButton", () => {
        return this.blockMoreButton();
      });
    },
    shieldPlaySwitchButton() {
      log.info("【屏蔽】切换播放↑↓");
      return [
        addBlockCSS(
          '.positionBox  .xgplayer-playswitch[data-state="normal"]',
          "div.xgplayer-playswitch",
          ".xgplayer-playswitch",
          '[data-e2e="feed-live"]>div:has(svg path[d="M7.269 16.316a1.393 1.393 0 0 1 0-1.97l5.056-5.055a1.393 1.393 0 0 1 1.97 0l.011.011 5.045 5.045a1.393 1.393 0 1 1-1.97 1.97l-4.071-4.072-4.071 4.071a1.393 1.393 0 0 1-1.97 0z"])'
        ),
        addStyle(`
			div[data-e2e="slideList"]{
				/* 修复屏蔽后的视频宽度占据 */
				padding: 0px !important;
			}
			`),
      ];
    },
    blockAIDouYin() {
      log.info(`【屏蔽】AI抖音`);
      window.localStorage.setItem("aiEntryClose", "1");
      return [
        addBlockCSS(
          '.immersive-player-switch-on-hide-interaction-area > div:has(>svg path[d="M8.175 4.88C8.318 2.458 10.38.548 12.815.665l.12.008a4.428 4.428 0 0 1 3.08 1.586 4.354 4.354 0 0 1 1.014 2.948l-.005.108c-.016.282-.06.556-.129.82l-.113.444 1.927-.499.111-.027c2.335-.543 4.733.81 5.362 3.105l.05.182a4.351 4.351 0 0 1-.524 3.23l-.06.096a4.409 4.409 0 0 1-2.514 1.87l-.105.028h-.001a4.336 4.336 0 0 1-.827.133l-.458.03 1.075 1.67.06.096c1.221 2.003.705 4.63-1.222 5.957l-.095.063a4.44 4.44 0 0 1-3.424.605l-.11-.027a4.41 4.41 0 0 1-2.568-1.795l-.06-.09-.056-.09a4.355 4.355 0 0 1-.326-.65l-.17-.421-1.263 1.528c-1.53 1.85-4.265 2.207-6.162.774l-.09-.07a4.376 4.376 0 0 1-1.636-3.044l-.008-.112a4.361 4.361 0 0 1 .994-3.061 4.64 4.64 0 0 1 .592-.59l.352-.293-1.856-.722c-2.28-.886-3.468-3.423-2.606-5.68v-.001A4.407 4.407 0 0 1 3.68 6.245a4.448 4.448 0 0 1 3.991.37l.386.24.118-1.975zm4.57-2.218a2.413 2.413 0 0 0-2.547 2.165v.01l-.463 7.542a.046.046 0 0 1-.053.041l-.011-.003-.163-.064h-.001l-2.109-.821c.165-.28.28-.606.31-.978l.006-.09A2.422 2.422 0 0 0 6.475 8.23l-.081-.043-.104-.049a2.42 2.42 0 0 0-1.479-.153l-.102.024a2.403 2.403 0 0 0-1.652 1.446 2.396 2.396 0 0 0 1.285 3.076l.01.004 7.082 2.769a.044.044 0 0 1 .02.068l-.112.134v.001l-1.44 1.74a2.312 2.312 0 0 0-.775-.568l-.067-.03-.086-.033c-.856-.319-1.842-.147-2.517.48l-.066.064a2.38 2.38 0 0 0-.692 1.538c-.047.744.252 1.5.876 2.01a2.428 2.428 0 0 0 3.339-.265l.003-.004.003-.004 4.84-5.833a.046.046 0 0 1 .04-.016c.012 0 .022.005.03.012l.007.009.092.146.001.001 1.22 1.893c-.28.122-.547.302-.78.555l-.049.054v.001c-.64.74-.793 1.807-.337 2.682.282.545.737.927 1.257 1.13a2.418 2.418 0 0 0 2.19-.206 2.393 2.393 0 0 0 .78-3.24l-.002-.004-.003-.004-4.09-6.373-.001-.001-.005-.009a.043.043 0 0 1 .032-.055l.17-.044 2.195-.569c.032.325.133.654.328.974a2.445 2.445 0 0 0 2.462 1.146l.112-.022a2.405 2.405 0 0 0 1.358-.818l.29-.442a2.375 2.375 0 0 0 .206-1.621l-.018-.073a2.415 2.415 0 0 0-2.858-1.737l-.009.002-7.369 1.894h-.002a.043.043 0 0 1-.039-.009.043.043 0 0 1-.016-.037l.013-.204v-.002l.132-2.212c.32.07.67.077 1.034-.009.955-.225 1.708-.997 1.859-1.972a2.371 2.371 0 0 0-.296-1.56l-.055-.09a2.41 2.41 0 0 0-1.82-1.106l-.075-.005z"])',
          '.immersive-player-switch-on-hide-interaction-area > div:has(>svg g[filter*="entryIcon_svg__filter"])',
          '.immersive-player-switch-on-hide-interaction-area > div > div:has(>svg g[filter*="entryIcon_svg__filter"])',
          '.immersive-player-switch-on-hide-interaction-area > div > div:has(>div>svg g[filter*="entryIcon_svg__filter"])',
          '.xgplayer div:has(>svg path[d="M22.94 21.309l.58 1.364a45.819 45.819 0 0 0 2.125 4.34l.528.947-.108.056-1.077.543-.102.052-.054-.102-.576-1.087a44.077 44.077 0 0 1-.22-.423 7.704 7.704 0 0 0-3.902.001c-.087.169-.154.3-.219.422l-.576 1.087-.054.102-.102-.052-1.077-.543-.108-.056.059-.106.468-.841a45.902 45.902 0 0 0 2.125-4.34l.58-1.364.038-.086.091.017c.482.086.97.086 1.451 0l.093-.017.037.086zm6.011-.019a3.731 3.731 0 0 0-.173.9c-.022.342-.034.69-.034 1.035v3.067c0 .345.012.694.034 1.035l.022.227c.029.226.08.452.151.673l.05.153h-1.92l.049-.153c.095-.295.153-.597.173-.9.022-.345.033-.694.033-1.035v-3.067c0-.34-.01-.689-.033-1.034a3.753 3.753 0 0 0-.173-.9l-.05-.154h1.921l-.05.153zM17.161 5.395l.123.008a4.527 4.527 0 0 1 3.14 1.602 4.367 4.367 0 0 1 1.033 2.978l-.005.109c-.015.284-.063.56-.13.828l-.117.447 1.964-.504.113-.027c2.38-.549 4.824.818 5.465 3.136l.05.184a4.368 4.368 0 0 1-.534 3.265l-.06.097a4.495 4.495 0 0 1-1.965 1.674c-3.71 1.444-5.893-1.51-6.663-3.187l.134-.034 2.236-.575c.033.329.136.661.333.984a2.5 2.5 0 0 0 2.51 1.157l.113-.021a2.456 2.456 0 0 0 1.384-.825l.297-.448a2.37 2.37 0 0 0 .209-1.637l-.018-.075c-.334-1.268-1.63-2.035-2.914-1.753h-.01l-7.51 1.916h-.022a.056.056 0 0 1-.02-.01.048.048 0 0 1-.017-.037l.014-.205.136-2.238c.327.071.682.079 1.054-.008.973-.227 1.74-1.006 1.894-1.992a2.371 2.371 0 0 0-.303-1.578l-.055-.09a2.46 2.46 0 0 0-1.855-1.118l-.076-.006c-1.323-.076-2.469.897-2.596 2.188v.009l-.47 7.62a.047.047 0 0 1-.053.04l-.013-.002-.166-.065-2.15-.83c.169-.284.285-.612.316-.987l.007-.092a2.443 2.443 0 0 0-1.263-2.256l-.084-.043-.105-.048a2.482 2.482 0 0 0-1.508-.155l-.104.024a2.443 2.443 0 0 0-1.683 1.46c-.487 1.219.104 2.59 1.31 3.109l.008.003 7.22 2.797c.03.012.036.048.02.068l-.114.136-1.467 1.759a2.335 2.335 0 0 0-.79-.573l-.068-.03-.086-.034c-.873-.321-1.878-.147-2.566.484l-.069.065a2.407 2.407 0 0 0 .188 3.584 2.49 2.49 0 0 0 3.404-.268l.006-.006 3.485-4.165v3.166l-.5.607v-.004l-1.29 1.543c-1.559 1.868-4.346 2.229-6.28.782l-.092-.07a4.41 4.41 0 0 1-1.668-3.076l-.009-.113a4.384 4.384 0 0 1 1.619-3.688l.357-.297-1.892-.729c-2.323-.895-3.535-3.457-2.656-5.739a4.475 4.475 0 0 1 2.565-2.555 4.577 4.577 0 0 1 4.068.373l.393.244.12-1.995h-.001c.146-2.447 2.248-4.375 4.728-4.258zm4.679 17.909a45.987 45.987 0 0 1-.964 2.191 9.16 9.16 0 0 1 2.417 0 45.878 45.878 0 0 1-.963-2.191l-.245-.6-.245.6z"])',
          '.immersive-player-switch-on-hide-interaction-area > div:has(> div >svg >defs+ g[clip-path*="__lottie_element_"])'
        ),
      ];
    },
    blockListenDouYinButton() {
      log.info("【屏蔽】听抖音");
      return [
        addBlockCSS(
          '.basePlayerContainer div[aria-describedby]:has(path[d="M9.68718 12.4801C8.612 14.3927 8.1197 16.7374 8.05821 19.0767C8.23942 18.9661 8.4351 18.8725 8.64383 18.7988L9.16952 18.6132C10.7699 18.0482 12.5315 18.8701 13.1042 20.4491L15.3865 26.7417C15.9591 28.3206 15.126 30.0586 13.5257 30.6236L13 30.8092C11.4155 31.3686 9.85676 30.6485 8.86663 29.2939C8.83318 29.2583 8.80192 29.22 8.7732 29.1788C7.33136 27.1149 6.42117 24.618 6.13186 21.9841C5.75876 18.5873 6.12658 14.6403 7.8929 11.4983C9.70099 8.28189 12.9317 6 17.9885 6C23.0436 6 26.2778 8.27305 28.092 11.4819C29.8643 14.6168 30.2393 18.557 29.8725 21.9536C29.5881 24.5883 28.6825 27.0875 27.2445 29.155C27.2194 29.1911 27.1924 29.2251 27.1636 29.2569C26.1749 30.6354 24.6023 31.3737 23.0035 30.8092L22.4778 30.6236C20.8774 30.0586 20.0443 28.3206 20.617 26.7417L22.8993 20.4491C23.472 18.8701 25.2335 18.0482 26.8339 18.6132L27.3596 18.7988C27.5669 18.8719 27.7613 18.9648 27.9415 19.0744C27.8783 16.7301 27.382 14.3817 26.3001 12.468C24.846 9.89593 22.2949 8.02429 17.9885 8.02428C13.684 8.02428 11.1369 9.90129 9.68718 12.4801Z"])'
        ),
      ];
    },
    blockRelatedRecommendationsButton() {
      log.info("【屏蔽】看相关");
      return [
        addBlockCSS(
          'div.dy-tip-container:has(path[d="M14 8a8 8 0 00-8 8v4a8 8 0 008 8h8a8 8 0 008-8v-4a8 8 0 00-8-8h-8zm8.5 10.866a1 1 0 000-1.732l-6-3.464a1 1 0 00-1.5.866v6.928a1 1 0 001.5.866l6-3.464z"])',
          'div.dy-tip-container:has(path[d=" M-4,-10 C-4,-10 4,-10 4,-10 C8.418000221252441,-10 12,-6.418000221252441 12,-2 C12,-2 12,2 12,2 C12,6.418000221252441 8.418000221252441,10 4,10 C4,10 -4,10 -4,10 C-8.418000221252441,10 -12,6.418000221252441 -12,2 C-12,2 -12,-2 -12,-2 C-12,-6.418000221252441 -8.418000221252441,-10 -4,-10z M4.5,0.8659999966621399 C5.166999816894531,0.48100000619888306 5.166999816894531,-0.48100000619888306 4.5,-0.8659999966621399 C4.5,-0.8659999966621399 -1.5,-4.329999923706055 -1.5,-4.329999923706055 C-2.1670000553131104,-4.715000152587891 -3,-4.234000205993652 -3,-3.4639999866485596 C-3,-3.4639999866485596 -3,3.4639999866485596 -3,3.4639999866485596 C-3,4.234000205993652 -2.1670000553131104,4.715000152587891 -1.5,4.329999923706055 C-1.5,4.329999923706055 4.5,0.8659999966621399 4.5,0.8659999966621399z"])',
          '.basePlayerContainer div[aria-describedby]:has(path[d="M14 8a8 8 0 00-8 8v4a8 8 0 008 8h8a8 8 0 008-8v-4a8 8 0 00-8-8h-8zm8.5 10.866a1 1 0 000-1.732l-6-3.464a1 1 0 00-1.5.866v6.928a1 1 0 001.5.866l6-3.464z"])',
          '.basePlayerContainer div[aria-describedby]:has(path[d="M14 8a8 8 0 0 0-8 8v4a8 8 0 0 0 8 8h8a8 8 0 0 0 8-8v-4a8 8 0 0 0-8-8h-8zm8.5 10.866a1 1 0 0 0 0-1.732l-6-3.464a1 1 0 0 0-1.5.866v6.928a1 1 0 0 0 1.5.866l6-3.464z"])',
          '.basePlayerContainer div[aria-describedby]:has(path[d=" M-4,-10 C-4,-10 4,-10 4,-10 C8.418000221252441,-10 12,-6.418000221252441 12,-2 C12,-2 12,2 12,2 C12,6.418000221252441 8.418000221252441,10 4,10 C4,10 -4,10 -4,10 C-8.418000221252441,10 -12,6.418000221252441 -12,2 C-12,2 -12,-2 -12,-2 C-12,-6.418000221252441 -8.418000221252441,-10 -4,-10z M4.5,0.8659999966621399 C5.166999816894531,0.48100000619888306 5.166999816894531,-0.48100000619888306 4.5,-0.8659999966621399 C4.5,-0.8659999966621399 -1.5,-4.329999923706055 -1.5,-4.329999923706055 C-2.1670000553131104,-4.715000152587891 -3,-4.234000205993652 -3,-3.4639999866485596 C-3,-3.4639999866485596 -3,3.4639999866485596 -3,3.4639999866485596 C-3,4.234000205993652 -2.1670000553131104,4.715000152587891 -1.5,4.329999923706055 C-1.5,4.329999923706055 4.5,0.8659999966621399 4.5,0.8659999966621399z"])'
        ),
        addStyle(`
				/* 修复分享的悬浮框距离底部的高度 */
				[data-e2e="video-player-share"]+div[data-e2e="video-share-container"] > div:first-child{
					bottom: 0px !important;
				}
			`),
      ];
    },
    blockMoreButton() {
      log.info("【屏蔽】更多");
      return [
        addBlockCSS(
          'div.dy-tip-container:has([data-e2e="video-play-more"])',
          '.basePlayerContainer div[data-e2e="video-play-more"]',
          '[data-e2e="feed-live"] [data-e2e="basicPlayer"] > div:has(svg path[d="M13.556 17.778a1.778 1.778 0 1 1-3.556 0 1.778 1.778 0 0 1 3.556 0zM19.778 17.778a1.778 1.778 0 1 1-3.556 0 1.778 1.778 0 0 1 3.556 0zM24.222 19.556a1.778 1.778 0 1 0 0-3.556 1.778 1.778 0 0 0 0 3.556z"])',
          '[data-e2e="feed-live"] .douyin-player div:has(>svg path[d="M13.556 17.778a1.778 1.778 0 1 1-3.556 0 1.778 1.778 0 0 1 3.556 0zM19.778 17.778a1.778 1.778 0 1 1-3.556 0 1.778 1.778 0 0 1 3.556 0zM24.222 19.556a1.778 1.778 0 1 0 0-3.556 1.778 1.778 0 0 0 0 3.556z"])'
        ),
        addStyle(`
				/* 修复分享的悬浮框距离底部的高度 */
				[data-e2e="video-player-share"]+div[data-e2e="video-share-container"] > div:first-child{
					bottom: 0px !important;
				}
			`),
      ];
    },
  };
  var isSearchPage = () => DouYinRouter.isSearch();
  var isLivePage = () => DouYinRouter.isLive();
  var BlockTopNavigator = {
    init() {
      Panel.execMenuOnce(
        "shieldClientTip",
        () => {
          return this.shieldClientTip();
        },
        void 0,
        true
      );
      Panel.execMenuOnce(
        "shieldFillingBricksAndStones",
        () => {
          return this.shieldFillingBricksAndStones();
        },
        void 0,
        true
      );
      Panel.execMenuOnce(
        "shieldClient",
        () => {
          return this.shieldClient();
        },
        void 0,
        true
      );
      Panel.execMenuOnce(
        "shieldQuickAccess",
        () => {
          return this.shieldQuickAccess();
        },
        void 0,
        true
      );
      Panel.execMenuOnce(
        "shieldNotifitation",
        () => {
          return this.shieldNotifitation();
        },
        void 0,
        true
      );
      Panel.execMenuOnce(
        "shieldPrivateMessage",
        () => {
          return this.shieldPrivateMessage();
        },
        void 0,
        true
      );
      Panel.execMenuOnce(
        "shieldSubmission",
        () => {
          return this.shieldSubmission();
        },
        void 0,
        true
      );
      Panel.execMenuOnce(
        "shieldWallpaper",
        () => {
          return this.shieldWallpaper();
        },
        void 0,
        true
      );
      Panel.execMenuOnce("shield-topNav-rightMenu", () => {
        return this.shieldRightMenu();
      });
      Panel.execMenuOnce("shield-topNav-rightMenu-more", () => {
        return this.shieldRightMenuMore();
      });
      Panel.execMenuOnce("shield-topNav-rightMenu-loginAvatar", () => {
        return this.shieldRightMenuLoginAvatar();
      });
      Panel.execMenuOnce("shield-topNav-ai-search", () => {
        return this.shieldAISearch();
      });
    },
    shieldFillingBricksAndStones() {
      const result = [];
      const iconPath = `d="M12.8013 19.9762C12.3693 20.4436 11.6307 20.4436 11.1986 19.9762L3.11756 11.2346C2.74913 10.8361 2.72958 10.2274 3.07168 9.80599L6.92716 5.05714C7.13438 4.8019 7.44562 4.65369 7.77439 4.65369H16.2256C16.5544 4.65369 16.8656 4.8019 17.0728 5.05714L20.9283 9.80599C21.2704 10.2274 21.2508 10.8361 20.8824 11.2346L12.8013 19.9762ZM4.45944 10.4765L12 18.6334L19.5405 10.4765L16.031 6.15369H7.96901L4.45944 10.4765ZM16.0867 9.09336L16.0954 10.4557C15.3615 10.4557 14.6822 10.2315 14.1281 9.85065V12.5739C14.1281 13.9502 12.964 15.0659 11.5281 15.0659C10.0922 15.0659 8.9281 13.9502 8.9281 12.5739C8.9281 11.1976 10.0922 10.0819 11.5281 10.0819C11.6486 10.0819 11.7672 10.0897 11.8834 10.1049V11.4964C11.7713 11.4625 11.6519 11.4442 11.5281 11.4442C10.8771 11.4442 10.3494 11.95 10.3494 12.5739C10.3494 13.1978 10.8771 13.7036 11.5281 13.7036C12.179 13.7036 12.7067 13.1978 12.7067 12.5739V7.21604H14.1281C14.1281 8.25285 15.005 9.09336 16.0867 9.09336Z"`;
      result.push(
        addBlockCSS(
          `div[id^="douyin-header-menu"] pace-island > div > div:has(path[${iconPath}])`,
          'body .semi-portal .semi-portal-inner li.semi-dropdown-item:has(a[href*="douyin_recharge"])'
        )
      );
      if (isSearchPage())
        result.push(addBlockCSS(`div[id^="douyin-header-menu"] >  div > div > div:has(path[${iconPath}])`));
      else if (isLivePage())
        result.push(
          addBlockCSS(
            '#douyin-header pace-island[id^="island"] > div[class]:not([data-click]):has(div[data-e2e="something-button"]) > :has(path[d="M12.8013 19.9762C12.3693 20.4436 11.6307 20.4436 11.1986 19.9762L3.11756 11.2346C2.74913 10.8361 2.72958 10.2274 3.07168 9.80599L6.92716 5.05714C7.13438 4.8019 7.44562 4.65369 7.77439 4.65369H16.2256C16.5544 4.65369 16.8656 4.8019 17.0728 5.05714L20.9283 9.80599C21.2704 10.2274 21.2508 10.8361 20.8824 11.2346L12.8013 19.9762ZM4.45944 10.4765L12 18.6334L19.5405 10.4765L16.031 6.15369H7.96901L4.45944 10.4765ZM16.0867 9.09336L16.0954 10.4557C15.3615 10.4557 14.6822 10.2315 14.1281 9.85065V12.5739C14.1281 13.9502 12.964 15.0659 11.5281 15.0659C10.0922 15.0659 8.9281 13.9502 8.9281 12.5739C8.9281 11.1976 10.0922 10.0819 11.5281 10.0819C11.6486 10.0819 11.7672 10.0897 11.8834 10.1049V11.4964C11.7713 11.4625 11.6519 11.4442 11.5281 11.4442C10.8771 11.4442 10.3494 11.95 10.3494 12.5739C10.3494 13.1978 10.8771 13.7036 11.5281 13.7036C12.179 13.7036 12.7067 13.1978 12.7067 12.5739V7.21604H14.1281C14.1281 8.25285 15.005 9.09336 16.0867 9.09336Z"])'
          )
        );
      return result;
    },
    shieldClient() {
      const result = [];
      result.push(
        addBlockCSS(
          '#douyin-right-container pace-island[id^="island"] > div[class]:has(div[data-e2e="something-button"]) .dy-tip-container',
          'div[id^="douyin-header-menu"] pace-island > div > div[aria-describedby]:has(a[download^="douyin-downloader"])',
          'div[id^="douyin-header-menu"] pace-island > div > div[aria-describedby]:has(a[href*="/douyin-pc-web/"])',
          'div[id^="douyin-header-menu"] pace-island > div > div:has(path[d="M18 18.75H6V17.25H18V18.75Z"])'
        )
      );
      if (isSearchPage())
        result.push(
          addBlockCSS(
            'div:has(> div[data-e2e="something-button"] path[d="M18.404 19.018h-12v-1.5h12v1.5zM11.654 13.457v-8.19h1.5v8.19l3.22-3.22 1.06 1.061-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5 1.06-1.06 3.22 3.22z"])',
            'div[id^="douyin-header-menu"] >  div > div > div:has(a[download^="douyin-downloader"])'
          )
        );
      else if (isLivePage())
        result.push(
          addBlockCSS(
            '#douyin-header pace-island[id^="island"] > div[class]:has(div[data-e2e="something-button"]) .dy-tip-container:has(a)',
            '#douyin-header pace-island[id^="island"] > div[class] span:has(a[download][href*="client"])',
            '.semi-portal-inner .semi-dropdown-content .semi-dropdown-item:has(a[download][href*="client"])'
          )
        );
      return result;
    },
    shieldQuickAccess() {
      const result = [];
      result.push(
        addBlockCSS(
          'header pace-island[id^="island"] > div[class]:has(div[data-e2e="something-button"]) > :has(.quick-access-nav-icon)',
          'div[id^="douyin-header-menu"] pace-island > div > div:has(.quick-access-nav-icon)'
        )
      );
      if (isSearchPage()) {
        result.push(addBlockCSS("div:has(>div>div>.quick-access-nav-icon)"));
        DOMUtils.waitNode('li.semi-dropdown-item[role="menuitem"]:contains("快捷访问")', 1e4).then(($semi) => {
          DOMUtils.remove($semi);
        });
      }
      return result;
    },
    shieldNotifitation() {
      const result = [];
      result.push(
        addBlockCSS(
          '#douyin-right-container #douyin-header-menuCt pace-island[id^="island"] > div[class]:has(div[data-e2e="something-button"]) > :has(path[d="M11.9998 4.50037C9.02034 4.50037 6.55167 6.81159 6.35561 9.78463L5.94855 15.9572H18.0507L17.6441 9.78506C17.4482 6.81184 14.9795 4.50037 11.9998 4.50037ZM7.85236 9.88334C7.99643 7.6987 9.81045 6.00037 11.9998 6.00037C14.1893 6.00037 16.0034 7.69888 16.1473 9.88365L16.4486 14.4572H7.55073L7.85236 9.88334Z"])'
        )
      );
      if (isSearchPage())
        result.push(
          addBlockCSS(
            'div[id^="douyin-header-menu"] >  div > div > ul:has(path[d="M11.9998 4.50037C9.02034 4.50037 6.55167 6.81159 6.35561 9.78463L5.94855 15.9572H18.0507L17.6441 9.78506C17.4482 6.81184 14.9795 4.50037 11.9998 4.50037ZM7.85236 9.88334C7.99643 7.6987 9.81045 6.00037 11.9998 6.00037C14.1893 6.00037 16.0034 7.69888 16.1473 9.88365L16.4486 14.4572H7.55073L7.85236 9.88334Z"])'
          )
        );
      else if (isLivePage())
        result.push(
          addBlockCSS(
            'div[id^="douyin-header-menu"] pace-island[id^="island"] > * > :has(path[d="M11.9998 4.50037C9.02034 4.50037 6.55167 6.81159 6.35561 9.78463L5.94855 15.9572H18.0507L17.6441 9.78506C17.4482 6.81184 14.9795 4.50037 11.9998 4.50037ZM7.85236 9.88334C7.99643 7.6987 9.81045 6.00037 11.9998 6.00037C14.1893 6.00037 16.0034 7.69888 16.1473 9.88365L16.4486 14.4572H7.55073L7.85236 9.88334Z"])'
          )
        );
      return result;
    },
    shieldPrivateMessage() {
      const result = [];
      result.push(
        addBlockCSS(
          '#douyin-right-container pace-island[id^="island"] > div[class]:has(div[data-e2e="something-button"]) > ul:has(div[data-e2e="im-entry"])',
          '#douyin-header pace-island[id^="island"] > div[class]:has(div[data-e2e="something-button"]) > ul:has(div[data-e2e="im-entry"])'
        )
      );
      if (isSearchPage())
        result.push(
          addBlockCSS(
            'ul:has( div>div[data-e2e="im-entry"] )',
            'div[id^="douyin-header-menu"] >  div > div > ul:has([data-e2e="im-entry"])'
          )
        );
      return result;
    },
    shieldSubmission() {
      const result = [];
      const iconPath = `d="M11.3487 4.90125H11.3164H11.3164C10.2479 4.90124 9.40104 4.90124 8.71799 4.95587C8.01959 5.01173 7.42807 5.12824 6.88626 5.39747C5.95866 5.8584 5.20716 6.60991 4.74622 7.53751C4.477 8.07932 4.36048 8.67084 4.30462 9.36923C4.24999 10.0523 4.24999 10.8991 4.25 11.9677V12V12.0322C4.24999 13.1008 4.24999 13.9477 4.30462 14.6307C4.36048 15.3291 4.477 15.9206 4.74622 16.4624C5.20716 17.39 5.95866 18.1415 6.88626 18.6025C7.42807 18.8717 8.01959 18.9882 8.71799 19.0441C9.40104 19.0987 10.2479 19.0987 11.3164 19.0987H11.3487H12.6513H12.6836C13.7521 19.0987 14.599 19.0987 15.282 19.0441C15.9804 18.9882 16.5719 18.8717 17.1137 18.6025C18.0413 18.1415 18.7928 17.39 19.2538 16.4624C19.523 15.9206 19.6395 15.3291 19.6954 14.6307C19.75 13.9477 19.75 13.1008 19.75 12.0322V12V11.9677C19.75 10.8991 19.75 10.0523 19.6954 9.36923C19.6395 8.67084 19.523 8.07932 19.2538 7.53751C18.7928 6.60991 18.0413 5.8584 17.1137 5.39747C16.5719 5.12824 15.9804 5.01173 15.282 4.95587C14.599 4.90124 13.7521 4.90124 12.6836 4.90125H12.6513H11.3487ZM7.55376 6.74077C7.8529 6.59212 8.22981 6.4997 8.83757 6.45109C9.45382 6.4018 10.2407 6.40125 11.3487 6.40125H12.6513C13.7593 6.40125 14.5462 6.4018 15.1624 6.45109C15.7702 6.4997 16.1471 6.59212 16.4462 6.74077C17.0809 7.05614 17.5951 7.57033 17.9105 8.205C18.0591 8.50414 18.1515 8.88105 18.2002 9.48882C18.2494 10.1051 18.25 10.8919 18.25 12C18.25 13.108 18.2494 13.8949 18.2002 14.5111C18.1515 15.1189 18.0591 15.4958 17.9105 15.7949C17.5951 16.4296 17.0809 16.9438 16.4462 17.2592C16.1471 17.4078 15.7702 17.5002 15.1624 17.5488C14.5462 17.5981 13.7593 17.5987 12.6513 17.5987H11.3487C10.2407 17.5987 9.45382 17.5981 8.83757 17.5488C8.22981 17.5002 7.8529 17.4078 7.55376 17.2592C6.91909 16.9438 6.4049 16.4296 6.08952 15.7949C5.94088 15.4958 5.84846 15.1189 5.79985 14.5111C5.75056 13.8949 5.75 13.108 5.75 12C5.75 10.8919 5.75056 10.1051 5.79985 9.48882C5.84846 8.88105 5.94088 8.50414 6.08952 8.205C6.4049 7.57033 6.91909 7.05614 7.55376 6.74077ZM11.25 15V12.75H9V11.25H11.25V8.99997H12.75V11.25H15V12.75H12.75V15H11.25Z"`;
      result.push(addBlockCSS(`div[id^="douyin-header-menu"] pace-island > div > div:has(path[${iconPath}])`));
      if (isSearchPage())
        result.push(addBlockCSS(`div[id^="douyin-header-menu"] >  div > div > div:has(path[${iconPath}])`));
      else if (isLivePage())
        result.push(
          addBlockCSS(
            '#douyin-header pace-island[id^="island"] > div[class]:has(div[data-e2e="something-button"]) > :has(ul[data-e2e="cooperate-list"])'
          )
        );
      return result;
    },
    shieldClientTip() {
      const result = [];
      result.push(
        addBlockCSS(
          'ul li div[data-e2e="something-button"] + div div:has(>a[download*="douyin-downloader"])',
          '#douyin-header pace-island[id^="island_"] ul > div:has(>a[class][download])',
          '#douyin-header pace-island[id^="island_"] ul[class] li div[data-e2e="im-entry"]  div>div div div:has(a[download][href])',
          '#douyin-header header div[id^="douyin-header-menu"] pace-island[id^="island_"] .dy-tip-container div:has(+ #wallpaper-modal)',
          ".imChatClientGuideDownloadBar"
        )
      );
      if (isSearchPage())
        result.push(
          addBlockCSS(
            'div[id^="douyin-header-menu"] ul li div[data-e2e="im-entry"] div > div > div:has(>a[download*="douyin-downloader"])',
            'div[id^="douyin-header-menu"] ul > div:has(>a[download*="douyin-downloader"])'
          )
        );
      return result;
    },
    shieldWallpaper() {
      const result = [];
      result.push(
        addBlockCSS(
          'div[id^="douyin-header-menu"] pace-island > div > div:has(span.semi-icon path[d="M9.10335 4.79386C8.86882 4.64984 8.57425 4.64585 8.3359 4.78346C8.09755 4.92108 7.95372 5.17818 7.96117 5.4533L8.05873 9.05336L5.31808 11.3898C5.10864 11.5683 5.01381 11.8473 5.07104 12.1165C5.12826 12.3857 5.32833 12.6019 5.59229 12.6798L9.0463 13.6995L10.4215 17.028C10.5266 17.2824 10.7625 17.4588 11.0362 17.4875C11.3099 17.5163 11.5774 17.3929 11.7331 17.1659L13.3237 14.8471L16.4638 19.3577L17.6949 18.5007L14.6505 14.1276L17.3608 13.9168C17.6352 13.8954 17.8758 13.7255 17.9878 13.4741C18.0997 13.2226 18.065 12.9301 17.8972 12.7119L15.7022 9.85673L16.5462 6.35562C16.6107 6.08806 16.5234 5.80667 16.3189 5.62251C16.1144 5.43835 15.8254 5.38101 15.566 5.47312L12.1723 6.67838L9.10335 4.79386ZM9.56789 9.37117L9.49812 6.79649L11.693 8.14425C11.8862 8.26291 12.1227 8.28777 12.3364 8.21188L14.7635 7.34991L14.16 9.85382C14.1068 10.0743 14.1563 10.3069 14.2945 10.4867L15.8643 12.5286L13.2964 12.7284C13.0704 12.746 12.8644 12.8649 12.7361 13.0519L11.2792 15.1758L10.2957 12.7954C10.2091 12.5858 10.0324 12.4267 9.81491 12.3624L7.34469 11.6332L9.30473 9.96224C9.47729 9.81513 9.57403 9.59784 9.56789 9.37117Z"])'
        )
      );
      if (isSearchPage())
        result.push(
          addBlockCSS(
            'div[id^="douyin-header-menu"] >  div > div > div:has(span.semi-icon path[d="M9.10335 4.79386C8.86882 4.64984 8.57425 4.64585 8.3359 4.78346C8.09755 4.92108 7.95372 5.17818 7.96117 5.4533L8.05873 9.05336L5.31808 11.3898C5.10864 11.5683 5.01381 11.8473 5.07104 12.1165C5.12826 12.3857 5.32833 12.6019 5.59229 12.6798L9.0463 13.6995L10.4215 17.028C10.5266 17.2824 10.7625 17.4588 11.0362 17.4875C11.3099 17.5163 11.5774 17.3929 11.7331 17.1659L13.3237 14.8471L16.4638 19.3577L17.6949 18.5007L14.6505 14.1276L17.3608 13.9168C17.6352 13.8954 17.8758 13.7255 17.9878 13.4741C18.0997 13.2226 18.065 12.9301 17.8972 12.7119L15.7022 9.85673L16.5462 6.35562C16.6107 6.08806 16.5234 5.80667 16.3189 5.62251C16.1144 5.43835 15.8254 5.38101 15.566 5.47312L12.1723 6.67838L9.10335 4.79386ZM9.56789 9.37117L9.49812 6.79649L11.693 8.14425C11.8862 8.26291 12.1227 8.28777 12.3364 8.21188L14.7635 7.34991L14.16 9.85382C14.1068 10.0743 14.1563 10.3069 14.2945 10.4867L15.8643 12.5286L13.2964 12.7284C13.0704 12.746 12.8644 12.8649 12.7361 13.0519L11.2792 15.1758L10.2957 12.7954C10.2091 12.5858 10.0324 12.4267 9.81491 12.3624L7.34469 11.6332L9.30473 9.96224C9.47729 9.81513 9.57403 9.59784 9.56789 9.37117Z"])'
          )
        );
      else if (isLivePage())
        result.push(
          addBlockCSS(
            '#douyin-header header div[id^="douyin-header-menu"] pace-island[id^="island_"] .dy-tip-container:has(span.semi-icon)',
            '#douyin-header pace-island[id^="island"] > div[class] span:has(.semi-icon)'
          )
        );
      return result;
    },
    shieldRightMenu() {
      return [
        addBlockCSS(`div[id^="douyin-header-menu"]`),
        addStyle(`
      #douyin-header header>[data-click="doubleClick"]{
          margin-right: 0px !important;
      }
      #douyin-header header div:has(+[id^="douyin-header-menu"]){
          margin: auto !important;
          left: 0 !important;
          right: 0 !important;
      }
      `),
      ];
    },
    shieldRightMenuMore() {
      return addBlockCSS(
        `#douyin-header header div[id^="douyin-header-menu"] pace-island > div > div:has(path[d="M17 8.75H7V7.25H17V8.75ZM17 12.75H7V11.25H17V12.75ZM7 16.75H17V15.25H7V16.75Z"])`
      );
    },
    shieldRightMenuLoginAvatar() {
      return addBlockCSS(
        `#douyin-header header div[id^="douyin-header-menu"] pace-island > div > div:has(path[d="M6.484 43.177c4.765-5.408 11.743-8.821 19.517-8.821 7.775 0 14.753 3.413 19.517 8.821C40.754 48.587 33.776 52 26.001 52c-7.774 0-14.752-3.413-19.517-8.822zM35.287 21.356a9.286 9.286 0 1 1-18.571 0 9.286 9.286 0 0 1 18.571 0z"])`,
        `#douyin-header header div[id^="douyin-header-menu"] pace-island > div > div:has([data-e2e="live-avatar"])`
      );
    },
    shieldAISearch() {
      return addBlockCSS(`#douyin-header header div:has(>svg g[clip-path*="aiSearch"])`);
    },
  };
  var DouYinBlockAdaptation = { init() {} };
  var DouYinBlock = {
    init() {
      BlockLeftNavigator.init();
      BlockTopNavigator.init();
      BlockPlayerRightToolbar.init();
      DouYinBlockAdaptation.init();
    },
  };
  var DouYinChannel = { init() {} };
  var block_default =
    '/* 从顶部往下弹出的下载抖音电脑版的drawer提示 */\n#douyin-web-download-guide-container\n/* 视频信息区域的 及时接收作品更新提醒 下载电脑客户端 */\n/* 下载客户端，使用壁纸 */\ndiv:has(+#wallpaper-modal),\n/* 下载客户端，实时接收消息通知 */\n/* 下载客户端，实时接收好友消息 */\ndiv:has(> a[download*="douyin-downloade"]):has(+.popShadowAnimation),\ndiv:has(> a[download*="douyin-downloade"]):has(+div>[data-e2e="listDlgTest-container"]),\n/* 客户端登录访问更便捷 */\ndiv:has(> a[download*="douyin-downloade"]):has(+.userMenuPanelShadowAnimation),\n/* 前往电脑客户端，即享下载视频 */\n[data-e2e="video-share-container"] div:has(>div>div> a[download*="douyin-downloader"]):first-child,\n/* so.douyin.com的广告item */\n.card-item:has(.h5-ad-video-card),\n.card-item:has([data-is-ad="true"]),\n/* 左侧导航栏的下面的下载抖音精选 */\n[data-e2e="douyin-navigation"] div:has(>div:first-child>img[src*="douyin-pc-web"]),\n/* 左上角顶部的 抖音精选 */\n#douyin-navigation > a[href*="/jingxuan"]:empty,\n/* 直播页面 左侧导航栏的下面的下载抖音精选 */\n[data-e2e="douyin-navigation"] div:has(>div:only-child>img[src*="/webcast/douyin_live/media/"]),\n[data-e2e="douyin-navigation"] div:only-child:has(>img[src*="/webcast/douyin_live/media/"]) {\n  display: none !important;\n}\n';
  var DouYinGestureBackHashConfig = { videoCommentDrawer: "videoCommentDrawer" };
  var DouYinGestureBackClearHash = () => {
    const findValue = Object.values(DouYinGestureBackHashConfig).find((hash) => {
      return globalThis.location.hash.endsWith(hash);
    });
    if (findValue) {
      globalThis.location.hash = "";
      log.success(`发现残留的手势返回hash，已清理 ==> ` + findValue);
    }
  };
  var WAIT_TIMEOUT = 1e4;
  var WAIT_INTERVAL = 250;
  function getWaitTarget(target) {
    if (typeof target === "string") return selector(target) ?? null;
    if (typeof target === "function") return target() ?? null;
    return target ?? null;
  }
  var waitReactPropsToSet = async (target, reactPropNameOrNameList, checkOption) => {
    const optionList = Array.isArray(checkOption) ? checkOption : [checkOption];
    const propNameList = Array.isArray(reactPropNameOrNameList) ? reactPropNameOrNameList : [reactPropNameOrNameList];
    if (typeof target === "string") {
      if ((await waitNode(target, WAIT_TIMEOUT)) == null) {
        optionList.forEach((option) => {
          option.failWait?.(true);
        });
        return;
      }
    }
    const checkTarget = (option) => {
      const $el = getWaitTarget(target);
      if ($el == null)
        return {
          status: false,
          isTimeout: true,
          inst: void 0,
          $el: void 0,
        };
      const reactInst = getReactInstance($el);
      if (isNull(reactInst))
        return {
          status: false,
          isTimeout: false,
          inst: void 0,
          $el,
        };
      const matchedPropName = propNameList.find((propName) => {
        const reactPropInst = reactInst[propName];
        if (reactPropInst == null) return false;
        try {
          return option.check(reactPropInst, $el);
        } catch {
          return false;
        }
      });
      if (matchedPropName == null)
        return {
          status: false,
          isTimeout: false,
          inst: void 0,
          $el,
        };
      return {
        status: true,
        isTimeout: false,
        inst: reactInst[matchedPropName],
        $el,
      };
    };
    for (const option of optionList) {
      if (option.msg) log.info(option.msg);
      await waitPropertyByInterval(
        () => getWaitTarget(target),
        () => checkTarget(option).status,
        WAIT_INTERVAL,
        WAIT_TIMEOUT
      );
      const result = checkTarget(option);
      if (result.status) option.set(result.inst, result.$el);
      else option.failWait?.(result.isTimeout);
    }
  };
  var ReactUtils = { waitReactPropsToSet };
  var DouYinUser = {
    $inited: false,
    $uidApplied: false,
    $uidFailed: false,
    init() {
      if (!this.$inited) {
        this.$inited = true;
        addStyle(block_default);
      }
      DOMUtils.onReady(() => {
        Panel.execMenuOnce(
          "dy-user-addShowUserUID",
          () => {
            return this.addShowUserUID();
          },
          void 0,
          true
        );
      });
    },
    addShowUserUID() {
      const nodeClassName = "gm-user-uid";
      DouYinUser.$uidApplied = false;
      DouYinUser.$uidFailed = false;
      ReactUtils.waitReactPropsToSet(`[data-e2e="user-detail"] [data-e2e="user-info"]`, "reactFiber", {
        msg: "显示UID",
        check(reactInstance) {
          return typeof reactInstance?.return?.memoizedProps?.userInfo?.uid === "string";
        },
        set(reactInstance, $target) {
          const uid = reactInstance?.return?.memoizedProps?.userInfo?.uid;
          DouYinUser.$uidApplied = true;
          DouYinUser.$uidFailed = false;
          $target.querySelectorAll(`.${nodeClassName}`).forEach(($node) => {
            remove($node);
          });
          const $userUID = DOMUtils.createElement(
            "p",
            {
              className: nodeClassName,
              innerHTML: `
							<span>UID：${uid}</span>
						`,
            },
            {
              style:
                "color: var(--color-text-t3);margin-right: 20px;font-size: 12px;line-height: 20px;cursor: pointer;",
            }
          );
          DOMUtils.on($userUID, "click", (event) => {
            DOMUtils.preventEvent(event);
            utils.copy(uid);
            toast.success("复制成功");
          });
          $target.appendChild($userUID);
        },
        failWait(isTimeout) {
          if (isTimeout) return;
          DouYinUser.$uidFailed = true;
          log.error("显示UID：未能从用户资料卡取到 uid");
        },
      });
      return [
        () => {
          document.querySelectorAll(`.${nodeClassName}`).forEach(($node) => {
            remove($node);
          });
        },
      ];
    },
  };
  function parseDuration(duration) {
    const zeroPadding = function (num) {
      if (num < 10) return `0${num}`;
      else return num;
    };
    if (duration < 60) return `0:${zeroPadding(duration)}`;
    else if (duration < 3600) return `${Math.floor(duration / 60)}:${zeroPadding(duration % 60)}`;
    else {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor(duration / 60) % 60;
      const seconds = duration % 60;
      return `${hours}:${zeroPadding(minutes)}:${zeroPadding(seconds)}`;
    }
  }
  var DouYinVideoPlayer = {
    $qualityApplied: false,
    $qualityFailed: false,
    init() {
      DOMUtils.onReady(() => {
        Panel.exec(
          "dy-video-chooseVideoDefinition",
          () => {
            return this.chooseQuality(Panel.getValue("dy-video-chooseVideoDefinition"));
          },
          () =>
            DouYinRouter.isIndex() &&
            !DouYinRouter.isJingxuan() &&
            Panel.getValue("dy-video-chooseVideoDefinition") !== -999,
          true
        ).then((result) => {
          if (result)
            Panel.addUrlChangeWithExecMenuOnceListener("dy-video-chooseVideoDefinition", () => {
              result.reload();
            });
        });
        Panel.execMenuOnce(
          "dy-video-waitToRemovePauseDialog",
          () => {
            if (!DouYinRouter.isIndex() || DouYinRouter.isJingxuan()) return;
            return this.waitToRemovePauseDialog();
          },
          void 0,
          true
        );
        Panel.execMenuOnce("dy-video-allowSelectTitleText", () => {
          return this.allowSelectTitleText();
        });
        Panel.execMenuOnce(
          "dy-video-commentTimeJump",
          () => {
            if (!DouYinRouter.isIndex() || DouYinRouter.isJingxuan()) return;
            return this.commentTimeJump();
          },
          void 0,
          true
        );
        Panel.execMenuOnce(
          "dy-video-showLikeCommentCollectShareCount",
          () => {
            if (!DouYinRouter.isIndex() || DouYinRouter.isJingxuan()) return;
            return this.showCompleteLikeCommentCollectShareCount();
          },
          void 0,
          true
        );
      });
    },
    waitToRemovePauseDialog() {
      const notifiedSet = new WeakSet();
      const checkDialogToClose = ($ele) => {
        if (isScriptNode($ele)) return;
        const eleText = DOMUtils.text($ele);
        if (eleText.includes("长时间无操作") && eleText.includes("暂停播放")) {
          if (notifiedSet.has($ele)) return;
          notifiedSet.add($ele);
          toast.info(`出现【长时间无操作，已暂停播放】弹窗`);
          const $rect = utils.getReactInstance($ele);
          if (typeof $rect.reactProps === "object" && $rect.reactProps != null) {
            const closeDialogFn = utils.queryProperty($rect.reactProps, (obj) => {
              if (typeof obj?.["props"]?.["onClose"] === "function")
                return {
                  isFind: true,
                  data: obj["props"]["onClose"],
                };
              else {
                const children = obj?.["props"]?.["children"] ?? obj?.["children"];
                return {
                  isFind: false,
                  data: Array.isArray(children) ? children[0] : children,
                };
              }
            });
            if (typeof closeDialogFn === "function") {
              closeDialogFn();
              toast.success(`调用函数关闭【长时间无操作，已暂停播放】弹窗`);
            }
          }
        }
      };
      const waitToRemovePauseDialog = getDynamicValue("dy-video-waitToRemovePauseDialog");
      const lockFn = new utils.LockFunction(() => {
        if (!waitToRemovePauseDialog.value) return;
        [
          ...Array.from($$(`.basePlayerContainer xg-bar.xg-right-bar + div`)),
          ...Array.from($$(`.basePlayerContainer div:has(>div):contains("长时间无操作")`)),
        ].forEach(($elementTiming) => {
          checkDialogToClose($elementTiming);
        });
      }, 400);
      const observer = utils.mutationObserverBySelector([".basePlayerContainer"], {
        config: {
          subtree: true,
          childList: true,
        },
        immediate: true,
        callback: () => {
          lockFn.run();
        },
      });
      return [
        () => {
          observer?.disconnect();
        },
        waitToRemovePauseDialog.destroy,
      ];
    },
    allowSelectTitleText() {
      const listener = DOMUtils.on(
        document,
        ["pointerdown", "pointerup"],
        '.video-info-detail[data-e2e="video-info"] .title[data-e2e="video-desc"]',
        (evt) => {
          DOMUtils.preventEvent(evt, true);
        },
        {
          capture: true,
          overrideTarget: false,
        }
      );
      return [
        addStyle(`
      .video-info-detail[data-e2e="video-info"] .title[data-e2e="video-desc"]{
        user-select: all !important;
        pointer-events: auto !important;
      }
      `),
        () => {
          listener.off();
        },
      ];
    },
    commentTimeJump() {
      const transformTime = (time) => {
        const timeArr = time.split(":");
        if (timeArr.length !== 2 && timeArr.length !== 3) return;
        const second = parseInt(timeArr[timeArr.length - 1]);
        const minute = parseInt(timeArr[timeArr.length - 2]);
        return (timeArr.length === 3 ? parseInt(timeArr[0]) : 0) * 60 * 60 + minute * 60 + second;
      };
      const timeRegExpSource = "\\d{1,2}:[0-5][0-9]:[0-5][0-9]|[0-5]?[0-9]:[0-5][0-9]";
      const timeRegExpSearch = new RegExp(timeRegExpSource);
      const timeRegExpGlobal = new RegExp(timeRegExpSource, "g");
      const processCommentElement = ($comment) => {
        if ($comment.hasAttribute("data-dy-time-processed")) return;
        $comment.setAttribute("data-dy-time-processed", "true");
        const walker = document.createTreeWalker($comment, NodeFilter.SHOW_TEXT, {
          acceptNode: (node) => {
            const text = node.textContent || "";
            return timeRegExpSearch.test(text) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          },
        });
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) textNodes.push(node);
        textNodes.forEach((textNode) => {
          const originalText = textNode.textContent || "";
          let hasTimeMatch = false;
          const processedText = originalText.replace(timeRegExpGlobal, (match) => {
            const timestamp = transformTime(match);
            if (typeof timestamp === "number" && !isNaN(timestamp)) {
              hasTimeMatch = true;
              return `<span class="dy-comment-time" data-time="${timestamp}">${match}</span>`;
            }
            return match;
          });
          if (hasTimeMatch && processedText !== originalText) {
            const wrapper = DOMUtils.createElement("span", { innerHTML: processedText });
            const parent = textNode.parentNode;
            if (parent) parent.replaceChild(wrapper, textNode);
          }
        });
      };
      const handleTimeClick = (event, $click) => {
        if (!$click) return;
        DOMUtils.preventEvent(event);
        const timeStr = $click.getAttribute("data-time") || "0";
        const jumpTimeDuration = parseInt(timeStr);
        if (!isNaN(jumpTimeDuration) && jumpTimeDuration >= 0) {
          let $video = null;
          if (DouYinRouter.isVideo()) {
            const $videoContainer = $click.closest('[data-e2e="video-detail"]');
            if (!$videoContainer) {
              toast.error("未找到视频容器");
              return;
            }
            $video = $videoContainer.querySelector('[data-e2e="player-container"] video');
          } else {
            const $videoContainer = $click.closest(".sliderVideo") || $click.closest('[data-e2e="feed-active-video"]');
            if (!$videoContainer) {
              toast.error("未找到视频容器");
              return;
            }
            $video = $videoContainer.querySelector("video");
          }
          if (!$video) {
            toast.error("未找到视频元素");
            return;
          }
          const jumpTimeDurationStr = parseDuration(jumpTimeDuration);
          if (jumpTimeDuration > $video.duration) {
            toast.error(`该跳转时间超出视频最大播放时长: ${timeStr} => ${jumpTimeDurationStr}`);
            return;
          }
          $video.currentTime = jumpTimeDuration;
        }
      };
      const listener = DOMUtils.on(document, "click", ".dy-comment-time", handleTimeClick, {
        capture: true,
        overrideTarget: false,
      });
      const lockFn = new utils.LockFunction(() => {
        if (DouYinRouter.isLive()) return;
        $$('[data-e2e="comment-item"]:not([data-dy-time-processed])').forEach(($commentItem) => {
          processCommentElement($commentItem);
        });
      }, 400);
      const observer = utils.mutationObserverBySelector(['[data-e2e="comment-list"]'], {
        config: {
          subtree: true,
          childList: true,
        },
        immediate: true,
        callback: () => {
          lockFn.run();
        },
      });
      return [
        addStyle(`
        .dy-comment-time{
          cursor: pointer;
          color: #48a4ff;
          text-decoration: none;
        }
      `),
        () => {
          listener.off();
          observer?.disconnect();
          $$('[data-e2e="comment-item"][data-dy-time-processed]').forEach(($commentItem) => {
            $commentItem.removeAttribute("data-dy-time-processed");
          });
          $$('[data-e2e="comment-item"] .dy-comment-time').forEach(($time) => {
            DOMUtils.html($time, DOMUtils.text($time));
          });
        },
      ];
    },
    showCompleteLikeCommentCollectShareCount() {
      const lockFn = new utils.LockFunction(() => {
        [...$$(".basePlayerContainer:not([data-show-full-count])")].forEach(($basePlayerContainer) => {
          const basePlayerContainerReactFiber = utils.getReactInstance($basePlayerContainer)?.reactFiber;
          if (!basePlayerContainerReactFiber) {
            log.error("获取rectFiber属性失败", {
              $basePlayerContainer,
              basePlayerContainerReactFiber,
            });
            return;
          }
          const awemeInfo = utils.queryProperty(basePlayerContainerReactFiber, (target) => {
            if (typeof target.memoizedProps === "object" && target.memoizedProps != null) {
              if (typeof target.memoizedProps.awemeInfo === "object" && target.memoizedProps.awemeInfo != null)
                return {
                  isFind: true,
                  data: target.memoizedProps.awemeInfo,
                };
              else if (typeof target.return === "object" && target.return != null)
                return {
                  isFind: false,
                  data: target.return,
                };
              else
                return {
                  isFind: false,
                  data: null,
                };
            } else
              return {
                isFind: false,
                data: null,
              };
          });
          if (!awemeInfo) {
            log.error("获取awemeInfo属性失败", {
              $basePlayerContainer,
              basePlayerContainerReactFiber,
            });
            return;
          }
          const stats = awemeInfo.stats;
          if (!stats) {
            log.error("获取stats属性失败", {
              $basePlayerContainer,
              awemeInfo,
            });
            return;
          }
          let $digg, $comment, $collect, $share;
          if (DouYinRouter.isVideo()) {
            $digg = $(
              '[data-e2e="detail-video-info"] div:has(>[data-e2e="video-share-icon-container"]) > div:nth-child(1) > span:not(:has(>*))'
            );
            $comment = $(
              '[data-e2e="detail-video-info"] div:has(>[data-e2e="video-share-icon-container"]) > div:nth-child(2) > span:not(:has(>*))'
            );
            $collect = $(
              '[data-e2e="detail-video-info"] div:has(>[data-e2e="video-share-icon-container"]) > div:nth-child(3) > span:not(:has(>*))'
            );
            $share = $(
              '[data-e2e="detail-video-info"] div:has(>[data-e2e="video-share-icon-container"]) > div:nth-child(4) > span:not(:has(>*))'
            );
          } else {
            $digg = $basePlayerContainer.querySelector('[data-e2e="video-player-digg"] > div:last-child:not(:has(>*))');
            $comment = $basePlayerContainer.querySelector(
              '[data-e2e="feed-comment-icon"] > div:last-child:not(:has(>*))'
            );
            $collect = $basePlayerContainer.querySelector(
              '[data-e2e="video-player-collect"] > div:last-child:not(:has(>*))'
            );
            $share = $basePlayerContainer.querySelector(
              '[data-e2e="video-player-share"] > div:last-child:not(:has(>*))'
            );
          }
          let hasApplied = false;
          if ($digg) {
            DOMUtils.text($digg, stats.diggCount);
            hasApplied = true;
          }
          if ($comment) {
            DOMUtils.text($comment, stats.commentCount);
            hasApplied = true;
          }
          if ($collect) {
            DOMUtils.text($collect, stats.collectCount);
            hasApplied = true;
          }
          if ($share) {
            DOMUtils.text($share, stats.shareCount);
            hasApplied = true;
          }
          if (!hasApplied) {
            log.error("未找到点赞/评论/收藏/分享数量元素", { $basePlayerContainer });
            return;
          }
          $basePlayerContainer.setAttribute("data-show-full-count", "true");
        });
      }, 400);
      const observer = utils.mutationObserverBySelector(["#slidelist", '[data-e2e="video-detail"]'], {
        config: {
          subtree: true,
          childList: true,
        },
        immediate: true,
        callback: () => {
          lockFn.run();
        },
      });
      return () => {
        observer?.disconnect();
        $$(".basePlayerContainer[data-show-full-count]").forEach(($basePlayerContainer) => {
          $basePlayerContainer.removeAttribute("data-show-full-count");
        });
      };
    },
    chooseQuality(mode = 0) {
      log.info("选择视频清晰度: " + mode);
      const QualitySessionKey = "MANUAL_SWITCH";
      const choose = [
        {
          done: 1,
          gearClarity: "20",
          gearName: "超清 4K",
          gearType: -2,
          qualityType: 72,
        },
        {
          done: 1,
          gearClarity: "10",
          gearName: "超清 2K",
          gearType: -1,
          qualityType: 7,
        },
        {
          done: 1,
          gearClarity: "5",
          gearName: "高清 1080P",
          gearType: 1,
          qualityType: 2,
        },
        {
          done: 1,
          gearClarity: "4",
          gearName: "高清 720P",
          gearType: 2,
          qualityType: 15,
        },
        {
          done: 1,
          gearClarity: "3",
          gearName: "标清 540P",
          gearType: 3,
          qualityType: 21,
        },
        {
          done: 1,
          gearClarity: "2",
          gearName: "极速",
          gearType: 4,
          qualityType: 21,
        },
        {
          done: 1,
          gearClarity: "0",
          gearName: "智能",
          gearType: 0,
        },
        {
          done: -999,
          gearClarity: "-999",
          gearName: "无",
          gearType: -999,
        },
      ].find((item) => item.gearType === mode);
      const setVideoQuality = function (value) {
        _unsafeWindow.sessionStorage.setItem(
          QualitySessionKey,
          typeof value === "string" ? value : JSON.stringify(value)
        );
      };
      if (!choose) {
        DouYinVideoPlayer.$qualityApplied = false;
        DouYinVideoPlayer.$qualityFailed = true;
        log.error("该清晰度不存在: " + mode);
        return;
      }
      if (choose.gearName === "无") {
        DouYinVideoPlayer.$qualityApplied = false;
        DouYinVideoPlayer.$qualityFailed = false;
        return;
      }
      setVideoQuality(choose);
      DouYinVideoPlayer.$qualityApplied =
        _unsafeWindow.sessionStorage.getItem(QualitySessionKey) === JSON.stringify(choose);
      DouYinVideoPlayer.$qualityFailed = !DouYinVideoPlayer.$qualityApplied;
      if (!DouYinVideoPlayer.$qualityApplied) {
        log.error("设置当前视频的清晰度失败: " + choose.gearName);
        return;
      }
      log.success("设置当前视频的清晰度: " + choose.gearName);
      const intervalId = setInterval(() => {
        setVideoQuality(choose);
      }, 200);
      const stopTimerId = setTimeout(() => {
        clearInterval(intervalId);
      }, 5e3);
      return [
        () => {
          clearInterval(intervalId);
          clearTimeout(stopTimerId);
        },
      ];
    },
  };
  var FEATURE_CHECK_KEY = "dy-common-feature-check";
  var FIRST_CHECK_DELAY = 3e3;
  var PENDING_RETRY_DELAY = 4e3;
  var MAX_PENDING_ROUND = 3;
  var RECHECK_DELAY = 2500;
  var timerList = [];
  var pendingRound = 0;
  function clearTimers() {
    timerList.forEach((timer) => clearTimeout(timer));
    timerList = [];
  }
  function schedule(delay, callback) {
    const timer = setTimeout(() => {
      timerList = timerList.filter((item) => item !== timer);
      callback();
    }, delay);
    timerList.push(timer);
  }
  function findViewText(views, key) {
    for (const view of views)
      if (view.type === "container" || view.type === "deepMenu") {
        const result = findViewText(view.views, key);
        if (result != null) return result;
      } else if (view.type !== "own" && view.key === key && view.text != null && view.text !== "") return view.text;
  }
  function findMenuText(key) {
    for (const config of Panel.$data.contentConfigList) {
      const text = findViewText(config.views, key);
      if (text != null) return text;
    }
    return key;
  }
  var CHECK_OVERRIDES = {
    "live-chooseQuality": (defaultResult) => (Panel.getValue("live-chooseQuality") === "auto" ? true : defaultResult),
    "dy-user-addShowUserUID": () => {
      if (DouYinUser.$uidFailed) return false;
      if (DouYinUser.$uidApplied) return true;
      return "pending";
    },
    "dy-video-chooseVideoDefinition": () => {
      if (DouYinVideoPlayer.$qualityFailed) return false;
      if (DouYinVideoPlayer.$qualityApplied) return true;
      return "pending";
    },
  };
  function checkKey(key, resourceCount) {
    const defaultResult = resourceCount > 0;
    const override = CHECK_OVERRIDES[key];
    return override ? override(defaultResult) : defaultResult;
  }
  function getKeyDomain(key) {
    if (key.startsWith("live-") || key.startsWith("dy-live-")) return "live";
    if (key.startsWith("dy-video-")) return "video";
    if (key.startsWith("dy-user-")) return "user";
    return "common";
  }
  function getCurrentDomainList() {
    const domainList = ["common"];
    if (DouYinRouter.isLive()) {
      domainList.push("live");
      return domainList;
    }
    if (DouYinRouter.isUser()) {
      domainList.push("user");
      return domainList;
    }
    if (DouYinRouter.isIndex() && !DouYinRouter.isJingxuan()) domainList.push("video");
    return domainList;
  }
  function verifyReloadResult(failedList) {
    const stateMap = new Map(Panel.getMenuExecStateList().map((state) => [state.keyList.join(","), state]));
    const fixedNameList = [];
    const stillFailedNameList = [];
    for (const item of failedList) {
      const state = stateMap.get(item.key);
      if (state == null || !state.enable) continue;
      const result = checkKey(item.key, state.resourceCount);
      if (result === "pending") continue;
      (result ? fixedNameList : stillFailedNameList).push(item.text);
    }
    if (fixedNameList.length > 0) {
      log.success("功能自检：已重新生效", fixedNameList);
      toast.success(`已重新生效：${fixedNameList.join("、")}`, 5e3);
    }
    if (stillFailedNameList.length > 0) {
      log.error("功能自检：重新生效失败", stillFailedNameList);
      toast.error(`仍无法生效：${stillFailedNameList.join("、")}`, 8e3);
    }
  }
  function checkFeature(isManual) {
    let pendingCount = 0;
    const failedList = [];
    const domainList = getCurrentDomainList();
    for (const state of Panel.getMenuExecStateList()) {
      if (state.keyList.length !== 1 || !state.enable) continue;
      const key = state.keyList[0];
      if (!domainList.includes(getKeyDomain(key))) continue;
      const result = checkKey(key, state.resourceCount);
      if (result === "pending") {
        pendingCount++;
        continue;
      }
      if (!result)
        failedList.push({
          key,
          text: findMenuText(key),
          reload: state.reload,
        });
    }
    if (pendingCount > 0 && pendingRound < MAX_PENDING_ROUND) {
      pendingRound++;
      schedule(PENDING_RETRY_DELAY, () => checkFeature(isManual));
      return;
    }
    pendingRound = 0;
    if (failedList.length === 0) {
      if (isManual) toast.success("功能自检通过，未发现未生效的功能");
      else log.success("功能自检通过");
      return;
    }
    const nameList = failedList.map((item) => item.text);
    log.warn("功能自检发现未生效的功能", nameList);
    toast.warning(`检测到 ${failedList.length} 项功能未生效，正在尝试重新生效：${nameList.join("、")}`, 6e3);
    failedList.forEach((item) => item.reload());
    schedule(RECHECK_DELAY, () => verifyReloadResult(failedList));
  }
  var DouYinFeatureCheck = {
    init() {
      if (!Panel.getValue(FEATURE_CHECK_KEY)) return;
      clearTimers();
      pendingRound = 0;
      DOMUtils.onReady(() => {
        schedule(FIRST_CHECK_DELAY, () => checkFeature(false));
      });
    },
    runNow() {
      clearTimers();
      pendingRound = 0;
      checkFeature(true);
    },
  };
  var DouYinRouterChangeData = {
    beforeURL: void 0,
    currentURL: globalThis.location.href,
  };
  var USER_CHAT_METHODS = [
    "WebcastChatMessage",
    "WebcastEmojiChatMessage",
    "WebcastScreenChatMessage",
    "WebcastExhibitionChatMessage",
  ];
  var DouYinLiveMessageFilter = {
    key: "douyin-live-danmu-rule",
    key_blacklist_uid: "douyin-live-danmu-blacklist-uid",
    $data: {
      rule: [],
      block_gift: false,
      block_lucky_bag: false,
      block_emoji: false,
      block_room_message: false,
      only_fans_club: false,
      min_pay_grade: 0,
      blacklist_uid: "",
      blacklist: [],
      $blacklistTextarea: null,
      $ruleTextarea: null,
    },
    $inited: false,
    init() {
      this.initRule();
      this.initBlacklist();
      if (this.$inited) return;
      this.$inited = true;
      [
        {
          key: "live-danmu-shield-gift",
          callback: (v) => (this.$data.block_gift = v),
        },
        {
          key: "live-danmu-shield-lucky-bag",
          callback: (v) => (this.$data.block_lucky_bag = v),
        },
        {
          key: "live-message-shield-method-emoji-chat",
          callback: (v) => (this.$data.block_emoji = v),
        },
        {
          key: "live-message-shield-room-message",
          callback: (v) => (this.$data.block_room_message = v),
        },
        {
          key: "live-danmu-shield-only-fans-club",
          callback: (v) => (this.$data.only_fans_club = v),
        },
        {
          key: "live-danmu-shield-min-pay-grade",
          callback: (v) => (this.$data.min_pay_grade = Number(v) || 0),
        },
      ].forEach((item) => {
        Panel.addValueChangeListener(
          item.key,
          (_, value) => {
            item.callback(value);
          },
          { immediate: true }
        );
      });
    },
    initRule() {
      this.$data.rule.length = 0;
      this.get()
        .trim()
        .split("\n")
        .forEach((item) => {
          if (item.trim() == "") return;
          item = item.trim();
          let itemRegExp;
          try {
            itemRegExp = new RegExp(item);
          } catch (error) {
            log.warn("忽略无法解析的屏蔽规则：", item, error);
            return;
          }
          this.$data.rule.push(itemRegExp);
        });
    },
    initBlacklist() {
      const value = this.getBlacklist();
      this.$data.blacklist_uid = value;
      this.$data.blacklist = this.compileBlacklist(value);
      const $textarea = this.$data.$blacklistTextarea;
      if ($textarea?.isConnected && document.activeElement !== $textarea) $textarea.value = value;
    },
    compileBlacklist(rawBlacklist) {
      return String(rawBlacklist || "")
        .split(/[\s,;]+/)
        .map((item) => item.trim())
        .filter((item) => item && item.charAt(0) !== "#");
    },
    getBlacklist() {
      return _GM_getValue(this.key_blacklist_uid, "");
    },
    setBlacklist(value) {
      this.$data.blacklist_uid = value;
      this.$data.blacklist = this.compileBlacklist(value);
      _GM_setValue(this.key_blacklist_uid, value);
      if (this.$data.$blacklistTextarea?.isConnected) this.$data.$blacklistTextarea.value = value;
    },
    addBlacklistUid(uid) {
      if (!uid) return false;
      if (!this.$data.blacklist_uid) this.initBlacklist();
      if (this.$data.blacklist.includes(uid)) return false;
      const lines = String(this.$data.blacklist_uid || "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);
      lines.push(uid);
      this.setBlacklist(lines.join("\n"));
      return true;
    },
    addRule(text) {
      const ruleText = String(text || "").trim();
      if (!ruleText) return false;
      const lines = this.get()
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);
      if (lines.includes(ruleText)) return false;
      lines.push(ruleText);
      const next = lines.join("\n");
      this.set(next);
      this.initRule();
      if (this.$data.$ruleTextarea?.isConnected) this.$data.$ruleTextarea.value = next;
      return true;
    },
    isUserChat(method) {
      return typeof method === "string" && USER_CHAT_METHODS.includes(method);
    },
    getCurrentAnchorId() {
      try {
        const anchor = _unsafeWindow["__STORE__"]?.roomStore?.roomInfo?.anchor;
        if (!anchor) return "";
        return String(anchor.id_str || anchor.idStr || anchor.id || "");
      } catch (error) {
        return "";
      }
    },
    getUserId(user) {
      if (!user) return "";
      return String(user.id || user.id_str || "");
    },
    isCurrentAnchorFansClub(user) {
      const fansClubData = user?.fans_club?.data;
      if (!(Number(fansClubData?.level || 0) > 0)) return false;
      const clubAnchorId = String(fansClubData?.anchor_id || "");
      const anchorId = this.getCurrentAnchorId();
      if (anchorId) return clubAnchorId === anchorId;
      return clubAnchorId !== "" && clubAnchorId !== "0";
    },
    change() {
      this.execMessageFilterWithNode(
        Array.from($$("#chatroom .webcast-chatroom .webcast-chatroom___item:not([data-is-filter])"))
      );
    },
    getMessageInstance($danmu) {
      const $row = $danmu.closest("[data-index]");
      if (!$row) return;
      const index = parseInt($row.getAttribute("data-index") || "", 10);
      if (!(index >= 0)) return;
      let fiber = utils.getReactInstance($danmu)?.reactFiber;
      for (let depth = 0; depth < 20 && fiber; depth++) {
        const props = fiber.memoizedProps;
        if (props && Array.isArray(props.originalList)) return props.originalList[index];
        fiber = fiber.return;
      }
    },
    execMessageFilterWithNode(messageQueue) {
      for (let index = 0; index < messageQueue.length; index++) {
        const $danmu = messageQueue[index];
        const messageIns = this.getMessageInstance($danmu);
        if (messageIns == null) continue;
        if (this.checkMessageFilter(messageIns)) {
          $danmu.setAttribute("data-is-filter", "true");
          DOMUtils.remove($danmu);
        }
      }
    },
    checkMessageFilter(messageInst, method) {
      const payload = messageInst?.payload;
      const message = payload?.content || payload?.common?.describe;
      method = method ?? messageInst?.method ?? payload?.common?.method;
      const chat_by = payload?.chat_by;
      const biz_scene = payload?.biz_scene;
      const public_area_common = payload?.public_area_common || {};
      let flag = false;
      const user = payload?.user;
      if (this.isUserChat(method)) {
        if (this.$data.blacklist.length !== 0) {
          const uid = this.getUserId(user);
          if (uid && this.$data.blacklist.includes(uid)) flag = true;
        }
        if (!flag && this.$data.only_fans_club && !this.isCurrentAnchorFansClub(user)) flag = true;
        if (!flag && this.$data.min_pay_grade > 0) {
          if (!(Number(user?.pay_grade?.level || 0) >= this.$data.min_pay_grade)) flag = true;
        }
      }
      if (!flag) {
        if (method === "WebcastGiftMessage") {
          if (this.$data.block_gift) flag = true;
        } else if (method === "WebcastChatMessage") {
          if (
            chat_by === "9" ||
            chat_by === "10" ||
            Object.keys(public_area_common?.individual_strategy_result || {}).length !== 0
          ) {
            if (this.$data.block_lucky_bag) flag = true;
          } else if (chat_by === "0" || chat_by === "5" || chat_by === "11") {
          }
        } else if (method === "WebcastRoomMessage") {
          if (this.$data.block_room_message) flag = true;
          if (biz_scene === "live_recommend" || payload?.system_top_msg) {
          }
        } else if (method === "WebcastEmojiChatMessage") {
          if (this.$data.block_emoji) flag = true;
        }
      }
      if (!flag)
        flag =
          typeof message === "string" &&
          this.$data.rule.some((ruleText) => {
            if (message.match(ruleText)) return true;
          });
      return flag;
    },
    set(value) {
      _GM_setValue(this.key, value);
    },
    get() {
      return _GM_getValue(this.key, "");
    },
  };
  var DouYinLiveMessage = {
    filterMessage() {
      const runFilter = () => {
        if (!DouYinRouter.isLive()) return;
        DouYinLiveMessageFilter.change();
      };
      DouYinLiveMessageFilter.init();
      const observer = mutationObserverBySelector(["#chatroom"], {
        config: {
          childList: true,
          subtree: true,
        },
        immediate: true,
        callback: () => {
          runFilter();
        },
      });
      return [
        addStyle(`
				/* 修复一下聊天室屏蔽了某些聊天导致上下抖动不停 */
				#chatroom .webcast-chatroom___list > div {
					height: 100% !important;
				}
			`),
        () => observer?.disconnect(),
      ];
    },
    execFilter(messageInst, method) {
      return DouYinLiveMessageFilter.checkMessageFilter(messageInst, method);
    },
  };
  var HOOK_FLAG = "__dyLiteHookedDecode";
  var uninstallHook = null;
  var DouYinHook = {
    hookLiveMessageDecoder() {
      uninstallHook?.();
      uninstallHook = null;
      DouYinLiveMessageFilter.init();
      const getDecoder = () => {
        return _unsafeWindow["__MESSAGE_INSTANCE__"]?.decoder;
      };
      const hookedDecoderList = [];
      const tryHook = () => {
        const decoder = getDecoder();
        if (decoder == null || typeof decoder !== "object" || typeof decoder.decode !== "function") return false;
        if (decoder.decode[HOOK_FLAG] === true) return true;
        const originDecode = decoder.decode;
        const hookedDecode = async function (...args) {
          const [_, method] = args;
          const payload = await Reflect.apply(originDecode, this, args);
          try {
            const flag = await DouYinLiveMessage.execFilter({ payload }, method);
            if (typeof flag === "boolean" && flag) return {};
          } catch (error) {
            log.error("直播消息过滤失败：", error);
          }
          return payload;
        };
        Reflect.set(hookedDecode, HOOK_FLAG, true);
        decoder.decode = hookedDecode;
        hookedDecoderList.push({
          decoder,
          originDecode,
          hookedDecode,
        });
        log.success("hook live message decode success");
        return true;
      };
      if (!tryHook()) log.info("等待直播消息解码器创建");
      const timer = setInterval(() => {
        if (document.hidden) return;
        tryHook();
      }, 500);
      const uninstall = () => {
        clearInterval(timer);
        for (let index = hookedDecoderList.length - 1; index >= 0; index--) {
          const { decoder, originDecode, hookedDecode } = hookedDecoderList[index];
          if (decoder.decode === hookedDecode) decoder.decode = originDecode;
          hookedDecoderList.splice(index, 1);
        }
        if (uninstallHook === uninstall) uninstallHook = null;
      };
      uninstallHook = uninstall;
      return [uninstall, ...DouYinLiveMessage.filterMessage()];
    },
  };
  var DouYinLiveBlock_ChatRoom = {
    init() {
      Panel.execMenuOnce("dy-live-shieldMessage", () => {
        return this.shieldMessage();
      });
      Panel.execMenuOnce("dy-live-blockBottomArea", () => {
        return this.blockBottomArea();
      });
    },
    shieldMessage() {
      return addBlockCSS(
        "#chatroom .webcast-chatroom___bottom-message",
        "#chatroom .webcast-chatroom___bottom_message",
        "#chatroom .webcast-chatroom__room-message",
        '#chatroom > div > div > div:has(div[style*="background-image"])'
      );
    },
    blockBottomArea() {
      return addStyle(`
      .webcast-chatroom___list{
        clip-path: none !important;
      }
    `);
    },
  };
  var DouYinLiveBlock = {
    init() {
      DouYinLiveBlock_ChatRoom.init();
    },
  };
  var OVERLAY_ID = "dy-lite-confirm";
  var CONFIRM_CSS = `
#${OVERLAY_ID} {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  animation: dy-lite-confirm-in 0.15s ease-out;
}
#${OVERLAY_ID} .dy-lite-confirm-panel {
  box-sizing: border-box;
  width: 320px;
  max-width: calc(100vw - 32px);
  padding: 16px;
  border-radius: 8px;
  background: #1f1f26;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.32);
  color: #f2f2f4;
  font-size: 13px;
  line-height: 1.5;
  user-select: none;
}
#${OVERLAY_ID} .dy-lite-confirm-title {
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 500;
}
#${OVERLAY_ID} .dy-lite-confirm-message {
  color: rgba(255, 255, 255, 0.72);
  word-break: break-all;
}
#${OVERLAY_ID} .dy-lite-confirm-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}
#${OVERLAY_ID} .dy-lite-confirm-footer > button {
  box-sizing: border-box;
  min-width: 72px;
  padding: 7px 16px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.2;
  cursor: pointer;
}
#${OVERLAY_ID} .dy-lite-confirm-cancel {
  background: rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.85);
}
#${OVERLAY_ID} .dy-lite-confirm-cancel:hover {
  background: rgba(255, 255, 255, 0.22);
}
#${OVERLAY_ID} .dy-lite-confirm-ok {
  background: #fe2c55;
  color: #fff;
}
#${OVERLAY_ID} .dy-lite-confirm-ok:hover {
  background: #e62a50;
}
@keyframes dy-lite-confirm-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`;
  var closeCurrent = null;
  var keydownBound = false;
  function onDocumentKeyDown(event) {
    if (event.key !== "Escape" || !closeCurrent) return;
    event.preventDefault();
    event.stopPropagation();
    closeCurrent(false);
  }
  function confirm(message, option = {}) {
    addStyle(CONFIRM_CSS);
    if (!keydownBound) {
      keydownBound = true;
      document.addEventListener("keydown", onDocumentKeyDown, true);
    }
    closeCurrent?.(false);
    return new Promise((resolve) => {
      const $overlay = document.createElement("div");
      $overlay.id = OVERLAY_ID;
      $overlay.setAttribute(SCRIPT_NODE_ATTR, "1");
      const $panel = document.createElement("div");
      $panel.className = "dy-lite-confirm-panel";
      const $title = document.createElement("div");
      $title.className = "dy-lite-confirm-title";
      $title.textContent = option.title ?? "提示";
      const $message = document.createElement("div");
      $message.className = "dy-lite-confirm-message";
      $message.textContent = message;
      const $cancel = document.createElement("button");
      $cancel.type = "button";
      $cancel.className = "dy-lite-confirm-cancel";
      $cancel.textContent = option.cancelText ?? "取消";
      const $ok = document.createElement("button");
      $ok.type = "button";
      $ok.className = "dy-lite-confirm-ok";
      $ok.textContent = option.confirmText ?? "确定";
      const $footer = document.createElement("div");
      $footer.className = "dy-lite-confirm-footer";
      $footer.appendChild($cancel);
      $footer.appendChild($ok);
      $panel.appendChild($title);
      $panel.appendChild($message);
      $panel.appendChild($footer);
      $overlay.appendChild($panel);
      const finish = (result) => {
        if (closeCurrent !== finish) return;
        closeCurrent = null;
        $overlay.remove();
        resolve(result);
      };
      $overlay.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();
          if (event.target === $ok) finish(true);
          else if (event.target === $cancel || event.target === $overlay) finish(false);
        },
        true
      );
      $overlay.addEventListener("mousedown", (event) => event.stopPropagation(), true);
      (document.fullscreenElement ?? document.body ?? document.documentElement).appendChild($overlay);
      closeCurrent = finish;
      $ok.focus();
    });
  }
  var BLOCK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.9" stroke="currentColor" stroke-width="1.3"/><path d="M4.2 11.8 11.8 4.2" stroke="currentColor" stroke-width="1.3"/></svg>`;
  var BLOCK_API_PATH = "/aweme/v1/web/user/block/";
  var BLOCK_TYPE_BLOCK = 1;
  function getWebpackChunk() {
    const win = _unsafeWindow;
    const keyList = Object.keys(win);
    for (let index = 0; index < keyList.length; index++) {
      const key = keyList[index];
      if (key.indexOf("webpackChunk") !== 0) continue;
      const chunk = win[key];
      if (Array.isArray(chunk) && typeof chunk.push === "function") return chunk;
    }
    return null;
  }
  function captureWebpackRequire() {
    const chunk = getWebpackChunk();
    if (!chunk) return null;
    let req = null;
    try {
      chunk.push([
        ["dy-lite-user-block-" + Date.now()],
        {},
        (runtimeRequire) => {
          req = runtimeRequire;
        },
      ]);
    } catch (error) {
      return null;
    }
    return typeof req === "function" ? req : null;
  }
  var DouYinUserBlock = {
    $req: null,
    $blockFunction: null,
    getRequire() {
      if (this.$req?.m) return this.$req;
      this.$req = captureWebpackRequire();
      return this.$req;
    },
    locate() {
      if (typeof this.$blockFunction === "function") return true;
      const req = this.getRequire();
      const modules = req?.m;
      if (!req || !modules) return false;
      const moduleIdList = Object.keys(modules);
      for (let index = 0; index < moduleIdList.length; index++) {
        const moduleId = moduleIdList[index];
        let moduleSource = "";
        try {
          moduleSource = String(modules[moduleId]);
        } catch (error) {
          continue;
        }
        if (moduleSource.indexOf(BLOCK_API_PATH) === -1) continue;
        let moduleExports = null;
        try {
          moduleExports = req(moduleId);
        } catch (error) {
          continue;
        }
        if (moduleExports == null || typeof moduleExports !== "object") continue;
        const exportKeyList = Object.keys(moduleExports);
        for (let exportIndex = 0; exportIndex < exportKeyList.length; exportIndex++) {
          const exportValue = moduleExports[exportKeyList[exportIndex]];
          if (typeof exportValue !== "function") continue;
          if (String(exportValue).indexOf(BLOCK_API_PATH) === -1) continue;
          this.$blockFunction = exportValue;
          log.info("[拉黑] 已定位到抖音拉黑接口，模块 id：" + moduleId);
          return true;
        }
      }
      return false;
    },
    async blockUser(params) {
      const userId = String(params.userId || "");
      const secUserId = String(params.secUserId || "");
      if (!userId && !secUserId)
        return {
          success: false,
          message: "没取到该用户的 id",
        };
      if (!this.locate())
        return {
          success: false,
          message: "没找到抖音的拉黑接口，请再点一次重试",
        };
      try {
        const response = await this.$blockFunction(userId, secUserId, BLOCK_TYPE_BLOCK);
        if (response && Number(response.status_code) === 0)
          return {
            success: true,
            message: "已拉黑",
          };
        return {
          success: false,
          message: String((response && response.status_msg) || "拉黑失败，请稍后重试"),
        };
      } catch (error) {
        log.error("[拉黑] 拉黑请求失败：", error);
        return {
          success: false,
          message: "拉黑请求失败，请稍后重试",
        };
      }
    },
  };
  var DOUYIN_RED$2 = "#fe2c55";
  var DouYinLiveBlockUid = {
    blockAttribute: "data-dy-live-block-uid",
    $lastChatUser: null,
    $inited: false,
    init() {
      if (this.$inited) return;
      this.$inited = true;
      document.addEventListener(
        "click",
        (event) => {
          this.setLastChatItem(event);
        },
        true
      );
      document.addEventListener(
        "contextmenu",
        (event) => {
          this.setLastChatItem(event);
        },
        true
      );
      setInterval(() => {
        if (document.hidden || !DouYinRouter.isLive()) return;
        this.scanMenu();
      }, 500);
    },
    setLastChatItem(event) {
      const $target = event.target;
      if (!($target instanceof HTMLElement)) return;
      const $item = $target.closest(".webcast-chatroom___item");
      if ($item) this.$lastChatUser = this.getItemUser($item);
    },
    getItemUser($item) {
      if (!$item) return null;
      const $row = $item.closest("[data-index]");
      if (!$row) return null;
      const index = parseInt($row.getAttribute("data-index") || "", 10);
      if (!(index >= 0)) return null;
      let fiber = utils.getReactInstance($item)?.reactFiber;
      let $listProps = null;
      for (let depth = 0; depth < 20 && fiber; depth++) {
        const props = fiber.memoizedProps;
        if (props && Array.isArray(props.originalList)) {
          $listProps = props;
          break;
        }
        fiber = fiber.return;
      }
      if (!$listProps) return null;
      const message = $listProps.originalList[index];
      return (message && (message.payload?.user || message.user)) || null;
    },
    async blockCurrentUser() {
      const user = this.$lastChatUser;
      this.$lastChatUser = null;
      const uid = DouYinLiveMessageFilter.getUserId(user);
      this.closeMenu();
      if (!uid) {
        toast.error("没取到这条发言的uid，请到设置面板中手动添加");
        return;
      }
      if (!(await confirm("确定要屏蔽该用户吗？屏蔽后不再显示其发言，并同时拉黑对方。"))) return;
      const secUid = String(user?.sec_uid || user?.secUid || "");
      const isNewUid = DouYinLiveMessageFilter.addBlacklistUid(uid);
      const blockResult = await DouYinUserBlock.blockUser({
        userId: uid,
        secUserId: secUid,
      });
      const shieldText = isNewUid ? `已屏蔽 uid ${uid}` : `uid ${uid} 已在屏蔽列表中`;
      if (blockResult.success) toast.success(`${shieldText}，并已拉黑 TA`, 4e3);
      else toast.warning(`${shieldText}（拉黑失败：${blockResult.message}）`, 5e3);
    },
    closeMenu() {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    },
    buildBlockItem($sample) {
      const $item = document.createElement("li");
      $item.className = $sample.className;
      $item.setAttribute("role", "menuitem");
      $item.setAttribute("tabindex", "0");
      $item.setAttribute("aria-disabled", "false");
      $item.setAttribute(SCRIPT_NODE_ATTR, "1");
      $item.setAttribute(this.blockAttribute, "1");
      $item.innerHTML = `<div class="semi-dropdown-item-icon">${BLOCK_ICON}</div>屏蔽 TA`;
      $item.style.color = DOUYIN_RED$2;
      const $icon = $item.querySelector(".semi-dropdown-item-icon");
      if ($icon) $icon.style.color = DOUYIN_RED$2;
      $item.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.blockCurrentUser();
        },
        true
      );
      return $item;
    },
    scanMenu() {
      const $menuList = document.querySelectorAll("ul.semi-dropdown-menu");
      for (let index = 0; index < $menuList.length; index++) {
        const $menu = $menuList[index];
        const text = $menu.textContent || "";
        if (text.indexOf("资料卡") === -1 || text.indexOf("回复") === -1) continue;
        if ($menu.querySelector(`li[${this.blockAttribute}]`)) continue;
        const $sample = $menu.querySelector("li.semi-dropdown-item");
        if (!$sample) continue;
        $menu.appendChild(this.buildBlockItem($sample));
      }
    },
  };
  var BUTTON_ID = "dy-live-block-word";
  var BLOCK_WORD_CSS = `
#${BUTTON_ID}{
  position: fixed !important;
  z-index: 2147483647 !important;
  display: none !important;
  align-items: center !important;
  gap: 4px !important;
  box-sizing: border-box !important;
  height: 28px !important;
  padding: 0 10px !important;
  margin: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 6px !important;
  background: rgba(28, 28, 34, 0.92) !important;
  color: #fe2c55 !important;
  font-size: 13px !important;
  line-height: 1 !important;
  white-space: nowrap !important;
  cursor: pointer !important;
  opacity: 1 !important;
  -webkit-user-select: none !important;
  user-select: none !important;
}
#${BUTTON_ID}[data-show="true"]{
  display: flex !important;
}
#${BUTTON_ID}:hover{
  background: rgba(54, 54, 64, 0.96) !important;
  border-color: rgba(254, 44, 85, 0.55) !important;
  color: #ff4d6d !important;
  opacity: 1 !important;
}
#${BUTTON_ID} svg{
  display: block !important;
  width: 14px !important;
  height: 14px !important;
  opacity: 1 !important;
}
`;
  var DouYinLiveBlockWord = {
    $button: null,
    selectedText: "",
    $clickingButton: false,
    $inited: false,
    init() {
      if (this.$inited) return;
      this.$inited = true;
      addStyle(BLOCK_WORD_CSS);
      document.addEventListener(
        "mousedown",
        (event) => {
          if (this.isButtonTarget(event.target)) {
            this.$clickingButton = true;
            return;
          }
          this.hideButton();
        },
        true
      );
      document.addEventListener(
        "mouseup",
        (event) => {
          if (this.$clickingButton) {
            this.$clickingButton = false;
            return;
          }
          if (this.isButtonTarget(event.target)) return;
          setTimeout(() => {
            this.updateButtonBySelection();
          }, 0);
        },
        true
      );
      window.addEventListener(
        "scroll",
        () => {
          this.hideButton();
        },
        true
      );
    },
    isButtonTarget($target) {
      if (!($target instanceof Node) || !this.$button) return false;
      return $target === this.$button || this.$button.contains($target);
    },
    updateButtonBySelection() {
      const selection = window.getSelection();
      const text = selection ? String(selection).trim() : "";
      if (!text || !selection || selection.rangeCount === 0) {
        this.hideButton();
        return;
      }
      const range = selection.getRangeAt(0);
      const $container = range.commonAncestorContainer;
      if (
        !($container.nodeType === Node.ELEMENT_NODE ? $container : $container.parentElement)?.closest(
          "#chatroom .webcast-chatroom"
        )
      ) {
        this.hideButton();
        return;
      }
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        this.hideButton();
        return;
      }
      this.selectedText = text;
      const $button = this.getButton();
      $button.setAttribute("data-show", "true");
      const btnRect = $button.getBoundingClientRect();
      let left = rect.left + rect.width / 2 - btnRect.width / 2;
      left = Math.min(Math.max(8, left), window.innerWidth - btnRect.width - 8);
      let top = rect.top - btnRect.height - 8;
      if (top < 8) top = rect.bottom + 8;
      $button.style.setProperty("left", `${left}px`, "important");
      $button.style.setProperty("top", `${top}px`, "important");
    },
    blockSelectedWord() {
      const text = this.selectedText;
      this.hideButton();
      if (!text) return;
      const ruleText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (DouYinLiveMessageFilter.addRule(ruleText)) toast.success(`已添加屏蔽规则：${text}`, 4e3);
      else toast.success(`${text} 已在屏蔽规则中`, 4e3);
    },
    getButton() {
      if (this.$button?.isConnected) return this.$button;
      const $button = DOMUtils.createElement("button", {
        id: BUTTON_ID,
        type: "button",
        title: "将该词加入「聊天室消息过滤器」的屏蔽规则",
        innerHTML: `${BLOCK_ICON}<span>屏蔽该词</span>`,
      });
      DOMUtils.on($button, "mousedown", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      DOMUtils.on($button, "click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.blockSelectedWord();
      });
      document.body.appendChild($button);
      this.$button = $button;
      return $button;
    },
    hideButton() {
      this.selectedText = "";
      this.$button?.setAttribute("data-show", "false");
    },
  };
  function UIInputNumber(
    text,
    key,
    defaultValue,
    description,
    changeCallback,
    placeholder = "",
    afterAddToUListCallBack,
    valueChangeCallback
  ) {
    setDefaultValue(key, defaultValue);
    return {
      type: "inputNumber",
      text,
      key,
      defaultValue,
      description,
      placeholder,
      changeCallback,
      valueChangeCallback,
      afterAddToUListCallBack,
    };
  }
  function UIOwn(createLIElement) {
    return {
      type: "own",
      createLIElement,
    };
  }
  function UISwitch(
    text,
    key,
    defaultValue = false,
    clickCallBack,
    description,
    afterAddToUListCallBack,
    disabled,
    valueChangeCallback
  ) {
    setDefaultValue(key, defaultValue);
    if (disabled) addDisabledKey(key);
    return {
      type: "switch",
      text,
      key,
      defaultValue,
      description,
      disabled,
      clickCallBack,
      valueChangeCallback,
      afterAddToUListCallBack,
    };
  }
  var PanelLiveMessageFilterViews = [
    {
      type: "container",
      text: "",
      views: [
        UISwitch("启用", "live-danmu-shield-rule-enable"),
        UISwitch("【屏蔽】送礼信息", "live-danmu-shield-gift"),
        UISwitch("【屏蔽】福袋口令", "live-danmu-shield-lucky-bag"),
        UISwitch("【屏蔽】emoji|图片|表情包", "live-message-shield-method-emoji-chat"),
        UISwitch(
          "【屏蔽】信息播报",
          "live-message-shield-room-message",
          false,
          void 0,
          "如：xxx 为主播加了 xx分、恭喜xxx等"
        ),
        UISwitch(
          "仅显示当前主播粉丝团发言",
          "live-danmu-shield-only-fans-club",
          false,
          void 0,
          "只保留当前主播粉丝团成员的发言，其余全部过滤"
        ),
        UIInputNumber(
          "消费等级下限",
          "live-danmu-shield-min-pay-grade",
          0,
          "消费等级低于该值的用户发言将被过滤，0 = 不启用"
        ),
      ],
    },
    {
      type: "container",
      text: "",
      views: [
        UIOwn(($li) => {
          $li.style.display = "flex";
          $li.style.flexDirection = "column";
          $li.style.alignItems = "stretch";
          $li.style.gap = "8px";
          const $desc = DOMUtils.createElement("div", {
            className: "dyl-panel-item-text",
            innerHTML: `<p class="dyl-panel-item-text-main">屏蔽用户uid</p><p class="dyl-panel-item-text-desc">直播聊天室中可通过右键菜单「屏蔽 TA」快速添加</p>`,
          });
          const $textareaWrapper = DOMUtils.createElement("div", { className: "dyl-panel-textarea" });
          const textarea = DOMUtils.createElement(
            "textarea",
            {},
            {
              placeholder: "请输入需要屏蔽的用户uid，每行一个\n例如：\n123456789\n987654321",
              style: "height:200px;",
            }
          );
          $textareaWrapper.append(textarea);
          textarea.value = DouYinLiveMessageFilter.getBlacklist();
          DouYinLiveMessageFilter.$data.$blacklistTextarea = textarea;
          DOMUtils.on(
            textarea,
            ["input", "propertychange"],
            utils.debounce(function () {
              DouYinLiveMessageFilter.setBlacklist(textarea.value);
            }, 1e3)
          );
          $li.appendChild($desc);
          $li.appendChild($textareaWrapper);
          return $li;
        }),
      ],
    },
    {
      type: "container",
      text: "",
      views: [
        UIOwn(($li) => {
          const $textareaWrapper = DOMUtils.createElement("div", { className: "dyl-panel-textarea" });
          const textarea = DOMUtils.createElement(
            "textarea",
            {},
            {
              placeholder: "请输入屏蔽规则，每行一个\n例如：屏蔽包含'主播'的消息\n主播",
              style: "height:350px;",
            }
          );
          $textareaWrapper.append(textarea);
          textarea.value = DouYinLiveMessageFilter.get();
          DouYinLiveMessageFilter.$data.$ruleTextarea = textarea;
          DOMUtils.on(
            textarea,
            ["input", "propertychange"],
            utils.debounce(function () {
              DouYinLiveMessageFilter.set(textarea.value);
              DouYinLiveMessageFilter.initRule();
            }, 1e3)
          );
          $li.appendChild($textareaWrapper);
          return $li;
        }),
      ],
    },
  ];
  var ENTRY_ID = "dy-live-message-filter-entry";
  var POSITION_STORAGE_KEY = "dy-live-message-filter-entry-position";
  var DRAG_THRESHOLD = 4;
  var ENTRY_SIZE = 40;
  var ENTRY_CSS = `
#${ENTRY_ID}{
  position: fixed !important;
  z-index: 2147483646 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
  width: ${ENTRY_SIZE}px !important;
  height: ${ENTRY_SIZE}px !important;
  padding: 0 !important;
  margin: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 50% !important;
  background: rgba(28, 28, 34, 0.92) !important;
  color: #fe2c55 !important;
  cursor: grab !important;
  opacity: 1 !important;
  touch-action: none !important;
  -webkit-user-select: none !important;
  user-select: none !important;
  transition: background 0.2s, border-color 0.2s !important;
}
#${ENTRY_ID}:hover{
  background: rgba(54, 54, 64, 0.96) !important;
  border-color: rgba(254, 44, 85, 0.55) !important;
  color: #ff4d6d !important;
  opacity: 1 !important;
}
#${ENTRY_ID}[data-dragging="true"]{
  cursor: grabbing !important;
}
#${ENTRY_ID}[data-enable="false"]{
  color: rgba(255, 255, 255, 0.3) !important;
}
#${ENTRY_ID} svg{
  display: block !important;
  width: 20px !important;
  height: 20px !important;
  opacity: 1 !important;
  pointer-events: none !important;
}
`;
  var FILTER_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M2.5 3.2h11a.6.6 0 0 1 .47.97l-4.07 5.1v3.9a.6.6 0 0 1-.9.53l-2-1.1a.6.6 0 0 1-.3-.53V9.27L2.03 4.17A.6.6 0 0 1 2.5 3.2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
  var DouYinLiveMessageFilterEntry = {
    $entry: null,
    $dragged: false,
    $inited: false,
    init() {
      if (this.$inited) return;
      this.$inited = true;
      addStyle(ENTRY_CSS);
      Panel.addValueChangeListener(
        "live-danmu-shield-rule-enable",
        (_, value) => {
          this.updateEnableState(value);
        },
        { immediate: true }
      );
      setInterval(() => {
        if (document.hidden) return;
        this.syncEntry();
      }, 1e3);
      window.addEventListener("resize", () => {
        if (!this.$entry) return;
        this.setPosition(this.getPosition().left, this.getPosition().top);
      });
    },
    openFilterPanel() {
      const configList = [
        {
          id: "dy-live-danmu-filter-menu",
          title: "聊天室消息过滤器",
          views: PanelLiveMessageFilterViews,
        },
      ];
      Panel.showPanel(configList, `${SCRIPT_NAME}-聊天室消息过滤器`);
    },
    syncEntry() {
      if (!DouYinRouter.isLive()) {
        this.removeEntry();
        return;
      }
      if (!this.$entry) {
        const $entry = DOMUtils.createElement(
          "div",
          {
            id: ENTRY_ID,
            title: "聊天室消息过滤器（可拖动）",
            innerHTML: FILTER_ICON,
          },
          { [SCRIPT_NODE_ATTR]: "" }
        );
        this.$entry = $entry;
        this.bindEvent($entry);
        document.body.appendChild($entry);
        this.applyPosition();
        this.updateEnableState(Panel.getValue("live-danmu-shield-rule-enable"));
      } else if (!this.$entry.isConnected) document.body.appendChild(this.$entry);
    },
    removeEntry() {
      this.$entry?.remove();
      this.$entry = null;
    },
    bindEvent($entry) {
      let startLeft = 0;
      let startTop = 0;
      let startX = 0;
      let startY = 0;
      let isDragging = false;
      const onMouseMove = (event) => {
        if (!isDragging) return;
        DOMUtils.preventEvent(event);
        this.setPosition(startLeft + (event.clientX - startX), startTop + (event.clientY - startY));
      };
      const onMouseUp = (event) => {
        if (!isDragging) return;
        isDragging = false;
        $entry.removeAttribute("data-dragging");
        document.removeEventListener("mousemove", onMouseMove, true);
        document.removeEventListener("mouseup", onMouseUp, true);
        this.$dragged =
          Math.abs(event.clientX - startX) > DRAG_THRESHOLD || Math.abs(event.clientY - startY) > DRAG_THRESHOLD;
        if (this.$dragged) this.savePosition();
      };
      DOMUtils.on($entry, "mousedown", (event) => {
        const mouseEvent = event;
        if (mouseEvent.button !== 0) return;
        DOMUtils.preventEvent(mouseEvent);
        const rect = $entry.getBoundingClientRect();
        startX = mouseEvent.clientX;
        startY = mouseEvent.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        isDragging = true;
        $entry.setAttribute("data-dragging", "true");
        document.addEventListener("mousemove", onMouseMove, true);
        document.addEventListener("mouseup", onMouseUp, true);
      });
      DOMUtils.on($entry, "click", (event) => {
        DOMUtils.preventEvent(event);
        if (this.$dragged) {
          this.$dragged = false;
          return;
        }
        this.openFilterPanel();
      });
    },
    setPosition(left, top) {
      if (!this.$entry) return;
      const maxLeft = Math.max(0, window.innerWidth - ENTRY_SIZE);
      const maxTop = Math.max(0, window.innerHeight - ENTRY_SIZE);
      const safeLeft = Math.min(Math.max(0, left), maxLeft);
      const safeTop = Math.min(Math.max(0, top), maxTop);
      this.$entry.style.setProperty("left", `${safeLeft}px`, "important");
      this.$entry.style.setProperty("top", `${safeTop}px`, "important");
    },
    getPosition() {
      return {
        left: Number.parseFloat(this.$entry?.style.left || "0") || 0,
        top: Number.parseFloat(this.$entry?.style.top || "0") || 0,
      };
    },
    applyPosition() {
      const position = this.readPosition();
      if (position) {
        this.setPosition(position.left, position.top);
        return;
      }
      this.setPosition(window.innerWidth - ENTRY_SIZE - 24, window.innerHeight - 260);
    },
    savePosition() {
      const position = this.getPosition();
      window.localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(position));
    },
    readPosition() {
      const value = window.localStorage.getItem(POSITION_STORAGE_KEY);
      if (!value) return null;
      let position;
      try {
        position = JSON.parse(value);
      } catch {
        return null;
      }
      if (typeof position?.left !== "number" || typeof position?.top !== "number") return null;
      return position;
    },
    updateEnableState(enable) {
      if (!this.$entry) return;
      this.$entry.setAttribute("data-enable", enable ? "true" : "false");
    },
  };
  var VideoQualityMap = {
    auto: {
      label: "自动",
      sign: 0,
    },
    origin: {
      label: "原画",
      sign: 5,
    },
    uhd: {
      label: "蓝光",
      sign: 4,
    },
    hd: {
      label: "超清",
      sign: 3,
    },
    sd: {
      label: "高清",
      sign: 2,
    },
    ld: {
      label: "标清",
      sign: 1,
    },
  };
  var DouYinLive = {
    init() {
      DouYinLiveBlock.init();
      DOMUtils.onReady(() => {
        Panel.execMenuOnce(
          "live-danmu-shield-rule-enable",
          async () => {
            if (!DouYinRouter.isLive()) return;
            return DouYinHook.hookLiveMessageDecoder();
          },
          void 0,
          true
        );
        Panel.execMenuOnce(
          "live-waitToRemovePauseDialog",
          () => {
            if (!DouYinRouter.isLive()) return;
            return this.waitToRemovePauseDialog();
          },
          void 0,
          true
        );
        Panel.execMenuOnce(
          "live-chooseQuality",
          (option) => {
            if (option.value === "auto" || !DouYinRouter.isLive()) return;
            return this.chooseQuality(option.value);
          },
          false,
          true
        );
        Panel.execMenuOnce(
          "live-autoEnterElementFullScreen",
          () => {
            if (!DouYinRouter.isLive()) return;
            return this.autoEnterElementFullScreen();
          },
          false,
          true
        );
        Panel.execMenuOnce(
          "dy-live-showLiveRoomAudienceCount",
          () => {
            if (!DouYinRouter.isLive()) return;
            return this.showRoomUserCount();
          },
          void 0,
          true
        );
        DouYinLiveBlockUid.init();
        DouYinLiveBlockWord.init();
        DouYinLiveMessageFilterEntry.init();
      });
    },
    autoEnterElementFullScreen() {
      const getButton = () =>
        $$(".douyin-player-controls-right slot").find(($slot) => DOMUtils.text($slot).includes("窗口全屏")) ?? null;
      let clickedCount = 0;
      const MAX_CLICK_COUNT = 3;
      let lastClickTime = 0;
      log.info("尝试自动进入网页全屏");
      const timer = setInterval(() => {
        if (document.hidden) return;
        const $slot = getButton();
        if ($slot == null) return;
        if (DOMUtils.text($slot).includes("退出窗口全屏")) {
          if (clickedCount > 0) log.success("成功自动进入网页全屏");
          else log.warn("抖音已自动进入网页全屏，不执行脚本的操作");
          clearInterval(timer);
          return;
        }
        if (Date.now() - lastClickTime < 2e3) return;
        if (clickedCount >= MAX_CLICK_COUNT) {
          log.error(`自动进入网页全屏失败，已重试 ${clickedCount} 次`);
          clearInterval(timer);
          return;
        }
        const $clickable = [$slot, ...$slot.querySelectorAll("*")].find(
          ($el) => typeof getReactInstance($el).reactProps?.onClick === "function"
        );
        if ($clickable == null) return;
        clickedCount++;
        lastClickTime = Date.now();
        $clickable.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
      }, 500);
      return [
        () => {
          clearInterval(timer);
        },
      ];
    },
    chooseQuality(quality = "origin") {
      const chooseQualityName = (VideoQualityMap[quality] ?? VideoQualityMap.origin).label;
      window.localStorage.setItem("webcast_local_quality", quality);
      cookieManager.update({
        name: "webcast_local_quality",
        value: quality,
        domain: ".douyin.com",
      });
      cookieManager.update({
        name: "live_local_quality",
        value: quality,
        domain: ".douyin.com",
      });
      const qualitySignMap = {};
      Object.keys(VideoQualityMap).forEach((key) => {
        qualitySignMap[VideoQualityMap[key].label] = VideoQualityMap[key].sign;
      });
      const getQualityOptions = () => $$('#PlayerLayout [data-e2e="quality-selector"] > div');
      const getCurrentQualityName = () => {
        const $quality = document.querySelector('#PlayerLayout [data-e2e="quality"]');
        return $quality == null ? null : DOMUtils.text($quality).trim();
      };
      let hasWarned = false;
      let clickedCount = 0;
      const MAX_CLICK_COUNT = 10;
      const tryChooseQuality = () => {
        const currentName = getCurrentQualityName();
        if (currentName == null) return false;
        const $optionList = getQualityOptions();
        if ($optionList.length === 0) return false;
        const nameList = $optionList.map(($el) => DOMUtils.text($el).trim());
        let finalName = chooseQualityName;
        if (!nameList.includes(finalName)) {
          const availableNameList = nameList
            .filter((name) => qualitySignMap[name] != null)
            .sort((a, b) => qualitySignMap[a] - qualitySignMap[b]);
          finalName = availableNameList[availableNameList.length - 1] ?? nameList[0];
          if (!hasWarned) {
            hasWarned = true;
            toast.warning(`当前直播没有【${chooseQualityName}】画质，自动选择【${finalName}】`);
          }
        }
        if (currentName === finalName) {
          log.success(`成功设置画质为【${finalName}】`);
          return true;
        }
        if (clickedCount >= MAX_CLICK_COUNT) {
          log.error(`设置画质为【${finalName}】失败，已重试 ${clickedCount} 次`);
          return true;
        }
        const $target = $optionList.find(($el) => DOMUtils.text($el).trim() === finalName);
        if ($target == null) return false;
        clickedCount++;
        $target.click();
        return false;
      };
      log.info(`尝试将直播画质设置为【${chooseQualityName}】`);
      const timer = setInterval(() => {
        if (document.hidden) return;
        if (tryChooseQuality()) clearInterval(timer);
      }, 500);
      return [
        () => {
          clearInterval(timer);
        },
      ];
    },
    waitToRemovePauseDialog() {
      const notifiedSet = new WeakSet();
      const closedSet = new WeakSet();
      const checkDialogToClose = ($el, from) => {
        if (isScriptNode($el)) return;
        const eleText = DOMUtils.text($el);
        if (eleText.includes("长时间无操作") && eleText.includes("暂停播放")) {
          if (closedSet.has($el)) return;
          if (!notifiedSet.has($el)) {
            notifiedSet.add($el);
            toast.info(`检测${from}：出现【长时间无操作，已暂停播放】弹窗`);
          }
          let closeDialogFn = null;
          const $rect = getReactInstance($el);
          if (typeof $rect.reactContainer === "object" && $rect.reactContainer)
            closeDialogFn =
              queryProperty($rect.reactContainer, (obj) => {
                if (typeof obj["onClose"] === "function")
                  return {
                    isFind: true,
                    data: obj["onClose"],
                  };
                else if (typeof obj?.["memoizedProps"]?.["onClose"] === "function")
                  return {
                    isFind: true,
                    data: obj?.["memoizedProps"]?.["onClose"],
                  };
                else
                  return {
                    isFind: false,
                    data: obj["child"],
                  };
              }) || $rect?.reactContainer?.memoizedState?.element?.props?.children?.props?.onClose;
          if (typeof closeDialogFn !== "function") {
            if (typeof $rect.reactFiber === "object" && $rect.reactFiber && ["3"].includes(from.toString()))
              closeDialogFn = queryProperty($rect.reactFiber, (obj) => {
                if (typeof obj["onClose"] === "function")
                  return {
                    isFind: true,
                    data: obj["onClose"],
                  };
                else if (typeof obj?.["memoizedProps"]?.["onClose"] === "function")
                  return {
                    isFind: true,
                    data: obj?.["memoizedProps"]?.["onClose"],
                  };
                else
                  return {
                    isFind: false,
                    data: obj["return"],
                  };
              });
          }
          if (typeof closeDialogFn === "function") {
            closedSet.add($el);
            toast.success(`检测${from}：调用函数关闭弹窗`);
            closeDialogFn();
          }
        }
      };
      const waitToRemovePauseDialog = getDynamicValue("live-waitToRemovePauseDialog");
      const lockFn = new LockFunction(() => {
        if (!waitToRemovePauseDialog.value) return;
        $$("body > div[elementtiming='element-timing']").forEach(($elementTiming) => {
          checkDialogToClose($elementTiming, "1");
        });
        $$('body > div:not([id="root"]):not(:empty)').forEach(($el) => {
          checkDialogToClose($el, "2");
        });
        $$("#TipsLayout > div").forEach(($el) => {
          checkDialogToClose($el, "3");
        });
      }, 400);
      const observer = mutationObserverBySelector(
        ["#ContainerBackgroundLayout", ".semi-portal", "body > div[elementtiming='element-timing']"],
        {
          config: {
            subtree: true,
            childList: true,
          },
          immediate: true,
          callback() {
            lockFn.run();
          },
        }
      );
      return [
        () => {
          observer?.disconnect();
        },
        waitToRemovePauseDialog.destroy,
      ];
    },
    showRoomUserCount() {
      const getRootFiber = () => {
        let $el = document.querySelector('[data-e2e="living-container"]');
        while ($el) {
          const { reactContainer } = getReactInstance($el);
          if (reactContainer) return reactContainer.current ?? reactContainer;
          $el = $el.parentElement;
        }
        return null;
      };
      const findLiveStore = () => {
        const rootFiber = getRootFiber();
        if (rootFiber == null) return null;
        const queue = [rootFiber];
        const visited = new Set();
        while (queue.length > 0 && visited.size < 2e4) {
          const fiber = queue.shift();
          if (fiber == null || visited.has(fiber)) continue;
          visited.add(fiber);
          const props = fiber.memoizedProps;
          const store = props?.store ?? props?.value;
          if (store?.roomStore?.roomInfo) return store;
          if (fiber.child) queue.push(fiber.child);
          if (fiber.sibling) queue.push(fiber.sibling);
        }
        return null;
      };
      const getAudienceEl = () => document.querySelector('#chatroom [data-e2e="live-room-audience"]');
      let missCount = 0;
      const timer = setInterval(() => {
        if (document.hidden) return;
        const $audience = getAudienceEl();
        const store = $audience == null ? null : findLiveStore();
        if ($audience == null || store == null) {
          missCount++;
          if (missCount === 20) log.error("未找到直播间观众人数节点或 store，显示在线观众人数失败");
          return;
        }
        missCount = 0;
        const displayValue = store.roomStore?.roomInfo?.room?.room_view_stats?.display_value;
        if (typeof displayValue !== "number") return;
        const text = DOMUtils.text($audience).trim();
        const newText = String(displayValue);
        if (text !== newText) DOMUtils.text($audience, newText);
      }, 500);
      return [
        () => {
          clearInterval(timer);
        },
      ];
    },
  };
  var DouYinNote = {
    $inited: false,
    init() {
      if (this.$inited) return;
      this.$inited = true;
      addStyle(block_default);
    },
  };
  var DouYinVideo = {
    $inited: false,
    init() {
      if (this.$inited) return;
      this.$inited = true;
      addStyle(block_default);
    },
  };
  var MENU_ID = "dy-video-comment-user-menu";
  var BLOCK_ITEM_ATTR = "data-dy-block-item";
  var DOUYIN_RED$1 = "#fe2c55";
  var HOME_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.7" stroke="currentColor" stroke-width="1.3"/><path d="M2.8 13.6c0-2.3 2.3-3.7 5.2-3.7s5.2 1.4 5.2 3.7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;
  var MENU_CSS = `
#${MENU_ID} {
  position: fixed;
  z-index: 10000;
  margin: 0;
  padding: 4px;
  list-style: none;
  min-width: 120px;
  border-radius: 8px;
  background-color: #252632;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.32);
  font-size: 14px;
  line-height: 22px;
  color: #fff;
  user-select: none;
}
#${MENU_ID},
#${MENU_ID} > li,
#${MENU_ID} > li > span {
  color: #fff;
}
#${MENU_ID} > li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}
#${MENU_ID} > li:hover {
  background-color: rgba(255, 255, 255, 0.12);
}
#${MENU_ID} > li > .semi-dropdown-item-icon {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
}
/* 「屏蔽 TA」用抖音红，比其它项更醒目 */
#${MENU_ID} > li[${BLOCK_ITEM_ATTR}],
#${MENU_ID} > li[${BLOCK_ITEM_ATTR}] > span,
#${MENU_ID} > li[${BLOCK_ITEM_ATTR}] > .semi-dropdown-item-icon {
  color: ${DOUYIN_RED$1};
}
`;
  var DouYinVideoCommentUserMenu = {
    $currentUser: null,
    $passClickLink: null,
    $inited: false,
    init() {
      if (this.$inited) return;
      this.$inited = true;
      addStyle(MENU_CSS);
      DOMUtils.on(
        document,
        "click",
        'a[href*="/user/"]',
        (event, $link) => {
          this.onClickUserLink(event, $link);
        },
        {
          capture: true,
          overrideTarget: false,
        }
      );
      DOMUtils.on(
        document,
        "mousedown",
        (event) => {
          const $target = event.target;
          if (!($target instanceof Node)) return;
          const $menu = document.getElementById(MENU_ID);
          if ($menu && $menu.contains($target)) return;
          this.closeMenu();
        },
        { capture: true }
      );
      DOMUtils.on(window, "scroll", () => this.closeMenu(), { capture: true });
    },
    onClickUserLink(event, $link) {
      if (!$link || !($link instanceof HTMLAnchorElement)) return;
      if (this.$passClickLink === $link) return;
      if (!$link.closest('[data-e2e="comment-item"]')) return;
      if (!($link.textContent || "").trim()) return;
      const secUid = this.getSecUidFromHref($link.getAttribute("href") || "");
      if (!secUid) return;
      preventEvent(event);
      this.openMenu(event, $link, secUid);
    },
    getSecUidFromHref(href) {
      const match = href.match(/\/user\/([^/?#]+)/);
      return match ? match[1] : "";
    },
    getCommentUserId($comment, secUid) {
      if (!secUid) return "";
      let fiber = utils.getReactInstance($comment)?.reactFiber;
      for (let depth = 0; depth < 25 && fiber; depth++) {
        const props = fiber.memoizedProps;
        if (props) {
          const userList = [props.user, props.comment?.user, props.data?.user, props.item?.user];
          for (let index = 0; index < userList.length; index++) {
            const user = userList[index];
            if (!user || typeof user !== "object") continue;
            if (String(user.sec_uid || user.secUid || "") !== secUid) continue;
            const uid = String(user.uid || user.id || user.id_str || "");
            if (uid) return uid;
          }
        }
        fiber = fiber.return;
      }
      return "";
    },
    openMenu(event, $link, secUid) {
      this.closeMenu();
      const $comment = $link.closest('[data-e2e="comment-item"]');
      this.$currentUser = {
        uid: $comment ? this.getCommentUserId($comment, secUid) : "",
        secUid,
        $link,
      };
      const $menu = document.createElement("ul");
      $menu.id = MENU_ID;
      $menu.className = "semi-dropdown-menu";
      $menu.setAttribute("role", "menu");
      $menu.setAttribute(SCRIPT_NODE_ATTR, "1");
      $menu.appendChild(this.buildMenuItem(HOME_ICON, "进主页", () => this.gotoUserHome()));
      const $blockItem = this.buildMenuItem(BLOCK_ICON, "屏蔽 TA", () => void this.blockCurrentUser());
      $blockItem.setAttribute(BLOCK_ITEM_ATTR, "1");
      $menu.appendChild($blockItem);
      document.body.appendChild($menu);
      const margin = 8;
      const rect = $menu.getBoundingClientRect();
      let left = event.clientX;
      let top = event.clientY;
      if (left + rect.width + margin > window.innerWidth) left = window.innerWidth - rect.width - margin;
      if (top + rect.height + margin > window.innerHeight) top = window.innerHeight - rect.height - margin;
      $menu.style.left = Math.max(margin, left) + "px";
      $menu.style.top = Math.max(margin, top) + "px";
    },
    buildMenuItem(icon, label, onClick) {
      const $item = document.createElement("li");
      $item.className = "semi-dropdown-item";
      $item.setAttribute("role", "menuitem");
      $item.setAttribute("tabindex", "0");
      $item.innerHTML = `<div class="semi-dropdown-item-icon">${icon}</div><span>${label}</span>`;
      $item.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      });
      return $item;
    },
    closeMenu() {
      this.$currentUser = null;
      const $menu = document.getElementById(MENU_ID);
      if ($menu) $menu.remove();
    },
    gotoUserHome() {
      const $link = this.$currentUser?.$link;
      this.closeMenu();
      if (!$link) return;
      const href = $link.href;
      const beforeUrl = window.location.href;
      this.$passClickLink = $link;
      try {
        $link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
      } catch (error) {}
      this.$passClickLink = null;
      setTimeout(() => {
        if (window.location.href === beforeUrl && href) window.location.href = href;
      }, 400);
    },
    async blockCurrentUser() {
      const current = this.$currentUser;
      this.closeMenu();
      if (!current) return;
      if (!(await confirm("确定要屏蔽该用户吗？"))) return;
      const result = await DouYinUserBlock.blockUser({
        userId: current.uid,
        secUserId: current.secUid,
      });
      if (result.success) toast.success("已拉黑该用户", 4e3);
      else toast.error(`拉黑失败：${result.message}`, 5e3);
    },
  };
  var BLOCK_LABEL = "屏蔽 TA";
  var DOUYIN_RED = "#fe2c55";
  var MENU_SHAPES = [
    {
      anchorTexts: ["进入作者主页", "进入直播间"],
      minItemCount: 3,
    },
    {
      anchorTexts: ["不感兴趣", "举报"],
      minItemCount: 2,
    },
  ];
  var BASE_PLAYER_SELECTOR = ".basePlayerContainer";
  function isVerticalMenu($menu) {
    const centerList = Array.from($menu.children)
      .filter(($row) => $row.getClientRects().length !== 0)
      .map(($row) => {
        const rect = $row.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      });
    if (centerList.length < 2) return false;
    const yList = centerList.map((item) => item.y);
    const xList = centerList.map((item) => item.x);
    return Math.max(...yList) - Math.min(...yList) > Math.max(...xList) - Math.min(...xList);
  }
  var PLAYER_SELECTOR = [
    '[data-e2e="feed-video"]',
    '[data-e2e="feed-active-video"]',
    '[data-e2e="feed-live"]',
    ".douyin-player",
  ].join(",");
  var MAX_INJECT_ATTEMPT = 6;
  var INJECT_INTERVAL = 80;
  var DouYinPlayerContextMenu = {
    itemAttribute: "data-dy-player-menu-block",
    $inited: false,
    $injectToken: 0,
    init() {
      if (this.$inited) return;
      this.$inited = true;
      DOMUtils.on(document, "contextmenu", (event) => this.onContextMenu(event), { capture: true });
    },
    onContextMenu(event) {
      const $target = event.target;
      if (!($target instanceof Element)) return;
      const $player = $target.closest(BASE_PLAYER_SELECTOR) ?? $target.closest(PLAYER_SELECTOR);
      if (!$player) return;
      this.tryInject($player, 0, ++this.$injectToken);
    },
    tryInject($player, attempt, token) {
      if (token !== this.$injectToken) return;
      if (this.injectMenuItem($player) || attempt >= MAX_INJECT_ATTEMPT) return;
      setTimeout(() => this.tryInject($player, attempt + 1, token), INJECT_INTERVAL);
    },
    injectMenuItem($player) {
      const menu = this.findPlayerMenu($player);
      if (!menu) return false;
      const target = this.getTarget($player);
      if (!target) return true;
      const targetKey = this.getTargetKey(target);
      const $exists = menu.$menu.querySelector("[" + this.itemAttribute + "]");
      if ($exists) {
        if ($exists.getAttribute(this.itemAttribute) === targetKey) return true;
        $exists.remove();
      }
      const $item = this.buildMenuItem(menu, target);
      if (!$item) return false;
      menu.$menu.appendChild($item);
      return true;
    },
    getTargetKey(target) {
      return target.uid || target.secUid;
    },
    findPlayerMenu($player) {
      const $elList = $player.querySelectorAll("div, li, a, span");
      for (let index = 0; index < $elList.length; index++) {
        const $el = $elList[index];
        if ($el.children.length !== 0) continue;
        const text = ($el.textContent || "").trim();
        const shape = MENU_SHAPES.find((item) => item.anchorTexts.indexOf(text) !== -1);
        if (!shape) continue;
        const $row = $el.parentElement;
        const $menu = $row?.parentElement;
        if (!$row || !$menu) continue;
        if ($menu.children.length < shape.minItemCount || $menu.getClientRects().length === 0) continue;
        if (!isVerticalMenu($menu)) continue;
        return {
          $menu,
          $row,
          anchorText: text,
        };
      }
      return null;
    },
    buildMenuItem(menu, target) {
      const $item = menu.$row.cloneNode(true);
      Array.from($item.querySelectorAll("*")).forEach(($child) => {
        if ($child.children.length !== 0) return;
        const text = ($child.textContent || "").trim();
        if ((text.startsWith("（") || text.startsWith("(")) && (text.endsWith("）") || text.endsWith(")")))
          $child.remove();
      });
      let $label = null;
      const $labelList = Array.from($item.querySelectorAll("*"));
      for (let index = 0; index < $labelList.length; index++)
        if (($labelList[index].textContent || "").trim() === menu.anchorText) {
          $label = $labelList[index];
          break;
        }
      if ($label) $label.textContent = BLOCK_LABEL;
      else if (($item.textContent || "").trim() === menu.anchorText) $item.textContent = BLOCK_LABEL;
      else return null;
      $item.style.color = DOUYIN_RED;
      if ($label) $label.style.color = DOUYIN_RED;
      $item.setAttribute(this.itemAttribute, this.getTargetKey(target));
      $item.addEventListener(
        "click",
        () => {
          this.closeNativeMenu();
          this.blockTarget(target);
        },
        true
      );
      return $item;
    },
    closeNativeMenu() {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    },
    getTarget($player) {
      const fiber = utils.getReactInstance($player)?.reactFiber;
      if (!fiber) return null;
      const author = utils.queryProperty(fiber, (node) => {
        const props = node?.memoizedProps;
        if (props && typeof props === "object" && props.awemeInfo && typeof props.awemeInfo === "object")
          return {
            isFind: true,
            data: props.awemeInfo,
          };
        return {
          isFind: false,
          data: node?.return ?? null,
        };
      })?.authorInfo;
      if (author && (author.uid || author.secUid))
        return {
          uid: String(author.uid || ""),
          secUid: String(author.secUid || ""),
          nickname: String(author.nickname || ""),
          kind: "author",
        };
      let node = fiber;
      for (let depth = 0; depth < 40 && node; depth++) {
        const props = node.memoizedProps;
        if (props && typeof props === "object") {
          const userList = [
            props.roomInfo?.owner,
            props.roomInfo?.anchor,
            props.anchorInfo,
            props.roomInfo?.userInfo,
            props.userInfo,
          ];
          for (let index = 0; index < userList.length; index++) {
            const user = userList[index];
            if (!user || typeof user !== "object") continue;
            const uid = String(user.uid || user.id || user.id_str || "");
            const secUid = String(user.secUid || user.sec_uid || "");
            if (uid || secUid)
              return {
                uid,
                secUid,
                nickname: String(user.nickname || user.nickName || ""),
                kind: "anchor",
              };
          }
        }
        node = node.return;
      }
      return null;
    },
    async blockTarget(target) {
      const isAnchor = target.kind === "anchor";
      const name = target.nickname ? `「${target.nickname}」` : "TA";
      if (
        !(await confirm(
          isAnchor ? `确定要屏蔽主播${name}吗？屏蔽后不再显示其发言，并同时拉黑对方。` : `确定要屏蔽视频作者${name}吗？`
        ))
      )
        return;
      if (isAnchor && target.uid) DouYinLiveMessageFilter.addBlacklistUid(target.uid);
      const result = await DouYinUserBlock.blockUser({
        userId: target.uid,
        secUserId: target.secUid,
      });
      if (result.success) toast.success(isAnchor ? `已屏蔽主播${name}，并已拉黑` : `已拉黑视频作者${name}`, 4e3);
      else
        toast.warning(
          isAnchor ? `已屏蔽主播${name}（拉黑失败：${result.message}）` : `拉黑${name}失败：${result.message}`,
          5e3
        );
    },
  };
  var DouYin = {
    init() {
      if (!(DouYinRouter.isIndex() || DouYinRouter.isLive())) {
        log.error(`当前仅主站和直播页面支持${globalThis.self === globalThis.top ? "" : "（iframe）"}`);
        return;
      }
      Panel.execMenuOnce(
        "dy-remove-ads",
        () => {
          return this.removeAds();
        },
        void 0,
        true
      );
      DouYinGestureBackClearHash();
      DouYinBlock.init();
      DouYinPlayerContextMenu.init();
      Panel.execMenuOnce(
        "dy-common-listenRouterChange",
        () => {
          return this.listenRouterChange();
        },
        void 0,
        false
      );
      Panel.execMenuOnce("dy-search-click-to-new-tab", () => {
        return this.navSearchClickToNewTab();
      });
      if (DouYinRouter.isLive()) DouYinLive.init();
      else if (DouYinRouter.isIndex()) {
        DouYinVideoCommentUserMenu.init();
        if (!DouYinRouter.isJingxuan()) DouYinVideoPlayer.init();
        if (DouYinRouter.isUser()) DouYinUser.init();
        else if (DouYinRouter.isVideo()) DouYinVideo.init();
        else if (DouYinRouter.isChannel()) DouYinChannel.init();
        else if (DouYinRouter.isNote()) DouYinNote.init();
        else log.warn("子router: " + window.location.href);
      }
      DouYinFeatureCheck.init();
    },
    removeAds() {
      cookieManager.update(
        {
          name: "JXEntranceNegative",
          value: "1",
        },
        () => {}
      );
      DOMUtils.waitNode(
        () =>
          DOMUtils.selector(
            '#douyin-navigation [data-e2e="douyin-navigation"] > div > div > div:regexp("下载抖音精选|条条都是宝藏视频")'
          ),
        1e4
      ).then(($el) => {
        if (!$el) return;
        DOMUtils.remove($el);
      });
      return [addStyle(block_default)];
    },
    listenRouterChange() {
      let url = window.location.href;
      const callback = () => {
        const beforeUrl = url;
        const currentUrl = window.location.href;
        url = currentUrl;
        DouYinRouterChangeData.beforeURL = beforeUrl;
        DouYinRouterChangeData.currentURL = currentUrl;
        log.success(`Router Change Before: ` + beforeUrl);
        log.success(`Router Change Now: ` + currentUrl);
        Panel.emitUrlChangeWithExecMenuOnceEvent({
          url: currentUrl,
          beforeUrl,
        });
        this.init();
      };
      return [DOMUtils.on(window, "wb_url_change", callback).off];
    },
    navSearchClickToNewTab() {
      const listener_1 = DOMUtils.on(
        document,
        "click",
        [
          '[data-click="doubleClick"]:has(input[data-e2e="searchbar-input"]) button[data-e2e="searchbar-button"]',
          'a[href*="douyin.com/search/"]',
        ],
        (evt, $click) => {
          if (!$click) return;
          DOMUtils.preventEvent(evt);
          let url;
          if ($click instanceof HTMLAnchorElement) url = $click.href;
          else {
            const $doubleClick = $click.closest('[data-click="doubleClick"]');
            if (!$doubleClick) {
              toast.error("未找到搜索框元素");
              return;
            }
            const $input = $doubleClick.querySelector("input");
            if (!$input) {
              toast.error("未找到搜索框输入框");
              return;
            }
            let searchText = $input.value;
            if (searchText == null || searchText === "") {
              const $before = DOMUtils.prev($input);
              if ($before) searchText = DOMUtils.text($before);
              else {
                const placeholder = $input.placeholder.trim();
                if (placeholder != null && placeholder !== "" && placeholder !== "搜索你感兴趣的内容")
                  searchText = placeholder;
                else {
                  log.error("搜索内容为空，不进行搜索");
                  return;
                }
              }
            }
            url = DouYinUrlHandler.getSearchUrl(searchText);
          }
          window.open(url, "_blank");
          return false;
        },
        {
          capture: true,
          overrideTarget: false,
        }
      );
      const listener_2 = DOMUtils.on(
        document,
        "click",
        '[data-e2e="searchbar-button"] + div [data-text][data-index]',
        (evt, $selector) => {
          if (!$selector) return;
          const $click = evt.composedPath()[0];
          const $icon = $click.closest(".icon[data-text]");
          if ($icon && $selector.contains($icon)) return;
          const $closeSVG = $click.closest("svg");
          if ($closeSVG && $selector.contains($closeSVG)) return;
          DOMUtils.preventEvent(evt);
          const searchText = $selector.getAttribute("data-text");
          if (!searchText) {
            log.error("未找到搜索建议内容", $selector);
            toast.error("未找到搜索建议内容");
            return;
          }
          const url = DouYinUrlHandler.getSearchUrl(searchText);
          window.open(url, "_blank");
          return false;
        },
        {
          capture: true,
          isComposedPath: true,
          overrideTarget: false,
        }
      );
      return [listener_1.off, listener_2.off];
    },
  };
  var ALLOWED_IFRAME_PROTOCOLS = new Set(["http:", "https:", "blob:", "data:", "about:"]);
  function getProtocol(url) {
    const matched = /^\s*([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(url);
    return matched == null ? null : `${matched[1].toLowerCase()}:`;
  }
  function isExternalProtocol(url) {
    if (typeof url !== "string") return false;
    const protocol = getProtocol(url);
    return protocol != null && !ALLOWED_IFRAME_PROTOCOLS.has(protocol);
  }
  var DouYinIFrameHook = {
    hookCustomProtocol() {
      const iframeSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "src");
      if (iframeSrcDescriptor?.get == null || iframeSrcDescriptor.set == null) {
        log.warn("未找到 iframe 的 src 属性描述符，跳过自定义协议拦截");
        return;
      }
      const { get: originGet, set: originSet, enumerable } = iframeSrcDescriptor;
      const originSetAttribute = Element.prototype.setAttribute;
      Object.defineProperty(HTMLIFrameElement.prototype, "src", {
        configurable: true,
        enumerable,
        get() {
          return Reflect.apply(originGet, this, []);
        },
        set(value) {
          if (isExternalProtocol(value)) {
            log.info(`拦截 iframe 自定义协议地址: ` + value);
            return Reflect.apply(originSet, this, ["about:blank"]);
          }
          return Reflect.apply(originSet, this, [value]);
        },
      });
      Element.prototype.setAttribute = function (name, value) {
        if (this instanceof HTMLIFrameElement && name.toLowerCase() === "src" && isExternalProtocol(value)) {
          log.info(`拦截 iframe 自定义协议地址: ` + value);
          return originSetAttribute.call(this, name, "about:blank");
        }
        return originSetAttribute.call(this, name, value);
      };
    },
  };
  var PanelGeneralConfig = {
    id: "panel-general-config",
    title: "通用",
    views: [
      {
        type: "container",
        text: "",
        views: [
          UISwitch(
            "【屏蔽】广告、下载客户端提示",
            "dy-remove-ads",
            true,
            void 0,
            "屏蔽下载客户端提示、<code>so.douyin.com</code> 的广告等，并写入 <code>JXEntranceNegative</code> Cookie 隐藏抖音精选入口"
          ),
          UISwitch(
            "监听Router改变",
            "dy-common-listenRouterChange",
            true,
            void 0,
            "当地址栏改变时，功能重载，建议开启"
          ),
          UISwitch(
            "首页停留在推荐页",
            "dy-common-recommend-home",
            true,
            void 0,
            "抖音会把首页 <code>/</code> 重定向到<code>抖音精选</code>（<code>/jingxuan</code>），开启后首页直接停留在推荐页"
          ),
          UISwitch(
            "新标签页打开搜索结果",
            "dy-search-click-to-new-tab",
            false,
            void 0,
            "点击搜索框的<code>搜索</code>按钮时，点击视频区域的<code>#话题</code>时，新标签页打开"
          ),
        ],
      },
      {
        text: "",
        type: "container",
        views: [
          {
            text: "布局屏蔽-左侧导航栏",
            type: "deepMenu",
            views: [
              {
                type: "container",
                text: "",
                views: [UISwitch("【屏蔽】左侧导航栏", "shieldLeftNavigator")],
              },
              {
                type: "container",
                text: "",
                views: [
                  UISwitch("【屏蔽】精选", "shieldLeftNavigator-tab-home"),
                  UISwitch("【屏蔽】推荐", "shieldLeftNavigator-tab-recommend"),
                  UISwitch("【屏蔽】AI搜索/抖音", "shieldLeftNavigator-tab-ai-search"),
                ],
              },
              {
                type: "container",
                text: "",
                views: [
                  UISwitch("【屏蔽】关注", "shieldLeftNavigator-tab-follow"),
                  UISwitch("【屏蔽】朋友", "shieldLeftNavigator-tab-friend"),
                  UISwitch("【屏蔽】我的", "shieldLeftNavigator-tab-user_self"),
                ],
              },
              {
                type: "container",
                text: "",
                views: [
                  UISwitch(
                    "【屏蔽】activity",
                    "shieldLeftNavigator-tab-activity",
                    false,
                    void 0,
                    "在<code>直播</code>上面出现的按钮"
                  ),
                  UISwitch("【屏蔽】直播", "shieldLeftNavigator-tab-live"),
                  UISwitch("【屏蔽】放映厅", "shieldLeftNavigator-tab-vs"),
                  UISwitch("【屏蔽】短剧", "shieldLeftNavigator-tab-series"),
                  UISwitch("【屏蔽】小游戏", "shieldLeftNavigator-tab-microgame"),
                ],
              },
              {
                type: "container",
                text: "",
                views: [
                  UISwitch("【屏蔽】设置", "shieldLeftNavigator-panel-menu-setting"),
                  UISwitch("【屏蔽】关于", "shieldLeftNavigator-panel-menu-about"),
                  UISwitch("【屏蔽】问题/反馈", "shieldLeftNavigator-panel-menu-q_a"),
                  UISwitch("【屏蔽】用户体验调研", "shieldLeftNavigator-panel-menu-survey"),
                ],
              },
            ],
          },
          {
            text: "布局屏蔽-顶部导航栏",
            type: "deepMenu",
            views: [
              {
                type: "container",
                text: "",
                views: [UISwitch("【屏蔽】顶部右侧的菜单栏", "shield-topNav-rightMenu")],
              },
              {
                type: "container",
                text: "",
                views: [
                  UISwitch("【屏蔽】AI搜索", "shield-topNav-ai-search"),
                  UISwitch("【屏蔽】客户端提示", "shieldClientTip", true),
                  UISwitch("【屏蔽】充钻石", "shieldFillingBricksAndStones", true),
                  UISwitch("【屏蔽】客户端", "shieldClient", true),
                  UISwitch("【屏蔽】快捷访问", "shieldQuickAccess"),
                  UISwitch("【屏蔽】通知", "shieldNotifitation"),
                  UISwitch("【屏蔽】消息", "shieldPrivateMessage"),
                  UISwitch("【屏蔽】投稿", "shieldSubmission"),
                  UISwitch("【屏蔽】壁纸", "shieldWallpaper"),
                  UISwitch("【屏蔽】更多", "shield-topNav-rightMenu-more"),
                  UISwitch("【屏蔽】登录头像", "shield-topNav-rightMenu-loginAvatar"),
                ],
              },
            ],
          },
        ],
      },
      {
        type: "container",
        text: "通知测试",
        views: [
          UIOwn(($li) => {
            $li.innerHTML = `
            <div class="dyl-panel-item-text">
              <p class="dyl-panel-item-text-main">弹出各类通知</p>
              <p class="dyl-panel-item-text-desc">点击后同时弹出 信息 / 成功 / 警告 / 错误 四种通知，用于目视检查尺寸与配色</p>
            </div>
            <button type="button" class="dyl-panel-button">弹出通知</button>
          `;
            $li.querySelector("button")?.addEventListener("click", () => {
              toast.info("检测1：出现【长时间无操作，已暂停播放】弹窗，正在尝试自动关闭", 4e3);
              toast.success("已屏蔽 uid 1234567890", 4e3);
              toast.warning("当前直播没有【蓝光】画质，自动选择【高清】", 4e3);
              toast.error("未找到视频容器", 4e3);
            });
            return $li;
          }),
        ],
      },
      {
        type: "container",
        text: "功能自检",
        views: [
          UISwitch(
            "页面加载后自动自检",
            "dy-common-feature-check",
            true,
            void 0,
            "页面加载完成后检查当前页面已加载的功能是否真正生效，未生效时通知并尝试重新生效"
          ),
          UIOwn(($li) => {
            $li.innerHTML = `
            <div class="dyl-panel-item-text">
              <p class="dyl-panel-item-text-main">立即检查</p>
              <p class="dyl-panel-item-text-desc">检查当前页面已加载的功能是否生效，未生效时尝试重新生效</p>
            </div>
            <button type="button" class="dyl-panel-button">开始检查</button>
          `;
            $li.querySelector("button")?.addEventListener("click", () => {
              DouYinFeatureCheck.runNow();
            });
            return $li;
          }),
        ],
      },
    ],
  };
  function UISelect(
    text,
    key,
    defaultValue,
    data,
    selectCallBack,
    description,
    valueChangeCallback,
    afterAddToUListCallBack
  ) {
    setDefaultValue(key, defaultValue);
    return {
      type: "select",
      text,
      key,
      defaultValue,
      data,
      description,
      selectCallBack,
      valueChangeCallback,
      afterAddToUListCallBack,
    };
  }
  var PanelLiveConfig = {
    id: "panel-config-live",
    title: "直播",
    views: [
      {
        text: "",
        type: "container",
        views: [
          UISelect(
            "清晰度",
            "live-chooseQuality",
            "origin",
            (() => {
              return Object.keys(VideoQualityMap).map((key) => {
                return {
                  value: key,
                  text: VideoQualityMap[key].label,
                };
              });
            })(),
            void 0,
            "自行选择清晰度"
          ),
          UISwitch(
            "自动进入网页全屏",
            "live-autoEnterElementFullScreen",
            false,
            void 0,
            "网页加载完毕后自动点击网页全屏按钮进入全屏"
          ),
          UISwitch(
            "监听并关闭【长时间无操作，已暂停播放】弹窗",
            "live-waitToRemovePauseDialog",
            true,
            void 0,
            "自动监听并检测弹窗"
          ),
          UISwitch("显示直播间在线观众具体人数", "dy-live-showLiveRoomAudienceCount", false),
          UISwitch(
            "【屏蔽】信息播报",
            "dy-live-shieldMessage",
            false,
            void 0,
            "顶部左右滚动播报（xxx进入/加入了直播间），底部滚动播报（xxx来了，xxx给主播点赞）"
          ),
          UISwitch(
            "【屏蔽】底部遮挡区域",
            "dy-live-blockBottomArea",
            true,
            void 0,
            "该元素会遮挡部分聊天信息，导致显示不全"
          ),
        ],
      },
      {
        text: "",
        type: "container",
        views: [
          {
            type: "deepMenu",
            text: "聊天室消息过滤器",
            views: PanelLiveMessageFilterViews,
          },
        ],
      },
    ],
  };
  var PanelUserConfig = {
    id: "panel-config-user",
    title: "用户",
    views: [
      {
        type: "container",
        text: "",
        views: [UISwitch("显示UID", "dy-user-addShowUserUID", true, void 0, "在用户信息区域下方显示当前用户的uid")],
      },
    ],
  };
  var PanelVideoConfig = {
    id: "panel-config-video",
    title: "视频",
    views: [
      {
        text: "",
        type: "container",
        views: [
          UISelect(
            "清晰度",
            "dy-video-chooseVideoDefinition",
            -2,
            [
              {
                text: "超清 4K",
                value: -2,
              },
              {
                text: "超清 2K",
                value: -1,
              },
              {
                text: "高清 1080P",
                value: 1,
              },
              {
                text: "高清 720P",
                value: 2,
              },
              {
                text: "标清 540P",
                value: 3,
              },
              {
                text: "极速",
                value: 4,
              },
              {
                text: "智能",
                value: 0,
              },
              {
                text: "无",
                value: -999,
              },
            ],
            void 0,
            "自行选择清晰度，切换后需刷新或等待播放器重新加载"
          ),
          UISwitch(
            "监听并关闭【长时间无操作，已暂停播放】弹窗",
            "dy-video-waitToRemovePauseDialog",
            true,
            void 0,
            "自动监听并检测弹窗"
          ),
          UISwitch("解除视频文案复制限制", "dy-video-allowSelectTitleText"),
          UISwitch("评论区时间可跳转", "dy-video-commentTimeJump"),
          UISwitch("显示点赞、评论、收藏、分享的具体数量", "dy-video-showLikeCommentCollectShareCount"),
        ],
      },
      {
        text: "",
        type: "container",
        views: [
          {
            text: "布局屏蔽-播放器右侧工具栏",
            type: "deepMenu",
            views: [
              {
                type: "container",
                text: "",
                views: [
                  UISwitch("【屏蔽】切换播放↑↓", "dy-video-shieldPlaySwitchButton"),
                  UISwitch("【屏蔽】AI抖音", "dy-video-blockAIDouYin"),
                  UISwitch("【屏蔽】听抖音", "dy-video-shieldListenDouYinButton"),
                  UISwitch("【屏蔽】看相关", "dy-video-shieldRelatedRecommendationsButton"),
                  UISwitch("【屏蔽】“…”按钮", "dy-video-shieldMoreButton"),
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  DouYinIFrameHook.hookCustomProtocol();
  DouYinUrlHandler.redirectHomeToRecommend();
  Panel.addContentConfig([PanelGeneralConfig, PanelVideoConfig, PanelLiveConfig, PanelUserConfig]);
  Panel.init();
  DouYin.init();
})();
