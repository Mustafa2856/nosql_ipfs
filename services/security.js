export const safeString = (str) => {
    let safeStr = "";
    for(let i=0;i<str.length;i++){
        if(str[i] == '/' || str[i] == ' ' || str[i] == '\\' || str[i] == '\'' || str[i] == '\"')
        safeStr += '\\';
        safeStr += str[i];
    }
    return safeStr;
}