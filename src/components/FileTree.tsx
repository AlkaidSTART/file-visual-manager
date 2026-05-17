import React from "react";
import { FileNodeData } from "../types";
import { FileNode } from "./FileNode";
import { FolderOpen, FileX, SearchX } from "lucide-react";

interface FileTreeProps {
  tree: FileNodeData | null;
  searchQuery: string;
  loading: boolean;
}

export const FileTree: React.FC<FileTreeProps> = ({
  tree,
  searchQuery,
  loading,
}) => {
  if (loading) {
    return (
      <div className="file-tree-empty">
        <div className="loading-spinner" />
        <p>正在扫描文件夹...</p>
      </div>
    );
  }

  if (!tree) {
    return (
      <div className="file-tree-empty">
        <FolderOpen size={48} className="empty-icon" />
        <h3>还未选择文件夹</h3>
        <p>点击上方「选择文件夹」按钮，或拖拽文件夹到此处</p>
      </div>
    );
  }

  if (searchQuery && tree.children.length === 0) {
    return (
      <div className="file-tree-empty">
        <SearchX size={48} className="empty-icon" />
        <h3>未找到匹配结果</h3>
        <p>没有包含「{searchQuery}」的文件或文件夹</p>
      </div>
    );
  }

  if (tree.children.length === 0) {
    return (
      <div className="file-tree-empty">
        <FileX size={48} className="empty-icon" />
        <h3>此文件夹为空</h3>
        <p>该文件夹中没有文件</p>
      </div>
    );
  }

  return (
    <div className="file-tree">
      <div className="file-tree-header">
        <span className="file-tree-path">{tree.path}</span>
        <span className="file-tree-count">{tree.children.length} 个项目</span>
      </div>
      <div className="file-tree-content">
        {tree.children
          .sort((a, b) => {
            if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
            return a.name.localeCompare(b.name);
          })
          .map((child, idx) => (
            <FileNode
              key={`${child.path}-${idx}`}
              node={child}
              searchHighlight={searchQuery}
            />
          ))}
      </div>
    </div>
  );
};
