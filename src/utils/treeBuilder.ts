import { FileNodeData, FileStats, FileCategory } from "../types";
import { classifyFile, getExtension } from "./fileClassifier";

/** 将扁平的文件列表构建为树结构 */
export function buildFileTree(
  entries: Array<{
    name: string;
    path: string;
    isDirectory: boolean;
    size: number;
    modifiedAt: string;
  }>,
  rootPath: string,
): FileNodeData {
  const root: FileNodeData = {
    name: rootPath.split("/").pop() || rootPath.split("\\").pop() || "Root",
    path: rootPath,
    isDirectory: true,
    size: 0,
    extension: "",
    category: "other",
    children: [],
    depth: 0,
    modifiedAt: "",
  };

  // 按路径排序，确保父目录在前
  const sorted = [...entries].sort((a, b) => a.path.localeCompare(b.path));

  const nodeMap = new Map<string, FileNodeData>();

  // 创建根节点
  nodeMap.set(rootPath, root);

  for (const entry of sorted) {
    const extension = entry.isDirectory ? "" : getExtension(entry.name);
    const category = entry.isDirectory
      ? "other"
      : classifyFile(extension, entry.name);

    const node: FileNodeData = {
      name: entry.name,
      path: entry.path,
      isDirectory: entry.isDirectory,
      size: entry.size,
      extension,
      category,
      children: [],
      depth: 0,
      modifiedAt: entry.modifiedAt,
    };

    nodeMap.set(entry.path, node);

    // 找到父路径
    const parentPath = entry.path.substring(0, entry.path.lastIndexOf("/"));
    const parent =
      nodeMap.get(parentPath) ||
      nodeMap.get(parentPath.replace(/\/[^/]+$/, ""));

    if (parent) {
      parent.children.push(node);
      node.depth = parent.depth + 1;
    } else {
      root.children.push(node);
      node.depth = 1;
    }
  }

  // 递归计算文件夹大小
  function calculateSize(node: FileNodeData): number {
    if (!node.isDirectory) return node.size;
    let totalSize = 0;
    for (const child of node.children) {
      totalSize += calculateSize(child);
    }
    node.size = totalSize;
    return totalSize;
  }
  calculateSize(root);

  return root;
}

/** 从树节点计算统计数据 */
export function computeStats(root: FileNodeData): FileStats {
  const byCategory: Record<FileCategory, { count: number; size: number }> =
    {} as Record<FileCategory, { count: number; size: number }>;

  // 初始化所有类别
  const categories: FileCategory[] = [
    "document",
    "image",
    "audio",
    "video",
    "archive",
    "code",
    "config",
    "data",
    "executable",
    "font",
    "design",
    "other",
  ];
  for (const cat of categories) {
    byCategory[cat] = { count: 0, size: 0 };
  }

  let totalFiles = 0;
  let totalFolders = 0;

  function walk(node: FileNodeData) {
    if (node.isDirectory && node.depth > 0) {
      totalFolders++;
    } else if (!node.isDirectory) {
      totalFiles++;
      if (byCategory[node.category]) {
        byCategory[node.category].count++;
        byCategory[node.category].size += node.size;
      }
    }
    for (const child of node.children) {
      walk(child);
    }
  }
  walk(root);

  const totalSize = Object.values(byCategory).reduce(
    (sum, c) => sum + c.size,
    0,
  );

  return { totalFiles, totalFolders, totalSize, byCategory };
}

/** 扁平化树节点用于搜索 */
export function flattenTree(node: FileNodeData): FileNodeData[] {
  const result: FileNodeData[] = [];
  function walk(n: FileNodeData) {
    result.push(n);
    for (const child of n.children) {
      walk(child);
    }
  }
  walk(node);
  return result;
}

/** 搜索树节点（支持模糊匹配） */
export function searchTree(
  node: FileNodeData,
  query: string,
): FileNodeData | null {
  const lowerQuery = query.toLowerCase();

  // 扁平化后过滤
  const allNodes = flattenTree(node);
  const matched = allNodes.filter((n) =>
    n.name.toLowerCase().includes(lowerQuery),
  );

  if (matched.length === 0) return null;

  // 只返回匹配的节点及其父路径
  const matchedPaths = new Set(matched.map((n) => n.path));

  function filterTree(n: FileNodeData): FileNodeData | null {
    const filteredChildren = n.children
      .map((child) => filterTree(child))
      .filter((c): c is FileNodeData => c !== null);

    if (matchedPaths.has(n.path) || filteredChildren.length > 0) {
      return { ...n, children: filteredChildren };
    }
    return null;
  }

  return filterTree(node);
}
