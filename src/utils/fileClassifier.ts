import { FileCategory, CategoryColor } from "../types";

/** 雅致色系 — 适用于白色毛玻璃主题，每种文件类型配一种辨识度适中的色彩 */
export const CATEGORY_COLORS: Record<FileCategory, CategoryColor> = {
  document: {
    label: "文档",
    bgColor: "rgba(220, 60, 80, 0.08)",
    borderColor: "rgba(220, 60, 80, 0.15)",
    iconColor: "#C0384A",
    glowColor: "rgba(220, 60, 80, 0.06)",
  },
  image: {
    label: "图片",
    bgColor: "rgba(120, 80, 200, 0.08)",
    borderColor: "rgba(120, 80, 200, 0.15)",
    iconColor: "#7C4DCC",
    glowColor: "rgba(120, 80, 200, 0.06)",
  },
  audio: {
    label: "音频",
    bgColor: "rgba(40, 120, 200, 0.08)",
    borderColor: "rgba(40, 120, 200, 0.15)",
    iconColor: "#2878C8",
    glowColor: "rgba(40, 120, 200, 0.06)",
  },
  video: {
    label: "视频",
    bgColor: "rgba(30, 160, 100, 0.08)",
    borderColor: "rgba(30, 160, 100, 0.15)",
    iconColor: "#1EA064",
    glowColor: "rgba(30, 160, 100, 0.06)",
  },
  archive: {
    label: "压缩包",
    bgColor: "rgba(200, 160, 20, 0.08)",
    borderColor: "rgba(200, 160, 20, 0.15)",
    iconColor: "#B89A14",
    glowColor: "rgba(200, 160, 20, 0.06)",
  },
  code: {
    label: "代码",
    bgColor: "rgba(200, 100, 40, 0.08)",
    borderColor: "rgba(200, 100, 40, 0.15)",
    iconColor: "#C86428",
    glowColor: "rgba(200, 100, 40, 0.06)",
  },
  config: {
    label: "配置",
    bgColor: "rgba(140, 80, 180, 0.08)",
    borderColor: "rgba(140, 80, 180, 0.15)",
    iconColor: "#8C50B4",
    glowColor: "rgba(140, 80, 180, 0.06)",
  },
  data: {
    label: "数据",
    bgColor: "rgba(20, 150, 130, 0.08)",
    borderColor: "rgba(20, 150, 130, 0.15)",
    iconColor: "#149682",
    glowColor: "rgba(20, 150, 130, 0.06)",
  },
  executable: {
    label: "可执行文件",
    bgColor: "rgba(200, 50, 50, 0.08)",
    borderColor: "rgba(200, 50, 50, 0.15)",
    iconColor: "#C83232",
    glowColor: "rgba(200, 50, 50, 0.06)",
  },
  font: {
    label: "字体",
    bgColor: "rgba(180, 100, 60, 0.08)",
    borderColor: "rgba(180, 100, 60, 0.15)",
    iconColor: "#B4643C",
    glowColor: "rgba(180, 100, 60, 0.06)",
  },
  design: {
    label: "设计文件",
    bgColor: "rgba(100, 60, 180, 0.08)",
    borderColor: "rgba(100, 60, 180, 0.15)",
    iconColor: "#643CB4",
    glowColor: "rgba(100, 60, 180, 0.06)",
  },
  other: {
    label: "其他",
    bgColor: "rgba(100, 100, 110, 0.06)",
    borderColor: "rgba(100, 100, 110, 0.12)",
    iconColor: "#64646E",
    glowColor: "rgba(100, 100, 110, 0.04)",
  },
};

/** 根据文件扩展名判断分类 */
export function classifyFile(extension: string, name: string): FileCategory {
  const ext = extension.toLowerCase();

  // 文档
  if (
    ["pdf", "doc", "docx", "txt", "rtf", "md", "odt", "xps", "wps"].includes(
      ext,
    )
  )
    return "document";

  // 图片
  if (
    [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "webp",
      "svg",
      "ico",
      "tiff",
      "raw",
      "heic",
      "avif",
    ].includes(ext)
  )
    return "image";

  // 音频
  if (["mp3", "wav", "flac", "aac", "ogg", "wma", "m4a", "opus"].includes(ext))
    return "audio";

  // 视频
  if (
    ["mp4", "mov", "avi", "mkv", "wmv", "flv", "webm", "m4v", "ts"].includes(
      ext,
    )
  )
    return "video";

  // 压缩包
  if (
    [
      "zip",
      "rar",
      "7z",
      "tar",
      "gz",
      "bz2",
      "xz",
      "zst",
      "iso",
      "dmg",
    ].includes(ext)
  )
    return "archive";

  // 代码
  if (
    [
      "js",
      "ts",
      "jsx",
      "tsx",
      "py",
      "java",
      "cpp",
      "c",
      "h",
      "hpp",
      "cs",
      "go",
      "rs",
      "rb",
      "php",
      "swift",
      "kt",
      "scala",
      "pl",
      "lua",
      "r",
      "m",
      "mm",
      "dart",
      "sh",
      "bash",
      "zsh",
      "css",
      "scss",
      "less",
      "styl",
      "vue",
      "svelte",
      "astro",
      "prisma",
      "gradle",
      "cmake",
    ].includes(ext)
  )
    return "code";

  // 配置
  if (
    [
      "json",
      "yaml",
      "yml",
      "toml",
      "ini",
      "cfg",
      "conf",
      "env",
      "editorconfig",
      "gitignore",
      "dockerfile",
      "xml",
      "plist",
      "properties",
    ].includes(ext) ||
    name === ".env" ||
    name === ".gitignore" ||
    name === "dockerfile" ||
    name === "Dockerfile"
  )
    return "config";

  // 数据
  if (
    [
      "csv",
      "xls",
      "xlsx",
      "xlsm",
      "ods",
      "db",
      "sqlite",
      "sql",
      "mdb",
      "accdb",
    ].includes(ext)
  )
    return "data";

  // 可执行文件
  if (
    [
      "exe",
      "msi",
      "app",
      "dll",
      "so",
      "dylib",
      "bin",
      "out",
      "desktop",
    ].includes(ext)
  )
    return "executable";

  // 字体
  if (["ttf", "otf", "woff", "woff2", "eot"].includes(ext)) return "font";

  // 设计文件
  if (
    [
      "sketch",
      "fig",
      "xd",
      "psd",
      "ai",
      "indd",
      "afdesign",
      "afphoto",
      "blend",
      "blend1",
    ].includes(ext)
  )
    return "design";

  return "other";
}

/** 格式化文件大小 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${units[i]}`;
}

/** 从路径中获取扩展名 */
export function getExtension(name: string): string {
  if (name.startsWith(".") && !name.includes(".", 1)) return "";
  const dotIndex = name.lastIndexOf(".");
  return dotIndex > 0 ? name.slice(dotIndex + 1) : "";
}
