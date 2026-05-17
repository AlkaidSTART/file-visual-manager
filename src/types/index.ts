/** 文件分类类别 */
export type FileCategory =
  | "document"
  | "image"
  | "audio"
  | "video"
  | "archive"
  | "code"
  | "config"
  | "data"
  | "executable"
  | "font"
  | "design"
  | "other";

/** 文件节点的数据结构 */
export interface FileNodeData {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  extension: string;
  category: FileCategory;
  children: FileNodeData[];
  depth: number;
  modifiedAt: string;
}

/** 文件分类的颜色配置 */
export interface CategoryColor {
  label: string;
  bgColor: string; // 马卡龙底色
  borderColor: string; // 边框色
  iconColor: string; // 图标色
  glowColor: string; // 毛玻璃发光色
}

/** 统计数据类型 */
export interface FileStats {
  totalFiles: number;
  totalFolders: number;
  totalSize: number;
  byCategory: Record<FileCategory, { count: number; size: number }>;
}

/** 应用视图状态 */
export type ViewMode = "tree" | "grid";
