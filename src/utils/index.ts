export function isAbsPath(path: string | undefined) {
  if (!path) {
    return false
  }
  // Windows 路径格式：C:\ 或 \\ 开头，或已含盘符（D:\path\to\file）
  if (/^([a-z]:\\|\\\\|(?:\/|\uFF0F){2,})/i.test(path)) {
    return true
  }
  // Unix/Linux 路径格式：/ 开头
  return /^\/[^/]/.test(path)
}
