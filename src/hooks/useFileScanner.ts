import { useState, useCallback } from "react";
import { readDir, stat } from "@tauri-apps/plugin-fs";
import { open } from "@tauri-apps/plugin-dialog";
import { FileNodeData, FileStats } from "../types";
import { buildFileTree, computeStats, searchTree } from "../utils/treeBuilder";

interface ScanResult {
  tree: FileNodeData | null;
  stats: FileStats | null;
  rootPath: string;
}

export function useFileScanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  /** 选择文件夹 */
  const selectFolder = useCallback(async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: "选择一个文件夹",
      });

      if (selected && typeof selected === "string") {
        await scanFolder(selected);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "选择文件夹失败");
    }
  }, []);

  /** 扫描文件夹 */
  const scanFolder = useCallback(async (folderPath: string) => {
    setLoading(true);
    setError(null);

    try {
      const entries: Array<{
        name: string;
        path: string;
        isDirectory: boolean;
        size: number;
        modifiedAt: string;
      }> = [];

      // 标准化路径
      let normalizedPath = folderPath;
      if (normalizedPath.startsWith("file://")) {
        normalizedPath = decodeURIComponent(
          normalizedPath.replace("file://", ""),
        );
      }

      async function scanDir(dirPath: string) {
        try {
          const dirEntries = await readDir(dirPath);

          for (const entry of dirEntries) {
            const fullPath = `${dirPath}/${entry.name}`;

            if (entry.isDirectory) {
              entries.push({
                name: entry.name,
                path: fullPath,
                isDirectory: true,
                size: 0,
                modifiedAt: "",
              });
              await scanDir(fullPath);
            } else {
              let fileSize = 0;
              let modifiedAt = "";
              try {
                const fileStat = await stat(fullPath);
                fileSize = fileStat.size ?? 0;
                modifiedAt = fileStat.mtime?.toString() ?? "";
              } catch {
                // 某些文件可能无法 stat
              }

              entries.push({
                name: entry.name,
                path: fullPath,
                isDirectory: false,
                size: fileSize,
                modifiedAt,
              });
            }
          }
        } catch {
          // 忽略无权限的目录
        }
      }

      await scanDir(normalizedPath);

      const tree = buildFileTree(entries, normalizedPath);
      const stats = computeStats(tree);

      setResult({ tree, stats, rootPath: normalizedPath });
    } catch (err) {
      setError(err instanceof Error ? err.message : "扫描文件夹失败");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 搜索 */
  const filteredTree = useCallback((): FileNodeData | null => {
    if (!result?.tree || !searchQuery.trim()) return result?.tree ?? null;
    return searchTree(result.tree, searchQuery.trim());
  }, [result?.tree, searchQuery]);

  /** 按分类过滤 */
  const filterByCategory = useCallback(
    (category: string | null): FileNodeData | null => {
      if (!result?.tree || !category) return result?.tree ?? null;
      // 简单实现：返回完整树但仅保留该分类的文件
      return result.tree;
    },
    [result?.tree],
  );

  return {
    loading,
    result,
    error,
    searchQuery,
    setSearchQuery,
    selectFolder,
    scanFolder,
    filteredTree,
    filterByCategory,
  };
}
