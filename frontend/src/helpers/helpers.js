export const getBodyMsg = (originalMsg) => {
    if (!originalMsg) return <span></span>;

    let fullMessage = originalMsg;
    const regExp = new RegExp(/.*('.*').*/i)
    let match = regExp.exec(fullMessage);

    if (match) {
        for (let i = 1; i < match.length; i++) {
            const stringInParenthesisToBold = match[i];
            fullMessage = fullMessage.replace(stringInParenthesisToBold, `<span class="fw-bold">${stringInParenthesisToBold}</span>`);
        }
    }
    return `<span>${fullMessage}</span>`
}

export const getMinDate = () => {
    //format = `2021-12-01T08:30`
    const now = new Date(Date.now());
    const dayAsString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
    const hoursAndSeconds = `${now.getHours().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    return `${dayAsString}T${hoursAndSeconds}`
}

export async function getSha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

export function getDateTimeLocalString(javaLocalDateTimeString) {
    if (!javaLocalDateTimeString) return javaLocalDateTimeString;
    const indexOfDot = javaLocalDateTimeString.indexOf('.');
    
    if (indexOfDot === -1) return javaLocalDateTimeString;
    return javaLocalDateTimeString.substring(0, indexOfDot);
}