export const isAbsPath = (path: string | undefined)=> {
    if (!path) {
        return false
    }
    // Windows 路径格式：C:\ 或 \\ 开头，或已含盘符（D:\path\to\file）
    if (/^([a-zA-Z]:\\|\\\\|(?:\/|\uFF0F){2,})/.test(path)) {
        return true
    }
    // Unix/Linux 路径格式：/ 开头
    return /^\/[^/]/.test(path)
}